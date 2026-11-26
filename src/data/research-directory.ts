import {
  buildDirectoryFacets,
  indexFacetValues,
  normalize,
} from './directory.ts';
import type { Research } from './research';

const primary = {
  area: 'Área de investigación',
  type: 'Tipo de investigación',
  researchStatus: 'Estado de la investigación',
};
const secondary = {
  topics: 'Tema de investigación',
  verticals: 'Vertical asociada',
  editorialStatus: 'Estado de publicación',
  peerReview: 'Revisión por pares',
  origin: 'Procedencia',
  access: 'Acceso al original',
  techniques: 'Métodos y tecnologías',
  year: 'Año de publicación',
};

export function indexResearch(entry: Research) {
  const labels = {
    area: [entry.area],
    type: [entry.type],
    researchStatus: [entry.researchStatus],
    topics: entry.topics,
    verticals: entry.verticals,
    editorialStatus: entry.editorialStatus ? [entry.editorialStatus] : [],
    peerReview: entry.peerReview ? [entry.peerReview] : [],
    origin: [entry.origin],
    access: entry.access ? [entry.access] : [],
    techniques: [...entry.methods, ...entry.technologies],
    year: entry.publishedAt ? [entry.publishedAt.slice(0, 4)] : [],
  };
  return {
    id: entry.id,
    name: entry.title,
    publishedAt: entry.publishedAt ?? '',
    updatedAt: entry.updatedAt ?? entry.publishedAt ?? '',
    text: normalize(
      [
        entry.title,
        entry.summary,
        entry.question,
        entry.methodology,
        ...entry.authors.map(({ name }) => name),
        ...entry.keywords,
        ...Object.values(labels).flat(),
      ].join(' '),
    ),
    values: indexFacetValues(labels),
    labels,
  };
}

export function researchFacets(entries: ReturnType<typeof indexResearch>[]) {
  return {
    primary: buildDirectoryFacets(entries, primary),
    secondary: buildDirectoryFacets(entries, secondary),
  };
}
