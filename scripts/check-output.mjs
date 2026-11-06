import { readFileSync, readdirSync, lstatSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

export function inspect(root, kind = root === 'dist' ? 'site' : 'bundle') {
  if (!existsSync(root)) throw new Error(`Falta artefacto: ${root}`);
  const files = [];
  function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const path = join(dir, entry);
      const stat = lstatSync(path);
      if (stat.isSymbolicLink())
        throw new Error('Enlace simbólico no permitido en artefacto');
      if (stat.isDirectory()) walk(path);
      else if (stat.isFile()) files.push(path);
      else throw new Error('Tipo de archivo no permitido');
    }
  }
  walk(root);
  if (!files.length) throw new Error(`Artefacto vacío: ${root}`);
  if (root === '.wrangler/build' && !existsSync(join(root, 'index.js')))
    throw new Error('Falta bundle del Worker');
  const privateSources = [
    'content/internal',
    'content/archive',
    'content/entregables-cliente',
    'docs/implementation',
  ];
  const fingerprints = [];
  function sourceWalk(dir) {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir)) {
      const path = join(dir, entry);
      if (lstatSync(path).isDirectory()) sourceWalk(path);
      else if (lstatSync(path).isFile()) {
        const bytes = readFileSync(path);
        if (bytes.length >= 512) fingerprints.push(bytes);
      }
    }
  }
  privateSources.forEach(sourceWalk);
  const secrets = [
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
    /\bgh[pousr]_[A-Za-z0-9]{36,}\b/,
    /\bgithub_pat_[A-Za-z0-9_]{40,}\b/,
    /\bxkeysib-[A-Za-z0-9-]{30,}\b/,
  ];
  let checked = 0;
  for (const file of files) {
    const name = relative(root, file).replaceAll('\\', '/');
    // Wrangler genera archivos locales auxiliares que no forman parte del bundle enviado.
    if (
      root === '.wrangler/build' &&
      ['README.md', 'index.js.map'].includes(name)
    )
      continue;
    checked++;
    const allowed =
      kind === 'site'
        ? /^(?:index\.html|verticals\/(?:foundations|software|science|finance)\.svg|_astro\/[a-zA-Z0-9._-]+\.(?:css|js)|_astro\/(?:space-grotesk-latin|inter-tight-latin|geist-mono-latin)\.[a-zA-Z0-9_-]+\.woff2)$/
        : /^[a-zA-Z0-9._/-]+\.(?:js|json|txt)$/;
    if (
      !allowed.test(name) ||
      /(?:^|\/)(?:\.env[^/]*|\.dev\.vars[^/]*|\.git|\.opencode|\.agents|skills?)(?:\/|$)|\.map$/i.test(
        name,
      )
    )
      throw new Error(`Ruta no permitida: ${name}`);
    const data = readFileSync(file);
    if (fingerprints.some((source) => data.includes(source)))
      throw new Error(`Fuente interna completa en ${name}`);
    if (secrets.some((pattern) => pattern.test(data.toString('utf8'))))
      throw new Error(`Posible secreto en ${name}`);
  }
  return checked;
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  for (const root of ['dist', '.wrangler/build'])
    console.log(`${root}: ${inspect(root)} archivos auditados`);
}
