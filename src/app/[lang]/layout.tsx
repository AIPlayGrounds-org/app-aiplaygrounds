/**
 * Layout raíz. Vive bajo [lang] a propósito.
 *
 * Para que `next/root-params` funcione, el segmento dinámico [lang] tiene que
 * estar POR ENCIMA del layout raíz. Por eso no existe src/app/layout.tsx.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { locales, isLocale } from "@/config/i18n";
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
 * Serif de titulares. Solo existe en peso 400: es una tipografía de display y
 * engordarla le quita la elegancia, así que no se piden más pesos. La cursiva
 * sí se carga, porque el encabezado la usa para el giro de la frase.
 */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI PlayGrounds",
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

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-aipg-bg text-aipg-text">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
