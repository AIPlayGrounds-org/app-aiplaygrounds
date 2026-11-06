# P05-R2 · Dirección visual para revisión

**A2 pendiente.** H1, bajada y el nuevo H2 de I2 son candidatos editoriales; no sustituyen E2 ni autorizan publicación. El cuerpo de I2 se conserva de R1 tras revisión localizada: [candidato R2](editorial-candidate.md).

## Exploración y decisión

R1 tenía H1 sobredimensionado, una figura aislada difícil de interpretar y una caja desplazada en I2. Se contrastaron tres esquemas: (1) solo tipografía, sobrio pero con menor presencia de marca; (2) texto y símbolo aislado, que repetía el problema de R1; (3) texto y campo modular como composición asimétrica, seguida por I2 editorial abierta. Se eligió (3): una retícula 5×5 con módulos en diferentes estados y un núcleo Halo evoca exploración y construcción a partir del vocabulario del manual, sin presentarse como símbolo oficial. La distribución es una adaptación gráfica web, no un logotipo ni una animación canónica.

El H1 baja de ~83,5 px a ~61,9 px a 1440 px y usa escala fluida; su bajada y acciones quedan vinculadas al bloque. I2 elimina la caja y el borde, distribuyendo título y párrafo en columnas de lectura que se apilan en móvil. El H2 preferido es «El conocimiento crece cuando se comparte». No cambia el cuerpo de R1 ni el contenido de I3–I8.

En una segunda revisión de las primeras capturas se redujo el ancho de ilustración y padding de I3 a 320 px para devolver espacio al texto y se rompió la simetría de la retícula para evitar confusión con un logo. Se conservan las ilustraciones originales, las cifras y atribuciones de I4, las rutas de I5 y el cierre oscuro. No se añadieron dependencias ni movimiento. Reglas reutilizables: [composition-guidelines.md](composition-guidelines.md).

Se aplicaron `frontend-design` (alternativas, jerarquía y crítica), `starwind-ui` (reutilización de Button y Card), `astro-best-practices` (SSG y contenido semántico), `web-design-guidelines` (foco, enlaces y motion) y `playwright-cli` (inspección y capturas). Las referencias de marca se consultaron en P05-R1 y se contrastaron con el manual, brand-spec y recursos locales de referencia; Anthropic se consultó textualmente, no se inspeccionó visualmente en esta sesión. No se copiaron sus assets, CSS ni copy.

## Evidencias y validación

[Hero 1440](hero-1440.png) · [I2 1440](I2-1440.png) · [Inicio 1440](desktop-1440.png) · [768](tablet-768.png) · [360](mobile-360.png) · [320](mobile-320.png).

Chromium local: sin desbordamiento horizontal a 320, 360, 768 y 1440 CSS px; también a 320/360 con menú abierto. Un H1 y orden I1/I2/I3/I4/I5/I8. Teclado: Enter abre menú, Tab recorre y Escape cierra devolviendo foco; imágenes cargan y son decorativas junto a sus títulos. Emulados reduced motion y forced colors; no se ha hecho lector de pantalla ni zoom real 200/400 %, por lo que no se certifica WCAG. Pares cromáticos de la página y conejos conservan las comprobaciones de R1; no se añadieron textos sobre Halo.

`npm ci` y `npm run ci:check` pasan: siete pruebas, Astro Check, Worker types, build, dry-run y auditoría de salida. POST `/api/contact` local devuelve 503. CSS 34.567 bytes (~7.627 gzip); fuentes locales sin cambios, JS de menú mínimo; sin React ni SSR. No hay Lighthouse ni datos de campo. La auditoría de output no garantiza ausencia absoluta de fragmentos privados.

## Pendientes y recomendación A2

Las siete páginas/anclas futuras, logo maestro y favicon siguen pendientes; favicon local devuelve 404. Zoom real, lector de pantalla y navegadores adicionales requieren QA posterior. Se recomienda revisar ahora proporción del hero, lectura de I2 y continuidad con I3/I4 en las capturas; A2 sigue siendo decisión humana y no equivale a autorizar publicación. Previews siguen inactivos; P06 no iniciado.
