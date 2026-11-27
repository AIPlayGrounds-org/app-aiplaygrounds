import { readFileSync, readdirSync, lstatSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import demoResearch from '../src/data/research.demo.json' with { type: 'json' };
import researchRecords from '../src/data/research.json' with { type: 'json' };
import demoProducts from '../src/data/labs-products.demo.json' with { type: 'json' };
import productRecords from '../src/data/labs-products.json' with { type: 'json' };

const products = productRecords.filter(
  ({ publication }) => publication === 'published',
);
const research = researchRecords.filter(
  ({ publication }) => publication === 'published',
);
const approvedDetailPaths = new Set(
  [
    ...products.map(({ slug }) => ['ai-labs', slug]),
    ...research.map(({ slug }) => ['investigacion', slug]),
  ]
    .filter(([, slug]) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    .map(([directory, slug]) => `${directory}/${slug}/index.html`),
);
const approvedProductImages = new Set(
  products
    .flatMap(({ cover, media, authors }) => [
      cover,
      ...(media ?? []),
      ...authors.map(({ avatar }) => avatar),
    ])
    .filter((image) =>
      /^\/images\/labs\/[a-z0-9-]+\.(webp|avif)$/.test(image?.src ?? ''),
    )
    .map(({ src }) => src.slice(1)),
);
const approvedResearchImages = new Set(
  research
    .flatMap(({ cover, materials, authors }) => [
      cover,
      ...(materials ?? []).filter(({ kind }) => kind === 'image'),
      ...authors.map(({ avatar }) => avatar),
    ])
    .filter((image) =>
      /^\/images\/research\/[a-z0-9-]+\.(webp|avif)$/.test(image?.src ?? ''),
    )
    .map(({ src }) => src.slice(1)),
);
const approvedEventImages = new Set(
  JSON.parse(readFileSync('src/data/community-events.json', 'utf8'))
    .flatMap(({ cover, thumb }) => [cover, thumb])
    .filter((path) =>
      /^\/images\/community\/evt-[A-Za-z0-9]+-[a-f0-9]{12}-(?:cover|thumb)\.webp$/.test(
        path ?? '',
      ),
    )
    .map((path) => path.slice(1)),
);
// Retratos web autorizados; los originales del formulario quedan fuera del repositorio.
const approvedTeamPortrait =
  /^_astro\/(?:appu|david-duran|edhu-nunez|edith-canelo|jheslyn-lagos|jhonatan-morgan|joseph-robles|julio-montreul|kevin-huaman|keyla-serna|max-veramendi|milagros-dimas|pedro-rojas|ricardo-quispe|rocio-laura|soledad-nahui)\.[a-zA-Z0-9_-]+_[a-zA-Z0-9_-]+\.webp$/;

// Los slugs también detectan enlaces sin el título visible del registro.
const demoMarkers = [
  ...demoProducts.flatMap(({ id, slug, name, summary, problem }) => [
    id,
    slug,
    name,
    summary,
    problem,
  ]),
  ...demoResearch.flatMap(
    ({ id, slug, title, summary, question, methodology, cover }) => [
      id,
      slug,
      title,
      summary,
      question,
      methodology,
      cover?.src,
    ],
  ),
].filter((marker) => typeof marker === 'string' && marker.length > 0);

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
        ? approvedDetailPaths.has(name) ||
          approvedEventImages.has(name) ||
          approvedProductImages.has(name) ||
          approvedResearchImages.has(name) ||
          approvedTeamPortrait.test(name) ||
          name === 'favicon.svg' ||
          name === 'logo-ai-playgrounds.svg' ||
          /^(?:(?:index|(?:empresas|comunidad|formacion|ai-labs|investigacion|equipo)\/index)\.html|verticals\/(?:foundations|software|science|finance)\.svg|_astro\/[a-zA-Z0-9._-]+\.(?:css|js)|_astro\/(?:hero-laguna|inicio-hero-v2|inicio-hero-lago|ai-foundations|ai-for-software|ai-for-science|ai-for-finance|cta-plazoleta|footer-lomas|empresa-hero-v5|empresa-colaboracion-puente-v2|empresa-colaboracion-andenes-v2|Patio andino entre flores y piedra|academy-(?:hero-v2|software-with-ai|ai-engineering|team-training|waitlist-cta))\.[a-zA-Z0-9_-]+_[a-zA-Z0-9_-]+\.webp|_astro\/(?:space-grotesk-latin|inter-tight-latin|geist-mono-latin)\.[a-zA-Z0-9_-]+\.woff2)$/.test(
            name,
          )
        : /^[a-zA-Z0-9._/-]+\.(?:js|json|txt)$/.test(name);
    if (
      !allowed ||
      /(?:^|\/)(?:\.env[^/]*|\.dev\.vars[^/]*|\.git|\.opencode|\.agents|skills?)(?:\/|$)|\.map$/i.test(
        name,
      )
    )
      throw new Error(`Ruta no permitida: ${name}`);
    const data = readFileSync(file);
    const text = data.toString('utf8');
    if (
      kind === 'site' &&
      /\.(?:html|js|css)$/.test(name) &&
      /(?:\/design-system(?:\/|["'])|data-gallery-(?:component|frame)|\.gallery-shell)/.test(
        text,
      )
    )
      throw new Error(`Catálogo interno en ${name}`);
    if (
      demoMarkers.some(
        (marker) => name.includes(marker) || text.includes(marker),
      )
    )
      throw new Error(`Datos o enlaces de demostración en ${name}`);
    if (fingerprints.some((source) => data.includes(source)))
      throw new Error(`Fuente interna completa en ${name}`);
    if (secrets.some((pattern) => pattern.test(text)))
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
