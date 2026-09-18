/**
 * Principios de marca.
 *
 * Vive en `brand/` y no en `home/` porque no es una sección de la home: son
 * los principios de AI PlayGrounds, y se muestran igual en la home y en
 * /nosotros. Por eso acepta un `id`, para que /nosotros pueda enlazarlos con
 * un ancla (#principios) desde el menú.
 *
 * La retícula con la regla de acento ya no se dibuja aquí: se mudó a
 * `AccentGrid` cuando /comunidad necesitó el mismo tratamiento. Lo que queda
 * en este archivo es lo único que era suyo — de qué diccionario sale el texto.
 *
 * La numeración 01–05 se cayó en su día y no vuelve. Los principios no son
 * una secuencia: "Sin hype" no va antes que "En español", van a la vez. Un
 * número delante afirmaba un orden que no existe.
 *
 * Server Component, sin interactividad ni animaciones.
 */

import { getDictionary } from "@/dictionaries";
import { AccentGrid } from "@/components/ui/AccentGrid";

type PrinciplesProps = {
  /** Ancla del menú. `scroll-mt` lo compensa dentro de AccentGrid. */
  id?: string;
};

export async function Principles({ id }: PrinciplesProps = {}) {
  const dict = await getDictionary();
  const t = dict.principles;

  return <AccentGrid id={id} eyebrow={t.eyebrow} items={t.items} />;
}
