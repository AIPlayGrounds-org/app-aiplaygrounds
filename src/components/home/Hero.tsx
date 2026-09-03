/**
 * Encabezado de la home — dirección "injerto periwinkle".
 *
 * Cambia respecto a la versión anterior en tres cosas, y las tres son la
 * dirección, no gusto:
 *
 * 1. DEJA DE ESTAR CENTRADO. Ocupa la mitad derecha de la retícula a partir
 *    de lg, con la izquierda vacía. El vacío es el elemento: la referencia
 *    consigue presencia con aire, no con tamaño.
 *
 * 2. EL TITULAR VA EN SANS DE PESO ALTO, no en serif de display. La serif se
 *    mueve al párrafo de abajo, que es texto seguido y es donde una serif
 *    trabaja mejor.
 *
 * 3. EL BOTÓN PRINCIPAL ES DE TINTA. El periwinkle se retira a la regla de
 *    tres píxeles sobre la etiqueta y al punto separador. Aparece dos veces y
 *    ocupa muy poco, que es lo que el CLAUDE.md pedía del acento.
 *
 * Se cayó por el camino la llamada al pie "[1]" que unía el titular con la
 * nota: era un recurso de la composición centrada, y en una columna alineada
 * a la izquierda el párrafo ya está donde tiene que estar sin necesidad de
 * que nadie lo señale.
 *
 * Server Component: no hay interactividad ni animaciones. Todo el texto sale
 * de los diccionarios, nunca escrito directo aquí.
 */

import { getDictionary, getLocale } from "@/dictionaries";
import { localizedHref } from "@/config/navigation";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function Hero() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.home;

  return (
    <section className="py-20 md:py-28 lg:py-36">
      <Container>
        {/* Móvil primero: una columna a ancho completo. La retícula de doce y
            el desplazamiento a la derecha solo entran desde lg, donde hay
            ancho que sobra para permitirse el vacío. */}
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            {/* La marca gráfica del acento. Tres píxeles de periwinkle: es
                todo el color que necesita el encabezado. */}
            <div aria-hidden="true" className="h-[3px] w-12 bg-aipg-accent" />

            <p className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
              {t.eyebrowBrand}{" "}
              <span aria-hidden="true" className="text-aipg-accent-text">
                ·
              </span>{" "}
              {t.eyebrowRegion}
            </p>

            {/* Cada línea es un bloque: el corte es intencional, no fruto del
                ancho disponible. */}
            <h1 className="mt-6 text-display font-bold text-aipg-text">
              <span className="block">{t.titleLine1}</span>
              <span className="block">{t.titleLine2}</span>
            </h1>

            {/* ~55 caracteres por línea. La serif hereda del body, no hace
                falta pedirla. */}
            <p className="mt-8 max-w-[46ch] text-pretty text-lg leading-relaxed text-aipg-muted md:text-xl">
              {t.note}
            </p>

            <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-3">
              <ButtonLink href={localizedHref(locale, "/comunidad")}>
                {t.ctaCommunity}
              </ButtonLink>

              <ButtonLink href={localizedHref(locale, "/eventos")} variant="line">
                {t.ctaEvents}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
