# AI PlayGrounds · Exploración visual de Inicio

**Dirección elegida: Atlas de lo posible.** La elección fija el lenguaje visual para la siguiente etapa, no la composición final ni su implementación. Las maquetas son pruebas de dirección, no cambios al sitio ni propuestas de copy.

[Comparar en el tablero local de Impeccable](http://127.0.0.1:43341/) · Archivos de maqueta: [Mesa abierta](../../.impeccable/mocks/decision/mesa.png), [Atlas de lo posible](../../.impeccable/mocks/decision/atlas.png), [Trama colectiva](../../.impeccable/mocks/decision/trama.png). Las imágenes son bocetos de la apertura y el comienzo de Comunidad; las secciones inferiores y las animaciones se describen abajo y aún no están implementadas. Los logotipos y textos auxiliares generados en las imágenes no son propuestas de cambio.

La primera impresión es la misma en las tres: **AI PlayGrounds es una organización enfocada en inteligencia artificial, impulsada por su comunidad.** Las rutas a Comunidad y AI Labs mantienen su jerarquía y destino. Se conserva el orden de la página; las cuatro verticales ilustradas, el CTA de cierre y el footer se mantienen en su planteamiento actual. La exploración se concentra en cómo abrir la página, dar forma al bloque de comunidad, mostrar la trayectoria y diferenciar las rutas a las iniciativas.

| | Mesa abierta | Atlas de lo posible | Trama colectiva |
|---|---|---|---|
| **Lo que se recuerda** | Una mesa azul donde varias piezas forman un solo ensamblaje. | Un paisaje de campo que se lee como lámina anotada, no como fondo del título. | Una imagen serigráfica que solo existe cuando se superponen sus capas. |
| **Paleta y tipo** | Azul de taller, aluminio, lavanda y lima para la acción; grotesca ancha, etiquetas técnicas solo cuando orientan. | Verde tinta, salvia y papel mineral; serif compacta para titulares y sans de lectura. | Papel fibroso, cian profundo, escarlata y ámbar; una voz de imprenta para titulares y una sans neta para leer. |
| **Fortaleza** | Hace tangible la práctica técnica sin presentar un producto SaaS. | Es el puente más natural hacia las ilustraciones ya aprobadas. | Le da protagonismo a lo colectivo con una firma gráfica más singular. |
| **Riesgo** | Que demasiadas marcas vuelvan la portada un plano para especialistas. | Que la imagen vuelva a dominar y la evolución se sienta menor. | Que parezca la campaña de un solo evento si toda la página repite la intensidad del hero. |

## 1 · Mesa abierta

- **Apertura y comunidad.** Una retícula continua sostiene el titular y la pieza de montaje. Las acciones van en el borde de la mesa, siempre a la vista. El bloque de comunidad cambia a papel gris claro y a dos superficies montadas: explicación y enlaces, sin imitar ventanas de una app.
- **Trayectoria.** `+30` se lee como cifra principal en una placa de gran formato. Los tres hitos coorganizados ocupan fichas de distinta escala con nombre, rol y métricas visibles; no se presentan como clientes ni como éxitos comerciales.
- **Rutas.** AI Labs y AI Academy se distinguen mediante dos comportamientos de la misma pieza: una bandeja de prototipo y una ficha de aprendizaje. Organizaciones ocupa una pieza horizontal de menor intensidad. Cada enlace tiene un rótulo y un destino explícitos.
- **Movimiento.** Al entrar, tres piezas se alinean una sola vez sobre sus guías. El foco o el puntero sobre un enlace desplaza su marcador, no el bloque de texto. En móvil, las piezas se apilan; la acción principal precede al dibujo.

## 2 · Atlas de lo posible

- **Apertura y comunidad.** La entrada es un pliego editorial: titular en un margen despejado, lámina de paisaje a todo el ancho de la composición y acciones en una leyenda. El bloque de comunidad empieza como un nuevo capítulo, con el texto fuera del paisaje.
- **Trayectoria.** La cifra y los hitos se organizan como anotaciones de campo: el contexto queda en el margen; nombres, roles y resultados siguen en orden de lectura. La línea que los conecta no implica una cronología que los datos no respaldan.
- **Rutas.** Láminas encuadradas para AI Labs y AI Academy, con claves discretas y espacio generoso para los enlaces. Organizaciones cierra como referencia editorial, no como tercera oferta equivalente.
- **Movimiento.** El trazado ilustrativo se dibuja una sola vez, sin desplazar el paisaje ni ocultar el texto. Las llamadas de la leyenda responden al foco y al puntero con el mismo subrayado. En móvil, el mapa se recorta a su recorrido principal y la leyenda conserva íntegros sus enlaces.

## 3 · Trama colectiva

- **Apertura y comunidad.** Una serigrafía de manos y materiales compartidos concentra el color arriba; el título y las acciones ocupan el papel despejado. Luego baja la intensidad: la explicación de comunidad usa márgenes simples y una sola marca de registro.
- **Trayectoria.** Los eventos se presentan como fichas impresas, con un registro de color por ficha y cifras en tinta oscura. La pieza principal y los dos hitos de apoyo conservan toda su información sin depender del color.
- **Rutas.** AI Labs y AI Academy tienen siluetas gráficas distintas bajo un sistema común de márgenes y rótulos; Organizaciones usa una ficha a una tinta para separar el recorrido institucional del más expresivo.
- **Movimiento.** Las tintas se alinean una sola vez al entrar. La exploración opcional «Ver capas» tendría botones con nombres, no solo muestras de color, y la lectura del sitio nunca dependería de ella. En móvil se reduce el tamaño de la impresión, no el del título ni el de los controles.

## Criterio de implementación después de elegir

La imagen y todas las acciones se entienden sin movimiento. Las animaciones de entrada serían breves, sin bucles ni desplazamiento forzado; el foco de teclado mantendría una marca visible y `prefers-reduced-motion` mostraría directamente el estado final. La transición a las verticales y al cierre ya aprobados se resolvería desde los bloques adyacentes, sin retocar esos componentes.
