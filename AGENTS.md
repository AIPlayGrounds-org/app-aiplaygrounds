# AI PlayGrounds

El Design System gobierna la apariencia y el Motion System gobierna el movimiento
reutilizable. Mantén esta dirección: primitivas → tokens semánticos →
tokens de componentes y movimiento → átomos y patrones → compuestos y layouts →
sitio y catálogo. El catálogo consume implementaciones reales; producción no
depende de `src/design-system/`.

En cada tarea de diseño: comprende la referencia y su intención; consulta
fundamentos, átomos y movimiento; identifica las capacidades existentes y las
que faltan; amplía el sistema cuando una capacidad sea reutilizable; compón el
diseño; verifica comportamiento y aspecto; actualiza documentación y demos.
Estos pasos aplican aunque el encargo no mencione el Design System, daisyUI o Anime.js.

Justifica junto a la implementación las excepciones de composición o arte que
requieran valores locales. Conserva los puntos de quiebre dictados por contenido
cuando unificar perjudique el layout. Evita sistemas paralelos y tokens
individuales que solo escondan un literal. La coherencia debe preservar
creatividad, accesibilidad y rendimiento.

- Antes de crear un componente, consulta `src/components/ui/`, los compuestos, `DESIGN.md` y `/design-system/` (`npm run dev`).
- Usa `src/components/ui/` como fuente principal de átomos. No importes daisyUI ni uses sus clases `ds-*` en páginas, compuestos o componentes de dominio. Documenta una excepción junto al código y en `DESIGN.md` si existe una limitación técnica concreta.
- No dupliques un átomo para cambiar su apariencia. Extiende un átomo con una variante tipada cuando la necesidad sea reutilizable; documenta la variante y su ejemplo real en el catálogo.
- Empieza por los tokens semánticos de `src/styles/tokens.css`. Reutiliza los colores y valores existentes; solo añade un token si tiene un papel claro y reutilizable. `src/styles/theme.css` traduce los tokens a daisyUI.
- Usa Tailwind para layout, responsive y utilidades. Mantén CSS propio para la composición y el movimiento específicos. Una referencia visual nueva se logra componiendo y adaptando los componentes existentes, sin quedar limitada por el aspecto predeterminado de daisyUI.
- Respeta la semántica nativa, los nombres accesibles, el foco visible y `prefers-reduced-motion`. Conserva los contratos de formularios, navegación y contenido versionado.
- Mantén sincronizados `DESIGN.md`, el catálogo interno y el código. Si un átomo pasa del catálogo a producción, mueve su familia a `src/styles/theme.css`.
- Mantén Astro estático y TypeScript strict. No introduzcas frameworks JavaScript adicionales sin justificación y aprobación. Usa la skill oficial `daisyui` para consultar el contrato de CSS; prevalecen estas convenciones del proyecto.
- Antes de entregar, ejecuta `npm run ci:check`. Para cambios visuales, verifica el sitio y el catálogo con Playwright en desktop, tablet y móvil.

## Animations and Interactions

- Ante cualquier solicitud de animación o interacción, consulta la skill `anime.js-best-practices`, `src/motion/` y `/design-system/#motion` antes de crear un patrón. Impeccable orienta la intención visual; conserva la composición aprobada.
- Anime.js v4 es el motor de movimiento avanzado: entradas coordinadas, scroll, timelines, stagger, SVG, tipografía, layout, físicas e interacciones complejas. Prioriza `waapi.animate()` cuando baste; utiliza el motor JS cuando haga falta. No uses APIs v3, motores propios ni otras librerías sin aprobación explícita.
- Mantén hover, foco, presión, deshabilitado, color, bordes, iconos y cargas simples en CSS, Tailwind o daisyUI. Parte de los Motion Tokens; no dupliques presets.
- Carga los módulos por componente en el navegador, limita sus objetivos y revierte efectos, listeners y observadores al desmontar. Comprueba reduced motion, foco, estado estático sin JS y rendimiento móvil.
- Documenta los patrones reutilizables y sus demos en el catálogo. Una composición singular puede definir su movimiento local sin duplicar el ciclo de vida compartido; las demos experimentales no se publican.
