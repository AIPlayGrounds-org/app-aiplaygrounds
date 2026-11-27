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
