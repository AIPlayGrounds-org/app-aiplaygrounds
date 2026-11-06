import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
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

test('sitio permite solo fuentes aprobadas y rechaza archivos privados', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aip-site-'));
  try {
    mkdirSync(join(dir, '_astro'));
    writeFileSync(join(dir, 'index.html'), '<html></html>');
    writeFileSync(
      join(dir, '_astro', 'inter-tight-latin.abc123.woff2'),
      'font',
    );
    assert.equal(inspect(dir, 'site'), 2);
    writeFileSync(join(dir, '_astro', 'private.abc123.woff2'), 'private');
    assert.throws(() => inspect(dir, 'site'));
    rmSync(join(dir, '_astro', 'private.abc123.woff2'));
    writeFileSync(join(dir, '.env'), 'private');
    assert.throws(() => inspect(dir, 'site'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
