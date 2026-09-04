/**
 * Cierre del sitio — sección 11 del CLAUDE.md.
 * Server Component: no tiene interactividad.
 */

import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { getDictionary, getLocale } from "@/dictionaries";
import { socialLinks, localizedHref } from "@/config/navigation";
import { Container } from "./Container";

export async function Footer() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <footer>
      <Container>
        <div className="flex flex-col gap-10 pb-16 pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href={localizedHref(locale, "/")} aria-label={dict.nav.home}>
            <Logo className="text-base" />
          </Link>
          <p className="mt-4 text-sm text-aipg-muted">{dict.footer.tagline}</p>
        </div>

        <nav aria-label={dict.footer.social}>
          <ul className="-my-1.5 flex flex-wrap gap-x-6">
            {socialLinks.map((link) => (
              <li key={link.labelKey}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block py-1.5 text-sm text-aipg-muted transition-colors hover:text-aipg-text focus-visible:text-aipg-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-aipg-focus"
                >
                  {dict.footer[link.labelKey]}
                </Link>
              </li>
            ))}
          </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
