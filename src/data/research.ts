import { getCollection, type CollectionEntry } from 'astro:content';

export type Research = CollectionEntry<'research'>['data'] & { demo: boolean };

export async function getResearch(): Promise<Research[]> {
  const published = ({ data }: { data: { publication: string } }) =>
    data.publication === 'published';
  const real = await getCollection('research', published);
  const demos = import.meta.env.DEV
    ? await getCollection('researchDemo', published)
    : [];
  const entries = [
    ...real.map(({ data }) => ({ ...data, demo: false })),
    ...demos.map(({ data }) => ({ ...data, demo: true })),
  ];
  if (
    new Set(entries.map(({ slug }) => slug)).size !== entries.length ||
    new Set(entries.map(({ id }) => id)).size !== entries.length
  ) {
    throw new Error(
      'Las investigaciones publicadas deben tener IDs y slugs distintos.',
    );
  }
  return entries;
}

export const researchSection = 'DI2';
export const researchPath = (slug: string) => `/investigacion/${slug}/`;
export const researchAuthors = ({ authors }: Research) =>
  authors.map(({ name }) => name).join(', ');

export const researchDate = new Intl.DateTimeFormat('es', {
  dateStyle: 'long',
  timeZone: 'UTC',
});
