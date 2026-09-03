/**
 * Nosotros — tesis, principios y equipo.
 *
 * Reutiliza `Thesis` y `Principles` tal cual salen de la home: son el mismo
 * contenido de marca, y duplicarlos aquí garantizaría que un día digan cosas
 * distintas. `Principles` recibe el id del ancla porque el menú enlaza a
 * /nosotros#principios.
 *
 * El equipo todavía no existe, así que su bloque dice qué falta.
 */

import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { PageHeader } from "@/components/page/PageHeader";
import { Container } from "@/components/layout/Container";
import { Thesis } from "@/components/home/Thesis";
import { Principles } from "@/components/brand/Principles";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.pages.about.eyebrow };
}

export default async function AboutPage() {
  const dict = await getDictionary();
  const t = dict.pages.about;

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <Thesis />

      <Principles id="principios" />

      {/* scroll-mt-16 compensa la altura de la barra fija (h-16): sin esto el
          ancla deja el titular escondido debajo de la navegación. */}
      <section
        id="equipo"
        className="scroll-mt-16 py-24 md:py-32"
      >
        <Container>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
            {t.teamEyebrow}
          </h2>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-aipg-muted">
            {t.teamNote}
          </p>
        </Container>
      </section>
    </>
  );
}
