/**
 * Encabezado de la home — dirección "editorial claro".
 *
 * Composición centrada: etiqueta, titular y nota caen sobre el mismo eje. El
 * equilibrio sale de la simetría, no de rellenar la derecha con un elemento
 * decorativo.
 *
 * La segunda línea va en cursiva porque marca el giro de la frase — primero la
 * afirmación, luego el matiz. No es énfasis decorativo.
 *
 * Server Component: no hay interactividad ni animaciones. Todo el texto sale
 * de los diccionarios, nunca escrito directo aquí.
 */

import Link from "next/link";
import { getDictionary, getLocale } from "@/dictionaries";
import { localizedHref } from "@/config/navigation";
import { Container } from "@/components/layout/Container";

export async function Hero() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.home;

  return (
    <section className="py-24 md:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
            {t.eyebrowBrand}{" "}
            <span aria-hidden="true" className="text-aipg-accent">
              ·
            </span>{" "}
            {t.eyebrowRegion}
          </p>

          {/* Cada línea es un bloque: el corte es intencional, no fruto del
              ancho. El serif va en peso normal — es una tipografía de display
              y engordarla le quita la elegancia. */}
          <h1 className="mt-8 max-w-4xl font-serif text-display font-normal text-aipg-text">
            <span className="block">{t.titleLine1}</span>
            <span className="block italic">
              {t.titleLine2}
              {/* La llamada de la nota. aria-hidden porque para un lector de
                  pantalla "[1]" es ruido: la nota se lee justo debajo. */}
              <sup
                aria-hidden="true"
                className="ml-1 align-super font-sans text-xs not-italic text-aipg-accent md:text-base"
              >
                [1]
              </sup>
            </span>
          </h1>

          {/* La nota se alinea a la izquierda dentro de un bloque centrado:
              centrar dos líneas de texto seguido las vuelve incómodas de leer. */}
          <div className="mt-10 flex max-w-md gap-2.5 text-left md:mt-12">
            <span
              aria-hidden="true"
              className="font-serif text-sm leading-relaxed text-aipg-accent md:text-base"
            >
              [1]
            </span>
            <p className="text-pretty font-serif text-lg italic leading-relaxed text-aipg-muted md:text-xl">
              {t.note}
            </p>
          </div>

          <div className="mt-12 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 md:mt-14">
            <Link
              href={localizedHref(locale, "/comunidad")}
              className="rounded-aipg bg-aipg-accent px-6 py-3.5 text-center text-sm font-medium text-aipg-on-accent transition-colors hover:bg-aipg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aipg-focus"
            >
              {t.ctaCommunity}
            </Link>

            <Link
              href={localizedHref(locale, "/eventos")}
              className="rounded-aipg border border-aipg-border-strong px-6 py-3.5 text-center text-sm font-medium text-aipg-text transition-colors hover:border-aipg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aipg-focus"
            >
              {t.ctaEvents}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
