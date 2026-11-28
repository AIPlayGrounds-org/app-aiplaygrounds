# Motion System · optimización de rendimiento

Esta intervención conserva las nueve direcciones de movimiento de `6c02b4c`, los paisajes y la familia de Sistemas modulares. En Organizaciones, el nodo central vuelve a responder cuando la señal pasa por él de nuevo. La política de carga deja visible una composición cuyo módulo llega después de su ventana de entrada.

## Diagnóstico anterior a los cambios

- **Carga inicial.** En Inicio, Kinetic Typography solicitaba `sequence` (29.431 B), el parser compartido (10.098 B) y `typography` (6.975 B), además del controlador y otras dependencias. `sequence` arrastraba el motor JS de timeline y resultaba el mayor salto de tamaño. `signal` no aparecía en la carga inicial. El tamaño indica bytes decodificados; la traza distingue el trabajo efectivo de evaluar código.
- **Hilo principal.** En las trazas CPU ×4, el scroll a I3, EM2 y F6 produjo recálculo de estilos y paint además de scripting. En I4 las divisorias cambiaban una propiedad CSS heredada en cada tick y los carretes tenían un elemento por cifra intermedia. El motor generaba valores JS y el navegador volvía a calcular y pintar las máscaras; eliminar JS no elimina el coste de rasterizar la escena.
- **Tipografía.** La implementación anterior separaba palabras, leía sus cajas, agrupaba líneas y mantenía un `ResizeObserver` por título mientras duraba la secuencia. H1 solo necesitaba palabras. Las escenas por línea necesitan conocer el salto real, pero pueden agrupar después de una tanda de lecturas, conservar un solo texto semántico y revertir al cambiar el ancho.
- **SVG.** Signal Build y Active Trace sí dependen de un reloj común para dibujar conexiones, mover la señal y disparar pulsos. Anime.js calculaba longitud y matriz dos veces en la inicialización de cada recorrido. Las llamadas de geometría y las escrituras de trazo durante el recorrido mantienen un coste propio. El `indexOf` usado para preparar las paradas descartaba las visitas posteriores a un módulo.

| Patrón | Optimización y fidelidad |
| --- | --- |
| Kinetic Typography | Las palabras del H1 no necesitan medir geometría. El navegador interpola los tres fotogramas con el mismo offset y las fases de máscara y acciones conservan sus posiciones. El texto original sigue disponible en el árbol accesible. |
| Layered Assembly | `translate` y `scale` son pistas independientes en un marco fijo. La traducción conserva la curva efectiva anterior mediante `waapi.convertEase()`; el antiguo motor interpolaba ambos factores del `calc()` en la fase de desplazamiento. |
| Rolling Digits | Un carrete de texto multilínea por dígito, con la misma profundidad y movimiento. Las comas, signos y unidades siguen en su sitio. La divisoria anima una propiedad porcentual no heredada; sigue pintando localmente. |
| Narrative Flow | Para los títulos de texto plano se construyen palabras en un fragmento, se miden los cortes juntos y se conserva solo la caja de cada línea. Máscaras, dirección, separador y fases de enlaces se conservan. |
| Organic Reveal | Elipse original por WAAPI, con el mismo punto de anclaje y una pista de escala separada del hover CSS. La pintura principal baja en la muestra, pero la rasterización de ilustraciones sigue siendo un coste. |
| Compositional Convergence | Máscaras, transformación y opacidad nativas. Traslación y opacidad conservan sus curvas distintas incluso cuando comparten fase. El foco, clic o escritura cancelan las pistas sin reemplazar nodos del formulario. |
| Landscape Expansion | Comparte la elipse y el reloj nativo de Organic Reveal. Las tarjetas conservan el stagger, el recorte y las áreas de interacción. |
| Signal Build | Conserva `createDrawable`, `createMotionPath` y el timeline JS. Reutiliza los valores iniciales de geometría en coordenadas SVG y sincroniza las visitas con las distancias precalculadas. |
| Active Trace | Reutiliza el mismo módulo y la misma geometría de Signal Build. Todas las visitas disparan el pulso; solo la primera revela el módulo. La observación sale al acabar o perder visibilidad, y no se crea un observador por tarjeta. |

## Carga, ciclo de vida y tokens

