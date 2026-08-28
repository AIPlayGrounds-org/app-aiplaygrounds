/**
 * Encabezado de la home — copy de la sección 7 del CLAUDE.md.
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
    <section className="py-20 md:py-32 lg:py-40">
      <Container>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
        {t.eyebrowBrand}{" "}
        <span aria-hidden="true" className="text-aipg-accent">
          ·
        </span>{" "}
        {t.eyebrowRegion}
      </p>

      {/* Cada línea es un bloque: el corte es intencional, no fruto del ancho.
          Dentro de cada línea el texto sigue fluyendo si la pantalla es
          estrecha, así que en móvil no se desborda. */}
      <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
        <span className="block">{t.titleLine1}</span>
        <span className="block">{t.titleLine2}</span>
      </h1>

      {/* ~60 caracteres por línea. No se usa `ch`: esa unidad mide el glifo "0",
          mucho más ancho que la letra media, y daba 79 caracteres reales.
          Medido sobre el render: 8,6 px por carácter a 18 px => 32rem.
          text-pretty evita que la última línea quede como una palabra suelta. */}
      <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-aipg-muted md:mt-8 md:text-lg">
        {t.subtitle}
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-12">
        <Link
          href={localizedHref(locale, "/comunidad")}
          className="w-full rounded-md bg-aipg-accent px-6 py-3.5 text-center text-sm font-medium text-aipg-bg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aipg-accent sm:w-auto"
        >
          {t.ctaCommunity}
        </Link>

        <Link
          href={localizedHref(locale, "/eventos")}
          className="w-full rounded-md border border-aipg-border px-6 py-3.5 text-center text-sm font-medium text-aipg-text transition-colors hover:border-aipg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aipg-accent sm:w-auto"
        >
          {t.ctaEvents}
        </Link>
        </div>
      </Container>
    </section>
  );
}
