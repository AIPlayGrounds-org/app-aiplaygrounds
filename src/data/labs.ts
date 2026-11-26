import { getCollection, type CollectionEntry } from 'astro:content';
import { normalize } from './labs-directory';

export type Product = CollectionEntry<'labsProducts'>['data'] & {
  demo: boolean;
};

export async function getProducts(): Promise<Product[]> {
  const published = ({ data }: { data: Omit<Product, 'demo'> }) =>
    data.publication === 'published';
  const records = (await getCollection('labsProducts', published)).map(
    ({ data }) => ({
      ...data,
      demo: false,
    }),
  );
  const slugs = new Set(records.map(({ slug }) => slug));
  if (slugs.size !== records.length)
    throw new Error(
      'Los productos publicados de AI Labs deben tener slugs distintos.',
    );
  if (import.meta.env.DEV) {
    const ids = new Set(records.map(({ id }) => id));
    const demos = await getCollection('labsDemo', published);
    for (const { data } of demos) {
      if (slugs.has(data.slug) || ids.has(data.id)) continue;
      records.push({ ...data, demo: true });
      slugs.add(data.slug);
      ids.add(data.id);
    }
  }
  const labels = {
    category: new Map<string, string>(),
    application: new Map<string, string>(),
    type: new Map<string, string>(),
    technologies: new Map<string, string>(),
  };
  const canonical = (key: keyof typeof labels, label: string) => {
    const value = normalize(label);
    if (!labels[key].has(value)) labels[key].set(value, label);
    return labels[key].get(value)!;
  };
  return records.map((product) => ({
    ...product,
    category: canonical('category', product.category),
    application: canonical('application', product.application),
    type: canonical('type', product.type),
    technologies: [
      ...new Set(
        product.technologies.map((label) => canonical('technologies', label)),
      ),
    ],
  }));
}

export const productPath = (slug: string) => `/ai-labs/${slug}/`;
export const productAuthors = ({ authors }: Product) =>
  authors.map(({ name }) => name).join(', ');