`scene.ts` comparte las opciones y los tiempos. `native-sequence.ts` monta pistas independientes en el reloj nativo: usa Anime.js WAAPI para las pistas sencillas; WAAPI nativo agrupa propiedades con el mismo reloj y admite offsets de fotogramas precisos. El código de los SVG conserva `sequence.ts` y el motor JS, que se solicita al acercarse a una iniciativa. Ningún consumidor público importa el Playground. El Playground maneja progreso, velocidad, pausa y reinicio sobre los mismos efectos; el sondeo de progreso solo existe cuando hay un consumidor de depuración.

Se conserva un observador para entradas coordinadas; `0` y `0,2` permiten comenzar una importación en el borde y activar a partir del umbral. Las importaciones concurrentes se reúnen por patrón y se liberan las solicitudes descartadas. Una tarjeta puede activarse junto a sus hermanas, sin cola; conservar el desfase común tiene prioridad sobre fraccionar por frames. Si el módulo no llega a tiempo, el contenido ya visible no vuelve a enmascararse. Los límites `--motion-delay-entry-load-max` y `--motion-delay-opening-max` no cambian la duración de las coreografías. Se cancelan pistas y nodos temporales ante foco, scroll fuera de zona, resize, documento oculto, navegación o reduced motion. Las funciones de construcción revierten el trabajo previo si una operación posterior falla.

El HTML publica **15** raíces en Inicio, **8** en Empresas, **4** en Formación, **1** en Equipo y **1** en Comunidad. Excluyendo el hero inicial, el observador de secuencias recibe como máximo 14, 7, 3, 1 y 1 objetivos pendientes respectivamente. AI Labs e Investigación no tienen objetivos de esta infraestructura. Un lote conserva las cuatro verticales de Inicio o las dos colaboraciones de Empresas; composiciones vecinas pueden coincidir. Las entradas editoriales anteriores mantienen su propio observador.

La lectura de tokens distingue ausencia de cero, exige `ms` o `s` para duraciones no negativas y valida el formato de números y longitudes. El delay editorial predeterminado hereda `--duration-instant`; no se inyectan duraciones sustitutivas. Un token inválido produce un diagnóstico en desarrollo y la escena permanece estática si no puede construirse. No se añadieron capas GPU permanentes ni se cambiaron duraciones aprobadas.

## Método

Se sirvieron builds estáticos locales de `c2c599f`, `6c02b4c` y la versión optimizada. Contextos nuevos por visita (caché fría), Chromium **157.0.8103.15**, Node **24.22.2**, Linux Fedora, kernel **7.3.3-300.fc45.x86_64**. Viewports **390 × 900** táctil y **1440 × 900**. Las condiciones fueron CPU ×4 sin red emulada (móvil), CPU ×1 sin red emulada (escritorio) y CPU ×6 con latencia **150 ms** y **200.000/93.750 B/s** de descarga/subida (móvil). Cinco visitas por combinación y versión. Las rondas de ambas bases se completaron antes de la ronda de la versión optimizada.

El escenario repite el desplazamiento a I3, EM2 o F6: primera muestra a partir de 2,3 s (4,5 s con red emulada) y ventana posterior de 1,5 s. «Respuesta» es scroll a dos callbacks rAF, **no INP**. Los saltos son intervalos rAF de más de 25 ms, no frames perdidos del compositor. Para desplazamientos de layout se suman los eventos sin entrada reciente, sin aplicar las ventanas de sesión del CLS de campo. Los bytes transferidos corresponden a un servidor HTTP local sin compresión; el gzip se calcula por archivo del build. Se hicieron además trazas diagnósticas, una por ruta y versión (`6c02b4c` y optimizada), con marcas por sección y categorías de V8, render y raster.

## Resultados de carga y ejecución

En todas las tablas, el orden es **`c2c599f` → `6c02b4c` → optimizada**. Los rangos son mínimo–máximo de las cinco mediciones.

| Recurso | Antes de etapa 1 | Etapa 1 | Optimizada |
| --- | ---: | ---: | ---: |
| JS exterior único, B | 38.396 | 92.749 | 87.423 |
| JS exterior único gzip, B | 17.294 | 41.017 | 38.582 |
| CSS exterior único, B | 137.495 | 137.896 | 138.005 |
| CSS exterior gzip, B | 28.169 | 28.343 | 28.375 |

