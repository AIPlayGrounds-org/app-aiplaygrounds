/**
 * Estructura de la navegación — sección 8 del CLAUDE.md.
 *
 * Cinco bloques, no siete enlaces. La consumen el Header (escritorio) y el
 * MobileMenu, así que vive en un solo sitio para que no se desincronicen.
 *
 * Guarda rutas y CLAVES de diccionario, nunca textos: el texto lo resuelve
 * cada componente según el idioma. Las rutas van sin prefijo de idioma; se
 * les antepone /es o /en al construir el enlace.
 */

import { categoryAnchors } from "@/content/learnings";
import type { Dictionary } from "@/dictionaries/es";

type NavKey = keyof Dictionary["nav"];

export type NavItem = {
  labelKey: NavKey;
  href: string;
  /** Enlace fuera del sitio: se abre en pestaña nueva y no lleva prefijo de idioma. */
  external?: boolean;
};

export type NavBlock = {
  labelKey: NavKey;
  /** Destino del bloque en sí. Si tiene items, además despliega. */
  href: string;
  items?: NavItem[];
};

export const navBlocks: NavBlock[] = [
  {
    labelKey: "community",
    href: "/comunidad",
    items: [
      { labelKey: "communityHome", href: "/comunidad" },
      { labelKey: "events", href: "/eventos" },
    ],
  },
  {
    // Antes era "Programas". Pasó a "Aprendizajes" porque la página ya no
    // lista un solo formato: agrupa programas largos y sesiones cortas, que
    // resuelven necesidades distintas y no se comparan entre sí.
    //
    // El desplegable enlaza a las DOS SECCIONES de la página, no a programas
    // concretos. Con contenido servido por Payload, una lista de programas en
    // el menú se quedaría desactualizada sola; un ancla a una sección no.
    labelKey: "learnings",
    href: "/aprendizajes",
    items: [
      { labelKey: "allLearnings", href: "/aprendizajes" },
      {
        labelKey: "programsSection",
        href: `/aprendizajes#${categoryAnchors.programa}`,
      },
      {
        labelKey: "coursesSection",
        href: `/aprendizajes#${categoryAnchors["curso-taller-workshop"]}`,
      },
    ],
  },
  {
    labelKey: "aiLabs",
    href: "/ai-labs",
  },
  {
    labelKey: "about",
    href: "/nosotros",
    items: [
      { labelKey: "team", href: "/nosotros#equipo" },
      { labelKey: "principles", href: "/nosotros#principios" },
    ],
  },
];

/** Va aparte, como botón a la derecha. No es uno de los cinco bloques. */
export const companiesLink = {
  labelKey: "forCompanies" as NavKey,
  href: "/empresas",
};

/**
 * Redes del footer. Las tres que existen: no hay Discord ni GitHub.
 *
 * Las URL se guardan LIMPIAS, sin los parámetros de seguimiento con que
 * llegan al copiarlas desde la app (`utm_source=qr`, `igsi=`, `mode=`). Esos
 * parámetros describen de dónde salió ESE enlace concreto, no la cuenta, y
 * repartirlos por el sitio ensucia las estadísticas de la propia red.
 */
type SocialKey = "linkedin" | "instagram" | "whatsapp";

export const socialLinks: { labelKey: SocialKey; href: string }[] = [
  {
    labelKey: "linkedin",
    href: "https://www.linkedin.com/company/ai-playgrounds-tech/",
  },
  {
    labelKey: "instagram",
    href: "https://www.instagram.com/aiplaygroundstech",
  },
  {
    labelKey: "whatsapp",
    href: "https://chat.whatsapp.com/ET8AwrRVyg712LIrs6pz59",
  },
];

/** Antepone el idioma a una ruta interna. */
export function localizedHref(locale: string, href: string) {
  return `/${locale}${href}`;
}
