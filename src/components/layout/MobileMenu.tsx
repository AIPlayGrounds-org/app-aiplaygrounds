"use client";

/**
 * Menú móvil. Cliente porque necesita estado de abierto/cerrado.
 *
 * Recibe los textos ya resueltos desde el Header (Server Component): así el
 * diccionario completo no viaja al navegador, solo las cadenas que se ven.
 */

import { useEffect, useState } from "react";
import Link from "next/link";

export type MobileNavBlock = {
  label: string;
  href: string;
  items: { label: string; href: string; external?: boolean }[];
};

type Props = {
  blocks: MobileNavBlock[];
  companies: { label: string; href: string };
  openLabel: string;
  closeLabel: string;
};

export function MobileMenu({
  blocks,
  companies,
  openLabel,
  closeLabel,
}: Props) {
  const [open, setOpen] = useState(false);

  // Cerrar con Escape y bloquear el scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : openLabel}
        className="flex h-full items-center pl-6 pr-0 text-aipg-text focus-visible:outline focus-visible:outline-1 focus-visible:outline-aipg-accent md:hidden"
      >
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span
            className={`absolute left-0 block h-px w-full bg-current transition-all duration-200 ${
              open ? "top-1/2 rotate-45" : "top-1"
            }`}
          />
          <span
            className={`absolute left-0 block h-px w-full bg-current transition-all duration-200 ${
              open ? "top-1/2 -rotate-45" : "top-[calc(100%-4px)]"
            }`}
          />
        </span>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto border-t border-aipg-border bg-aipg-bg md:hidden"
        >
          <nav className="flex flex-col">
            {blocks.map((block) => (
              <div
                key={block.href}
                className="border-b border-aipg-border px-6 py-5"
              >
                <Link
                  href={block.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted"
                >
                  {block.label}
                </Link>

                {block.items.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-3">
                    {block.items.map((item) => (
                      <li key={item.href + item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          {...(item.external
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                          className="text-lg text-aipg-text"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="px-6 py-6">
              <Link
                href={companies.href}
                onClick={() => setOpen(false)}
                className="block rounded-md bg-aipg-accent px-5 py-3 text-center text-sm font-medium text-aipg-bg"
              >
                {companies.label}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
