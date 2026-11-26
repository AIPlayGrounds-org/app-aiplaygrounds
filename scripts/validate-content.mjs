import { readFileSync, existsSync } from 'node:fs';

const page = readFileSync('src/pages/index.astro', 'utf8').replace(/\s+/g, ' ');
const e2 = readFileSync(
  'content/entregables-cliente/02-contenido-web/contenido-web.md',
  'utf8',
);
const inicio = e2
  .split('## Página: Inicio')[1]
  .split('## Página: Formación')[0]
  .replace(/\s+/g, ' ');
for (const text of [
  'Aprendemos, investigamos, experimentamos y construimos con IA.',
  'El conocimiento crece cuando se comparte',
  'Cuatro verticales, preguntas diferentes',
  'De los encuentros a la práctica',
  'Conoce nuestros experimentos y prototipos, quiénes los impulsan y en qué etapa están.',
  'Amplía lo que puedes construir: usa IA para desarrollar software (Software with AI) o incorpórala en tus aplicaciones y comprueba cómo funciona (AI Engineering).',
  'IA Hackathon',
  'The Real AI',
]) {
  if (!page.includes(text) || !inicio.includes(text))
    throw new Error(`Inicio no coincide con contenido: ${text}`);
}
const events = JSON.parse(
  readFileSync('src/data/community-events.json', 'utf8'),
);
const ids = new Set();
for (const event of events) {
  if (ids.has(event.id)) throw new Error(`Evento Luma duplicado: ${event.id}`);
  ids.add(event.id);
  if (Boolean(event.cover) !== Boolean(event.thumb)) {
    throw new Error(`Portada incompleta: ${event.id}`);
  }
  for (const asset of [event.cover, event.thumb].filter(Boolean)) {
    if (
      !/^\/images\/community\/evt-[\w-]+\.webp$/.test(asset) ||
      !existsSync(`public${asset}`)
    ) {
      throw new Error(`Portada local ausente o inválida: ${asset}`);
    }
  }
}

const empresa = e2
  .split('## Página: Empresas')[1]
  .split('## Página: Comunidad')[0];
const companySources = [
  'src/pages/empresas.astro',
  'src/components/site/OrganizationContactForm.astro',
  'src/scripts/organization-contact.ts',
]
  .map((path) => readFileSync(path, 'utf8'))
  .join('\n');
const required = [
  ...empresa.matchAll(
    /^\*\*(?:SEO title|Meta description|H[123]|Botón):\*\* (.+)$/gm,
  ),
].map((match) => match[1]);
required.push(
  ...[
    ...empresa.matchAll(/^\*\*CTA(?: principal| secundario)?:\*\* (.+?) →/gm),
  ].map((match) => match[1]),
  ...[
    ...empresa.matchAll(
      /^(?:Cada organización|Explora alianzas|Actividades conjuntas|Necesidades de IA|Hemos coorganizado|Iniciativas y productos|Aprendizaje en IA|Preguntas, líneas|Cuéntanos qué tienes).*$/gm,
    ),
  ].map((match) => match[0]),
  ...[
    ...empresa.matchAll(
      /^\| (?:Recepción confirmada|Error recuperable) \| (.+) \|$/gm,
    ),
  ].map((match) => match[1]),
);
for (const text of required) {
  if (!companySources.replace(/\s+/g, ' ').includes(text)) {
    throw new Error(`Empresas no coincide con E2: ${text}`);
  }
}
console.log(
  `Contenido de Inicio y Empresas contrastado; ${events.length} IDs de Luma validados.`,
);
