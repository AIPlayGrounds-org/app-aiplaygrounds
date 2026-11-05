# Registro de reconciliación editorial legacy → canónico

**Fecha:** 05/10/2026.
**Encargo:** migrar/reconciliar el proyecto con la versión actual de web-content-design, preservando estado, evidencia y decisiones; no reiniciar workflow ni avanzar a E2.
**Naturaleza:** registro interno de auditoría, no entregable formal ni fuente alternativa de estrategia.

## Inspección y etapa acreditada

Se inspeccionaron los doce artefactos editoriales legacy de la tabla, el contenido de `content/internal/`, la raíz del proyecto/README y el estado Git, junto con los contratos actuales de brief, matrices, research, estrategia, dossier, E1, arquitectura, dirección editorial y feedback. No existían rutas canónicas editoriales previas, E2 ni feedback-e2. `content/.opencode/` contiene dependencias del entorno, no artefactos editoriales; no forma parte de la migración. No se encontraron AGENTS.md en el repositorio.

| Etapa/artefacto | Estado encontrado | Estado tras reconciliación |
|---|---|---|
| Brief | Discovery de septiembre, decisiones/pendientes parcialmente anteriores a Gates y feedback | Discovery íntegro más adenda explícita; fuentes posteriores tienen precedencia localizada |
| B0 | Diagnóstico de ocho dimensiones y revisión parcial; mostraba Gate A aún pendiente en su snapshot | Antecedente histórico; B1 resuelve Gate A, no pregunta vigente |
| B1 / Gate A | Resuelto por «esta bien continua», tras aclaraciones y explicación | APROBADO como base de research; sin repetir Gate A |
| Research | Ronda 29/09 documentada, comparación regional/cierre, historial técnico y humano | Concluido; sin nuevas consultas, métricas o fuentes |
| B2 / Gate B | Resuelto 30/09 con «Software Engineering with AI» y «ese camino tomaremos por ahora» | Base consolidada conservada; sin repetir Gate B |
| Estrategia | Propuesta de 30/09, S1–S6/O-C/voz; sin arquitectura completa ni todo el feedback posterior | Fuente operativa completa conforme a doce secciones del contrato; decisiones aprobadas separadas de propuestas |
| Dossier | Registro de 03/10 con evidencia y decisiones, algunas responsabilidades estratégicas mezcladas | Trece secciones de evidencia/procedencia, triangulación/Delta/feedback; estrategia y voz referenciadas, no definidas aquí |
| Feedback E1 | ACCEPT/ADAPT 01/10 incorporado en E1/dossier, no suficientemente en estrategia | Registro íntegro; fuentes internas afectadas identificadas/actualizadas antes de E1; no ESCALATE acreditado |
| E1 | v5 03/10 revisado, pendiente de aprobación; voz A/B no elegida | v6 05/10 revisado, pendiente de aprobación; proyección desde internos vigentes |
| E2 | No alcanzado | No creado; tampoco feedback-e2 ni directorio vacío para simular avance |

Las aprobaciones se acreditan en registros existentes del proyecto; no hay export independiente de conversaciones completas en el repositorio. Se conservan citas/fechas registradas sin inventar mensajes adicionales. «Continua» en este encargo autoriza completar migración, no aprueba E1/voz.

## Mapa de archivos y retirada legacy

Rutas relativas a `content/`. Los destinos son las únicas fuentes vigentes de cada función; no se mantienen copias activas legacy. Para los archivos conservados casi íntegros, el traslado mantiene el contenido y los cambios se limitan a rutas/estado histórico explícito. Estrategia, dossier, feedback y E1 fueron reconciliados en destinos nuevos y comparados antes de retirar sus originales. No se mantiene un archivo legacy archivado que pueda confundirse con estado vigente.

