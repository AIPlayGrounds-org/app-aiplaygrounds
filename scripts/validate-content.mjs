import { readFileSync, existsSync } from 'node:fs';

const page = readFileSync('src/pages/index.astro', 'utf8');
const e2 = readFileSync(
  'content/entregables-cliente/02-contenido-web/contenido-web.md',
  'utf8',
);
for (const text of [
  'Aprendemos, investigamos y construimos con IA. En comunidad.',
  'Compartimos lo que aprendemos y abrimos espacio para investigar, experimentar y construir.',
]) {
  if (!page.replace(/\s+/g, ' ').includes(text) || !e2.includes(text))
    throw new Error('Copy mínimo no coincide con E2.');
}
if (existsSync('src/content.config.ts') || existsSync('src/content')) {
  throw new Error('Las colecciones requieren validación de publicación P06.');
}
console.log(
  'Copy mínimo contrastado con E2; colecciones aún no implementadas.',
);
