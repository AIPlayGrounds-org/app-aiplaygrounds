# Research formal desde B1 — Evidencia regional y propuestas

**Proyecto:** AI PlayGrounds

**Fecha de ejecución y observación:** 29/09/2026

**Base vinculante:** `content/internal/01-brief-diagnostico/diagnostico-b1.md`; Gate A ya validado.

**Estado:** Gate B resuelto tras revisiones del usuario y elección de Software Engineering with AI. Research concluido; conclusiones aceptadas consolidadas en `content/internal/01-brief-diagnostico/diagnostico-b2.md`. Estrategia/arquitectura/dirección editorial se presentan para revisión en E1, no están aprobadas por este gate. Migración 05/10/2026: se conserva la ejecución histórica, sin nuevas consultas. Los estados intermedios de Gate B son historial; el cierre del final prevalece.

## 1. Estado técnico vigente

**Nota de precedencia editorial, 14/10/2026:** la ejecución y cierre de septiembre se conservan como historial. El feedback sobre E1 v11 sustituye el nombre oficial K1a por Software with AI y conserva AI Engineering; no modifica evidencia, seeds, consultas ni conclusiones de necesidades. B. Cercano y participativo pasa a dirección editorial APROBADA. Estado operativo en Estrategia y feedback E1; aprobación consolidada E1 pendiente. No research nuevo ni reapertura de Gate B.

El CLI `seo-keywords` resuelve dinámicamente países e idiomas. La autenticación ADC con scope adwords y quota project fue corregida por el usuario; las consultas de esta ronda devolvieron resultados correctamente en PE/MX/CO/AR/CL/EC/CR — es y BR — pt.

`functions.websearch` estaba disponible y se utilizó sustantivamente en la ronda registrada. `functions.webfetch` se utilizó solo después de búsquedas, sobre URLs concretas seleccionadas. Los errores de la ronda anterior no eran restricciones de esa ronda. Los intentos con HTTP 429 están separados del resto de consultas exitosas en `content/internal/02-research/research-queries.md`. Esta migración no comprueba disponibilidad operativa actual ni convierte disponibilidad histórica en observación nueva.

**Archivos de evidencia:**

- `content/internal/02-research/research-queries.md`: seeds exactas, comandos reconstruibles por mercado, búsquedas/resultados y lecturas directas F1–F10.
- `content/internal/02-research/keyword-observations.csv`: observaciones seleccionadas usadas en el análisis y descartes materiales; país, idioma, conjunto de seeds, keyword, avg_monthly_searches y ads_competition.
- `content/internal/02-research/keyword-map.md`: clusters, necesidad, intención, prioridad y ownership propuestos, con relaciones y límites.

No se repitieron B0, Gate A o B1. No se hizo clasificación O/C ni arquitectura final.

## 2. Preflight: decisiones y preguntas antes de investigar

**Keyword Planner: pertinente y usado.** Existen seeds responsables desde formación/software, empresas, directorios y comunidad confirmados en B1. AI Engineering, Product Engineer y AI Builder se investigan como términos explorados en el brief incorporado por B1, no como nombres ya aprobados de cursos, oferta o audiencia.

| Decisión que puede cambiar | Pregunta | Mercado/idioma e instrumento | Criterio de cierre |
|---|---|---|---|
| Naming formativo y audiencia | ¿Cómo distinguir desarrollar con apoyo de IA de integrar IA en software? ¿Product Engineer/AI Builder representan al público? | Consultas nacionales es; Planner; contraste web de cursos/roles y fuentes primarias | Propuesta de lenguaje entendible y separación de tareas sustentada, sin inventar catálogo ni presentar volumen genérico como intención formativa |
| Mensaje de Empresas y acción secundaria | ¿Qué lenguaje distingue formación para equipos de interés exploratorio en PoC/MVP? | Planner es; consultas empresariales y fuentes de conceptos/oferta | Mantener oferta principal y límites B1; proponer denominación sin prometer ejecución ni ampliar a consultoría |
| Descubrimiento y ownership de Labs | ¿Herramientas/productos e investigación tienen necesidades e intención distintas? | Planner es; directorios, trabajos y referentes de colección | Separación de unidades/recorridos sustentada; elegibilidad de Productos explícitamente pendiente; sin páginas por filtros |
| Función de Comunidad | ¿Qué espera quien busca participar y cómo se diferencia de estudiar/postular una entrada? | Planner es; muestras de comunidad en EC/CR | Mensaje/acción distinguibles sin derivar miembros, demanda regional o incorporación automática |
| Cobertura geográfica y lingüística | ¿Nuevos mercados cambian vocabulario, intención, nombres o páginas? ¿BR cambia expectativa de «Latinoamérica»? | Inicio PE/MX/CO/AR/CL es; expansión incremental EC/CR es y BR pt | Detener cuando nuevos mercados no alteren decisiones; pt separado, sin suma de países ni versiones lingüísticas automáticas |

