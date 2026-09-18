/**
 * Comunidad.
 *
 * Reescrita sobre el documento de copy cerrado en septiembre de 2026. La
 * versión anterior contaba un problema en tres secciones y terminaba
 * explicando cómo entrar; esta abre por el porqué y deja que los datos y las
 * verticales hagan el trabajo de convencer.
 *
 * ORDEN DE LAS SECCIONES, que es el argumento de la página:
 *
 *   1. Encabezado    el porqué, las verticales y los dos botones
 *   2. Por qué       las dos cifras que sostienen la apuesta
 *   3. Verticales    en qué se trabaja de verdad
 *   4. Aliados       con quién se ha organizado
 *   5. Cierre        la frase que interpela, y los botones repetidos
 *   6. Reglas        cómo se comporta la gente aquí dentro
 *
 * El dato va DESPUÉS del porqué y no antes: una cifra sin una tesis delante
 * es trivia. Puesta detrás, es la prueba de lo que se acaba de afirmar.
 *
 * La página no dibuja nada por su cuenta: monta componentes y les pasa el
 * texto ya resuelto desde el diccionario.
 */

import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { SplitHero } from "@/components/page/SplitHero";
import { ColumnGrid } from "@/components/ui/ColumnGrid";
import { CommunityActions } from "@/components/community/CommunityActions";
import { WhyWeExist } from "@/components/community/WhyWeExist";
import { Closing } from "@/components/community/Closing";
import { HouseRules } from "@/components/community/HouseRules";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.community.eyebrow,
    description: dict.pages.community.lead,
  };
}

export default async function CommunityPage() {
  const dict = await getDictionary();
  const t = dict.pages.community;

  return (
    <>
      <SplitHero
        title={t.title}
        lead={t.lead}
        note={{ label: t.verticalsLabel, text: t.verticalsLead }}
        actions={<CommunityActions />}
      />

      <WhyWeExist />

      {/* Cuatro columnas: son cuatro verticales y ninguna manda sobre las
          otras. Con tres, la cuarta caería sola a la segunda fila y se leería
          como la menos importante. */}
      <ColumnGrid
        eyebrow={t.verticals.eyebrow}
        items={t.verticals.items}
        columns={4}
        note={t.verticals.note}
      />

      <ColumnGrid
        eyebrow={t.partners.eyebrow}
        items={t.partners.items}
        columns={3}
        note={t.partners.note}
      />

      <Closing />

      <HouseRules />
    </>
  );
}
