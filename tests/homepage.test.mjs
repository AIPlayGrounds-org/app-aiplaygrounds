import { readFileSync } from 'node:fs';
import { strict as assert } from 'node:assert';
import { test } from 'node:test';

const page = readFileSync('src/pages/index.astro', 'utf8').replace(/\s+/g, ' ');
const source = readFileSync(
  'content/entregables-cliente/02-contenido-web/contenido-web.md',
  'utf8',
);

test('Inicio conserva orden, textos y destinos esenciales', () => {
  assert.deepEqual(
    [...page.matchAll(/<section\s+id="(I\d+)"/g)].map((match) => match[1]),
    ['I1', 'I2', 'I3', 'I4', 'I5', 'I8'],
  );
  for (const text of [
    'AI PlayGrounds es una organización enfocada en inteligencia artificial e impulsada por su comunidad. Nacimos en Lima en enero de 2025 para conectar personas y conocimiento alrededor de la IA.',
    'Una pregunta sobre un modelo, una herramienta nueva o una idea que merece ponerse a prueba: la IA nos da motivos para reunirnos y compartir conocimiento.',
    'Nuestros campos de trabajo van de los modelos y sus métodos a las aplicaciones en software, ciencia y finanzas.',
    'Coorganizamos el evento, que reunió 56 equipos durante 36 horas',
    'Organizamos una edición práctica de seis semanas, con más de 300 inscritos',
    '¿Vienes desde una empresa o institución? Cuéntanos qué te gustaría trabajar en conjunto o qué necesita tu equipo.',
  ]) {
    assert.ok(source.includes(text), `E2: ${text}`);
    assert.ok(page.includes(text), `Inicio: ${text}`);
  }
  for (const href of [
    '/comunidad/',
    '/ai-labs/',
    '/comunidad/#C3',
    '/equipo/',
    '/formacion/#F4',
    '/formacion/',
    '/empresas/',
    'https://luma.com/gjk5qy7b',
  ])
    assert.ok(page.includes(`href="${href}"`), href);
  for (const name of [
    'AI Foundations',
    'AI for Software',
    'AI for Science',
    'AI for Finance',
    'Workshop Práctico de Claude Code',
    'hack@latam',
    'Bootcamp Gen AI Fundamentals',
  ])
    assert.ok(page.includes(name), name);
});
