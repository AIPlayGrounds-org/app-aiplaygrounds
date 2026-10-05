# Research de búsqueda y Keyword Map

El research estratégico/SEO formal parte **explícitamente de B1** y nunca de B0. Durante Gate A, solo ante petición explícita del usuario, se permite una verificación pública puntual de una incógnita concreta para ayudarle a decidir. Esa operación devuelve evidencia y propuesta/inferencia, termina en decisión humana y no produce B1, aprobación, clusters o Keyword Map automáticamente; no es el research descrito aquí. Ajusta esfuerzo al alcance/ticket y solo investiga formalmente cuando la evidencia pueda cambiar una decisión material. Principio rector: **no investigues para acumular evidencia; investiga para resolver decisiones**. Registra el preflight general y la vista consolidada en [`../assets/internal-strategy-evidence.md`](../assets/internal-strategy-evidence.md). Antes de ese research conserva `decisión | pregunta | mercado/idioma | fuente/instrumento | criterio de cierre`. La entrada normal no requiere CRM, Analytics, ventas, entrevistas ni otras fuentes privadas.

## Research Preflight general

Son dos ejes independientes. Antes de research formal, registra por decisión la **pertinencia** de cada fuente como `USAR` o `OMITIR — no puede cambiar esta decisión`. Para las fuentes pertinentes registra por separado su **estado operativo** como `LISTO`, `FALTA BASE RESPONSABLE`, `NO DISPONIBLE`, `REQUIERE INPUT DEL USUARIO`, `EJECUTADO` o `ERROR OBSERVADO`. No confundas una fuente pertinente pero temporalmente no ejecutable con una fuente irrelevante. No inventes estados; si falta un input concreto del usuario, identifícalo. La herramienta disponible no se usa por rutina. No crea gate humano.

| Pregunta decisional | Fuente | Pertinencia | Estado operativo | Mercado/idioma o periodo | Criterio de cierre |
|---|---|---|---|---|---|

Para una fuente omitida, el estado operativo es `—` porque no corresponde ejecutar. Ejemplos: Planner pertinente con seeds todavía no responsables = `USAR / FALTA BASE RESPONSABLE`; Trends irrelevante = `OMITIR — no puede cambiar esta decisión / —`; Trends pertinente que necesita CSV = `USAR / REQUIERE INPUT DEL USUARIO`; herramienta pertinente no instalada = `USAR / NO DISPONIBLE`; ejecución completada o fallida = `USAR / EJECUTADO` o `USAR / ERROR OBSERVADO`.

Planner informa lenguaje de búsqueda, ideas, señal aproximada de demanda y comparación de términos. No prueba por sí solo prioridad estratégica, intención completa, arquitectura, dificultad SEO, naming adecuado, necesidad de página ni calidad comercial. `avg_monthly_searches` es aproximado; `ads_competition` es competencia publicitaria.

Websearch descubre resultados actuales; webfetch profundiza una URL pertinente que haya sido (a) aportada explícitamente por el usuario, (b) conocida/documentada como fuente primaria pertinente, o (c) descubierta mediante websearch. No obligues a websearch a redescubrir una URL conocida. Para búsqueda de mercado, websearch descubre y webfetch profundiza selectivamente; listar URLs no es síntesis. No uses webfetch como sustituto del descubrimiento, no construyas/fetchees URLs de buscadores, no fabriques SERPs ni afirmes Top 10 sin fuente que lo garantice. Un fetch directo de una fuente conocida permite probar un hecho específico sobre ella; las conclusiones amplias aún requieren triangulación independiente. Si Planner es pertinente y se usará web, conserva la precedencia: preflight → intento real Planner → interpretar señal → seleccionar preguntas/clusters → websearch → webfetch selectivo → contraste. Esto no convierte Planner en fuente universalmente prioritaria: para intención/terminología, web puede ser más decisional.

Si webfetch no recupera el contenido (p. ej., bloqueo, 404 o error), registra el error y no afirmes el hecho como verificado a partir del slug, nombre de URL o snippet insuficiente. Para una pregunta factual específica, responde que no pudo confirmarse con ese fetch; solo usa otra fuente primaria conocida o un websearch de respaldo si hace falta descubrir una fuente alternativa pertinente.

