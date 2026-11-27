# Motion System

Anime.js **4.5.0** se fija en el lock para movimiento avanzado. La skill `anime.js-best-practices` se instaló para OpenCode y Codex y se adaptó a Astro/TypeScript desde [`47f4b7ea494a3c0bc54ba228b4008a5da6891458`](https://github.com/davidosemwegie/animejs-best-practices/tree/47f4b7ea494a3c0bc54ba228b4008a5da6891458). El origen es MIT; se conservó su licencia y se excluyeron ejemplos ejecutables, integraciones de frameworks y documentación copiada con licencias distintas. Se contrastaron los subpaths y firmas con la versión instalada y [la documentación de v4](https://animejs.com/documentation/).

## Auditoría y elección de tecnología

| Superficie anterior | Decisión |
| --- | --- |
| `EditorialMotion`: observador único, `data-entering`, cuatro keyframes CSS | `observeReveals()` + `waapi.animate()`. Se conserva el contrato de atributos; se observa el viewport real y se excluye el contenido visible de partida. Observación de una sola entrada al viewport, sin listeners continuos de scroll; el foco finaliza la animación. |
| `ImmersiveHero`: `hero-arrive`, `sky-settle` | `immersiveEntrance()`: WAAPI y `createScope()`. La entrada actual utiliza opacidad parcial para el texto secundario y reserva el desplazamiento aparente a la escala del paisaje en Formación. |
| `CompactHeroArt`: `land-rise`, `line-draw`, `appear`; `CompactHero` reiniciaba `getAnimations()` en bfcache | `compactEntrance()`: seis grupos escalonados dentro de un scope. Los paths ya tienen `pathLength="1"`; WAAPI interpola el trazo sin leer la geometría. `pageshow.persisted` revierte y vuelve a ejecutar una sola vez. |
| `InitiativeCard`, `InformationalCard`: `draw-illustration` y `draw-motif` duplicaban el dibujo | `drawIllustration()`: un preset SVG modular y cargado bajo demanda. Mantiene stagger por posición, disparadores de puntero y foco según tipo de tarjeta. |
| `ImmersiveCard`, `ClosingCTA`, `CollaborationCard`, `TeamCard`, `ProductCover`, `ProductCard`, `ResearchCard`, `TextLink`, portada de Inicio y `card-interactions.css` | Mantienen CSS para cambios de borde, color, flechas y escala simple. Las tarjetas y eventos con `data-reveal` reutilizan el preset editorial. |
| `SiteHeader`, `CommunityCalendar`, `CommunityEvent`, `FormField`, `OrganizationContactForm`, `FormCTA`, `directory.css` | Mantienen CSS y HTML nativo para cabecera, estados, paneles y transiciones de selects o diálogo. Se conserva `getAnimations()` para esperar el cierre antes de mover los filtros. No se añaden animaciones que retrasen resultados, búsqueda o paginación. |
| `atlas-preview.css`, CSS de daisyUI, controles y utilidades Tailwind | El Atlas de desarrollo conserva su trazado CSS autónomo. Los estados simples y las animaciones propias de daisyUI siguen en CSS; los indicadores de carga se detienen explícitamente en reduced motion. |

No había bucles de `requestAnimationFrame` propios ni animación pública ligada continuamente a la posición de scroll. El observador de la cabecera y las restauraciones del directorio conservan sus responsabilidades de estado. La galería interna prueba los módulos avanzados (`onScroll`, timeline, texto, SVG, draggable, spring y layout) sin importarlos desde páginas públicas.

## Arquitectura

- `src/motion/tokens.ts` lee variables CSS con tipos; convierte segundos o milisegundos a números para Anime.js. Las variables pueden variar en el ámbito de un elemento sin duplicar valores en TypeScript.
- `preferences.ts` habilita movimiento solo con WAAPI disponible, documento visible y preferencia compatible. `motionLifetime()` limpia efectos activos ante reducción, ocultación del documento y navegación. `reveal.ts` observa y cancela entradas; `hero.ts` agrupa las secuencias de los dos heroes; `draw.ts` y `draw-trigger.ts` separan interpolación SVG y disparadores.
- El HTML parte en el estado final. Los componentes Astro importan los módulos en scripts del navegador. Un fallo de carga deja contenido e imagen completos. Una animación coordinada se puede revertir sin reiniciar contenido ni callbacks de otras instancias.
- Los experimentos viven en `src/design-system/`; solo `/design-system/` los registra en desarrollo. Cada sección distingue tecnología, API, tokens, nota de accesibilidad y caso de uso. Las muestras públicas usan los módulos y componentes reales.

## Tokens efectivos

| Propósito | Variables y valores |
| --- | --- |
| Instantáneo, rápido, normal y lento | `--duration-instant` 0 ms (omitir); `--editorial-response` 140 ms (icono); `--duration-control` 150 ms (control); `--duration-card` 200 ms (borde/superficie); `--duration-points` 500 ms y `--duration-layer` 650 ms (capas). |
| Entradas | `--duration-entrance` 540 ms (editorial); `--duration-hero` 500 ms (texto); `--duration-land` 900 ms (terreno); `--duration-contours` 950 ms (contornos); `--duration-marks` 720 ms (rutas). |
| Inmersiva y dibujo | `--duration-immersive` 1800 ms (cielo); `--duration-draw` 1000 ms (trazo de tarjeta). |
| Curvas | `--editorial-ease-out` `cubic-bezier(0.16, 1, 0.3, 1)` para asentamiento y feedback; `--editorial-entrance-ease` `cubic-bezier(0.23, 0.65, 0.25, 1)` para entrada; `--motion-ease-standard` `ease-out` para capas y rutas; `--motion-ease-draw` `linear` para trazos en hover. |
| Delay | `--editorial-delay` según composición (0 ms en ausencia de valor); `--motion-delay-hero-copy` 0 ms, `--motion-delay-hero-actions` 75 ms; `--motion-delay-contours` 350 ms, `--motion-delay-marks` 1000 ms, `--motion-delay-grid` 1050 ms, `--motion-delay-points` 1380 ms y `--motion-delay-dots` 1450 ms. |
| Stagger | `--motion-stagger-land` 160 ms, `--motion-stagger-contours` 55 ms, `--motion-stagger-marks` 85 ms, `--motion-stagger-points` 75 ms, `--motion-stagger-dots` 45 ms y `--motion-stagger-draw` 120 ms. |
| Distancia | `--motion-distance-rise` 18 px, `--motion-distance-card` 20 px, `--motion-distance-ink` 8 px y `--motion-distance-land` 18 px. |
| Intensidad/escala | `--motion-scale-card` 0,99; `--motion-scale-sky` 1,018; `--motion-scale-land` 0,86. |
| Opacidad inicial | `--motion-opacity-rise` 0,6; `--motion-opacity-card` 0,55; `--motion-opacity-ink` 0,75; `--motion-opacity-fade` 0,76; `--motion-opacity-hero` 0,8. |
| Física experimental | `--motion-spring-stiffness` 120 y `--motion-spring-damping` 15 para spring y salida del arrastre. |

## Añadir o actualizar movimiento

Los controles usan `--duration-feedback` para cambios discretos, `--duration-disclosure` para desplegar regiones, `--duration-sheet` para paneles y `--motion-ease-disclosure` para su interpolación. Las imágenes de tarjetas comparten `--duration-media`, `--duration-media-immersive`, `--motion-media-zoom` y `--motion-media-zoom-subtle`; las flechas leen `--motion-arrow-x` y `--motion-arrow-y`. Los respiros editoriales usan `--motion-stagger-editorial`, `--motion-delay-editorial-early`, `--motion-delay-editorial-sibling` y `--motion-delay-editorial-pair`. Los grupos usan `--motion-stagger-group` (55 ms) con un tope `--motion-delay-group-max` (140 ms); los modos de lectura usan `--duration-reading` (360 ms).

El H1 de los héroes inmersivos permanece estable y visible desde el primer render. El texto secundario, acciones y paisaje conservan la secuencia existente. Los desplegables y filtros siguen actuando inmediatamente mediante el DOM nativo; sus transiciones solo acompañan la operación.

`data-feedback-arrive` reutiliza una sola entrada CSS para errores de campo y estados de envío. `TextLink` reutiliza `data-card-arrow`, con `--motion-arrow-pressed-x` y `--motion-arrow-pressed-y` para su estado de presión.

1. Consulta los ejemplos en `/design-system/#motion` y la skill. Elige CSS para feedback inmediato; visibilidad puntual con `IntersectionObserver`; sincronización real con `onScroll()`; WAAPI para opacidad y transformaciones; engine JS para morph, física y layout.
2. Mantén el estado final en el HTML/CSS; comprueba foco, zoom, reduced motion y móvil. Limita objetivos y conserva semántica de teclado. No dividas texto si el efecto es prescindible; cuando se divida, usa `splitText({ accessible: true })` y revierte el DOM. El arrastre requiere un control alternativo.
3. Conecta el patrón al ciclo de vida, a tokens CSS y a un preview real. Importa solo el módulo que se usa. Para cambiar de versión, usa `npm install --save-exact animejs@4`, revisa la API y el lock, repite `npm run ci:check` y las pruebas de navegador y compara el tamaño servido.

## Verificación

- `npm run ci:check` con Node 24.22.2: 31 pruebas unitarias, build estático y dry run del Worker. La auditoría de salida verifica que el catálogo y sus experimentos no se publiquen.
- Playwright probó las siete páginas públicas y el catálogo a 320, 390, 768 y 1440 px; también formularios, filtros, búsqueda y navegación. Comparadas con `66a0667` en estado final, las 45 capturas públicas no mostraron diferencias de píxeles.
- [`review-motion.js`](../../scripts/review-motion.js) recibe una página Playwright y el origen de `astro dev`. Recorre los modos del playground, scrubbing, progreso por scroll, teclado, puntero y preferencia reducida. Se comprobó que el hero es visible sin JS. El recorrido de atrás/adelante funcionó, pero Chromium headless informó que bfcache estaba deshabilitada en ese entorno; la rama de restauración se probó emitiendo `pageshow` con `persisted: true` y verificando que no duplicara efectos.
- Capturas del playground: [móvil](visual-review/motion/motion-390.webp), [tablet](visual-review/motion/motion-768.webp), [escritorio](visual-review/motion/motion-1440.webp) y [capas SVG en tema oscuro](visual-review/motion/motion-svg.webp).

### Rendimiento antes y después

Builds estáticos servidos localmente en Chromium, sin emulación de red. Medianas de tres pasadas alternadas por versión y página con contexto nuevo. Móvil: viewport de 390 × 900 y CPU ×4; escritorio: 1440 × 900 y CPU sin ralentizar. Se observaron LCP, CLS y actividad durante los primeros 3,2 s. «Respuesta» mide desde el evento `input` del buscador de Comunidad hasta el segundo `requestAnimationFrame`; no es INP de campo. «Frames» cuenta intervalos de `requestAnimationFrame` mayores a 25 ms; sirve como indicador de fluidez, sin medir los frames del compositor.

| Página y viewport | LCP (ms) | CLS | Respuesta (ms) | Hilo principal (ms) | Script (ms) | Tareas largas (ms) | Frames >25 ms |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Inicio, 390 px | 144 → 144 | 0 → 0,0020 | — | 417 → 478 | 24 → 35 | 70 → 68 | 3 → 4 |
| Comunidad, 390 px | 280 → 220 | 0,0003 → 0,0003 | 13 → 13 | 900 → 909 | 42 → 64 | 126 → 94 | 3 → 5 |
| Inicio, 1440 px | 44 → 44 | 0,0002 → 0,0113 | — | 117 → 130 | 9 → 11 | 0 → 0 | 1 → 1 |
| Comunidad, 1440 px | 80 → 84 | 0 → 0,0011 | 14 → 12 | 223 → 262 | 10 → 17 | 0 → 0 | 2 → 1 |

En `dist/_astro/`, el JS externo pasó de **15.247 a 37.868 B** (**6.604 → 17.053 B gzip**); CSS, de **127.330 a 127.603 B** (**26.635 → 26.801 B gzip**). Son sumas de archivos únicos y excluyen scripts inline. En las pasadas se solicitaron aproximadamente **21,5 KB** externos en Inicio y **20,2 KB** en Comunidad tras la migración, frente a 0 KB externos en esas páginas de la base (que usaban JS inline). El dibujo de tarjetas carga bajo demanda y el módulo de la galería solo existe en desarrollo. El coste de JS y de hilo principal subió; los valores de LCP y respuesta son mediciones de laboratorio y no establecen una mejora de campo.
