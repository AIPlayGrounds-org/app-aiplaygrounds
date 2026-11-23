# AI PlayGrounds · Inventario de secciones web

Mapa editorial y contraste con el código para revisión. Los patrones son hipótesis de exploración, no diseños ni cambios de contenido. Ver [resumen ejecutivo, familias, variantes y movimiento](catalogo-familias-secciones.md).

## Fuentes y criterio de conteo

1. **Arquitectura vigente:** [E2 v2.1, vista de conjunto y cierre editorial][e2], [cabecera de Estrategia][est] y [Content Handoff, §§2–4][handoff]. Son siete páginas principales y dos tipos de ficha. AI Labs integra el directorio de productos; no existe una página independiente «Productos» ni se recuperan `DP1`–`DP4`. [E1 v2.2, §4.3][e1] conserva el orden y la intención de base, pero su mapa histórico de ocho páginas ya fue sustituido.
2. **Contenido:** se usa el bloque con el mismo ID en [E2 del árbol actual][e2]. Hay **44 bloques explícitos** de **47 secciones de referencia** tras integrar EM5 en EM4. `B2`, `B4` y `E2` de Equipo permanecen como **tres filas en conciliación**; no se da por vigente su copy histórico.
3. **Implementación observada:** lectura del árbol local de `feat/website-design-system` en `b71590a`, incluidos cambios previos sin commit en directorios y fichas. El estado describe el código, no un despliegue, una aprobación editorial ni una prueba de accesibilidad u operación.
4. **Unidad de conteo:** un ID editorial por fila, en su orden documental. Los 13 bloques de ficha cuentan una vez por tipo, no por registro. Subsecciones, eventos, personas, métricas, opciones y campos no suman secciones. Cabecera y pie se registran aparte y no inflan el total editorial. Se usa el total recalculado de la tabla de E2, no los recuentos históricos de 52 dispersos en los documentos.

