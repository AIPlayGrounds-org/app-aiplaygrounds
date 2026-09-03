/**
 * Detalle de un aprendizaje.
 *
 * Los slugs válidos salen de `src/content/learnings.ts`, no de un mapa escrito
 * aquí: añadir un programa es una línea en ese archivo y su página existe
 * sola. Cuando Payload entre en el paso 6, se cambia esa fuente por la
 * consulta y esta página no se toca.
 *
 * El nombre y la descripción NO se duplican: salen del mismo diccionario que
 * usa el listado. Un nombre escrito dos veces es un nombre que un día dirá
 * dos cosas.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { learnings, findLearning } from "@/content/learnings";
import { PageHeader } from "@/components/page/PageHeader";
import { ComingSoon } from "@/components/page/ComingSoon";

/** Prerenderiza una ficha por aprendizaje y por idioma. */
export function generateStaticParams() {
  return learnings.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/aprendizajes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = findLearning(slug);
  if (!item) return {};

  const dict = await getDictionary();
  return { title: dict.pages.learnings.items[item.slug].titulo };
}

export default async function LearningDetailPage({
  params,
}: PageProps<"/[lang]/aprendizajes/[slug]">) {
  const { slug } = await params;
  const item = findLearning(slug);
  if (!item) notFound();

  const dict = await getDictionary();
  const t = dict.pages.learningDetail;
  const copy = dict.pages.learnings.items[item.slug];

  return (
    <>
      <PageHeader
        eyebrow={dict.pages.learnings.categories[item.categoria].title}
        title={copy.titulo}
        intro={t.intro}
      />
      <ComingSoon
        label={dict.pages.underConstruction}
        note={dict.pages.underConstructionNote}
        items={t.upcoming}
      />
    </>
  );
}
