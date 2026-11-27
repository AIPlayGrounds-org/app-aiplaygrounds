# Consolidación final y Motion Design Pass

Base: `9fca6d4`. El sitio conserva el contenido, las imágenes aprobadas, los destinos y el stack. La dirección de movimiento es **jerarquía sin espera**: texto crítico estable, una secuencia breve cuando el orden de un grupo importa, y feedback nativo para los controles.

## A. Consolidación visual

| Superficie | Corrección aplicada | Fuente compartida |
| --- | --- | --- |
| Inicio, Formación, Empresas | Gaps y rellenos de controles, bullets, cards y CTA; títulos en su escala existente | `--space-inline`, `--space-related`, `--space-control`, `--space-stack`, `--type-caption`, `--type-label` |
| Directorios, fichas, Comunidad, Equipo | Ritmo de filas, metadatos y controles; lead local que responde a la composición; radios de superficies reenlazados | Escala de espacios, `--type-body-small`, `--type-label`, `--leading-compact`, radios del sistema |
| Átomos, compuestos y cabecera | El campo editorial y su aviso comparten escala de espacios; Badges editoriales adoptan el rol de label. El menú usa un icono Lucide en el contorno existente. Los botones muestran presión mediante color | `--field-gap`, `--field-padding`, `--type-label`, `--icon-chevron`, semántica de color del botón |
| Tarjetas | Se retiraron demoras repartidas por `nth-child` y el cálculo en línea de TeamCard; el grupo decide la secuencia | `data-reveal-group`, `groupDelay()`, Motion Tokens |

Se añadieron dos pasos de separación (¼ y ½ rem, derivados de `--space-unit`) y tokens para tiempo de lectura, opacidad del hero y escalonado. Se retiraron `--duration-reduced`, `--motion-distance-hero`, `--motion-stagger-editorial-short` y los delays editoriales `third`, `grid` y `last`. No se añadieron colores ni variantes comerciales. Se mantienen las excepciones de geometría SVG, pigmentos de ilustración, recortes y proporciones de imágenes, tipografía fluida de los héroes, queries de contenedor y puntos de quiebre determinados por el contenido. El Atlas conserva su tratamiento de facsímil, aislado en desarrollo.

## B. Motion Design por página

