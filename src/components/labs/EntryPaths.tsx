/**
 * Los dos caminos de entrada a AI Labs.
 *
 * No son dos audiencias que hay que separar como en la home —individuos y
 * empresas—, sino dos maneras de llegar al mismo sitio: trayendo un proceso
 * de industria, o trayendo una pregunta científica. Por eso van lado a lado y
 * con el mismo peso visual, sin que uno sea el principal.
 *
 * Cada uno lleva su propio botón, y ese es el motivo de que esta sección
 * exista en vez de resolverse con dos botones sueltos bajo el encabezado: el
 * botón solo se entiende después de leer a quién va dirigido.
 *
 * NO lleva la regla de acento aunque su forma lo pida. Justo encima está la
 * retícula de los dos espacios, que sí la lleva, y dos bloques marcados igual
 * y seguidos se leen como una sola sección de cuatro celdas. Aquí la línea es
 * fina y neutra: separa sin volver a decir "esto es importante".
 *
 * SUPUESTO PENDIENTE DE CONFIRMAR: los dos botones apuntan al grupo de
 * WhatsApp. El copy los nombra pero no dice a dónde llevan, y hoy no hay otra
 * puerta. Lo natural sería que cada uno abriera un formulario distinto —son
 * dos perfiles muy distintos y conviene saber cuál llega—, pero la collection
 * `Leads` es el paso 9 y todavía no existe.
 *
 * Server Component.
 */

import { getDictionary } from "@/dictionaries";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { socialHref } from "@/config/navigation";

export async function EntryPaths() {
  const dict = await getDictionary();
  const t = dict.pages.aiLabs.paths;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-aipg-muted">
          {t.eyebrow}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
          {t.items.map((path) => (
            <div key={path.title} className="border-t border-aipg-border pt-5">
              <h3 className="text-lg font-bold text-aipg-text">{path.title}</h3>

              <p className="mt-3 text-pretty leading-relaxed text-aipg-muted">
                {path.description}
              </p>

              {/* El botón se separa del párrafo más de lo habitual: es el
                  final de un argumento corto, no el pie de una tarjeta. */}
              <div className="mt-8">
                <ButtonLink href={socialHref("whatsapp")} variant="line" external>
                  {path.cta}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
