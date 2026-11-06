import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import worker from '../worker/index.ts';

test('contacto deshabilitado, rutas y delegación', async () => {
  let called = false;
  const env = {
    ASSETS: {
      fetch: async () => {
        called = true;
        return new Response('asset');
      },
    },
  };
  const request = (path, method = 'GET') =>
    new Request(`https://example.test${path}`, { method });
  let res = await worker.fetch(request('/api/contact', 'POST'), env);
  assert.equal(res.status, 503);
  assert.deepEqual(await res.json(), { error: 'contact_disabled' });
  res = await worker.fetch(request('/api/contact'), env);
  assert.equal(res.status, 405);
  assert.equal(res.headers.get('allow'), 'POST');
  assert.equal((await worker.fetch(request('/api/unknown'), env)).status, 404);
  assert.equal(called, false);
  assert.equal(await (await worker.fetch(request('/'), env)).text(), 'asset');
});
