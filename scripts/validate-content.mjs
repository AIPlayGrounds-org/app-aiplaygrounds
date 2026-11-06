import { readFileSync, existsSync } from 'node:fs';

const page = readFileSync('src/pages/index.astro', 'utf8').replace(/\s+/g, ' ');
const proposal = readFileSync(
  'docs/implementation/visual-review/p05/editorial-candidates-r1.md',
  'utf8',
).replace(/\s+/g, ' ');
const e2 = readFileSync(
  'content/entregables-cliente/02-contenido-web/contenido-web.md',
  'utf8',
);
for (const text of [
  'Aprendemos, investigamos, experimentamos y construimos con IA.',
  'AI PlayGrounds es una organización enfocada en inteligencia artificial, impulsada por su comunidad.',
  'Una comunidad que impulsa lo que hacemos',
  'La comunidad comparte conocimiento, hace preguntas y participa en las actividades que impulsan nuestro trabajo. El equipo sostiene la organización y sus cuatro campos de trabajo.',
  'AI PlayGrounds es una organización enfocada en inteligencia artificial e impulsada por su comunidad. Conoce sus campos de trabajo, actividades e iniciativas.',
]) {
  if (!page.includes(text) || !proposal.includes(text))
    throw new Error('Candidato no coincide con documento de revisión.');
}
if (
  !proposal.includes('CANDIDATO — PENDIENTE DE APROBACIÓN HUMANA') ||
  !e2.includes('Aprendemos, investigamos y construimos con IA. En comunidad.')
)
  throw new Error('Estado editorial no comprobable.');
if (existsSync('src/content.config.ts') || existsSync('src/content'))
  throw new Error('Las colecciones requieren validación de publicación P06.');
console.log(
  'Candidatos identificados y E2 original preservado; colecciones pendientes.',
);
