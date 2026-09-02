/**
 * Navegación principal. Server Component.
 *
 * Los desplegables funcionan solo con CSS (group-hover + group-focus-within):
 * se abren con el ratón y también tabulando con el teclado, sin JavaScript.
 * El único JS de la barra es el menú móvil y el selector de idioma.
 *
 * Los bordes finos entre bloques vienen de la referencia visual (sección 6).
 */

import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { getDictionary, getLocale } from "@/dictionaries";
import {
  navBlocks,
  companiesLink,
  localizedHref,
} from "@/config/navigation";
import { Container } from "./Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu, type MobileNavBlock } from "./MobileMenu";

export async function Header() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  const href = (path: string) => localizedHref(locale, path);

  // Los textos del menú móvil se resuelven aquí, en el servidor, y se pasan ya
  // traducidos: al navegador solo llegan las cadenas visibles.
  const mobileBlocks: MobileNavBlock[] = navBlocks.map((block) => ({
    label: dict.nav[block.labelKey],
    href: href(block.href),
    items: (block.items ?? []).map((item) => ({
      label: dict.nav[item.labelKey],
      href: item.external ? item.href : href(item.href),
      external: item.external,
    })),
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-aipg-border bg-aipg-bg/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-stretch">
        <Link
          href={href("/")}
          aria-label={dict.nav.home}
          className="flex items-center border-r border-aipg-border pr-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-aipg-focus"
        >
          <Logo className="text-base" />
        </Link>

        <nav className="hidden items-stretch md:flex">
          {navBlocks.map((block) => (
            <div
              key={block.href}
              className="group relative flex items-stretch border-r border-aipg-border"
            >
              <Link
                href={href(block.href)}
                className="flex items-center gap-1.5 px-5 text-sm text-aipg-muted transition-colors hover:text-aipg-text group-hover:text-aipg-text focus-visible:text-aipg-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-aipg-focus"
              >
                {dict.nav[block.labelKey]}
                {block.items && (
                  <span aria-hidden="true" className="text-[0.65rem]">
                    ▾
                  </span>
                )}
              </Link>

              {block.items && (
                <div className="invisible pointer-events-none absolute left-0 top-full min-w-56 translate-y-1 border border-aipg-border-strong bg-aipg-surface opacity-0 transition-[opacity,transform] duration-150 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <ul className="flex flex-col py-1">
                    {block.items.map((item) => (
                      <li key={item.href + item.labelKey}>
                        <Link
                          href={item.external ? item.href : href(item.href)}
                          {...(item.external
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                          className="block px-5 py-2.5 text-sm text-aipg-muted transition-colors hover:bg-aipg-bg hover:text-aipg-text focus-visible:bg-aipg-bg focus-visible:text-aipg-text focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-aipg-focus"
                        >
                          {dict.nav[item.labelKey]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-stretch">
          <div className="flex items-stretch border-l border-aipg-border">
            <LocaleSwitcher current={locale} label={dict.locale.switch} />
          </div>

          <div className="hidden items-center border-l border-aipg-border pl-5 md:flex">
            <Link
              href={href(companiesLink.href)}
              className="rounded-aipg bg-aipg-accent px-4 py-2 text-sm font-medium text-aipg-on-accent transition-colors hover:bg-aipg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aipg-focus"
            >
              {dict.nav[companiesLink.labelKey]}
            </Link>
          </div>

          <div className="flex items-stretch border-l border-aipg-border md:hidden">
            <MobileMenu
              blocks={mobileBlocks}
              companies={{
                label: dict.nav[companiesLink.labelKey],
                href: href(companiesLink.href),
              }}
              openLabel={dict.nav.openMenu}
              closeLabel={dict.nav.closeMenu}
            />
          </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
