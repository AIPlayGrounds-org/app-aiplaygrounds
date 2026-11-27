# Consolidación del Design System y Motion System

Base de comparación: `d99b7dc`. Se mantuvieron las rutas, el contenido, las ilustraciones y las librerías. La fuente de valores compartidos es `src/styles/tokens.css`; `global.css` y `theme.css` adaptan esa fuente a Tailwind y daisyUI, respectivamente. Los átomos y los patrones de `src/motion/` se prueban en el sitio y el catálogo; el catálogo no interviene en el build público.

## Matriz de trazabilidad

| Archivo o componente | Inconsistencia | Solución / fuente compartida | Catálogo y validación |
| --- | --- | --- | --- |
| `tokens.css`, `global.css`, `theme.css` | Tipografía, espacios, radios y capas consumidos con escalas diferentes | `--type-*`, `--weight-*`, `--leading-*`, `--space-*`, `--measure-*`, `--stroke-*`, `--radius-*` y `--layer-*`. Tailwind deriva de `--space-unit`; daisyUI conserva nombres semánticos por tema | Layout, Typography, Spacing, Radius, Borders, Elevation, Component Tokens; CI y prueba temporal de cuatro tokens |
| `BaseLayout`, `InteriorLayout`, Inicio, Empresas, Formación | Paleta editorial aplicada por separado en cuatro contextos | `editorial` selecciona una sola superficie en `global.css` | Colors; captura de las siete rutas |
| `Button`, `Badge`, `Label` | Peso local y tamaños de Button con relleno de iconos separado | Escala tipográfica y tokens `--button-icon-padding-*` / `--button-weight` | Átomos reales, variantes existentes, teclado, contraste y restauración de tokens |
| `Card`, `Input`, `Select`, `Textarea` | Opciones del átomo y del catálogo podían divergir | `cardOptions`, `fieldAppearances`, `textareaAppearances`, `fieldDensities` son contratos tipados compartidos | Selector de variantes sin copia local; captura del catálogo y CI |
| `Dialog`, `Dropdown`, `directory.css`, `CommunityCalendar` | Sombra, backdrop, bordes y transiciones de controles se definían por superficie | Sombra y overlays en foundations, radios y grosor comunes; control, disclosure y sheet con duraciones separadas | Dialog, Dropdown, FilterGroup, Motion; Escape, retorno de foco, búsqueda y selección |
| `ViewToggle`, `DirectoryFilter`, `VerticalTag`, `CommunityCalendar` | Iconos equivalentes con tamaños numéricos repetidos | `size-icon-md`, `size-icon-chevron`, `size-icon-sm` desde los tokens de Lucide | Iconography; filtros, cambio de vista y revisión táctil |
| `ProductCard`, `ProductTags`, `ResearchCard`, `TeamCard` | Metadatos y separaciones repetidos; escala de medios con tiempos propios | Tipografía de label/body pequeño, espaciado común y tokens de feedback; conservan el reparto del contenido y sus enlaces | Card, Badge, ViewToggle y trazabilidad de dominio; fichas en cinco tamaños |
| `ImmersiveCard`, `InformationalCard`, `InitiativeCard`, `CollaborationCard`, `ClosingCTA` | Zoom, stagger, color contextual y bordes locales | Escala de interacción, tiempos de motion, tonos editoriales, borde y espaciado del sistema | Card y Motion; capturas y revisión en estado reducido |
| `SectionHeading`, `TextLink`, `DirectoryLink`, `SiteHeader`, `SiteFooter` | Título, meta, decoración y capas repetidas | Escala de sección, pesos semánticos y capa sticky; sin duplicar los landmarks | Nuevos ejemplos reales de `SectionHeading` y `TextLink`; teclado y navegación móvil |
| `CommunityEvent` | Radios de media y tipografía de fecha/metadatos locales | Radio de superficie, borde base y escala de texto; se conservan miniaturas cuadradas y variante destacada | Trazabilidad de dominio; filtros, resultados y capturas |
| `FormField`, `OrganizationContactForm`, `FormCTA`, `controls.css` | Mensajes con tiempos distintos sin base compartida, pesos y espacios locales | Escala funcional de feedback y campos editoriales; se conserva el anuncio nativo y el estado del formulario | FormField, Button, Input, Textarea, Motion; validación de formulario y estados |
| `CompactHero`, `ImmersiveHero`, `hero.ts` | Literal de máscara y escala secundaria de texto; el H1 se ocultaba tras el primer paint al entrar el módulo | Máscara desde token de marca; H1 estable. Se preservan arte por capas, secuencia de acciones y movimiento del paisaje | Sequences y SVG; Playwright verifica movimiento reducido y restauración simulada |
| `directories.css`, `interior.css`, `labs-detail.css`, `research-detail.css`, `DirectoryDetail` | Escalas independientes de ficha, paneles y radios | Tokens tipográficos, anchuras de lectura, reglas de superficie y espaciado compartidos | Trazabilidad de fichas; 35 vistas de detalle demo verificadas |
| `Gallery`, `Example`, `MotionGallery`, `usage.ts` | Catálogo sin grafo de consumo ni separación explícita de demos experimentales | Valores efectivos, importadores directos y rutas transitivas, índice de dominio y estado por categoría de movimiento | Prueba de propagación, navegación, copia y ausencia de overflow |
| `check-design-system.mjs` | Existían controles de stack, pero no de declaraciones, referencias o cobertura de átomos | PostCSS inspecciona declaraciones; TypeScript inspecciona el registro. CI rechaza literales visuales nuevos según reglas, variables sin definición ni fallback, fichas repetidas, átomos sin instancia e imports desde producción al catálogo | `npm run ci:check` y `check:output` |

