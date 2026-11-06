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
  assert.equal((page.match(/<h1>/g) || []).length, 1);
  assert.ok(
    page.includes(
      'Aprendemos, investigamos, experimentamos y construimos con IA.',
    ),
  );
  for (const text of [
    'Cómo funcionan los modelos y métodos de inteligencia artificial, cómo evaluarlos y cómo mejorarlos. AI Foundations se ocupa de los fundamentos técnicos de la IA.',
    'Inteligencia artificial aplicada al diseño, la construcción, las pruebas y la mejora del software. El proceso de desarrollo y el criterio para trabajar con IA están en el centro.',
    'Inteligencia artificial aplicada a preguntas y procesos científicos, con atención a los datos, el método y la validación de los resultados.',
    'Aplicaciones de inteligencia artificial a problemas y procesos financieros: su utilidad, sus riesgos y las decisiones que requieren criterio humano.',
    'Actividad presentada por AI PlayGrounds, facilitada por Jhonatan Morgan, sobre agentes de código, integraciones y revisión humana',
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

test('ilustraciones originales están presentes y acotadas', () => {
  for (const name of ['foundations', 'software', 'science', 'finance']) {
    const svg = readFileSync(`public/verticals/${name}.svg`, 'utf8');
    assert.match(svg, /<svg/);
    assert.ok(page.includes(`/verticals/${name}.svg`));
    assert.doesNotMatch(svg, /<script|<image|href=/i);
  }
});

test('menú nativo conserva siete destinos y cierre con Escape', () => {
  const header = readFileSync('src/components/site/SiteHeader.astro', 'utf8');
  for (const route of [
    '/formacion/',
    '/empresas/',
    '/comunidad/',
    '/ai-labs/',
    '/productos/',
    '/investigacion/',
    '/equipo/',
  ])
    assert.ok(header.includes(route));
  assert.match(header, /<details class="mobile-nav">/);
  assert.match(header, /event\.key === 'Escape'/);
  assert.match(header, /querySelector\('summary'\)\?\.focus/);
});
