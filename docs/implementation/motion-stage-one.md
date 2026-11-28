# Motion Design · primera etapa aprobada

Rama `feat/daisyui-design-system`. Base de comparación: `c2c599f`. La etapa conserva las imágenes, el copy, la navegación, los formularios y la generación estática del sitio. El rediseño gráfico se concentra en los cuatro SVG de iniciativas.

## Implementación

| Patrón | Componente o integración | Rutas |
| --- | --- | --- |
| Kinetic Typography | `ImmersiveHero`: compresión y asentamiento de palabras; máscara de la descripción y escala de acciones. Paisaje fijo. | Inicio, Empresas, Formación |
| Layered Assembly | `VerticalCard`: título y descripción enmascarados, marco fijo para la entrada de la imagen, zoom CSS independiente. | Inicio, I3 |
| Rolling Digits | `RollingValue`: carretes por dígito en tamaños compacto y destacado; trazo de los separadores existentes. | Inicio, I4; Formación, F5 |
| Narrative Flow | `SectionHeading`, texto y `TextLink`: máscaras por línea, separador opcional y relevo hacia las flechas. | Inicio, I2 y encabezado de I4; Empresas, EM3 |
| Organic Reveal | `ClosingCTA`: elipse según el anclaje del paisaje, texto por líneas y acciones. | Inicio, Formación, Equipo, Comunidad |
| Compositional Convergence | `FormCTA`, `FormField` y `OrganizationContactForm`: apertura desde el eje central, convergencia según columnas y filas, finalización inmediata al interactuar. | Empresas, EM6; Formación, F7 |
| Landscape Expansion | `CollaborationCard`: variante de Organic Reveal para el paisaje de cada card; el enlace conserva la superficie clicable. | Empresas, EM2 |
| Signal Build | `InitiativeGrid`, `InitiativeCard` e `InitiativeArt`: la señal dibuja conexiones y activa módulos según la longitud de la ruta. | Inicio, I5; Empresas, EM4 |
| Active Trace | Las mismas tarjetas y rutas SVG, con un pulso más breve al entrar el puntero o enfocar el enlace. | Inicio, I5; Empresas, EM4 |

**Sistemas modulares.** AI Labs recorre una matriz de nueve celdas; AI Academy asciende entre tres capas; Investigación sigue los nodos de un gráfico conceptual; Organizaciones atraviesa una red con módulos periféricos y un nodo central. Inicio y Empresas instancian la misma geometría para AI Labs y AI Academy. Cada instancia tiene un ID explícito y usa el color editorial de su card.

**Motion System.** Se conservan el resolvedor de tokens, el ciclo de vida de preferencias, el escalonado por grupo y las microinteracciones CSS. Las nuevas secuencias comparten timeline, máscaras, observación e interrupción. Se amplió `--duration-hero` y se añadieron las otras ocho duraciones, los escalones de palabra/línea/dígito, la curva de máscara, el desplazamiento de palabras e imagen, escalas de asentamiento, profundidad de carrete y presencia de módulo/señal. Los valores exactos y la API están en [Motion System](motion-system.md).

**Sustituciones.** Se retiraron el reveal anterior de los bloques incluidos, la opacidad secundaria del hero inmersivo, el zoom de cielo en Formación y el dibujo normalizado para `InitiativeCard`. El motivo SVG de `InformationalCard`, el hero compacto y los reveals de directorios y fichas conservan sus módulos.

**Catálogo.** `/design-system/#motion` presenta las nueve fichas con componentes reales, trazabilidad, código, variantes y controles compatibles de reproducción, pausa, reinicio, duración, velocidad, curva, escalonado, intensidad y progreso. Active Trace se puede probar en las cuatro tarjetas con puntero o teclado. La simulación de movimiento reducido restaura el estado final. El Atlas mantiene su cierre estático de referencia.

## Evidencia visual

Fotogramas tomados con Playwright en las páginas reales; las columnas de cada fila avanzan de entrada a progreso, asentamiento y estado final.

- [Inicio](visual-review/motion-stage-one/inicio.webp): hero, lectura editorial, tarjetas de verticales y métricas.
- [Composiciones ilustradas y métricas de Formación](visual-review/motion-stage-one/composiciones.webp): Organic Reveal, Landscape Expansion, contacto y cifras del bootcamp.
- [Sistemas modulares](visual-review/motion-stage-one/sistemas-modulares.webp): Signal Build, Active Trace y la misma interacción con movimiento reducido.
- [Active Trace, muestra temporal](visual-review/motion-stage-one/active-trace.webp): las filas corresponden a puntero, movimiento reducido y foco de teclado. En cada fila, de izquierda a derecha: antes, ~60, ~285, ~545, ~855 y ~1200 ms. La ruta se traza por encima del SVG completo y sus atributos temporales desaparecen al asentarse.
- [Móvil](visual-review/motion-stage-one/movil.webp): entrada y final de Layered Assembly, Compositional Convergence y Organic Reveal a 390 px.
- [Familia en el catálogo](visual-review/motion-stage-one/catalogo.webp).

## Comprobaciones

