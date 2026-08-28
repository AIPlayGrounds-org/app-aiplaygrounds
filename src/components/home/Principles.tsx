/**
 * Principios de marca — parte del paso 5.
 *
 * Server Component, sin interactividad ni animaciones.
 *
 * Sobre las divisorias de la retícula:
 *
 * El borde INFERIOR de la última fila lo pone el <ul>, no las celdas. Cuando
 * lo ponían las celdas, la línea se cortaba a la mitad: con cinco elementos en
 * tres columnas la última fila solo tiene dos, y la tercera posición no existe
 * para aportar su tramo de línea.
 *
 * Por eso cada celda solo dibuja su borde inferior si NO está en la última
 * fila, y esa condición cambia con el número de columnas: en móvil hay una
 * sola columna (última fila = último elemento), desde md hay tres. Ambos
 * índices se calculan a partir de la longitud del array, así que añadir o
 * quitar principios no rompe el dibujo.
 */

import { getDictionary } from "@/dictionaries";
import { Container } from "@/components/layout/Container";

const COLUMNS_MD = 3;

const cellBase = [
  "flex items-baseline gap-4 py-6",
  "md:px-6 md:py-8",
  // Borde izquierdo solo a las celdas que no abren fila: evita que quede una
  // línea vertical colgando en el hueco vacío de la última fila.
  "md:[&:not(:nth-child(3n+1))]:border-l md:border-aipg-border",
  "md:[&:nth-child(3n+1)]:pl-0",
  "md:[&:nth-child(3n)]:pr-0",
].join(" ");

export async function Principles() {
  const dict = await getDictionary();
  const t = dict.principles;

  const total = t.items.length;
  // Índice en el que empieza la última fila de la retícula de tres columnas.
  const lastRowStart = total - (total % COLUMNS_MD || COLUMNS_MD);

  return (
    <section className="border-t border-aipg-border py-20 md:py-28">
      <Container>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {t.eyebrow}
        </h2>

        <ul className="mt-10 grid grid-cols-1 border-y border-aipg-border md:grid-cols-3">
          {t.items.map((item, index) => {
            const isLastOverall = index === total - 1;
            const isInLastRowMd = index >= lastRowStart;

            return (
              <li
                key={item.title}
                className={[
                  cellBase,
                  isLastOverall ? "" : "border-b border-aipg-border",
                  isInLastRowMd ? "md:border-b-0" : "md:border-b",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-aipg-muted"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Título y descripción comparten columna, así la descripción
                    queda alineada con el título y no debajo del número. */}
                <div>
                  <h3 className="text-lg font-medium text-aipg-text md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-aipg-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