| Pantalla | Antes / oportunidad | Ahora | Patrón, tecnología y tokens |
| --- | --- | --- | --- |
| Inicio | Las verticales esperaban hasta 280 ms según su índice y el texto secundario del hero saltaba hacia arriba tras cargar JS | **Rediseño:** el hero conserva posiciones y el copy parte legible; las verticales que entran juntas se escalonan. Los encabezados seleccionados quedan fijos | WAAPI de Anime.js; `--motion-opacity-hero`, `--duration-hero`, `--motion-stagger-group`, `--motion-delay-group-max` |
| Empresas | Las alianzas y las iniciativas tenían demoras independientes del espacio disponible | **Rediseño:** se coordinan por el grupo visible, incluso si el grid cambia de columnas. El título de trayectoria no entra tarde | `data-reveal-group`, Anime.js WAAPI; escala editorial y tope de 140 ms |
| Formación | Copy inmersivo con desplazamiento y escala de imagen larga; grillas con reglas por índice | **Rediseño:** el paisaje existente se asienta antes, el texto mantiene su posición y las modalidades se coordinan por lote. Se mantiene el dibujo SVG activado por interacción | `immersiveEntrance`, reveal de grupo y `drawIllustration`; `--duration-immersive`, `--motion-scale-sky`, `--duration-reading`, `--duration-draw` |
| AI Labs | El hero de acceso tardaba en dibujar las capas; el estado vacío aparecía abruptamente | **Refinamiento:** se acorta la entrada de terreno y contornos; el estado vacío comparte el feedback simple y el filtro responde de inmediato | `compactEntrance`, Anime.js WAAPI; `--duration-land`, `--duration-contours`; `data-feedback-arrive`, CSS |
| Fichas AI Labs | Los bloques relacionados reutilizaban el desplazamiento de página comercial | **Rediseño:** relaciones con un cambio leve de opacidad, sin movimiento del texto crítico o la ficha | `fade`, Anime.js WAAPI; `--duration-reading`, `--motion-opacity-fade` |
| Investigación | Hero compacto largo; tarjetas con movimiento vertical después del scroll | **Refinamiento:** acceso más rápido y entradas menos profundas; la selección no espera a la animación | `compactEntrance`, `reveal`, Anime.js WAAPI; `--duration-land`, `--duration-entrance`, `--motion-distance-rise` |
| Fichas de investigación | Los bloques editoriales tenían la misma entrada espacial que otras páginas | **Rediseño:** entrada de lectura sin desplazamiento para bloques secundarios | `fade`, Anime.js WAAPI; `--duration-reading`, `--motion-opacity-fade` |
| Equipo | Demora en línea de hasta 255 ms según el índice total | **Rediseño:** solo se ordenan tarjetas que efectivamente entran juntas; el zoom de retrato sigue limitado al medio | `data-reveal-group`, Anime.js WAAPI; `--motion-stagger-group`, `--motion-delay-group-max`; hover en CSS |
| Comunidad | Hero largo, entradas altas para filas y feedback inmediato sin indicio visual | **Refinamiento:** el destacado conserva un gesto corto, el historial usa el perfil de lectura y el aviso de filtros comparte una aparición breve | `compactEntrance`, `ink`, Anime.js WAAPI; `--duration-reading`, `--motion-distance-ink`; feedback CSS |
| Header y Footer | El gesto de menú dependía de Inicio y rotaba su contorno; el footer compartía entradas generales | **Rediseño de microinteracción:** solo rota el icono del menú en todas las rutas. El footer conserva su composición y se beneficia de los perfiles revisados | CSS local sobre el patrón nativo de `Dropdown`, `--duration-control`, `--editorial-ease-out`; reveal compartido |

Los perfiles resuelven opacidad, traslación y escala con tokens efectivos. El scroll usa `IntersectionObserver`, evita mover a destiempo lo que ya estaba visible, revierte al salir de pantalla o recibir foco y no repite un elemento visto. No se añadió un motor ni un parallax continuo. Los resultados y filtros mantienen el DOM y su foco: se eligió feedback local en lugar de mover o clonar resultados. Al reducir movimiento se conservan respuestas de color y se omiten efectos espaciales.

## C. Galería y gobernanza

- Entrance & Exit incluye el grupo compartido y un control de intensidad que escala únicamente la muestra. Los valores de duración, distancia, escala y curva se heredan de los presets si el control no tiene un override.
- Foundations inventaría contextos de contenedor y enlaza a la tarjeta real de Equipo: su título cambió de 26 px a 20,824 px al reducir el preview a 320 px. El índice distingue referencias estáticas de ejecución y añade `@import` CSS, referencias `var()` y lecturas de Motion Tokens desde TS. Los tokens sin referencia estática son candidatos para investigar, no para borrar.
- `check-design-system.mjs` bloquea configuración literal de tiempos/curvas en los módulos públicos de motion y módulos Anime.js sin ejemplo. Usa PostCSS y AST de TypeScript; revisa estilos en línea, medidas recurrentes y colores de UI en TS como advertencias. No intenta inferir semántica artística ni todas las variantes dinámicas.
- `review-design-tokens.js` aplica y retira overrides en tiempo de prueba para Button, Card, Badge, Input, SectionHeading, TextLink y la Card de Inicio. Verifica en los efectos WAAPI 999 ms, retrasos 0/133/150 ms y escala inicial 0,92 con tokens alterados temporalmente.

## D. Verificación y rendimiento

