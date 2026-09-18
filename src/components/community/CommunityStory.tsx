/**
 * El relato de /comunidad: el problema y qué es AI PlayGrounds.
 *
 * Van en la MISMA sección y no en dos, porque son un solo argumento seguido:
 * el problema, "por eso existe", y qué es entonces esto. Partirlo en dos
 * secciones con su aire entre medias rompe justo la frase que las une.
 *
 * La forma es la misma que la de `Thesis`: párrafos de cuerpo en serif y una
 * línea de cierre destacada sobre una divisoria. Es deliberado — las dos son
 * el texto de marca del sitio y deben sonar igual.
 *
 * Server Component.
 */

import { getDictionary } from "@/dictionaries";
import { Container } from "@/components/layout/Container";

export async function CommunityStory() {
  const dict = await getDictionary();
  const t = dict.pages.community;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {t.problem.eyebrow}
        </h2>

        {/* ~67 caracteres por línea: son varios párrafos seguidos de lectura,
            así que la columna es algo más ancha que la de un subtítulo. */}
        <div className="mt-10 max-w-xl space-y-6 text-pretty text-base leading-relaxed text-aipg-muted md:text-lg">
          {t.problem.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {/* La bisagra del texto. Va en tinta y a mayor tamaño porque es la
            frase que convierte el problema en una respuesta. */}
        <p className="mt-12 max-w-2xl border-t border-aipg-border pt-10 text-pretty text-xl font-medium leading-snug text-aipg-text md:mt-14 md:pt-12 md:text-2xl">
          {t.problem.closing}
        </p>

        <h2 className="mt-16 font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted md:mt-20">
          {t.what.eyebrow}
        </h2>

        <div className="mt-10 max-w-xl space-y-6 text-pretty text-base leading-relaxed text-aipg-muted md:text-lg">
          {t.what.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