## Decisiones de arquitectura

- Los tonos rosa, agua y madera se añadieron como valores contextuales aprobados; no son colores de acción. Los estados de tema y las variantes de marca existentes conservan su identidad.
- Se centralizaron colores de paneles, tipografía recurrente, espacios de control y tarjeta, medidas de lectura, iconos de controles, offsets, capas, sombras y tiempos. Se retiraron las declaraciones locales sustituidas. No se añadió ninguna variante visual nueva a los átomos.
- Se conservan los umbrales dictados por contenido (p. ej. 44 rem en Formación y Equipo, 52 rem en las fichas y la rejilla de iniciativas, 60 rem en cierres editoriales, 67 rem en navegación). Las queries de contenedor, proporciones de imágenes, geometría SVG, paletas propias de ilustración y ajustes de display fluido son excepciones de composición. `ProductCover` y `compact-hero-art.ts` conservan pigmentos del arte, no una paleta alternativa de controles. El Atlas interno conserva su CSS de facsímil.
- Los directores de búsqueda, filtros, paginación y vista siguen respondiendo inmediatamente. La bifurcación nativa de selects, los diálogos, la navegación y las superficies aplican feedback mediante CSS; no se añadió una secuencia que bloquee ni reordene resultados. El zoom de medios, flechas, bordes y stagger se ajustan mediante tokens de movimiento. Solo se retiró la entrada del H1 crítico.
- El grafo del catálogo es estático: una ruta dinámica aparece por su archivo y no por todos los slugs. Una importación cuenta como uso potencial; esto no prueba que una rama condicional esté activa para todos los datos. La trazabilidad no ejecuta ni se envía en producción.

## Verificación

