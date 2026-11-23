import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { organizationContact } from '../worker/organization-contact.ts';

const origin = 'https://example.test';
const id = '11f7d512-0a58-4d08-a22d-f91e513ff8ce';
const payload = {
  inquiryType: 'institutional',
  name: 'Lucía',
  organization: 'Organización de prueba',
  email: 'lucia@example.test',
  message: 'Consulta de prueba.\nSegunda línea.',
  turnstileToken: 'fixture-token',
  submissionId: id,
  policyVersion: 'fixture-policy',
};
const env = {
  CONTACT_ENABLED: 'true',
  CONTACT_ORIGIN: origin,
  CONTACT_POLICY_VERSION: 'fixture-policy',
  CONTACT_TURNSTILE_SECRET: 'fixture',
  CONTACT_BREVO_API_KEY: 'fixture',
  CONTACT_FROM: 'sender@example.test',
  CONTACT_TO: 'receiver@example.test',
  CONTACT_RATE_HMAC: 'a'.repeat(32),
  CONTACT_IP_LIMIT: { limit: async () => ({ success: true }) },
  CONTACT_EMAIL_LIMIT: { limit: async () => ({ success: true }) },
};
function request(body = payload, headers = {}) {
  return new Request(`${origin}/api/contact`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Origin: origin,
      'Content-Type': 'application/json',
      'CF-Connecting-IP': '192.0.2.1',
      ...headers,
    },
  });
}
const goodChallenge = {
  success: true,
  action: 'contact',
  hostname: 'example.test',
};
const never = () => assert.fail('No external request expected');

test('contacto falla cerrado sin configuración completa', async () => {
  const res = await organizationContact(
    request(),
    { ...env, CONTACT_EMAIL_LIMIT: undefined },
    never,
  );
  assert.equal(res.status, 503);
  assert.equal(res.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await res.json(), { error: 'contact_disabled' });
});

test('contacto rechaza origen, tipo, tamaño y campos no aprobados', async () => {
  for (const [req, expected] of [
    [request(payload, { Origin: 'https://other.test' }), 403],
    [request(payload, { 'Content-Type': 'text/plain' }), 415],
    [request({ ...payload, message: 'á'.repeat(17_000) }), 413],
    [request({ ...payload, role: 'No se solicita' }), 422],
    [request({ ...payload, email: 'mal\n@example.test' }), 422],
    [request({ ...payload, policyVersion: 'otra' }), 422],
  ]) {
    assert.equal((await organizationContact(req, env, never)).status, expected);
  }
});

test('contacto exige verificación y límites antes de notificar', async () => {
  const calls = [];
  const blockedIp = {
    limit: async ({ key }) => {
      assert.match(key, /^[a-f\d]{64}$/);
      return { success: false };
    },
  };
  const limited = await organizationContact(
    request(),
    { ...env, CONTACT_IP_LIMIT: blockedIp },
    never,
  );
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('retry-after'), '60');
  for (const verification of [
    { ...goodChallenge, action: 'academy_waitlist' },
    { ...goodChallenge, hostname: 'other.test' },
    { ...goodChallenge, metadata: { result_with_testing_key: true } },
    { ...goodChallenge, success: false },
  ]) {
    const response = await organizationContact(request(), env, async (url) => {
      calls.push(url);
      return Response.json(verification);
    });
    assert.equal(response.status, 403);
  }
  assert.equal(calls.length, 4);
  assert.ok(calls.every((url) => url.endsWith('/siteverify')));
});

test('contacto acepta solo 201 con ID de Brevo y mantiene el UUID', async () => {
  for (const [status, body, expected] of [
    [201, { messageId: 'test-accepted' }, 200],
    [201, {}, 503],
    [202, { messageId: 'test-scheduled' }, 503],
    [400, { code: 'duplicate_parameter' }, 409],
  ]) {
    const calls = [];
    const result = await organizationContact(
      request(),
      env,
      async (url, init) => {
        calls.push(url);
        if (calls.length === 1) {
          assert.equal(init.body.get('response'), payload.turnstileToken);
          assert.equal(init.body.has('remoteip'), false);
          return Response.json(goodChallenge);
        }
        const outbound = JSON.parse(init.body);
        assert.deepEqual(outbound.to, [{ email: env.CONTACT_TO }]);
        assert.equal(outbound.replyTo.email, payload.email);
        assert.equal(outbound.headers.idempotencyKey, id);
        assert.ok(outbound.textContent.includes(payload.message));
        assert.ok(!outbound.htmlContent);
        return Response.json(body, { status });
      },
    );
    assert.equal(result.status, expected);
    assert.deepEqual(calls, [
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      'https://api.brevo.com/v3/smtp/email',
    ]);
    if (expected === 200) {
      assert.deepEqual(await result.json(), {
        status: 'accepted',
        requestId: id,
      });
    }
  }
});
