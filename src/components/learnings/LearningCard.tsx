/**
 * Tarjeta de un aprendizaje. La usan las DOS categorías.
 *
 * Programas y cursos comparten anatomía —portada, título, descripción y una
 * línea de metadatos al pie— y lo único que cambia es qué dice esa línea: un
 * programa cuenta estado, nivel y modalidad; un curso cuenta tipo, lecciones
 * y duración. Quién pone qué lo decide la página, no este componente, así que
 * no hay dos tarjetas casi iguales que un día se separen sin querer.
 *
 * El ESTADO se pinta aparte del resto de metadatos porque no es un dato más:
 * dice si el visitante puede apuntarse hoy. Va primero y con un punto de
 * color delante.
 *
 * El bloque superior admite ilustración cuando exista (`imagen`). Mientras no
 * la haya, se genera: un tono de la paleta, una retícula de puntos y un disco
 * de acento que cambia de sitio con el slug.
 *
 * Generada y no ilustrada a propósito. Un dibujo genérico de archivo diría
 * menos que esto y encima mentiría sobre el contenido; en cambio la retícula
 * es el punto separador del logo llevado a sistema, que es un elemento gráfico
 * que la marca YA tiene.
 *
 * La línea de metadatos al pie sale ya montada del servidor, con sus puntos
 * medios de separación.
 */

import Link from "next/link";
import Image from "next/image";
import type { CoverTone, LearningState } from "@/content/learnings";

type LearningCardProps = {
  titulo: string;
  descripcion: string;
  /** Ya traducidos y en el orden en que se muestran. */
  meta: string[];
  /** Solo los programas lo tienen: un curso no se "abre" ni se "cierra". */
  estado?: { key: LearningState; label: string };
  cta: { label: string; href: string };
  cover: { tone: CoverTone; image?: string };
  /** Semilla de la marca de la portada. Se usa el slug del aprendizaje. */
  seed: string;
};

/**
 * El estado se dice con texto Y con un punto de color, no solo con color: a
 * quien no distingue el periwinkle del gris, el texto se lo cuenta igual.
 * El punto solo acompaña.
 */
const stateDot: Record<LearningState, string> = {
  proximo: "bg-aipg-accent",
  encurso: "bg-aipg-accent",
  finalizado: "bg-aipg-border-strong",
};

/** Los tonos viven en `globals.css`; aquí solo se eligen. */
const coverClass: Record<CoverTone, string> = {
  sand: "bg-aipg-cover-sand",
  peri: "bg-aipg-cover-peri",
  ink: "bg-aipg-cover-ink",
};

/**
 * Color de la retícula de puntos sobre cada tono. `currentColor` lo hereda el
 * degradado, así que basta con fijar el color de texto del contenedor.
 */
const latticeClass: Record<CoverTone, string> = {
  sand: "text-aipg-text opacity-25",
  peri: "text-aipg-text opacity-25",
  // Sobre tinta el mismo porcentaje se percibe casi el doble de fuerte: un
  // punto claro sobre negro tiene mucho más contraste que uno oscuro sobre
  // marfil. Se compensa a la baja.
  ink: "text-aipg-bg opacity-15",
};

/**
 * Paso de la retícula, en píxeles. Lo comparten el degradado que la dibuja y
 * la posición de la marca, así que la marca cae SIEMPRE sobre un punto de la
 * trama y no entre dos.
 *
 * Ese detalle es la diferencia entre un elemento gráfico y una bola suelta:
 * flotando por libre se lee como un descuido; encajada en la retícula se lee
 * como un nodo señalado.
 */
const LATTICE = 14;

/**
 * Nodos donde puede caer la marca, en coordenadas de retícula (columna, fila).
 *
 * El rango está acotado para que quepan en la portada más estrecha que puede
 * darse —una tarjeta a un tercio de ancho en pantalla pequeña— sin salirse ni
 * pegarse al borde. Tampoco hay ninguno en el centro exacto: centrado se lee
 * como una diana.
 */