Trends es opcional y no se consulta ni pregunta por rutina. Úsalo si tendencia, crecimiento/caída, estacionalidad, geografía relativa, comparación temporal o búsquedas relacionadas podrían cambiar una decisión. Si es material pero requiere export, registra `USAR / REQUIERE INPUT DEL USUARIO`, solicita puntualmente el CSV y continúa lo demás; si no llega, registra limitación explícita, salvo que sea indispensable para resolver esa decisión. Si no hay decisión temporal, registra `OMITIR — no puede cambiar esta decisión` y estado operativo `—`. GSC solo con propiedad existente y datos aportados o acceso válido; describe el comportamiento de esa propiedad/periodo, no demanda total, dificultad SEO ni research de mercado completo. Sitio nuevo: `OMITIR — no puede cambiar esta decisión`; no preguntar.

El dossier interno conserva preflight, consultas, mercados, fechas, fuentes, resultados, límites y Decision Delta. E1 muestra únicamente `conclusión → razón suficiente → límite material` si es necesario para comprender/aprobar.

## 1. Keywords semilla

Deriva un conjunto corto y explicable desde organización, oferta real, público, problema/necesidad, tarea y lenguaje disponible del cliente. Trabaja con el nivel más específico confirmado disponible: si hay categorías pero no productos nombrados, investiga las categorías; si hay un servicio pero no sus variantes, investiga el servicio; si hay un área formativa pero no cursos listados, investiga el área. La falta de detalle de un nivel inferior reduce la granularidad y deja ese nivel pendiente; no cancela el research superior válido ni autoriza inventar los elementos faltantes.

Una seed puede ser una **formulación de búsqueda exploratoria derivada de hechos confirmados** y no necesita aparecer literalmente en el brief. Por ejemplo, negocio de organización del hogar + categoría Cocina + mercado Perú/español puede sustentar seeds como `organizadores de cocina` y `organización de cocina`. Registra cada seed con su motivo, mercado/idioma y estado **SEED DE INVESTIGACIÓN**; no la presentes como hecho confirmado, oferta aprobada, categoría oficial, copy público, cluster aprobado ni propuesta ya aceptada. Las seeds no pueden introducir productos o servicios no confirmados, capacidades nuevas, públicos contradictorios ni mercados distintos de los definidos.

No fabriques una lista masiva de combinaciones ni uses sinónimos sin intención diferenciada. Anota seed, motivo y mercado/idioma.

## 2. Ejecutar `seo-keywords` cuando pueda cambiar una decisión

Evalúa primero si demanda aproximada o ideas de keywords pueden cambiar una decisión concreta del research: por ejemplo, priorizar servicios/categorías/productos, determinar si un producto tiene intención propia, explorar clusters o contrastar prioridades SEO. Si no pueden cambiar la decisión —por ejemplo, se interpreta un CSV de Search Console ya aportado sin explorar nuevas oportunidades, se hace QA editorial, análisis de voz o feedback localizado— no ejecutes la herramienta por rutina.

Cuando sí sea pertinente, comprueba la disponibilidad mediante el comando `seo-keywords` en el PATH del entorno. Si está disponible, ejecuta una consulta real al menos una vez con un conjunto acotado de seeds pertinentes derivadas del nivel confirmado más específico disponible y el mercado/idioma correctos; no concluyas que falla antes de probarlo. Por ejemplo, categorías confirmadas de ecommerce son base suficiente para consultar términos exploratorios de categoría aunque falten subcategorías/productos concretos. `command -v seo-keywords` y `seo-keywords --help` solo comprueban disponibilidad/conocen opciones: no cuentan como intento de investigación. `seo-keywords` es una dependencia local externa: no la instales, implementes, copies ni simules. Inspecciona `seo-keywords --help` si necesitas conocer opciones; no inventes flags.