| Archivo legacy encontrado | Archivo canónico | Tratamiento |
|---|---|---|
| `brief.md` | `internal/01-brief-diagnostico/brief.md` | Discovery íntegro; adenda de decisiones posteriores y módulo Directorio confirmado, sin diseñar sitemap en brief |
| `diagnostico-b0.md` | `internal/01-brief-diagnostico/diagnostico-b0.md` | Contenido analítico intacto; encabezado histórico/Gate A resuelto en B1 y referencia canónica; líneas citadas son de versión original |
| `diagnostico-b1.md` | `internal/01-brief-diagnostico/diagnostico-b1.md` | Sin cambio sustantivo; rutas y nota de precedencia de B2/feedback |
| `diagnostico-b2.md` | `internal/01-brief-diagnostico/diagnostico-b2.md` | Sin cambio sustantivo; síntesis aprobada de clusters intacta; rutas y precedencia localizada del feedback |
| `research.md` | `internal/02-research/research.md` | Ejecución/valores/historial íntegros; rutas, vigencia temporal y correspondencia de Delta, sin nuevas consultas |
| `research-queries.md` | `internal/02-research/research-queries.md` | Solo cambia referencia al CSV; seeds, comandos, W/F, URLs, observaciones y errores intactos |
| `keyword-map.md` | `internal/02-research/keyword-map.md` | Tabla e historial intactos; rutas y distinción de cierre vigente/estados históricos/atribución posterior |
| `keyword-observations.csv` | `internal/02-research/keyword-observations.csv` | Byte a byte, sin cambios |
| `estrategia-contenido.md` | `internal/03-estrategia/estrategia-contenido.md` | Reconciliación sustantiva documental: S1–S6/O-C integrados, feedback, estado, públicos/mensajes/modelo, 59 secciones/9 tipos, recorridos, SEO/IA, voz completa, dependencias/trazabilidad/QA |
| `internal/strategy-evidence.md` | `internal/03-estrategia/dossier-evidencia-estrategica.md` | Evidencia, límites e historia preservados; preflight histórico, ejecución/triangulación, mapa/Delta, motivos arquitectónicos, ledger/riesgos/precedencia. No simple rename; voz/especificación operativa únicamente en estrategia |
| `feedback-e1.md` | `internal/04-feedback/feedback-e1.md` | Ledger/contexto/economía íntegros; metadatos/versiones y tabla de fuentes internas afectadas |
| `direccion-contenido-estructura-web.md` | `entregables-cliente/01-direccion-contenido-estructura/direccion-contenido-estructura-web.md` | Resincronización v6: públicos compactos, vista general y tablas por sección/página, recorridos separados, voz/pendientes/después; sin cambio de arquitectura/orden ni aprobación |

## Brechas de contrato corregidas

1. **Arquitectura ausente en estrategia:** la propuesta registrada en E1 v5/dossier no podía generarse completa desde la estrategia legacy. Se reconcilió internamente contra B2, estrategia previa y feedback: siete páginas base, dos tipos repetibles, 59 secciones. Se conserva como PROPUESTA; no se transforma E1 histórico en autoridad de decisión.
2. **Feedback no sincronizado en fuente operativa:** AI Labs como espacio; eje/línea/ruta; sin identidad Builder; eventos temprano; Inicio sin selector/equivalente; Hero funcional; ambas fichas con campos y conexiones reales; modalidades y futuras escuelas. Se actualizó estrategia primero y E1 después.
3. **Responsabilidad Estrategia/Dossier:** la estrategia define estado/resultados/públicos/mensajes/páginas/secciones/recorridos/voz/pendientes; Dossier explica evidencia/procedencia/razones/limites/historia. Dossier no crea gate ni se aprueba.
4. **Dirección editorial incompleta internamente:** se explicitaron voz/tono contextual, tratamiento/formalidad, tecnicidad/densidad, estilo/recursos/límites de las mismas dos opciones. Las seis muestras comparables existentes se conservan literalmente; no se elige voz.
5. **Research bajo contrato anterior:** se normalizaron preflight/triangulación/Decision Delta desde evidencia existente, no se repitió research. No se inventa `command -v`, ruta CLI observada, JSON completo, comunicación histórica de tokens, períodos/red ni fuentes originales ausentes.
6. **E1 comprimido:** se sustituyó tabla de secuencias en megaceldas por vista general y tablas sección por sección, incorporando tabla compacta de públicos y apartado posterior separado. Se redujo detalle metodológico/geográfico cliente, conservado en internos; no se descarta evidencia.
7. **Estados históricos confundibles con pendientes vigentes:** B0/brief/research/Keyword Map mantienen historial con precedencia explícita. No nuevo Gate A/B, naming pendiente falso, PoC/MVP activo o oferta inglesa de lanzamiento.

## Verificación de conservación y trazabilidad

