export const directoryLimits = {
  pageSize: 12,
  primaryGroups: 3,
};
export const sortOptions = {
  recent: 'Publicados recientemente',
  updated: 'Actualizados recientemente',
  az: 'Nombre A–Z',
  za: 'Nombre Z–A',
};
export type Sort = keyof typeof sortOptions;

const collator = new Intl.Collator('es', {
  numeric: true,
  sensitivity: 'base',
});
export const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');

export interface DirectoryItem {
  id: string;
  name: string;
  publishedAt: string;
  updatedAt: string;
  text: string;
  values: Record<string, string[]>;
}

export interface DirectoryFacet {
  key: string;
  label: string;
  options: [string, string][];
}

export type DirectoryView = 'grid' | 'list';

export function indexFacetValues(labels: Record<string, string[]>) {
  return Object.fromEntries(
    Object.entries(labels).map(([key, values]) => [
      key,
      [...new Set(values.map(normalize))].sort(),
    ]),
  );
}

type DirectoryState = {
  query: string;
  filters: ReadonlyMap<string, ReadonlySet<string>>;
  sort: Sort;
  view: DirectoryView;
  page: number;
};

export function readDirectoryState(
  params: URLSearchParams,
  options: Iterable<{ name: string; value: string }>,
  {
    sortable,
    paginated,
    defaultView = 'grid',
  }: { sortable: boolean; paginated: boolean; defaultView?: DirectoryView },
): DirectoryState {
  const filters = new Map<string, Set<string>>();
  for (const { name, value } of options) {
    if (!params.getAll(name).includes(value)) continue;
    const values = filters.get(name) ?? new Set<string>();
    values.add(value);
    filters.set(name, values);
  }
  const sort = params.get('sort') ?? '';
  const page = Number(params.get('page'));
  const view = params.get('view');
  return {
    query: params.get('q') ?? '',
    filters,
    sort:
      sortable && Object.hasOwn(sortOptions, sort) ? (sort as Sort) : 'recent',
    view: sortable && (view === 'list' || view === 'grid') ? view : defaultView,
    page: paginated && Number.isSafeInteger(page) && page > 0 ? page : 1,
  };
}

export function writeDirectoryState(
  state: DirectoryState,
  defaultView: DirectoryView = 'grid',
) {
  const params = new URLSearchParams();
  if (state.query.trim()) params.set('q', state.query.trim());
  for (const [name, values] of state.filters)
    for (const value of values) params.append(name, value);
  if (state.sort !== 'recent') params.set('sort', state.sort);
  if (state.view !== defaultView) params.set('view', state.view);
  if (state.page > 1) params.set('page', String(state.page));
  return params;
}

export function paginateDirectory<T>(results: T[], requestedPage: number) {
  const size = directoryLimits.pageSize;
  const pageCount = Math.max(1, Math.ceil(results.length / size));
  const page = Math.max(1, Math.min(pageCount, requestedPage));
  return {
    page,
    pageCount,
    results: results.slice((page - 1) * size, page * size),
  };
}

export function buildDirectoryFacets(
  products: (DirectoryItem & { labels: Record<string, string[]> })[],
  facets: Record<string, string>,
): DirectoryFacet[] {
  return Object.entries(facets).flatMap(([key, label]) => {
    const signatures = new Set(
      products.map(({ values }) => JSON.stringify(values[key])),
    );
    if (signatures.size < 2) return [];
    const options = new Map<string, string>();
    for (const { labels } of products) {
      for (const label of labels[key]) {
        const value = normalize(label);
        if (!options.has(value)) options.set(value, label);
      }
    }
    return [
      {
        key,
        label,
        options: [...options].sort((a, b) => collator.compare(a[1], b[1])),
      },
    ];
  });
}

export function sortDirectory(a: DirectoryItem, b: DirectoryItem, sort: Sort) {
  const nameOrder = collator.compare(a.name, b.name);
  switch (sort) {
    case 'az':
      return nameOrder || a.id.localeCompare(b.id);
    case 'za':
      return -nameOrder || a.id.localeCompare(b.id);
    case 'updated':
      return (
        b.updatedAt.localeCompare(a.updatedAt) ||
        nameOrder ||
        a.id.localeCompare(b.id)
      );
    case 'recent':
      return (
        b.publishedAt.localeCompare(a.publishedAt) ||
        nameOrder ||
        a.id.localeCompare(b.id)
      );
  }
}

export function evaluateDirectory(
  products: DirectoryItem[],
  query: string,
  filters: ReadonlyMap<string, ReadonlySet<string>>,
  facetKeys = Object.keys(products[0]?.values ?? {}),
) {
  const terms = normalize(query).split(' ').filter(Boolean);
  const counts = new Map<string, Map<string, number>>();
  const results = products.filter(({ text, values }) => {
    if (!terms.every((term) => text.includes(term))) return false;
    const rejected = facetKeys.filter((key) => {
      const selected = filters.get(key);
      return (
        selected?.size && !values[key]?.some((value) => selected.has(value))
      );
    });
    // Facet counts apply the query and all other groups, excluding their own selections.
    if (rejected.length > 1) return false;
    for (const key of rejected.length === 1 ? rejected : facetKeys) {
      const countsByValue = counts.get(key) ?? new Map<string, number>();
      for (const value of values[key] ?? [])
        countsByValue.set(value, (countsByValue.get(value) ?? 0) + 1);
      counts.set(key, countsByValue);
    }
    return rejected.length === 0;
  });
  return { results, counts };
}