const markNodes = [
  { col: 5, row: 3 },
  { col: 13, row: 6 },
  { col: 8, row: 8 },
  { col: 15, row: 3 },
  { col: 6, row: 7 },
  { col: 11, row: 4 },
] as const;

/**
 * Elige la posición a partir del slug. DETERMINISTA a propósito: con
 * Math.random(), servidor y navegador pintarían posiciones distintas y React
 * avisaría de que el HTML no coincide. Además, así una tarjeta se ve siempre
 * igual y el visitante puede reconocerla.
 */
function spotFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const node = markNodes[hash % markNodes.length];
  return { top: node.row * LATTICE, left: node.col * LATTICE };
}

export function LearningCard({
  titulo,
  descripcion,
  meta,
  estado,
  cta,
  cover,
  seed,
}: LearningCardProps) {
  const spot = spotFor(seed);
  return (
    <li>
      {/* La tarjeta entera es el enlace: en un bloque de este tamaño, obligar
          a apuntar a un texto pequeño del pie es trabajo de más. El grupo
          permite que el título reaccione al pasar por cualquier parte. */}
      <Link
        href={cta.href}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-aipg-border bg-aipg-surface transition-colors hover:border-aipg-border-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aipg-focus"
      >
        {/* Proporción fija para que todas las portadas midan igual aunque los
            títulos de debajo tengan distinto número de líneas. */}
        <div
          className={`relative aspect-[16/9] w-full overflow-hidden ${
            cover.image ? "" : coverClass[cover.tone]
          }`}
        >
          {cover.image ? (
            <Image
              src={cover.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <>
              {/* Retícula de puntos. Es el punto separador del logo llevado a
                  sistema: la marca ya tiene un elemento gráfico propio, así
                  que la portada no necesita inventarse uno. */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 ${latticeClass[cover.tone]}`}
                style={{
                  backgroundImage:
                    "radial-gradient(circle, currentColor 1px, transparent 1.2px)",
                  backgroundSize: `${LATTICE}px ${LATTICE}px`,
                }}
              />

              {/* La marca de acento: un nodo de la retícula señalado con un
                  anillo. Cambia de sitio con el slug, así que cada aprendizaje
                  tiene su portada sin que nadie la diseñe una a una — y sin
                  fingir una ilustración que no existe.

                  El anillo crece al pasar el ratón. Es la única animación de
                  la tarjeta, y `globals.css` ya la desactiva para quien tiene
                  activado "reducir movimiento". */}
              <div
                aria-hidden="true"
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: spot.top, left: spot.left }}
              >
                <div className="h-2.5 w-2.5 rounded-full bg-aipg-accent" />
                <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-aipg-accent opacity-60 transition-transform duration-500 group-hover:scale-125" />
                <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-aipg-accent opacity-25 transition-transform duration-700 group-hover:scale-110" />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          {estado && (
            <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-aipg-text">
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${stateDot[estado.key]}`}
              />
              {estado.label}
            </p>
          )}

          <h3 className="text-lg font-bold text-aipg-text transition-colors group-hover:text-aipg-accent-text">
            {titulo}
          </h3>

          {/* flex-1 empuja los metadatos al fondo: así la línea del pie cae a
              la misma altura en todas las tarjetas de la fila, tenga cada una
              dos líneas de descripción o tres. */}
          <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-aipg-muted">
            {descripcion}
          </p>

          {/* La llamada a la acción NO es un enlace: la tarjeta entera ya lo
              es, y un enlace dentro de otro no es HTML válido. Es la señal
              visible de que esto se pulsa, con la flecha desplazándose al
              pasar por encima de cualquier parte de la tarjeta. */}
          <p className="mt-5 flex items-center gap-1.5 font-sans text-sm font-medium text-aipg-text">
            {cta.label}
            <span
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </p>

          <p className="mt-3 font-mono text-xs text-aipg-muted">
            {meta.map((part, index) => (
              <span key={part}>
                {index > 0 && (
                  <span aria-hidden="true" className="px-1.5 text-aipg-accent-text">
                    ·
                  </span>
                )}
                {part}
              </span>
            ))}
          </p>
        </div>
      </Link>
    </li>
  );
}
