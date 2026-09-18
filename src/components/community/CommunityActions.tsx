/**
 * Los dos botones de /comunidad.
 *
 * Existen como componente porque el copy los pide DOS VECES en la misma
 * página: en el encabezado y repetidos en el cierre. Escribirlos dos veces
 * serían dos sitios donde un día cambiará solo uno de los dos destinos.
 *
 * "Ver próximos encuentros" ya apunta DENTRO del sitio. Hasta ahora salía a
 * Luma porque /eventos decía "en construcción" y mandar a alguien allí era
 * peor que mandarlo fuera; desde que esa página tiene contenido, el enlace
 * vuelve a casa y es /eventos quien lleva a Luma.
 *
 * SUPUESTO PENDIENTE DE CONFIRMAR: "Conversemos sobre un vertical" apunta al
 * grupo de WhatsApp. El copy nombra el botón pero no su destino, y WhatsApp
 * es la única puerta de entrada que existe hoy. Si la intención era un
 * formulario —la collection `Leads` es el paso 9— este es el sitio donde se
 * cambia, y solo este.
 *
 * Server Component.
 */

import { getDictionary, getLocale } from "@/dictionaries";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { localizedHref, socialHref } from "@/config/navigation";

export async function CommunityActions() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.pages.community;

  return (
    <>
      <ButtonLink href={localizedHref(locale, "/eventos")}>
        {t.ctaEvents}
      </ButtonLink>

      <ButtonLink href={socialHref("whatsapp")} variant="line" external>
        {t.ctaVertical}
      </ButtonLink>
    </>
  );
}
