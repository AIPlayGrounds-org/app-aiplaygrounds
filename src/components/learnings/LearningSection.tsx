/**
 * Una categoría de aprendizajes: encabezado, entradilla y su índice de filas.
 *
 * El mismo componente sirve a las dos secciones. Lo que cambia entre ellas es
 * el contenido, no el tratamiento: si una categoría se viera distinta de la
 * otra, el visitante creería que son cosas de naturaleza distinta.
 *
 * Si la categoría no tiene items, muestra su estado vacío en lugar de una
 * lista vacía. El tono es el mismo de las páginas en construcción: se dice
 * qué falta en vez de dejar un hueco.
 */

import { Container } from "@/components/layout/Container";

type LearningSectionProps = {
  /** Ancla del menú. `scroll-mt` compensa la barra fija. */
  id: string;
  title: string;
  intro: string;
  empty: string;
  children: React.ReactNode;
  /** Cuántos items tiene. A cero se pinta el estado vacío. */
  count: number;
};

export function LearningSection({
  id,
  title,
  intro,
  empty,
  children,
  count,
}: LearningSectionProps) {
  return (
    <section id={id} className="scroll-mt-16 pb-16 pt-4 md:pb-20">
      <Container>
        <h2 className="text-title font-bold text-aipg-text">{title}</h2>
        <p className="mt-4 max-w-[54ch] text-pretty text-lg leading-relaxed text-aipg-muted">
          {intro}
        </p>

        {count > 0 ? (
          /* El número de columnas sale del número de items, no al revés.

             Con tres columnas fijas y dos programas, la fila quedaba con un
             hueco a la derecha que se lee como contenido que falta o como una
             retícula rota. Con dos columnas, esos mismos dos programas llenan
             la fila y encima salen más anchos, así que la portada y el texto
             respiran.

             El corte está en tres: a partir de ahí compensa la tercera
             columna, porque cuatro items en dos columnas ya son dos filas
             completas. */
          <ul
            className={`mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 ${
              count >= 3 ? "lg:grid-cols-3" : ""
            }`}
          >
            {children}
          </ul>
        ) : (
          <p className="mt-10 max-w-[54ch] border-t border-aipg-border pt-6 text-pretty leading-relaxed text-aipg-muted">
            {empty}
          </p>
        )}
      </Container>
    </section>
  );
}