Trends y GSC no son dependencias: no se aportaron datos. No se verificaron estadísticas externas 23%/6%; no condicionan estas decisiones y siguen pendientes de publicación. Inglés posterior no justifica consultar US/en o US/es ahora.

## 3. Secuencia ejecutada y cobertura incremental

1. Corregir estados técnicos obsoletos y registrar preflight.
2. Consultar PE/MX/CO/AR/CL en español con conjuntos T/G/B/D/E.
3. Limpiar ideas por oferta/intención; aislar B y E para que los términos genéricos no oculten las seeds largas de menor señal.
4. Comparar mercados: cursos/herramientas consistentes, especialización destacada en CO y ambigüedad de etiquetas en inglés.
5. Añadir EC/CR en español para contrastar un contexto andino adicional y Centroamérica; añadir BR/pt por posible impacto lingüístico regional.
6. Refinar consultas empresariales cortas R en MX/CO/CR: la señal larga insuficiente no equivale a falta de necesidad; comprobar lenguaje más amplio y su ambigüedad.
7. Seleccionar clusters prioritarios y ejecutar búsquedas web reales para todos; preguntas transversales de naming y alcance incluidas.
8. Leer selectivamente fuentes primarias/representativas devueltas por búsqueda; distinguir observación de fuente de inferencia.
9. Revisar comparación regional, cierre incremental y propuestas de Gate B.

### Registro de inclusión de mercados

| País | Idioma | Motivo de inclusión | Decisión que puede cambiar | Señal nueva observada |
|---|---|---|---|---|
| PE | es | Base inicial indicada por usuario y contexto del proyecto | Lenguaje de formación/contacto en contexto local sin limitar alcance regional | «curso de inteligencia artificial» 880; AI Engineering 320; herramientas 320; muestra de capacitación Lima/contacto |
| MX | es | Contexto latinoamericano hispanohablante distinto al andino | Escala y lenguaje empresarial frente a cursos para personas | Cursos 1300; AI Engineering 590; herramientas 480; «formación» 90; «IA para empresas» genérica ambigua; guías de capacitación para equipos |
| CO | es | Contraste andino de oferta y nomenclatura | Evitar naming que induzca expectativa de posgrado | Especialización 1900 frente a curso 1000; páginas universitarias de posgrado; AI Engineering/aplicaciones en fuente con contexto colombiano |
| AR | es | Contexto del Cono Sur con tradición de programas técnicos | Naming/formato, requisitos y recorrido de formación | Curso 1000; Product Engineer 110; diplomatura con nivelación y fundamento técnico en muestra, no oferta propia |
| CL | es | Segundo contraste del Cono Sur | Audiencia/rol, lenguaje y necesidad de contenido | Curso 590; AI Engineering 260; vacante Product Engineer distingue definición de producto e implementación por AI Engineer |
| EC | es | Añadido tras comparación inicial: probar transferencia andina fuera de PE/CO | ¿Vocabulario o escala obliga a propuesta nacional distinta? | Curso 210; AI Engineering 50; herramientas 140; comunidad de desarrolladores con IA en muestra; no nueva necesidad de URL nacional |
| CR | es | Añadido para cubrir contexto centroamericano no observado | ¿Otro vocabulario o vía de entrada cambia naming/participación? | Curso 50; AI Engineering 70; herramientas 40; fuente local usa «Programación asistida con IA»; comunidad con WhatsApp; mismas tareas, sin variante nacional necesaria |
| BR | pt | Mercado latinoamericano lingüísticamente distinto | Precisar idioma de la oferta y evitar trasladar naming es por defecto | Curso 9900; AI Engineering 1900; pesquisas 170; páginas de MBA/graduação; terminología portuguesa. No se fusiona con señales es |

Los números de esta tabla son avg_monthly_searches aproximados por keyword/mercado, no un agregado regional. Se consultaron tantos contextos como se justificó por decisiones; no se cerró por alcanzar ocho países.

