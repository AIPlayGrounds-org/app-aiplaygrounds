export interface AcademyBindings {
  ACADEMY_TURNSTILE_SECRET?: string;
  ACADEMY_TURNSTILE_HOSTNAMES?: string;
  ACADEMY_BREVO_LIST_ID?: string;
  ACADEMY_BREVO_API_KEY?: string;
  ACADEMY_WAITLIST_MOCK?: KVNamespace;
}

const testSecret = '1x0000000000000000000000000000000AA';
const action = 'academy_waitlist';
const siteverify = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const brevo = 'https://api.brevo.com/v3/contacts';

function result(
  status: number,
  payload: object,
  extra?: Record<string, string>,
) {
  return Response.json(payload, {
    status,
    headers: { 'Cache-Control': 'no-store', ...extra },
  });
}

async function readFields(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  let size = 0;
  let body = '';
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 8192) {
      await reader.cancel();
      return;
    }
    body += decoder.decode(value, { stream: true });
  }
  return new URLSearchParams(body + decoder.decode());
}

export async function academyWaitlist(
  request: Request,
  env: AcademyBindings,
  send = fetch,
) {
  if (request.method !== 'POST')
    return result(405, { error: 'method_not_allowed' }, { Allow: 'POST' });

  const url = new URL(request.url);
  const mock = env.ACADEMY_WAITLIST_MOCK;
  const secret = env.ACADEMY_TURNSTILE_SECRET;
  const hostnames = (env.ACADEMY_TURNSTILE_HOSTNAMES ?? '')
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
  const local = ['localhost', '127.0.0.1'].includes(url.hostname);
  const testing = Boolean(mock && local && secret === testSecret);
  const listId = Number(env.ACADEMY_BREVO_LIST_ID);
  if (
    !testing &&
    (local ||
      mock ||
      !secret ||
      secret === testSecret ||
      !hostnames.includes(url.hostname) ||
      !env.ACADEMY_BREVO_API_KEY ||
      !Number.isSafeInteger(listId) ||
      listId < 1)
  )
    return result(503, { error: 'unavailable' });

  if (request.headers.get('Origin') !== url.origin)
    return result(403, { error: 'origin' });
  if (
    request.headers.get('Content-Type')?.split(';')[0] !==
    'application/x-www-form-urlencoded'
  )
    return result(415, { error: 'content_type' });

  let fields: URLSearchParams | undefined;
  try {
    fields = await readFields(request);
  } catch {
    return result(400, { error: 'invalid' });
  }
  if (!fields) return result(413, { error: 'too_large' });
  const one = (key: string) =>
    fields.getAll(key).length === 1 ? (fields.get(key)?.trim() ?? '') : '';
  const name = one('name');
  const email = one('email').toLowerCase();
  const line = one('line');
  if (!name || name.length > 120 || /[\p{Cc}\p{Cs}]/u.test(name))
    return result(422, { error: 'invalid', field: 'name' });
  if (
    email.length > 254 ||
    !/^[^\s<>@]+@[a-z\d](?:[a-z\d-]*[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]*[a-z\d])?)+$/i.test(
      email,
    )
  )
    return result(422, { error: 'invalid', field: 'email' });
  if (line !== 'software-with-ai' && line !== 'ai-engineering')
    return result(422, { error: 'invalid', field: 'line' });

  const token = one('cf-turnstile-response');
  if (!token || token.length > 2048)
    return result(403, { error: 'verification' });
  try {
    const response = await send(siteverify, {
      method: 'POST',
      body: new URLSearchParams({ secret: secret ?? '', response: token }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return result(503, { error: 'verification_unavailable' });
    const verification: {
      success?: boolean;
      hostname?: string;
      action?: string;
      metadata?: { result_with_testing_key?: boolean };
    } = await response.json();
    const dummy = verification.metadata?.result_with_testing_key === true;
    if (
      verification.success !== true ||
      (testing
        ? !dummy
        : dummy ||
          verification.action !== action ||
          verification.hostname !== url.hostname)
    )
      return result(403, { error: 'verification' });
  } catch {
    return result(503, { error: 'verification_unavailable' });
  }

  try {
    if (testing && mock) {
      await mock.put(email, JSON.stringify({ name, email, line }), {
        expirationTtl: 86_400,
      });
    } else {
      const saved = await send(brevo, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': env.ACADEMY_BREVO_API_KEY ?? '',
        },
        body: JSON.stringify({
          email,
          attributes: { ACADEMY_NAME: name, ACADEMY_LINE: line },
          listIds: [listId],
          updateEnabled: true,
        }),
        signal: AbortSignal.timeout(8_000),
      });
      if (saved.status !== 201 && saved.status !== 204)
        return result(503, { error: 'save_failed' });
    }
    return result(200, { saved: true, simulated: testing });
  } catch {
    return result(503, { error: 'save_failed' });
  }
}
