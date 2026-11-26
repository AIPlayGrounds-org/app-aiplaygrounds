import { z } from 'astro/zod';

export const scopes = [
  'Individual',
  'Team',
  'Organization',
  'Enterprise',
] as const;
export const maturities = ['Prototype', 'Alpha', 'Beta', 'Stable'] as const;
export const developmentStates = [
  'In Development',
  'Maintained',
  'On Hold',
  'Discontinued',
] as const;
export const verticals = [
  'AI Foundations',
  'AI for Software',
  'AI for Science',
  'AI for Finance',
] as const;
export const aiRelationships = [
  'IA integrada',
  'IA utilizada en el desarrollo',
  'Ambas',
] as const;
export const accessModes = [
  'Público',
  'Por invitación',
  'Privado',
  'No disponible',
] as const;
export const origins = [
  'Institucional',
  'Vertical',
  'Proyecto personal',
  'Comunidad',
  'Colaboración',
  'Externo autorizado',
  'Egresados de AI Academy',
] as const;

const text = z.string().trim().min(1);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const webUrl = z.url().refine((url) => /^https?:\/\//i.test(url));
const image = z.object({
  src: z.string().regex(/^\/images\/labs\/[a-z0-9-]+\.(webp|avif)$/),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const productSchema = z
  .object({
    id: slug,
    slug,
    name: text,
    summary: text,
    description: text,
    cover: image.optional(),
    media: z.array(image.extend({ alt: text })).default([]),
    category: text,
    application: text,
    type: text,
    keywords: z.array(text).default([]),
    technologies: z.array(text).default([]),
    verticals: z.array(z.enum(verticals)).default([]),
    maturity: z.enum(maturities),
    development: z.enum(developmentStates),
    scopes: z
      .array(z.enum(scopes))
      .min(1)
      .refine((values) => new Set(values).size === values.length),
    evidence: text.optional(),
    authors: z.array(z.object({ name: text, avatar: image.optional() })).min(1),
    team: text.optional(),
    organizationRelation: text.optional(),
    origin: z.enum(origins),
    problem: text.optional(),
    capabilities: z
      .array(
        z.object({
          title: text,
          description: text,
          icon: z
            .enum(['code', 'layers', 'message', 'search', 'workflow'])
            .optional(),
        }),
      )
      .default([]),
    audience: text.optional(),
    audienceByScope: z.partialRecord(z.enum(scopes), text).default({}),
    aiRelationship: z.enum(aiRelationships),
    technicalDetails: text.optional(),
    limitations: text.optional(),
    url: webUrl.optional(),
    access: z.enum(accessModes),
    accessNote: text.optional(),
    license: text.optional(),
    price: text.optional(),
    publishedAt: z.iso.date(),
    updatedAt: z.iso.date().optional(),
    verifiedAt: z.iso.date().optional(),
    publication: z.enum(['draft', 'published']),
    related: z.array(slug).default([]),
  })
  .superRefine((product, context) => {
    if (product.access === 'No disponible' && product.url) {
      context.addIssue({
        code: 'custom',
        path: ['url'],
        message: 'Un producto no disponible no puede tener URL de acceso.',
      });
    }
    if (product.origin === 'Vertical' && !product.verticals.length) {
      context.addIssue({
        code: 'custom',
        path: ['verticals'],
        message: 'Indica la vertical responsable.',
      });
    }
    for (const scope of Object.keys(product.audienceByScope)) {
      if (!product.scopes.some((value) => value === scope)) {
        context.addIssue({
          code: 'custom',
          path: ['audienceByScope', scope],
          message: 'El alcance debe estar declarado en scopes.',
        });
      }
    }
  });
