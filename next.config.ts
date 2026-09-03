import type { NextConfig } from "next";
import { locales } from "./src/config/i18n";

/**
 * Redirecciones de /programas a /aprendizajes.
 *
 * `statusCode: 301` y no `permanent: true` a propósito: el atajo de Next
 * emite un 308, y aquí se pidió explícitamente un 301. Los dos son permanentes
 * y los buscadores traspasan el posicionamiento con ambos; la diferencia es
 * que el 308 obliga a conservar el método HTTP y el 301 no. Para enlaces que
 * se visitan con GET da igual, pero el criterio pedía 301.
 *
 * Las rutas llevan idioma delante (/es/programas), así que el patrón captura
 * el segmento y lo devuelve intacto. La regla sin idioma también existe porque
 * alguien puede llegar desde un enlace viejo sin prefijo: `proxy.ts` lo
 * mandaría a /es/programas, que ya no existe, así que se atiende antes.
 */
const redirects = async () => [
  {
    source: "/:lang(" + locales.join("|") + ")/programas",
    destination: "/:lang/aprendizajes",
    statusCode: 301 as const,
  },
  {
    source: "/:lang(" + locales.join("|") + ")/programas/:slug",
    destination: "/:lang/aprendizajes/:slug",
    statusCode: 301 as const,
  },
  {
    source: "/programas",
    destination: "/aprendizajes",
    statusCode: 301 as const,
  },
  {
    source: "/programas/:slug",
    destination: "/aprendizajes/:slug",
    statusCode: 301 as const,
  },
];

const nextConfig: NextConfig = {
  redirects,
};

export default nextConfig;
