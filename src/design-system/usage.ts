// This graph runs only on the server for the injected development route.
const sources = import.meta.glob<string>(
  [
    '/src/{pages,layouts,components,motion,scripts}/**/*.{astro,ts,js}',
    '/src/styles/*.css',
  ],
  { eager: true, query: '?raw', import: 'default' },
);
const imports = /\b(?:from\s+|import\s*(?:\(\s*)?)['"](\.[^'"]+)['"]/g;
const dependencies = new Map(
  Object.entries(sources).map(([path, source]) => {
    const targets = [...source.matchAll(imports)].flatMap(([, specifier]) => {
      const resolved = new URL(specifier, `file://${path}`).pathname;
      const target = [
        resolved,
        `${resolved}.ts`,
        `${resolved}.js`,
        `${resolved}.astro`,
      ].find((candidate) => candidate in sources);
      return target ? [target] : [];
    });
    return [path, new Set(targets)];
  }),
);

function reaches(
  from: string,
  to: string,
  visited = new Set<string>(),
): boolean {
  if (from === to) return true;
  if (visited.has(from)) return false;
  visited.add(from);
  return [...(dependencies.get(from) ?? [])].some((next) =>
    reaches(next, to, visited),
  );
}

export function usageFor(path: string) {
  const stripRoot = (file: string) => file.slice(1);
  if (!(path in sources)) return undefined;
  const consumers = [...dependencies]
    .filter(([, links]) => links.has(path))
    .map(([file]) => file);
  const pages = Object.keys(sources).filter(
    (file) =>
      file.startsWith('/src/pages/') &&
      !file.includes('/inicio-atlas/') &&
      reaches(file, path),
  );
  const tokens = [
    ...new Set(
      [...sources[path].matchAll(/var\((--[\w-]+)/g)].map(([, name]) => name),
    ),
  ].sort();
  return {
    path: stripRoot(path),
    consumers: consumers.map(stripRoot).sort(),
    directPages: pages
      .filter((file) => consumers.includes(file))
      .map(stripRoot)
      .sort(),
    composedPages: pages
      .filter((file) => !consumers.includes(file))
      .map(stripRoot)
      .sort(),
    tokens,
  };
}

export function componentUsage(name: string) {
  const path = Object.keys(sources).find(
    (file) =>
      file.startsWith('/src/components/') && file.endsWith(`/${name}.astro`),
  );
  return path ? usageFor(path) : undefined;
}

export function unlistedComponents(listed: readonly string[]) {
  return Object.keys(sources)
    .filter((file) => {
      if (!file.startsWith('/src/components/') || !file.endsWith('.astro'))
        return false;
      const name = file.split('/').at(-1)?.slice(0, -'.astro'.length);
      return name !== undefined && !listed.includes(name);
    })
    .sort()
    .flatMap((file) => {
      const usage = usageFor(file);
      return usage ? [usage] : [];
    });
}
