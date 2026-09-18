/**
 * Para quién es la comunidad — y para quién no.
 *
 * La segunda columna es la que hace el trabajo. Una página que solo dice a
 * quién sirve no filtra a nadie; una que manda a otro sitio a quien no encaja
 * es "sin hype" aplicado a la propia comunidad, y además ahorra decepciones
 * después.
 *
 * Las dos columnas NO son simétricas a propósito: la de "es para ti" lleva la
 * regla de acento y la otra una línea neutra. Sin esa diferencia, la página
 * parecería estar ofreciendo dos opciones equivalentes.
 *
 * Server Component.
 */

import { getDictionary } from "@/dictionaries";
import { Container } from "@/components/layout/Container";

export async function Audience() {
  const dict = await getDictionary();
  const t = dict.pages.community.audience;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {t.eyebrow}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
          <Column
            title={t.forTitle}
            items={t.forItems}
            markerClassName="border-aipg-accent"
          />
          <Column
            title={t.againstTitle}
            items={t.againstItems}
            markerClassName="border-aipg-border-strong"
          />
        </div>
      </Container>
    </section>
  );
}

type ColumnProps = {
  title: string;
  items: readonly string[];
  markerClassName: string;
};

function Column({ title, items, markerClassName }: ColumnProps) {
  return (
    <div className={`border-t-2 pt-4 ${markerClassName}`}>
      <h3 className="text-lg font-bold text-aipg-text">{title}</h3>

      <ul className="mt-4">
        {items.map((item) => (
          <li
            key={item}
            className="border-b border-aipg-border py-3 text-pretty leading-relaxed text-aipg-muted last:border-b-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
