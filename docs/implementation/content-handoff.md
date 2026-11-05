# Content Handoff — Especificación de contenido para desarrollo

**Proyecto:** AI PlayGrounds · website institucional · español latinoamericano.
**Corte de fuentes:** 05/11/2026 · E1 v2.2 y E2 v2.1 aprobado editorialmente mediante E221-C.
**Estado de este documento:** **APROBADO para traspaso a desarrollo**, tras aplicar las precisiones del encargo humano «AI PlayGrounds — Ajustes finales del Content Handoff». Autoriza utilizarlo como especificación de entrada para el siguiente proceso; no autoriza automáticamente despliegue ni publicación.
**Uso:** documentación auxiliar solicitada para el traspaso técnico, no un nuevo E1/E2, una nueva estrategia o una copia maestra del copy.

## 1. Propósito, alcance y fuentes

Este documento traduce el contenido aprobado a unidades de implementación: rutas, secciones, datos, relaciones, condiciones de visibilidad y pruebas. El agente de desarrollo debe leerlo junto a los originales de E1/E2. No necesita esta conversación, pero sí el paquete de fuentes identificado abajo: los textos completos permanecen en E2, no se reconstruyen desde resúmenes de este handoff.

### 1.1 Cómo usar el contrato

1. Verificar versiones y aprobaciones de las fuentes; usar el registro de precedencia de §1.3, no la fecha aislada de un archivo.
2. Preparar las ocho páginas y los dos tipos de ficha, conservando los IDs y orden de §3. Una sección condicional conserva su lugar en el modelo aunque no produzca HTML sin datos.
3. Extraer de E2 únicamente copy público, metadatos, etiquetas y mensajes aplicables. No importar automáticamente el Markdown completo: también contiene instrucciones, modelos, pendientes y tablas documentales que no son contenido público.
4. Trasladar datos repetibles a modelos validados. Preservar atribución, estado, fuentes y condiciones; comprobar visibilidad antes de generar listados, enlaces, rutas o datos estructurados.
5. Implementar y probar con el stack de §1.4 solo después de autorización separada. Los criterios de este documento no certifican que exista infraestructura o funcionalidad.

**Estados normativos:** **APROBADO** = decisión editorial/institucional/funcional confirmada; **PROPUESTO** = recomendación técnica evaluable, sin aprobación implícita; **PENDIENTE** = dato, permiso, ejecución o decisión no disponible. Cada tabla indica su fuente. Salvo indicación contraria, requisitos editoriales derivados de E2 son APROBADOS; presentación, nombres de campos técnicos y distribución de archivos son PROPUESTOS.

Las letras A–E de E2 describen naturaleza y dependencia, no aprobación: A institucional, B histórico, C modelo sin entradas, D acción definida pendiente de activación, E información/autorización esencial pendiente. Se conservan 26 A / 4 B / 18 C / 3 D / 1 E. Los modelos C no son entradas publicables; las acciones D no son sistemas funcionando.

### 1.2 Catálogo real de fuentes y traslado a otro repositorio

Los enlaces siguientes son relativos a este archivo; las rutas mostradas parten de la raíz del repositorio. Las referencias abreviadas E1/E2/EST/etc. en el resto del documento remiten a este catálogo.

| Clave | Archivo real y localizador | Qué determina |
|---|---|---|
| E1 | [content/entregables-cliente/01-direccion-contenido-estructura/direccion-contenido-estructura-web.md][e1] · §§4.1–4.3, 5 y 6 | Ocho páginas, dos tipos, 52 secciones, jerarquía, recorridos y voz; aprobado E122 |
| E2 | [content/entregables-cliente/02-contenido-web/contenido-web.md][e2] · página/ID enlazado en §3; cierre «Aprobación editorial del Entregable 2» | Copy, metadatos, CTA, datos, modelos y condiciones; v2.1 aprobado editorialmente |
| EST | [content/internal/03-estrategia/estrategia-contenido.md][est] · §§5–9, 14 y 15 | Modelos, relaciones, SEO/IA, permisos, precisiones E221 y cierre E221-C |
| DEC | [content/internal/04-feedback/feedback-e2.md][dec] · E221 y E221-C | Decisiones operativas y aprobación humana posterior a E2; dos H1 corregidos y colecciones sin entradas |
| DOS | [content/internal/03-estrategia/dossier-evidencia-estrategica.md][dos] · E221-C/E221, familias C01–C09 | Evidencia, atribución y alcance de aprobación; cortes históricos diferenciados |
| HIS | [content/internal/03-estrategia/evidencia-historica-e21.md][his] · H00–H04 y L00–L04 | Hechos confirmados del deck, eventos Luma, fechas y límites de interpretación |
| RES | [content/internal/02-research/research.md][res] · R11, R1–R6 | Investigación aceptada, intención y límites; no catálogo propio |
| KM | [content/internal/02-research/keyword-map.md][km] · N01–N13 | Responsabilidad temática; 69 expresiones candidatas, no 69 targets o páginas |
| Q | [content/internal/02-research/preguntas-2026-11-05/matriz.md][q] | 48 preguntas y origen mixto; no 48 PAA verificadas ni FAQs automáticas |
| TR | [content/internal/04-feedback/trazabilidad-e2.csv][tr] y [content/internal/04-feedback/preguntas-e2.csv][qp] | 52 filas por sección y aplicación de 48 preguntas; localizadores y fuentes |
| QA | [content/internal/04-feedback/validacion-e2.md][qa] | Controles editoriales previos y cierre E221-C; no pruebas del futuro frontend |
| HER | [content/internal/01-brief-diagnostico/decisiones-heredadas.md][her] | Antecedentes, solo en lo no sustituido por aprobaciones posteriores |
| T0 | Encargo humano «AI PlayGrounds — Content Handoff para desarrollo», §5, recibido para este documento | Stack aprobado, transcrito íntegramente en §1.4; no existe otro archivo técnico previo localizado que lo detalle |

**Portabilidad:** trasladar este archivo y las fuentes del catálogo conservando su jerarquía o actualizando explícitamente el mapa de rutas. E1 y E2 son imprescindibles para no reescribir copy; EST/DEC/DOS/HIS preservan condiciones; RES/KM/Q/TR preservan trazabilidad. No publicar estas fuentes internas como assets del sitio. No copiar todo `content/` a una colección pública ni importar `archive/`, `.opencode/`, logs, permisos o evidencia privada al bundle cliente. Un handoff aislado sin E2 no contiene todo el texto necesario y no autoriza completarlo por inferencia.

**Paquete de entrega obligatorio:** el Content Handoff no debe entregarse de manera aislada. El agente de desarrollo debe tener acceso, como mínimo, a E1 v2.2 aprobado, E2 v2.1 aprobado y `content-handoff.md`, además de las fuentes complementarias relevantes del catálogo, especialmente las que sustentan decisiones, evidencias y restricciones. Antes de comenzar la implementación deberá verificar que las referencias funcionen y que las versiones sean las aprobadas. Si las fuentes se trasladan a otro repositorio, actualizar las rutas de referencia sin modificar su contenido. Evitar duplicar innecesariamente la documentación: basta con garantizar acceso a las fuentes y mantener referencias válidas.

Huella del snapshot consultado (SHA-256; comprobar al recibirlo, no exige un commit inexistente):

- E1 v2.2: `2e5f0c800590a31e34392a263257b456b3aaa250bc8af4f9436cc84ff833ee3c`.
- E2 v2.1: `bd785bf6a27f09731833f6e7a65d7bfc0b04932c8f1302310b1a383c71e0d947`.

### 1.3 Precedencia y diferencias materiales ya resueltas

APROBADO: E1 conserva arquitectura; E2 + EST §§14–15 + DEC E221-C contienen los textos y precisiones operativas posteriores dentro de ella. T0 fija el stack. Un conflicto nuevo que cambie promesa, arquitectura, privacidad o contenido requiere decisión humana, no reescritura técnica silenciosa.

| Antecedente que puede inducir a error | Fuente vigente / instrucción |
|---|---|
| E1 deja canal general, colaboración y WhatsApp por confirmar | E2 C1/C4/C6/C7, EST §14: comunidad abierta por WhatsApp, URL exacta pendiente; equipo interno cerrado; C7 solo continuidad a Labs |
| E1 no decide un formulario; captura empresarial pendiente | E2 EM5/EM6 y DEC E221: uno solo, dos tipos, tres CTA. La recepción técnica y privacidad siguen pendientes |
| E1 no confirma personalización, estado de Academy o trayectoria | E2 F4/F6/EM3/EM5: bootcamp histórico, sin programas públicos actuales, formación personalizada potencial sujeta a evaluación |
| E1/EST anteriores dejan PR pendiente | E2 E3 y EST roster/§14: Public Relations (Relaciones Públicas), sin títulos adicionales |
| EST §14 y notas antiguas dejan vacío sin corpus pendiente | EST §15, DEC E221-C y apertura E2: conservar explicación/modelo sin listados vacíos, filtros sin opciones, fichas ficticias o placeholders |
| Cortes inferiores dicen E2 borrador/pendiente o Gate B pendiente | Cabeceras vigentes, RES R11 y DEC E221-C prevalecen; no reabrir esas etapas |
| H1 anteriores de Productos/Investigación | E2 vigente: «Explora productos y herramientas de IA» / «Investigaciones y trabajos relacionados con IA». Mantener SEO title y meta description originales |
| Stack detallado no presente en documentos anteriores | T0 es aprobación de selección tecnológica, no prueba de instalación, despliegue o configuración |

No se detectó una contradicción material sin resolución que obligue a cambiar E1/E2. Permanecen incertidumbres deliberadas, enumeradas en §12.

### 1.4 Stack objetivo y límites técnicos

**APROBADO · T0:** Astro; TypeScript en modo strict; Tailwind CSS 4; Starwind UI como base; Lucide para iconos; React Islands solo por necesidad real de interactividad. Astro Content Collections; Markdown/JSON según naturaleza; contenido versionado en Git; sin CMS ni base de datos como requisito del website. GitHub y GitHub Actions; Cloudflare Workers con Static Assets y Wrangler; Cloudflare CDN, DNS, SSL y WAF según configuración aprobada. Imágenes en repositorio, optimizadas con Astro cuando corresponda.

**Inspección observada:** el repositorio actual contiene documentación editorial y entornos de herramientas; `README.md` solo identifica el proyecto. No hay aplicación Astro, `src/`, manifiesto de aplicación, workflows o configuración Wrangler observados fuera de las dependencias de herramientas. No hay `docs/` previa ni convención técnica que contradiga `docs/implementation/content-handoff.md`; esta ubicación separa contrato de desarrollo de entregables cliente. Ninguna dependencia de `.opencode/` acredita stack instalado.

**PENDIENTE técnico:** versiones compatibles concretas, adaptador/modo de salida Astro, configuración de assets/Worker, dominio/origen canónico, credenciales y permisos CI, entornos, políticas DNS/SSL/WAF/CDN y canal de formulario. El stack no confirma esos valores. No introducir servicios, bases de datos, dependencias, proveedores de email, CMS o widgets por iniciativa propia. Elegir compatibilidad en desarrollo sin cambiar tecnologías aprobadas. No configurar nada durante esta tarea.

## 2. Mapa de navegación y rutas

**APROBADO:** ocho páginas, marca → Inicio y accesos Formación · Empresas · Comunidad · AI Labs · Productos · Investigación · Equipo; ambas colecciones y Equipo accesibles directamente, sin pasar por Labs. Orden visual, agrupación y menú responsive: PROPUESTO por diseño/desarrollo. Sin selector Personas/Empresas ni páginas nuevas de verticales, Academy, eventos, programas, integrantes, iniciativas, países o filtros. Fuente: E1 §4.1/§5 y E2 «Navegación y destinos».

Las siguientes son **rutas propuestas editorialmente en E2**, no URLs publicadas ni slugs técnicos definitivamente aprobados. Validar convención de barras finales, resolución y canonical conjuntamente; no cambiar nombres públicos o destinos funcionales al ajustarlas. Todas las páginas están **sin implementar** al corte.

