# Empresas · implementación E222-EM

23/11/2026 · Copy y estructura autorizados solo para Empresas; sin autorización de despliegue ni de captación. [Fuente editorial](../../content/entregables-cliente/02-contenido-web/contenido-web.md#página-empresas).

## Composición y recursos

| Bloque | Patrón |
|---|---|
| `EM1` | `ImmersiveHero`: texto a la izquierda y paisaje a la derecha, foco propio en móvil. Inicio conserva su composición centrada; Formación puede adoptar la misma primitiva sin cambiar su diseño actual. |
| `EM2` | `CollaborationCard`: superficie, arte transparente absoluto y contenido sobre un área segura; adopta el principio de `ClosingCTA`, sin sustituirlo. |
| `EM3` | `Section` + `SectionHeading` + `TextLink`; remite a `/#I4`, sin estadísticas ni hitos duplicados. |
| `EM4` | `InitiativeGrid` e `InitiativeCard`, los mismos que en `I5`. `#EM5` se conserva como ancla de la card de Academy. Investigación usa un SVG nuevo de la misma familia. |
| `EM6` | `OrganizationContactForm` y `FormField`: cinco controles nativos, errores asociados, estados anunciados y foco en el primer error. |

La cabecera, el pie y Starwind `Button` son compartidos. `CompactHero` conserva las presentaciones de Comunidad, AI Labs, Investigación y Equipo. `EditorialMotion` observa una vez `[data-reveal]` y añade `data-entering` solo al entrar; admite entradas `card`, `ink`, normal y retraso `--editorial-delay`. El contenido parte visible, sin JavaScript o en movimiento reducido. Los enlaces combinan navegación nativa, margen de ancla y mejora de preselección sin borrar otros valores.

**Procedencia:** los tres PNG son los originales entregados en `referencias/Empresa/`: `Empresa_hero.png`, `Puente de piedra sobre arroyo floral.png` y `Andenes Peruanos en Flor.png`. `src/assets/empresas.ts` los registra sin modificar; `astro:assets` genera WebP con tamaños responsivos, alfa para ambas cards, y carga diferida salvo el hero.

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
