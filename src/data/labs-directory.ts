import type { Product } from './labs';

export const directoryLimits = {
  compactMax: 4,
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

const facets = {
  scopes: 'Alcance de uso',
  maturity: 'Madurez',
  category: 'Categoría',
  development: 'Estado de desarrollo',
  application: 'Área de aplicación',
  type: 'Tipo de producto',
  verticals: 'Vertical',
  aiRelationship: 'Relación con IA',
  access: 'Modalidad de acceso',
  license: 'Licencia',
  technologies: 'Tecnologías',
  origin: 'Procedencia',
} satisfies Partial<Record<keyof Product, string>>;

type Facet = keyof typeof facets;
export const facetKeys = Object.keys(facets) as Facet[];
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

export function indexProduct(product: Product) {
  const values = Object.fromEntries(
    facetKeys.map((key) => {
      const value = product[key];
      return [
        key,
        value === undefined ? [] : Array.isArray(value) ? value : [value],
      ];
    }),
  ) as Record<Facet, string[]>;
  return {
    id: product.id,
    name: product.name,
    publishedAt: product.publishedAt,
    updatedAt: product.updatedAt ?? product.publishedAt,
    text: normalize(
      [
        product.name,
        product.summary,
        product.description,
        product.team,
        ...product.keywords,
        ...product.authors.map(({ name }) => name),
        ...Object.values(values).flat(),
      ].join(' '),
    ),
    values: Object.fromEntries(
      facetKeys.map((key) => [
        key,
        [...new Set(values[key].map(normalize))].sort(),
      ]),
    ) as Record<Facet, string[]>,
    labels: values,
  };
}

export type IndexedProduct = Omit<ReturnType<typeof indexProduct>, 'labels'>;

export function buildFacets(products: ReturnType<typeof indexProduct>[]) {
  return facetKeys.flatMap((key) => {
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
        label: facets[key],
        options: [...options].sort((a, b) => collator.compare(a[1], b[1])),
      },
    ];
  });
}

export function sortProducts(a: IndexedProduct, b: IndexedProduct, sort: Sort) {
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
  products: IndexedProduct[],
  query: string,
  filters: ReadonlyMap<string, ReadonlySet<string>>,
) {
  const terms = normalize(query).split(' ').filter(Boolean);
  const counts = new Map<string, Map<string, number>>();
  const results = products.filter(({ text, values }) => {
    if (!terms.every((term) => text.includes(term))) return false;
    const rejected = facetKeys.filter((key) => {
      const selected = filters.get(key);
      return (
        selected?.size && !values[key].some((value) => selected.has(value))
      );
    });
    // Facet counts apply the query and all other groups, excluding their own selections.
    if (rejected.length > 1) return false;
    for (const key of rejected.length === 1 ? rejected : facetKeys) {
      const countsByValue = counts.get(key) ?? new Map<string, number>();
      for (const value of values[key])
        countsByValue.set(value, (countsByValue.get(value) ?? 0) + 1);
      counts.set(key, countsByValue);
    }
    return rejected.length === 0;
  });
  return { results, counts };
}