| Página/tipo | Ruta de E2 | Propósito / audiencia | Relaciones y CTA principal | Destino / condición |
|---|---|---|---|---|
| Inicio | `/` | Identidad/orientación; personas y organizaciones nuevas | Ir a la comunidad; acceso contextual Labs, Equipo, Formación, Empresas | Comunidad; secundaria Empresas, sin formulario propio |
| Formación | `/formacion/` | Comparar líneas/estado; personas interesadas en aprendizaje | Ir a la comunidad; Formación para mi equipo | Comunidad; Empresas EM5, no enlace circular a su propia raíz |
| Empresas | `/empresas/` | Examinar campos/evidencia; instituciones y empresas | Proponer una alianza / Cuéntanos tu necesidad; formación EM5 | Mismo formulario EM6, condicionado a §9; Labs/Equipo/Formación como navegación informativa |
| Comunidad | `/comunidad/` | Historia y participación general; personas interesadas en IA | Unirme a la comunidad; contexto Inicio y Labs | Grupo WhatsApp, URL PENDIENTE; no formulario de ingreso |
| AI Labs | `/ai-labs/` | Visibilidad de trabajo temprano; visitantes de iniciativas | Ir a la comunidad; criterios de Productos/Investigación | Comunidad y colecciones; B3 solo con entradas reales |
| Productos | `/productos/` | Evaluar recursos; visitantes y creadores | Abrir producto real si existe; Conocer AI PlayGrounds | Ficha existente; Inicio. Postulación inactiva sin proceso |
| Investigación | `/investigacion/` | Descubrir originales; lectores y autores | Abrir trabajo real si existe; Conocer AI PlayGrounds | Ficha existente; Inicio. Postulación inactiva sin proceso |
| Equipo | `/equipo/` | Personas/relaciones; visitantes y organizaciones | Ir a la comunidad; Explorar AI Labs | Comunidad y Labs; datos personales solo autorizados |
| Ficha de producto | `/productos/{identificador-confirmado}/` | Evaluar un recurso concreto | Acceder al producto o Consultar la fuente original | URL verificada según acceso; volver a Productos e Inicio. Sin instancia hasta completar registro |
| Ficha de investigación | `/investigacion/{identificador-confirmado}/` | Pregunta/método/alcance del trabajo | Consultar el original | Fuente primaria verificada; volver a Investigación e Inicio. Sin instancia ficticia |

**Anclas locales PROPUESTAS:** usar identificadores estables derivados de IDs editoriales (por ejemplo, el ID de EM6 como ancla del formulario). No son rutas nuevas ni copy público. Resolver enlaces semánticos de E2 a Inicio/I3, Comunidad/C3, Formación/F4 y Empresas/EM5/EM6; aplicar la misma convención a enlaces desde otra página. No convertir las anclas documentales de E2 en slugs públicos automáticamente.

**Enlaces externos:** conservar los cuatro Luma canónicos de §7; fuentes/accesos de futuros registros requieren verificación. No importar parámetros de invitación/seguimiento, reuniones privadas o tokens editoriales como URL. WhatsApp usará solo la invitación real que aporte el responsable. Abrir en misma pestaña es una recomendación sencilla; si desarrollo elige otra pestaña, comunicarlo accesiblemente y proteger la navegación externa. No es requisito abrir todo externo en pestaña nueva. Usar `<a>` para navegación y botones para acciones; no `href="#"`, URLs de ejemplo o manejadores vacíos para aparentar disponibilidad.

## 3. Matriz de implementación de las 52 secciones

**Regla de lectura:** el encabezado de cada tabla fija la página/tipo para todas sus filas. La columna «Fuente» lleva exactamente al bloque E2 que aporta copy, datos y notas; E1 §4.3 es la base de orden. Títulos H2/H1 presentes se conservan literalmente; los títulos de modelos C se preparan, pero no aparecen solos sin registros. «H1 página» remite al H1 de §4, no añade otro. Todos los patrones de presentación son **PROPUESTOS**, no wireframes ni una biblioteca nueva. Priorizar composición HTML/Astro y primitives de Starwind UI; no un componente por ID ni un motor universal de secciones.

Naturaleza: estático = copy; estructurado = atributos comparables; repetible = colección; entidad = detalle por registro; condicional = depende de datos/operación; formulario = EM6. En «Estado» se informa la letra E2 y dependencia `DEP-*` de §12. Todo contenido está aprobado editorialmente; visibilidad se evalúa aparte. Ninguna fila implica implementación existente.

### Inicio · 6 secciones

| ID | Propósito | Título público / nivel | Fuente E2 | Naturaleza | Datos necesarios | Presentación sugerida | Interacción | Destinos | Visibilidad | Estado / dependencia |
|---|---|---|---|---|---|---|---|---|---|---|
| I1 | Identificar/orientar | H1 página | [I1][e2-i1] | Estático | Definición/origen; dos enlaces | Apertura editorial | Navegar | Comunidad; Labs | Copy institucional | A; DEP-10 rutas |
| I2 | Relacionar propósito/comunidad | H2 Aprender también es encontrarnos | [I2][e2-i2] | Estático | Párrafos y enlaces | Bloque con contexto | Navegar a sección | Comunidad C3; Equipo | Copy institucional | A; DEP-10 |
| I3 | Distinguir campos | H2 Cuatro campos, preguntas diferentes | [I3][e2-i3] | Estructurado | Cuatro nombres/definiciones en orden | Cuatro unidades semánticas | Solo vínculos acreditados | Sin páginas de vertical | Siempre cuatro campos; vínculos solo reales | A; DEP-05 si objetos |
| I4 | Mostrar evidencia | H2 De los encuentros a la práctica | [I4][e2-i4] | Estructurado/repetible histórico | Tres selecciones y roles/cifras/contexto | Resúmenes de actividad | Navegar | Luma Claude; Comunidad C3; Formación F4 | Registros históricos ya descritos, sin productos ficticios | B; DEP-09 materiales opcionales |
| I5 | Orientar iniciativas/organizaciones | H2 Ideas, aprendizaje y nuevas conversaciones | [I5][e2-i5] | Estático/estructurado | Labs, Academy, ruta Empresas | Tres funciones diferenciadas | Navegar | Labs; Formación; Empresas | Explicación sin oferta abierta implícita | A; DEP-10 |
| I8 | Cerrar invitación institucional | H2 La próxima conversación puede empezar contigo | [I8][e2-i8] | Estático | Copy y dos CTA | Cierre propio de Inicio | Navegar | Comunidad principal; Empresas secundaria | Sin captación adicional | A; DEP-10 |

### Formación · 5 secciones

| ID | Propósito | Título público / nivel | Fuente E2 | Naturaleza | Datos necesarios | Presentación sugerida | Interacción | Destinos | Visibilidad | Estado / dependencia |
|---|---|---|---|---|---|---|---|---|---|---|
| F1 | Situar Academy | H1 página | [F1][e2-f1] | Estático | Función y diferencia de tareas | Apertura | Ninguna | Líneas siguientes | Copy institucional | A |
| F3 | Comparar líneas | H2 ¿Integrar IA o desarrollar con su apoyo? | [F3][e2-f3] | Estructurado/comparación | Dos líneas, tarea/papel IA/criterio humano | Descriptores y comparación accesible | Lectura | Sin itinerario obligatorio | Ambas líneas, sin cursos inferidos | A |
| F4 | Mostrar antecedente/estado y preparar oferta | H2 Una experiencia formativa que empezó en 2025 | [F4][e2-f4] | Histórico + repetible condicional | Bootcamp y estado actual; futuros campos de programa | Antecedente y futuro detalle dentro de sección | Inscripción solo con programa real | Sin destino actual de inscripción | Bootcamp/estado visibles; cero catálogo público futuro | B; submodelo C, DEP-08 |
| F6 | Orientar necesidad de equipo | H2 Formación a partir de lo que necesita tu equipo | [F6][e2-f6] | Estático | Posibilidad personalizada evaluable | Texto/enlace | Navegar | Empresas EM5 | No promete condiciones de programa | A; DEP-10 |
| F5 | Siguiente paso fiel al estado | H2 Sigue aprendiendo en comunidad | [F5][e2-f5] | Estático | Estado sin convocatorias y CTA | Continuidad integrada | Navegar | Comunidad; Empresas EM5 | Sin espera/avisos o CTA a raíz Formación | A; DEP-08 si cambia oferta |

### Empresas · 6 secciones

| ID | Propósito | Título público / nivel | Fuente E2 | Naturaleza | Datos necesarios | Presentación sugerida | Interacción | Destinos | Visibilidad | Estado / dependencia |
|---|---|---|---|---|---|---|---|---|---|---|
| EM1 | Relevancia institucional | H1 página | [EM1][e2-em1] | Estático | Identidad/campos/trayectoria | Apertura | Navegar | Equipo | No proveedor exclusivo de capacitación | A; DEP-10 |
| EM2 | Situar necesidad en cuatro campos | H2 Cuatro campos para situar las necesidades de tu organización | [EM2][e2-em2] | Estructurado | Cuatro ámbitos/límites | Cuatro descriptores | Lectura | No servicios o páginas nuevas | Cuatro campos en orden aprobado | A |
| EM3 | Acreditar trayectoria | H2 Trayectoria que se construye reuniendo a las personas | [EM3][e2-em3] | Histórico/estructurado | Hitos H00–H04, papeles y cifras colectivas | Evidencia con atribución junto a cada dato | Navegar | Comunidad C3 | Sin claims de implementación empresarial | B; DEP-09 logos/materiales |
| EM4 | Orientar a Labs | H2 AI Labs: una mirada al trabajo temprano | [EM4][e2-em4] | Estático | Explicación Labs | Texto/acción | Explorar AI Labs | AI Labs | Sin inventario duplicado | A; DEP-10 |
| EM5 | Recibir interés en formación potencial | H2 Formación en IA para las necesidades de tu equipo | [EM5][e2-em5] | Estático + interacción condicional | Copy, líneas, selección comercial | Texto/CTA hacia EM6 | Preseleccionar comercial, editable | EM6; Formación contextual | Copy sí; CTA operativo solo con formulario habilitado | D; DEP-02/03 |
| EM6 | Diferenciar relaciones y consultar | H2 Conversemos sobre lo que tienes en mente | [EM6][e2-em6] | Formulario/estructurado/condicional | Dos caminos; ocho campos y mensajes §9 | Dos opciones y un formulario | Preselección/manual, validación, envío/estados | Mismo formulario, canal aún pendiente | Caminos informativos; captación solo tras privacidad/recepción reales | D; DEP-02/03 |

### Comunidad · 5 secciones

| ID | Propósito | Título público / nivel | Fuente E2 | Naturaleza | Datos necesarios | Presentación sugerida | Interacción | Destinos | Visibilidad | Estado / dependencia |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 | Invitar a comunidad general | H1 página | [C1][e2-c1] | Estático/acción condicional | Copy abierto; acción C6 reutilizada | Apertura/enlace | WhatsApp solo con URL | Grupo; Inicio I3 | Copy sí; acción condicionada como C6 | A; DEP-01 |
| C3 | Mostrar historia y preparar actividad futura | H2 Encuentros que forman parte de nuestra historia | [C3][e2-c3] | Histórico/repetible/condicional | Cuatro Luma, hitos, fechas/hosts/roles | Registros con atributos y originales | Abrir original, no registro pasado | Cuatro Luma; Formación F4 | Historia sí; futuro separado solo con entradas confirmadas | B; submodelo C, DEP-08/09 |
| C4 | Aclarar participación | H2 Un espacio abierto para conectar alrededor de la IA | [C4][e2-c4] | Estático | Diferencia grupo/actividad/equipo | Texto breve | Ninguna admisión | Condiciones junto a convocatoria real | Sin reglas o requisitos universales inventados | A |
| C6 | Acceso directo al grupo | H2 Súmate al grupo de WhatsApp | [C6][e2-c6] | Interacción condicional | URL exacta, CTA y microcopy | Enlace directo, sin formulario | Unirme a la comunidad | Invitación WhatsApp PENDIENTE | No activar CTA ni instrucción que afirme enlace operativo sin URL | D; DEP-01 |
| C7 | Continuidad al trabajo temprano | H2 Acércate también al trabajo de AI Labs | [C7][e2-c7] | Estático; slot interno inactivo | Copy informativo/enlace Labs | Continuidad simple | Navegar, no solicitar incorporación | AI Labs | Solo variante pública informativa; cero reclutamiento | A; decisión cerrada |

### AI Labs · 5 secciones

| ID | Propósito | Título público / nivel | Fuente E2 | Naturaleza | Datos necesarios | Presentación sugerida | Interacción | Destinos | Visibilidad | Estado / dependencia |
|---|---|---|---|---|---|---|---|---|---|---|
| B1 | Explicar Labs | H1 página | [B1][e2-b1] | Estático | Función/experimentación | Apertura | Sin salto a lista vacía | B3 solo si hay registros | Institucional aun sin iniciativas | A |
| B2 | Relacionar campos e iniciativas | H2 La pregunta detrás de cada iniciativa | [B2][e2-b2] | Estático | Funciones y vínculos conceptuales | Contexto/enlace | Navegar | Inicio I3 | Sin objetos o relaciones inventadas | A |
| B3 | Presentar iniciativas reales | H2 condicional Qué se está explorando y en qué estado | [B3][e2-b3] | Listado repetible | Modelo iniciativa §5 | Resumen con atributos/recurso | Abrir solo destino confirmado | Recurso/ficha existente; sin ficha Labs nueva | Cero HTML de listado/heading vacío sin registros publicables | C; DEP-05 |
| B4 | Diferenciar colecciones | H2 Del recurso a su fuente | [B4][e2-b4] | Estático/estructurado | Dos descriptores/enlaces | Dos rutas informativas | Navegar | Productos; Investigación | Páginas institucionales aun sin corpus | A |
| B5 | Conectar comunidad | H2 Conecta con la comunidad | [B5][e2-b5] | Estático | Copy/enlace | Continuidad | Navegar | Comunidad | No acceso a proyectos/vacantes | A |

### Productos · 4 secciones