No declares ausencia de datos de Keyword Planner sin haber intentado la herramienta cuando era pertinente y estaba disponible. Si no está en el PATH, informa que no está disponible. Si el intento falla por autenticación, permisos, configuración, red u otra dependencia externa, registra el fallo observado, no intentes reparar la infraestructura como parte del workflow, no simules métricas y continúa con las fuentes disponibles, limitando explícitamente las conclusiones afectadas. No repitas el mismo intento fallido durante esa etapa salvo que el usuario haya corregido el entorno. Si no acepta el mercado requerido, informa el límite y no atribuyas los resultados a otro mercado.

Conserva resultados recibidos de forma que puedan rastrearse a seed, fecha, mercado e instrumento. La salida puede incluir `keyword`, `avg_monthly_searches`, `ads_competition`.

- `avg_monthly_searches`: señal aproximada de demanda del planificador, no promesa de tráfico, precisión de búsquedas exactas ni medida de prioridad por sí sola.
- `ads_competition`: competencia de anunciantes en Google Ads. **No es dificultad SEO orgánica** y no debe recibir ese nombre ni usarse como sustituto.
- Ausencia de campo/valor: desconocido, no cero.

## 3. Limpiar y filtrar

Descarta o marca términos fuera de oferta, público/mercado o capacidad real; ruido semántico de la herramienta; ambigüedad sin valor; duplicados conceptuales; variantes que no cambian necesidad/intención. Conserva una nota breve del criterio cuando el descarte sea material. No confundas la oferta de competidores con algo que el cliente ofrece.

## 4. Clustering, intención y ownership

Agrupa por necesidad sustancial e intención, no por coincidencia literal. Principio: `necesidad/intención diferenciada → cluster → una página responsable principal`. Las intenciones pueden ser informativa, comercial/consulta, comparativa, transaccional, navegacional, local o mixta; explícalas en lenguaje sencillo. **Una keyword no equivale a una página.** Un cluster puede carecer de URL propia si no hay necesidad diferenciada.

Distinciones: **keyword** es expresión de búsqueda; **seed** es expresión exploratoria responsable que inicia investigación; **necesidad** es lo que la persona necesita resolver; **intención** es el propósito de búsqueda; **cluster** agrupa expresiones por necesidad/intención; **topic** es concepto/dominio semántico cubierto, solo si añade claridad; **página responsable** concentra respuesta principal dentro del alcance. El Keyword Map ya representa temas mediante necesidad/cluster: añadir `topic (opcional)` a sus filas únicamente cuando aclare un concepto transversal o desambigüe; no renombrar clusters ni crear Topic Map redundante. Un topic puede abarcar varios clusters con intenciones distintas; no genera URL automáticamente.

Desde el ownership aceptado, Estrategia enlaza entidades, preguntas y sección/bloque/campo responsables, claims/evidencia, relaciones y handoffs según [`seo-ai-editorial.md`](seo-ai-editorial.md). No añadas registros completos de entidades o claims al Keyword Map ni atribuyas preguntas del brief a research no ejecutado.

### Governance por formato y tipo de sitio

- **One Page y landing** (sitio de una sola página): un cluster primario por defecto; puede cubrir keywords/subtemas de la misma necesidad. Añade 1–2 secundarios solo si son estrechamente compatibles con necesidad, intención y recorrido. No intentes posicionar una URL para clusters independientes. Prioriza/documenta otras oportunidades sin reabrir alcance.
- **Multipágina:** `cluster diferenciado → URL responsable principal`; no uses fórmula “n páginas × n clusters” ni exijas cluster propio a cada página. Corporativa: línea de negocio → servicio → apoyo informativo; home comunica propuesta global y solo toma cluster amplio con oportunidad real. Nosotros/contacto/legal no requieren cluster comercial. Academia: área formativa → programa/curso → apoyo informativo. Ecommerce: categoría → subcategoría → producto con intención propia → informativo/comparativo. Directorio: tipo/categoría → especialidad o geografía solo con intención diferenciada → ficha individual. Publicación: tema/hub → subtema cuando aplique → artículo/guía con intención propia.
- **Filtro ≠ cluster ≠ página SEO.** No generes combinaciones indexables por filtros automáticamente en ecommerce ni directorios.

