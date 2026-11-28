import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, extname, join, normalize } from 'node:path';
import {
  declarationRule,
  inspectAstro,
  inspectScript,
} from './design-system-rules.mjs';
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
  ...sourceFiles('src').filter((path) =>
    /\.(astro|css|[cm]?[jt]s)$/.test(path),
  ),
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
const optionsFile = 'src/components/ui/options.ts';
if (existsSync(optionsFile)) {
  const options = ts.createSourceFile(
    optionsFile,
    readFileSync(optionsFile, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );
  for (const statement of options.statements) {
    if (
      !ts.isVariableStatement(statement) ||
      !statement.modifiers?.some(
        (item) => item.kind === ts.SyntaxKind.ExportKeyword,
      )
    )
      continue;
    for (const declaration of statement.declarationList.declarations) {
      const name = declaration.name.getText(options);
      const represented = new RegExp(`\\b${name}\\b`, 'g');
      if (
        [...`${catalog.text}\n${examples}`.matchAll(represented)].length < 2
      ) {
        errors.push(
          `${optionsFile}: el catálogo debe consumir ${name} en un ejemplo o control`,
        );
      }
    }
  }
}
const motionExamples =
  readFileSync('src/design-system/MotionGallery.astro', 'utf8') +
  readFileSync('src/design-system/motion-playground.ts', 'utf8') +
  readFileSync('src/design-system/approved-motion.ts', 'utf8');

const sceneRegistry = readFileSync('src/motion/sequence.ts', 'utf8')
  .split('export const sequenceDurations = {')[1]
  ?.split('} as const')[0];
for (const [, scene] of sceneRegistry?.matchAll(/(\w+): '--duration-/g) ?? []) {
  if (!motionExamples.includes(`id: '${scene}'`))
    errors.push(`${scene}: falta una ficha de la secuencia en el catálogo`);
}
for (const path of sourceFiles(ui).filter((file) => file.endsWith('.astro'))) {
  const name = basename(path, '.astro');
  if (!registry.has(name) || !new RegExp(`<${name}[\\s/>]`).test(examples))
    errors.push(
      `${path}: falta una ficha o una instancia del átomo en el catálogo`,
    );
}
const definitions = new Set();
postcss
  .parse(readFileSync('node_modules/tailwindcss/theme.css', 'utf8'))
  .walkDecls(/^--/, (declaration) => {
    definitions.add(declaration.prop);
  });
const declarations = [];
const graph = new Map();
const sources = new Set(files);

for (const path of files) {
  const content = readFileSync(path, 'utf8');
  const publicSource =
    path.startsWith('src/') && !path.startsWith('src/design-system/');
  const astro = path.endsWith('.astro')
    ? inspectAstro(path, content)
    : undefined;
  if (astro) errors.push(...astro.errors);
  if (
    path.startsWith('src/motion/') &&
    /from ['"]animejs\//.test(content) &&
    !motionExamples.includes(`/motion/${basename(path, '.ts')}`)
  ) {
    errors.push(`${path}: falta un demo del patrón de producción`);
  }
  if (astro) {
    for (const [, token] of content.matchAll(/['"](--[\w-]+)['"]\s*:/g))
      definitions.add(token);
  }
  const styles = path.endsWith('.css') ? [content] : (astro?.styles ?? []);
  const scripts = astro
    ? [
        content.match(/^---\r?\n([\s\S]*?)^---\s*$/m)?.[1] ?? '',
        ...astro.scripts,
      ]
    : /\.[cm]?[jt]s$/.test(path) && path.startsWith('src/')
      ? [content]
      : [];
  const imports = new Set();
  for (const script of scripts) {
    const analysis = inspectScript(path, script);
    if (publicSource) errors.push(...analysis.errors);
    for (const specifier of analysis.imports) imports.add(specifier);
  }
  for (const css of styles) {
    const tree = postcss.parse(css, { from: path });
    tree.walkAtRules('import', (entry) => {
      const specifier = entry.params.match(
        /^(?:url\(\s*)?['"]([^'"]+)['"]/,
      )?.[1];
      if (specifier) imports.add(specifier);
    });
    tree.walkDecls((declaration) => {
      if (declaration.prop.startsWith('--')) definitions.add(declaration.prop);
      declarations.push({ path, declaration });
    });
  }
  const targetPaths = [...imports].flatMap((specifier) => {
    const clean = specifier.split(/[?#]/)[0];
    const target = normalize(
      clean.startsWith('.')
        ? join(dirname(path), clean)
        : clean.replace(/^\//, ''),
    );
    if (
      publicSource &&
      (target === 'src/design-system' ||
        target.startsWith('src/design-system/'))
    ) {
      errors.push(
        `${path}: producción no puede depender del catálogo (${specifier})`,
      );
    }
    if (
      path.startsWith(`${ui}/`) &&
      /^src\/(?:(?:pages|layouts|data|motion)\/|components\/(?!ui\/))/.test(
        target,
      )
    )
      errors.push(`${path}: un átomo no puede depender de ${target}`);
    if (
      path.startsWith('src/motion/') &&
      /^src\/(?:pages|layouts|components|data)\//.test(target)
    )
      errors.push(
        `${path}: el patrón de movimiento no puede depender de ${target}`,
      );
    const file = [
      target,
      ...['.ts', '.js', '.astro', '.css'].map((ext) => target + ext),
    ].find((candidate) => sources.has(candidate));
    return file ? [file] : [];
  });
  if (publicSource) graph.set(path, targetPaths);
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

const visited = new Set();
const chain = new Set();
function inspectDependencies(path) {
  if (chain.has(path)) {
    errors.push(`Ciclo de dependencias: ${[...chain, path].join(' → ')}`);
    return;
  }
  if (visited.has(path)) return;
  visited.add(path);
  chain.add(path);
  for (const dependency of graph.get(path) ?? [])
    inspectDependencies(dependency);
  chain.delete(path);
}
for (const path of graph.keys()) inspectDependencies(path);

for (const { path, declaration } of declarations) {
  const { prop, value, source } = declaration;
  const location = `${path}:${source.start.line}`;
  if (path !== 'src/styles/tokens.css') {
    const rule = declarationRule(prop, value);
    const marker = declaration.next();
    const reason =
      marker?.type === 'comment' &&
      marker.source.start.line === declaration.source.end.line
        ? marker.text.match(/^design-exception: (.{15,})$/)?.[1]
        : undefined;
    if (rule && !reason)
      errors.push(`${location}: ${rule} en ${prop}: ${value}`);
    if (!rule && reason)
      errors.push(`${location}: excepción obsoleta en ${prop}`);
  }
  for (const [, token, fallback] of value.matchAll(
    /var\(\s*(--[\w-]+)\s*([,)])/g,
  )) {
    if (
      (fallback === ')' ||
        /^--(?:space|type|weight|radius|duration|motion|stroke|icon)-/.test(
          token,
        )) &&
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
