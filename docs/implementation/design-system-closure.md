# Auditoría de cierre del Design System

Referencia: `151eed90`. Esta revisión conserva Astro, Tailwind, daisyUI, Lucide y Anime.js, la dirección editorial y el contenido publicado. La fuente de verdad sigue siendo `src/styles/tokens.css`; el catálogo renderiza componentes y patrones del sitio.

## Alcance y método

La primera pasada inventarió las rutas estáticas y de detalle, layouts, átomos, compuestos, componentes de dominio, CSS compartido y encapsulado, atributos Astro, estilos dinámicos de TS, datos visuales y SVG de `src/` y `public/`. Se contrastaron `theme.css`, el puente de Tailwind, el catálogo, los módulos de movimiento, `AGENTS.md`, `DESIGN.md`, las skills del proyecto, las pruebas y el workflow `checks.yml`. El análisis de fuentes incluye la ruta de galería inyectada en desarrollo y el Atlas interno, por separado del build público.

La segunda pasada volvió a rastrear el árbol con búsquedas de atributos, declaraciones, shorthands, referencias y APIs de movimiento, más un análisis independiente de dependencia y uso de tokens. Identificó términos fijos junto a `var()` o `clamp()`, pesos de shorthands `font`, radios de CTA y perfiles que leían directamente la escala predeterminada de Tailwind y dos tokens sin consumidores. Se corrigieron, se volvió a ejecutar la política sobre todo `src/` y se repitieron las comprobaciones de navegador. El CLI terminó sin diagnósticos pendientes. Esta verificación es de las reglas implementadas: no demuestra la ausencia de cualquier literal posible generado en tiempo de ejecución.

## Hallazgos y correcciones

| Área | Hallazgo | Cierre |
| --- | --- | --- |
| Formación, flechas de cards y Equipo | El desplazamiento hacia abajo se fijaba inline y los iconos sociales tenían su propio desplazamiento | `data-card-arrow="down"` y `--motion-arrow-down`; `--motion-icon-nudge` para el gesto de los enlaces sociales |
| Cabecera, directorios, comunidad, fichas y galería | Props numéricas de Lucide (14–24 px), incluido un `iconSize` libre en `SearchField` | Utilidades `size-icon-*` de la escala compartida; `SearchField` acepta `md` o `lg`. Se conservan el centrado óptico y los tamaños intrínsecos de ilustración |
| Directorios, fichas, Formación y Comunidad | Radios de chip de 1 y 2 rem, textos de 1,4/1,0625 rem, interlínea de 1,6 y separaciones de 0,35/0,55 rem | `--radius-pill`, `--type-title`, `--type-control`, `--leading-body` y espacios semánticos. El nuevo medio paso `--space-micro` sirve para etiquetas y metadatos compactos |
| Badge, Tabs, fotos, calendario | Densidad y grosor definidos por componente, rótulos con tracking paralelo | `--leading-label`, `--stroke-default`, `--stroke-emphasis`, `--stroke-focus` y `--tracking-caps`; el tamaño y aspecto de las imágenes siguen respondiendo a su composición |
| AI Labs, Equipo y SVG de hero | Los fondos de alcance y un icono de Equipo extraían pigmentos de un objeto de geometría | Cuatro `--terrain-*-light` compartidos. La prueba de contraste lee los valores reales de CSS y el navegador comprueba que el token llega al dominio |
| Átomos y catálogo | Los tamaños y variantes disponibles se describían en texto o solo mostraban la opción predeterminada | Contratos en `src/components/ui/options.ts` para controles binarios, Avatar, Spinner, Alert, Accordion, Separator, Tooltip, Dropdown y Dialog. La galería muestra tamaños y estados y permite cambiar posición/alineación; el diálogo personalizado conserva un botón de cierre y el retorno de foco |
| Referencias y topología | Un grafo textual confundía relaciones de tipos con ciclos ejecutables y omitía reexports, CSS y entradas dinámicas literales | Se distinguen imports `type`, exports y `import()` estáticos. Se controlan ciclos de ejecución y dependencias de átomos/motion hacia capas superiores; producción no puede usar la galería |
| Motion y salida | Los principales perfiles ya eran compartidos; la flecha de Formación y el gesto social aún usaban literales. La auditoría de artefactos tenía marcadores incompletos de trazabilidad | Se tokenizan esos dos gestos; se conservan secuencias y tiempos aprobados de Anime.js, reduced motion y estados nativos. La auditoría del build incluye marcadores del índice de uso |

Retirados `--web-light-grid` y `--shadow-flat` tras comprobar referencias CSS, TypeScript, utilidades y galería. Se conservan `--brand-lime` (paleta oficial visible) y `--duration-instant` (referencia de la escala), aunque no tengan un consumidor de producción directo.

## Excepciones y reglas bloqueantes

