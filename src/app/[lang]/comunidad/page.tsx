/**
 * Comunidad.
 *
 * Primera página interior con contenido definitivo: ya no muestra el bloque
 * "en construcción". Es la que más lo necesitaba — el botón principal de la
 * home dice "unirme a la comunidad" y llegaba aquí.
 *
 * ORDEN DE LAS SECCIONES, que es el argumento de la página:
 *
 *   1. Encabezado    nombra al lector y enseña el dato que lo respalda
 *   2. Relato        el problema, por qué existe esto, y qué es
 *   3. Encuentros    qué pasa de verdad cuando nos juntamos
 *   4. Público       para quién es, y para quién no
 *   5. Cómo entrar   los tres pasos y los dos botones
 *   6. Reglas        cómo se comporta la gente aquí dentro
 *
 * El público va DESPUÉS de contar qué es y no antes: filtrar a alguien que
 * todavía no sabe de qué se le habla no filtra, solo confunde.
 *
 * La página no dibuja nada por su cuenta: monta componentes y les pasa el
 * texto ya resuelto. Todo el copy sale de los diccionarios; el número de
 * encuentros, de `src/content/community.ts`.
 */

import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { meetupsHeld } from "@/content/community";
import { PageHeader } from "@/components/page/PageHeader";
import { AccentGrid } from "@/components/ui/AccentGrid";
import { CommunityStory } from "@/components/community/CommunityStory";
import { Audience } from "@/components/community/Audience";
import { JoinSteps } from "@/components/community/JoinSteps";
import { HouseRules } from "@/components/community/HouseRules";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.community.eyebrow,
    description: dict.pages.community.intro,
  };
}

export default async function CommunityPage() {
  const dict = await getDictionary();
  const t = dict.pages.community;

  return (
    <>
      {/* El número lo antepone la página, no el diccionario: es un dato y no
          se traduce. Lo que se traduce es lo que va detrás. */}
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
        meta={`${meetupsHeld} ${t.meta}`}
      />

      <CommunityStory />

      {/* Dos columnas y no tres: son cuatro bloques, y en tres columnas el
          cuarto se queda solo en la segunda fila. */}
      <AccentGrid
        eyebrow={t.meetups.eyebrow}
        items={t.meetups.items}
        columns={2}
      />

      <Audience />

      <JoinSteps />

      <HouseRules />
    </>
  );
}
