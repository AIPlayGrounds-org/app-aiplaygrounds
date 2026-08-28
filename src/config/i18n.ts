/**
 * Idiomas del sitio. Único lugar donde se declaran.
 *
 * Lo importan tanto `proxy.ts` (que corre en el edge, antes de la app) como
 * los diccionarios (que corren en el servidor). Por eso vive aparte: no puede
 * arrastrar dependencias de React ni de Next del lado servidor.
 */

export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

/** El español es la fuente del sitio, no una traducción. */
export const defaultLocale: Locale = "es";

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}

/**
 * Nombre de cada idioma EN SU PROPIO IDIOMA.
 *
 * No van en los diccionarios a propósito: "English" se escribe igual esté el
 * sitio en español o en inglés. Se usan como etiqueta accesible del selector,
 * junto con `lang` en el enlace, para que un lector de pantalla pronuncie cada
 * nombre con la fonética correcta.
 */
export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};
