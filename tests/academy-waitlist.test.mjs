import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { URLSearchParams } from 'node:url';
import { academyWaitlist } from '../worker/academy-waitlist.ts';

const origin = 'https://academy.example.test';
const path = '/api/academy-waitlist';
const payload = {
  name: 'Prueba Ñahui',
  email: 'Test@example.test',
  line: 'ai-engineering',
  'cf-turnstile-response': 'test-token',
};
const env = {
  ACADEMY_TURNSTILE_SECRET: 'unit-secret',
  ACADEMY_TURNSTILE_HOSTNAMES: 'academy.example.test',
  ACADEMY_BREVO_API_KEY: 'unit-key',
  ACADEMY_BREVO_LIST_ID: '42',
};
const verified = {
  success: true,
  hostname: 'academy.example.test',
  action: 'academy_waitlist',
};

function request(
  body = new URLSearchParams(payload),
  headers = {},
  base = origin,
) {
  return new Request(base + path, {
    method: 'POST',
    headers: { Origin: base, ...headers },
    body,
  });
}

test('Academy valida servidor, origen y tamaño antes de Siteverify', async () => {
  const noFetch = () => assert.fail('No debe llamar servicios');
  assert.equal(
    (await academyWaitlist(new Request(origin + path), env, noFetch)).status,
    405,
  );
  assert.equal((await academyWaitlist(request(), {}, noFetch)).status, 503);
  assert.equal(
    (
      await academyWaitlist(
        request(undefined, { Origin: 'https://other.example.test' }),
        env,
        noFetch,
      )
    ).status,
    403,
  );
  assert.equal(
    (await academyWaitlist(request('text'), env, noFetch)).status,
    415,
  );
  assert.equal(
    (
      await academyWaitlist(
        request(new URLSearchParams({ name: 'x'.repeat(9000) })),
        env,
        noFetch,
      )
    ).status,
    413,
  );
  for (const [field, value] of [
    ['name', ' '],
    ['email', 'inválido'],
    ['line', 'otra'],
  ]) {
    const response = await academyWaitlist(
      request(new URLSearchParams({ ...payload, [field]: value })),
      env,
      noFetch,
    );
    assert.equal(response.status, 422);
    assert.deepEqual(await response.json(), { error: 'invalid', field });
  }
  const duplicate = new URLSearchParams(payload);
  duplicate.append('line', 'software-with-ai');
  assert.equal(
    (await academyWaitlist(request(duplicate), env, noFetch)).status,
    422,
  );
  const missingToken = new URLSearchParams(payload);
  missingToken.delete('cf-turnstile-response');
  assert.equal(
    (await academyWaitlist(request(missingToken), env, noFetch)).status,
    403,
  );
});

test('Academy rechaza token vencido o repetido, acción, dominio y pruebas en producción', async () => {
  for (const response of [
    { ...verified, success: false, 'error-codes': ['timeout-or-duplicate'] },
    { ...verified, action: 'contact' },
    { ...verified, hostname: 'other.example.test' },
    { ...verified, metadata: { result_with_testing_key: true } },
  ]) {
    const rejected = await academyWaitlist(request(), env, async (url) => {
      assert.match(url, /\/siteverify$/);
      return Response.json(response);
    });
    assert.equal(rejected.status, 403);
  }
  assert.equal(
    (
      await academyWaitlist(request(), env, async () => {
        throw new Error('offline');
      })
    ).status,
    503,
  );
});

test('Academy guarda solo en la lista configurada y confirma solo si Brevo guarda', async () => {
  for (const status of [201, 204, 400, 500]) {
    const calls = [];
    const res = await academyWaitlist(request(), env, async (url, init) => {
      calls.push(url);
      if (url.endsWith('/siteverify')) {
        assert.equal(init.body.get('response'), 'test-token');
        return Response.json(verified);
      }
      assert.equal(url, 'https://api.brevo.com/v3/contacts');
      assert.deepEqual(JSON.parse(init.body), {
        email: 'test@example.test',
        attributes: { ACADEMY_NAME: payload.name, ACADEMY_LINE: payload.line },
        listIds: [42],
        updateEnabled: true,
      });
      return new Response(null, { status });
    });
    assert.equal(calls.length, 2);
    assert.equal(res.status, status < 300 ? 200 : 503);
    assert.deepEqual(
      await res.json(),
      status < 300
        ? { saved: true, simulated: false }
        : { error: 'save_failed' },
    );
  }
});

test('Academy local verifica la clave de prueba y espera a que KV guarde; no llama a Brevo', async () => {
  const base = 'http://127.0.0.1:4321';
  for (const fail of [false, true]) {
    let attempted = false;
    const res = await academyWaitlist(
      request(undefined, {}, base),
      {
        ACADEMY_TURNSTILE_SECRET: '1x0000000000000000000000000000000AA',
        ACADEMY_WAITLIST_MOCK: {
          async put(key, value) {
            attempted = true;
            assert.equal(key, 'test@example.test');
            assert.equal(JSON.parse(value).line, 'ai-engineering');
            if (fail) throw new Error('KV offline');
          },
        },
      },
      async (url) => {
        assert.match(url, /\/siteverify$/);
        return Response.json({
          success: true,
          metadata: { result_with_testing_key: true },
        });
      },
    );
    assert.equal(attempted, true);
    assert.equal(res.status, fail ? 503 : 200);
    assert.deepEqual(
      await res.json(),
      fail ? { error: 'save_failed' } : { saved: true, simulated: true },
    );
  }
});