| Página | JS inicial decodificado, B | JS inicial transferido, B | CSS inicial decodificado, B | JS inicial vs. etapa 1 |
| --- | ---: | ---: | ---: | ---: |
| Inicio | 22.083 → 64.399 → 33.147 | 24.483 → 67.999 → 36.747 | 83.125 → 83.526 → 83.635 | −48,5% |
| Empresas | 27.787 → 69.340 → 38.161 | 31.087 → 73.540 → 42.361 | 76.938 → 77.397 → 77.506 | −45,0% |
| Formación | 22.083 → 64.678 → 33.499 | 24.483 → 68.278 → 37.099 | 83.753 → 84.212 → 84.321 | −48,2% |

El JS total baja **5,9% gzip**; el ahorro mayor se produce en los recursos iniciales por ruta. `signal` contiene el timeline JS que antes estaba en el grupo de apertura; las rutas sin iniciativas no solicitan ese módulo. La división de texto de producción cae de 6.975 a 874 B decodificados. WAAPI se reutiliza con las entradas editoriales y los motivos existentes. En móvil ×4, el scripting de carga cae de **86 a 36 ms** en Inicio, **70 a 31 ms** en Empresas y **95 a 32 ms** en Formación. No se atribuye toda la diferencia a parsing o compilación; el coste de V8 también varía con el orden de recursos y las imágenes concurrentes.

| Viewport | Página | Hilo posterior, ms | Rango etapa 1 → opt., ms | Respuesta, ms | Rango etapa 1 → opt., ms | LCP, ms |
| --- | --- | ---: | --- | ---: | --- | ---: |
| 390 ×4 | Inicio | 190 → 407 → 201 | 359–477 → 184–221 | 19 → 45 → 26 | 21–54 → 19–32 | 112 → 120 → 128 |
| 390 ×4 | Empresas | 159 → 445 → 256 | 402–450 → 228–268 | 21 → 43 → 35 | 40–51 → 31–40 | 112 → 120 → 124 |
| 390 ×4 | Formación | 225 → 731 → 482 | 602–836 → 407–563 | 30 → 25 → 52 | 18–67 → 22–60 | 112 → 124 → 132 |
| 1440 ×1 | Inicio | 62 → 141 → 96 | 132–162 → 94–98 | 24 → 24 → 27 | 19–30 → 25–30 | 48 → 44 → 60 |
| 1440 ×1 | Empresas | 68 → 139 → 84 | 132–170 → 78–92 | 25 → 27 → 27 | 20–28 → 26–29 | 44 → 44 → 52 |
| 1440 ×1 | Formación | 62 → 174 → 96 | 160–187 → 91–99 | 26 → 23 → 26 | 19–25 → 21–28 | 48 → 48 → 48 |

En móvil ×4, el scripting posterior pasó de **40 a 12 ms** (Inicio), **37 a 11 ms** (Empresas) y **71 a 16 ms** (Formación); el recálculo de estilos, de **75 a 29**, **105 a 53** y **263 a 140 ms** respectivamente. El layout fue de **3 a 3**, **6 a 3** y **12 a 7 ms**. En escritorio, ambas métricas siguieron por debajo de los perfiles anteriores. CLS inicial se mantuvo en cero. Tras el salto programático a F6, el CLS móvil fue **0,0719 en las tres versiones**; por tanto, no se puede extender el resultado de cero al escenario posterior a scroll.

Una comprobación separada (cinco visitas a Empresas en desktop) midió `pointerenter` y foco hasta dos callbacks rAF: Active Trace **26 → 25 ms** (rangos 19–30 → 19–32), foco en contacto **27 → 31 ms** (23–30 → 28–32). Son eventos instrumentados, sin latencia de dispositivo ni métrica INP.

### Móvil con CPU ×6 y red emulada

