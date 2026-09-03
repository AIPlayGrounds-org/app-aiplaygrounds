/**
 * Capacitación corporativa. Habla a un público distinto al de la home: RR.HH. y gerencias, no builders. Los dos discursos no se mezclan.
 *
 * Todavía no tiene contenido definitivo: muestra el encabezado y la lista de
 * lo que va a vivir aquí. Existe para que el enlace del menú lleve a algún
 * sitio en vez de a un 404.
 */

import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { PageHeader } from "@/components/page/PageHeader";
import { ComingSoon } from "@/components/page/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.pages.companies.eyebrow };
}

export default async function Page() {
  const dict = await getDictionary();
  const t = dict.pages.companies;

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
      <ComingSoon
        label={dict.pages.underConstruction}
        note={dict.pages.underConstructionNote}
        items={t.upcoming}
      />
    </>
  );
}
