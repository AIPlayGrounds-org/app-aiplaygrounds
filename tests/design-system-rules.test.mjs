import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import {
  declarationRule,
  inspectAstro,
  inspectScript,
} from '../scripts/design-system-rules.mjs';

test('bloquea valores fijos de interfaz y conserva composición fluida', () => {
  for (const [property, value] of [
    ['background', '#123456'],
    ['color', 'rebeccapurple'],
    ['gap', '1.3rem'],
    ['margin-block-end', '0.35rem'],
    ['font-size', '1.0625rem'],
    ['line-height', '1.6'],
    ['border-radius', '2rem'],
    ['border-radius', 'var(--radius-xl)'],
    ['gap', 'var(--space-control) 19px'],
    ['border-inline-start', '2px solid var(--line)'],
    ['box-shadow', '0 2px 3px var(--line)'],
    ['transition', 'border-color 150ms ease-out'],
  ])
    assert.ok(declarationRule(property, value), `${property}: ${value}`);
  for (const [property, value] of [
    ['margin-inline', 'auto'],
    ['font-size', 'clamp(1rem, 5cqi, 1.5rem)'],
    ['gap', 'var(--space-control)'],
    ['border-radius', '50%'],
    ['fill', 'currentColor'],
    ['transition', 'color var(--duration-control) var(--motion-ease-standard)'],
  ])
    assert.equal(
      declarationRule(property, value),
      undefined,
      `${property}: ${value}`,
    );
});

test('analiza atributos Astro, incluidas listas y objetos de estilos', () => {
  const source = `---
import { ArrowRight as Icon } from '@lucide/astro';
---
<section class:list={[active && 'hover:pt-[17px]']} style={{ borderRadius: '15px' }}>
  <Icon size={16} />
  <p style="color: #61347a">Texto</p>
</section>
<style>p { color: var(--foreground) }</style>`;
  const { styles, errors } = inspectAstro('src/pages/example.astro', source);
  assert.equal(styles.length, 1);
  assert.deepEqual(
    errors.map((error) => error.match(/: (.*)/)[1]),
    [
      'utilidad visual arbitraria: hover:pt-[17px]',
      'espacio o radio fijo fuera de escala en estilo inline (border-radius)',
      'usa una utilidad de tamaño de icono',
      'color literal en estilo inline (color)',
    ],
  );
});

test('admite geometría SVG y distingue arte registrado de pigmentos nuevos', () => {
  const svg =
    '<svg viewBox="0 0 24 24"><path stroke-width="2" fill="#19352d" /></svg>';
  assert.equal(
    inspectAstro('src/components/labs/ProductCover.astro', svg).errors.length,
    0,
  );
  assert.equal(inspectAstro('src/pages/new.astro', svg).errors.length, 1);
  assert.equal(
    inspectAstro(
      'src/components/labs/ProductCover.astro',
      svg.replace('#19352d', '#123456'),
    ).errors.length,
    1,
  );
});

test('inspecciona imports reales, literales TS y opciones de Anime.js', () => {
  const script = `
import type { Entry } from './types';
const example = await import('../design-system/example');
export { helper } from './helper';
waapi.animate(node, { duration: 400, ease: 'linear' });
const styles = { backgroundColor: '#f90' };
node.style.setProperty('--editorial-delay', '120ms');
`;
  const result = inspectScript('src/motion/example.ts', script);
  assert.deepEqual(
    [...result.imports],
    ['../design-system/example', './helper'],
  );
  assert.equal(result.errors.length, 4);
  assert.deepEqual(
    inspectScript(
      'src/motion/example.ts',
      'waapi.animate(node, { duration: tokens.ms("--duration-hero") });',
    ).errors,
    [],
  );
});

test('el CLI bloquea regresiones y admite solo la declaración exceptuada', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'design-system-'));
  const validator = fileURLToPath(
    new URL('../scripts/check-design-system.mjs', import.meta.url),
  );
  const write = (path, text = '') => {
    const file = join(fixture, path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, text);
  };
  try {
    symlinkSync(
      resolve('node_modules'),
      join(fixture, 'node_modules'),
      'junction',
    );
    write('package.json', '{"dependencies":{"animejs":"4.5.0"}}');
    write('package-lock.json', '{}');
    write('skills-lock.json', '{}');
    write('astro.config.mjs');
    write('src/styles/tokens.css', ':root { --space-unit: 0.25rem; }');
    write('src/components/ui/Sample.astro', '<div><slot /></div>');
    write(
      'src/design-system/catalog.ts',
      'export const components = { Sample: { } };',
    );
    write('src/design-system/Example.astro', '<Sample />');
    write('src/design-system/MotionGallery.astro', '<div />');
    write('src/design-system/motion-playground.ts');
    write('src/design-system/approved-motion.ts');
    write(
      'src/motion/scene.ts',
      "export const sequenceDurations = { kinetic: '--duration-hero' } as const;",
    );
    write('docs/implementation/motion-system.md');
    const run = () =>
      spawnSync(process.execPath, [validator], {
        cwd: fixture,
        encoding: 'utf8',
      });
    const justified =
      '.art { padding-top: 8rem; /* design-exception: Espacio reservado para el horizonte de la ilustración. */ }';
    write('src/pages/index.astro', `<style>${justified}</style>`);
    assert.match(run().stderr, /kinetic: falta una ficha de la secuencia/);
    write(
      'src/design-system/approved-motion.ts',
      "export const approvedMotion = [{ id: 'kinetic' }];",
    );
    assert.equal(run().status, 0);
    write(
      'src/pages/index.astro',
      `---
import Gallery from '../design-system/Example.astro';
---
<div style={{padding: '13px'}} />
<style>${justified} .new { gap: 1.3rem; padding: var(--space-typo, 0); }</style>`,
    );
    const failed = run();
    assert.equal(failed.status, 1);
    assert.match(failed.stderr, /producción no puede depender del catálogo/);
    assert.match(failed.stderr, /estilo inline \(padding\)/);
    assert.match(failed.stderr, /gap: 1.3rem/);
    assert.match(failed.stderr, /--space-typo/);
    assert.doesNotMatch(failed.stderr, /padding-top: 8rem/);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
