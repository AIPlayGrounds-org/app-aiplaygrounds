# Migración del Design System a daisyUI 5

**Base:** `feat/website-design-system` en `aa94234`. **Rama de trabajo:** `feat/daisyui-design-system`. Se conservan la composición editorial, el contenido aprobado y el sitio estático servido por Cloudflare Workers.

## Arquitectura y dependencias

| Antes | Después |
| --- | --- |
| Button y Card generados por Starwind, con adaptador Astro y Tailwind Variants. | 21 átomos Astro con props estrictas y clases prefijadas de daisyUI. Los mapas de variantes son objetos tipados sin runtime adicional. |
| Campos de contacto, facetas, búsqueda, etiquetas y superficies definidos en varios componentes de dominio. | Los compuestos reutilizan los átomos. El dominio conserva el layout, sus fuentes de datos y los hooks que leen los controladores existentes. |
| Tokens de marca y aliases Tailwind en CSS; muestras visuales estáticas en documentación y revisiones. | Tokens en tres niveles, un puente CSS al contrato daisyUI y un catálogo Astro donde se prueban los componentes y los tokens efectivos. |

- Se fijó `daisyui@5.8.3` en el manifiesto y lockfile; se mantiene `tailwindcss@4.3.4`. Se retiraron `@starwind-ui/astro`, la CLI `starwind`, Tailwind Variants, `starwind.config.json`, sus fuentes generadas y su skill. La skill oficial `daisyui` está versionada en `.agents/skills/daisyui/`; Impeccable y Frontend Design se conservan.
- `src/styles/theme.css` usa CSS-first con `themes: false`, `include` para las familias consumidas en producción y `ds-` como prefijo. `src/design-system/catalog-ui.css` aporta las familias que solo se necesitan en el catálogo. No se cargan temas genéricos, controlador global de tema ni reglas globales de scroll de la librería.
- Astro inyecta `/design-system/` exclusivamente al ejecutar `astro dev`. El catálogo y sus scripts viven fuera de `src/pages/`. La inspección de `dist` comprueba tanto la lista permitida de rutas como marcadores de HTML, CSS y JS del catálogo.
- Los formularios conservan sus IDs, nombres, validación y endpoints. `details` y `dialog` siguen siendo nativos; filtros y navegación conservan sus controladores. Tabs tiene JavaScript de teclado propio que solo se carga donde se renderiza el componente. No se añadió hidratación ni un framework JavaScript.

## Tokens

| Nivel | Inventario y fuente |
| --- | --- |
| Primitivos | `--brand-*` (Halo, Menta, Lima, negro, blanco y grises), `--web-light-*` y `--editorial-*`. Tipografía fluida `--type-*` para Space Grotesk e Inter Tight y Geist Mono en `--font-mono`; las tres fuentes siguen autoalojadas. `--space-*`, `--radius-*`, `--stroke-*`, `--shadow-*`, `--breakpoint-*`, `--icon-*`, `--layer-*`, `--duration-*` y curvas editoriales. |
| Semánticos | Fondo/texto, tres niveles de superficie, principal/secundario/acento/neutro y sus textos, `muted`, color de línea `--line`, campo `--input`, foco y acento de interacción. Success, warning, error e info tienen roles y textos asociados. Los dos temas propios se resuelven en los límites `data-theme="light\|dark"`. |
| Componentes | Alturas y relleno de Button XS–XL, gap de icono, tamaños de icono, densidades de Card, altura/relleno/separación de campos, altura de mensaje y opacidad de inactividad. El catálogo lee los valores efectivos desde CSS y calcula contraste por tema. |

[`tokens.css`](../../src/styles/tokens.css) contiene los valores. [`theme.css`](../../src/styles/theme.css) los referencia como `--color-*`, radios y unidades que espera daisyUI. `--border` es un grosor de daisyUI; el antiguo color de borde del sitio se llama `--line`. Los breakpoints específicos de las composiciones se mantuvieron; la galería usa un contenedor de preview regulable y se verificó también con cambios del viewport real.

## Componentes y migración

