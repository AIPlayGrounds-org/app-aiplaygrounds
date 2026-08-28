/**
 * En Next.js 16 el middleware se llama Proxy y el archivo es `proxy.ts`.
 *
 * Función: si la URL no trae idioma (/programas), redirige al idioma por
 * defecto (/es/programas). Las URLs que ya lo traen pasan sin tocarse.
 *
 * No detecta el idioma del navegador a propósito: mientras `en.ts` esté sin
 * traducir, mandar a un angloparlante a /en sería peor que servirle /es.
 * Cuando haya traducción real, la negociación se añade solo aquí.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/config/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Excluye rutas internas de Next y cualquier archivo con extensión
  // (imágenes, fuentes, favicon). Sin esto el proxy bloquearía los estáticos.
  matcher: ["/((?!_next|.*\\..*).*)"],
};
