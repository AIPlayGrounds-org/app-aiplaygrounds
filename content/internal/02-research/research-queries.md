# Research v2 · registro de consultas

**Inicio:** 04/11/2026. **Base:** B1 aprobada y encargo Prompt 2. Interno; evidencia no equivale a aprobación de conclusiones.

**Estado actual, 05/11/2026:** Gate B APROBADO por GB22,con límites de [Research R11](research.md#r11-gate-b-aprobado-y-precisiones-de-aplicación). Reconstrucción en R2 y complemento en R3:1.671 y650 créditos respectivamente, separados de296 anteriores. La revisión B2/Estrategia/E1 v2.2 no ejecuta investigación ni llamadas MCP/web y consume0 créditos nuevos; saldo no reconsultado. Los estados pendientes en los logs siguientes describen cortes históricos.

## Preflight anterior a consultas de mercado

| Decisión que puede cambiar | Pregunta | Mercado/idioma | Fuente/instrumento | Criterio de cierre |
|---|---|---|---|---|
| D1 Identidad y participación | ¿Qué distingue entender una organización, participar y comprar formación? | PE/MX/CO, es; referentes globales como contraste, no métricas nacionales | Planner, websearch, lectura primaria; v1 reutilizada | Separar tareas, condiciones de participación y evidencia institucional sin añadir páginas |
| D2 Verticales | ¿Cómo explicar Foundations, Software, Science y Finance sin confundir campos, cursos o servicios? | PE/MX/CO, es | Planner y fuentes temáticas primarias | Identificar intención/ambigüedades y contenido pertinente a campos confirmados, no inventar oferta |
| D3 Academy | ¿Qué necesidades distinguen AI Engineering, Software with AI y formación genérica? | PE/MX/CO, es | Planner, v1 y contraste web selectivo | Orientación por tareas y estados reales; sin convertir formación en identidad global |
| D4 Labs y colecciones | ¿Cómo se descubre trabajo temprano frente a herramientas y trabajos de terceros? | PE/MX/CO, es; referentes de plataformas | Planner, websearch, fuentes primarias, v1 | Separar iniciativa/colección/objeto, procedencia y conversión posible |
| D5 Organizaciones y diferenciación | ¿Qué oportunidades de relación existen en los referentes y cuáles caben sin inventar capacidades? | Referentes LATAM/globales; usuarios PE/MX/CO-es | Web y B1 | Distinguir referencia editorial, competidor de búsqueda y competidor comercial; nuevas capacidades quedan pendientes |
| D6 SEO/AEO/GEO | ¿Qué preguntas/entidades necesitan contexto y qué evidencia existe sobre visibilidad IA? | Sitio español/LATAM; documentación oficial de plataforma | Referencia SEO/IA y lectura primaria si es decisional | Criterios editoriales trazables, sin transformar demanda Google en demanda de asistentes |

| Fuente | Pertinencia | Estado operativo al preflight | Uso o motivo |
|---|---|---|---|
| Evidencia v1 compatible | USAR | EJECUTADO | Lectura de evidencia reutilizada, observada 29/09 y adendas de octubre; no llamada nueva ni aprobación de prioridades v1 |
| Google Keyword Planner / `seo-keywords` | USAR | LISTO | Ruta observada `/home/edhu/.local/bin/seo-keywords`; ayuda de CLI leída. Intento real antes de websearch |
| OpenSEO MCP research | USAR | REQUIERE INPUT DEL USUARIO | Sin proyecto identificable ni dominio confirmado; tarifas aproximadas sin conversión USD/crédito ni máximo acotable. Continuar alternativas sin bloquear |
| Websearch y webfetch | USAR | LISTO | Discovery y lecturas selectivas después del intento Planner; resultados web actuales, no SERP nacional garantizada |
| Google Trends | OMITIR — no puede cambiar esta decisión | — | No se decide estacionalidad o calendario de lanzamiento |
| Search Console | OMITIR — no puede cambiar esta decisión | — | Sin propiedad o datos aportados; no hay base para medir rendimiento propio |
| Checks de respuestas IA / tracking | OMITIR — no puede cambiar esta decisión | — | No solicitados; no son necesarios para investigación editorial y no se activan |

## O0 · OpenSEO: identidad, condiciones y consumo

Consulta gratuita `whoami`: conectado, modo hosted, saldo **9.787 créditos**. El plan de pago consta por declaración del usuario; esa respuesta no verifica nombre/tarifa del plan. `list_projects` devuelve un único proyecto **Default**, dominio null, mercado 2840/en (US/en según la descripción de catálogo). No se selecciona como AI PlayGrounds ni se lee su contexto, research log o caché: identidad sin acreditar. No se crea proyecto ni se actualiza configuración remota.

El catálogo de `research_keywords` describe aproximadamente 54 créditos por seed al límite habitual, 110 a 500 resultados, fallback adicional aproximado 40/95; algunos mercados Google Ads, aproximadamente 96. Clickstream duplica costo y el enriquecimiento local lo aumenta. Son **estimaciones de catálogo, no un máximo garantizado**. No se encontró un estimador pertinente de keyword/SERP research o tope monetario server-side; los estimadores de tracking no estiman esta tarea. No se infiere USD/crédito desde la suscripción o saldo.

**Autorización:** Prompt 2, máximo US$2 para esta intervención. **Reserva pagada:** 0. **Llamadas pagadas ejecutadas:** 0. **Consumo atribuible:** 0 créditos / US$0 por no ejecutar endpoints de pago; no por imputar cero a campos omitidos. Solo comprobaciones gratuitas de cuenta/proyectos y descubrimiento de schemas. `whoami` final vuelve a informar **9.787 créditos**, sin variación observada. Estimación monetaria de un lote nuevo: **desconocida**; no se ejecuta un lote para averiguar su precio. No hay solicitudes pendientes/no conciliadas.

Para una futura adquisición MCP harían falta identidad inequívoca del proyecto (o dominio y autorización para crearlo), mercado explícito y tarifa/costo máximo verificable dentro del presupuesto. No se cambia a US/en para usar el Default. Esta limitación no se sustituye por KD o CPC ficticios en Planner/web.

## P · Keywords semilla responsables

Todas tienen estado **SEED DE INVESTIGACIÓN**, no nombres de ofertas nuevas ni clusters aprobados. Se usarán PE, MX y CO por separado, `es`, sin ciudades, sin agregado LATAM ni métricas de asistentes. Máximo CLI observado: 20 seeds únicas por consulta.

| Conjunto | Seeds exactas en orden | Derivación / decisión |
|---|---|---|
| P-A | comunidad de inteligencia artificial; organizaciones de inteligencia artificial; proyectos de inteligencia artificial; fundamentos de inteligencia artificial; investigación en inteligencia artificial; inteligencia artificial para investigación científica | Comunidad, identidad, participación, Foundations y Science confirmados; distinguir conceptos, actividad y cursos |
| P-B | desarrollo de software con inteligencia artificial; programación con ia; AI Engineering; Software with AI; inteligencia artificial en finanzas; inteligencia artificial aplicada a finanzas | AI for Software y Finance y dos líneas confirmadas; separar tarea, aplicación y formación |
| P-C | curso de inteligencia artificial; formación en inteligencia artificial; capacitación inteligencia artificial empresas; herramientas de inteligencia artificial; productos de inteligencia artificial; investigaciones sobre inteligencia artificial | Academy, Empresas y descubrimiento de productos/trabajos confirmados; no oferta de consultoría/implementación |

Comando planificado por país/conjunto: `seo-keywords --country <PE|MX|CO> --language es --limit 60 --format json <seeds del conjunto, cada una entre comillas>`. Se conserva respuesta/error y parámetros exactos; una idea pertenece al conjunto, no a una seed individual por deducción. Ante un fallo real no se repara ni repite el mismo intento en esta etapa.

## P-PE-A · Intento real y cambio de estado

Ejecutado exactamente el comando anterior con país PE y las seis seeds de P-A. **05/11/2026 01:27:25 UTC**, correspondiente al ciclo de trabajo local 04/11; no se atribuye esa hora exacta a las llamadas web posteriores. `returncode=1`, stdout vacío. Error observado: `google.auth.exceptions.RefreshError: Reauthentication is needed`. La salida indica reautenticar ADC mediante `gcloud auth application-default login`; **no se ejecutó ese comando ni se reparó infraestructura**.

Respuesta técnica íntegra conservada temporalmente en `/tmp/opencode/aiplaygrounds-prompt2-lx2jsubj/P-PE-A.json`. El registro duradero del intento son comando, instante, código y error descritos aquí; no depende de la permanencia de `/tmp`.

Planner pasa a **USAR / ERROR OBSERVADO**. P-MX-A, P-CO-A y P-B/P-C no ejecutados: mismo requisito de autenticación, no tres fallos observados distintos. No se repite la tanda para eludir ese error. No se obtuvieron volúmenes, ideas, CPC o métricas nuevas.

## W · Discovery web después del intento Planner

Herramienta `functions.websearch`. Las ocho consultas devolvieron literalmente `No search results found. Please try a different query.` No se infiere ausencia de organizaciones, búsquedas o demanda. No se simulan SERP con URLs de buscadores.

| ID | Consulta exacta | Contexto solicitado |
|---|---|---|
| W1 | comunidad inteligencia artificial Perú México Colombia investigación proyectos participar comunidad | PE/MX/CO-es; participación |
| W2 | organización inteligencia artificial Latinoamérica investigación comunidad LAION EleutherAI somos investigación participar | Organización y referentes |
| W3 | fundamentos inteligencia artificial modelos investigación AI Foundations AI for Science Latinoamérica CENIA | Foundations/Science |
| W4 | comunidad desarrollo software inteligencia artificial Latinoamérica programación con IA AI Engineering Software with AI | Software/comunidad/Academy |
| W5 | comunidad IA Perú | Contraste nacional simplificado |
| W6 | inteligencia artificial finanzas Colombia México | Finance, CO/MX-es |
| W7 | AI for Science CENIA | Referente científico |
| W8 | AI Engineering software development community | Construcción y comunidad técnica |

Estado final del discovery: **USAR / ERROR OBSERVADO** como limitación operativa del contraste: respuestas sin resultados utilizables, sin diagnóstico de causa. No se afirma fallo HTTP o indisponibilidad universal. Se detiene discovery tras dos conjuntos, sin repetir consultas exactas; se continúa con lecturas de fuentes primarias conocidas y fuentes documentadas en v1. **Ninguna lectura directa siguiente es una SERP nacional ni ranking observado.**

## F · Lecturas primarias dirigidas

Observadas en este ciclo del 04/11/2026 local (05/11 UTC). `functions.webfetch`, Markdown; fetch recibido no equivale a probar cada acción, registrarse, auditar el sitio completo o verificar los claims de marketing. No se conservaron cabeceras de publicación universales: las fechas editoriales ausentes quedan desconocidas. Extractos breves y hechos observables, sin replicar textos completos o enlaces firmados.

| ID / URL exacta | Procedencia y contexto | Observación verificable / extracto breve | Fecha fuente y límite |
|---|---|---|---|
| F1 · https://cenia.cl/ | Fuente primaria conocida; centro chileno, español | «Inteligencia Artificial al servicio de las personas»; navegación separa Investigación, Transferencia, Vinculación, Capacitación/formación y Nosotros | Home sin fecha única; noticias visibles hasta 03/11/2026. Salida extensa truncada; se usó cabecera/navegación visibles, no todo el archivo de noticias |
| F2 · https://www.eleuther.ai/ | Fuente primaria conocida; investigación global, inglés | «Independent AI Research, Done in the Open»; áreas, papers, comunidad, staff, donación; accesos a datos/código/modelos | Home dinámica sin fecha única; entradas visibles de octubre 2026. Cifras de impacto son declaraciones de la fuente, no auditadas ni trasladadas |
| F3 · https://laion.ai/ | Fuente primaria conocida; red internacional, inglés | «Open AI research should belong to everyone»; Projects, Team, About, Contribute; distingue datasets, modelos, herramientas y papers; invita a aportar fondos/cómputo/almacenamiento | Entrada visible 26/08/2026; fecha global desconocida. Su figura jurídica/capacidad no se atribuye a AI PlayGrounds |
| F4 · https://huggingface.co/ | Primaria conocida y plataforma documentada en v1; global, inglés | «The AI community building the future»; modelos/datasets/Spaces/papers/learn/comunidad; separa exploración, compartir trabajo y compute/Enterprise pagados | Dinámica sin fecha única. No certifica autoría de objetos alojados, ni se importan sus perfiles, métricas o infraestructura |
| F5 · https://somosnlp.org/ | Primaria conocida; comunidad hispanohablante | Propósito de representación lingüística; proyectos/hackathon/recursos/eventos; Discord, aportar corpus, charlas, tutoriales y GitHub como acciones diferentes | Bloques del hackathon y años 2024/2026 mezclados; no se considera convocatoria vigente por «Próximo evento». Claims de tamaño no auditados |
| F6 · https://www.fair.cr/ | Fuente v1 W9/F9, relectura; Costa Rica, español | Identidad institucional, propósito, ejes y públicos; WhatsApp comunitario y eventos; formación es parte de una misión más amplia | Sin fecha única; no se atribuye su enfoque de gobernanza/acreditación a AI PlayGrounds ni se comprueba el ingreso a WhatsApp |
| F7 · https://crafter.run/ | Dominio primario documentado por U1 de v1; Latinoamérica, página recibida en inglés | «The LatAm network of shippers»; «A community turning curiosity into projects»; open source, universo, eventos, equipo y colaboración. Botones explorar, eventos, comunidad y colaborar | Página recibida con rutas /en; evento visible 05/11/2026. No se presupone idioma español de esa vista ni que sea comunidad exclusivamente IA |
| F8 · https://www.deeplearning.ai/ | Primaria conocida; proveedor formativo global, inglés | «Learn to build with AI engineering skills»; catálogo, comunidad, negocio y acciones Pro/gratis; distingue learning de servicios de plataforma | Sin fecha única. Membresía, proyectos/certificados y claims laborales son de ese proveedor, no capacidades AI PlayGrounds |
| F9 · https://labs.google/ | Referencia humana de v1, relectura; Google, inglés | Experimentos con descripción/destino; distingue «Try it now», «Learn more» y «Join waitlist»; explica experimentos que maduran a productos | Dinámica sin fecha única. Ejemplos propios de Google, no inventario de AI Labs; no se promete acceso temprano propio |
| F10 · https://github.com/AI4Finance-Foundation/FinGPT | Repositorio primario conocido; global, inglés | FinGPT se atribuye a AI4Finance Foundation; tareas de sentimiento/extracción financiera, datasets/modelos/papers, demo y contribución; disclaimer académico y sin asesoría de inversión | Fechas históricas 2023–2025 en README y modelos basados en mercados US/China; no prueba demanda o idoneidad PE/MX/CO. No se validan resultados/benchmarks ni se ejecuta código |
| F11 · https://majuplabs.com/es/ai-engineering-course/ | Fuente v1 W1/F1, relectura; español | Ahora anuncia «Nuestros cursos ahora están en Majup Learn»; curso a ritmo propio, RAG/evals/agentes, comunidad y planes para equipos; distingue curso disponible y próximos | Cambio respecto a observación de septiembre de cohortes. No fecha de migración acreditada; no se siguen enlaces ni se comprueba matrícula |
| F12 · https://developers.google.com/search/docs/appearance/ai-features | Primaria oficial conocida, referencia SEO/IA F1; inglés | «There are no additional requirements» para AI Overviews/AI Mode; texto/enlaces, requisitos SEO, indexación/snippet; no archivo IA o schema especial, reporte en Web de GSC | Relectura actual de regla de plataforma; sin fecha editorial visible en respuesta. No prueba aparición/citación del proyecto ni cubre todos los asistentes |
| F13 · https://www.eleuther.ai/research/ai-for-science/ | URL descubierta en navegación F2; inglés | Modelos/datasets/herramientas para preguntas científicas; distingue producir respuestas, verificar pruebas y comprobar resultados; enlaces a papers y materiales | Sin fecha única; menciona estudios de varios años. Se observa presentación, no auditoría de hallazgos o rendimiento científico |
| F14 · https://cenia.cl/investigacion/ | URL descubierta en F1; español | Líneas de investigación con descripción e investigadores; IA neuro-simbólica, aprendizaje basado en física, publicaciones y originales; roles organizacionales diferenciados | Página sin fecha global; referencias de 2022–2026. No asumir actualidad de cada rol ni trasladar ese organigrama al proyecto |
| F15 · https://queia.es/ | Fuente v1 W4/F6, relectura; español | Directorio de herramientas por tareas, resúmenes/enlaces y postulación; sponsor/Premium y claims de revisión manual | Fecha global no conocida; footer 2024 no prueba actualización. No se trasladan rankings, publicidad, automatización o publicación en 24h |
| F16 · https://www.bankofengland.co.uk/report/2024/artificial-intelligence-in-uk-financial-services-2024 | Informe primario conocido, BoE/FCA; UK, inglés | Informe separa usos analíticos/operativos, riesgos de datos, terceros y responsabilidad. Encuesta de 118 respuestas | Publicado 21/11/2024. **No** dato LATAM, métrica SEO o regulación aplicable al proyecto. Salida extensa truncada; se leyeron resumen y método visibles, no todos los gráficos |
| F17 · https://www.datacamp.com/es/courses/ai-assisted-coding-for-developers | Fuente v1 W13 documentada; español | Curso de programación asistida: generar, probar, depurar/documentar, seguridad y elección de modelos; requisito Intermediate Python y acción de registro | Metadata fuente indica 16/07/2026; no fecha de nuestra observación original. Texto/temario observados; claims de productividad y reseñas no auditados |

F1–F17: **USAR / EJECUTADO**, lecturas primarias dirigidas. Varios sitios tienen intereses comerciales o institucionales; no constituyen fuentes neutrales sobre su liderazgo. F2/F13 y F1/F14 son pares del mismo origen, no evidencias independientes duplicadas. F9 y F12 pertenecen a Google pero sustentan preguntas distintas, no dos pruebas independientes de eficacia GEO.

## H · Evidencia histórica reutilizada

H-CSV: [CSV v1](../../archive/v1-2026-10/internal/02-research/keyword-observations.csv), 198 observaciones seleccionadas, fecha original 29/09/2026. H-Q: [consultas v1](../../archive/v1-2026-10/internal/02-research/research-queries.md), conjuntos T/G/B/D/E/R y W/F. H-R: [research v1](../../archive/v1-2026-10/internal/02-research/research.md). No se transfieren etiquetas de prioridad ni sus aprobaciones a v2.

La selección activa de métricas se conserva en [keyword-observations.csv](keyword-observations.csv) con país/idioma, fecha original, conjunto y línea de H-CSV. Celdas vacías significan desconocido, no cero. No hay métricas nuevas de OpenSEO o Planner, intención automática, KD o CPC disponibles. H-CSV contiene competencia publicitaria categórica, no una escala de dificultad SEO. Para nuevas familias sin fila histórica no se inventa volumen ni se interpreta «seed fallida» como 0.

## O1 · Continuación SEO MCP autorizada

Los apartados anteriores conservan el estado de la primera adquisición. La instrucción humana posterior autoriza expresamente usar **Default** sin crear proyecto y pasar mercados por consulta. Esto resuelve la identidad operativa: Default es contenedor autorizado, no una afirmación de que su contexto represente AI PlayGrounds. `get_project_context` devuelve secciones, competidores y research log vacíos; no hay evidencia previa remota que recomprar ni premisa formativa que importar. No se escribe contexto, keywords, tracking o configuración global.

Saldo inicial de esta continuación: **9.787 créditos**, `whoami`. Tope **US$2 total** para la investigación, de los que la ronda anterior consumió US$0. Se descubrieron los schemas actuales de `get_keyword_metrics`, `get_serp_results` y `find_serp_competitors`; no se usan campos inventados de costo o mercado.

### O1-P · Tarifa pública y reserva antes de pagar

Se resolvió la carencia de información de precio consultando el repositorio oficial enlazado desde https://openseo.so/: https://github.com/every-app/open-seo, commit público **0c04886f521f3626bb9037e91707bcf6762380ca** (04/11/2026). No se descargó o modificó código del workspace; fue lectura HTTP de documentación técnica primaria.

- `src/shared/billing.ts`: **1.000 créditos/USD**, markup proveedor **1,28**, redondeo y techo por llamada mediante `creditsForProviderUsd`. Fuente: https://github.com/every-app/open-seo/blob/0c04886f521f3626bb9037e91707bcf6762380ca/src/shared/billing.ts . Es consumo de créditos, no cargo nuevo a tarjeta.
- `src/server/lib/dataforseo/pricing.ts`: límites superiores usados por el proveedor, Labs **US$0,012 + US$0,00012/fila** antes del markup; Google Ads **US$0,09**; SERP según profundidad. https://github.com/every-app/open-seo/blob/0c04886f521f3626bb9037e91707bcf6762380ca/src/server/lib/dataforseo/pricing.ts . No se toma el «~» del catálogo como máximo.
- `src/shared/rank-tracking.ts`: SERP live primera página de 10 **US$0,002**, siguientes **US$0,0015**, operadores avanzados pueden multiplicar; no se usarán operadores. https://github.com/every-app/open-seo/blob/0c04886f521f3626bb9037e91707bcf6762380ca/src/shared/rank-tracking.ts . No se ejecuta el estimador de tracking para research.
- Código de `get_keyword_metrics` y su helper: mercado explícito, consulta nacional sin enriquecimiento local, sin clickstream; Labs overview para PE/MX/CO; Google Ads solo para mercados de ese tipo. No se observa fallback automático adicional en esa rama. CPC se documenta en USD, KD 0–100 y competencia **publicitaria** 0–1.
- `src/shared/keyword-locations.ts` confirma **PE 2604/es, MX 2484/es, CO 2170/es**. No se infieren códigos desde ISO ni se hereda US/en de Default.

La revisión pública permite acotar operaciones pequeñas; no certifica que el despliegue hosted sea exactamente ese commit. Se reserva con margen y se concilia `meta.creditsCharged` después de cada llamada. Si cargos o capacidades contradicen la base, se detiene esa vía y se evalúa otra operación compatible, sin repetir a ciegas. No hay tope server-side por investigación: el control es acumulado local, con llamadas secuenciales y margen amplio.

**Plan inicial acotado:** 28 expresiones conocidas × tres países mediante `get_keyword_metrics`; hasta diez consultas SERP representativas por país, depth 10/desktop; competidores orgánicos derivados de esas SERP y, solo si añade evidencia, endpoint Labs con límite 10. Se reserva **150 créditos por llamada de métricas**, aunque el máximo público Labs para 28 filas ronda 20 créditos y Google Ads 116; **10 créditos por consulta SERP depth 10**, frente a 3 calculados; **30 créditos por consulta competidores limit 10**, frente a 17 calculados. Antes de cada llamada: consumido + reservas pendientes + reserva nueva ≤ **2.000 créditos**. No se planifica un batch superior a 2.000 créditos ni adquisición masiva/duplicada; sin enriquecimiento, suscripción, tracking o cambios globales.

### O1-M · Candidatas conocidas, no nuevos productos

Lista exacta para métricas, igual en los tres países: comunidad de inteligencia artificial; comunidades de ia; organizaciones de inteligencia artificial; proyectos de inteligencia artificial; fundamentos de inteligencia artificial; modelos de inteligencia artificial; evaluación de modelos de inteligencia artificial; desarrollo de software con inteligencia artificial; programación con ia; programación asistida por ia; inteligencia artificial para investigación científica; inteligencia artificial en la ciencia; inteligencia artificial en finanzas; inteligencia artificial aplicada a finanzas; ai engineering; software with ai; curso de inteligencia artificial; formación en inteligencia artificial; capacitación en inteligencia artificial para empresas; herramientas de inteligencia artificial; productos de inteligencia artificial; directorio de herramientas de ia; investigaciones sobre inteligencia artificial; comunidad de desarrolladores; ai foundations; ai for software; ai for science; ai for finance.

Derivación: necesidades y topics ya registrados en el Keyword Map; se investigan conceptos, marca de líneas y tareas, sin asumir cursos o servicios nuevos. Parámetros: `includeMonthlyTrends=false`, `includeClickstreamData=false`, `sortBy=search_volume`, país explícito y `languageCode=es`. Ausencia de fila y null se conservan como desconocidos; no se suman variantes ni se convierten métricas Google en demanda de asistentes.

### O1-A · Alternativas acotadas tras cobertura parcial

Las tres llamadas de métricas devolvieron 8/14/12 filas para PE/MX/CO, respectivamente; faltan filas de comunidad/organizaciones en los tres mercados. No hubo error de endpoint, pero sí cobertura insuficiente. Antes de declarar esa limitación definitiva se descubre y usa `research_keywords` con seed `comunidad de inteligencia artificial` por país, `resultLimit=10`, `includeClickstreamData=false`, `groupKeywords=false`, mercados explícitos. Auto combina fuentes Labs y puede consultar fallback; las fórmulas públicas dan margen amplio frente a una **reserva de 200 créditos/seed**, 600 para el lote de tres. Consumo conciliado previo: 128 créditos; 128 + 600 < 2.000. No se recompran por separado métricas de las 34 filas ya recibidas; el objetivo es variantes/preguntas no recuperadas por overview. No se usa Google Ads local para eludir falta nacional.

Las SERP iniciales usan las mismas diez expresiones en cada país: comunidad de inteligencia artificial; organizaciones de inteligencia artificial; fundamentos de inteligencia artificial; desarrollo de software con inteligencia artificial; inteligencia artificial para investigación científica; inteligencia artificial en finanzas; ai engineering; software with ai; curso de inteligencia artificial; herramientas de inteligencia artificial. Parámetros nacionales `es`, desktop, depth 10. **Son diez elementos mixtos por consulta, no diez orgánicos garantizados.** Se observaron redirecciones opacas `google.com/goto` y dominios null: conservar dominio/rank/título cuando existan, no reconstruir URL final ni atribuir al dominio google.com la autoría. No usar snippets anómalos como prueba de actividad o capacidad.

Se ampliará con `proyectos de inteligencia artificial`, `investigaciones sobre inteligencia artificial` y `comunidad de ia` en cada país, misma configuración. Reserva previa **90 créditos** por nueve consultas. La tercera consulta contrasta el ruido observado en comunidad, especialmente CO; no se repite la llamada idéntica ni se exige resolver redirecciones para inferir intención. Competidores se obtendrán de resultados orgánicos observados, no comprando un ranking adicional con idéntica función.

**Corrección por validación real de argumentos:** el schema descubierto anunciaba `resultLimit?: number`, pero la validación rechazó 10 y exigió **150 | 300 | 500**. Se corrigió al mínimo 150, conservando la reserva de 200/seed, ya superior al costo descrito de auto y fallback a ese límite. No se alteró configuración ni se reintentó sin corregir la causa. La respuesta devuelve seeds idénticas sin eco de país: asociación por orden de entrada PE/MX/CO; no se usa esa salida para resolver ausencias de overview por mera semejanza. Se conserva selección explícita y descartes, no se suma demanda de asociaciones genéricas.

Antes del cierre se reserva **70 créditos** para siete SERP adicionales: `ai for science` y `capacitación en inteligencia artificial para empresas` × tres países, más `ingenieria de software con inteligencia artificial` en PE. Mismos parámetros es/nacional/desktop/depth10. Finalidad: distinguir el nombre de la vertical científica de las herramientas bibliográficas, contrastar K3 con evidencia real y revisar el candidato PE de volumen 1.300 descubierto en ideas antes de atribuirlo a una línea propia. Consumo previo por saldo: 272; 272 + 70 < 2.000. Se cierra después de esas comprobaciones si no cambian la arquitectura o se limitan a inventarios propios faltantes.

### O1-C · Resultados, conciliación y cierre

**Adquisición observada el 05/11/2026 UTC**, continuación del ciclo editorial 04/11 local; no se confunde fecha de consulta con periodo subyacente de volumen/KD. El proveedor no expuso fecha de actualización de cada métrica o periodo de volumen; las llamamos nuevas observaciones, no demanda medida exclusivamente en noviembre.

| Operación | Reserva previa, créditos | Saldo anterior → posterior | Diferencia observada | Cobertura / incidencia |
|---|---:|---|---:|---|
| O1-M-PE · overview28 | 150 | 9787 → 9772 | 15 | 8 filas; 20 ausentes |
| O1-M-MX · overview28 | 150 | 9772 → 9756 | 16 | 14 filas; 14 ausentes |
| O1-M-CO · overview28 | 150 | 9756 → 9740 | 16 | 12 filas; 16 ausentes |
| O1-S-PE · SERP01–10 | 100 | 9740 → 9713 | 27 | 10/10 consultas ok |
| O1-S-MX · SERP01–10 | 100 | 9713 → 9686 | 27 | 10/10 consultas ok |
| O1-S-CO · SERP01–10 | 100 | 9686 → 9659 | 27 | 10/10 consultas ok; comunidad ruidosa |
| O1-A · ideas, intento limit10 | Dentro de 600 | 9659, sin conciliación aislada | ND por llamada | Rechazo de validación: exige 150/300/500. No se infiere cargo cero de falta de meta |
| O1-A · ideas150 ×3 mercados | 600 conjunta con intento anterior | 9659 → 9542 | 117 conjunta | 75/76/76 filas, blended, sin fallback. No desagregar 39/seed como cargo verificado |
| O1-S · SERP11–13 ×3 | 90 | 9542 → 9515 | 27 | 9/9 ok |
| O1-S · SERP14/15 ×3 + PE17 | 70 | 9515 → 9497 | 18 | 6/7 ok; error proveedor PE15 |
| O1-S · alternativa PE16/CO16 | 20 | 9497 → 9491 | 6 | 2/2 ok; PE recupera contraste mediante variante; CO mejora respuesta escasa |
| Verificación final gratuita | 0 | 9491 → 9491 | 0 observado | Default sigue dominio null, 2840/en, sin cambios globales |

**Total conciliado de la ventana:** **296 créditos**, saldo 9.787 → **9.491**. Equivalente según conversión pública: **US$0,296** de **US$2**; margen **1.704 créditos / US$1,704**. Reservas conservadoras de los lotes: **1.530 créditos / US$1,53**, secuenciales, liberadas tras conciliación; **sin reservas ni llamadas pendientes**. Todos los saldos/cargos observados quedaron por debajo de sus reservas. Las reservas son límites locales de planificación, no cobros ni un cap impuesto al servidor.

Las respuestas pagadas omitieron `meta.creditsCharged`, `meta.creditsRemaining` y `meta.runId`. El consumo verificado es la diferencia de saldos consultados entre operaciones; el reparto de lotes no sustituye un recibo por keyword o seed. No hay indicio observado de consumo concurrente, pero `whoami` no aporta ledger contable que permita excluirlo formalmente. La equivalencia USD proviene del código público documentado, no de una factura o cargo a tarjeta. No se vuelve a comprar para obtener un runId.

**Evidencias duraderas:** [overview nacional con parámetros, filas y null](openseo-metrics-2026-11-05.json); [selección SERP por país, ideas depuradas y contraste de intención](openseo-serp-2026-11-05.md). CSV histórico intacto: no se reemplaza una observación de septiembre con una ausencia de noviembre. Ausencias se reconstruyen como candidatas solicitadas menos filas devueltas, por país (50 de 84 combinaciones sin fila).

**Resultado:** 34 filas métricas overview, 227 ideas recibidas (selección pertinente/descartes en evidencia, no 227 oportunidades), 48 SERP solicitadas / 47 exitosas. Diez llamadas pagadas aceptadas más un rechazo de argumentos; no llamadas paralelas pagadas, tracking, checks IA, setup o mutación de defaults. `get_project_context` fue lectura gratuita de contexto vacío. No se ejecutó Planner nuevamente ni se repitieron referentes estratégicos. La alternativa compatible resolvió el error de proveedor PE mediante otra formulación; el fallo original sigue registrado y no se representa como SERP exacta recuperada.

**Cierre proporcional:** hay métricas/intención/SERP/ocupantes orgánicos suficientes para las propuestas de Gate B; persisten keywords sin dato y KD null, ruido de comunidad CO y ausencia de corpus propio. Más gasto genérico no justificaría cuatro páginas nuevas o un ranking de rentabilidad. Se conserva ese límite, no el anterior bloqueo por Default US/en o costo desconocido, ya resueltos.

## R2 Reconstrucción independiente OpenSEO

**Fuente de autoridad:** encargo humano «Reconstrucción integral de investigación SEO con OpenSEO», 05/11/2026. Autoriza saldo incluido disponible, PE/MX/CO-es, reconstrucción desde cero y revisión humana antes de reconsolidar consecuencias. No E1v2.2/E2, cambios de skill, commit/push, nuevos cargos, recargas o plan. La aprobación anterior se preserva como historia.

### Identidad, capacidades y presupuesto comprobados antes de investigar

Se ejecutaron `whoami` y `list_projects`: modo hosted, saldo inicial **9.491**, único proyecto Default sin dominio, defaults2840/en. Default fue autorizado por el usuario como contenedor; todas las consultas de investigación sobrescriben país/idioma, sin cambiar configuración global. `get_project_context` devolvió secciones, competidores y log vacíos. No se guardó contexto ni se activó setup.

Se descubrieron **82 herramientas** y sus schemas/descripciones; catálogo preservado en [JSON](seo-rebuild-2026-11-05/raw/Z02-catalog.json). Incluye métricas, expansión, SERP y competidores. **Sin operación dedicada de clustering, content gap, PAA o Questions.** `get_google_business_questions` solo recupera preguntas de una ficha empresarial local, no preguntas orgánicas de IA; no se usó. `groupKeywords` incluye variantes, no clusters editoriales. Preguntas se investigan por expansión interrogativa y títulos; las SERP indican módulos PAA/Related Searches pero no exponen sus contenidos.

Precios oficiales: https://openseo.so/pricing, leído05/11/2026, BaseUS$10/mes incluyeUS$10 de uso. Conversión **1.000 créditos/USD**, markup1,28 y fórmulas de reserva en código público oficial, commit **0749caf15796888dd9034cd52e8d344e2b44e09f**:

- https://github.com/every-app/open-seo/blob/0749caf15796888dd9034cd52e8d344e2b44e09f/src/shared/billing.ts
- https://github.com/every-app/open-seo/blob/0749caf15796888dd9034cd52e8d344e2b44e09f/src/server/lib/dataforseo/pricing.ts
- https://github.com/every-app/open-seo/blob/0749caf15796888dd9034cd52e8d344e2b44e09f/src/server/features/keywords/services/research/research.ts
- https://github.com/every-app/open-seo/blob/0749caf15796888dd9034cd52e8d344e2b44e09f/src/shared/keyword-locations.ts

El código público no certifica versión exacta del despliegue hosted. Se mantuvo margen amplio y llamadas pagadas secuenciales; no un lote superior a2.000 créditos. El plan inicial de18 seed/país reserva hasta1.692; las ampliaciones respondieron al ruido/cobertura realmente observados, con saldo reconsultado antes de abrir otra fase. El **máximo autorizado total es el saldo inicial9.491**, no la suma acumulada de reservas liberadas. No se compra saldo, usa auto-reload o inicia consumo recurrente. No existe tope monetario por investigación en el schema; no se afirma protección server-side inexistente.

Reserva por seed auto150: dos fuentes limit75 y eventual related150. Cálculo por suboperación: `ceil(1,28×(0,012+75×0,00012)×1000)=27` por fuente; dos fuentes54, fallback `ceil(1,28×(0,012+150×0,00012)×1000)=39`; total93. Se reservó94/seed. Sin clickstream o volumen local. Overview48 reserva24 (fórmula23), SERPdepth20 reserva5 por query sin operadores; competidoreslimit15 reserva18; rankedlimit100 reserva31; overviewdominio reserva300 conservadora. Son reservas/estimaciones, no cargos verificados por llamada.

Países verificados en catálogo público: **PE2604/es, MX2484/es, CO2170/es**. Tres `search_serp_locations` devolvieron ciudades, no se utilizaron sus códigos como países ni se solicitó enriquecimiento local.

### Precedencia Planner y fuentes complementarias

`command -v seo-keywords` devolvió `/home/edhu/.local/bin/seo-keywords`; se leyó ayuda y se ejecutó:

```sh
seo-keywords 'comunidad de inteligencia artificial' 'inteligencia artificial para desarrollo de software' 'inteligencia artificial en investigación científica' --country PE --language es --limit 50 --format json
```

Resultado: código1, `google.auth.exceptions.RefreshError: Reauthentication is needed`. Sin métricas, no reparación/instalación/repetición por país. Se ejecutó antes de adquirir SERP, sin sustituir la obligación de OpenSEO. No se usó `websearch`.

Tres `webfetch` primarios complementaron ocupantes observados en SERP: **F18 https://cpia.pe**, **F19 https://ania.org.mx**, **F20 https://somossia.org**. Observados05/11/2026; sin fecha global de publicación acreditada. F18 muestra presentación institucional, afiliación/empresas y oportunidades; F19 separa coalición, laboratorio, academia, colaboración y participación. F20 muestra educación/gobernanza y referencia a Extremadura: no es prueba de comunidad colombiana. Solo se retuvieron funciones observables, sin trasladar cifras, acreditaciones o servicios al proyecto. Son tres lecturas nuevas, distintas de las17 primarias estratégicas anteriores.

### Llamadas y parámetros reales

Todas las respuestas nuevas exitosas se conservaron completas con argumentos y timestamp en [raw](seo-rebuild-2026-11-05/raw/). Las claves de proyecto privadas se sustituyeron por `DEFAULT`, sin alterar datos. El orden de seeds en A04/E01 permite asignar las tres respuestas homónimas a PE/MX/CO; las respuestas no hacen eco del país. Las demás seeds se asocian por su llamada de país.

| IDs | Herramienta / llamadas | Parámetros y cobertura |
|---|---|---|
| A01-PE/A02-MX/A03-CO | research_keywords /3 | Cinco seeds por mercado: comunidad de inteligencia artificial; inteligencia artificial para desarrollo de software; inteligencia artificial en investigación científica; inteligencia artificial en finanzas; ingeniería de inteligencia artificial |
| A04-tools | research_keywords /1 | herramientas de inteligencia artificial ×PE/MX/CO |
| A05-PE/A06-MX/A07-CO | research_keywords /3 | fundamentos de inteligencia artificial; inteligencia artificial para empresas; proyectos de inteligencia artificial, por país |
| B01-PE/B02-MX/B03-CO | get_keyword_metrics /3 | Lista exacta48 expresiones en cada JSON; includeMonthlyTrends=true; includeClickstreamData=false; es y país explícitos |
| C01-PE/C02-MX/C03-CO | get_serp_results /3 | Diez queries por país: comunidad; organizaciones; AI Engineering; ingeniería de software con IA; desarrollo de software con IA; IA en la investigación científica; IA en finanzas; fundamentos; herramientas; proyectos. Literales exactos en JSON |
| C04-PE/C05-MX/C06-CO | get_serp_results /3 respuestas +1 intento perdido | Seis queries por país: IA para empresas; soluciones IA para empresas; curso de IA; programación con IA; laboratorio de IA; investigación en IA. depth20/desktop/es |
| D01-PE/D02-MX/D03-CO | find_serp_competitors /3 | Ocho keywords comunes por país, resultTypes=[organic],limit15,sortBy=keyword_count,includeSubdomains=true; JSON conserva lista exacta |
| D04-overview-CO | get_domain_overview /1 | datacamp.com,scope=subdomains,CO2170/es; antes de pedir detalle |
| D05-PE/D06-MX/D07-CO | get_ranked_keywords /3 | https://www.datacamp.com/es,scope=subfolder,resultTypes=[organic],limit100,sortBy=search_volume; países independientes |
| E01-questions | research_keywords /1 | cómo aprender inteligencia artificial ×PE/MX/CO, mismos parámetros de expansión |
| E02-PE/E03-MX/E04-CO | get_serp_results /3 | AI PlayGrounds; Software with AI; ingeniería de inteligencia artificial; cómo aprender inteligencia artificial; herramientas de IA para investigación; aplicaciones IA en finanzas; literales completos en JSON |

Expansión: **resultLimit150, includeClickstreamData=false, groupKeywords=false**, es y localización nacional en cada seed. Las30 respuestas seed fueron exitosas, fuente`blended`, sin fallback informado. Se distingue esta fuente de `keyword_overview` y rankings históricos. La expansión no expone series/fechas por métrica; overview entrega series, y el ranking de DataCamp sí contiene fechas de actualización específicas.

**Incidencia C06:** después de persistir C04/C05, se perdió la respuesta CO con `ECONNRESET`. Se conservó reserva y se consultó saldo; no se reinició toda la tanda. Tras otras operaciones se recuperó C06 con **idénticos parámetros** según contrato de caché12h de la herramienta. El saldo fue8.029 antes y después de esa recuperación; no se infiere costo0 desde metadatos ausentes. La ventana C ya incluye el gasto observado del intento perdido. La recuperación devolvió las seis SERP; no quedan resultados o reservas sin conciliar.

### Contabilidad de ejecución

**46 llamadas MCP reales**:28 intentos a operaciones pagadas,27 respuestas conservadas (incluida recuperación) y un intento de respuesta perdida;18 lecturas gratuitas. Desglose gratuito:11 `whoami`,3 `list_projects`,1 `get_project_context`,3 `search_serp_locations`. Las búsquedas de schemas son descubrimiento del catálogo, no llamadas de investigación ni consultas pagadas.

**27 respuestas de investigación:**8 expansión,3 métricas,9 SERP,3 competidores,1 overview dominio,3 ranked keywords. Operaciones lógicas:30 seed/país;144 solicitudes keyword/país;66 SERP distintas;24 keywords de entrada al análisis agregado de competidores (8×3);1 overview;3 muestras de dominio de100 filas. Los seis SERP reintentados no se contabilizan como seis keywords adicionales ni nuevas oportunidades.

| Fase / ventana | Estimación/reserva previa relevante, no cargo | Saldo observado | Diferencia de saldo |
|---|---|---|---:|
| A01–03,15 seed/país | Hasta470 por llamada de5; reservas liberadas secuencialmente | 9491 →9001 | 490 |
| A04,3 seed/país | Hasta282 | 9001 →8851 | 150 |
| A05–07,9 seed/país | Hasta282 por llamada de3, según saldo ya observado | 8851 →8465 | 386 |
| B01–03,48 expresiones×3 | Hasta24/call,72 conjunta | 8465 →8411 | 54 |
| C01–06,48 SERP incluyendo intento perdido | Hasta5/query,240 conjunta | 8411 →8171 | 240 |
| D01–07 y recuperación C06 | Competidores18×3;overview300;ranked31×3; recuperación conserva reserva30 hasta conciliar | 8171 →8029 | 142 |
| E01,3 seed/país interrogativas | Hasta282 | 8029 →7910 | 119 |
| E02–04,18 SERP | Hasta90 | 7910 →7820 | 90 |
| Total ejecución | Reservas no equivalen a consumo ni se suman como gasto real | **9491 →7820** | **1671** |

Resumen por fase: descubrimiento A1.026; métricas B54; SERP C240; competencia D/recuperación142; preguntas E01119; contraste final90. **US$1,671 equivalentes**, no factura o cargo a tarjeta. Saldo final equivalenteUS$7,820 según conversión pública. La primera ronda histórica había observado296; acumulado documental ambas rondas1.967 créditos/US$1,967, sin confundirlo con gasto de esta ejecución.

**Limitación contable:** las respuestas pagadas no exponen `meta.creditsCharged`, `meta.creditsRemaining` o `meta.runId`. Son diferencias de saldo verificadas entre fases, no recibos individuales; `whoami` no permite excluir contablemente una actividad concurrente, aunque no se observó ninguna. No se imputa0 a campos omitidos ni se inventa costo por keyword. Final `list_projects` confirma defaults intactos. Sin llamadas pendientes o recargas/planes/medición recurrente activados.

### Calidad y decisión

[Cobertura computada](seo-rebuild-2026-11-05/coverage.json), [validaciones](seo-rebuild-2026-11-05/validacion.md), [mapa reconstruido](keyword-map.md) y [Research R1–R9](research.md#r1-resultado-ejecutivo-de-la-reconstrucción). Datos desconocidos, ceros y etiquetas originales se conservan. Los13 clusters son editoriales sustentados en datos OpenSEO, no clustering automático. PAA concreta sigue inaccesible; se usaron keywords interrogativas reales como alternativa verificable. Gate B permanece pendiente de revisión humana.

## R3. Complemento de preguntas antes de Gate B

**05/11/2026.** Encargo humano de ampliar preguntas para N01–N13 sin reagrupar, aprobar Gate B o avanzar de etapa. [Preflight y presupuesto](preguntas-2026-11-05/preflight.md). Comprobaciones MCP reales al inicio:`whoami`7.820; `list_projects`Default autorizado, sin dominio,2840/en; `get_project_context`vacío. Se inspeccionaron82 herramientas y schemas actuales. La investigación de preguntas IA/PAA disponible se limita a US/inglés y no se ejecutó para atribuir preguntas en español. Se reutilizó evidencia anterior y se fotografiaron hashes locales antes de editar.

Autorización:solo saldo incluido disponible, sin recarga, plan, tracking ni cargo adicional. Plan inicial máximo1.902 créditos (18 seeds×94 +30 SERP×5 +60 métricas). La expansión se detuvo en12 seeds por ruido; las reservas efectivas de capturas fueron1.128 +150 +63 =**1.341 créditos**, inferior al plan y al umbral2.000. Diferenciar reservas de consumo. No se hicieron más operaciones pagadas tras el cierre.

### Operaciones realmente ejecutadas

Capturas completas en [raw](preguntas-2026-11-05/raw/), sanitizadas solo para identidad. `at` registra instante UTC; cada `args` conserva orden y literales exactos. Localizaciones explícitas:PE2604,MX2484,CO2170; idioma`es`, sin modificar defaults remotos.

| ID | Herramienta / alcance | Solicitud y resultado |
|---|---|---|
| Q00 | Catálogo / lectura |82 schemas inspeccionados, saldo inicial7.820 |
| Q01-PE | research_keywords /5 seed-país |`comunidades de inteligencia artificial`; `cómo empezar un proyecto de inteligencia artificial`; `cómo programar con inteligencia artificial`; `qué hace un ingeniero de inteligencia artificial`; `inteligencia artificial para investigación científica` |
| Q02-PE | research_keywords /1 |`cómo usar inteligencia artificial en finanzas` |
| Q03-MX/Q04-CO | research_keywords /3 por país |`cómo usar inteligencia artificial en finanzas`; `cómo implementar inteligencia artificial en empresas`; `cómo evaluar artículos científicos` |
| QS01-PE/QS02-MX/QS03-CO | get_serp_results /10 por país |Orden común indicado debajo;27 éxitos/3 errores, sin reintentos |
| QM01-PE/QM02-MX/QM03-CO | get_keyword_metrics /32,35,35 |102 solicitudes literales exactas en args;0,3,2 filas devueltas. Las97 ausencias quedan desconocidas |
| QB01/QB02/QB03/QB04-final | Control de saldo |7.352/7.214/7.170/7.170; final proyectos confirma defaults intactos |

Expansión:`resultLimit150,includeClickstreamData=false,groupKeywords=false`;12 operaciones seed/país,901 filas devueltas, conservadas incluso si irrelevantes. No se presupone relevancia por proximidad a una seed. Métricas:`includeMonthlyTrends=true,includeClickstreamData=false`; series originales en JSON. Las solicitudes exactas no devueltas no se convierten en keywords descubiertas.

SERP:`depth20,desktop,es`. Orden idéntico por país:

1. `qué es AI PlayGrounds`
2. `cómo unirse a una comunidad de inteligencia artificial`
3. `cómo empezar un proyecto de inteligencia artificial`
4. `cómo usar IA para programar sin perder calidad`
5. `qué hace un ingeniero de inteligencia artificial`
6. `cómo usar inteligencia artificial en investigación científica`
7. `cuál es la mejor IA para investigación científica`
8. `cómo usar la inteligencia artificial en finanzas`
9. `cómo implementar inteligencia artificial en una empresa`
10. `cómo saber si un artículo científico es confiable`

Errores conservados:QS02-MX-Q04 (Internal SE Server Error),QS02-MX-Q06 (partial results),QS03-CO-Q01 (Internal SE Server Error). [Detalle literal](preguntas-2026-11-05/errores-serp.json). No se tratan como SERP exitosas ni ausencia de resultados. La evidencia previa compatible permite continuar sin repetir; las66 anteriores no se recompran.

### Consumo observado

| Ventana | Saldo | Diferencia |
|---|---|---:|
| Inicio→expansión,Q01–04 |7.820→7.352|468|
| SERP,QS01–03 |7.352→7.214|138|
| Métricas,QM01–03 |7.214→7.170|44|
| Comprobación final gratuita |7.170→7.170|0 de variación observada|
| Total complemento |7.820→7.170|**650**|

18 llamadas MCP:10 operaciones pagadas y8 lecturas gratuitas (5 cuenta,2 proyectos,1 contexto). El descubrimiento de catálogo no se cuenta como investigación MCP pagada. No hay cargos/runId en meta:650 es diferencia verificada por ventanas, con la misma salvedad de concurrencia de R2, no desglose contable por query. Conversión pública revisada anteriormente:1.000 créditos/USD; equivalenteUS$0,650 del saldo incluido, sin cobro adicional. Rondas distintas:296 +1.671 +650 =2.617 créditos documentados; saldo final7.170.

### Alternativas, resultado y control

Se ejecutaron10 `websearch` y8 `webfetch` (7 exitosas, UNIR Perú403); [consultas, URLs, extractos y límites](preguntas-2026-11-05/fuentes-web.md). No consumen créditos OpenSEO y no se les imputa un costo monetario externo desconocido. Cero módulos PAA/Related Searches textuales recuperados. Se diferencian keywords, títulos y preguntas editoriales.

[Matriz](preguntas-2026-11-05/matriz.md):48 preguntas,13/16/19 por esos tres orígenes;26 altas. [Cierre](preguntas-2026-11-05/cierre.md) y [validación local](preguntas-2026-11-05/validacion.md). Se conservan las evidencias y consumos previos,13 clusters,69 expresiones,8 páginas y2 tipos de ficha. **Gate B pendiente humano**, sin cambios de B2/Estrategia/E1/E2, commit o push.
