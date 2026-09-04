"use client";

/**
 * Selector de idioma. Cliente porque necesita la ruta actual para poder
 * intercambiar /es/aprendizajes por /en/aprendizajes conservando la página.
 *
 * El área clicable mide 44x44 px y vive en el <a>, nunca en el contenedor.
 * Dos correcciones distintas acabaron aquí:
 *
 * - El ancho (`min-w-11`) se puso cuando el enlace medía 26px dentro de un
 *   bloque de 90: el resto era zona muerta que parecía parte del control y se
 *   tragaba los clics sin hacer nada.
 * - El alto (`h-11`) faltaba: lo daba el texto, unos 18px, por debajo de los
 *   24px que WCAG 2.2 pide como mínimo para un objetivo.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/config/i18n";

type Props = {
  current: Locale;
  label: string;
};

export function LocaleSwitcher({ current, label }: Props) {
  const pathname = usePathname();

  // /es/programas/slug -> programas/slug
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-stretch font-mono text-xs"
    >
      {locales.map((locale) => {
        const isCurrent = locale === current;
        return (
          <Link
            key={locale}
            href={`/${locale}${rest ? `/${rest}` : ""}`}
            hrefLang={locale}
            lang={locale}
            aria-label={localeNames[locale]}
            aria-current={isCurrent ? "true" : undefined}
            className={`flex h-11 min-w-11 items-center justify-center uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-aipg-focus ${
              isCurrent
                ? "text-aipg-text"
                : "text-aipg-muted hover:text-aipg-text"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