## 4. Métricas comparables por país, sin agregación

Valores de avg_monthly_searches; competencia publicitaria y trazabilidad de seeds en el CSV. Un guion significa dato no conservado/no observado en esa consulta, no cero. El período subyacente y la red no se muestran en el CLI; no se les atribuye un período inventado.

| Keyword literal | PE/es | MX/es | CO/es | AR/es | CL/es | EC/es | CR/es |
|---|---:|---:|---:|---:|---:|---:|---:|
| curso de inteligencia artificial | 880 | 1300 | 1000 | 1000 | 590 | 210 | 50 |
| cursos de ia | 1900 | 2900 | 1600 | 2400 | 1600 | 320 | 90 |
| aprender inteligencia artificial desde cero | 90 | 140 | 140 | 110 | 50 | 30 | 10 |
| ai engineering | 320 | 590 | 480 | 590 | 260 | 50 | 70 |
| ai builder | 140 | 170 | 170 | 90 | 90 | 20 | 20 |
| product engineer | 20 | 140 | 40 | 110 | 50 | 10 | 10 |
| desarrollo de software con inteligencia artificial | 10 | 10 | 10 | 10 | 10 | 10 | 10 |
| herramientas de inteligencia artificial | 320 | 480 | 320 | 110 | 140 | 140 | 40 |
| investigaciones sobre inteligencia artificial | 10 | 10 | 10 | 10 | 10 | 10 | 10 |
| especializacion en inteligencia artificial | 110 | 20 | 1900 | 170 | 10 | 10 | 10 |

**BR/pt, por separado:** «curso de inteligência artificial» 9900/HIGH; «ai engineering» 1900/MEDIUM; «ferramentas de inteligência artificial» 320/MEDIUM; «pesquisas sobre inteligência artificial» 170/MEDIUM. HIGH/MEDIUM son ads_competition, no dificultad SEO.

**Límite empresarial:** las tres seeds largas B devolvieron 0/UNSPECIFIED en PE/MX/CO/AR/CL. La formulación corta «inteligencia artificial para empresas» devolvió MX 50/MEDIUM, CO 30/MEDIUM y CR 10/MEDIUM. La búsqueda web muestra capacitación, herramientas y otros servicios; no se interpreta ese volumen como demanda exclusiva de formación o PoC. Mantener esta oferta obedece también a prioridad de negocio B1, no a términos exactos de alto volumen.

**Límite directorios/comunidad:** las seeds exactas «directorio de productos de inteligencia artificial» y «comunidad de inteligencia artificial» devolvieron 0/UNSPECIFIED en las consultas aisladas E de los cinco mercados iniciales. La tarea de descubrimiento/participación sí está documentada en B1 y contrastada en fuentes. No confundir cero aproximado de frase con inexistencia de necesidad, ni un término ausente de una salida limitada con cero.

## 5. Limpieza y descartes materiales

| Familia/ejemplos observados | Tratamiento | Motivo y consecuencia |
|---|---|---|
| Curso IA / cursos de IA / curso inteligencia artificial, tilde/no tilde | Agrupar por necesidad, sin sumar variantes | No justifican páginas por sinónimo; conservar literal en evidencia |
| AI Builder / AI Builder Microsoft | Conservar para contraste de ambigüedad; excluir como identidad global de audiencia | Microsoft documenta un producto con ese nombre; no atribuir toda la demanda a perfiles builders |
| Product Engineer | Conservar como referencia de rol, no audiencia exclusiva | Muestra laboral con funciones específicas, no todos los desarrolladores de B1 |
| AspenOne v12, Power BI Turbo Net | Descartar ruido | No oferta o público confirmado |
| Google, Coursera, Udemy, UTN, FIAP, SENAI; Apple/IBM/Elon Musk | Descartar intención de marca/proveedor concreto | No importar herramientas, docentes, certificaciones o productos al catálogo |
| Cursos gratis / chat gratis / descargar PDF | No priorizar adquisición por gratis o acceso a chatbot | Precio de formaciones pendiente; el sitio no es un chat ni descarga genérica; pueden informar expectativas, no promesa |
| Especialización, graduação, faculdade, big data | Registrar diferencia local/lingüística y excluir del lanzamiento | B1 no ofrece especializaciones o grados en lanzamiento; no perseguir volumen fuera de oferta |
| Empresa de IA / IA para empresas genérica | Descartar como promesa de proveedor generalista; conservar ambigüedad para QA de naming | Formación sí; consultoría amplia y software factory no; precisión necesaria en Empresas |
| Herramientas para investigar con IA | No fusionar con investigación sobre IA | Herramienta de búsqueda académica puede pertenecer a Productos; un trabajo original pertenece a Investigación |
| Filtros/países/autores/licencia/estado/uso | No generar clusters o páginas por rutina | Faltan catálogo, intención diferenciada y necesidad; no aprobación automática por filtros |

