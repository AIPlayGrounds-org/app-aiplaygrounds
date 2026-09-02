"use client";

/**
 * Selector de idioma. Cliente porque necesita la ruta actual para poder
 * intercambiar /es/programas por /en/programas conservando la página.
 *
 * El área clicable ocupa TODO el alto de la barra, no solo el alto del texto.
 * Antes el enlace medía 26x24 px dentro de un bloque de 90x64: el resto era
 * zona muerta que parecía parte del control y se tragaba los clics sin hacer
 * nada. El relleno vive en el <a>, nunca en el contenedor.
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
            className={`flex min-w-11 items-center justify-center uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-aipg-focus ${
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
