import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

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

for (const path of files) {
  const content = readFileSync(path, 'utf8');
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
