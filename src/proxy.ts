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
  /* Excluye rutas internas de Next y cualquier archivo con extensión
     (imágenes, fuentes, favicon). Sin esto el proxy bloquearía los estáticos.

     `apple-icon` va nombrado aparte porque NO TIENE EXTENSIÓN: Next lo sirve
     en /apple-icon a secas, así que la regla del punto no lo salva y el proxy
     lo tomaba por una página, redirigiendo a /es/apple-icon, que no existe.
     Resultado: iOS no encontraba el icono al guardar el sitio en la pantalla
     de inicio. `icon.svg` sí lleva punto y por eso nunca dio problema.

     Se nombra este y no un patrón más amplio a propósito: la exclusión es por
     prefijo, así que poner `icon` a secas dejaría fuera también una futura
     página /iconos. */
  matcher: ["/((?!_next|apple-icon|.*\\..*).*)"],
};
