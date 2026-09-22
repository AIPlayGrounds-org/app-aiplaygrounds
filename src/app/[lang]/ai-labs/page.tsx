/**
 * AI Labs — descripción general.
 *
 * De las tres páginas que pide el documento de copy, esta es la única que
 * existe hoy. Producto y Research tienen copy escrito y esperan a que haya
 * piezas publicadas que las justifiquen; mientras tanto sus dos resúmenes
 * viven aquí, que es lo que el documento pide de esta página.
 *
 * Mientras siga siendo una sola página, el enlace del menú se queda directo,
 * sin desplegable: un desplegable de una entrada es un enlace con un paso de
 * más.
 */

import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { SplitHero } from "@/components/page/SplitHero";
import { AccentGrid } from "@/components/ui/AccentGrid";
import { EntryPaths } from "@/components/labs/EntryPaths";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.aiLabs.eyebrow,
    description: dict.pages.aiLabs.lead,
  };
}

export default async function AiLabsPage() {
  const dict = await getDictionary();
  const t = dict.pages.aiLabs;

  return (
    <>
      <SplitHero
        title={t.title}
        lead={t.lead}
        body={t.body}
        note={{ label: t.spacesLabel, text: t.spacesLead }}
      />

      <EntryPaths />

      <AccentGrid
        eyebrow={t.spaces.eyebrow}
        items={t.spaces.items}
        columns={2}
      />
    </>
  );
}
