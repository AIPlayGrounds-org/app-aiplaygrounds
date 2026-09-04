/**
 * Layout raíz. Vive bajo [lang] a propósito.
 *
 * Para que `next/root-params` funcione, el segmento dinámico [lang] tiene que
 * estar POR ENCIMA del layout raíz. Por eso no existe src/app/layout.tsx.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { locales, isLocale } from "@/config/i18n";
import { getDictionary } from "@/dictionaries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Serif del CUERPO DE TEXTO. Sustituye a Instrument Serif.
 *
 * El cambio no es de gusto: Instrument Serif es una tipografía de DISPLAY,
 * dibujada para titulares grandes. A 16px en un párrafo de cinco líneas sus
 * remates finos se cierran y el texto se vuelve incómodo. Newsreader está
 * dibujada para lo contrario — texto seguido a tamaño de lectura — que es el
 * trabajo que la serif hace ahora en este sitio.
 *
 * Es variable, así que los pesos 400 a 500 salen de un solo archivo. La
 * cursiva se carga porque el encabezado la usa para el giro de la frase.
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // `template` vive aquí para que cada página interior solo declare su propio
  // nombre ("Eventos") y no repita la marca siete veces.
  title: {
    default: "AI PlayGrounds",
    template: "%s — AI PlayGrounds",
  },
  description:
    "Una comunidad de IA en español para quienes quieren ir más allá de usar herramientas: entender cómo funcionan, evaluarlas con criterio y llevar sistemas reales a producción.",
};

/** Prerenderiza /es y /en en el build. */
export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await lang();
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-aipg-bg text-aipg-text">
        {/* Enlace de salto. Invisible hasta que recibe el foco.

            La barra tiene cuatro bloques, dos idiomas y un botón: quien
            navega con teclado tiene que pasar por diez controles en CADA
            página antes de llegar al texto. Este enlace es el atajo, y
            aparece justo al pulsar Tab por primera vez. */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-aipg focus:bg-aipg-text focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-aipg-on-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-aipg-focus"
        >
          {dict.nav.skipToContent}
        </a>

        <Header />
        {/* scroll-mt compensa la barra fija: sin él, el salto deja el primer
            titular escondido debajo de la navegación. */}
        <main id="contenido" className="flex-1 scroll-mt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
