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
const scope = z.enum(scopes);
const scopeDescriptions = z.partialRecord(scope, text);
const productScopes = z.union([
  z
    .array(scope)
    .min(1)
    .refine((values) => new Set(values).size === values.length),
  z
    .partialRecord(scope, text.nullable())
    .refine((values) => Object.keys(values).length > 0, {
      message: 'Declara al menos un alcance.',
    }),
]);

export const productSchema = z
  .object({
    id: slug.optional(),
    slug,
    name: text,
    summary: text,
    description: text.optional(),
    cover: image
      .extend({
        focalPoint: z
          .tuple([z.number().min(0).max(100), z.number().min(0).max(100)])
          .optional(),
      })
      .optional(),
    media: z.array(image.extend({ alt: text })).default([]),
    category: text,
    application: text.optional(),
    type: text,
    keywords: z.array(text).default([]),
    technologies: z.array(text).default([]),
    verticals: z.array(z.enum(verticals)).default([]),
    maturity: z.enum(maturities),
    development: z.enum(developmentStates),
    scopes: productScopes,
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
    audienceByScope: scopeDescriptions.optional(),
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
    if (Array.isArray(product.scopes)) {
      const declaredScopes = product.scopes;
      for (const scope of Object.keys(product.audienceByScope ?? {})) {
        if (declaredScopes.some((value) => value === scope)) continue;
        context.addIssue({
          code: 'custom',
          path: ['audienceByScope', scope],
          message: 'El alcance debe estar declarado en scopes.',
        });
      }
    } else if (product.audienceByScope) {
      context.addIssue({
        code: 'custom',
        path: ['audienceByScope'],
        message: 'Incluye las descripciones en scopes.',
      });
    }
  })
  .transform(({ scopes, audienceByScope, ...product }) => {
    // Keep tags, filters and detail pages on the same shape for both formats.
    const declaredScopes = Array.isArray(scopes)
      ? scopes
      : (Object.keys(scopes) as z.infer<typeof scope>[]);
    const descriptions = audienceByScope ?? {};
    if (!Array.isArray(scopes)) {
      for (const scope of declaredScopes) {
        const description = scopes[scope];
        if (description != null) descriptions[scope] = description;
      }
    }
    return {
      ...product,
      id: product.id ?? product.slug,
      description: product.description ?? product.summary,
      scopes: declaredScopes,
      audienceByScope: descriptions,
    };
  });
