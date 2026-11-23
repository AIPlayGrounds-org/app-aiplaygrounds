import {
  contactAction,
  contactEmailPattern,
  contactFields,
  contactLimits,
} from '../src/data/organization-contact.ts';

type RateBinding = {
  limit(options: { key: string }): Promise<{ success: boolean }>;
};

export interface ContactBindings {
  CONTACT_ENABLED?: string;
  CONTACT_ORIGIN?: string;
  CONTACT_POLICY_VERSION?: string;
  CONTACT_TURNSTILE_SECRET?: string;
  CONTACT_BREVO_API_KEY?: string;
  CONTACT_FROM?: string;
  CONTACT_TO?: string;
  CONTACT_RATE_HMAC?: string;
  CONTACT_IP_LIMIT?: RateBinding;
  CONTACT_EMAIL_LIMIT?: RateBinding;
}

const siteverify = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const brevo = 'https://api.brevo.com/v3/smtp/email';
const uuid =
  /^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;
const emailValid = (value: string) =>
  value.length <= contactLimits.email && contactEmailPattern.test(value);
const reply = (
  status: number,
  data: object,
  headers?: Record<string, string>,
) =>
  Response.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  });

async function readJson(
  source: Request | Response,
  max: number,
): Promise<unknown> {
  const reader = source.body?.getReader();
  if (!reader) return null;
  let size = 0;
  let text = '';
  const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: false });
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > max) {
        await reader.cancel();
        return undefined;
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } catch {
    await reader.cancel().catch(() => {});
    return null;
  } finally {
    reader.releaseLock();
  }
}

const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export async function organizationContact(
  request: Request,
  env: ContactBindings,
  send = fetch,
) {
  if (request.method !== 'POST') {
    return reply(405, { error: 'method_not_allowed' }, { Allow: 'POST' });
  }
  const url = new URL(request.url);
  const {
    CONTACT_ORIGIN: origin,
    CONTACT_POLICY_VERSION: policy,
    CONTACT_TURNSTILE_SECRET: secret,
    CONTACT_BREVO_API_KEY: apiKey,
    CONTACT_FROM: from,
    CONTACT_TO: to,
    CONTACT_RATE_HMAC: hmac,
    CONTACT_IP_LIMIT: ipLimit,
    CONTACT_EMAIL_LIMIT: emailLimit,
  } = env;
  if (
    env.CONTACT_ENABLED !== 'true' ||
    !origin?.startsWith('https://') ||
    !policy?.trim() ||
    !secret?.trim() ||
    !apiKey?.trim() ||
    !from ||
    !emailValid(from) ||
    !to ||
    !emailValid(to) ||
    !hmac ||
    hmac.length < 32 ||
    !ipLimit ||
    !emailLimit
  ) {
    return reply(503, { error: 'contact_disabled' });
  }
  if (
    url.origin !== origin ||
    request.headers.get('Origin') !== origin ||
    ![null, 'same-origin'].includes(request.headers.get('Sec-Fetch-Site'))
  ) {
    return reply(403, { error: 'origin' });
  }
  if (
    request.headers.get('Content-Type')?.split(';')[0]?.trim().toLowerCase() !==
    'application/json'
  ) {
    return reply(415, { error: 'content_type' });
  }
  const data = await readJson(request, 32_768);
  if (data === undefined) return reply(413, { error: 'too_large' });
  const expected = [
    ...contactFields,
    'policyVersion',
    'turnstileToken',
    'submissionId',
  ];
  if (
    !record(data) ||
    Object.keys(data).length !== expected.length ||
    !expected.every(
      (key) => Object.hasOwn(data, key) && typeof data[key] === 'string',
    )
  ) {
    return reply(422, { error: 'invalid' });
  }
  const fieldError = (field: string) => reply(422, { error: 'invalid', field });
  const { inquiryType, policyVersion, turnstileToken, submissionId } = data;
  if (inquiryType !== 'institutional' && inquiryType !== 'commercial')
    return fieldError('inquiryType');
  if (
    policyVersion !== policy ||
    typeof submissionId !== 'string' ||
    !uuid.test(submissionId)
  ) {
    return reply(422, { error: 'invalid' });
  }
  if (
    typeof turnstileToken !== 'string' ||
    !turnstileToken.trim() ||
    turnstileToken.length > 2048
  ) {
    return reply(403, { error: 'verification' });
  }
  const name = String(data.name).trim();
  const organization = String(data.organization).trim();
  const email = String(data.email).trim();
  const message = String(data.message).trim();
  if (!name || name.length > contactLimits.name || /[\p{Cc}\p{Cs}]/u.test(name))
    return fieldError('name');
  if (
    !organization ||
    organization.length > contactLimits.organization ||
    /[\p{Cc}\p{Cs}]/u.test(organization)
  )
    return fieldError('organization');
  if (!emailValid(email)) return fieldError('email');
  if (
    !message ||
    message.length > contactLimits.message ||
    /[\0\p{Cs}]/u.test(message)
  )
    return fieldError('message');
  const ip = request.headers.get('CF-Connecting-IP');
  if (!ip) return reply(503, { error: 'unavailable' });

  try {
    const encode = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encode.encode(hmac),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
    const bucket = Math.floor(Date.now() / 60_000);
    const allow = async (limiter: RateBinding, type: string, value: string) => {
      const signature = await crypto.subtle.sign(
        'HMAC',
        key,
        encode.encode(`${type}:${bucket}:${value}`),
      );
      const digest = [...new Uint8Array(signature)]
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
      return (await limiter.limit({ key: digest })).success;
    };
    const limited = () =>
      reply(429, { error: 'rate_limited' }, { 'Retry-After': '60' });
    if (!(await allow(ipLimit, 'ip', ip))) return limited();

    const check = await send(siteverify, {
      method: 'POST',
      body: new URLSearchParams({ secret, response: turnstileToken }),
      redirect: 'error',
      signal: AbortSignal.timeout(5000),
    });
    if (!check.ok) return reply(503, { error: 'unavailable' });
    const verification = await readJson(check, 8192);
    if (
      !record(verification) ||
      verification.success !== true ||
      verification.action !== contactAction ||
      verification.hostname !== url.hostname ||
      (record(verification.metadata) &&
        verification.metadata.result_with_testing_key === true)
    ) {
      return reply(403, { error: 'verification' });
    }
    if (!(await allow(emailLimit, 'email', email.toLowerCase())))
      return limited();

    const label =
      inquiryType === 'institutional'
        ? 'Alianza institucional'
        : 'Oportunidad comercial';
    const notified = await send(brevo, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      redirect: 'error',
      body: JSON.stringify({
        sender: { email: from },
        to: [{ email: to }],
        replyTo: { email },
        subject: `Consulta de Empresas: ${label}`,
        textContent: `Tipo: ${label}\nNombre: ${name}\nOrganización: ${organization}\nCorreo: ${email}\nVersión de privacidad: ${policy}\n\n${message}`,
        headers: { idempotencyKey: submissionId },
      }),
      signal: AbortSignal.timeout(9000),
    });
    const receipt = await readJson(notified, 8192);
    if (
      notified.status === 201 &&
      record(receipt) &&
      typeof receipt.messageId === 'string' &&
      receipt.messageId.trim()
    ) {
      return reply(200, { status: 'accepted', requestId: submissionId });
    }
    if (record(receipt) && receipt.code === 'duplicate_parameter') {
      return reply(409, { error: 'unconfirmed' });
    }
  } catch {
    // Never expose or log payloads, credentials, or upstream response bodies.
  }
  return reply(503, { error: 'unconfirmed' });
}