Playwright: siete rutas públicas, catálogo y siete fichas demo a **320, 390, 768, 1024 y 1440 px**. Se verificaron scroll rápido e inverso, limpieza de la entrada, hover reiterado, reduced motion, teclado, foco, navegación táctil, filtros, estados, formulario con dependencias simuladas y las demos. El entorno Chromium no restauró desde bfcache de forma real; la rama de restauración se ejercitó con `pageshow.persisted` simulado y se verificó atrás/adelante real.

`npm run ci:check` aprobó TypeScript de Astro y Worker, lint, formato, 31 pruebas unitarias, build estático, dry run y auditoría de salida. No hay fichas reales publicadas en los datos actuales ni se incluyeron el catálogo o las fichas demo en el build.

Capturas (antes arriba, después abajo): [móvil](visual-review/motion-pass/sitio-390.webp), [tablet](visual-review/motion-pass/sitio-768.webp) y [fichas](visual-review/motion-pass/fichas-1440.webp). La [galería actual](visual-review/motion-pass/galeria.webp) documenta los contenedores. La [secuencia de grupo](visual-review/motion-pass/grupo.webp) muestra cuatro fases de progreso y el estado reducido. La revisión independiente aprobó el grupo capturado: el contenedor se mantiene fijo y el estado reducido coincide visualmente con el final. Su alcance no incluye FPS, navegación ni otras rutas.

### Rendimiento local

Artefactos externos únicos (gzip): JS **17.053 → 17.294 B**, CSS **27.924 → 27.849 B**. Los 241 B gzip adicionales de JS corresponden principalmente a la coordinación y cancelación de entradas. La búsqueda y el feedback de controles no añaden módulos Anime.js.

| Ruta | JS leído antes → después (B) | CSS leído antes → después (B) |
| --- | ---: | ---: |
| Inicio | 22.270 → 22.802 | 92.530 → 92.548 |
| Empresas | 27.974 → 28.506 | 89.006 → 89.146 |
| Formación | 22.270 → 22.802 | 93.709 → 93.893 |
| AI Labs | 28.444 → 28.430 | 96.220 → 97.107 |
| Investigación | 30.414 → 30.946 | 94.507 → 95.393 |
| Equipo | 20.871 → 21.403 | 90.058 → 90.617 |
| Comunidad | 22.504 → 23.036 | 95.625 → 96.274 |

En Inicio, la traza del CLS original señaló el H1, la navegación y el siguiente título durante el intercambio de fuentes. Se adelantó la carga de Space Grotesk e Inter Tight, que ya se descargaban igualmente. En tres trazas posteriores equivalentes a 1440 px no se registraron desplazamientos durante los primeros 1,4 s. Las condiciones son Chromium local, contexto nuevo y sin red simulada; no se afirma CLS cero de campo.

Mediana de tres ejecuciones alternadas por versión y condición, medidas durante 3,2 s; CPU ×4 a 390 px. «Respuesta» mide del evento `input` al segundo `requestAnimationFrame`, no INP. «Saltos» cuenta intervalos rAF mayores a 25 ms; no mide frames del compositor.

| Vista | LCP (ms) | CLS | Respuesta (ms) | Hilo principal (ms) | Script (ms) | Tareas largas (ms) | Saltos |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Inicio, 390 px | 152 → 124 | 0,002 → 0 | — | 458 → 365 | 35 → 38 | 72 → 53 | 3 → 3 |
| Comunidad, 390 px | 196 → 168 | 0,0003 → 0 | 11 → 13 | 867 → 769 | 61 → 59 | 80 → 59 | 5 → 3 |
| Inicio, 1440 px | 40 → 52 | 0,0100 → 0 | — | 123 → 94 | 12 → 11 | 0 → 0 | 0 → 0 |
| Comunidad, 1440 px | 72 → 84 | 0,0011 → 0 | 19 → 14 | 245 → 215 | 16 → 14 | 0 → 0 | 1 → 0 |

La muestra local muestra un incremento de LCP de 12 ms en escritorio, con CLS y trabajo total inferiores. No se incorporaron cargas posteriores nuevas: el dibujo SVG sigue cargándose bajo demanda desde su módulo existente.