Para cada cluster con ownership material registra en Keyword Map: `cluster | nivel | necesidad | intención | keywords representativas | señal/evidencia | prioridad | página responsable propuesta | relación padre/hijos | riesgo de solapamiento | implicación estratégica | estado`. La evidencia de categoría puede sustentar priorizar/explorar esa categoría y sugerir posibles subtemas; sin nombres y evidencia del catálogo no sustenta afirmar que un producto concreto merece URL propia. Registra la evaluación de productos concretos como pendiente hasta disponer del catálogo y evidencia de intención. Cuando se acepte en Gate B, B2 debe incluir explícitamente la síntesis de los elementos aprobados que condicionarán O/C, estrategia y arquitectura: cluster, nivel, necesidad, intención, keywords representativas, señal/evidencia, prioridad, página responsable, padre/hijos si existen, riesgo de solapamiento cuando aplique, implicación estratégica aprobada y estado. Keyword Map contiene el detalle completo; B2 no lo duplica. Sin clusters justificados, no inventes ninguno.

Para clusters prioritarios usa las capacidades web disponibles en OpenCode cuando el contraste pueda aclarar intención o cambiar arquitectura:

1. `seo-keywords` aporta demanda aproximada e ideas de términos.
2. Selecciona clusters relevantes según necesidad, mercado, evidencia y posibilidad de cambiar una decisión; no busques cada keyword de forma indiscriminada.
3. Cuando el contraste web aporte a la decisión y la herramienta esté disponible, descubre resultados con la herramienta OpenCode `websearch`, usando consultas del cluster. Si Planner es pertinente, hay seeds responsables y `websearch` se va a utilizar, la consulta real requerida de `seo-keywords` debe haber terminado con resultados o con un fallo real registrado antes de iniciar `websearch`; interpreta/refina la señal antes de ese contraste. Comprobar disponibilidad o usar `--help` no cuenta como intento real. No simules búsquedas construyendo URLs de motores de búsqueda y pasándolas a `webfetch`, ni fabriques SERPs.
4. Profundiza con `webfetch` URL específicas pertinentes aportadas por el usuario, conocidas/documentadas como fuentes primarias o descubiertas con `websearch`. Para descubrir fuentes de mercado usa `websearch` primero; 1–2 fetches puede bastar para contraste ligero, pero no es máximo universal. No fetchees SERPs ni URLs construidas de buscadores. Si `websearch` no está disponible, informa la limitación para discovery de mercado; puede hacerse fetch de URL conocida/aportada, pero no presentarlo como descubrimiento ni como triangulación amplia.
5. Sintetiza qué evidencia observaste y qué inferencia de intención o formato permite; registra consulta/método, mercado e instante de observación cuando esté disponible. Separa hechos del sitio fuente e inferencias propias.

Cuando Planner está `USAR / LISTO` y se utilizará websearch, la consulta real de `seo-keywords` debe completarse antes de iniciarlo: recibe datos o registra el error real, interpreta/refina la señal y luego comienza websearch. No uses websearch mientras el Planner pertinente y listo esté pendiente. Si Planner se omite, está `FALTA BASE RESPONSABLE`, `NO DISPONIBLE` o requiere input, la precedencia no obliga a ejecutarlo; websearch puede usarse si aporta a la decisión. Flujo cuando aplica: `preflight (pertinencia + estado operativo) → intento real Planner → resultado/error observado → clusters/preguntas relevantes → websearch para discovery → webfetch selectivo de URLs pertinentes → contraste`. La búsqueda web no sustituye datos de Planner; si Planner falla, no presentes evidencia web como si incluyera volúmenes. No simules ejecución.

Describe el trabajo como “resultados web actuales”, “contraste de intención” o “evidencia observada”. No afirmes que viste literalmente el “Top 10 de Google” salvo que la fuente utilizada garantice explícitamente que esos resultados son del Top 10 de Google.

## 5. Fuentes complementarias

- **Google Trends:** opcional. Úsalo solo si comparación, tendencia, crecimiento/caída, estacionalidad, geografía o búsquedas relacionadas podrían cambiar una decisión. CSV exportado por el usuario es suficiente para análisis. Su índice es interés relativo/normalizado dentro de escala y filtros elegidos, no volumen absoluto; no comparar series sin revisar configuración.
- **Google Search Console:** solo para web previa con CSV/XLSX aportado (queries, impresiones, clics, CTR, posición, páginas). Úsalo como evidencia de la propiedad; periodo, filtros, anonimización y alcance importan. No es demanda completa del mercado ni auditoría SEO técnica.
- Fuentes externas adicionales solo se incorporan cuando el usuario las proporciona o solicita explícitamente y pueden aportar evidencia relevante a una decisión. Se tratan como evidencia complementaria, no como dependencias del workflow.

