import { readFileSync, existsSync } from 'node:fs';
import { strict as assert } from 'node:assert';
import { test } from 'node:test';

const page = readFileSync('src/pages/index.astro', 'utf8').replace(/\s+/g, ' ');
const source = readFileSync(
  'content/entregables-cliente/02-contenido-web/contenido-web.md',
  'utf8',
)
  .split('## Página: Inicio')[1]
  .split('## Página: Formación')[0]
  .replace(/\s+/g, ' ');

test('Inicio conserva orden, textos y destinos acordados', () => {
  assert.deepEqual(
    [
      ...page.matchAll(/<(?:Section|ImmersiveHero|ClosingCTA)\s+id="(I\d+)"/g),
    ].map((m) => m[1]),
    ['I1', 'I2', 'I3', 'I4', 'I5', 'I8'],
  );
  for (const text of [
    'Aprendemos, investigamos, experimentamos y construimos con IA.',
    'El conocimiento crece cuando se comparte',
    'Cuatro verticales, preguntas diferentes',
    'De los encuentros a la práctica',
    'Ideas, aprendizaje y nuevas conversaciones',
    'Conoce nuestros experimentos y prototipos, quiénes los impulsan y en qué etapa están.',
    'Amplía lo que puedes construir: usa IA para desarrollar software (Software with AI) o incorpórala en tus aplicaciones y comprueba cómo funciona (AI Engineering).',
    'hack@latam',
    'IA Hackathon',
    'The Real AI',
    '1,200+',
    '800+',
    '+150',
    'La próxima conversación puede empezar contigo',
  ]) {
    assert.ok(source.includes(text), `Inicio en E2: ${text}`);
    assert.ok(page.includes(text), `Página: ${text}`);
  }
  for (const href of [
    '/comunidad/',
    '/ai-labs/',
    '/comunidad/#C3',
    '/equipo/',
    '/formacion/',
    '/empresas/',
  ])
    assert.ok(page.includes(`href="${href}"`), href);
  assert.doesNotMatch(page, /https?:\/\//);
});

test('ilustraciones locales, WebP y variantes limitadas', () => {
  const assets = readFileSync('src/assets/inicio.ts', 'utf8');
  for (const name of [
    'inicio-hero-lago',
    'ai-foundations',
    'ai-for-software',
    'ai-for-science',
    'ai-for-finance',
    'cta-plazoleta',
    'footer-lomas',
  ]) {
    assert.ok(assets.includes(`${name}.png`));
    assert.ok(existsSync(`referencias/inicio/${name}.png`));
  }
  assert.doesNotMatch(assets, /inicio-referencia/);
  assert.match(page, /image=\{inicioImages\.hero\}/);
  assert.match(page, /<VerticalCard \{\.\.\.field\} \/>/);
  const vertical = readFileSync(
    'src/components/site/VerticalCard.astro',
    'utf8',
  );
  assert.match(vertical, /format="webp"/);
  assert.match(vertical, /width=\{960\}/);
  const initiative = readFileSync(
    'src/components/site/InitiativeCard.astro',
    'utf8',
  );
  const art = readFileSync('src/components/site/InitiativeArt.astro', 'utf8');
  assert.match(initiative, /<InitiativeArt\b/);
  for (const illustration of ['labs', 'academy', 'organizations', 'research']) {
    if (illustration !== 'research')
      assert.ok(page.includes(`illustration="${illustration}"`));
    assert.ok(art.includes(`variant === '${illustration}'`));
  }
});

test('menú nativo conserva seis destinos y cierre con Escape', () => {
  const header = readFileSync('src/components/site/SiteHeader.astro', 'utf8');
  for (const route of [
    '/formacion/',
    '/empresas/',
    '/comunidad/',
    '/ai-labs/',
    '/investigacion/',
    '/equipo/',
  ])
    assert.ok(header.includes(route));
  assert.match(header, /<Dropdown class="mobile-nav">/);
  assert.match(
    readFileSync('src/components/ui/Dropdown.astro', 'utf8'),
    /<details\b/,
  );
  assert.match(header, /event\.key === 'Escape'/);
  assert.match(header, /querySelector\('summary'\)\?\.focus/);
  const footer = readFileSync('src/components/site/SiteFooter.astro', 'utf8');
  assert.doesNotMatch(header + footer, /\/productos\//);
  assert.ok(footer.includes('/ai-labs/'));
});