**Estado:** **Existente** = hay un bloque visual identificable que cumple la función principal, aunque no sea paridad con E2; **Pendiente** = la función no está resuelta, está parcial/desactivada o solo tiene representación local de prueba; **Información insuficiente** = falta conciliar la fuente o falta un dato/permiso esencial y el código no lo acredita. La columna «Observado» explicita la diferencia. Los nombres se toman de los rótulos editoriales, no se prescriben como encabezados públicos. Los códigos de patrón se desarrollan en el [catálogo](catalogo-familias-secciones.md#c-propuesta-de-variantes).

## A. Matriz editorial

### Inicio · `/` · 6 secciones

Fuente: [E2 — Inicio][e2]. Observado en [`src/pages/index.astro`](../../src/pages/index.astro).

| ID | Página | Nombre | Contenido | Función | Familia | Patrón sugerido | Reutilización | Estado | Observado |
|---|---|---|---|---|---|---|---|---|---|
| I1 | Inicio | Presentación institucional | Identidad impulsada por la comunidad; enlaces a Comunidad y AI Labs. | Reconocer la organización y elegir una primera ruta. | HERO | HERO-1 · apertura con protagonismo visual | F1 | Existente | Hero con paisaje y dos acciones; P05-R2 probaba otra composición. |
| I2 | Inicio | Propósito y comunidad | Compartir conocimiento; relación entre comunidad, equipo y verticales; dos enlaces contextuales. | Explicar quién impulsa el trabajo y cómo conocerlo. | EDIT | EDIT-1 · explicación abierta y enlaces | C4, B2 | Existente | Título y cuerpo en dos zonas, con enlaces. |
| I3 | Inicio | Cuatro verticales | AI Foundations, AI for Software, AI for Science y AI for Finance, con sus definiciones. | Distinguir cuatro campos institucionales, no ofertas. | ARE | ARE-1 · módulos de campos equivalentes | — | Existente | Cuatro tarjetas ilustradas. |
| I4 | Inicio | Actividad y trabajo | Más de 30 eventos desde 2025 y tres hitos de coorganización: hack@latam, IA Hackathon y The Real AI. | Acreditar trayectoria de un vistazo. | EVID | EVID-1 · cifra contextual y selección de hitos | EM3, C3 | Existente | Cifra principal y datos por evento. |
| I5 | Inicio | Iniciativas y oportunidades | AI Labs, AI Academy y ruta para organizaciones; tres destinos, tres funciones. | Elegir recorrido por interés. | RUTA | RUTA-1 · destinos diferenciados | P9, R7, B4 | Existente | Dos módulos y un tercero ancho para organizaciones. |
| I8 | Inicio | Acércate a AI PlayGrounds | Invitación a Comunidad; alternativa para organizaciones. | Cerrar con dos próximos pasos de distinta prioridad. | RUTA | RUTA-2 · cierre institucional | E4, F5 | Existente | `ClosingCTA` con paisaje y dos acciones. |

### Formación · `/formacion/` · 5 secciones

Fuente: [E2 — Formación][e2]. Observado en [`src/pages/formacion.astro`](../../src/pages/formacion.astro).

| ID | Página | Nombre | Contenido | Función | Familia | Patrón sugerido | Reutilización | Estado | Observado |
|---|---|---|---|---|---|---|---|---|---|
| F1 | Formación | AI Academy y punto de partida | Formación para quienes desarrollan software; práctica con revisión, pruebas y criterio técnico. | Situar la iniciativa y a quién le resulta pertinente. | HERO | HERO-1 · apertura con protagonismo visual | I1 | Existente | Hero de Academy más bloque de pilares; el código usa otro H1 y un salto a F3. |
| F3 | Formación | Líneas de aprendizaje | AI Engineering y Software with AI; ejemplos y contraste por tarea, papel de la IA y criterio humano. | Distinguir dos enfoques independientes, no niveles ni pasos. | COMP | COMP-1 · comparación por criterios comunes | ARE-1 comparte unidades descriptivas, no la comparación | Existente | Dos tarjetas resumidas; no incluyen los ejemplos ni toda la comparación de E2. |
| F4 | Formación | Oferta y condiciones actuales | Bootcamp 2025, cifras y condiciones históricas; sin convocatoria vigente; modelo para futuros programas. | Mostrar un antecedente y evitar confundirlo con una oferta abierta. | EVID | EVID-3 · antecedente individual y estado | C3 (mismo bootcamp) | Pendiente | «Formatos» informa que no hay convocatoria, pero no presenta el bootcamp ni equivale al bloque E2. |
| F6 | Formación | Formación para equipos | Posible propuesta personalizada, sujeta a evaluación; enlace a Empresas/EM5. | Derivar la necesidad de un equipo sin prometer una oferta cerrada. | RUTA | RUTA-3 · puente contextual | EM5, EM4 | Pendiente | Sin bloque equivalente en la ruta. |
| F5 | Formación | Estado y siguiente paso | Sin convocatoria abierta; alternativas Comunidad y Empresas/EM5. | Dar continuidad útil sin recurrir a inscripción. | RUTA | RUTA-2 · cierre institucional compacto | I8, E4 | Pendiente | «Lista de espera» deshabilitada en código; no sustituye las dos rutas de E2. |

### Empresas · `/empresas/` · 5 secciones

Fuente: [E2 — Empresas][e2]. Implementación: [`src/pages/empresas.astro`](../../src/pages/empresas.astro).

| ID | Página | Sección | Contenido | Resultado | Familia | Variante | Relación | Estado | Observación |
|---|---|---|---|---|---|---|---|---|---|
| EM1 | Empresas | Hero inmersivo | Propuesta, dos CTA y paisaje | Presentar la colaboración | HERO | HERO-1 | I1 | Existente | Variante alineada al inicio. |
| EM2 | Empresas | Oportunidades de colaboración | Dos composiciones ilustradas | Seleccionar una vía | RUTA | RUTA-1 | I8, EM6 | Existente | No duplica las verticales de I3. |
| EM3 | Empresas | Respaldo institucional | Descripción y enlace | Acreditar trayectoria | EVID | Respaldo editorial | I4 | Existente | No vuelve a listar hitos. |
| EM4 | Empresas | Iniciativas | Labs, Academy e Investigación | Explorar o consultar | RUTA | RUTA-1 | I5 | Existente | EM5 es un ancla de card, no una sección. |
| EM6 | Empresas | Contacto | Formulario de cinco campos | Abrir una conversación | FORM | FORM-1 | EM1, EM2, EM5 | Implementado | Envío bloqueado por privacidad y operación. |

### Comunidad · `/comunidad/` · 5 secciones

Fuente: [E2 — Comunidad][e2]. Observado en [`src/pages/comunidad.astro`](../../src/pages/comunidad.astro).

| ID | Página | Nombre | Contenido | Función | Familia | Patrón sugerido | Reutilización | Estado | Observado |
|---|---|---|---|---|---|---|---|---|---|
| C1 | Comunidad | Propósito y participación | Comunidad abierta, encuentros y cuatro verticales; posible acceso directo al mismo grupo de C6. | Explicar de qué trata la comunidad y orientar el ingreso. | HERO | HERO-2 · apertura editorial | E1; acción compartida con C6 | Existente | Hero editorial; no hay invitación a WhatsApp operativa. |
| C3 | Comunidad | Actividades y encuentros | Cuatro encuentros con originales en Luma, otros hitos y modelo futuro sin entradas confirmadas. | Recorrer experiencias pasadas con fecha, rol y fuente. | EVID | EVID-2 · relación de hitos atribuida | EM3, I4, F4 | Existente | Listado por encuentro y otros hitos; sin catálogo futuro. |
| C4 | Comunidad | Vías y condiciones de participación | Grupo general, condiciones de cada actividad y pertenencia al equipo son cosas distintas. | Aclarar qué significa participar. | EDIT | EDIT-1 · explicación abierta | I2, B2 | Existente | Explicación en dos zonas; incluye CTA de revisión deshabilitado. |
| C6 | Comunidad | Acceso a comunidad general | Una invitación a WhatsApp, con aviso de destino externo. | Facilitar acceso directo sin formulario ni admisión. | RUTA | RUTA-4 · acción externa condicionada | C1 comparte destino y condiciones | Pendiente | Sin bloque autónomo ni URL acreditada; control deshabilitado en C4 no completa C6. |
| C7 | Comunidad | Interés en colaborar | Continuidad informativa hacia AI Labs; captación interna cerrada. | Acercar al trabajo temprano sin anunciar reclutamiento. | RUTA | RUTA-3 · puente contextual | EM4, B5, DI4 | Existente | `ClosingCTA` de un destino; el acabado de cierre no es requisito editorial. |

### AI Labs · `/ai-labs/` · 5 secciones en el mapa, 3 explícitas en E2

Fuente: [E2 — AI Labs][e2]; `B2` y `B4` remiten a [E1 §4.3][e1] y [handoff §3][handoff]. Observado en [`src/pages/ai-labs.astro`](../../src/pages/ai-labs.astro).

| ID | Página | Nombre | Contenido | Función | Familia | Patrón sugerido | Reutilización | Estado | Observado |
|---|---|---|---|---|---|---|---|---|---|
| B1 | AI Labs | AI Labs | Contexto del directorio: productos e iniciativas, necesidad, responsables, procedencia y estado. | Explicar la colección aun sin registros. | HERO | HERO-2 · apertura editorial | DI1, E1 | Existente | Introducción abreviada, con H1 distinto de E2. |
| B2 | AI Labs | Qué se explora y cómo se relaciona | Según handoff: criterios de las iniciativas, verticales y relación con la organización. Sin bloque vigente en E2. | Delimitar el trabajo temprano y explicar sus vínculos. | EDIT | EDIT-1 · explicación abierta, si el bloque se confirma | I2, C4 | Información insuficiente | Sin bloque autónomo; parte de la función se aproxima en B1. |
| B3 | AI Labs | Iniciativas y productos tempranos | Modelos con utilidad/alcance, responsables o creador, procedencia, estado y acceso; sin inventario confirmado. | Permitir evaluar entradas reales y llegar al recurso o ficha acreditados. | CAT | CAT-1 · resumen por entidad con atributos | DI3 (primitivas), P1–P7 (mismos registros de producto) | Pendiente | Cuadrícula con datos demo solo en desarrollo; el código muestra encabezado y aviso sin registros también fuera de desarrollo. |
| B4 | AI Labs | Productos e Investigación | Según handoff: distinguir el directorio de productos dentro de Labs de la colección independiente de Investigación. Sin bloque vigente en E2. | Derivar al recurso adecuado sin atribuir propiedad por inclusión. | RUTA | RUTA-3 · puente contextual, si se confirma | EM4, DI4, I5 | Información insuficiente | Sin bloque autónomo ni enlace contextual equivalente; el enlace global no lo reemplaza. |
| B5 | AI Labs | Participación y continuidad | Enlace informativo a Comunidad y contexto de participación general. | Ofrecer continuidad sin prometer acceso a proyectos. | RUTA | RUTA-3 · puente contextual | C7, DI4 | Pendiente | Sin bloque en la página, aunque el destino está en navegación global. |

### Investigación · `/investigacion/` · 4 secciones

Fuente: [E2 — Investigación][e2]. Observado en [`src/pages/investigacion.astro`](../../src/pages/investigacion.astro).

| ID | Página | Nombre | Contenido | Función | Familia | Patrón sugerido | Reutilización | Estado | Observado |
|---|---|---|---|---|---|---|---|---|---|
| DI1 | Investigación | Universo y tipos | Trabajos originales, pregunta, autoría, método, límites y relación institucional acreditada. | Explicar qué califica como trabajo de la colección. | HERO | HERO-2 · apertura editorial | B1, E1 | Existente | Introducción abreviada, con H1 distinto de E2. |
| DI2 | Investigación | Exploración | Criterios de tema, tipo, fecha/estado y relación institucional, sujetos al corpus. | Acotar qué originales consultar si existen suficientes entradas. | EXPL | EXPL-1 · criterios y controles condicionados | DI3 como listado que responde a la exploración | Pendiente | El ID identifica el contenedor de lista, no filtros. El aviso de vacío también está previsto fuera de desarrollo. |
| DI3 | Investigación | Trabajos de la colección | Modelo con título/pregunta, autoría, tipo, fecha, estado, fuente y enlace a ficha. | Elegir un original con contexto suficiente. | CAT | CAT-2 · listado de lectura por pregunta y procedencia | B3 (primitivas), R1/R2 (mismo registro) | Pendiente | Filas demo bajo DI2; no hay entradas confirmadas ni bloque DI3 propio. |
| DI4 | Investigación | Conoce AI PlayGrounds y propone un trabajo | Continuidad hacia Inicio; propuesta de originales inactiva hasta definir proceso. | Situar la colección sin ofrecer postulación inexistente. | RUTA | RUTA-3 · puente contextual | B5, C7, EM4 | Pendiente | No hay bloque equivalente en la página. |

### Equipo · `/equipo/` · 4 secciones en el mapa, 3 explícitas en E2

Fuente: [E2 — Equipo][e2]; el ID `E2` remite a [E1 §4.3][e1] y [handoff §3][handoff]. Observado en [`src/pages/equipo.astro`](../../src/pages/equipo.astro).

| ID | Página | Nombre | Contenido | Función | Familia | Patrón sugerido | Reutilización | Estado | Observado |
|---|---|---|---|---|---|---|---|---|---|
| E1 | Equipo | Quiénes sostienen AI PlayGrounds | 15 personas y marco colectivo de liderazgo, verticales y funciones transversales. | Presentar al equipo antes de identificar a sus integrantes. | HERO | HERO-2 · apertura editorial | C1, DI1 | Existente | Apertura textual con cifra colectiva. |
| E2 | Equipo | Cómo nos organizamos para trabajar | Según handoff: Leadership Team, cuatro verticales y funciones transversales. Sin bloque vigente en E2. | Explicar relaciones de trabajo sin duplicar personas ni exponer gobierno interno. | ARE | ARE-2 · agrupación de responsabilidades, si el bloque se confirma | I3 para nombres de verticales; E3 para pertenencias | Información insuficiente | Parte de la estructura aparece en la apertura y el listado; sin bloque separado. |
| E3 | Equipo | Personas y aportes | 15 personas únicas y sus roles/grupos; fotos, bios y enlaces opcionales y autorizados. | Reconocer a las personas y su aportación acreditada. | PERF | PERF-1 · directorio agrupado tolerante a falta de foto | E2 como contexto, no como segundo roster | Información insuficiente | Código con nombres, tarjetas de dirección y listas por grupo. La presencia en código no acredita permisos. |
| E4 | Equipo | Participa y conoce nuestro trabajo | Acercamiento por Comunidad o AI Labs sin contacto personal ni captación. | Cerrar con dos formas de conocer el trabajo. | RUTA | RUTA-2 · cierre institucional | I8, F5 | Existente | `ClosingCTA` con dos destinos. |

### Ficha de producto · tipo repetible · 7 secciones

Fuente: [E2 — Ficha de producto][e2]. Ruta editorial pendiente; el árbol local ensaya [`/ai-labs/[slug]/`](../../src/pages/ai-labs/%5Bslug%5D.astro) con [`DirectoryDetail.astro`](../../src/layouts/DirectoryDetail.astro). **Cero registros reales en el árbol observado**: lo descrito en «Observado» es código de plantilla, no instancias publicables.

| ID | Página | Nombre | Contenido | Función | Familia | Patrón sugerido | Reutilización | Estado | Observado |
|---|---|---|---|---|---|---|---|---|---|
| P1 | Ficha de producto | Identificación | Nombre, descripción fiel, fuente de identidad y retorno a AI Labs. | Reconocer el objeto sin confundirlo con el directorio. | HERO | HERO-3 · cabecera de ficha con retorno | R1 | Pendiente | Título, utilidad y enlace de retorno en layout común. |
| P2 | Ficha de producto | Problema, público y límites | Necesidad, público, utilidad, precauciones y comprobaciones pertinentes. | Decidir si el recurso sirve para una necesidad concreta. | EDIT | EDIT-3 · utilidad y límites asociados | R5 | Pendiente | Problema en el cuerpo y público en metadatos; alcance editorial parcial. |
| P3 | Ficha de producto | Clasificación y relación con IA | Área, tipo y papel acreditado de la IA en el producto, en su construcción o en ambos. | Distinguir qué hace la IA y en qué contexto. | META | META-1 · atributos con explicación | P6, R2 | Pendiente | Sección «Cómo usa la IA», sin toda la clasificación de E2. |
| P5 | Ficha de producto | Creación y procedencia | Creador y original, relación institucional y vínculo con Labs solo si se acredita. | Atribuir sin inferir propiedad o aval. | META | META-2 · atribución y relación separadas | R2 | Pendiente | Creador y procedencia en panel común; no hay bloque equivalente completo. |
| P6 | Ficha de producto | Estado y uso | Madurez, significado y fecha de verificación; uso solo con evidencia contextual. | Distinguir madurez, disponibilidad y uso documentado. | META | META-1 · atributos con explicación | P3, R2 | Pendiente | Campo «Estado» y notas opcionales; no acreditan uso ni verificación. |
| P7 | Ficha de producto | Acceso, licencia y fuentes | Acceso, licencia, restricciones/precio material y original; destino de uso solo si existe. | Ir al destino correcto conociendo sus condiciones. | FUENTE | FUENTE-1 · condiciones junto al enlace verificado | R6 | Pendiente | «Acceso» y enlace genérico de fuente, sin patrón completo de condiciones/acción. |
| P9 | Ficha de producto | Relaciones y continuidad | Retornos a AI Labs e Inicio; relacionados solo con vínculo documentado. | Seguir explorando sin fabricar relaciones. | RUTA | RUTA-1 · destinos diferenciados en formato sobrio | R7, I5 | Pendiente | El retorno superior no cubre el bloque final ni los destinos previstos. |

### Ficha de investigación · tipo repetible · 6 secciones

Fuente: [E2 — Ficha de investigación][e2]. El árbol local ensaya [`/investigacion/[slug]/`](../../src/pages/investigacion/%5Bslug%5D.astro) con el mismo layout. **Cero originales reales en el árbol observado**.

| ID | Página | Nombre | Contenido | Función | Familia | Patrón sugerido | Reutilización | Estado | Observado |
|---|---|---|---|---|---|---|---|---|---|
| R1 | Ficha de investigación | Identificación y pregunta | Título fiel, pregunta del trabajo, fuente primaria y retorno a Investigación. | Reconocer qué examina el original. | HERO | HERO-3 · cabecera de ficha con retorno | P1 | Pendiente | Título, pregunta y retorno en layout común. |
| R2 | Ficha de investigación | Autoría, procedencia y estado | Autoría, afiliación acreditada, relación institucional, tipo, fecha y versión/estado. | Atribuir y situar la naturaleza del trabajo sin sugerir certificación. | META | META-2 · atribución y relación separadas | P5, P6 | Pendiente | Panel común con tipo, autoría y otros campos opcionales; no cubre todo el modelo. |
| R4 | Ficha de investigación | Enfoque | Contexto, materiales, método, validación y alcance según el original. | Explicar qué se hizo sin añadir un método no documentado. | EDIT | EDIT-2 · lectura de detalle con secciones internas | P2 (base de lectura), R5 | Pendiente | Bloque de enfoque alimentado por `method`. |
| R5 | Ficha de investigación | Resultados y límites | Hallazgos si existen, situación acreditada si no, y límites ligados a cada afirmación. | Facilitar una interpretación proporcionada de la evidencia. | EDIT | EDIT-3 · hallazgos y límites asociados | P2, R4 | Pendiente | Resultados opcionales y límites en secciones separadas; asociación por validar con datos reales. |
| R6 | Ficha de investigación | Recursos originales | Fuente primaria, tipo, situación de acceso y recursos complementarios verificados. | Facilitar consulta del original y sus materiales. | FUENTE | FUENTE-1 · condiciones junto al enlace verificado | P7 | Pendiente | Enlace genérico en metadatos; no bloque completo de recursos. |
| R7 | Ficha de investigación | Relaciones y continuidad | Retorno a Investigación e Inicio; otros trabajos, iniciativas o productos solo con vínculo documentado. | Dar contexto posterior sin desplazar el acceso al original. | RUTA | RUTA-1 · destinos diferenciados en formato sobrio | P9, I5 | Pendiente | Retorno superior, sin bloque equivalente al final. |

## Globales · 2 unidades fuera del conteo editorial

| ID | Página | Nombre | Contenido | Función | Familia | Patrón sugerido | Reutilización | Estado | Observado |
|---|---|---|---|---|---|---|---|---|---|
| G-HDR | Sitio | Cabecera y navegación principal | Marca a Inicio y accesos a las seis páginas restantes. E2 no fija orden visual. | Orientar y cambiar de página desde cualquier contexto. | GLOBAL | GLOBAL-1 · cabecera adaptable | Siete páginas y ambos tipos de ficha | Existente | [`SiteHeader.astro`](../../src/components/site/SiteHeader.astro) con menú móvil y grupo Personas/Empresas; este último contrasta con el handoff. |
| G-FTR | Sitio | Pie de página | Enlaces institucionales, identidad y agrupaciones observadas; no constituye un bloque E2. | Recuperar destinos y cerrar la página. | GLOBAL | GLOBAL-2 · pie de navegación agrupada | Siete páginas y ambos tipos de ficha | Existente | [`SiteFooter.astro`](../../src/components/site/SiteFooter.astro) con enlaces agrupados y un paisaje. |

## Control de cobertura

| Unidad | Filas | Bloques explícitos E2 | IDs en conciliación |
|---|---:|---:|---|
| Inicio | 6 | 6 | — |
| Formación | 5 | 5 | — |
| Empresas | 5 | 5 | — |
| Comunidad | 5 | 5 | — |
| AI Labs | 5 | 3 | B2, B4 |
| Investigación | 4 | 4 | — |
| Equipo | 4 | 3 | E2 |
| Ficha de producto | 7 | 7 | — |
| Ficha de investigación | 6 | 6 | — |
| **Total editorial** | **47** | **44** | **3** |
| Globales aparte | 2 | — | — |

[e1]: ../../content/entregables-cliente/01-direccion-contenido-estructura/direccion-contenido-estructura-web.md
[e2]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md
[est]: ../../content/internal/03-estrategia/estrategia-contenido.md
[tr]: ../../content/internal/04-feedback/trazabilidad-e2.csv
[handoff]: ../implementation/content-handoff.md
