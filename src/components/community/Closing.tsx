/**
 * Cierre de /comunidad.
 *
 * Una sola frase y los dos botones del encabezado repetidos. No lleva
 * etiqueta en monoespaciada como el resto de secciones: las etiquetas sirven
 * para orientar a quien está recorriendo la página, y aquí ya no queda
 * página que recorrer.
 *
 * La frase va a tamaño de subtítulo y en tinta, no en el gris secundario. Es
 * la única línea de toda la página que se dirige al lector en segunda
 * persona, y es la que tiene que quedarse.
 *
 * Server Component.
 */

import { getDictionary } from "@/dictionaries";
import { Container } from "@/components/layout/Container";
import { CommunityActions } from "./CommunityActions";

export async function Closing() {
  const dict = await getDictionary();
  const t = dict.pages.community;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="max-w-2xl text-pretty text-xl font-medium leading-snug text-aipg-text md:text-2xl">
          {t.closing}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <CommunityActions />
        </div>
      </Container>
    </section>
  );
}