| ID | Propósito | Título público / nivel | Fuente E2 | Naturaleza | Datos necesarios | Presentación sugerida | Interacción | Destinos | Visibilidad | Estado / dependencia |
|---|---|---|---|---|---|---|---|---|---|---|
| DP1 | Definir cobertura/criterios | H1 página corregido | [DP1][e2-dp1] | Estático | IA integrada/construcción y procedencias | Apertura con criterios | Lectura | Contexto de colección | Visible sin entradas; no catálogo lleno implícito | A |
| DP2 | Encontrar por criterios | H2 condicional Encuentra recursos según lo que necesitas | [DP2][e2-dp2] | Estructurado/interacción condicional | Corpus, atributos y soporte | Criterios; controles solo útiles y soportados | Filtrar solo tras decisión técnica | DP3, sin páginas por faceta | Sin filtros u opciones vacías; no instrucciones ficticias | C; DEP-06/11 |
| DP3 | Elegir producto | H2 condicional Conoce cada producto antes de elegir | [DP3][e2-dp3] | Listado repetible | Resumen derivado de producto completo | Entradas comparables | Abrir ficha por nombre | Ficha de producto real | Solo registros publicables; ningún listado vacío | C; DEP-06 |
| DP4 | Continuidad institucional | H2 La organización detrás de la colección | [DP4][e2-dp4] | Estático/condicional | Copy Inicio; postulación interna no activa | Enlace integrado | Navegar; no captación hoy | Inicio; postulación sin destino, no mostrar | Institucional sí; propuesta de producto oculta sin proceso | A; DEP-12 si se habilita |

### Investigación · 4 secciones

| ID | Propósito | Título público / nivel | Fuente E2 | Naturaleza | Datos necesarios | Presentación sugerida | Interacción | Destinos | Visibilidad | Estado / dependencia |
|---|---|---|---|---|---|---|---|---|---|---|
| DI1 | Delimitar trabajos originales | H1 página corregido | [DI1][e2-di1] | Estático | Pregunta/autoría/método/límites | Apertura con criterios | Lectura | Contexto de colección | Visible sin entradas, no directorio de herramientas | A |
| DI2 | Encontrar por tema/tipo/estado | H2 condicional Busca una pregunta que quieras comprender | [DI2][e2-di2] | Estructurado/interacción condicional | Corpus/valores/soporte | Criterios según originales | Filtrar solo si soportado | DI3, sin páginas por filtro | Sin controles/opciones vacíos | C; DEP-07/11 |
| DI3 | Elegir un trabajo | H2 condicional La pregunta y el contexto antes del original | [DI3][e2-di3] | Listado repetible | Resumen fiel/autor/tipo/fecha/estado | Entradas con contexto | Abrir ficha por título | Ficha de investigación real | Solo originales publicables, sin listado vacío | C; DEP-07 |
| DI4 | Continuidad institucional | H2 La investigación dentro de AI PlayGrounds | [DI4][e2-di4] | Estático/condicional | Copy Inicio; proceso de propuestas pendiente | Enlace integrado | Navegar; no envío de trabajo hoy | Inicio | Propuesta/CTA condicionado no público sin proceso | A; DEP-12 |

### Equipo · 4 secciones

| ID | Propósito | Título público / nivel | Fuente E2 | Naturaleza | Datos necesarios | Presentación sugerida | Interacción | Destinos | Visibilidad | Estado / dependencia |
|---|---|---|---|---|---|---|---|---|---|---|
| E1 | Presentar equipo colectivo | H1 página | [E1][e2-e1] | Estático | Equipo de 15, estructura | Apertura | Lectura | Organización siguiente | Dato colectivo aprobado, no permiso individual | A |
| E2 | Explicar responsabilidades | H2 Campos de trabajo y responsabilidades | [E2][e2-e2] | Estructurado | Leadership/cuatro verticales/transversales | Agrupación semántica | Lectura | Datos E3 | Sin gobierno confidencial | A |
| E3 | Mostrar personas autorizadas | H2 Quiénes forman parte del equipo | [E3][e2-e3] | Listado de personas | 15 IDs/funciones/grupos; permisos | Un registro por persona, roles múltiples | Enlaces profesionales solo confirmados | Sin perfiles nuevos | Solo datos/materiales autorizados; no tarjetas de personas ficticias | E; DEP-04/09 |
| E4 | Acercamiento institucional | H2 Acércate desde la comunidad | [E4][e2-e4] | Estático | Copy y dos rutas | Continuidad integrada | Navegar | Comunidad; Labs | Sin contacto personal o reclutamiento | A |

### Ficha de producto · 7 secciones por instancia

| ID | Propósito | Título público / nivel | Fuente E2 | Naturaleza | Datos necesarios | Presentación sugerida | Interacción | Destinos | Visibilidad | Estado / dependencia |
|---|---|---|---|---|---|---|---|---|---|---|
| P1 | Identificar recurso | H1 nombre real | [P1][e2-p1] | Detalle de entidad | Nombre/resumen/fuente | Identificación/retorno | Volver | Productos | Ficha completa real, sin instancia hoy | C; DEP-06 |
| P2 | Evaluar utilidad/límites | H2 modelo Para qué sirve y qué conviene tener en cuenta | [P2][e2-p2] | Detalle narrativo | Necesidad/público/contexto/límites | Explicación proporcional | Lectura | Fuentes pertinentes | Datos requeridos según recurso | C; DEP-06 |
| P3 | Explicar papel IA | H2 modelo Qué papel tiene la inteligencia artificial | [P3][e2-p3] | Atributos de entidad | Área/tipo/IA con fuente | Atributos y explicación | Lectura | Sin páginas de categoría | IA integrada/construcción diferenciadas | C; DEP-06 |
| P5 | Atribuir creación/procedencia | H2 modelo Quién lo creó y cómo se relaciona con AI PlayGrounds | [P5][e2-p5] | Atributos/relaciones | Creador/original/relación; Labs separado | Atribución junto al objeto | Abrir referencia si existe | Fuente; vínculo acreditado | Nunca asumir propiedad o aval | C; DEP-06/04 |
| P6 | Situar madurez/uso | H2 modelo Estado del producto y evidencia de uso | [P6][e2-p6] | Atributos de entidad | Estado/significado/fecha; uso condicional | Estado contextualizado | Lectura | Fuente de métrica si existe | No cero usuarios por ausencia | C; DEP-06 |
| P7 | Acceder/comprobar condiciones | H2 modelo Cómo acceder y consultar sus condiciones | [P7][e2-p7] | Detalle/acción | Situación acceso/licencia/original; precio si material | Condiciones junto a acción | Acceder o consultar original según caso | URL externa verificada | No acceso de uso si solo existe fuente informativa | C; DEP-06 |
| P9 | Continuidad y relaciones | H2 modelo Contexto para seguir explorando | [P9][e2-p9] | Relaciones/estático común | Vínculos probados + retornos | Navegación contextual | Navegar | Productos; Inicio; relacionados reales | Continuidad siempre en ficha real; omitir relaciones ausentes | C; DEP-06 |

### Ficha de investigación · 6 secciones por instancia

| ID | Propósito | Título público / nivel | Fuente E2 | Naturaleza | Datos necesarios | Presentación sugerida | Interacción | Destinos | Visibilidad | Estado / dependencia |
|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Identificar trabajo/pregunta | H1 título real | [R1][e2-r1] | Detalle de entidad | Título/pregunta/original | Identificación/retorno | Volver | Investigación | Sin instancia hasta original verificable | C; DEP-07 |
| R2 | Atribuir y situar versión | H2 modelo Quién realizó el trabajo y en qué estado está | [R2][e2-r2] | Atributos/relaciones | Autores/procedencia/tipo/fecha/estado | Metadatos del trabajo | Referencias si existen | Original/autor autorizado | Afiliación y peer review solo documentadas | C; DEP-07/04 |
| R4 | Comprender enfoque | H2 modelo Cómo aborda su pregunta | [R4][e2-r4] | Detalle narrativo | Contexto/materiales/método/validación/alcance | Texto fiel al original | Lectura | Fuente pertinente | No método inventado por campo ausente | C; DEP-07 |
| R5 | Interpretar hallazgos/límites | H2 modelo Qué sostiene el trabajo y hasta dónde | [R5][e2-r5] | Detalle narrativo | Resultados existentes o situación acreditada; límites | Resultado con su alcance | Lectura | Fuente primaria | No convertir propuesta en hallazgo | C; DEP-07 |
| R6 | Consultar evidencia | H2 modelo Consulta el original y sus recursos | [R6][e2-r6] | Acción/recursos | Original/acceso; código/datos si existen | Enlaces descriptivos | Consultar el original | Fuente primaria comprobada | Recursos adicionales solo reales | C; DEP-07 |
| R7 | Contexto y continuidad | H2 modelo Conecta el trabajo con su contexto | [R7][e2-r7] | Relaciones/estático común | Vínculos probados + retornos | Navegación integrada | Navegar | Investigación; Inicio; relacionados reales | Continuidad en ficha real; sin nodos ficticios | C; DEP-07 |

**Cobertura:** 6 + 5 + 6 + 5 + 5 + 4 + 4 + 4 + 7 + 6 = **52**. Los 13 bloques de fichas son plantillas de contenido, no trece páginas nuevas ni contenido público completo hoy.

## 4. Especificación página por página

### 4.1 Reglas comunes y asociación de copy

APROBADO · E2: cada cabecera `Página:` contiene objetivo, audiencia, URL propuesta, SEO title, meta description y H1; cada bloque `### ID · nombre` contiene su copy/atributos/CTA. Importar texto literal desde esos localizadores, no desde el título de trabajo de E1. Un solo H1 por página; H2/H3 según función, sin convertir todas las etiquetas documentales en headings visibles. En aperturas sin H2, usar el H1 de página sin duplicarlo en el primer bloque. Subsecciones de cuatro verticales, dos líneas, opciones de consulta y eventos conservan su relación; pueden ajustar nivel HTML sin cambiar sus títulos o significado.

La tabla siguiente especifica la primera versión implementable en entorno de desarrollo; no autoriza publicar. Los contenidos de entidad permanecen en E2. La cobertura de §3 es el contrato incluso donde hoy no se renderiza un listado.

| Página | Objetivo / audiencia y URL | Jerarquía y contenido inicial | Datos repetibles / interacción | Dependencias y aceptación específica |
|---|---|---|---|---|
| Inicio | Presentar/orientar a nuevos visitantes; `/` | H1 «Aprendemos, investigamos y construimos con IA. En comunidad.»; I1 → I2 → I3 → I4 → I5 → I8 | Cuatro verticales en orden; tres selecciones I4 ya redactadas; rutas de §2 | No duplicar roster ni inventario Labs; I4 preserva cifras/roles y original Claude; el cierre dirige a Comunidad y Empresas, no exclusivamente Academy |
| Formación | Evaluar dos enfoques de aprendizaje; `/formacion/` | H1 «AI Academy: aprender a integrar IA y a desarrollar con ella»; F1 → F3 → F4 → F6 → F5 | Comparación por tarea; bootcamp 2025 y estado sin programas públicos vigentes; futuros registros en F4, cero actuales | No enlaces de matrícula/espera/aviso, no CTA a su propia raíz; F6/F5 llegan a Empresas EM5; requisitos/condiciones futuros no heredados del bootcamp |
| Empresas | Contexto institucional/comercial para organizaciones; `/empresas/` | H1 «Conectemos tu organización con el trabajo en IA»; EM1 → EM2 → EM3 → EM4 → EM5 → EM6 | Cuatro campos; cuatro hitos; dos caminos y un formulario (§9) | Construir texto y contrato del formulario, no activar sin DEP-02/03; EM4 solo explicación + Labs; no servicios técnicos inferidos de eventos |
| Comunidad | Participación general e historia; `/comunidad/` | H1 «La IA nos reúne. La comunidad está abierta.»; C1 → C3 → C4 → C6 → C7 | Cuatro Luma y otros hitos C3; WhatsApp reutilizado desde C1/C6; ningún futuro actual | Separar pasado/futuro sin encabezado futuro vacío; sin admisión general o reclutamiento; microcopy que presupone enlace activo solo cuando DEP-01 se resuelva |
| AI Labs | Contextualizar iniciativas tempranas; `/ai-labs/` | H1 «AI Labs: las ideas en su etapa temprana»; B1 → B2 → B3 condicional → B4 → B5 | Modelo de iniciativas sin entradas; navegación Inicio I3, colecciones y Comunidad | B1/B2/B4/B5 permanecen; B3/heading/listado no se imprimen vacíos; nada de incubación, acceso a proyectos o fichas de iniciativas |
| Productos | Explicar/evaluar recursos; `/productos/` | H1 final «Explora productos y herramientas de IA»; DP1 → DP2 condicional → DP3 condicional → DP4 | Criterios institucionales sí; productos/filtros cero; Inicio en DP4 | Sin fichas/listas/filtros vacíos o postulación no operativa; future cards y fichas reutilizan mismo registro; SEO title/meta description de E2 sin cambio |
| Investigación | Explicar descubrimiento de originales; `/investigacion/` | H1 final «Investigaciones y trabajos relacionados con IA»; DI1 → DI2 condicional → DI3 condicional → DI4 | Explicación y enlace Inicio; cero originales/filtros actuales | No herramientas bibliográficas como trabajos, guía APA o revisión científica inferida; no postulación activa. Metadata de E2 sin cambio |
| Equipo | Identificar estructura y personas; `/equipo/` | H1 «Las personas que impulsan AI PlayGrounds»; E1 → E2 → E3 condicionada por permisos → E4 | Roster lógico 15 con roles múltiples; datos autorizados progresivos | Preparar los 15 registros internos, publicar solo autorizados; no perfiles independientes, bios/fotos vacías o duplicación de Jhonatan; estructura colectiva no se omite por falta de fotos |

