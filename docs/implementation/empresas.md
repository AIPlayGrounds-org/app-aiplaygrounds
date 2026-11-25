# Empresas · implementación E222-EM

23/11/2026 · Copy y estructura autorizados solo para Empresas; sin autorización de despliegue ni de captación. [Fuente editorial](../../content/entregables-cliente/02-contenido-web/contenido-web.md#página-empresas).

## Composición y recursos

| Bloque | Patrón |
|---|---|
| `EM1` | `ImmersiveHero`: texto a la izquierda y paisaje a la derecha, foco propio en móvil. Inicio conserva su composición centrada; Formación puede adoptar la misma primitiva sin cambiar su diseño actual. |
| `EM2` | `CollaborationCard`: las ilustraciones v2 de puente y andenes tienen píxeles opacos hasta los bordes inferior y derecho. El contenedor las recorta en su radio y escala desde la misma esquina para no abrir franjas durante el hover. |
| `EM3` | `Section` + `SectionHeading` + `TextLink`; remite a `/#I4`, sin estadísticas ni hitos duplicados. Separa el bloque con espacio en blanco, sin líneas. |
| `EM4` | `InitiativeGrid` e `InitiativeCard`, los mismos que en `I5`. `#EM5` se conserva como ancla de la card de Academy. Investigación usa un SVG nuevo de la misma familia. |
| `EM6` | `FormCTA` reúne introducción, patio anclado abajo a la izquierda y formulario en una sola superficie. En móvil el arte queda debajo de los controles. `OrganizationContactForm` y `FormField` mantienen los cinco controles nativos, errores asociados y foco en el primer error. |

La cabecera, el pie y Starwind `Button` son compartidos. `CompactHero` conserva las presentaciones de Comunidad, AI Labs, Investigación y Equipo. `EditorialMotion` observa una vez `[data-reveal]` y añade `data-entering` solo al entrar; admite entradas `card`, `ink`, normal y retraso `--editorial-delay`. El contenido parte visible, sin JavaScript o en movimiento reducido. Los enlaces combinan navegación nativa, margen de ancla y mejora de preselección sin borrar otros valores.

**Procedencia, iteración 2:** `src/assets/empresas.ts` importa los PNG entregados en `referencias/Empresa/`: `empresa-hero-v2.png`, `empresa-colaboracion-puente-v2.png`, `empresa-colaboracion-andenes-v2.png` y `Patio andino entre flores y piedra.png`. Los tres PNG anteriores permanecen como referencias históricas. `astro:assets` genera WebP responsivos, con alfa para las tres ilustraciones y carga diferida salvo el hero. El patio compensa la transparencia de sus últimas filas con un desplazamiento del 1,65% recortado por la card, sin editar el PNG.

**Refinamiento final (EM1 y EM6).** El hero usa `empresa-hero-v5.png`; las versiones anteriores siguen como referencia. El foco es `center 40%` en escritorio y `34% center` en móvil, con tamaños de recurso que tienen en cuenta el recorte de `object-fit: cover`. El titular y la descripción conservan sus medidas, sin filtros ni sombras.

Empresas usa `FormCTA density="compact"`: menos padding vertical, dos columnas equilibradas en escritorio y el patio de mayor tamaño, sin sustituirlo ni alterar sus proporciones. El formulario reduce a `0.75rem` el espacio entre grupos y a tres filas la altura inicial del mensaje. Conserva controles de al menos `3rem`, su capacidad de crecer y los mensajes accesibles; el estado de envío vacío no reserva altura. El `translate` del 1,65% sigue siendo una compensación fija del alfa inferior, no parallax ni movimiento de entrada. En móvil, el patio conserva su tamaño y aparece después de los controles.

Las microinteracciones globales siguen el [sistema de diseño](../../DESIGN.md#components). Las verticales de Inicio conservan el movimiento de sus imágenes, pero no pasan a ser clicables. Las fichas de Equipo, los formatos de Formación y las métricas de Inicio no reciben un borde interactivo porque no tienen una acción propia.

## Analítica

`src/scripts/analytics.ts` emite `site:analytics` en `document`, con `detail: { name, params }`. No hay proveedor, solicitudes de red, cookies ni persistencia. Un futuro adaptador autorizado debe suscribirse solo con consentimiento aplicable, desactivar detección automática de formularios y mantener Empresas fuera de Clarity.

| Evento | Momento | Datos permitidos |
|---|---|---|
| `cta_click` | Activación de CTA y enlaces internos de cabecera/pie en Empresas | `page`, `section`, `cta_id`, `destination`, `destination_type`, `inquiry_type` opcional; destino sin query. |
| `form_start` | Primer foco en un campo del formulario por vista | `page`, `form_id`, `cta_origin`, tipo si existe. |
| `form_error` | Intento con validación, verificación o envío fallido | Contexto del formulario y `reason` fijo; sin valores. |
| `generate_lead` | Solo ante HTTP aceptado con `status: accepted` y UUID coincidente | Contexto del formulario; sin UUID ni datos personales. |

`cta_origin` representa el último CTA que llevó al formulario antes del intento; el tipo de la conversión representa la selección final. Usar UTM solo en enlaces externos de adquisición. Las navegaciones dentro del sitio no reescriben atribución.

## Activación: bloqueada en la configuración actual

El navegador permite comprobar preselección y edición pero no enviar; no carga Turnstile en este estado. El Worker corta con `503 contact_disabled` antes de leer el cuerpo. Formación mantiene su endpoint y flujo propios. No hay modo de éxito simulado en el producto.

1. Validar finalidad, base legal, destinatario y retención; publicar y comprobar una ruta de privacidad real. Si se necesita consentimiento expreso, no activar hasta implementar el control, el contrato de servidor y sus textos aprobados.
2. Configurar en el build `PUBLIC_CONTACT_ENABLED=true`, `PUBLIC_CONTACT_PRIVACY_URL` (ruta interna), `PUBLIC_CONTACT_POLICY_VERSION`, `PUBLIC_CONTACT_TURNSTILE_SITE_KEY`. El Worker requiere `CONTACT_ENABLED=true`, `CONTACT_ORIGIN` (origen HTTPS exacto), `CONTACT_POLICY_VERSION` (misma versión), `CONTACT_FROM`, `CONTACT_TO`, secretos `CONTACT_TURNSTILE_SECRET`, `CONTACT_BREVO_API_KEY`, `CONTACT_RATE_HMAC` (alto nivel de entropía, mínimo 32 caracteres) y bindings `CONTACT_IP_LIMIT` y `CONTACT_EMAIL_LIMIT` (5 y 3 solicitudes/min respectivamente, IDs separados por entorno). No se crearon bindings, widgets ni recursos remotos.
3. En entorno autorizado, revisar CSP y Turnstile real, remitente y receptor Brevo, recepción en buzón/spam y deduplicación del envío individual. El navegador bloquea dobles envíos y conserva el UUID de los mismos datos durante 30 min tras resultados inciertos; la deduplicación efectiva depende de la ventana y el contrato de Brevo. Un duplicado sin confirmación previa **no** se convierte en éxito. Una aceptación de Brevo **no** garantiza entrega al buzón.
4. Activar solo con los pasos anteriores validados. Probar rechazo de origen y token, 422, 429, caída del proveedor y recuperación; no enviar pruebas a destinatarios reales no autorizados.

El validador editorial histórico `content/internal/04-feedback/validar-e2.py` corresponde a E221, no al nuevo contrato. `npm run validate:content` contrasta el literal vigente de Inicio y Empresas.

## Validación y capturas

- `npm run ci:check`: lint, formato, tipos de Astro y Worker, copy, 16 pruebas unitarias, build estático, empaquetado de Worker en `--dry-run` y auditoría de artefactos.
- Playwright/Chromium a 1440, 768, 390 y 320 px: imágenes decodificadas, un H1 y sin desbordamiento horizontal. Inicio dio **cero píxeles distintos** con movimiento reducido frente al build de `e5aa535` en los cuatro anchos. Se verificaron también las dos cards juntas en el umbral de 960 px.
- Playwright verificó los cuatro CTA, menú móvil, foco/validación, conservación de valores, reintento con UUID estable, bloqueo de duplicados en vuelo, recepción y eventos sin PII. También verificó aparición con movimiento, modo reducido y contenido sin JavaScript. El caso de error HTTP fue inducido por la prueba; no hubo errores inesperados.
- [Inicio escritorio](visual-review/empresas/inicio-1440.webp) · [Inicio móvil](visual-review/empresas/inicio-390.webp) · [Empresas escritorio](visual-review/empresas/empresas-1440.webp) · [Empresas tablet](visual-review/empresas/empresas-768.webp) · [Empresas móvil](visual-review/empresas/empresas-390.webp) · [Empresas 320 px](visual-review/empresas/empresas-320.webp). Se comprobó el texto completo del selector con el valor inicial y con las dos opciones a 320 px.

Para repetir la prueba de navegador: servir el build normal en `127.0.0.1:4370`, un build del corte `e5aa535` en `:4371`, y el build de prueba en `:4372`. Usar servidores HTTP estáticos locales, no el Worker remoto. Las dos llamadas externas se interceptan en el escenario de prueba.

```sh
mkdir -p /tmp/opencode/empresas
PUBLIC_CONTACT_ENABLED=true PUBLIC_CONTACT_PRIVACY_URL=/fixture-only/ \
PUBLIC_CONTACT_POLICY_VERSION=fixture PUBLIC_CONTACT_TURNSTILE_SITE_KEY=fixture \
npm run build -- --outDir .astro/contact-fixture
playwright-cli -s=empresas open http://127.0.0.1:4370/ --browser=chromium
playwright-cli -s=empresas run-code "$(node --input-type=module -e \
  "import review from './scripts/review-empresas.js'; console.log(review.toString())")"
```

La ruta `/fixture-only/` es un marcador exclusivo del build de prueba ignorado, no una página legal ni una configuración de publicación.

### Segunda iteración visual

| Ancho | Antes (`5c1f62f`) | Después |
|---|---|---|
| Escritorio · 1440 px | [captura](visual-review/empresas-v2/antes-1440.webp) | [captura](visual-review/empresas-v2/despues-1440.webp) |
| Tablet · 768 px | [captura](visual-review/empresas-v2/antes-768.webp) | [captura](visual-review/empresas-v2/despues-768.webp) |
| Móvil · 390 px | [captura](visual-review/empresas-v2/antes-390.webp) | [captura](visual-review/empresas-v2/despues-390.webp) |

Filmstrips de Playwright: [hover desde el título](visual-review/empresas-v2/hover.webp) y [misma interacción con movimiento reducido](visual-review/empresas-v2/hover-reducido.webp), con entrada arriba y salida abajo. En [contacto](visual-review/empresas-v2/contacto-foco.webp), el foco asienta la entrada del título y muestra el formulario a opacidad completa. La superficie y la ilustración no se desplazan durante la escritura.

`scripts/review-empresas-v2.js` comprueba el anclaje de las ilustraciones, el borde único de contacto, los separadores, el hover desde fuera del enlace, el foco, el puntero táctil, el movimiento reducido y el desbordamiento a 1440, 1024, 768, 390 y 320 px. Revisa las siete rutas y prueba las tarjetas de directorio con los registros de demostración de Astro dev (`localhost:4321`), no publicados. Se volvió a ejecutar `scripts/review-empresas.js` para preselección, validación y recepción controlada. La comparación de reposo de Inicio y Formación con el corte anterior no mostró cambios de composición; Formación fue idéntica píxel a píxel en los tres anchos comparados.

### Refinamiento final del hero y el contacto (capturas con v3-b)

- [Comparativa del hero](visual-review/empresas-v3/comparativa-hero.webp) y [comparativa del contacto](visual-review/empresas-v3/comparativa-contacto.webp): antes a la izquierda, después a la derecha; filas de 1920, 1440, 1280, 1024, 768 y 390 px.
- A 1440 px, la card pasó de 705 a 644 px, el ancho de la ilustración de 688 a 780 px y el espacio entre la descripción y el inicio del tejado de 115 a 25 px. En una columna conserva el arte debajo de los controles.
- [Contacto disponible y error de envío en escritorio](visual-review/empresas-v3/estados-escritorio.webp) y [validación y error de envío en móvil](visual-review/empresas-v3/estados-movil.webp): capturas de un fixture local. Turnstile y las peticiones de envío se interceptaron; la operación real sigue deshabilitada.
- `npm run ci:check` y ambas suites Playwright pasaron. Inicio y Formación coinciden píxel a píxel antes y después a 1440 y 390 px. Se mantuvieron la preselección, el foco, el tracking, el movimiento reducido y los mensajes de estado.
