/**
 * /aprendizajes — dos secciones con tratamiento visual distinto.
 *
 * Sustituye a la antigua /programas, que listaba un solo formato.
 *
 * Las dos categorías van en TARJETA, con la misma anatomía. Lo único que
 * cambia es qué entra en la línea de metadatos del pie, y eso se monta aquí:
 * un programa cuenta estado, nivel, modalidad y fecha; un curso cuenta tipo,
 * lecciones, cuestionarios y duración.
 *
 * Se montan aquí y no dentro de la tarjeta a propósito. Si la tarjeta
 * recibiera el item entero y decidiera sola, tendría que conocer las dos
 * categorías y volveríamos a tener dos componentes disfrazados de uno.
 *
 * No hay ni una cadena de copy escrita en este archivo.
 */

import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/dictionaries";
import { localizedHref } from "@/config/navigation";
import { programs, courses, categoryAnchors } from "@/content/learnings";
import { PageHeader } from "@/components/page/PageHeader";
import { LearningSection } from "@/components/learnings/LearningSection";
import { LearningCard } from "@/components/learnings/LearningCard";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.pages.learnings.eyebrow };
}

export default async function LearningsPage() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.pages.learnings;

  const programItems = programs();
  const courseItems = courses();

  // La fecha se formatea con el idioma de la página, no con el del servidor.
  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(
      new Date(`${iso}T00:00:00`),
    );

  // Quién elige singular o plural es el idioma, no un `=== 1`: en otras
  // lenguas el corte no está en el uno.
  const plural = new Intl.PluralRules(locale);
  const count = (n: number, forms: { one: string; other: string }) =>
    `${n} ${plural.select(n) === "one" ? forms.one : forms.other}`;

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <LearningSection
        id={categoryAnchors.programa}
        title={t.categories.programa.title}
        intro={t.categories.programa.intro}
        empty={t.categories.programa.empty}
        count={programItems.length}
      >
        {programItems.map((item) => {
          const copy = t.items[item.slug];

          // Nivel · modalidad · fecha. El estado va aparte, con su punto.
          const meta = [
            t.levels[item.nivel],
            t.modes[item.modalidad],
            item.fecha ? formatDate(item.fecha) : null,
          ].filter((part): part is string => part !== null);

          return (
            <LearningCard
              key={item.slug}
              titulo={copy.titulo}
              descripcion={copy.descripcionCorta}
              meta={meta}
              estado={{ key: item.estado, label: t.states[item.estado] }}
              cover={{ tone: item.colorFondo, image: item.imagen }}
              cta={{
                label: copy.ctaLabel,
                href: localizedHref(locale, item.ctaHref),
              }}
            />
          );
        })}
      </LearningSection>

      <LearningSection
        id={categoryAnchors["curso-taller-workshop"]}
        title={t.categories["curso-taller-workshop"].title}
        intro={t.categories["curso-taller-workshop"].intro}
        empty={t.categories["curso-taller-workshop"].empty}
        count={courseItems.length}
      >
        {courseItems.map((item) => {
          const copy = t.items[item.slug];

          // Orden fijo: tipo · lecciones · cuestionarios · duración. Las
          // piezas que no apliquen a este formato simplemente no entran.
          const meta = [
            t.types[item.tipo],
            item.lecciones !== undefined
              ? count(item.lecciones, t.lessons)
              : null,
            item.cuestionarios !== undefined
              ? count(item.cuestionarios, t.quizzes)
              : null,
            item.duracion,
          ].filter((part): part is string => part !== null);

          return (
            <LearningCard
              key={item.slug}
              titulo={copy.titulo}
              descripcion={copy.descripcionCorta}
              meta={meta}
              cover={{ tone: item.colorFondo, image: item.imagen }}
              cta={{
                label: copy.ctaLabel,
                href: localizedHref(locale, item.ctaHref),
              }}
            />
          );
        })}
      </LearningSection>
    </>
  );
}
