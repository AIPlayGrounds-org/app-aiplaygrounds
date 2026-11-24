# AI Academy: activación de la lista de espera

`/formacion/` presenta el diseño aprobado. La lista de espera se muestra con
los campos y el envío deshabilitados; no carga un widget ni guarda datos.
El bloque F7 usa `FormCTA`, con un `fieldset` deshabilitado y los mismos
valores del contrato: `name`, `email` y `line` (`software-with-ai` o
`ai-engineering`). Esta revisión no cambia el Worker ni activa la captación.

## Antes de habilitar el envío

- Crear e integrar un widget Turnstile con una clave pública real y configurar `ACADEMY_TURNSTILE_SECRET` como secreto y `ACADEMY_TURNSTILE_HOSTNAMES` con los dominios exactos, sin localhost. El Worker valida la acción `academy_waitlist` y el hostname real.
- Crear una lista dedicada a Academy en Brevo, con atributos de texto `ACADEMY_NAME` y `ACADEMY_LINE`. Configurar `ACADEMY_BREVO_LIST_ID` y el secreto `ACADEMY_BREVO_API_KEY`. Revisar que la lista no dispare automatizaciones y confirmar la persistencia de ambos atributos, incluidos contactos existentes. No usar la configuración Wrangler local en producción.
- Acordar aviso de privacidad, conservación de datos, responsable de los avisos y baja. Probar con el widget real y un contacto autorizado: éxito, token caducado/reutilizado, persistencia y caída de Brevo. No habilitar el formulario público antes de verificarlo.
- Conectar la interfaz a `POST /api/academy-waitlist`, anunciar el resultado real del envío y retirar el aviso de indisponibilidad al activar. La configuración de pruebas del Worker usa KV local y no debe conectarse a la página pública. `/api/contact` no interviene.

## Revisión de Formación

El hero usa `referencias/Academy/academy-hero-v2.png` y comparte la altura de Inicio
y Empresas. El H1, la descripción y el CTA se centran en el cielo libre bajo la
navegación, sin la etiqueta «AI Academy». F3 ya no muestra la nota bajo las
cards y F4 usa «Cursos». F5 conserva las tres métricas y sus separadores
verticales, sin líneas horizontales, año en la etiqueta ni mención de gratuidad.
El header global es sticky y la navegación usa negro sólido sin contornos
ni sombras. En los tres heroes inmersivos el fondo es transparente arriba
y sólido al hacer scroll. Los cards interactivos refuerzan su borde con hover
o foco de teclado sin cambiar de tamaño.

En Formación, los cards informativos e inmersivos usan el mismo estado de
borde al pasar el cursor, incluso cuando no tienen una acción. Los tres
cards de diferencial usan la superficie cálida con iconos verdes. En los
formatos, Workshop, Full Day y Cursos reutilizan las familias salvia, arena
y lavanda de las iniciativas de Empresas para superficie, icono y borde.

`SiteFooter.astro` incluye el copyright de la Fundación debajo de la descripción
institucional, en una escala secundaria y en el flujo de texto por encima del
paisaje. Aparece en todas las páginas sin cambiar la navegación ni la ilustración.

- [Escritorio · 1440 px](visual-review/academy/formacion-1440.webp)
- [Tablet · 768 px](visual-review/academy/formacion-768.webp)
- [Móvil · 390 px](visual-review/academy/formacion-390.webp)
- [Móvil estrecho · 320 px](visual-review/academy/formacion-320.webp)
- [Comparativa de los tres heroes · 1440 px](visual-review/academy/heroes-1440.webp)
- [Header durante el scroll · 390 px](visual-review/academy/header-sticky-390.webp)
- [Borde del card en reposo y hover](visual-review/academy/card-hover.webp)
- [Seis cards de Formación en reposo y hover](visual-review/academy/cards-formacion-hover.webp)
- [Cards de Formación en móvil](visual-review/academy/cards-formacion-movil.webp)

El build estático se revisó en Chromium a 320, 390, 641, 768, 1024, 1080, 1440 y 1920 px.
Se comprobó la lectura de las cards, el orden de las secciones, el foco por
teclado, los destinos reales de los CTA y que F7 no tenga controles activos.
Se verificó el copyright en las siete páginas, a 390, 768 y 1440 px. Los WebP
emitidos para los dos CTA conservan alfa.

Para repetir la revisión, ejecutar `npm run build` y servir `dist` con
`python3 -m http.server 4372 --bind 127.0.0.1 --directory dist`. En otra terminal:

```sh
mkdir -p /tmp/opencode/academy-after
playwright-cli -s=academy open --browser=chromium http://127.0.0.1:4372/formacion/
playwright-cli -s=academy run-code "$(sed 's/^export default //' scripts/review-academy.js)"
```
