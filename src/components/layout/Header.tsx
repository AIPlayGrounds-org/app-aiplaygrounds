/**
 * Navegación principal. Server Component.
 *
 * ESTÉTICA: anthropic.com. Se fueron las líneas verticales que partían la
 * barra en bloques — venían de la referencia anterior (Crafter Station) y son
 * lo contrario de lo que hace esta: allí la estructura la dibujan los bordes,
 * aquí la dibuja el espacio. Una barra sin divisorias se lee de un vistazo y
 * deja que el único elemento con peso visual sea el botón.
 *
 * Con las líneas se fue también el reparto anterior: los enlaces estaban a la
 * izquierda, pegados al logo, con un vacío enorme en medio. Ahora el logo
 * ancla la izquierda y TODO lo demás se agrupa a la derecha, como en la
 * referencia. El vacío pasa a estar entre los dos grupos, que es donde hace
 * trabajo en vez de estorbar.
 *
 * Los desplegables siguen funcionando solo con CSS (group-hover +
 * group-focus-within): se abren con el ratón y también tabulando con el
 * teclado, sin JavaScript. El único JS de la barra es el menú móvil y el
 * selector de idioma.
 */

import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { getDictionary, getLocale } from "@/dictionaries";
import {
  navBlocks,
  companiesLink,
  localizedHref,
} from "@/config/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "./Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu, type MobileNavBlock } from "./MobileMenu";

/**
 * Galón del desplegable. Sustituye al carácter "▾", que cada sistema dibuja a
 * su manera y en algunos sale como un triángulo macizo demasiado pesado para
 * el peso de la tipografía que acompaña.
 */
function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 6"
      className="h-[5px] w-[9px] transition-transform duration-150 group-hover:translate-y-px"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

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
    <header className="sticky top-0 z-40 border-b border-aipg-border bg-aipg-bg/92 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center">
          <Link
            href={href("/")}
            aria-label={dict.nav.home}
            className="flex items-center rounded-aipg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aipg-focus"
          >
            <Logo className="text-base" />
          </Link>

          {/* Todo lo demás vive a la derecha. El `ml-auto` empuja el grupo
              entero, así que el hueco queda entre el logo y los enlaces. */}
          <div className="ml-auto flex items-center gap-5 md:gap-7">
            <nav className="hidden items-center gap-7 md:flex">
              {navBlocks.map((block) => (
                <div key={block.href} className="group relative">
                  <Link
                    href={href(block.href)}
                    className="flex items-center gap-1.5 rounded-aipg py-2 text-sm text-aipg-text transition-colors hover:text-aipg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aipg-focus"
                  >
                    {dict.nav[block.labelKey]}
                    {block.items && <Chevron />}
                  </Link>

                  {block.items && (
                    /* El panel arranca pegado al borde inferior del enlace y
                       sin hueco entre medias: si lo hubiera, el ratón cruzaría
                       una franja muerta al bajar y el desplegable se cerraría.
                       El `pt-2` de dentro hace de separación visual. */
                    <div className="invisible pointer-events-none absolute left-0 top-full max-w-[calc(100vw-3rem)] translate-y-1 pt-2 opacity-0 transition-[opacity,transform] duration-150 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="flex min-w-56 flex-col rounded-aipg border border-aipg-border bg-aipg-surface py-1.5 shadow-[0_8px_24px_-8px_rgba(20,20,19,0.16)]">
                        {block.items.map((item) => (
                          <li key={item.href + item.labelKey}>
                            <Link
                              href={item.external ? item.href : href(item.href)}
                              {...(item.external
                                ? { target: "_blank", rel: "noreferrer" }
                                : {})}
                              className="block px-4 py-2 text-sm text-aipg-muted transition-colors hover:text-aipg-text focus-visible:text-aipg-text focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-aipg-focus"
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

            <LocaleSwitcher current={locale} label={dict.locale.switch} />

            <ButtonLink
              href={href(companiesLink.href)}
              className="hidden !px-4 !py-2 md:inline-flex"
            >
              {dict.nav[companiesLink.labelKey]}
            </ButtonLink>

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
      </Container>
    </header>
  );
}