No se propone una keyword por volumen solamente. La tabla de observaciones contiene ejemplos descartados para que el filtrado sea trazable. El límite de ideas por consulta impide declarar exhaustividad.

## 6. Contraste web y lectura directa

Se ejecutaron búsquedas para formación técnica, Empresas, Productos, Investigación y Comunidad; también para los términos de rol, la expectativa de especialización en CO y el contexto BR/pt. Todas las preguntas prioritarias tienen contraste exitoso documentado, aunque seis intentos iniciales devolvieron HTTP 429. No se presenta esos fallos como evidencia ni como ausencia vigente de herramientas.

El registro íntegro de consultas exactas, contexto, URLs, tipos de página, patrones, naming y decisiones afectadas está en `content/internal/02-research/research-queries.md` (W1–W16; F1–F10). Las búsquedas son resultados web de la fecha observada, no «Top 10 de Google» ni SERPs nacionales garantizadas.

### Observaciones de fuentes → inferencias separadas

- **EVIDENCIA OBSERVADA, W1/F1:** Majup usa «AI Engineering: Fundamentos de Construcción de Aplicaciones de IA», con APIs, evaluación, observabilidad y producción; declara requisitos. **INFERENCIA:** AI Engineering puede funcionar como etiqueta técnica acompañada de explicación, no como sustituto de todo «Formación». La promesa de producción de otro proveedor no acredita la de AI PlayGrounds. La fecha de cohorte en la fuente no se usa como convocatoria vigente.
- **EVIDENCIA OBSERVADA, W13/F2:** UCenfotec usa «Programación asistida con IA» para lógica, asistentes y prompting, con modalidad/nivel; aparece sin existencias y sin fecha/docente. DataCamp también distingue tareas de escribir/probar/documentar código. **INFERENCIA:** nombrar por tarea ayuda a distinguir asistencia de integrar IA, pero los programas observados pueden mezclar ambas; no imponer una taxonomía curricular inflexible.
- **EVIDENCIA OBSERVADA, W2/F3 y W3/F4:** Microsoft identifica AI Builder como funcionalidad de Power Platform; Nubox define Product Engineer con responsabilidades de producto en pareja con AI Engineer. **INFERENCIA:** no usar esas etiquetas como único nombre de toda la audiencia ni convertir sus volúmenes en demanda de nuestros cursos.
- **EVIDENCIA OBSERVADA, W5/W15/F7:** aparecen capacitación, cursos para equipos, formación corporativa y contacto/propuesta. **INFERENCIA:** Empresas debe aclarar destinatario, objetivo formativo y qué sigue al contacto. Personalización, seguimiento, métricas de retorno y capacidad de implementación de otros proveedores no son oferta confirmada de AI PlayGrounds.
- **EVIDENCIA OBSERVADA, W14/F10:** PoC y MVP tienen objetivos/entregables diferentes en fuentes comerciales. **INFERENCIA:** una conversación de interés no debe titularse como servicio de desarrollo listo para contratar. «Exploración de problemas con IA» sigue siendo propuesta de naming propio, no término de demanda demostrado.
- **EVIDENCIA OBSERVADA, W4/F6:** directorios de herramientas/apps muestran utilidad, categoría, enlace y postulación; pueden mezclar comercial/open source y tener anuncios/premium. F5 solo devolvió título, sin datos adicionales. **INFERENCIA:** oportunidad de descubrimiento funcional, condicionada a la elegibilidad y al inventario de Productos. No copiar monetización, rankings o cientos de categorías.
- **EVIDENCIA OBSERVADA, W6–W8/F8:** búsquedas amplias devuelven artículos/archivos y herramientas bibliográficas, mientras Daily Papers aporta un patrón real de colección de trabajos con fechas y atribución. **INFERENCIA:** Investigación necesita diferenciar trabajo original de herramienta para investigar y autor de postulante. La evidencia regional de una búsqueda genérica para el directorio es débil; no prometer revisión por pares o calidad científica por popularidad.
- **EVIDENCIA OBSERVADA, W9/W16/F9:** propósito, eventos, comunidad y rutas de participación aparecen en muestras CR/EC; FAIR tiene enlace a WhatsApp. **INFERENCIA:** Comunidad merece un recorrido de participación distinto de comprar formación o postular una entrada. No prueba presencia de miembros de AI PlayGrounds en esos países.
- **EVIDENCIA OBSERVADA, W10:** especialización en CO aparece como posgrado universitario con título/admisión/duración. **INFERENCIA:** evitar el nombre en lanzamiento para no crear expectativas de credencial distinta de los certificados pendientes de B1.
- **EVIDENCIA OBSERVADA, W12:** BR combina AI Engineering con engenharia, MBA y graduação. **INFERENCIA:** la comunicación latinoamericana debe precisar que la formación inicial es en español; no asumir que una etiqueta inglesa resuelve todo el contexto portugués.