- Playwright: siete rutas públicas y catálogo en **320, 390, 768, 1024 y 1440 px**, más siete fichas de desarrollo en esos cinco tamaños. En el build público de esta rama no hay fichas publicadas, por lo que se validaron con datos demo en desarrollo. Se probó navegación táctil, filtros, búsqueda, retorno de foco, estados, envío de contacto con Turnstile y API simulados, movimiento reducido, hover y demos. Las pruebas reproducibles están en `scripts/review-design-system.js`, `scripts/review-design-tokens.js` y `scripts/review-motion.js`.
- Conexión: se cambiaron temporalmente color, radio, gap y duración de `Button` desde Playwright. El mismo cambio se verificó en Formación y en la galería, y ambos volvieron a los valores de origen al retirar el estilo temporal.
- Capturas a 390, 768 y 1440 px. Montajes (antes arriba, después abajo): [sitio móvil](visual-review/consolidation/sitio-390.webp), [tablet](visual-review/consolidation/sitio-768.webp), [fichas](visual-review/consolidation/fichas-1440.webp) y [galería](visual-review/consolidation/galeria.webp). Los cambios visibles son ajustes de densidad del texto, iconos, radios/contornos y nuevas fichas del catálogo. Se conservan composición, imágenes y orden editorial.
- CI: 31 pruebas unitarias, verificación de Astro y Worker, build estático y auditoría de recursos. La galería y las demos se excluyen de `dist`.

## Rendimiento

Chromium con builds estáticos locales y contextos nuevos; los tamaños incluyen recursos cargados más CSS/JS inline, en bytes decodificados a 390 px. No contabilizan módulos que solo se cargan tras una interacción.

| Ruta | JS antes → después | CSS antes → después |
| --- | ---: | ---: |
| Inicio | 22.274 → 22.270 | 88.844 → 92.530 |
| Empresas | 27.978 → 27.974 | 86.201 → 89.006 |
| Formación | 22.274 → 22.270 | 90.295 → 93.709 |
| AI Labs | 28.448 → 28.444 | 92.179 → 96.220 |
| Investigación | 30.418 → 30.414 | 90.566 → 94.507 |
| Equipo | 20.875 → 20.871 | 86.571 → 90.058 |
| Comunidad | 22.508 → 22.504 | 91.796 → 95.625 |

Artefactos únicos de `dist/_astro`: JS **37.868 → 37.864 B** (17.053 B gzip en ambas versiones); CSS **127.603 → 133.326 B** (**26.801 → 27.924 B gzip**).

Medianas de tres pasadas alternadas por versión, contextos nuevos y CPU ×4 a 390 px. Se muestrearon los primeros 3,2 s. La respuesta de búsqueda mide desde `input` hasta el segundo `requestAnimationFrame`; «saltos» cuenta intervalos rAF mayores a 25 ms. Es una aproximación del hilo principal, no una medición del compositor ni de INP.

| Página / ancho | LCP (ms) | CLS | Búsqueda (ms) | Hilo principal (ms) | Tareas largas (ms) | Saltos |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Inicio / 390 | 140 → 136 | 0,002 → 0,002 | — | 471 → 434 | 61 → 58 | 3 → 3 |
| Comunidad / 390 | 236 → 208 | 0,0003 → 0,0003 | 11 → 11 | 974 → 906 | 112 → 92 | 5 → 5 |
| Inicio / 1440 | 36 → 36 | 0,0002 → 0,0113 | — | 122 → 119 | 0 → 0 | 0 → 0 |
| Comunidad / 1440 | 64 → 76 | 0,0011 → 0,0011 | 14 → 13 | 241 → 259 | 0 → 0 | 1 → 1 |

En esta serie aumentó el CLS de Inicio en escritorio. El dato varió entre pasadas (base: 0,0002 a 0,0086; posterior: 0,0093 a 0,0113), así que no se declara paridad visual de la carga inicial.

## Límites

Los controles estáticos del catálogo que no comparten un registro tipado todavía se verifican por sus instancias, no por todas las combinaciones de props. El validador inspecciona CSS y bloques `<style>`; los pigmentos SVG, clases arbitrarias de composición, valores dinámicos en TS y estilos inline requieren revisión de código. Las composiciones de dominio sin demo dedicada aparecen en el índice de uso. Las cifras de laboratorio no sustituyen datos reales de producción.
