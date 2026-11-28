# Motion System

Anime.js **4.5.0** se fija en el lock para movimiento avanzado. La skill `anime.js-best-practices` se instaló para OpenCode y Codex y se adaptó a Astro/TypeScript desde [`47f4b7ea494a3c0bc54ba228b4008a5da6891458`](https://github.com/davidosemwegie/animejs-best-practices/tree/47f4b7ea494a3c0bc54ba228b4008a5da6891458). El origen es MIT; se conservó su licencia y se excluyeron ejemplos ejecutables, integraciones de frameworks y documentación copiada con licencias distintas. Se contrastaron los subpaths y firmas con la versión instalada y [la documentación de v4](https://animejs.com/documentation/).

## Auditoría y elección de tecnología

| Superficie anterior | Decisión |
| --- | --- |
| `EditorialMotion`: observador único, `data-entering`, cuatro keyframes CSS | `observeReveals()` + `waapi.animate()`. Se conserva el contrato de atributos; se observa el viewport real y se excluye el contenido visible de partida. Observación de una sola entrada al viewport, sin listeners continuos de scroll; el foco finaliza la animación. |
| `ImmersiveHero`: opacidad secundaria y escala del paisaje | `immersiveEntrance()` aplica Kinetic Typography. La imagen queda estable y el H1 siempre visible. |
| `CompactHeroArt`: `land-rise`, `line-draw`, `appear`; `CompactHero` reiniciaba `getAnimations()` en bfcache | `compactEntrance()`: seis grupos escalonados dentro de un scope. Los paths ya tienen `pathLength="1"`; WAAPI interpola el trazo sin leer la geometría. `pageshow.persisted` revierte y vuelve a ejecutar una sola vez. |
| `InitiativeCard` e `InformationalCard`: dibujo normalizado | `InitiativeCard` usa Signal Build y Active Trace. `drawIllustration()` se conserva para los motivos de `InformationalCard` en Formación. |
| `ImmersiveCard`, `ClosingCTA`, `CollaborationCard`, `TeamCard`, `ProductCover`, `ProductCard`, `ResearchCard`, `TextLink`, portada de Inicio y `card-interactions.css` | Mantienen CSS para cambios de borde, color, flechas y escala simple. Las tarjetas y eventos con `data-reveal` reutilizan el preset editorial. |
| `SiteHeader`, `CommunityCalendar`, `CommunityEvent`, `FormField`, `OrganizationContactForm`, `FormCTA`, `directory.css` | Mantienen CSS y HTML nativo para cabecera, estados, paneles y transiciones de selects o diálogo. Se conserva `getAnimations()` para esperar el cierre antes de mover los filtros. No se añaden animaciones que retrasen resultados, búsqueda o paginación. |
| `atlas-preview.css`, CSS de daisyUI, controles y utilidades Tailwind | El Atlas de desarrollo conserva su trazado CSS autónomo. Los estados simples y las animaciones propias de daisyUI siguen en CSS; los indicadores de carga se detienen explícitamente en reduced motion. |

No había bucles de `requestAnimationFrame` propios ni animación pública ligada continuamente a la posición de scroll. El observador de la cabecera y las restauraciones del directorio conservan sus responsabilidades de estado. La galería interna prueba los módulos avanzados (`onScroll`, timeline, texto, SVG, draggable, spring y layout) sin importarlos desde páginas públicas.

## Arquitectura

- `src/motion/tokens.ts` lee variables CSS con tipos; convierte segundos o milisegundos a números para Anime.js. Las variables pueden variar en el ámbito de un elemento sin duplicar valores en TypeScript.
- `preferences.ts` habilita movimiento solo con WAAPI disponible, documento visible y preferencia compatible. `motionLifetime()` limpia efectos activos ante reducción, ocultación del documento y navegación. `reveal.ts` conserva las entradas editoriales anteriores. `mount.ts` observa las secuencias coordinadas y `patterns.ts` carga solo el patrón solicitado. `scene.ts` centraliza tiempos y tokens; `native-sequence.ts` gobierna las pistas nativas y `sequence.ts` reserva el timeline JS para el trazo SVG. `interactions.ts` comparte los disparadores con la galería.
- El HTML parte en el estado final. Los componentes Astro importan los módulos en scripts del navegador. Un fallo de carga deja contenido e imagen completos. Una animación coordinada se puede revertir sin reiniciar contenido ni callbacks de otras instancias.
- Los experimentos viven en `src/design-system/`; solo `/design-system/` los registra en desarrollo. Cada sección distingue tecnología, API, tokens, nota de accesibilidad y caso de uso. Las muestras públicas usan los módulos y componentes reales.

## Tokens efectivos

| Propósito | Variables y valores |
| --- | --- |
| Instantáneo, rápido, normal y lento | `--duration-instant` 0 ms (omitir); `--editorial-response` 140 ms (icono); `--duration-control` 150 ms (control); `--duration-card` 200 ms (borde/superficie); `--duration-points` 500 ms y `--duration-layer` 650 ms (capas). |
| Entradas | `--duration-entrance` 540 ms (editorial); `--duration-land` 900 ms (terreno); `--duration-contours` 950 ms (contornos); `--duration-marks` 720 ms (rutas). |
| Dibujo de motivos | `--duration-draw` 1000 ms. |
| Curvas | `--editorial-ease-out` `cubic-bezier(0.16, 1, 0.3, 1)` para asentamiento y feedback; `--editorial-entrance-ease` `cubic-bezier(0.23, 0.65, 0.25, 1)` para entrada; `--motion-ease-standard` `ease-out` para capas y rutas; `--motion-ease-draw` `linear` para trazos en hover. |
| Delay | `--editorial-delay` según composición (0 ms en ausencia de valor); `--motion-delay-contours` 350 ms, `--motion-delay-marks` 1000 ms, `--motion-delay-grid` 1050 ms, `--motion-delay-points` 1380 ms y `--motion-delay-dots` 1450 ms. |
| Stagger | `--motion-stagger-land` 160 ms, `--motion-stagger-contours` 55 ms, `--motion-stagger-marks` 85 ms, `--motion-stagger-points` 75 ms, `--motion-stagger-dots` 45 ms y `--motion-stagger-draw` 120 ms. |
| Distancia | `--motion-distance-rise` 18 px, `--motion-distance-card` 20 px, `--motion-distance-ink` 8 px y `--motion-distance-land` 18 px. |
| Intensidad/escala | `--motion-scale-card` 0,99; `--motion-scale-land` 0,86. |
| Opacidad inicial | `--motion-opacity-rise` 0,6; `--motion-opacity-card` 0,55; `--motion-opacity-ink` 0,75; `--motion-opacity-fade` 0,76. |
| Física experimental | `--motion-spring-stiffness` 120 y `--motion-spring-damping` 15 para spring y salida del arrastre. |

## Añadir o actualizar movimiento

`--motion-delay-entry-load-max` (90 ms) y `--motion-delay-opening-max` (220 ms) son presupuestos de arranque, no duraciones de la animación. Si el módulo llega tarde, se mantiene el estado leído. El observador puede preparar un patrón cuando el borde de la sección entra en su zona, sin ocultar contenido mientras carga.

Para la segunda etapa: usa CSS para estados simples, Anime.js WAAPI para pistas independientes de transformación/opacidad y máscaras geométricas verificadas, y el timeline JS para rutas SVG y fases acopladas al trazo. `scene.ts` comparte opciones, tokens, tiempos y limpieza. `native-sequence.ts` conserva los controles de depuración, pero no sondea progreso en producción. Haz visible el contenido sin JS y mide trazas en móvil antes de promover una propiedad o precargar un módulo. Los tokens admiten números unitarios, longitudes CSS y duraciones explícitas en `ms`/`s`; una entrada inválida se diagnostica en desarrollo y hace revertir esa escena. El delay editorial opcional reutiliza `--duration-instant` en CSS.

Los controles usan `--duration-feedback` para cambios discretos, `--duration-disclosure` para desplegar regiones, `--duration-sheet` para paneles y `--motion-ease-disclosure` para su interpolación. Las imágenes de tarjetas comparten `--duration-media`, `--duration-media-immersive`, `--motion-media-zoom` y `--motion-media-zoom-subtle`; las flechas leen `--motion-arrow-x` y `--motion-arrow-y`. Los respiros editoriales usan `--motion-stagger-editorial`, `--motion-delay-editorial-early` y `--motion-delay-editorial-sibling`. Los grupos usan `--motion-stagger-group` (55 ms) con un tope `--motion-delay-group-max` (140 ms); los modos de lectura usan `--duration-reading` (360 ms).

El H1 de los héroes inmersivos permanece visible desde el primer render. Los desplegables y filtros siguen actuando inmediatamente mediante el DOM nativo; sus transiciones solo acompañan la operación.

`data-feedback-arrive` reutiliza una sola entrada CSS para errores de campo y estados de envío. `TextLink` reutiliza `data-card-arrow`, con `--motion-arrow-pressed-x` y `--motion-arrow-pressed-y` para su estado de presión.

`data-card-arrow="down"` conserva el gesto direccional de Formación con `--motion-arrow-down`; las demás flechas mantienen su trayectoria compartida. Los iconos sociales usan `--motion-icon-nudge` como respuesta óptica breve.

1. Consulta los ejemplos en `/design-system/#motion` y la skill. Elige CSS para feedback inmediato; visibilidad puntual con `IntersectionObserver`; sincronización real con `onScroll()`; WAAPI para opacidad y transformaciones; engine JS para morph, física y layout.
2. Mantén el estado final en el HTML/CSS; comprueba foco, zoom, reduced motion y móvil. Limita objetivos y conserva semántica de teclado. Para títulos de texto plano reutiliza `splitHeading()`; para composiciones tipográficas más complejas evalúa `splitText({ accessible: true })`. En ambos casos, conserva el original accesible y revierte el DOM. El arrastre requiere un control alternativo.
3. Conecta el patrón al ciclo de vida, a tokens CSS y a un preview real. Importa solo el módulo que se usa. Para cambiar de versión, usa `npm install --save-exact animejs@4`, revisa la API y el lock, repite `npm run ci:check` y las pruebas de navegador y compara el tamaño servido.

## Primera etapa aprobada

| Patrón | Duración base | Configuración y páginas |
| --- | ---: | --- |
| Kinetic Typography | `--duration-hero` 1250 ms | `ImmersiveHero`: Inicio, Empresas y Formación. Compresión escalonada, máscara de la descripción y asentamiento de acciones. |
| Layered Assembly | `--duration-assembly` 1350 ms | `VerticalCard`: I3; el escalonado se limita al grupo que entra junto. `--motion-distance-assembly` recorre una altura del marco de imagen, que actúa como máscara fija. |
| Rolling Digits | `--duration-metrics` 1400 ms | `RollingValue`: I4 y F5; densidades `compact` y `display`. Los separadores y unidades no ruedan; `data-motion-rule` traza el borde existente. |
| Narrative Flow | `--duration-narrative` 1300 ms | I2, encabezado de I4 y EM3. Líneas según el ancho disponible, borde opcional, párrafos y enlaces. |
| Organic Reveal | `--duration-organic` 1520 ms | `ClosingCTA`: Inicio, Formación, Equipo y Comunidad. La esquina de la elipse sigue el anclaje de la foto; la variante apilada parte del centro inferior. |
| Compositional Convergence | `--duration-convergence` 1380 ms | `FormCTA` ilustrado: EM6 y F7; direcciones según orden y lado del arte. Marca filas con `data-scene-row`. |
| Landscape Expansion | `--duration-landscape` 1430 ms | `CollaborationCard`: EM2. Comparte las máscaras de Organic Reveal y aplica desfases al entrar juntas. |
| Signal Build | `--duration-signal-build` 1430 ms | `InitiativeGrid` en Inicio y Empresas. Trazo lineal y activaciones según distancia en el recorrido real. |
| Active Trace | `--duration-active-trace` 980 ms | Las mismas tarjetas, por puntero fino o `:focus-visible`. Pulso local sobre el SVG completo. |

Las duraciones son bases de las coreografías, cuyos solapamientos son posiciones relativas. El escalonado tipográfico usa `--motion-stagger-word` (34 ms), `--motion-stagger-line` (64 ms) y `--motion-stagger-digit` (28 ms). El H1 lee `--motion-shift-word` (0,16 em), `--motion-scale-word` (0,78) y `--motion-scale-word-settle` (1,035); los botones usan `--motion-scale-action` (0,96) y los paisajes `--motion-scale-landscape-entry` (1,045). La expansión elíptica usa `--motion-ease-mask` (`cubic-bezier(0.45, 0, 0.25, 1)`); el motor resuelve las curvas CSS con `cubicBezier()` de Anime.js. Los carretes usan `--motion-reel-steps` (4) o `--motion-reel-steps-compact` (3). La presencia de módulos y la señal de hover usan `--motion-opacity-module` (0,24) y `--motion-opacity-trace` (0,7). El resto de distancias, curvas y escalones de grupo reutiliza los tokens existentes.

`InitiativeArt` define las cuatro geometrías sobre una caja común de 310 × 140. Las conexiones visitan los centros de los módulos; las distancias entre esos centros fijan el tiempo de cada visita. La primera visita arma el módulo y todas las visitas disparan su pulso. `signal.ts` reutiliza los tweens geométricos de Anime.js por trayectoria fija y restaura los atributos de dibujo al terminar. El marco de Investigación es conceptual. Los radios, trazos y posiciones del SVG son coordenadas de arte, no variables de interfaz.

Las secuencias de entrada parten del HTML completo y duran una sola entrada. El foco o la interacción revierten la composición a su estado final. FormCTA mantiene los campos como DOM nativo y solo enmascara la superficie decorativa, el título, el texto y el arte; el botón y los campos siguen recibiendo puntero y foco. Los cambios de preferencia, navegación, ocultación o ancho cancelan el trabajo activo. Los demos usan `patterns.ts` y conservan los controles compatibles. Véase el [informe de esta etapa](motion-stage-one.md) para resultados y evidencias.

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
