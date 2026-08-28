import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/i18n";
import type { Dictionary } from "./es";

/**
 * Los diccionarios se cargan por import dinámico: al servidor solo llega el
 * del idioma pedido. Como todo esto corre en Server Components, ni un byte
 * de estos textos acaba en el bundle del navegador.
 */
const dictionaries = {
  es: () => import("./es").then((m) => m.es),
  en: () => import("./en").then((m) => m.en),
};

/**
 * Lee el idioma del segmento [lang] sin necesidad de pasarlo por props.
 * `lang()` viene de next/root-params, disponible en cualquier Server Component.
 */
export async function getDictionary(): Promise<Dictionary> {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  return dictionaries[locale]();
}

/** El idioma actual, ya validado. Para construir enlaces. */
export async function getLocale() {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  return locale;
}
