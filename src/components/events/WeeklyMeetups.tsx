/**
 * Encuentros semanales: el formato de la sesión.
 *
 * Este bloque vivía en /comunidad con el nombre "Cómo funciona". Se mudó aquí
 * porque describe el EVENTO y no la comunidad, y porque dejarlo allí obligaba
 * a contar dos veces lo mismo en dos páginas del mismo desplegable.
 *
 * El horario va aparte de los dos párrafos y marcado con la regla de acento.
 * Es el único dato accionable de la sección —lo demás es descripción— y quien
 * llega a esta página buscando "¿cuándo es?" tiene que encontrarlo sin leer
 * el resto. En monoespaciada, que es lo que el CLAUDE.md reserva para los
 * datos.
 *
 * Server Component.
 */

import { getDictionary } from "@/dictionaries";
import { Container } from "@/components/layout/Container";

export async function WeeklyMeetups() {
  const dict = await getDictionary();
  const t = dict.pages.events.weekly;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {t.eyebrow}
        </h2>

        <div className="mt-10 max-w-xl space-y-6 text-pretty text-lg leading-relaxed text-aipg-muted">
          {t.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <p className="mt-12 inline-block border-t-2 border-aipg-accent pt-4 font-mono text-xs uppercase tracking-[0.2em] text-aipg-text">
          {t.schedule}
        </p>
      </Container>
    </section>
  );
}
