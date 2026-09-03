/**
 * Encabezado de las páginas interiores.
 *
 * Alineado a la izquierda, a diferencia del encabezado de la home, que va
 * centrado. La diferencia es deliberada: la home es una portada y puede
 * permitirse la simetría; una página interior es lectura, y el texto se lee
 * mejor sobre un eje izquierdo estable.
 *
 * Server Component. No recibe textos propios: se los pasa cada página desde
 * su diccionario.
 */

import { Container } from "@/components/layout/Container";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
};

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {eyebrow}
        </p>

        {/* max-w-3xl: el titular usa la escala fluida `title`, y a pantalla
            completa una sola línea de 88px cruzaría el ancho entero. */}
        <h1 className="mt-6 max-w-3xl text-balance text-title font-bold">
          {title}
        </h1>

        {intro && (
          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-aipg-muted md:text-xl">
            {intro}
          </p>
        )}
      </Container>
    </section>
  );
}
