/**
 * Eventos.
 *
 * Deja de estar en construcción. Recibe de /comunidad los dos bloques que
 * describían el encuentro —el formato y qué pasa cuando nos juntamos—,
 * porque hablaban del evento y no de la comunidad.
 *
 * El calendario todavía no lista nada: la fuente sigue sin decidirse y el
 * botón manda a Luma, que es donde los encuentros están publicados de verdad.
 */

import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { lumaUrl } from "@/content/community";
import { SplitHero } from "@/components/page/SplitHero";
import { AccentGrid } from "@/components/ui/AccentGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WeeklyMeetups } from "@/components/events/WeeklyMeetups";
import { Calendar } from "@/components/events/Calendar";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.events.eyebrow,
    description: dict.pages.events.lead,
  };
}

export default async function EventsPage() {
  const dict = await getDictionary();
  const t = dict.pages.events;

  return (
    <>
      <SplitHero
        title={t.title}
        lead={t.lead}
        body={t.body}
        actions={
          <ButtonLink href={lumaUrl} external>
            {t.cta}
          </ButtonLink>
        }
      />

      <WeeklyMeetups />

      {/* Dos columnas y no tres: son cuatro bloques, y en tres el cuarto se
          queda solo en la segunda fila. */}
      <AccentGrid
        eyebrow={t.meetups.eyebrow}
        items={t.meetups.items}
        columns={2}
      />

      <Calendar />
    </>
  );
}
