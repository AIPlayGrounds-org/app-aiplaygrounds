/**
 * Retícula de columnas sin marca: nombre en negrita y descripción debajo.
 *
 * ES HERMANA DE `AccentGrid`, NO UNA VARIANTE SUYA. Aquella marca cada bloque
 * con dos píxeles de acento por arriba; esta no lleva borde ni fondo, por
 * indicación expresa del copy. Añadirle a `AccentGrid` un interruptor para
 * apagar la regla sería quitarle lo único que la define, así que son dos
 * componentes.
 *
 * Se usa donde hay una enumeración de iguales —las verticales activas, las
 * comunidades con las que organizamos— y donde una regla de acento por bloque
 * repetiría el recurso tantas veces que dejaría de señalar nada. El acento
 * pesa poco porque aparece poco: es la regla del CLAUDE.md.
 *
 * `note` es la línea que cierra la enumeración ("Si alguna te interesa,
 * escríbenos"). Va dentro y no en la página porque pertenece a la lista: sin
 * ella, la enumeración se queda sin salida.
 *
 * Server Component.
 */

import { Container } from "@/components/layout/Container";

export type ColumnGridItem = {
  title: string;
  description: string;
};

type ColumnGridProps = {
  id?: string;
  eyebrow: string;
  items: readonly ColumnGridItem[];
  /** Columnas a partir de lg. Por defecto tres. */
  columns?: 3 | 4;
  note?: string;
};

/**
 * Escritas enteras: Tailwind busca nombres literales en el código fuente, y
 * una clase compuesta como `lg:grid-cols-${n}` no llega al CSS final.
 *
 * Cuatro columnas nunca se comprimen a cuatro en móvil: bajan a dos desde sm
 * y solo se abren del todo en lg, porque cuatro descripciones a la vez en una
 * pantalla de teléfono no se leen, se hojean.
 */
const columnClasses = {
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export function ColumnGrid({
  id,
  eyebrow,
  items,
  columns = 3,
  note,
}: ColumnGridProps) {
  return (
    <section id={id} className="scroll-mt-16 py-20 md:py-28">
      <Container>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {eyebrow}
        </h2>

        <ul
          className={`mt-10 grid grid-cols-1 gap-x-10 gap-y-10 ${columnClasses[columns]}`}
        >
          {items.map((item) => (
            <li key={item.title}>
              <h3 className="font-bold text-aipg-text">{item.title}</h3>
              <p className="mt-2.5 text-pretty leading-relaxed text-aipg-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

        {note && (
          <p className="mt-10 text-pretty leading-relaxed text-aipg-muted">
            {note}
          </p>
        )}
      </Container>
    </section>
  );
}
