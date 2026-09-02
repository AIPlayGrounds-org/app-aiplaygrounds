/**
 * Cierre del sitio — sección 12 del CLAUDE.md.
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
    <footer className="border-t border-aipg-border">
      <Container>
        <div className="flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href={localizedHref(locale, "/")} aria-label={dict.nav.home}>
            <Logo className="text-base" />
          </Link>
          <p className="mt-4 text-sm text-aipg-muted">{dict.footer.tagline}</p>
        </div>

        <nav aria-label={dict.footer.social}>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {socialLinks.map((link) => (
              <li key={link.labelKey}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-aipg-muted transition-colors hover:text-aipg-text focus-visible:text-aipg-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-aipg-focus"
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