### 4.2 Tipos de ficha, aún sin instancias

| Tipo / fuente | Objetivo / audiencia | Composición y datos | Acciones / estados / aceptación |
|---|---|---|---|
| Producto · E2 tipo Ficha de producto | Evaluar utilidad, procedencia y condiciones de un recurso | P1 → P2 → P3 → P5 → P6 → P7 → P9; H1 nombre público real; title nombre/utilidad/marca, descripción fiel a utilidad/público/condición según esquema E2 | P7 acción al uso si existe, si no original informativo. P9 retorna a Productos/Inicio; relaciones opcionales omitidas. Sin registro completo/publicable no generar ruta, entrada de sitemap, enlace o datos estructurados |
| Investigación · E2 tipo Ficha de investigación | Comprender pregunta, método, resultados/límites y original | R1 → R2 → R4 → R5 → R6 → R7; H1 título real/fiel; title/description por original, nunca autoría institucional inferida | R6 original principal; código/datos solo verificados. R7 retorna a Investigación/Inicio. Si no hay resultados, describir situación acreditada, no inventarlos. Cero rutas mientras falten originales |

**PROPUESTO:** renderizado estático y generación de rutas solo a partir de registros elegibles. Un identificador desconocido no debe producir una plantilla vacía ni contenido de demostración; verificar respuesta no exitosa sin inventar una nueva página editorial. Un retiro de registro exige revisar sus enlaces/listados y decisiones de URL, no dejar referencias rotas.

## 5. Modelos de contenido compatibles con Astro Content Collections

### 5.1 Distribución y distinciones

**APROBADO:** campos/relaciones editoriales de E2 y EST §5/§14, contenido versionado en Git, Markdown/JSON y Content Collections (T0). **PROPUESTO:** siete modelos lógicos; páginas institucionales y cinco familias repetibles más personas. No se exige una colección por tabla pequeña: cuatro verticales y dos líneas pueden ser datos compartidos; hitos históricos pueden ser proyecciones/referencias a eventos o datos institucionales. El bootcamp se registra una sola vez como antecedente, sin duplicarlo como programa vigente.

**Registro canónico compartido:** el Bootcamp Gen AI Fundamentals de 2025 debe tener un único registro canónico de contenido. Comunidad, Formación, Empresas e Inicio deben reutilizar sus datos mediante referencias o proyecciones de ese mismo registro; no generar registros independientes que dupliquen fechas, cifras, organizadores o información histórica. El modelo técnico concreto se decidirá durante desarrollo, pero debe garantizar una única fuente de verdad para los datos del bootcamp. Aplicar este principio también a otros eventos y entidades reutilizados en varias páginas.

| Modelo lógico | Representación PROPUESTA | Fuente editorial | Estado de inventario / rutas |
|---|---|---|---|
| `pages` | Markdown narrativo + frontmatter/JSON para metadata, referencias y secciones específicas | E2 páginas y EST §6 | Ocho páginas aprobadas; una ruta por página |
| `activities` | JSON para atributos; Markdown si requiere descripción larga | E2 C3/I4/EM3; HIS | Cuatro Luma y hitos conocidos; sin nuevas URLs de evento |
| `programs` | Markdown de detalle + datos estructurados de decisión | E2 F4 y EST §14 | Cero ofertas públicas vigentes; bootcamp histórico puede representarse aquí con estado histórico y fuente, enlazado desde C3/EM3, sin doble registro |
| `initiatives` | Markdown + frontmatter de atributos/relaciones | E2 B3 | Cero entradas confirmadas; detalle dentro de Labs o enlace a ficha existente, no ruta propia |
| `products` | Markdown de detalle P2 y atributos de frontmatter/JSON | E2 DP/P | Cero entradas; única familia de ruta de producto |
| `research` | Markdown de enfoque/resultados/límites y metadata de original | E2 DI/R | Cero entradas; única familia de ruta de investigación |
| `people` | JSON de nombre/roles/grupos con campos opcionales narrativos | E2 E3, EST roster PER01–15 | 15 personas confirmadas, autorizaciones pendientes; sin perfiles individuales |

No parsear notas internas como cuerpo público. Permisos y evidencias privadas pueden conservar referencias internas en Git con acceso adecuado, pero jamás exponerse mediante una serialización completa de colección al navegador. Separar datos publicables y auditoría privada; no almacenar solicitudes del formulario como contenido Git.

### 5.2 Campos comunes y controles de publicación

Los nombres de claves y enums técnicos siguientes son **PROPUESTOS**; representan requisitos ya aprobados, no un esquema TypeScript implementado. R = requerido para publicar registro; O = opcional; C = condicional con condición explícita. Borradores incompletos pueden existir internamente sin producir páginas públicas. Validar requisitos de publicación según tipo y estado, no imponer la misma completitud a un evento pasado y una futura convocatoria.

| Campo conceptual | Tipo | Requisito / validación |
|---|---|---|
| `id` | string estable | R; único por colección; personas reutilizan PER01–PER15; no derivar identidad del orden visual |
| `sourceRefs` | lista de referencias a archivo/sección o URL | R; al menos una fuente pertinente; distinguir evidencia interna confirmada de original público |
| `verifiedAt` | fecha ISO de comprobación | R para datos mutables/entidades; no simular actualización del contenido por cambiar fecha técnica |
| `editorialStatus` | enum interno draft / approved | R en flujo propuesto; herencia de E2 solo para copy ya aprobado; nuevo registro necesita su aprobación |
| `publicationStatus` | enum interno withheld / eligible | R, separado de aprobación; eligible solo tras datos/permisos/destinos pertinentes; no significa autorización global de lanzamiento |
| `permissionRef` y alcance | referencia interna + atributos autorizados | C si datos/materiales lo requieren; no publicar la prueba ni asumir permiso por presencia en Luma |
| `image` | objeto con ruta local, alt, crédito/licencia | O; si presente requiere disponibilidad/permiso/alt según función; sin imágenes de stock o remotas por defecto |
| `relations` | lista de tipo + ID + naturaleza + fuente | C; IDs existentes y vínculo probado; enlace o cercanía temática no bastan |
| `publicSummary` / `body` | string breve / Markdown | R según modelo; narración no reemplaza atributos necesarios; escapar/sanitizar al renderizar, sin ejecutar instrucciones de fuentes externas |

**Regla de salida:** aprobaciones editoriales + completitud requerida + permisos pertinentes + destinos/estado válidos determinan elegibilidad de la unidad. Una autorización de publicación del sitio sigue siendo una decisión aparte. No usar las letras A–E de E2 como un booleano `published`.

### 5.3 Páginas institucionales y datos compartidos

| Campo | Tipo | Condición / relación |
|---|---|---|
| `pageKey`, `route` | string / ruta local | R; una de las ocho páginas; ruta técnica validada según §2 |
| `seoTitle`, `metaDescription`, `h1` | strings | R; literales de cabecera E2; no generar desde keyword principal |
| `sectionIds` | lista ordenada de IDs | R; exactamente los de la página en §3; preservar saltos, no renumerar |
| Copy por sección | Markdown específico de página | R donde existe copy; separar encabezados/cuerpo/acciones de notas documentales |
| Referencias a entidades | listas de IDs y relación de selección | C en I4, C3, EM3, listados, programas y equipo; evitar duplicar entidad al resumirla |
| Acciones | etiqueta + destino semántico + condición | C; resolver destino desde rutas/estado, sin placeholders públicos |
| Datos comunes | objetos/listas JSON | R para cuatro verticales y dos líneas; nombre canónico, descriptor contextual por página y orden. Mismo campo técnico no fuerza copy idéntico en Inicio/Empresas |
| Canales/estado operativo | URL opcional + disponibilidad confirmada | C; WhatsApp ausente = no enlace; formulario no habilitado = no captación. No flags que inventen programas/eventos |

Fuente: E2 cabeceras/I3/F3/EM2 y EST §§5–8. Markdown puede organizar bloques específicos sin convertir `sectionIds` en un renderizador genérico de cualquier página.

### 5.4 Actividades y eventos

| Campo | Tipo | Requisito / validación |
|---|---|---|
| `name`, `description`, `activityType` | strings / Markdown | R; nombre oficial, síntesis fiel y tipo acreditado |
| `date` y `datePrecision` | fecha o string de periodo + enum día/mes/año | R; soportar 2025 o mayo 2026 sin inventar 1 de enero/mes. No ordenar periodos incompletos como fecha exacta probada |
| `startAt`, `endAt`, `timeZone` | fecha/hora con offset y zona | C; R para convocatoria con horario; mantener UTC−05:00 de cuatro Luma. Fecha pasada incompleta puede omitir horas |
| `activityStatus` | estado editorial confirmado | R; pasado/futuro u otro documentado; estado no inferido de un botón externo residual |
| `modality`, `venue`, `platform` | string / objeto | C, R cuando necesaria para convocatoria; presencial requiere lugar, virtual plataforma; no URLs privadas |
| `organizations` | lista de nombre + papel + fuente | R responsabilidad acreditada; papel de AI PlayGrounds organizado/coorganizado/participante explícito, sin exclusividad por perfil |
| `hosts`, `facilitators`, `speakers` | listas de nombres o referencias | C según fuente; hosts no se convierten automáticamente en organizadores; referencia a persona solo cuando relación validada |
| `originalUrl` | URL pública | R cuando existe; ausente permitido en hitos H01–H04 con fuente humana confirmada; no usar perfil como URL de evento |
| `registration` | objeto URL + estado + condiciones | C solo inscripción existente/vigente; no en registros pasados |
| `metrics` | lista valor/texto, unidad, periodo, alcance, fuente | C; conservar «más de» y unidad de postulantes/inscritos; datos colectivos con contexto; no sumar Went |
| `resources` | lista nombre + tipo + URL + permiso | O; originales adicionales reales; sin grabaciones inventadas |

Detalles públicos por entrada: nombre/descripción, atributos disponibles y responsables, estado y original; sin una página independiente. Las métricas Went no forman parte de la salida pública aunque queden en evidencia interna. Fuente: E2 C3, EST §14, HIS.

### 5.5 Programas formativos

| Campo | Tipo | Requisito / validación |
|---|---|---|
| `name`, `purpose`, `audience` | strings | R para programa; propósito/público concretos |
| `line` | AI Engineering / Software with AI | R para futuro programa de línea, con relación confirmada. El bootcamp histórico no recibe línea retroactiva sin fuente |
| `objectives`, `syllabus`, `requirements` | listas/Markdown | R antes de anunciar oferta; no derivar temario o nivel universal del nombre |
| `modality`, `duration` | string / objeto de duración y dedicación | R en oferta real; no heredar condiciones de 2025 |
| `dates`, `timeZone` | fechas/periodos con precisión | R para convocatoria; rango y zona coherentes |
| `teachers` | lista nombre/credenciales/fuente o referencia | R para oferta; disponibilidad y permisos propios, no roster = docentes |
| `price` y condición económica | objeto importe/moneda/condiciones o gratuidad confirmada | C cuando corresponde; desconocido no gratuito; condición necesaria antes de inscripción |
| `availability`, `verifiedAt` | estado confirmado / fecha | R; histórico no vigente; cero programas públicos abiertos al corte |
| `registration` | mecanismo/destino/condiciones | R para oferta abierta; no CTA si no existe; no listas de espera por defecto |
| `evaluation`, `certificate` | texto sustentado | C solo si existen; ausencia no permite prometerlos |

El resumen y el detalle viven en Formación F4. Bootcamp Gen AI Fundamentals 2025 usa un perfil histórico con lo documentado, sin exigir docentes individuales/temario actual inexistentes para su antecedente. Una restricción de campo de futura oferta no debe excluir ese historial ya aprobado. Fuente: E2 F4/F5 y EST §14.

### 5.6 Iniciativas de AI Labs

| Campo | Tipo | Requisito / validación |
|---|---|---|
| `name`, `needOrQuestion`, `approach` | strings / Markdown | R; qué explora/construye y cómo; sin resultado obligatorio ficticio |
| `responsibles` | lista de personas/equipo y fuente | R; permisos según material |
| `organizationRelation`, `labsRelation` | texto + evidencia | R; vínculo específico, no inferido por estar en colección |
| `verticalRefs` | lista de nombres canónicos/IDs | C con fuente del vínculo |
| `maturity`, `maturityMeaning`, `verifiedAt` | strings / fecha | R; madurez no equivale a acceso o uso |
| `accessSituation` | texto | R; acceso público, limitado o no disponible según evidencia |
| `resourceUrl`, `productRef`, `researchRef` | URL / referencias | C si existen; apuntar a detalle existente sin duplicarlo |
| `neededData`, `contributionOpportunity` | texto/objeto con condiciones | C solo pertinente y confirmado; no oportunidad de incorporación anunciada actualmente |