## 7. Comparación regional explícita

1. **Señales consistentes:** cursos de IA, aprendizaje desde fundamentos y herramientas tienen señal en los siete mercados es. AI Engineering aparece en los siete, pero su volumen es más amplio que intención de curso. La convergencia sustenta hipótesis de lenguaje compartido, no una demanda LATAM agregada.
2. **Vocabulario:** «curso» supera al literal «formación» observado en cada país es; «formación» puede seguir siendo un buen nombre de área por abarcar workshops/full days/cursos/programas. «Capacitación» y «formación para equipos» aparecen en contexto empresarial. BR usa inteligencia/termos pt y denominaciones académicas propias.
3. **Intención:** cursos generales incluyen herramientas, fundamentos y formación académica; programar con ayuda e integrar modelos son tareas distinguibles. Empresas incluye capacitación e implementación en la muestra; Investigación mezcla artículos, repositorios y herramientas; hay que precisar contenido/acciones.
4. **Volumen material:** CO especialización 1900/HIGH sobresale frente a la misma keyword en otros países; cambia la cautela de naming, no la oferta. MX/AR tienen señales mayores de cursos que EC/CR en estas consultas; no justifica dejar de atender a los otros mercados ni traducir búsquedas a matrícula esperada.
5. **Oportunidades particulares:** expectativa de posgrado en CO y lenguaje académico pt en BR requieren claridad de formato/credencial. UTN aparece como búsqueda de marca AR; se descarta como oportunidad propia. No hay evidencia suficiente de cursos locales/servicios presenciales propios.
6. **Clusters robustos en los mercados es observados:** aprender IA y descubrir herramientas; robustez de necesidad más evidencia B1 para formación técnica/equipos y participación. No se declara que todas sus long tails tengan volumen alto.
7. **Clusters específicos:** no se propone ningún cluster nacional nuevo que encaje en oferta actual. Especialización CO y grados BR quedan fuera. Portugués es evidencia de otro mercado lingüístico, no un cluster mezclado con español.
8. **Naming:** AI Builder no como denominación global; Product Engineer como referencia, no categoría exclusiva. Proponer «Desarrollo de software asistido por IA» y «AI Engineering — construcción de aplicaciones y sistemas con IA», con explicación de integración, evaluación/operación según cada formación.
9. **Arquitectura/ownership:** Formación para personas y Empresas tienen tareas distintas; dentro de Formación distinguir asistencia e integración sin crear dos URLs hasta tener oferta y necesidad de página comprobadas. Productos e Investigación mantienen ownership separado. No evidencia que justifique URLs nacionales o por filtro ahora; es propuesta, no arquitectura final.
10. **Incertidumbres que podrían justificar nuevos mercados:** formación presencial/local real, pricing/medios de pago nacionales, expansión lingüística aprobada, catálogo que introduzca términos locales o intención específica. Esos datos no existen en B1; no se inventan para expandir por rutina.

## 8. Cierre de expansión geográfica

**Pregunta de control:** ¿consultar otro mercado puede cambiar una decisión material ahora?

