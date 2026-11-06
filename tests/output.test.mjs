import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inspect } from '../scripts/check-output.mjs';

test('bundle permitido y rutas o secretos rechazados', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aip-output-'));
  try {
    writeFileSync(join(dir, 'index.js'), 'export default {};');
    assert.equal(inspect(dir), 1);
    writeFileSync(join(dir, '.env'), 'not a secret');
    assert.throws(() => inspect(dir));
    rmSync(join(dir, '.env'));
    writeFileSync(join(dir, 'index.js'), '-----BEGIN OPENSSH PRIVATE KEY-----');
    assert.throws(() => inspect(dir));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