Presentación en B3, no página de iniciativa. Cero registros ahora. Fuente: E2 B3, EST §§5/14.

### 5.7 Productos

| Campo | Tipo | Requisito / validación |
|---|---|---|
| `name`, `summary`, `slug` | strings | R; slug único/estable propuesto para ruta de ficha real; no slug de muestra |
| `need`, `context`, `audience`, `utility` | strings / Markdown | R P2; utilidad verificable, sin resultado garantizado |
| `limits`, `checks` | Markdown/lista | R límites pertinentes; comprobaciones C según función (código, referencias, decisiones financieras), no advertencias genéricas idénticas |
| `area`, `type`, `category` | strings | R descripción de campo/tipo; taxonomía de filtro C según corpus, no categorías preinventadas |
| `aiRelation` y explicación/fuente | enum integrada / construcción / ambas + texto | R; IA usada al construir no implica función IA al usuario |
| `creators`, `originalSources` | listas de nombre y fuente/URL | R; al menos original identificable; creador distinto de remitente |
| `institutionalRelations` | lista de propio / de integrante / vinculado / externo + fuente/explicación | R situación acreditada; pueden coexistir; propiedad intelectual no inferida |
| `labsRef`, `peopleRefs`, `researchRefs` | referencias con naturaleza/fuente | C; vínculo separado de autoría/propiedad |
| `maturity`, significado, `verifiedAt` | strings / fecha | R; uso no deducido de madurez |
| `usageEvidence` | métricas contextualizadas con fuente/fecha/permiso | C; sin datos no mostrar cero uso |
| `accessSituation`, `licenseSituation`, fuentes | textos/objetos | R; situación de acceso y de licencia documentadas por separado; no público = open source/gratis |
| `usageUrl`, `price`, restricciones | URL / objeto / texto | C según existencia y relevancia; precio material y destino verificados antes de anunciar acceso |
| Metadata de ficha | SEO title/meta description/H1 | R para ruta publicable, según esquema E2; nombre real, no keyword automática |

DP3 deriva nombre, utilidad/público, IA, creador/procedencia, estado/acceso y destino del mismo registro que P1–P9. Ningún objeto necesita duplicarse por vertical, pertenencia a Labs o alias. Fuente: E2 DP3, P1–P9 y condiciones del modelo P9.

### 5.8 Investigaciones y trabajos originales

| Campo | Tipo | Requisito / validación |
|---|---|---|
| `title`, `question`, `summary`, `slug` | strings | R; título y pregunta fieles; resumen distinto del detalle; slug único/estable solo de registro real |
| `authors`, `originalSources` | listas nombre/fuente y URL primaria | R; autores distintos de remitente/editor; al menos un original verificable |
| `affiliations`, `peerReviewEvidence` | lista/texto + fuente | C documentados; no inferir afiliación del roster o revisión por aparecer aquí |
| `institutionalRelations`, `labsRef`, relaciones | lista acreditada / referencias | R situación institucional; C vínculos concretos; no autoría propia por hosting |
| `workType`, `date`, `dateMeaning`, `version`, `workStatus` | strings / fecha con precisión | R naturaleza/fecha/significado/estado; versión C si aplica; no todo trabajo es paper |
| `context`, `materialsOrData`, `method`, `validation`, `scope` | Markdown/atributos | R enfoque sustentado según original; no inventar elemento ausente, registrar limitación de fuente |
| `resultsSituation`, `findings`, `limits` | texto/Markdown | R situación de resultados y límites; findings C si existen; fuente sin resultados no se rellena |
| `primaryUrl`, `accessSituation` | URL / texto | R; destino primario real, sin gratuidad inferida |
| `code`, `datasets`, `otherResources` | listas URL/tipo/condiciones/fuente | C solo disponibles y vinculados al trabajo |
| Metadata de ficha | SEO title/meta description/H1 | R por original; respetar reglas E2, sin publisher/autor institucional inventado |

DI3 usa título/pregunta, autores, tipo, fecha/estado/versión y enlace derivados del mismo registro que R1–R7. Herramientas bibliográficas pertenecen a Productos; consultas de Research no son trabajos científicos propios. Fuente: E2 DI3/R1–R7 y condiciones del modelo R7.

### 5.9 Personas del equipo

| Campo | Tipo | Requisito / validación |
|---|---|---|
| `id`, `name` | string | R; PER01–PER15 y grafías exactas de §10; persona única |
| `responsibilities` | lista de cargo/función + grupo + liderazgo si consta | R; admite varias por persona; no generar otra persona por rol |
| `nameRoleAuthorization` | referencia/estado interno | R antes de salida pública cuando corresponda; no asumir autorización por aprobación del modelo |
| `bio`, `photo`, `professionalLinks` | texto / imagen local / lista URL | O, solo existentes/confirmados/autorizados; sin credenciales inferidas, rostros generados o perfiles de ejemplo |
| `contributions` | relaciones a actividad/obra con fuente | C documentadas; no suponer docencia por pertenencia al equipo |

Fuente: E2 E3, EST roster. No exponer gobierno, remuneraciones o acuerdos internos; no crear rutas de perfil. La completitud progresiva de campos opcionales no cambia arquitectura.

## 6. Reglas de contenido y publicación

**APROBADO · E2 apertura, notas por sección, cierre y EST §15:**

- Ocho páginas institucionales conservan explicaciones y estructura. Listados, filtros, detalles y CTA dependientes de registros solo se muestran con datos suficientes, originales y permisos pertinentes. No renderizar su heading aislado o un contenedor vacío para conservar visualmente «52 secciones».
- AI Labs: sin entradas elegibles, B1/B2/B4/B5 mantienen copy; B3 conserva modelo pero no produce listado vacío. Productos: DP1 y continuidad institucional DP4 permanecen; DP2/DP3 no producen controles/listado sin corpus. Investigación aplica la misma regla a DI1/DI4 frente a DI2/DI3. Conservar todas las funciones en la implementación/modelo, no eliminarlas de la arquitectura.
- No mostrar «contenido pendiente», tokens, skeletons permanentes, registros demo, «próximamente» o placeholders editoriales. La ausencia deliberada de inventario no se soluciona inventándolo. Tampoco se promete una colección llena.
- No crear fichas o enlaces de objetos no identificados. Si hay entradas retenidas o incompletas, no contarlas como publicadas ni incluirlas en sitemap, búsquedas, JSON cliente o datos estructurados. Retener la instancia, no bloquear las explicaciones institucionales del sitio.
- No publicar eventos futuros sin confirmación; fechas pasadas/periodos históricos no son convocatorias actuales. No cursos actuales, matrícula, certificados, modalidad o listas de espera inferidos de 2025.
- No atribuir producto/trabajo externo a AI PlayGrounds ni convertir un host, sede, enlace o logo en relación de organización/autoría/cliente. Conservar fuente y alcance cerca de la cifra o claim, incluso si un fragmento se lee aislado.
- No transformar coorganización de hackathons en evidencia de software empresarial, implementación de IA, consultoría financiera, clientes o resultados económicos. Formación personalizada es una conversación evaluable de AI Academy, no oferta cerrada.
- No duplicar personas; no publicar datos/materiales personales sin autorización pertinente. Material opcional ausente se omite, sin completar bios con IA ni buscar fotografías por iniciativa propia.
- C7 no tiene captación interna; DP4/DI4 no tienen postulación activa. Aprobación editorial no activa procesos inexistentes ni significa permiso general de publicación.

**PROPUESTO · filtro técnico de visibilidad:** obtener primero registros elegibles, luego proyectar resúmenes y, finalmente, calcular opciones de exploración útiles. La plantilla consume esa proyección, no todos los campos internos. Si el conjunto es cero, no renderizar listado/filtros/heading de resultados; mantener explicación/navegación institucional. No cambiar autoría, fechas o permisos desde la UI.

Si después se implementan filtros con un corpus real, la elección de controles, combinación, orden y mensajes de resultados requiere decisión técnica/contenido (§12 DEP-11). No se ha aprobado un buscador, un comparador, un ranking, paginación o copy de «sin resultados». No introducir esos estados por la sola existencia de un esquema. Mantener los datos suficientes para incorporarlos sin reescribir entidades.

## 7. Comunidad y eventos

### 7.1 Acceso general y equipo interno

**APROBADO · E2 C1/C4/C6/C7, EST §14:** comunidad general abierta; CTA literal **«Unirme a la comunidad»**; recorrido visitante → CTA → invitación del grupo de WhatsApp. No formulario, presupuesto, solicitud, entrevista o evaluación de acceso. La URL `WHATSAPP_INVITACION_PENDIENTE` es un token interno de E2, nunca un href o texto visible.

Preparar una sola definición de acción para C1/C6; no dos vías de ingreso. Sin URL real, no activar el enlace ni presentar como funcionando su microcopy «Abrirás WhatsApp para unirte al grupo» o el texto que presupone invitación operativa. **PROPUESTO:** omitir temporalmente el control de acceso y esa instrucción dependiente, conservando el resto del copy institucional; no sustituirlo por formulario o canal inventado. La autorización de publicación deberá revisar ese estado, no asumirlo resuelto por el build.

Equipo interno cerrado: C7 muestra únicamente el H2/copy informativo y enlace a Labs definidos en E2. No «unirse al equipo», aplicaciones a verticales, entrevistas, convocatorias internas, vacantes o solicitudes ocultas reutilizadas como formulario general. Unirse a WhatsApp o asistir a una actividad no otorga pertenencia al equipo organizador.

### 7.2 Historia disponible y calendario futuro

**APROBADO al corte:** no hay eventos próximos vigentes para anunciar. C3 sí contiene estas cuatro entradas documentadas, además de los hitos H01–H04 de E2. Importar descripciones, responsables y facilitadores desde C3, no desde este resumen técnico.

| Registro real | Fecha/hora anunciadas, Perú UTC−05:00 | Modalidad / fuente original |
|---|---|---|
| From Hack to Pilot: Perú Demo Day | 05/06/2026, 19:00–21:00 | Presencial, UTEC Ventures en UTEC, Barranco; https://luma.com/yzjagyu0 |
| Workshop Práctico de Claude Code | 29/04/2026, 19:00–21:00 | Virtual, Google Meet; https://luma.com/gjk5qy7b |
| Workshop Práctico de Cursor | 22/04/2026, 19:00–21:00 | Virtual, Google Meet; https://luma.com/0bg0xu7s |
| El mapa completo de asistentes de código con IA | 15/04/2026, 19:00–21:00 | Virtual, Google Meet; https://luma.com/0ott2q9m |

Fuentes: [E2 C3][e2-c3] y HIS L01–L04. Estos horarios se verificaron en el trabajo editorial previo; no se reconsultaron en este handoff. Originales se abren como fuentes, no como invitación vigente. El Demo Day conserva señales residuales de registro en Luma que no prevalecen sobre su fecha pasada/estado editorial. No importar automáticamente estado de inscripción desde botones/JSON-LD externos. No usar Went como asistentes efectivos, sumar asistentes únicos o convertir proyectos de terceros presentados en productos propios.

Hitos adicionales: hack@latam mayo 2026, IA Hackathon noviembre 2025, The Real AI julio 2025 y Bootcamp Gen AI Fundamentals 2025. Roles y cifras exactos ya están en E2 C3/EM3/F4; HIS H01–H04 conserva procedencia humana del deck y originales no aportados. No inventar URLs, día exacto, modalidad, speaker o material para completar esos registros. El deck HTML original no está disponible: no declararlo inspeccionado ni incluir sus ejemplos ilustrativos como registros.

Nuevas actividades se incorporan con el modelo `activities`, sin páginas independientes. Mantener separación semántica entre pasado y futuro; no bloque «próximos» vacío hoy. Para una convocatoria futura se requieren fecha/hora/zona, modalidad/lugar/plataforma, responsabilidad, condiciones y destino real de inscripción si existe, además de confirmación de estado. La fecha por sí sola no es permiso para anunciarla; una nueva entrada no activa reclutamiento. Cambios de fecha/cancelación requieren actualizar menciones y acciones dependientes, no conservar CTA obsoleto.

## 8. AI Academy

**APROBADO · E2 F1/F3/F4/F6/F5 y EM5:** la página se llama Formación y la iniciativa AI Academy, sin página Academy adicional. Mantener las dos líneas:

| Línea | Distinción que debe preservar la implementación |
|---|---|
| AI Engineering | Integrar modelos/APIs de IA en aplicaciones y sistemas; definir necesidad, evaluar funcionamiento y límites |
| Software with AI | Diseñar, construir, probar y mejorar software con apoyo de IA; revisión de código/pruebas y decisiones humanas |

