/**
 * Retícula de bloques marcados con la regla de acento.
 *
 * Sale de `Principles`, que era el único sitio donde vivía este tratamiento.
 * Al necesitarlo también en /comunidad se cumplió la regla del CLAUDE.md —
 * un estilo escrito dos veces es un componente — así que se extrajo en vez de
 * copiarlo.
 *
 * DIRECCIÓN "injerto periwinkle": cada bloque se marca por ARRIBA con dos
 * píxeles de acento, en lugar de encerrar la retícula en una caja de líneas.
 * Esto no es solo estético: al marcar cada celda por su cuenta desaparece el
 * problema de la última fila incompleta. Con cinco elementos en tres columnas
 * la última fila solo tiene dos, y cualquier borde interior se quedaría
 * colgando en el hueco vacío.
 *
 * `columns` existe porque el número de elementos manda sobre la retícula:
 * cinco principios piden tres columnas, y cuatro bloques piden dos, que se
 * reparten en un cuadrado limpio en vez de dejar uno suelto en la segunda
 * fila.
 *
 * Server Component. No conoce ningún diccionario: recibe el texto ya
 * resuelto de quien lo monta.
 */

import { Container } from "@/components/layout/Container";

export type AccentGridItem = {
  title: string;
  description: string;
};

type AccentGridProps = {
  /** Ancla del menú, si la sección es destino de un enlace. */
  id?: string;
  eyebrow: string;
  items: readonly AccentGridItem[];
  /** Columnas a partir de md. Por defecto tres. */
  columns?: 2 | 3;
};

/**
 * Las clases van escritas enteras y no compuestas con plantillas: Tailwind
 * lee el código fuente en busca de nombres literales, y una clase construida
 * como `md:grid-cols-${n}` no llega a existir en el CSS final.
 */
const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 md:grid-cols-3",
} as const;

export function AccentGrid({
  id,
  eyebrow,
  items,
  columns = 3,
}: AccentGridProps) {
  return (
    <section id={id} className="scroll-mt-16 py-24 md:py-32">
      <Container>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {eyebrow}
        </h2>

        {/* El hueco vertical es mayor que el horizontal para que cada bloque
            se lea como una unidad y no como la fila de una tabla. */}
        <ul
          className={`mt-10 grid grid-cols-1 gap-x-10 gap-y-10 ${columnClasses[columns]}`}
        >
          {items.map((item) => (
            <li key={item.title} className="border-t-2 border-aipg-accent pt-4">
              <h3 className="text-lg font-bold text-aipg-text">{item.title}</h3>
              <p className="mt-2.5 text-pretty leading-relaxed text-aipg-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