| Página | Hilo posterior, mediana [rango], ms | Respuesta, mediana, ms | LCP, mediana, ms | Tareas largas al cargar | Saltos tras scroll |
| --- | --- | ---: | ---: | ---: | ---: |
| Inicio | 252 [223–260] → 616 [535–656] → 263 [242–342] | 29 → 33 → 50 | 1564 → 1608 → 1604 | 1 → 2 → 1 | 0 → 1 → 2 |
| Empresas | 224 [187–252] → 534 [518–629] → 139 [121–198] | 22 → 23 → 24 | 1504 → 1568 → 1564 | 1 → 2 → 1 | 0 → 1 → 0 |
| Formación | 264 [222–283] → 931 [822–1172] → 190 [159–201] | 24 → 27 → 30 | 1572 → 1592 → 1600 | 1 → 2 → 1 | 0 → 2 → 0 |

Este salto brusco también mide la política de carga: una entrada fría puede vencer su presupuesto. **No es una comparación aislada del motor**. En el control por aproximación se verificó que Layered Assembly sí se reproduce bajo esa misma red cuando el módulo llega desde el borde. En la red emulada, los máximos por visita de las tareas largas iniciales en la versión optimizada tuvieron medianas de 63, 82 y 67 ms (Inicio, Empresas y Formación).

### Trazas por sección

Una traza por ruta en móvil ×4, `6c02b4c` → optimizada. Valores en ms: suma de eventos cuyo inicio cae dentro de la ventana marcada. Los tiempos pueden solaparse; `RasterTask` suma trabajo en distintos hilos y no equivale a tiempo transcurrido. Cada salto puede incluir imágenes diferidas o escenas vecinas.

| Ventana | `V8.CompileCode` | `Layout` | `UpdateLayoutTree` | `Paint` | `RasterTask` |
| --- | ---: | ---: | ---: | ---: | ---: |
| Inicio · carga | 85 → 68 | 46 → 20 | 161 → 76 | 107 → 32 | 153 → 25 |
| I3 · Layered Assembly | 6 → 3 | 5 → 4 | 79 → 37 | 76 → 21 | 60 → 40 |
| I2 · Narrative Flow | 0 → 0 | 0 → 0 | 0 → 0 | 0 → 0 | 0 → 3 |
| I4 · Rolling Digits | 2 → 5 | 16 → 10 | 216 → 112 | 209 → 146 | 57 → 64 |
| I5 · Signal Build | 3 → 16 | 140 → 124 | 124 → 93 | 134 → 112 | 74 → 69 |
| I8 · Organic Reveal | 1 → 1 | 3 → 2 | 120 → 46 | 108 → 14 | 104 → 155 |
| Empresas · carga | 80 → 63 | 31 → 13 | 121 → 70 | 46 → 20 | 81 → 23 |
| EM2 · Layered Assembly | 1 → 2 | 3 → 5 | 119 → 78 | 108 → 14 | 111 → 375 |
| EM4 · Signal Build | 0 → 0 | 90 → 76 | 93 → 66 | 81 → 63 | 31 → 30 |
| EM6 · Compositional Convergence | 1 → 2 | 47 → 29 | 108 → 44 | 89 → 44 | 182 → 227 |
| Formación · carga | 74 → 67 | 27 → 16 | 102 → 77 | 58 → 25 | 82 → 19 |
| F6 · Landscape Expansion | 6 → 6 | 11 → 9 | 281 → 151 | 268 → 156 | 163 → 443 |

El coste de compilación se desplaza en parte a la primera iniciativa (I5). Paint en el hilo principal baja en casi todas las ventanas de esta muestra; el aumento de raster en EM2, EM6, I8 y F6 impide interpretar esa bajada como un ahorro equivalente de renderizado total. Kinetic Typography está incluida en la carga, y Active Trace se validó en la prueba de interacción aparte.

### Objetivos y límites

