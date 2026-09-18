/**
 * Cómo entrar a la comunidad.
 *
 * Es el final del embudo de esta página: todo lo anterior existe para que
 * alguien llegue hasta aquí. Por eso los tres pasos son cortos y el primero
 * es una acción, no una explicación.
 *
 * LOS DOS BOTONES SALEN DEL SITIO, y hoy eso es lo correcto: los encuentros
 * se publican y se registran en Luma, y /eventos sigue en construcción.
 * Mandar a alguien desde "ver próximos encuentros" a una página que dice "en
 * construcción" es peor que mandarlo fuera.
 *
 * Cuando /eventos liste los encuentros de verdad, el segundo botón vuelve a
 * ser un enlace interno. Está anotado también en `src/content/community.ts`.
 *
 * Server Component.
 */

import { getDictionary } from "@/dictionaries";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { socialHref } from "@/config/navigation";
import { lumaUrl } from "@/content/community";

export async function JoinSteps() {
  const dict = await getDictionary();
  const t = dict.pages.community.join;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {t.eyebrow}
        </h2>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-aipg-text md:text-xl">
          {t.note}
        </p>

        {/* Misma retícula que la lista de los principios: número en
            monoespaciada a la izquierda, línea fina entre pasos. Aquí el
            número SÍ significa algo — es un orden real — así que se queda. */}
        <ol className="mt-10 max-w-2xl border-t border-aipg-border">
          {t.steps.map((step, index) => (
            <li
              key={step}
              className="flex items-baseline gap-4 border-b border-aipg-border py-4"
            >
              <span
                aria-hidden="true"
                className="font-mono text-xs text-aipg-muted"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-pretty leading-relaxed text-aipg-text">
                {step}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href={socialHref("whatsapp")} external>
            {t.ctaWhatsapp}
          </ButtonLink>

          <ButtonLink href={lumaUrl} variant="line" external>
            {t.ctaEvents}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
