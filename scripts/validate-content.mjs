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
if (existsSync('src/content.config.ts') || existsSync('src/content'))
  throw new Error('Las colecciones requieren validación de publicación P06.');
console.log('Contenido de Inicio contrastado; colecciones pendientes.');