Estas son líneas de aprendizaje, no dos cursos inscritos, títulos universitarios o una ruta secuencial. El descriptor no inventa requisito técnico universal ni asegura empleo o código correcto. Comparación F3 usa los mismos criterios de tarea, papel de IA y criterio humano; no eliminar una condición para conseguir simetría visual.

Actualmente no hay cursos/programas públicos vigentes ni convocatorias activas. El bootcamp de 2025 es un antecedente histórico gratuito/práctico de seis semanas, más de 300 inscritos y 16 speakers de Perú, Colombia y Estados Unidos. No tratar inscritos como graduados/asistentes, heredar gratuidad/docentes/duración a nuevos cursos o asignar una línea actual retroactivamente. Fuente: F4/H04.

Preparar `programs` y su presentación dentro de F4, sin crear páginas de programa ni lista vacía. Un futuro programa requiere campos de §5.5 y aprobación de estado; antes de una nueva inscripción revisar F4/F5/metadatos que afirman ausencia de convocatorias. No añadir waitlist, avisos o próximas fechas. No completar catálogo ahora.

La formación personalizada para organizaciones se explora desde perfiles, necesidades y objetivos del equipo. F6/F5 apuntan a Empresas EM5; **«Consultar formación para mi equipo»** allí conduce al único formulario EM6 con **Oportunidad comercial**. No formulario adicional de Academy ni formación bajo AI Labs. Temarios, docentes, disponibilidad, precios, certificados, resultados, modalidades y plazos se evalúan por propuesta; no prometerlos desde el frontend.

## 9. Empresas y formulario único

### 9.1 Alcance y navegación

**APROBADO · E2 EM1–EM6:** seis secciones de §3; organización → cuatro ámbitos → experiencia → Labs → Academy para equipos → conversación. EM3 acredita organización/coorganización de actividades y formación, no ejecución técnica empresarial. EM4 debe usar **«Explorar AI Labs»** hacia Labs, sin clonar su inventario.

En EM6 distinguir visual y semánticamente los caminos siguientes, sin decidir un layout preciso:

| Camino / origen | CTA literal | Tipo inicial en el mismo formulario |
|---|---|---|
| Alianzas institucionales (EM6) | Proponer una alianza | Alianza institucional |
| Oportunidades comerciales (EM6) | Cuéntanos tu necesidad | Oportunidad comercial |
| Formación personalizada AI Academy (EM5) | Consultar formación para mi equipo | Oportunidad comercial |

El primer camino incluye universidades, instituciones, comunidades/organizaciones para actividades, encuentros e iniciativas compartidas. El segundo incluye necesidades de IA y posibles colaboraciones comerciales, proyectos o formación evaluables. Usar el copy de E2 EM6; no presentar la consulta como aceptación, contratación, cotización automática o compromiso de ejecución. No prometer tiempo de respuesta, agenda o reunión.

**Comportamiento aprobado:** tres CTA, un solo formulario en Empresas; selección visible y siempre modificable. Preseleccionar según origen cuando sea posible. Si no se soporta preselección, dejar selección manual obligatoria; no suponer comercial sin elección del visitante. Cambio posterior prevalece al enviar. Llegada directa al formulario debe permitir elegir tipo; no depender de una URL de campaña. No crear páginas, formularios o sistemas separados para alianzas/comercial/formación.

**PROPUESTO:** ancla de EM6 y mejora progresiva mínima para actualizar el control desde los CTA; foco perceptible al llegar sin perder contexto. Evitar query params como sustituto de la verdad del campo. No se exige React: solo considerar una isla si la interacción real lo justifica dentro del stack. Probar teclado y navegador sin mejora JavaScript: al menos navegación/elección manual deben funcionar; nunca enviar por el mero clic de un CTA de navegación.

### 9.2 Contenido exacto y campos

Fuente normativa para todas las etiquetas/ayudas/mensajes: [E2 EM6][e2-em6]. Se reproduce el microcopy mínimo aquí porque determina el contrato funcional, no para crear otra versión editable.

- **Título:** Cuéntanos tu propuesta o necesidad
- **Descripción:** Comparte el contexto de tu organización y lo que te gustaría conversar con AI PlayGrounds. No necesitas preparar un brief técnico.
- **Instrucción:** Los campos marcados con * son obligatorios.
- **Botón:** Enviar consulta

| Etiqueta aprobada | Tipo de entrada | Obligación | Ayuda / validación |
|---|---|---|---|
| Tipo de consulta * | Selección única | Sí | Opciones exactas Alianza institucional / Oportunidad comercial; estado inicial sin valor: Selecciona el tipo de consulta |
| Nombre y apellido * | Texto | Sí | No restringir a ASCII ni imponer cantidad fija de palabras |
| Organización o empresa * | Texto | Sí | Sin placeholder obligatorio o identificador fiscal |
| Cargo o función (opcional) | Texto | No | Vacío válido; no bloquea envío |
| Correo electrónico * | Email | Sí | Ejemplo de formato nombre@organizacion.com; no exigir dominio corporativo |
| País (opcional) | Selector o texto estructurado | No | Si selector: Selecciona un país; sin país preasignado. Modo de control técnico por decidir |
| Cuéntanos qué tienes en mente * | Área de texto | Sí | Ayuda persistente: Puedes contarnos tu propuesta, una necesidad de tu equipo o el contexto que quieres evaluar. Sin mínimo arbitrario o brief técnico |
| Consentimiento de privacidad | Casilla | Solo cuando legalmente necesaria | Texto/obligatoriedad condicionados a revisión legal y política aplicable; no casilla premarcada |

No añadir presupuesto, teléfono, tamaño, RUC, empleados, adjuntos o agenda como requisitos. Validar vacío y formato por separado; controles opcionales no generan error por ausencia. Límites técnicos de tamaño y protección se decidirán después de documentar la necesidad; no imponer requisitos editoriales nuevos por conveniencia.

### 9.3 Estados, mensajes y criterios funcionales

| Estado | Mensaje literal E2 | Criterio de implementación |
|---|---|---|
| Tipo ausente | Selecciona el tipo de consulta. | Error junto al control, elección corregible |
| Nombre vacío | Escribe tu nombre y apellido. | No deducir nombre incompleto por una sola palabra |
| Organización vacía | Indica tu organización o empresa. | Corregir campo, no pedir RUC |
| Correo vacío | Escribe tu correo electrónico. | Distinto de formato inválido |
| Correo inválido | Revisa el formato de tu correo electrónico. | Permitir corrección sin borrar otros campos |
| Contexto vacío | Cuéntanos brevemente qué tienes en mente. | No exigir un brief o extensión arbitraria |
| Consentimiento requerido ausente | Para enviar, acepta el tratamiento de datos indicado en la política de privacidad. | Solo si obligación/texto legal/destino están validados |
| Resumen de errores | Revisa los campos señalados para enviar tu consulta. | Identificar controles, enlaces/foco a errores y ayudas asociadas |
| Recepción confirmada | Hemos recibido tu consulta. Gracias por compartir el contexto de tu organización. | Solo tras confirmación real de recepción del canal; no por clic, temporizador, validación cliente o respuesta técnica no concluyente |
| Error recuperable o recepción incierta | No pudimos confirmar la recepción de tu consulta. Inténtalo de nuevo. | Permitir reintento; no afirmar que se guardaron datos o que nadie recibió nada si no puede saberse |

**Criterios aprobados:** éxito no equivale a contratación; error no inventa almacenamiento; no plazos. **PROPUESTO técnico:** estado de envío en curso perceptible y prevención de envíos accidentales repetidos; texto adicional de progreso, estrategia de reintento/idempotencia y criterios de respuesta del canal por resolver en desarrollo sin cambiar mensajes de E2. No mostrar éxito de prueba en producción. No escoger un backend, endpoint, proveedor de email o protocolo de recepción en este handoff.

Validación accesible: etiquetas persistentes, relación ayuda/error con control, obligatoriedad expuesta, resumen de errores anunciado y enfocable, señal de error no solo color, estado final anunciado sin ocultar el formulario prematuramente. Usar componentes Starwind pertinentes cuando existan y HTML nativo; no se presupone nombre/API de componente o integración aún no instalada.

### 9.4 Privacidad, activación y límite del canal

PENDIENTE: política aplicable, responsable/tratamiento real y URL válida; cuándo es legalmente necesaria la casilla; revisión del texto condicionado de E2; mecanismo de envío/recepción y pruebas. **No inventar ruta `/privacidad/`, página legal, servicio, jurisdicción, duración de conservación o automatizaciones.** La ubicación legal se decidirá, sin ampliar silenciosamente las ocho páginas editoriales.

Texto condicionado E2: «Antes de enviar, revisa la política de privacidad». Casilla condicionada: «He leído la política de privacidad y acepto el tratamiento de mis datos en los términos que allí se indican». Vincular «política de privacidad» al documento real cuando exista, no al token `POLITICA_PRIVACIDAD_PENDIENTE`. No afirmar tratamiento implementado antes de resolverlo.

Se pueden construir y probar estructura/mensajes en entorno privado posteriormente autorizado. Sin privacidad/canal verificados, no activar envío ni publicar aceptación legal o un CTA que aparente captación operativa. **PROPUESTO:** mantener los dos caminos como información y omitir controles de captación en una eventual versión pública incompleta; requiere validar el lanzamiento, no borrar EM6 del contrato. No sustituir con correo, WhatsApp empresarial, booking o formulario de terceros no aprobados.

No CRM, distribución interna, notificaciones, almacenamiento de consultas en Git o base de datos inferida del stack. El proceso de desarrollo deberá resolver seguridad/abuso/validación del canal con la decisión legal y operativa pertinente; WAF/Workers no prueban por sí solos recepción, protección suficiente o autorización de tratamientos. §12 DEP-02/03 bloquea solo captación, no todo el contenido institucional.

## 10. Equipo y autorizaciones

**APROBADO · E2 E1–E4, EST roster PER01–PER15:** hay 15 integrantes únicos. La estructura distingue Leadership Team, cuatro verticales y funciones transversales. Importar sin corregir grafías por automatismo:

| ID canónico | Persona | Responsabilidades / grupos confirmados |
|---|---|---|
| PER01 | Soledad Ñahui | Head of Strategy · Leadership Team |
| PER02 | Jhonatan Morgan | Head of AI · Leadership Team; líder de AI Foundations |
| PER03 | Edhú Nuñez | Head of Product · Leadership Team |
| PER04 | Joseph Robles | Líder de AI for Software |
| PER05 | Julio Montreul | Integrante · AI for Software |
| PER06 | Max Veramendi | Integrante · AI for Software |
| PER07 | Jheslyn Lagos | Integrante · AI for Software |
| PER08 | Ricardo Quispe | Líder de AI for Science |
| PER09 | David Durán | Integrante · AI for Science |
| PER10 | Pedro Rojas | Integrante · AI for Science |
| PER11 | Kevin Huaman | Integrante · AI for Science |
| PER12 | Edith Canelo | Líder de AI for Finance |
| PER13 | Rocio Laura | Integrante · AI for Finance |
| PER14 | Appu Dávila | Public Relations (Relaciones Públicas) · función transversal |
| PER15 | Milagros Dimas | Product Specialist · función transversal |

PER02 es una persona con dos funciones, no dos tarjetas personales/bios; las agrupaciones pueden referir al mismo ID. Si la presentación por grupos duplica referencias, no duplicar registro ni contar 16 personas; **PROPUESTO:** un listado personal único con responsabilidades múltiples y contexto grupal.

Nombres y cargos confirmados no acreditan autorización pública de todo material. E3 se activa por dato/material autorizado; foto, bio y enlaces son opcionales y pueden añadirse después sin rehacer arquitectura. Si faltan fotos/bios, presentar solo los atributos permitidos; no placeholders de retratos o credenciales. Si falta permiso esencial, retener esa unidad pública; no ocultar la explicación institucional de E1/E2/E4. Verificar también atribuciones personales que aparezcan en actividades/recursos según su fuente y autorización pertinente, sin importar afiliaciones profesionales de Luma como bios actuales.

PR es Public Relations, no Public Relationships. No añadir Manager, Director o Lead por analogía. No perfiles individuales, contacto personal o vías de ingreso al equipo; no acuerdos internos, remuneración o gobierno confidencial. Un modelo progresivo no convierte datos privados en públicos cuando se completa un campo.

## 11. SEO, semántica y accesibilidad para implementación

Fuentes: E1 §4.2, E2 cabeceras/notas transversales, EST §§8.1–8.10/14/15, RES R11 y KM. Requisitos definidos, **ejecución y pruebas PENDIENTES**; no hay auditoría de sitio construido ni promesa de ranking/citación.

### 11.1 Responsabilidad temática y metadata

