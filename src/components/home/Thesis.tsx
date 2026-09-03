/**
 * Sección de tesis de la home — paso 4.
 *
 * Server Component, sin interactividad ni animaciones. Todo el texto viene de
 * los diccionarios. Las líneas divisorias separan la sección del encabezado y
 * el cierre destacado del cuerpo.
 */

import { getDictionary } from "@/dictionaries";
import { Container } from "@/components/layout/Container";

export async function Thesis() {
  const dict = await getDictionary();
  const t = dict.thesis;

  return (
    <section className="py-24 md:py-32 lg:py-36">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {t.eyebrow}
        </p>

        <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {t.taglineLeft}{" "}
          <span aria-hidden="true" className="text-aipg-accent-text">
            ·
          </span>{" "}
          {t.taglineRight}
        </p>

        {/* Dos claves, no un salto de línea dentro del texto: el corte del
            titular puede caer en otro sitio al traducirlo. */}
        <h2 className="mt-6 text-title font-bold">
          <span className="block">{t.titleLine1}</span>
          <span className="block">{t.titleLine2}</span>
        </h2>

        {/* ~67 caracteres por línea: algo más ancho que el subtítulo del
            encabezado porque aquí hay varios párrafos seguidos de lectura. */}
        <div className="mt-10 max-w-xl space-y-6 text-pretty text-base leading-relaxed text-aipg-muted md:text-lg">
          {t.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <p className="mt-12 max-w-2xl border-t border-aipg-border pt-10 text-pretty text-xl font-medium leading-snug text-aipg-text md:mt-14 md:pt-12 md:text-2xl">
          {t.closing}
        </p>
      </Container>
    </section>
  );
}
