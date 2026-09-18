/**
 * Imagen que se ve cuando alguien comparte un enlace del sitio.
 *
 * POR QUÉ EXISTE: los tres enlaces del pie son LinkedIn, Instagram y WhatsApp.
 * Sin esta imagen, cada enlace que comparte la comunidad sale en esos tres
 * sitios como una tarjeta de texto pelada. Es la única pieza del sitio que se
 * ve MÁS fuera que dentro.
 *
 * NO ES UN PNG GUARDADO. La dibuja Next.js con `ImageResponse` a partir del
 * diccionario, así que dice literalmente lo mismo que el encabezado de la
 * home y en el idioma que corresponda. Cuando cambie el copy, la imagen
 * cambia con él: no hay un archivo que se quede viejo sin que nadie lo note.
 *
 * LAS TIPOGRAFÍAS VAN COMO ARCHIVO. `next/font` entrega CSS, no los bytes de
 * la fuente, y esto se renderiza fuera del navegador: hay que darle el .ttf a
 * mano. Next trae Geist Regular empaquetado, pero el titular de marca es el
 * peso 700, y aquí no se fingen negritas — sin el archivo, el titular saldría
 * en regular y la imagen no se parecería al sitio. De ahí `assets/fonts/`.
 *
 * Los colores van en hexadecimal por la misma razón que en `icon.svg`: esto
 * se dibuja fuera del CSS del sitio, no hay tokens que resolver. Si cambia la
 * paleta en globals.css, hay que traerlos a mano.
 */

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/config/i18n";

export const alt =
  "AI PlayGrounds — una comunidad de IA en español para quienes quieren entender lo que construyen.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#141413";
const bg = "#faf9f5";
const muted = "#6a6960";
const accent = "#8e8efe";

/* El diccionario se carga por `params` y no con `getDictionary()`: aquel lee
   el idioma de `next/root-params`, que sirve dentro del árbol de la página.
   Esto es una ruta aparte que Next invoca por su cuenta, así que el idioma
   llega por parámetro, como dice la documentación de `opengraph-image`. */
const dictionaries = {
  es: () => import("@/dictionaries/es").then((m) => m.es),
  en: () => import("@/dictionaries/en").then((m) => m.en),
};

/* Prerenderiza una imagen por idioma en el build.
   Sin esto la ruta queda dinámica y se dibuja en el momento en que alguien
   comparte el enlace: el rastreador de LinkedIn o WhatsApp tendría que esperar
   a que arranque el servidor y cargue dos tipografías. Varios abandonan antes,
   y la tarjeta sale sin imagen. */
export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const [dict, geistBold, newsreader] = await Promise.all([
    dictionaries[lang](),
    readFile(join(process.cwd(), "assets/fonts/Geist-Bold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Newsreader-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: bg,
          padding: "0 80px",
          fontFamily: "Geist",
        }}
      >
        {/* La regla de acento sobre la etiqueta: la misma marca gráfica que
            abre el encabezado de la home. */}
        <div style={{ display: "flex", width: 64, height: 3, background: accent }} />

        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 23,
            letterSpacing: "0.18em",
            color: muted,
          }}
        >
          {/* El punto separador va en su propio tramo para poder teñirlo:
              es elemento gráfico, no texto, igual que en el logo. */}
          <span>{dict.home.eyebrowBrand.toUpperCase()}</span>
          <span style={{ color: accent, padding: "0 12px" }}>·</span>
          <span>{dict.home.eyebrowRegion.toUpperCase()}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 38,
            /* 74 y no 82: a 82 la segunda línea del titular no cabía en el
               ancho y "decisión." caía sola a una tercera, huérfana. El
               encabezado se compuso en dos líneas y en dos se queda. */
            fontSize: 74,
            lineHeight: 1.05,
            letterSpacing: "-0.022em",
            color: ink,
          }}
        >
          <span>{dict.home.titleLine1}</span>
          <span>{dict.home.titleLine2}</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 34,
            maxWidth: 760,
            fontFamily: "Newsreader",
            fontSize: 31,
            lineHeight: 1.4,
            color: muted,
          }}
        >
          {dict.home.note}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistBold, style: "normal", weight: 700 },
        { name: "Newsreader", data: newsreader, style: "normal", weight: 400 },
      ],
    },
  );
}
