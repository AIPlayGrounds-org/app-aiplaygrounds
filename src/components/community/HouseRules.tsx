/**
 * Reglas de la casa.
 *
 * NO usa `AccentGrid` aunque su contenido tenga la misma forma (título +
 * descripción). Si lo hiciera, esta sección y la de "qué pasa cuando nos
 * juntamos" serían idénticas en la misma página, y una página con dos
 * retículas iguales seguidas se lee como una sola cosa larga.
 *
 * Aquí van en filas: el título a la izquierda y la descripción a la derecha a
 * partir de md. Es el ritmo de una lista de definiciones, que es exactamente
 * lo que son.
 *
 * Server Component.
 */

import { getDictionary } from "@/dictionaries";
import { Container } from "@/components/layout/Container";

export async function HouseRules() {
  const dict = await getDictionary();
  const t = dict.pages.community.rules;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {t.eyebrow}
        </h2>

        <dl className="mt-10 max-w-3xl border-t border-aipg-border">
          {t.items.map((rule) => (
            <div
              key={rule.title}
              className="grid grid-cols-1 gap-x-10 gap-y-1 border-b border-aipg-border py-5 md:grid-cols-3"
            >
              <dt className="font-bold text-aipg-text">{rule.title}</dt>
              <dd className="text-pretty leading-relaxed text-aipg-muted md:col-span-2">
                {rule.description}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
