# AI PlayGrounds

- Antes de crear un componente, consulta `src/components/ui/`, los compuestos, `DESIGN.md` y `/design-system/` (`npm run dev`).
- Usa `src/components/ui/` como fuente principal de átomos. No importes daisyUI ni uses sus clases `ds-*` en páginas, compuestos o componentes de dominio. Documenta una excepción junto al código y en `DESIGN.md` si existe una limitación técnica concreta.
- No dupliques un átomo para cambiar su apariencia. Extiende un átomo con una variante tipada cuando la necesidad sea reutilizable; documenta la variante y su ejemplo real en el catálogo.
- Empieza por los tokens semánticos de `src/styles/tokens.css`. Reutiliza los colores y valores existentes; solo añade un token si tiene un papel claro y reutilizable. `src/styles/theme.css` traduce los tokens a daisyUI.
- Usa Tailwind para layout, responsive y utilidades. Mantén CSS propio para la composición y el movimiento específicos. Una referencia visual nueva se logra componiendo y adaptando los componentes existentes, sin quedar limitada por el aspecto predeterminado de daisyUI.
- Respeta la semántica nativa, los nombres accesibles, el foco visible y `prefers-reduced-motion`. Conserva los contratos de formularios, navegación y contenido versionado.
- Mantén sincronizados `DESIGN.md`, el catálogo interno y el código. Si un átomo pasa del catálogo a producción, mueve su familia a `src/styles/theme.css`.
- Mantén Astro estático y TypeScript strict. No introduzcas frameworks JavaScript adicionales sin justificación y aprobación. Usa la skill oficial `daisyui` para consultar el contrato de CSS; prevalecen estas convenciones del proyecto.
- Antes de entregar, ejecuta `npm run ci:check`. Para cambios visuales, verifica el sitio y el catálogo con Playwright en desktop, tablet y móvil.
