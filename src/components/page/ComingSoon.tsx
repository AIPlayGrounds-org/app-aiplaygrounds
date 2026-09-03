/**
 * Bloque "en construcción" de las páginas interiores.
 *
 * Existe para que una sección sin contenido diga qué le falta en vez de
 * mostrarse vacía o, peor, fingir que está terminada. Es coherente con el
 * principio "aprender de lo que falla": lo que no está, se nombra.
 *
 * Cuando una página reciba su contenido real, este bloque se quita de esa
 * página — el componente sigue sirviendo a las demás.
 *
 * La numeración va en la misma retícula que los principios de la home: número
 * en monoespaciada a la izquierda, línea fina entre elementos.
 */

import { Container } from "@/components/layout/Container";

type ComingSoonProps = {
  label: string;
  note: string;
  items: readonly string[];
};

export function ComingSoon({ label, note, items }: ComingSoonProps) {
  return (
    <section className="pb-20 pt-8 md:pb-28 md:pt-10">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {label}
        </p>

        <p className="mt-6 max-w-xl text-pretty leading-relaxed text-aipg-muted">
          {note}
        </p>

        <ul className="mt-10 max-w-2xl border-t border-aipg-border">
          {items.map((item, index) => (
            <li
              key={item}
              className="flex items-baseline gap-4 border-b border-aipg-border py-4"
            >
              <span aria-hidden="true" className="font-mono text-xs text-aipg-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-pretty text-sm leading-relaxed text-aipg-text md:text-base">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