## 6. Priorizar, proponer y gobernar decisiones

Cruza, cuando haya evidencia: relevancia de negocio; necesidad; intención; demanda aproximada; capacidad real de satisfacerla; mercado; evidencia del cliente; contexto web observado. No ordenes solo por volumen. Muestra la incertidumbre y el motivo de prioridad.

Keyword Map interno conserva `cluster | nivel | necesidad/intención | keywords representativas | evidencia/métrica y límites | prioridad/motivo | página responsable propuesta | relación padre/hijos | riesgo de solapamiento | implicación estratégica | estado/cobertura/destino/pendiente`. Research presenta evidencia, observaciones y **propuestas de conclusión**, no decisiones aprobadas. Tras revisión humana incorpora solo conclusiones aceptadas en B2; rechazo/corrección queda registrado y ninguna salida del instrumento altera B2 automáticamente. El Entregable 1 muestra clusters y conclusiones comprensibles, no cientos de términos.

## Triangulación, calidad, profundidad y cierre

Una fuente primaria puede probar un hecho específico sobre esa fuente (p. ej., que su producto tiene cierto nombre). Por sí sola no generaliza significado, uso de mercado, intención, adopción, práctica común ni conveniencia terminológica. Para conclusiones amplias triangula fuentes pertinentes e independientes, conserva desacuerdos y no fuerces consenso.

Evalúa relevancia, autoridad, independencia real, mercado/idioma, actualidad cuando importe y diversidad necesaria. Páginas que copian una misma fuente no equivalen a evidencia independiente. Para roles/términos pueden aportar empresas, ofertas laborales, documentación profesional/técnica, educación y comunidades, según la pregunta.

Adapta profundidad a la afirmación: un hecho específico puede bastar con una fuente primaria; contraste ligero, varias referencias observadas y 1–2 lecturas profundas; conclusión material de mercado/terminología, muestra de varias fuentes independientes y pertinentes. 3–5 fuentes de calidad es un punto de partida heurístico, no cuota universal. Triangula hasta confianza suficiente o saturación razonable. Antes de ampliar, pregunta si una nueva fuente/consulta/mercado/instrumento puede razonablemente cambiar, descartar, precisar o aumentar materialmente la confianza de una decisión pendiente. Si no, detén y registra criterio de cierre; si la evidencia sigue insuficiente o contradictoria, continúa proporcionalmente o marca `INCONCLUSO`.

## Decision Delta obligatorio

Al finalizar research de cada pregunta/decisión material registra `decisión inicial | evidencia | conclusión | Decision Delta | consecuencia`, con exactamente uno de estos tokens: `CAMBIA`, `CONFIRMA`, `DESCARTA` o `INCONCLUSO`. Usa el mismo token en la respuesta de research/Gate B y en el Dossier; una paráfrasis, `Delta 0`, `PRECISA` u otra categoría no lo sustituye. No atribuyas origen al research cuando la decisión ya estaba en alcance, brief, oferta real o decisión humana: evidencia compatible es `CONFIRMA`. Las conclusiones son propuestas hasta Gate B/B2 salvo decisión humana vinculante posterior. No presentes fuentes/logs completos automáticamente al cliente.

Keyword Map interno conserva `cluster | nivel | necesidad/intención | keywords representativas | evidencia/métrica y límites | prioridad/motivo | página responsable propuesta | relación padre/hijos | riesgo de solapamiento | implicación estratégica | estado/cobertura/destino/pendiente`. Research presenta evidencia, observaciones y **propuestas de conclusión**, no decisiones aprobadas. Tras revisión humana incorpora solo conclusiones aceptadas en B2; rechazo/corrección queda registrado y ninguna salida del instrumento altera B2 automáticamente. E1 muestra conclusión y razón suficiente, no cientos de términos; el volumen de investigación no infla E1. Registra Decision Delta antes de sintetizarlo.