| Familia | Componentes y consumidores |
| --- | --- |
| Acciones y navegación | `Button`, `Dropdown`, `Dialog`, `Tabs`, `Accordion`, `Pagination`. Button reemplaza los CTA de Inicio, Empresas, Formación, header, cierres y fichas; reutiliza un solo componente para iconos, enlaces y envío. Dropdown mantiene el menú móvil y las facetas; Dialog viste el filtro móvil sin reemplazar `showModal()`. |
| Superficies y etiquetas | `Card`, `Badge`, `Avatar`, `Separator`, `Skeleton`. Card se usa en ProductCard, ResearchCard, TeamCard, InitiativeCard, CollaborationCard, ImmersiveCard, InformationalCard, las tarjetas de Inicio y MetadataPanel; cada composición conserva sus medios, rejillas y enlaces. `VerticalTag` y `ProductTags` comparten el átomo Badge y sus tamaños. |
| Formularios | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Label`. `FormField` reúne etiqueta, campo y error. `SearchField` comparte markup e icono en Comunidad y los directorios. El modo `native` de Checkbox y Radio conserva el aspecto del filtro y la lista de espera; sus variantes daisyUI se verifican en el catálogo. |
| Feedback | `Spinner`, `Alert`, `Tooltip`. Spinner también es el indicador de carga de Button. Las familias que aún no tienen consumidor público se documentan y prueban en el catálogo. |
| Compuestos | `FormField`, `SearchField`, `DirectoryFilter` (FilterControl en el catálogo), `FilterGroup`, `ViewToggle`, `VerticalTag`, `ProductTags`, `MetadataPanel`. Pagination admite enlaces normales y el modo gestionado por el directorio. |

Se eliminaron los antiguos módulos Card sin consumidores, las reglas repetidas de tipografía y tamaño de etiquetas, las definiciones de borde y estados de campos de `FormField` y el markup duplicado de búsqueda, cambio de vista y paginación. Las variaciones de composición (arte, colocación de iconos, ancho de columnas y estilo de los filtros editoriales) continúan en sus componentes o CSS de dominio. Las medidas y estados nuevos se documentan en el catálogo, con ejemplos Astro, controles de preview y código copiable.

## Tamaño del build

Bytes de los archivos de producción en `dist/_astro`, sumados por extensión. Gzip se calculó por archivo y se sumó sin combinar archivos; los bloques inline se contabilizaron por separado en las siete páginas generadas.

| Métrica | Antes | Después | Diferencia |
| --- | ---: | ---: | ---: |
| CSS externo sin comprimir | 121.585 | 127.330 | +5.745 (+4,7 %) |
| CSS externo gzip | 27.131 | 26.619 | −512 (−1,9 %) |
| JavaScript externo sin comprimir | 15.247 | 15.247 | 0 |
| JavaScript externo gzip | 6.617 | 6.617 | 0 |
| CSS inline sin comprimir | 72.809 | 77.295 | +4.486 |
| JavaScript inline sin comprimir | 18.100 | 11.990 | −6.110 |

El CSS sin comprimir crece por las variantes, estados accesibles y reglas de temas/componentes. La lista de módulos públicos y la exclusión de la galería reducen la transferencia de CSS externo. Los cuatro archivos JavaScript externos mantienen sus nombres y hashes.

## Verificación y capturas

- **Baseline:** build estático correcto y 31 pruebas unitarias correctas. El `ci:check` inicial se detuvo por cuatro archivos con formato pendiente.
- **Final:** `npm run ci:check` pasa con Node 24.22.2: ESLint, Prettier, Astro Check (0 errores y 0 warnings), tipos del Worker, validación de contenido, control de dependencias/clases de UI, 31 pruebas, build estático, build seco del Worker e inspección de la salida. `dist` contiene las siete páginas públicas autorizadas, sin el catálogo ni sus assets. `/design-system/` devuelve HTTP 200 en desarrollo y 404 al servir el build con `astro preview`.
- **Playwright (Chromium):** verificación a 320, 390, 768 y 1440 px. Búsquedas, estado vacío, limpieza, filtros básicos/avanzados, cambio de vista, cierre y retorno de foco del diálogo móvil, navegación móvil y fichas. Comprobadas la espera deshabilitada de Formación y las ramas de validación, error 422 y éxito en Empresas con Turnstile y endpoint simulados. En el catálogo se comprobaron búsqueda, cambio de tema, ancho de 320 px, variante/icono, copia, acordeón, dropdown, diálogo, tabs y tooltip con teclado, foco, hover y contraste AA en las parejas revisadas. También se verificaron el feedback de tarjeta y la preferencia de movimiento reducido.
- **Fidelidad:** 45 pares de capturas de página completa (15 rutas × 3 anchos), incluidos Inicio, Empresas, Formación, AI Labs, Investigación, Equipo, Comunidad, el atlas de desarrollo y las siete fichas de demostración. Las 45 mantienen la altura de página y no hay overflow horizontal. 42 pares son idénticos píxel a píxel; los tres de Formación tienen 16 píxeles por ancho con un cambio de canal mayor que 8/255 (máximo 0,000727 %), localizados en contornos. Las comparativas versionadas son recortes; el CSV se calculó sobre las capturas completas.

| Catálogo | Comparativas |
| --- | --- |
| [Desktop](visual-review/design-system/design-system-1440.webp) · [Tablet](visual-review/design-system/design-system-768.webp) · [Móvil](visual-review/design-system/design-system-390.webp) | [1440 px](visual-review/design-system/comparativa-1440.webp) · [768 px](visual-review/design-system/comparativa-768.webp) · [390 px](visual-review/design-system/comparativa-390.webp) |
| [Playground oscuro de Button](visual-review/design-system/button-dark.webp) · [Colores y tokens en móvil](visual-review/design-system/foundations-mobile.webp) | [Resultados por ruta y ancho (CSV)](visual-review/design-system/comparativa.csv) |

Las pruebas de navegador son reproducibles con [`scripts/review-design-system.js`](../../scripts/review-design-system.js), que recibe una página Playwright y el origen del `astro dev`. El parámetro `contactEnabled` activa el recorrido con mocks; para esa ejecución el servidor se inicia con `PUBLIC_CONTACT_ENABLED=true`, `PUBLIC_CONTACT_TURNSTILE_SITE_KEY=test-local`, `PUBLIC_CONTACT_POLICY_VERSION=test-local` y `PUBLIC_CONTACT_PRIVACY_URL=/empresas/`.

**Límites de la verificación:** no se enviaron solicitudes reales a Turnstile ni se enviaron correos; la verificación no cambia la configuración de producción. No hay fichas aprobadas en los datos públicos del commit base; se verificaron ambos templates con todos los registros demo. No se excede una página de resultados en las demos actuales, de modo que la paginación del directorio se cubrió con las pruebas unitarias existentes y el átomo con el preview. Las capturas usan Chromium y movimiento reducido. No hubo push, despliegue ni merge a `main`.
