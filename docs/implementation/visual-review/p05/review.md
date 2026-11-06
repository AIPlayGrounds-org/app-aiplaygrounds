# P05 · Revisión de dirección visual para A2

**Estado:** implementado localmente para revisión; A2 no aprobada. Las capturas muestran el build local de Inicio, no un despliegue.

## Concepto y composición

Una página editorial que abre con una declaración tipográfica amplia y presenta después comunidad, campos, trayectoria y recorridos. La comparación de los cuatro campos usa filas y divisores; las tres experiencias son una lista cronológica editorial, no una agenda de inscripciones. AI Labs, AI Academy y organizaciones mantienen funciones distintas. El cierre negro concentra el contraste institucional. El marco abierto y el núcleo Halo son elementos gráficos, no un logotipo reconstruido.

La referencia Anthropic aporta jerarquía, espacio negativo y superficies cálidas contenidas; no se copiaron fuentes, imágenes, componentes ni copy. La consulta actual de las referencias externas fue textual; los criterios visuales se apoyan además en las observaciones previas de `brand-spec.md`, no en una nueva inspección visual interactiva de esas webs. Se mantienen las familias y colores canónicos, y la extensión light de P04 como propuesta web. La composición es mayormente clara y usa oscuro en cierre y footer, sin imponer un porcentaje matemático.

`SiteHeader` comparte siete destinos en desktop y menú nativo móvil; `SiteFooter` conserva navegación sin datos inventados. Starwind Button se usa para las acciones principales. Las otras siete rutas y las anclas C3/F4 siguen sin implementarse y devuelven 404 en esta fase; no se presentan como verificadas. El original Luma es el único enlace externo histórico. No se añadieron fotos, iconos de marca, formulario ni analítica.

## Evidencia

- [Inicio completo · 1440](desktop-1440.png) y [hero · 1440](hero-1440.png)
- [Inicio completo · 768](tablet-768.png)
- [Inicio completo · 360](mobile-360.png) y [320](mobile-320.png)

Chromium local comprobó 320, 360, 768 y 1440 CSS px sin scroll horizontal. El menú móvil abre con Enter, Tab llega al primer enlace y Escape lo cierra y devuelve foco al resumen. Hay un H1, cinco H2, un main, header, footer y skip link; forced colors y reduced motion fueron emulados, con foco visible. El elemento `details/summary` expone su estado de apertura mediante semántica nativa. No se ha probado lector de pantalla ni zoom real al 200/400 %; la verificación con viewport de 320 px ayuda a evaluar reflow, pero no los sustituye. El CSS zoom de P04 no debe considerarse zoom real. Falta QA integral de contraste/tecnologías asistivas; estas pruebas no certifican WCAG.

El pipeline `npm ci` y `npm run ci:check` pasa: cinco pruebas, Astro Check, Worker types, build SSG, dry-run y auditoría de salida. Prueba HTTP local: contacto 503, ruta ausente 404. CSS 28.475 bytes (~6.664 gzip), fuentes WOFF2 ~90.288 bytes en total; el navegador solicitó las tres. JS de menú inline mínimo; sin React, SSR o hidratación. Dentro de los presupuestos iniciales de CSS, JS y fuentes; no se ha ejecutado Lighthouse ni medición de campo. Los escáneres no garantizan ausencia absoluta de contenido retenido o secretos.

## Pendientes y criterios de A2

- Maestro de logotipo y favicon no verificados; se utiliza nombre textual accesible. El favicon local responde 404.
- Siete páginas y destinos internos aún pendientes del siguiente bloque; no son enlaces operativos en esta fase.
- Probar zoom real, lector de pantalla, accesibilidad integral y navegadores adicionales. Previews permanecen deshabilitados.
- Revisar para A2: identidad sin logo provisional, jerarquía y ritmo claro/oscuro; legibilidad de campos y actividad histórica; navegación móvil y continuidad de los tres recorridos; composición de cierre. La aprobación visual no autoriza publicar ni activa integraciones.
