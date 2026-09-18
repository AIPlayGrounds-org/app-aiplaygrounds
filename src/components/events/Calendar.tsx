/**
 * Calendario de próximos encuentros.
 *
 * HOY NO LISTA NADA, y es a propósito. El copy deja la fuente sin decidir
 * —Luma, una base de Notion embebida, u otra—, así que lo único honesto es
 * mandar a donde los encuentros sí están publicados y se puede uno registrar,
 * que es el perfil de Luma.
 *
 * No lleva el bloque de "en construcción" del resto de páginas pendientes:
 * eso anuncia que falta algo, y aquí no falta nada para quien quiere apuntarse
 * a la próxima sesión. Falta para nosotros, no para quien visita.
 *
 * Cuando se decida la fuente, este componente pasa a listar y el botón deja
 * de ser el contenido para volver a ser un botón.
 *
 * Server Component.
 */

import { getDictionary } from "@/dictionaries";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { lumaUrl } from "@/content/community";

export async function Calendar() {
  const dict = await getDictionary();
  const t = dict.pages.events.calendar;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {t.eyebrow}
        </h2>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-aipg-muted">
          {t.note}
        </p>

        <div className="mt-10">
          <ButtonLink href={lumaUrl} external>
            {t.cta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