- Tras los cinco iniciales, sí: EC y CR podían cuestionar la transferencia del vocabulario y la cobertura centroamericana. Se consultaron y reforzaron cursos/herramientas/etiquetas sin aportar una necesidad de página o promesa nacional distinta.
- BR sí podía cambiar la expectativa lingüística del alcance latinoamericano. Se investigó por separado; el resultado exige claridad sobre español y mantener portugués como decisión futura, no más volumen fusionado.
- Tras Planner y contraste web, no se identifica una decisión pendiente que UY/PY/BO/PA/GT/DO u otro país vaya probablemente a resolver mejor: falta catálogo/operación/criterios de inclusión, no más muestras de términos genéricos. **INFERENCIA:** bajo valor informativo marginal para naming y ownership actuales, basada en convergencia de los siete mercados es y contraste de fuentes de varios contextos. No es prueba de uniformidad de toda LATAM.

**Se detiene esta ronda por saturación de decisiones, no por máximo de países.** Reabrir si aparece una oferta local, diferencia lingüística aprobada o nueva categoría que pueda cambiar arquitectura. El research externo está suficientemente contrastado al nivel de categorías para proponer Gate B, no para decidir URLs de cursos/productos concretos.

## 9. Límites e incertidumbres reales conservadas

- Demanda aproximada y variantes del instrumento; salida limitada y período no explicitado. La competencia publicitaria no mide posicionamiento orgánico.
- Búsqueda web sin geolocalización nacional garantizada; patrones de muestra, no rankings/rentabilidad/representatividad exhaustiva.
- Mayor sustento de demanda para cursos/herramientas; menor señal exacta para investigación/comunidad y capacitación empresarial. Su función también responde al alcance y objetivos aprobados.
- Naming propuesto no validado por entrevistas ni prueba de comprensión; la evidencia externa ayuda a proponer, no aprueba automáticamente.
- Universo de Productos resuelto por el usuario tras el research: se admiten productos que integran IA y productos construidos con ayuda de IA. «Herramientas de IA» describe solo el subconjunto funcional correspondiente, no todo el directorio.
- Oferta, fechas, docentes, requisitos, precios y certificados no definidos; no convocatoria abierta. Personalización empresarial y resultados de formación no acreditados por la oferta de terceros.
- Curación, inventario, taxonomías/filtros, fuentes de uso/estado, actualización, enlaces, normas y permisos siguen pendientes. No postulación/publicación automática.
- Planes jurídicos y evolución Trust/Knowledge/Builders/Researchers/Recognition no son capacidades actuales.
- Las fuentes aportan evidencia de su contenido; sus claims comerciales de volumen, calidad, retorno o empleo no se trasladan al proyecto.

## 10. Propuestas para Gate B — requieren decisión humana

Todas tenían estado **PROPUESTA**, excepto las restricciones de B1 que ya estaban aprobadas. La tabla de clusters detallada está en `content/internal/02-research/keyword-map.md`. Este bloque es histórico; prevalece el cierre de Gate B del final.

1. **Naming y audiencia:** mantener Formación como área principal; usar «cursos de IA» cuando corresponda a una oferta real. Distinguir «Desarrollo de software asistido por IA» de «AI Engineering — construcción de aplicaciones y sistemas con IA». Usar audiencia amplia de desarrolladores/profesionales técnicos; no AI Builder/Product Engineer como puerta exclusiva. No comunicar cada formación como nivel avanzado o camino íntegro a producción.
2. **Empresas:** ownership principal de formación técnica para equipos en la única página aprobada. Sección secundaria «Exploración de problemas con IA», enfocada en expresar interés/conversar, sin compromiso de PoC/MVP o consultoría disponible. Identificar antes de copy qué adaptación a equipos realmente puede ofrecerse, sin copiar promesas de otros proveedores.
3. **Labs:** Productos e Investigación conservan directorios/fichas independientes. Productos comunica utilidad, destinatario, builder, estado, uso y acceso; Investigación pregunta/enfoque/resultados/autores/estado/recursos originales. No filtros convertidos automáticamente en páginas ni pagos/rankings/revisión científica implícita.
4. **Elegibilidad de Productos — decisión material abierta:** ¿admite productos que integran IA, productos construidos con apoyo de IA, o ambos? Si ambos, proponer un dato claro en la ficha sobre cómo interviene IA; no afirmar que todo listado sea una herramienta de IA. Esto puede ajustar el cluster K3, no se aprueba una opción por defecto.
5. **Cobertura y páginas:** mantener contenido inicial en español dirigido a LATAM, aclarando idioma de formación. No crear páginas por país ni portugués por las métricas observadas. El marco de ownership K1/K2/K3/K4/K5 y subnecesidades K1a/K1b es provisional; las páginas de oferta concreta se evalúan cuando exista catálogo.