## 7. Estado operativo de Keyword Planner

Pertinencia y operación son ejes distintos. Si ninguna decisión depende de demanda/ideas, registra Planner `OMITIR — no puede cambiar esta decisión`; no aplica estado operativo. Si Planner sí puede cambiar una decisión, registra pertinencia `USAR` y:

1. Si faltan seeds derivables responsablemente de hechos confirmados, estado operativo `FALTA BASE RESPONSABLE`; no inventes oferta. Si hay una pregunta/decisión humana concreta necesaria para establecer una seed, pide solo ese dato y usa `REQUIERE INPUT DEL USUARIO` cuando la ejecución dependa realmente de él.
2. Comprueba disponibilidad. Si no está instalada, estado `NO DISPONIBLE`. Si está disponible y hay seeds responsables más país/idioma correctos, estado `LISTO`; `command -v` y `--help` comprueban disponibilidad/opciones, no son investigación.
3. Ejecuta una consulta real: si devuelve datos, `EJECUTADO`; si falla, `ERROR OBSERVADO` y registra el error, sin reparar ni repetir en esa etapa.

Si Planner está `USAR / LISTO` y se utilizará websearch, ejecuta Planner antes de websearch; espera resultado o error observado, interpreta la señal y luego descubre resultados. Esta precedencia no aplica cuando Planner se omite o no está listo por falta de base. Nunca conviertas una seed o idea de Planner en producto, servicio, mercado, página o cluster aprobado: para B2 hace falta decisión humana.

## 8. Research AEO/GEO decisional

No ejecutar por rutina en cada proyecto. Los contratos generales vigentes y fuentes de [`seo-ai-editorial.md`](seo-ai-editorial.md) cubren la base; investigar solo si puede cambiar una decisión específica: desambiguación de entidad/relación, realidad del objeto para Schema candidato, función/control de crawler pertinente o disponibilidad/alcance de una señal posterior. Conservar preflight, criterio de cierre, procedencia, estados y Decision Delta. Planner se omite si demanda/ideas no cambian esa pregunta; no convertir una consulta documental en research de keywords.

Prioridad para afirmaciones sobre motores y prácticas: (1) documentación oficial del motor/plataforma; (2) documentación técnica primaria, incluido vocabulario Schema.org; (3) papers académicos; (4) referentes reconocidos; (5) fuentes secundarias como apoyo. Para hechos de entidad/oferta, fuente primaria del objeto o autoridad del proyecto. No usar artículos SEO genéricos como autoridad si existe fuente primaria pertinente. Las fuentes oficiales/primarias conocidas pueden fetchearse directamente bajo el contrato vigente; son fuentes del research decisional, no un input externo obligatorio ni una autorización de acceder a datos privados. Fuentes complementarias adicionales mantienen las condiciones de §5.

Clasificar cada soporte material, sin confundir con estado humano de aprobación:
- **práctica soportada oficialmente:** el proveedor documenta práctica/requisito para su experiencia; delimitar plataforma y vigencia, no extrapolar ni convertir recomendación en garantía.
- **evidencia académica:** registrar método, dataset, motor/versión, resultado y límites de generalización; no transformar correlación o benchmark en regla universal.
- **recomendación inferida:** razonamiento editorial derivado de evidencia, con base y límite explícitos; nuestros modelos/ownership/readiness son contratos metodológicos de esta clase.
- **práctica experimental:** hipótesis o ensayo sin soporte suficiente; no requisito por defecto ni claim de eficacia. Si se propone un ensayo solicitado, identificar incertidumbre y verificación posible, sin inventar observabilidad ni crear monitoring obligatorio.

Concentrar consecuencias en Estrategia, fuentes/historia/limitaciones en Dossier y síntesis material en E1. Si la fuente no aclara control de un bot, rango de propiedad o métrica, conservar PENDIENTE/INCONCLUSO, no inferir desde nombre. La decisión sobre entrenamiento pertenece al propietario. No investigar para conseguir una promesa de ranking/citación ni sustituir el workflow por recetas GEO.