- Playwright/Chromium: Inicio, Empresas, Formación, Equipo y Comunidad, y catálogo a **320, 390, 768, 1024 y 1440 px**. Se comprobaron entradas y reposo, scroll rápido e inverso, hover repetido, foco, puntero táctil, redimensionado, atrás/adelante, progreso y movimiento reducido. La [prueba de navegador](../../scripts/review-motion-stage.js) usa páginas reales y las demos.
- Se compararon las siete rutas públicas frente a la base sin JavaScript en los cinco tamaños: coinciden las cajas exteriores de las secciones, altura y texto del H1 y selección de paisaje crítico; no hubo desbordamiento horizontal. La comparación geométrica permite el nuevo SVG y el uso de números tabulares en métricas.
- El árbol de accesibilidad muestra un solo H1 intacto y solo el `+30` real durante el giro del odómetro. La comprobación del formulario mantuvo foco y valores al interrumpir la entrada. Se probó preselección, validación, error, reintento y éxito de Empresas con servicios interceptados en un build de prueba. Formación conserva la lista de espera deshabilitada. La vuelta al historial de Inicio recuperó el scroll sin reactivar los carretes.
- La revisión visual independiente de Active Trace comprobó progreso, limpieza, foco y estado reducido en las muestras temporales. El caso táctil emulado no activó señal ni estado hover.
- `npm run ci:check` en Node 24.22.2: lint, formato, Astro y Worker, validación de contenido y del Design System, 36 pruebas unitarias, build estático y empaquetado del Worker en `--dry-run`. La auditoría de salida confirmó que el catálogo y sus experimentos están excluidos. Las [pruebas de propagación](../../scripts/review-design-tokens.js) cubren también la duración y profundidad de Rolling Digits.

## Rendimiento

Medianas de tres ejecuciones por condición en Chromium local, contextos nuevos, sin red emulada. Se midieron la carga inicial durante 2,3 s, y los 1,5 s posteriores a desplazar hacia I3, EM2 o F6. A 390 px se usó emulación táctil y CPU ×4; a 1440 px, CPU sin ralentización. «Respuesta» mide del desplazamiento al segundo `requestAnimationFrame`; no es INP. «Saltos» cuenta intervalos entre frames JS mayores de 25 ms.

| Página | Ancho | LCP, ms | CLS | Hilo al cargar, ms | Tareas largas al cargar | Hilo tras scroll, ms | Respuesta, ms | Saltos tras scroll |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Inicio | 390 | 116 → 112 | 0 → 0 | 301 → 675 | 0 → 0 | 152 → 327 | 26 → 45 | 0 → 0 |
| Empresas | 390 | 120 → 132 | 0 → 0 | 302 → 544 | 0 → 1 | 157 → 543 | 26 → 49 | 0 → 0 |
| Formación | 390 | 120 → 124 | 0 → 0 | 370 → 499 | 0 → 1 | 176 → 630 | 30 → 58 | 0 → 1 |
| Inicio | 1440 | 52 → 56 | 0 → 0 | 96 → 228 | 0 → 0 | 55 → 137 | 29 → 29 | 0 → 0 |
| Empresas | 1440 | 48 → 56 | 0 → 0 | 92 → 174 | 0 → 0 | 62 → 153 | 27 → 30 | 0 → 0 |
| Formación | 1440 | 60 → 48 | 0 → 0 | 120 → 167 | 0 → 0 | 65 → 177 | 26 → 30 | 0 → 0 |

| Página | JS externo inicial, B | JS externo tras scroll, B (390 px) | CSS externo inicial, B | CSS inline, B |
| --- | ---: | ---: | ---: | ---: |
| Inicio | 22.083 → 64.399 | 22.083 → 64.916 | 83.125 → 83.526 | 10.566 → 11.386 |
| Empresas | 27.787 → 69.340 | 27.787 → 70.451 | 76.938 → 77.397 | 13.101 → 13.178 |
| Formación | 22.083 → 64.678 | 22.083 → 67.766 | 83.753 → 84.212 | 11.046 → 11.794 |

Los bytes por ruta son decodificados. El build contiene **38.396 → 92.749 B** de JS externo único (**17.294 → 41.017 B gzip**) y **137.495 → 137.896 B** de CSS externo (**28.169 → 28.343 B gzip**). La apertura llama al motor de timeline y tipografía; los demás patrones se solicitan al entrar. El marco de Layered Assembly utiliza una máscara estática y transforma la imagen interior para evitar repintar una máscara por frame. Las máscaras elípticas, la división de texto y el trazado sincronizado son el coste visual específico de esta etapa. El hilo principal y la respuesta móvil aumentaron de forma medible; la muestra no demuestra paridad de capacidad de respuesta. CLS se mantuvo en cero y el mayor aumento de LCP fue 12 ms en esta muestra.

### Límites

Las pruebas de accesibilidad usaron el árbol de Chromium y el teclado; no se hicieron sesiones con NVDA o VoiceOver. Móvil se midió por emulación y CPU ralentizada, sin un dispositivo físico ni métricas de campo. Chromium headless no confirmó una restauración real desde bfcache; se comprobó el recorrido atrás/adelante y se conserva el disparador `pageshow.persisted` para la reanudación. La recepción del formulario se verificó con respuestas interceptadas, sin enviar solicitudes a un buzón real.