- CSV: **198 observaciones**, idéntico al original; SHA-256 `dc524b14d8ee488beeb838bdf4708271a8f844165399a6c3789b92206b0a2ce4`.
- Registro de consultas: igualdad completa tras sustituir solo la ruta del CSV; conserva conjuntos/seeds/comandos, W1–W16, F1–F10, URLs y seis errores HTTP 429.
- Brief: todo el discovery original desde «Encargo y alcance» hasta pendientes conservado literalmente, antes de la adenda.
- B0/B1/B2: ocho dimensiones/síntesis, decisiones, restricciones y pendientes preservados; cambios de texto restringidos a metadatos/rutas/precedencia. Todas sus tablas históricas son idénticas.
- Research/Keyword Map: tablas de evidencia y clusters históricas idénticas; cambios revisados por tramos, sin alterar métricas o decisiones humanas.
- Feedback: bloque completo de normalización/ledger/contexto/modelo económico conservado literalmente; cubre puntos 1–23, sin omisión silenciosa.
- Arquitectura: comparación automatizada E1 legacy → estrategia canónica → E1 v6: mismos nueve tipos y 59 secciones en idéntico orden (solo se abrevia el rótulo «Descubrimiento de Productos como camino secundario» en la tabla, con función secundaria conservada).
- Voz: seis filas de muestras emparejadas idénticas en estrategia y E1; dos propuestas, ninguna aprobación.
- Revisión editorial de estrategia/dossier: cadenas S1–S6, clasificación/exclusiones O/C, evidencia/Delta/errores/limitaciones, feedback, riesgos, precedencia y decisiones anteriores sustituidas reconciliados por función. Especificaciones nuevas son desarrollo documental de propuesta existente, no capacidades o decisiones nuevas aprobadas.
- Trazabilidad E1: sus ocho apartados corresponden a estrategia §§1–12 y Dossier/feedback según tabla de estrategia §11. No audiencias/páginas/secciones/CTA/condiciones/voz estrenadas por E1.
- Referencias canónicas explícitas comprobadas; sin referencias operativas a rutas retiradas, whitespace defectuoso, segundo E1/estrategia/dossier activo, E2 o feedback-e2.

Verificación ejecutada con comprobación temporal externa al proyecto y revisión de diferencias; no se agregan tests de aplicación ni se modifica la skill/infraestructura. Los registros de etapas y referencias W/F siguen auditables en los archivos canónicos. Las rutas de la tabla se conservan aquí solo como mapa histórico, no como enlaces operativos.

## Decisiones preservadas y pendientes reales

Se preservan alcance Multipágina/Empresas única, Formación principal, identidad comunitaria, rigor/profundidad accesible, público técnico amplio, naming de las dos líneas, ambos universos Productos, directorios independientes, español primero/inglés posterior, Empresas → Productos y PoC/MVP diferido, lista sin convocatoria, WhatsApp general/core con conversación y límites de evidencia/publicación. Las aclaraciones ACCEPT son vinculantes en su alcance; ADAPT no se convierte en promesa pública. La propuesta arquitectónica resultante no se considera aprobada globalmente.

**Bloqueos de avance a E2:** aprobación humana consolidada de E1 y selección de voz A/B, en el gate E1 existente.

**Pendientes de contenido/operación/publicación afectados:** catálogo/requisitos/docentes/resultados/fechas/duración/precios/certificados; mecanismo y condiciones de lista/contacto/formularios; eventos/enlaces/normas/moderación; entradas/corpus/criterios/curación/filtros/actualización/postulación; fuentes/atribución/relaciones/permisos/cifras/casos/testimonios; países representados y estadísticas 23%/6% si se quisiera publicarlos. Responsable/fuente esperada: equipo AI PlayGrounds y originales pertinentes. Matriz operativa en estrategia §10.

PoC/MVP, idiomas adicionales, escuelas, verticales maduras, modelo económico y capas sociales son evoluciones diferidas, no bloqueos nuevos para aprobar E1.

## Etapa exacta al cierre

**Feedback E1 incorporado → fuentes internas reconciliadas y sincronizadas → E1 v6, Dirección de Contenido y Estructura Web — Versión revisada, pendiente de aprobación humana y elección de voz.** Gate A y Gate B permanecen resueltos; research concluido. E2 no iniciado. Esta migración no exige un gate adicional ni equivale a aprobación editorial.