- **Hilo tras scroll:** −51%, −42% y −34% en móvil ×4 sin red emulada; las tres rutas mejoran sobre `6c02b4c`. En desktop: −32%, −40% y −45%.
- **JS inicial:** entre −45% y −49%, supera el objetivo orientativo; el peso total sigue por encima de `c2c599f` porque se conserva el motor avanzado para los SVG.
- **Respuesta:** en móvil ×4 bajó de 45 a 26 ms en Inicio y de 43 a 35 ms en Empresas (−42% y −19%). Formación pasó de 25 a 52 ms, con rangos solapados; tampoco se obtuvo una mejora general en ×6 + red. El menor trabajo acumulado no implica que los dos primeros frames se despachen antes.
- **Fluidez y tareas largas:** a ×4, la mediana de tareas largas tras el salto fue cero antes y después; la mediana de saltos rAF en Formación aumentó de 0 a 1. En ×6 se eliminó una tarea larga inicial por ruta en la mediana, y los saltos mejoraron en Empresas y Formación, no en Inicio. Se mantuvo el recorte elíptico aprobado: su raster puede seguir compitiendo aunque baje el paint principal.
- **LCP y CLS:** CLS inicial cero; el salto de Formación se reproduce también en las bases. LCP permanece cercano a la base, con medianas que suben hasta 16 ms sin red emulada; no se afirma una mejora uniforme. No se midieron INP, hardware móvil real, frame drops del compositor, lectores de pantalla de sistema ni una restauración real desde bfcache en este entorno. La prueba sí comprobó navegación atrás/adelante.

## Fidelidad visual y validación

Cada montaje alterna etapa 1 / versión optimizada en 0, 38, 67 y 100% (estado final). Se reprodujeron los nueve patrones directamente en sus componentes reales a 320, 390, 768, 1024 y 1440 px: los 45 pares conservaron la duración y la caja de escena. Active Trace se probó también como interacción automática en la prueba de navegador.

| Patrones | Móvil | Escritorio |
| --- | --- | --- |
| Kinetic Typography, Layered Assembly, Rolling Digits, Narrative Flow | [390 px](visual-review/motion-performance/typography-390.webp) | [1440 px](visual-review/motion-performance/typography-1440.webp) |
| Organic Reveal, Compositional Convergence, Landscape Expansion | [390 px](visual-review/motion-performance/landscapes-390.webp) | [1440 px](visual-review/motion-performance/landscapes-1440.webp) |
| Signal Build y Active Trace | [390 px](visual-review/motion-performance/svg-390.webp) | [1440 px](visual-review/motion-performance/svg-1440.webp) |

- **Playwright:** las nueve escenas y los controles del catálogo, 320/390/768/1024/1440 px, foco, tacto, scroll inverso, navegación, interrupción, reduced motion, carga tardía y pulsos en ambas visitas al nodo central. Los pulsos alcanzaron aproximadamente `0,70` de opacidad en los dos cruces de Active Trace.
- **SSR y accesibilidad:** 70 vistas sin JavaScript de las siete rutas públicas entre etapa 1 y optimizada; un H1 y sin desbordamiento horizontal en ambos builds. Los valores del odómetro mantienen la representación semántica única, y no se sustituye ningún control al interrumpir.
- **Formulario y gobernanza:** Playwright confirmó preselección, foco, validación, error, reintento y éxito de Empresas con servicios interceptados. `npm run ci:check` pasó con Node 24.22.2: 37 pruebas, validación del Design System, build del sitio, dry run del Worker y auditoría de artefactos. Las pruebas de propagación verificaron cero, unidades inválidas, overrides y reversión sin nodos ni efectos huérfanos.

## Reproducir y preparar la segunda etapa

Usa [las directrices de elección, carga y limpieza del Motion System](motion-system.md#añadir-o-actualizar-movimiento). Registra los consumidores, conserva el estado final en SSR y perfila la escena antes de precargar, forzar promoción o aumentar simultaneidad.

- `PLAYWRIGHT_MODULE=/ruta/a/playwright node scripts/profile-motion.mjs /tmp/rondas.json http://127.0.0.1:4351 http://127.0.0.1:4353 http://127.0.0.1:4356` ejecuta la comparación. Sirve copias inmutables de los tres builds. `MOTION_TRACE=1 MOTION_REPEATS=1` genera las trazas y ventanas por sección.
- `PLAYWRIGHT_MODULE=/ruta/a/playwright node scripts/capture-motion.mjs /tmp/capturas <dev-etapa-1> <dev-optimizado>` reproduce los fotogramas sobre los módulos reales de ambas revisiones.
- [Prueba de Motion System](../../scripts/review-motion-stage.js) y [propagación de tokens](../../scripts/review-design-tokens.js): scripts Playwright que reciben `page` y el origen del servidor de desarrollo. `npm run ci:check` audita también que el catálogo no se publique.
