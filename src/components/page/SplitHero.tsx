/**
 * Encabezado a dos columnas de las páginas interiores.
 *
 * Es la estructura Why · How · What del Golden Circle llevada a retícula: a
 * la izquierda solo el título, y a la derecha —más ancha— el porqué, el cómo
 * y los botones. La referencia es la página de Research de Anthropic.
 *
 * NO sustituye a `PageHeader`. Aquel sigue sirviendo a las páginas que
 * todavía son un encabezado sobre un eje izquierdo; este es para las tres que
 * ya tienen copy cerrado y argumentan en dos columnas: /comunidad, /eventos y
 * /ai-labs. Se extrajo al tercer uso, no al primero.
 *
 * LA COLUMNA IZQUIERDA NO DESAPARECE EN MÓVIL: se pone encima de la derecha.
 * Es la diferencia entre una retícula que se reordena y una que esconde
 * contenido, y el título es justamente lo que dice en qué página estás.
 *
 * Los tamaños salen de los tokens, no de valores sueltos: el copy pide "18-19
 * px" para el párrafo grande y "unos 13px" para la línea pequeña, que son
 * exactamente `text-lg` (19px) y `text-xs` (13px) en la escala del sitio.
 *
 * Server Component. No conoce ningún diccionario: recibe el texto resuelto.
 */

import { Container } from "@/components/layout/Container";

type SplitHeroProps = {
  title: string;
  /** El porqué. Es el texto de más peso de la página. */
  lead: string;
  /** Desarrollo del porqué. Opcional: /comunidad resuelve el suyo en una frase. */
  body?: string;
  /**
   * Línea de apoyo en pequeño, con su etiqueta en negrita ("Verticales:",
   * "Espacios:"). Va en color atenuado porque enumera, no afirma.
   */
  note?: { label: string; text: string };
  /** Botones. Los monta quien llama, que es quien sabe a dónde llevan. */
  actions?: React.ReactNode;
};

export function SplitHero({ title, lead, body, note, actions }: SplitHeroProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-12">
          {/* Sin nada debajo, a propósito: el hueco de esta columna es parte
              de la composición. */}
          <h1 className="text-balance text-title font-bold">{title}</h1>

          <div className="lg:col-span-2">
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-aipg-text">
              {lead}
            </p>

            {body && (
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-aipg-muted">
                {body}
              </p>
            )}

            {note && (
              <p className="mt-8 max-w-2xl text-pretty text-xs leading-relaxed text-aipg-muted">
                <strong className="font-bold text-aipg-text">
                  {note.label}
                </strong>{" "}
                {note.text}
              </p>
            )}

            {actions && (
              <div className="mt-10 flex flex-wrap gap-3">{actions}</div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
