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
 * la haya, es un tono plano de la paleta. Plano y no una ilustración inventada:
 * un dibujo genérico de archivo diría menos que un color, y además mentiría
 * sobre el contenido.
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

export function LearningCard({
  titulo,
  descripcion,
  meta,
  estado,
  cta,
  cover,
}: LearningCardProps) {
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
          className={`relative aspect-[16/9] w-full ${cover.image ? "" : coverClass[cover.tone]}`}
        >
          {cover.image && (
            <Image
              src={cover.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
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

          <p className="mt-5 font-mono text-xs text-aipg-muted">
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
