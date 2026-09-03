/**
 * Principios de marca.
 *
 * Vive en `brand/` y no en `home/` porque no es una sección de la home: son
 * los principios de AI PlayGrounds, y se muestran igual en la home y en
 * /nosotros. Por eso acepta un `id`, para que /nosotros pueda enlazarlos con
 * un ancla (#principios) desde el menú.
 *
 * DIRECCIÓN "injerto periwinkle": cada principio se marca con una regla de
 * dos píxeles de acento sobre el título, en lugar de encerrarlos a todos en
 * una retícula de líneas. Es el mismo recurso que la regla del encabezado, y
 * es donde el periwinkle hace su trabajo ahora que no rellena botones.
 *
 * El cambio se llevó por delante treinta líneas de lógica de bordes. La
 * versión anterior tenía que calcular qué celda estaba en la última fila para
 * no dibujar una línea colgando en el hueco vacío — con cinco elementos en
 * tres columnas, la última fila solo tiene dos. Al marcar cada celda por
 * arriba en vez de separarlas por dentro, el problema desaparece: no hay
 * ninguna línea que pueda quedarse a medias.
 *
 * También se cayó la numeración 01–05. Los principios no son una secuencia:
 * "Sin hype" no va antes que "En español", van a la vez. Un número delante
 * afirmaba un orden que no existe.
 *
 * Server Component, sin interactividad ni animaciones.
 */

import { getDictionary } from "@/dictionaries";
import { Container } from "@/components/layout/Container";

type PrinciplesProps = {
  /** Ancla del menú. `scroll-mt` compensa la altura de la barra fija. */
  id?: string;
};

export async function Principles({ id }: PrinciplesProps = {}) {
  const dict = await getDictionary();
  const t = dict.principles;

  return (
    <section
      id={id}
      className="scroll-mt-16 py-24 md:py-32"
    >
      <Container>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {t.eyebrow}
        </h2>

        {/* Dos columnas desde sm y tres desde md. El hueco vertical es mayor
            que el horizontal para que cada bloque se lea como una unidad y no
            como una fila de una tabla. */}
        <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
          {t.items.map((item) => (
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