- Las declaraciones CSS excepcionales llevan `design-exception` en la misma línea: reserva de cielo y horizonte en el hero, ajustes ópticos de un título o icono y el borde interno de la cabecera. El Atlas conserva pigmentos, composición tipográfica y secuencias de su facsímil por declaración; sus reglas compartibles de borde y espacio consumen el sistema. El validador denuncia marcadores ya innecesarios.
- Las coordenadas, recortes, proporciones y opacidades de ilustración se distinguen de los estados de interfaz. Los pigmentos SVG del `ProductCover` se admiten por valor explícito. Los otros pigmentos de terreno permanecen en el recurso artístico; los fondos que sí usa la interfaz están en tokens. Los SVG de marca de `public/` son archivos gráficos.
- Se conservan las posiciones dinámicas de los desplegables, el punto focal suministrado por los datos, la colocación de las escenas, los breakpoints de contenido y las consultas de contenedor. Los estilos de la galería interpolan tokens o valores de preview temporales, no otra paleta.
- La validación combina AST de Astro, PostCSS y TypeScript. Bloquea, entre otros, literales CSS en las propiedades controladas, medidas de icono Lucide en props, clases arbitrarias visuales en atributos, colores en objetos de interfaz TS, tiempos Anime.js literales, referencias de tokens sin definición, átomos sin render en galería y patrones de producción sin demo. Las cinco nuevas pruebas incluyen casos válidos e inválidos y una ejecución aislada del CLI que confirma que una excepción no habilita el resto del archivo.

### Límites de cobertura

El grafo estático no evalúa rutas calculadas, spreads arbitrarios ni CSS generado por una biblioteca; el análisis de opciones es una comprobación de conexión con el catálogo, no un generador de todas las combinaciones de props. Los cálculos fluidos y los breakpoints se revisan visualmente. El alcance de navegador es Chromium; no sustituye una prueba completa de tecnologías de asistencia ni métricas de campo.

## Verificación visual y funcional

- **80 vistas**: siete rutas públicas, siete fichas demo, galería y Atlas, a **320, 390, 768, 1024 y 1440 px**. Sin overflow horizontal ni errores de consola. Las fichas de producto e investigación se prueban con datos demo: la rama no tiene fichas publicadas.
- Playwright comprobó teclado, retorno de foco, navegación táctil, filtros, búsqueda, formulario, reduced motion, restauración mediante evento simulado y cancelación del reveal. El test de propagación aplica y retira color, tipografía, espacio, radio, borde, iconografía y sombra en átomos, compuestos y dominio. Anime.js leyó 999 ms, delays de 0/133/150 ms, escala de 0,92 y desplazamiento de 37 px durante la prueba.
- Comparación de **45 capturas antes y 45 después**. Montajes: [móvil](visual-review/design-system-closure/movil.webp), [tablet](visual-review/design-system-closure/tablet.webp), [fichas](visual-review/design-system-closure/fichas.webp), [catálogo](visual-review/design-system-closure/catalogo.webp). Las diferencias de altura vienen principalmente de la densidad de etiquetas y metadatos; las cabeceras, paisajes y composiciones principales se conservan.
- `npm run ci:check`: lint, formato, TypeScript de Astro y Worker, contenido, **36 pruebas**, build estático, dry run de Worker y auditoría de salida. Las herramientas del catálogo, la trazabilidad y los datos demo siguen fuera del build.

## Rendimiento

Artefactos únicos de JS: **17.294 B gzip**, sin cambio. El CSS creció alrededor de **0,35 KB gzip** por las utilidades y referencias de tokens compartidas. En las siete rutas públicas, la suma de CSS decodificado cargado por página aumentó aproximadamente entre **1,0 y 1,3 KB**; los bytes de JS por ruta se mantuvieron.

Medianas de tres ejecuciones alternadas por condición en Chromium local, sin red emulada, CPU ×4 a 390 px. Respuesta mide del `input` al segundo frame solicitado, no INP. Saltos cuenta intervalos rAF mayores de 25 ms.

| Vista | LCP (ms) | CLS | Búsqueda (ms) | Hilo principal (ms) | Tareas largas (ms) | Saltos |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Inicio, 390 px | 136 → 144 | 0 → 0 | — | 393 → 412 | 51 → 65 | 3 → 3 |
| Comunidad, 390 px | 164 → 156 | 0 → 0 | 12 → 13 | 737 → 725 | 63 → 57 | 3 → 3 |
| Inicio, 1440 px | 52 → 52 | 0 → 0 | — | 90 → 93 | 0 → 0 | 0 → 0 |
| Comunidad, 1440 px | 100 → 116 | 0 → 0 | 13 → 15 | 268 → 276 | 0 → 0 | 0 → 0 |

Las diferencias de LCP y tareas largas son resultados de esta muestra local; no se afirma paridad de campo. El CLS se mantuvo en cero en las medianas y no se añadió una dependencia de runtime.