| Página / tipo | Clusters pertinentes ya aprobados | Instrucción de implementación |
|---|---|---|
| Inicio / Equipo | N01; Inicio contextualiza N05/N06/N08/N10 | Identidad y campos, no guía genérica de IA o captación de empleos |
| Comunidad | N02 | Actividad real y acceso claro, no volumen de proyectos como demanda de incorporación |
| Formación | N11 y facetas N06/N07 | Diferenciar integración/asistencia, estado actual y condiciones; no carrera universitaria |
| Empresas | N12, contexto de cuatro campos | Relación institucional/comercial y evidencia, no catálogo de implementación inventado |
| AI Labs | N03, faceta institucional | Iniciativas/estado; no tutorial de gestión ni laboratorio físico inferido |
| Productos / ficha | N04; N09 y campos según objeto | Utilidad/procedencia/acceso; herramienta para investigar no trabajo científico |
| Investigación / ficha | N13; N08 según original | Pregunta/enfoque/autor/límites/fuente; no guía APA o autoría propia automática |

Conservar 13 clusters, 69 candidatas y 48 preguntas como trazabilidad, no convertirlos en páginas, FAQs, filtros o texto repetido. Diferencias de Perú/México/Colombia siguen en Research; no crear versiones nacionales ni prioridades de negocio por volumen. P05 solo referencia competitiva, P09/P27 excluidas del plan de respuesta, P45 apoyo de campos. P38 gratuidad histórica no promesa actual.

**APROBADO:** usar SEO title/meta description/H1 de cada cabecera E2, sin reformular. Los H1 corregidos de Productos/Investigación no alteran title/description. Fichas futuras usan sus reglas de metadata y datos reales. No fijar una cuota artificial de keywords, caracteres de respuesta o entidades. Los ocho H1 están en §4; los otros dos son patrones, no instancias.

### 11.2 Requisitos técnicos y semánticos

| Requisito | Qué deberá hacer/verificar desarrollo | Condición / fuente |
|---|---|---|
| Texto y jerarquía | HTML legible/renderizado con un H1 y H2/H3 coherentes; headings informativos, campos con labels, orden editorial sin depender de JS | E2/EST HT1; comprobar en build/render real |
| Enlaces y rutas | Navegación global, contextuales y retornos correctos; anclas reales; enlaces externos descriptivos; nada a registro sin ruta | E1 §5/E2 acciones; validar todas las rutas técnicas propuestas |
| Canonical | Una URL estable y coherente por página/ficha publicada, con origen de producción aprobado; no dominio inventado o preview como canónico | Origen/convenio de barras PENDIENTE, EST HT1 |
| Sitemap | Incluir páginas/fichas públicas elegibles, excluir borradores, plantillas sin instancias, facetas y documentación | Implementación concreta por decidir dentro del stack, sin añadir dependencia en esta tarea |
| Indexabilidad/discovery | Revisar HTTP, HTML/render, robots/noindex/headers/controles CDN, links y redirects pertinentes; separar entorno privado de producción autorizada | EST HT1/HT3; build exitoso no prueba indexación |
| Imágenes | Solo assets reales locales/autorizados; dimensiones y optimización Astro cuando corresponda; alt describe función, vacío si decorativo | Créditos/licencias conservados, sin alt ficticio sin imagen |
| Datos estructurados | Evaluar candidatos con contenido visible real y documentación vigente antes de implementar; no generar JSON-LD desde campos privados | EST HT2/§8.6: Organization candidato, listado si hay corpus; Event/Course/Service no por nombre; Product/SoftwareApplication/ScholarlyArticle no automáticos |
| Crawlers IA | Propietario decide política según finalidad; distinguir entrenamiento de búsqueda/recuperación cuando sea posible | PENDIENTE; no bloquear/permitir por defecto ni exigir llms.txt |
| Medición | Mantener posibilidad de medir navegación/salidas/consultas con acceso y consentimiento si se decide; clic no asistencia/uso/contratación | EST §8.8; no configurar Analytics/Search Console/tracking o nuevo servicio aquí |

### 11.3 Accesibilidad y responsive

**Requisitos de implementación derivados de E2, con criterios técnicos PROPUESTOS para comprobarlos:** landmarks y navegación identificables, enlace de salto al contenido, orden de lectura/foco congruente, controles utilizables con teclado, foco visible, contraste suficiente y texto/enlaces comprensibles sin iconos. Lucide decorativo oculto a tecnologías de asistencia; icono funcional con nombre accesible. Menú móvil debe mantener los siete accesos y retorno a Inicio sin atrapar foco; no introducir un nuevo recorrido editorial.

Formularios: grupo y etiqueta del tipo de consulta, ayudas persistentes, `required`/errores asociados, anuncio del resultado sin falsa confirmación y recuperación por teclado (§9). Comparación F3 y datos de trayectoria legibles en pantalla estrecha y con lector de pantalla; una tabla documental no exige tabla HTML. Si se usa tabla real, encabezados/relaciones accesibles; si lista, conservar criterios comparables. Enlaces a originales comprensibles fuera de contexto.

Verificar reflow/zoom, ausencia de contenido recortado u overflow de página en tamaños móviles/escritorio, acciones táctiles utilizables y preferencias de movimiento reducido si se añade movimiento. No hay motion obligatorio, wireframe, breakpoint o design system visual aprobado. Estas verificaciones pertenecen a desarrollo y pruebas de UI; este documento no certifica accesibilidad global ni conformidad legal.

## 12. Dependencias y decisiones pendientes

Los responsables siguientes son **roles de resolución**, no asignaciones personales o automatizaciones. Cada dependencia tiene alcance local; no todas bloquean el proyecto. Fuente común: E2 «Pendientes no publicables», EST §§14–15, DEC E221-C; T0 para infraestructura.

| ID | Clase | Dato / estado | Qué puede construirse ahora | Qué bloquea / criterio para resolver | Responsable / momento |
|---|---|---|---|---|---|
| DEP-01 | Bloquea funcionalidad | URL WhatsApp exacta PENDIENTE, comunidad abierta confirmada | Copy Comunidad y definición compartida del CTA | Activar acceso/instrucción de enlace hasta invitación real vigente probada; no formulario alternativo | Responsable comunitario + desarrollo, antes de activar |
| DEP-02 | Bloquea funcionalidad | Política, destino legal y consentimiento PENDIENTES | Campos y textos condicionados en entorno privado | Captación pública/legal hasta política aprobada coherente con tratamiento; ubicación sin ruta legal inventada | Propietario/asesoría pertinente + desarrollo, antes de captación |
| DEP-03 | Bloquea funcionalidad / decisión técnica | Canal/envío/recepción del formulario PENDIENTES | Un formulario, selección, validaciones, estados preparados sin envío real | Envío/éxito hasta canal autorizado, recepción comprobada y errores/reintentos probados; sin backend supuesto | Desarrollo + responsable operativo, durante desarrollo autorizado |
| DEP-04 | Bloquea dato/entrada personal | Autorizaciones de nombre/rol/material PENDIENTES cuando correspondan | Roster interno 15, estructura y modelo | Solo unidad/campo no autorizado en E3 o atribuciones; no la página institucional completa | Coordinación + persona, antes de publicar dato |
| DEP-05 | Dato aún no aportado | Inventario Labs no confirmado | B1/B2/B4/B5 y modelo B3 | B3/recursos de iniciativas hasta registro real completo, vínculo/estado/permisos | Responsable de iniciativa/curación, por ingreso |
| DEP-06 | Dato aún no aportado / entrada específica | Productos/originales/licencias/acceso sin registros | DP1/DP4 y modelos de listado/ficha | DP3/ficha/acción por producto hasta campos R y fuente/permiso; no llenar con herramientas de Luma automáticamente | Curación/creador, por ingreso |
| DEP-07 | Dato aún no aportado / entrada específica | Investigaciones/originales sin registros | DI1/DI4 y modelos | DI3/ficha por trabajo hasta original, autoría, método/situación de resultados y permisos | Curación/autores, por ingreso |
| DEP-08 | Datos deliberadamente inexistentes hoy | Sin próximos eventos ni programas públicos vigentes | Historia C3/F4 y modelos futuros | Solo convocatorias nuevas hasta confirmación/condiciones/destino; no bloqueo de salida institucional | Comunidad/Academy, al decidir nueva actividad/oferta |
| DEP-09 | Materiales opcionales | Fotos/bios/enlaces/portadas/logos/recursos gráficos no aportados/autorizados | Texto/atributos autorizados sin campos visuales vacíos | Material particular, no sección por simetría; permiso, procedencia y alt antes de incorporarlo | Fuente del material + contenido, por incorporación |
| DEP-10 | Decisión técnica | Rutas finales/origen canónico/configuración Astro/Workers/CI/seguridad sin especificación detallada | Mapa editorial, schemas/plantillas y navegación de destino | Despliegue público, canonical absoluto y verificaciones de infraestructura hasta valores/configuración aprobados | Desarrollo + propietario/SEO, antes de lanzamiento |
| DEP-11 | Decisión técnica dependiente de corpus | Filtros/valores/soporte no definidos | Campos comparables, sin controles vacíos | Interacciones de exploración hasta datos útiles/soporte/copy de estados pertinentes; no nueva página por filtro | Desarrollo + curación, con corpus real |
| DEP-12 | Funcionalidad no habilitada | Proponer productos/trabajos sin proceso/canal confirmado | Continuidad institucional DP4/DI4 | Captación de propuestas, no listados ni navegación; requiere nueva confirmación operativa | Propietario/curación, si se habilita |
| DEP-13 | Estado de publicación | Aprobación editorial sí; autorización de publicación no | Desarrollo privado solo cuando se autorice aparte; QA de contenido | Lanzamiento público hasta autorización y revisión de funciones/datos aún retenidos | Responsable del proyecto, antes de publicar |

**Resuelto, no pedir de nuevo:** tratamiento de colecciones sin entradas (EST §15/E221-C), dos H1 finales, cuatro verticales, 15 identidades y PR, comunidad abierta/equipo cerrado, formulario único/dos tipos y formación personalizada potencial. No reabrir Research/SEO/B2/E1 para completar inventarios o elegir colores/componentes.

## 13. Criterios de aceptación verificables

Este checklist es para el futuro agente y la revisión humana. Las casillas no están marcadas: no hay aplicación construida o publicada. Registrar resultados, entorno y limitaciones cuando se ejecute, sin llamar «listo» al conjunto si falta una condición de producción.

### 13.1 En desarrollo local/entorno privado autorizado

- [ ] Ocho páginas base y dos plantillas de ficha, con las rutas editoriales de §2 o equivalencia técnica registrada. Cero páginas extra de eventos, verticales, programas, integrantes o iniciativas.
- [ ] Registro de los 52 IDs y su orden por página coincide con §3/E1/E2. Las secciones condicionales no renderizadas sin datos están cubiertas en modelo/pruebas, no eliminadas o contadas como contenido público terminado.
- [ ] Copy de E2, H1 y metadatos fieles; últimas correcciones de Productos/Investigación presentes. Diferenciar notas internas y texto visible, sin tokens, estados A–E o referencias de trabajo como copy público.
- [ ] Navegación global, enlaces contextuales a I3/C3/F4/EM5/EM6, retornos de fichas y destinos externos resuelven correctamente; no autolink vacío a Formación o enlace a ficha inexistente.
- [ ] Las cuatro verticales mantienen su orden/nombres y no se convierten en cursos/servicios; Academy/Labs/comunidad conservan funciones distintas.
- [ ] Historia C3 incluye cuatro Luma con fechas/hora/zona, responsables/roles y originales correctos; hitos del deck con atribución/cifras del evento completo; Went no usado como asistencia.
- [ ] Futuro vacío no muestra agenda/convocatorias; bootcamp 2025 histórico, sin cursos vigentes, waitlists o condiciones actuales inventadas.
- [ ] Modelos de §5 admiten precisión de fechas y datos históricos parciales sin inventar día/hora; validan publicación de ofertas futuras con condiciones completas.
- [ ] Colecciones sin entradas conservan explicación, sin listados/filtros/heading de resultados vacíos, cards demo, placeholders, fichas o sitemap de objetos inventados.
- [ ] Con un registro real aprobado disponible, el resumen y detalle proceden de una sola entidad; relaciones opcionales ausentes se omiten, no se infieren. No se debe inventar un registro para esta entrega o para publicación de pruebas.
- [ ] Acción WhatsApp definida con etiqueta exacta, sin formulario general o fake href; ausencia de URL bloquea activación y copy dependiente, no todo el contenido comunitario.
- [ ] EM6 tiene exactamente un formulario para ambos caminos y formación; los tres CTA usan tipo correcto y modificable. Llegada directa/fallback manual permiten elegir. Cambiar tipo no crea otro formulario.
- [ ] Cinco campos siempre obligatorios (tipo, nombre, organización, correo, contexto); cargo/país opcionales; consentimiento solo bajo condición legal. No campos adicionales exigidos.
- [ ] Validaciones distinguen vacío/formato, preservan contexto al corregir y usan mensajes E2; éxito/error no se disparan por clic o timer. Hasta existir canal, no se confunde prueba privada de UI con recepción real.
- [ ] Equipo lógico de 15 personas con PER02 una sola vez y dos responsabilidades; Appu Public Relations, Edhú Nuñez/Kevin Huaman exactos; sin datos/materiales no autorizados o bios inventadas.
- [ ] Ninguna captación de equipo interno; DP4/DI4 no muestran postulaciones sin proceso.
- [ ] Contenido/navegación/formulario operables por teclado y lector de pantalla, foco visible, ayudas/errores asociados, encabezados coherentes, imágenes con alt pertinente. Verificaciones manuales y automáticas disponibles registradas, no certificación por usar componentes.
- [ ] Responsive en móvil/escritorio y zoom/reflow; no texto, comparación o acción esencial recortados. Lucide no sustituye labels; no interacción dependiente solo de hover/color.
- [ ] Astro + TypeScript strict + Tailwind CSS 4 + Starwind UI + Lucide; React Islands solo con necesidad documentada. No motor universal, CMS, base de datos o servicios añadidos sin aprobación.
- [ ] Validación de contenido, chequeo de tipos, build de Astro y pruebas de navegación/render/interacción disponibles en el proyecto pasan; registrar comandos reales del futuro `package.json`/CI y sus resultados. No inventar hoy scripts o herramientas de test instaladas.

