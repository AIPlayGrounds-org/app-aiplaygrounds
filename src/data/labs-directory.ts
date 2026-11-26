import type { Product } from './labs';
import {
  buildDirectoryFacets,
  indexFacetValues,
  normalize,
} from './directory.ts';
export {
  directoryLimits,
  evaluateDirectory,
  normalize,
  paginateDirectory as paginateProducts,
  readDirectoryState,
  sortDirectory as sortProducts,
  sortOptions,
  writeDirectoryState,
  type Sort,
} from './directory.ts';

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
    values: indexFacetValues(values),
    labels: values,
  };
}

export type IndexedProduct = Omit<ReturnType<typeof indexProduct>, 'labels'>;

export function buildFacets(products: ReturnType<typeof indexProduct>[]) {
  return buildDirectoryFacets(products, facets);
}
