import { z } from 'astro/zod';
import { verticals } from './labs-schema.ts';

const text = z.string().trim().min(1);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const words = z.array(text).default([]);
const webUrl = z.url({ protocol: /^https?$/ });
const image = z.object({
  src: z.string().regex(/^\/images\/research\/[a-z0-9-]+\.(webp|avif)$/),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
const resource = z.object({ label: text, url: webUrl });
const section = z.enum([
  'overview',
  'question',
  'context',
  'methodology',
  'technical',
  'results',
  'limitations',
  'conclusions',
]);
const table = z
  .object({
    caption: text,
    columns: z.array(text).min(1),
    rows: z.array(z.array(text)).min(1),
  })
  .refine(
    ({ columns, rows }) => rows.every((row) => row.length === columns.length),
    {
      message: 'Cada fila debe tener una celda por columna.',
    },
  );
const material = z.discriminatedUnion('kind', [
  image.extend({
    kind: z.literal('image'),
    alt: text,
    caption: text.optional(),
  }),
  table.extend({ kind: z.literal('table') }),
]);

const base = z.object({
  id: slug,
  slug,
  title: text,
  summary: text.optional(),
  question: text.optional(),
  cover: image.optional(),
  materials: z.array(material.and(z.object({ section }))).default([]),
  type: text,
  area: text,
  topics: words,
  verticals: z.array(z.enum(verticals)).default([]),
  keywords: words,
  authors: z
    .array(
      z.object({
        name: text,
        affiliations: words,
        avatar: image.optional(),
      }),
    )
    .min(1),
  team: text.optional(),
  origin: text,
  organizationRelation: text.optional(),
  overview: text.optional(),
  problem: text.optional(),
  objectives: words,
  context: text.optional(),
  methodology: text.optional(),
  data: text.optional(),
  methods: words,
  technologies: words,
  aiRelationship: text.optional(),
  aiRole: text.optional(),
  results: text.optional(),
  limitations: text.optional(),
  conclusions: text.optional(),
  researchStatus: text,
  editorialStatus: text.optional(),
  peerReview: z
    .enum([
      'Revisado por pares',
      'No revisado por pares',
      'En revisión',
      'No consta',
    ])
    .optional(),
  access: text.optional(),
  source: webUrl.optional(),
  publicationUrl: webUrl.optional(),
  doi: z
    .string()
    .regex(/^10\.\d{4,9}\/\S+$/)
    .optional(),
  code: webUrl.optional(),
  dataset: webUrl.optional(),
  resources: z.array(resource).default([]),
  publishedAt: z.iso.date().optional(),
  updatedAt: z.iso.date().optional(),
  verifiedAt: z.iso.date().optional(),
  version: text.optional(),
  relatedResearch: z.array(slug).default([]),
  relatedProducts: z.array(slug).default([]),
  publication: z.enum(['draft', 'published']),
});

const hasDescription = ({ summary, question }: z.infer<typeof base>) =>
  Boolean(summary || question);
const descriptionIssue = {
  path: ['summary'],
  message: 'Indica un resumen o una pregunta.',
};

export const researchSchema = base
  .refine(hasDescription, descriptionIssue)
  .superRefine((entry, context) => {
    if (entry.publication !== 'published') return;
    if (!entry.source) {
      context.addIssue({
        code: 'custom',
        path: ['source'],
        message: 'Incluye la URL de la fuente primaria.',
      });
    }
    if (!entry.verifiedAt) {
      context.addIssue({
        code: 'custom',
        path: ['verifiedAt'],
        message: 'Registra cuándo se verificó la fuente y la autoría.',
      });
    }
  });

export const researchDemoSchema = base
  .extend({
    id: slug.startsWith('demo-'),
    cover: image
      .extend({
        src: z
          .string()
          .regex(/^\/src\/assets\/research-demo\/[a-z0-9-]+\.svg$/),
      })
      .optional(),
    source: z.never().optional(),
    publicationUrl: z.never().optional(),
    doi: z.never().optional(),
    peerReview: z.never().optional(),
    verifiedAt: z.never().optional(),
  })
  .refine(hasDescription, descriptionIssue);
