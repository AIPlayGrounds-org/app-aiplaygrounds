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

// TODO: URL real del servidor de Discord.
const DISCORD_URL = "#";

export const navBlocks: NavBlock[] = [
  {
    labelKey: "community",
    href: "/comunidad",
    items: [
      { labelKey: "communityHome", href: "/comunidad" },
      { labelKey: "events", href: "/eventos" },
      { labelKey: "discord", href: DISCORD_URL, external: true },
    ],
  },
  {
    labelKey: "programs",
    href: "/programas",
    items: [
      { labelKey: "allPrograms", href: "/programas" },
      { labelKey: "aiFundamentals", href: "/programas/ai-fundamentals" },
      { labelKey: "theRealAi", href: "/programas/the-real-ai" },
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

// TODO: URLs reales de las redes.
export const socialLinks = [
  { labelKey: "linkedin" as const, href: "#" },
  { labelKey: "discord" as const, href: DISCORD_URL },
  { labelKey: "whatsapp" as const, href: "#" },
  { labelKey: "github" as const, href: "#" },
];

/** Antepone el idioma a una ruta interna. */
export function localizedHref(locale: string, href: string) {
  return `/${locale}${href}`;
}
