import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import postcss from 'postcss';
import ts from 'typescript';

const ui = 'src/components/ui';
const sourceFiles = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : [path];
  });
const atoms = new Set(
  sourceFiles(ui)
    .filter((path) => extname(path) === '.astro')
    .map((path) => basename(path).toLowerCase()),
);
const errors = [];
const obsolete = /(?:starwind(?:-ui)?|tailwind-variants)/i;
const manifest = JSON.parse(readFileSync('package.json', 'utf8'));
const dependencies = { ...manifest.dependencies, ...manifest.devDependencies };
const forbiddenMotion =
  /^(?:gsap|@gsap\/|motion$|framer-motion|@motionone\/|@popmotion\/|popmotion$|velocity-animate|lottie-web|@react-spring\/)/;
for (const name of Object.keys(dependencies)) {
  if (forbiddenMotion.test(name))
    errors.push(`${name}: motor de movimiento no autorizado`);
}
if (!/^4\.\d+\.\d+$/.test(dependencies.animejs ?? ''))
  errors.push('package.json: fija la versión estable exacta de Anime.js v4');
const cssTokens = readFileSync('src/styles/tokens.css', 'utf8');
const documentedTokens = readFileSync(
  'docs/implementation/motion-system.md',
  'utf8',
);
for (const [, token] of cssTokens.matchAll(
  /(--(?:duration|motion)-[\w-]+):/g,
)) {
  if (!documentedTokens.includes(`\`${token}\``))
    errors.push(`${token}: falta en la documentación de movimiento`);
}
const files = [
  'package.json',
  'package-lock.json',
  'skills-lock.json',
  'astro.config.mjs',
  ...sourceFiles('src').filter((path) => /\.(astro|css|ts)$/.test(path)),
];
const catalog = ts.createSourceFile(
  'catalog.ts',
  readFileSync('src/design-system/catalog.ts', 'utf8'),
  ts.ScriptTarget.Latest,
  true,
);
const registry = new Set();
function checkCatalog(node) {
  if (
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.name.text === 'components' &&
    node.initializer &&
    ts.isObjectLiteralExpression(node.initializer)
  ) {
    for (const entry of node.initializer.properties) {
      if (!ts.isPropertyAssignment(entry)) continue;
      const name = entry.name.getText(catalog).replace(/^['"]|['"]$/g, '');
      if (registry.has(name))
        errors.push(`Catálogo: ficha repetida de ${name}`);
      registry.add(name);
    }
  }
  ts.forEachChild(node, checkCatalog);
}
checkCatalog(catalog);
const examples = readFileSync('src/design-system/Example.astro', 'utf8');
for (const path of sourceFiles(ui).filter((file) => file.endsWith('.astro'))) {
  const name = basename(path, '.astro');
  if (!registry.has(name) || !new RegExp(`<${name}[\\s/>]`).test(examples))
    errors.push(
      `${path}: falta una ficha o una instancia del átomo en el catálogo`,
    );
}
const styleExceptions = new Map([
  [
    'src/styles/atlas-preview.css',
    'Atlas interno: facsímil de exploraciones editoriales.',
  ],
  [
    'src/pages/inicio-atlas/[...preview].astro',
    'Atlas interno: facsímil de exploraciones editoriales.',
  ],
]);
const definitions = new Set();
postcss
  .parse(readFileSync('node_modules/tailwindcss/theme.css', 'utf8'))
  .walkDecls(/^--/, (declaration) => {
    definitions.add(declaration.prop);
  });
const declarations = [];

for (const path of files) {
  const content = readFileSync(path, 'utf8');
  if (path.endsWith('.astro')) {
    for (const [, token] of content.matchAll(/['"](--[\w-]+)['"]\s*:/g)) {
      definitions.add(token);
    }
  }
  if (
    path.startsWith('src/') &&
    !path.startsWith('src/design-system/') &&
    /\b(?:from\s+|import\s*\(?\s*)['"][^'"]*\/design-system\//.test(content)
  ) {
    errors.push(`${path}: producción no puede depender del catálogo`);
  }
  const styles = path.endsWith('.css')
    ? [content]
    : path.endsWith('.astro')
      ? [...content.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map(
          ([, css]) => css,
        )
      : [];
  for (const css of styles) {
    postcss.parse(css, { from: path }).walkDecls((declaration) => {
      if (declaration.prop.startsWith('--')) definitions.add(declaration.prop);
      declarations.push({ path, declaration });
    });
  }
  if (obsolete.test(content)) errors.push(`${path}: referencia obsoleta`);
  if (
    path.startsWith('src/') &&
    /\b(?:anime\s*\(|anime\.timeline\s*\(|import\s+anime\s+from\s+['"]animejs)/.test(
      content,
    )
  ) {
    errors.push(`${path}: usa la API modular de Anime.js v4`);
  }
  if (
    path.startsWith('src/') &&
    !/^(?:src\/motion\/|src\/design-system\/)/.test(path) &&
    /(?:from\s+|import\s*\(\s*|import\s+)['"]animejs[/'"]/.test(content)
  ) {
    errors.push(`${path}: importa el patrón desde src/motion`);
  }
  if (path.startsWith('src/') && !path.startsWith(`${ui}/`)) {
    if (/['"`\s.]ds-[a-z]/.test(content))
      errors.push(`${path}: las clases daisyUI pertenecen a ${ui}/`);
    if (atoms.has(basename(path).toLowerCase()))
      errors.push(`${path}: el átomo ya existe en ${ui}/`);
  }
}

for (const {
  path,
  declaration: { prop, value, source },
} of declarations) {
  const location = `${path}:${source.start.line}`;
  if (path !== 'src/styles/tokens.css' && !styleExceptions.has(path)) {
    if (/(?:^|[\s,(])#[\da-f]{3,8}\b|\b(?:rgba?|hsla?|oklch)\(/i.test(value))
      errors.push(`${location}: color literal en ${prop}`);
    if (
      /^(?:transition|animation)(?:-|$)|^--editorial-delay$/.test(prop) &&
      /(?:^|[\s,(])(?:\d*\.?\d+(?:ms|s)\b|(?:cubic-bezier|steps)\(|(?:ease(?:-in|-out|-in-out)?|linear)\b)/.test(
        value,
      )
    )
      errors.push(`${location}: tiempo o curva literal en ${prop}`);
  }
  for (const [, token, fallback] of value.matchAll(
    /var\(\s*(--[\w-]+)\s*([,)])/g,
  )) {
    if (
      fallback === ')' &&
      !definitions.has(token) &&
      !/^--(?:tw-|ds-)/.test(token)
    ) {
      errors.push(`${location}: ${token} no se define y no tiene alternativa`);
    }
  }
}

for (const path of [
  'starwind.config.json',
  'src/components/starwind',
  '.agents/skills/starwind-ui',
]) {
  if (existsSync(path)) errors.push(`${path}: archivo o directorio obsoleto`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Design System: ${atoms.size} átomos, sin usos de daisyUI fuera de ${ui}/`,
  );
}