Solicitar aceptación, corrección o rechazo por propuesta. Solo después de decisión humana puede consolidarse B2 con la síntesis de clusters aceptados. No avanzar a O/C, estrategia final, arquitectura final o E1 antes de ese gate.

## Historial técnico resumido — resuelto, sin vigencia actual

La versión anterior del CLI solo admitía PE/es; un intento incorrecto con LATAM y pruebas MX/CO fueron rechazados. Después hubo fallos ADC de reautenticación y scopes insuficientes. Inicialmente no se tenía websearch; una prueba posterior sí funcionó. El usuario corrigió y validó CLI, ADC/adwords, quota project y disponibilidad web antes de esta ronda. Los fallos históricos no aportaron métricas y no condicionan la disponibilidad actual. La nueva ronda sustituye las propuestas sin contraste del research anterior; conserva B1 y sus incertidumbres de oferta/evidencia.

## Revisión humana de Gate B — decisiones y reservas

**Fuente:** respuesta del usuario a las propuestas y preguntas de Gate B. Este registro actualiza el estado de las propuestas anteriores, sin alterar métricas ni atribuir la validación humana al research.

- **APROBADO:** aceptación general del research y del marco de clusters, con reserva expresa sobre el nombre «Desarrollo de software asistido por IA» (K1a). La pregunta sobre incluir «IA» en los nombres exige explicar la diferencia entre etiqueta interna, navegación y contexto del contenido; no se registra eliminación de IA del ámbito temático.
- **PENDIENTE:** nombre final de K1a. El usuario solicita alternativas. Las alternativas editoriales deben mantener la tarea de construir software con apoyo de IA, distinguible de integrar modelos/APIs; no tienen aprobación o demanda demostradas solo por proponerse.
- **APROBADO:** audiencia amplia y aceptación general de la dirección de naming, salvo la reserva localizada de K1a. No se interpreta «Sí» general como anulación de esa reserva explícita.
- **HECHO DOCUMENTADO:** «Exploración de problemas con IA» resulta interesante al usuario, que pide reforzar el interés en PoC/MVP según utilidad/atractivo y potencial de ingresos para la comunidad. **PENDIENTE:** formulación pública final. **APROBADO, base B1:** por ahora se recoge interés, sin prometer ejecución. No hay evidencia de precios, costos, capacidad o conversión que permita elegir el formato más rentable.
- **APROBADO:** Productos admite ambos universos: IA integrada en el producto e IA utilizada para desarrollarlo. Se mantiene independencia de licencia. **PROPUESTA:** registrar de forma comprensible cómo interviene IA en cada entrada, sin imponer un filtro nuevo ni presentar todo listado como herramienta de IA.
- **APROBADO:** español como idioma predeterminado; no portugués por ahora. **HECHO DOCUMENTADO:** el usuario contempla implementar versión inglesa. **PENDIENTE:** si debe publicarse junto al lanzamiento español o después de estabilizar esta primera versión; el usuario plantea expresamente el costo de mantener ambos idiomas mientras cambia el contenido.
- **PROPUESTA editorial:** para inglés dirigido al mismo público/tareas, reutilizar estrategia y arquitectura aprobadas cuando existan, con traducción adaptada al lector. No duplicar clusters ni investigar US por defecto. Si inglés apunta a otro mercado/oferta, requerirá contraste de lenguaje/intención en ese mercado confirmado antes de prometer SEO. La edición bilingüe exige actualizar ambas versiones cuando cambian hechos/condiciones/acciones.

**Estado del gate:** resolver naming de K1a, nivel de énfasis público de PoC/MVP dentro de captación de interés y momento de inglés antes de consolidar la base B2. No hay estrategia, sitemap ni copy aprobados.

### Actualización posterior de la revisión humana

Este bloque sustituye el estado de los puntos correspondientes del registro anterior; no modifica la evidencia de investigación.

