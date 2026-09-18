/**
 * Por qué existimos: las dos cifras que sostienen la apuesta.
 *
 * Va inmediatamente bajo el encabezado y separada por un divisor fino arriba
 * y abajo. El divisor hace un trabajo concreto: aísla el dato del copy de
 * marca que lo rodea, para que se lea como una cita y no como una afirmación
 * nuestra más.
 *
 * LAS CIFRAS VAN EN GEIST Y NO EN MONO. El CLAUDE.md manda la monoespaciada
 * para "numeración y metadatos" —el 01 de una lista, una fecha al margen—,
 * pero esto no es un metadato: es lo segundo más grande de la página después
 * del título. A este tamaño la mono pesa demasiado y compite con el titular.
 *
 * LA FUENTE NO ES DECORACIÓN. Un porcentaje sin procedencia es exactamente el
 * hype que la marca dice no hacer, así que la atribución va en el componente
 * y no es opcional. Queda pendiente enlazarla: hoy es texto, y un enlace
 * verificable valdría más.
 *
 * Server Component.
 */

import { getDictionary } from "@/dictionaries";
import { Container } from "@/components/layout/Container";

export async function WhyWeExist() {
  const dict = await getDictionary();
  const t = dict.pages.community.whyWeExist;

  return (
    <section>
      <Container>
        <div className="border-y border-aipg-border py-12 md:py-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
            {t.eyebrow}
          </h2>

          <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {t.stats.map((stat) => (
              <div key={stat.value}>
                <dt className="font-sans text-title font-bold leading-none text-aipg-text">
                  {stat.value}
                </dt>
                <dd className="mt-3 max-w-xs text-pretty leading-relaxed text-aipg-muted">
                  {stat.description}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
            {t.source}
          </p>
        </div>
      </Container>
    </section>
  );
}
