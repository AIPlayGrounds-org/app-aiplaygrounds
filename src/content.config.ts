import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const communityEvents = defineCollection({
  loader: file('src/data/community-events.json'),
  schema: z.object({
    id: z.string().regex(/^evt-[A-Za-z0-9]+$/),
    title: z.string().min(1),
    description: z.string().optional(),
    coverUrl: z.url().optional(),
    cover: z.string().startsWith('/images/community/').optional(),
    thumb: z.string().startsWith('/images/community/').optional(),
    startAt: z.iso.datetime(),
    endAt: z.iso.datetime().optional(),
    timezone: z.string().optional(),
    modality: z.enum(['Presencial', 'Virtual', 'Híbrida']).optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    location: z.string().optional(),
    organizers: z.array(z.string()),
    url: z.url().refine((url) => new URL(url).origin === 'https://luma.com'),
    status: z.enum(['listed', 'cancelled', 'unlisted']),
    feedStatus: z.string().optional(),
    ownedCalendar: z.boolean(),
    organizerCalendar: z.string().optional(),
    missing: z.array(z.string()),
  }),
});

export const collections = { communityEvents };