- **HECHO DOCUMENTADO:** el usuario retoma «Ingeniería de software con IA» como alternativa de K1a y pregunta si debe presentarse en español o inglés, en relación con AI Engineering. **PROPUESTA:** usar «Ingeniería de software con IA» en español y mantener AI Engineering con explicación española de construcción de aplicaciones/sistemas con IA. El nombre inglés Software Engineering with AI no tiene preferencia regional demostrada por el research actual. **PENDIENTE:** confirmación de la denominación visible.
- **APROBADO:** enfoque de español para la primera etapa. Se difiere la preparación/publicación inglesa; no se crea ahora un Keyword Map inglés ni se investiga un mercado anglófono.
- **APROBADO:** aceptación de la explicación de clusters/uso contextual de IA y del enfoque de validación según necesidad, sin acreditar capacidad de ejecución o rentabilidad de PoC/MVP.
- **HECHO DOCUMENTADO:** el usuario no acepta «Exploración de problemas con IA» como denominación. Deja de ser el nombre recomendado activo de la propuesta empresarial secundaria.
- **PROPUESTA DEL USUARIO:** el recorrido secundario de Empresas podría dirigir al directorio Productos y revisar después PoC/MVP. **PENDIENTE:** confirmar si este enlace sustituye la captación de interés en PoC/MVP durante el lanzamiento o si ambas acciones deben coexistir. El «puede que» no se registra como CTA/destino definitivo aprobado.
- **Restricción vigente:** Formación continúa como oferta principal de Empresas y la página empresarial sigue siendo única. El directorio no acredita que AI PlayGrounds implemente, adapte o respalde todos los productos listados.

**Gate B actualmente pendiente:** denominación visible de K1a y decisión sobre destino/función del recorrido secundario de Empresas. El calendario inglés ya no bloquea esta etapa. B2 no consolidada.

### Última precisión del usuario

- **HECHO DOCUMENTADO:** preocupa que K1a sea el único eje nombrado en español dentro de una familia de términos ingleses. **PROPUESTA:** mantener nombres técnicos de ejes en inglés y explicar necesidades/resultados en español; esto no equivale a publicar una versión inglesa del sitio.
- **PROPUESTA de naming K1a:** AI-Augmented Software Engineering, acompañado de una descripción española sobre diseñar, construir, probar y mejorar software con IA. Alternativas editoriales: AI-Powered Software Engineering o Software Engineering with AI. Ninguna tiene demanda propia o preferencia regional demostrada en esta ronda; el naming aún requiere elección humana. Se mantiene la distinción funcional frente a AI Engineering.
- **APROBADO:** el usuario acepta el recorrido empresarial propuesto: Formación para equipos → conversación; descubrir soluciones existentes → directorio Productos; PoC/MVP → revisar posteriormente. Se sustituye la captación exploratoria PoC/MVP del lanzamiento por el camino secundario de descubrimiento, sin cambiar la prioridad formativa ni prometer implementación/adaptación de productos listados.

**Pendiente actual de Gate B:** elección de nombre visible K1a. El recorrido secundario de Empresas y el foco español de la primera etapa están resueltos. B2 sigue sin consolidarse.

### Cierre de Gate B — 30/09/2026

**APROBADO:** el usuario elige «Software Engineering with AI» y confirma «ese camino tomaremos por ahora». Se usa como nombre del eje K1a en esta etapa, con explicación en español de diseñar, construir, probar y mejorar software con apoyo de IA. «Por ahora» permite una revisión futura explícita, no deja esta decisión sin resolver.

Con esta elección se cierra el último punto del gate. Se consolidan únicamente las conclusiones aceptadas y las correcciones posteriores, incluido el recorrido secundario Empresas → Productos y la revisión futura de PoC/MVP. Las métricas no se alteran y el nombre elegido no se presenta como keyword de demanda propia demostrada. B2 conserva incertidumbres de oferta/operación/evidencia. Los registros anteriores de gate pendiente son historial, no estado vigente.

## Correspondencia con el contrato actual — sin nueva investigación

Preflight histórico de dos ejes, triangulación y Decision Delta por decisión se reconcilian en `content/internal/03-estrategia/dossier-evidencia-estrategica.md`, §§3–6, a partir de esta ejecución y sus W/F. No se afirma que el registro antiguo tuviera ese formato ni se inventa una comunicación histórica de Delta. Resultado de la reconciliación: prioridad formativa **CONFIRMA**; etiquetas exclusivas de audiencia **CAMBIA**; formación empresarial **CONFIRMA**; límites PoC/MVP **CONFIRMA** (su postergación es humana); Productos **CONFIRMA**; Investigación **CONFIRMA**; equivalencia de trabajos con herramientas bibliográficas **DESCARTA**; participación **CONFIRMA**; cobertura/idioma **CONFIRMA**. Rentabilidad PoC/MVP sigue **INCONCLUSO** por falta de precios, costos, capacidad y conversión. Ningún token crea aprobación nueva.
