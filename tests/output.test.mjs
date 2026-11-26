import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inspect } from '../scripts/check-output.mjs';
import demoResearch from '../src/data/research.demo.json' with { type: 'json' };
import demoProducts from '../src/data/labs-products.demo.json' with { type: 'json' };

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
    mkdirSync(join(dir, 'verticals'));
    writeFileSync(join(dir, 'verticals', 'foundations.svg'), '<svg/>');
    assert.equal(inspect(dir, 'site'), 3);
    writeFileSync(join(dir, 'verticals', 'private.svg'), '<svg/>');
    assert.throws(() => inspect(dir, 'site'));
    rmSync(join(dir, 'verticals', 'private.svg'));
    writeFileSync(join(dir, '_astro', 'private.abc123.woff2'), 'private');
    assert.throws(() => inspect(dir, 'site'));
    rmSync(join(dir, '_astro', 'private.abc123.woff2'));
    writeFileSync(join(dir, '.env'), 'private');
    assert.throws(() => inspect(dir, 'site'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('sitio rechaza fichas, enlaces y registros de demostración', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aip-demo-'));
  try {
    const index = join(dir, 'index.html');
    for (const [directory, entries] of [
      ['ai-labs', demoProducts],
      ['investigacion', demoResearch],
    ]) {
      for (const entry of entries) {
        writeFileSync(
          index,
          `<a href="/${directory}/${entry.slug}/">Ver ficha</a>`,
        );
        assert.throws(() => inspect(dir, 'site'), /demostración/);
        writeFileSync(index, `<h2>${entry.name ?? entry.title}</h2>`);
        assert.throws(() => inspect(dir, 'site'), /demostración/);
        writeFileSync(index, '<html></html>');
        const detail = join(dir, directory, entry.slug);
        mkdirSync(detail, { recursive: true });
        writeFileSync(join(detail, 'index.html'), '<html></html>');
        assert.throws(() => inspect(dir, 'site'), /Ruta no permitida/);
        rmSync(detail, { recursive: true });
      }
    }
    assert.equal(inspect(dir, 'site'), 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