### 13.2 Antes de activar funciones y publicar (datos/permisos/infraestructura)

- [ ] URL WhatsApp real y vigente comprobada; recorrido directo al grupo sin evaluación inventada.
- [ ] Política real/URL y tratamiento de datos aprobados; consentimiento legalmente determinado, no premarcado; envío autorizado y validación del canal coherente con campos/privacidad.
- [ ] Recepción del formulario probada extremo a extremo; confirmación real habilita el mensaje de éxito. Fallos/recepción incierta son recuperables y no prometen almacenamiento o plazos; seguridad/abuso y permisos del canal validados sin servicio supuesto.
- [ ] Cada persona/material publicado tiene autorización pertinente; no pruebas privadas de permisos en assets/JSON/bundle público.
- [ ] Cada nueva ficha, evento o programa tiene original/fuente, estado y condiciones suficientes; convocatoria y enlaces no obsoletos. Cero entrada falsa usada para cumplir cantidad o diseño.
- [ ] URLs finales/canonical con dominio aprobado; sitemap/rastreo/robots/headers/render y controles de entorno revisados; no draft/preview/documentación en salida pública. Validar Schema solo si se implementa y refleja entidades visibles reales.
- [ ] Build y entrega por GitHub Actions/Workers Static Assets probados en entorno autorizado con Wrangler/configuración compatible, sin credenciales expuestas; CDN/DNS/SSL/WAF conforme a decisión real, no a defaults supuestos.
- [ ] Responsable del proyecto autoriza publicación separadamente. Datos inexistentes no bloquean las páginas explicativas, pero funciones/entradas retenidas siguen sin activarse. No afirmar SEO/indexación/citación garantizados tras publicar.

## 14. Organización lógica del proyecto Astro (PROPUESTO)

Esta estructura **no existe todavía y no se crea en esta tarea**. Son rutas futuras recomendadas, no referencias a archivos fuente disponibles. Puede adaptarse a una alternativa más sencilla dentro del stack sin alterar el contrato editorial. Referencias reales siguen siendo las de §1.2.

```text
docs/
  implementation/content-handoff.md       # Este archivo real
  sources/                                # Opcional en repo destino: copias controladas del paquete fuente
src/
  pages/
    index.astro
    formacion.astro
    empresas.astro
    comunidad.astro
    ai-labs.astro
    productos/index.astro
    productos/[slug].astro                 # Solo genera instancias reales elegibles
    investigacion/index.astro
    investigacion/[slug].astro             # Solo genera instancias reales elegibles
    equipo.astro
  content.config.ts                       # Schemas/loaders de Content Collections según versión elegida
  content/
    pages/                                # Copy aprobado ya separado de notas documentales
    activities/
    programs/
    initiatives/
    products/
    research/
    people/
  data/
    navigation.json                       # Labels/destinos y condiciones
    institutional.json                    # Verticales/líneas/hitos o referencias compartidas
  components/
    ui/                                   # Starwind UI pertinente, sin biblioteca adicional
    shared/                               # Navegación, acciones/enlaces, resúmenes reutilizables
    empresas/                             # Composición del único formulario si requiere pieza propia
  layouts/                                # Marco de página y metadata
  assets/images/                          # Imágenes locales autorizadas para optimización Astro
  styles/global.css                       # Tailwind 4 y estilos globales acordados
  utils/                                  # Resolución de rutas, elegibilidad, proyecciones/relaciones
public/                                   # Solo assets deliberadamente públicos, nunca fuentes internas
.github/workflows/                        # CI por definir durante implementación autorizada
astro.config.*                            # Forma concreta compatible con versiones/adaptador
tsconfig.json                             # strict
wrangler.*                                # Formato/configuración concretos por validar
package.json                              # Versiones y scripts reales se fijarán en desarrollo
```

No exige siete colecciones físicas: pequeños datos institucionales pueden residir juntos y las colecciones deben usar loaders/esquemas compatibles con la versión seleccionada. No inventar un DSL de secciones, un componente genérico que renderice toda la web por ID ni una librería visual de cero. Una página Astro puede componer varias secciones con los mismos componentes de texto, atributos, enlaces o entidades. JSON para estructura, Markdown para narrativa; evitar duplicación manual de datos entre resumen y ficha.

**React Islands:** justificación por interacción concreta, no por cada card/listado o formulario. Navegación/lectura y páginas institucionales no requieren hidratación por defecto. **Infraestructura:** Workers con Static Assets es el destino aprobado, no Pages; elegir estrategia de salida/adaptador/CI posteriormente, sin asumir que el formulario obliga a SSR en todo el sitio o a una base de datos. Nada de esta recomendación crea endpoints o políticas de seguridad.

## 15. Validación documental y entrega

**Criterios de esta preparación, distintos de las pruebas futuras de §13:** archivo único en la ubicación indicada; 52 filas de matriz en el orden exacto de E2; ocho páginas y dos tipos; localizadores E2 por sección y referencias E1/EST/decisiones reales; siete modelos conceptuales sin nuevas instancias; navegación/formulario/WhatsApp/reclutamiento/colecciones contrastados con E221-C; dependencias locales y propuestas separadas de aprobaciones. No nuevas consultas web/SEO, consumo OpenSEO, implementación, instalación, edición de fuentes, commit o push.

Se verifican además tablas Markdown, enlaces relativos/anclas, títulos de la matriz contra E2, huellas de fuentes y `git diff --check`. El control de enlaces es documental local; no se declara nueva verificación HTTP de Luma o futuros destinos. Build, pruebas de UI, accesibilidad implementada y recepción real del formulario **no aplican todavía** a esta entrega documental y permanecen en §13.

**Resultado de validación de esta entrega:**

| Control ejecutado | Resultado |
|---|---|
| Archivo y alcance | Solo se añade `docs/implementation/content-handoff.md`; 168 archivos preexistentes comparados por SHA-256 permanecen idénticos, incluidos E1/E2, estrategia, Research y skill |
| Matriz contra E2 | 52 IDs únicos, mismo orden y títulos H2 por bloque; ocho páginas y dos tipos; 11 columnas por fila, sin pérdida de campos de implementación |
| Datos/modelos | Siete modelos lógicos, 15 personas canónicas sin duplicación; ocho H1 de página y reglas de fichas contrastados con E2; ninguna nueva instancia de producto, investigación, programa o iniciativa |
| Enlaces y tablas | 65 referencias locales definidas con destino real y anclas válidas; 34 tablas con columnas coherentes; sin whitespace final |
| Controles E2 existentes | `python -B content/internal/04-feedback/validar-e2.py` sin generación: OK, 52 secciones, 15 personas, metadata/CSV/enlaces y 150 fuentes protegidas; no modifica entregables |
| Git y archivo nuevo | `git diff --check`: sin errores. Control adicional `git diff --no-index --check /dev/null docs/implementation/content-handoff.md`: sin diagnósticos de whitespace; el código 1 indica diferencias por archivo nuevo, no certificación técnica |
| Revisión de contrato | Comunidad/Academy/Empresas/equipo/colecciones y dependencias contrastados con E221-C; propuestas técnicas rotuladas, políticas/recepción/despliegue no supuestos; lectura editorial final sin reescribir copy aprobado |

No se ejecutaron build, pruebas de frontend o despliegue porque solo se ha creado documentación. La suficiencia del handoff se revisó siguiendo el recorrido de una página, sus datos, visibilidad, destino y prueba de aceptación hasta su fuente. La revisión humana fue favorable; el encargo «AI PlayGrounds — Ajustes finales del Content Handoff» autoriza marcarlo aprobado para traspaso tras incorporar las precisiones de §1.2 y §5.1.

**Estado de salida:** **APROBADO para traspaso a desarrollo** como especificación de entrada para el siguiente proceso; esta aprobación no autoriza automáticamente despliegue ni publicación. Las recomendaciones técnicas PROPUESTAS no adquieren aprobación por aparecer aquí; datos PENDIENTES no se dan por recibidos. E1 y E2 continúan siendo las fuentes de verdad y no han sido reescritos.

[e1]: ../../content/entregables-cliente/01-direccion-contenido-estructura/direccion-contenido-estructura-web.md
[e2]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md
[est]: ../../content/internal/03-estrategia/estrategia-contenido.md
[dec]: ../../content/internal/04-feedback/feedback-e2.md
[dos]: ../../content/internal/03-estrategia/dossier-evidencia-estrategica.md
[his]: ../../content/internal/03-estrategia/evidencia-historica-e21.md
[res]: ../../content/internal/02-research/research.md
[km]: ../../content/internal/02-research/keyword-map.md
[q]: ../../content/internal/02-research/preguntas-2026-11-05/matriz.md
[tr]: ../../content/internal/04-feedback/trazabilidad-e2.csv
[qp]: ../../content/internal/04-feedback/preguntas-e2.csv
[qa]: ../../content/internal/04-feedback/validacion-e2.md
[her]: ../../content/internal/01-brief-diagnostico/decisiones-heredadas.md
[e2-i1]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#i1--presentación-institucional
[e2-i2]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#i2--propósito-y-comunidad
[e2-i3]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#i3--cuatro-verticales
[e2-i4]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#i4--actividad-y-trabajo
[e2-i5]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#i5--iniciativas-y-oportunidades
[e2-i8]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#i8--acércate-a-ai-playgrounds
[e2-f1]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#f1--ai-academy-y-punto-de-partida
[e2-f3]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#f3--líneas-de-aprendizaje
[e2-f4]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#f4--oferta-y-condiciones-actuales
[e2-f6]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#f6--formación-para-equipos
[e2-f5]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#f5--estado-y-siguiente-paso
[e2-em1]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#em1--ai-playgrounds-para-organizaciones
[e2-em2]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#em2--cuatro-verticales-y-ámbitos-de-aplicación
[e2-em3]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#em3--capacidades-y-experiencia-acreditadas
[e2-em4]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#em4--productos-iniciativas-y-oportunidades
[e2-em5]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#em5--ai-academy-para-equipos
[e2-em6]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#em6--conversemos-sobre-tu-contexto
[e2-c1]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#c1--propósito-y-participación
[e2-c3]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#c3--actividades-y-encuentros
[e2-c4]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#c4--vías-y-condiciones-de-participación
[e2-c6]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#c6--acceso-a-comunidad-general
[e2-c7]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#c7--interés-en-colaborar
[e2-b1]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#b1--ai-labs
[e2-b2]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#b2--qué-se-explora-y-cómo-se-relaciona
[e2-b3]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#b3--iniciativas-y-productos-tempranos
[e2-b4]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#b4--productos-e-investigación
[e2-b5]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#b5--participación-y-continuidad
[e2-dp1]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#dp1--universo-y-criterios
[e2-dp2]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#dp2--exploración
[e2-dp3]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#dp3--productos-de-la-colección
[e2-dp4]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#dp4--conoce-ai-playgrounds-y-aporta-un-producto
[e2-di1]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#di1--universo-y-tipos
[e2-di2]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#di2--exploración
[e2-di3]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#di3--trabajos-de-la-colección
[e2-di4]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#di4--conoce-ai-playgrounds-y-propone-un-trabajo
[e2-e1]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#e1--quiénes-sostienen-ai-playgrounds
[e2-e2]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#e2--cómo-nos-organizamos-para-trabajar
[e2-e3]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#e3--personas-y-aportes
[e2-e4]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#e4--participa-y-conoce-nuestro-trabajo
[e2-p1]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#p1--identificación
[e2-p2]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#p2--problema-público-y-límites
[e2-p3]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#p3--clasificación-y-relación-con-ia
[e2-p5]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#p5--creación-y-procedencia
[e2-p6]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#p6--estado-y-uso
[e2-p7]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#p7--acceso-licencia-y-fuentes
[e2-p9]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#p9--relaciones-y-continuidad
[e2-r1]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#r1--identificación-y-pregunta
[e2-r2]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#r2--autoría-procedencia-y-estado
[e2-r4]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#r4--enfoque
[e2-r5]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#r5--resultados-y-límites
[e2-r6]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#r6--recursos-originales
[e2-r7]: ../../content/entregables-cliente/02-contenido-web/contenido-web.md#r7--relaciones-y-continuidad
