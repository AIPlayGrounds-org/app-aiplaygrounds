# Reconciliación de decisiones · estado canónico

05/10/2026. Encargo humano actual: partir del baseline, reconciliar decisiones con el rerun y dejar una única fuente operativa en `content/`, preservando snapshot y `content-rerun/`. Este registro se creó **antes** de modificar Estrategia, Dossier, feedback o E1. La autorización de reconciliación no aprueba el E1 ni elige voz.

## 1. Conservación previa y alcance

- Snapshot completo, histórico y no operativo: `content-snapshots/baseline-pre-reconciliacion-2026-10-05.tar.gz`. Contiene `content/` tal como estaba antes de esta reconciliación, con E1 v9.
- Verificación previa: 3671 archivos, incluidos siete enlaces simbólicos a archivos. Igualdad de rutas/bytes entre árbol y archivo; los enlaces se conservan como tales en el tar. No se sobrescribió un snapshot existente.
- SHA256 del archivo: `f5b073ba27b83874d757399c5bdcdf746732346e188c34cb594d82a8890244d5`.
- SHA256 agregado del baseline: `beef2352e53764bb005849c5c23b2e5fd456ea6d874dec820f2bbd11b09c4da3`.
- `content-rerun/`: 14 archivos; SHA256 agregado inicial `e4f5a70f394e05618cac4e98a43df7fdca3b4371ac5eb63d5ac59f488c90634f`.

Método agregado de esta verificación: ordenar **cadenas de rutas relativas** lexicográficamente y concatenar para SHA256 cada ruta UTF-8 y el digest SHA256 de sus bytes. Difiere de la ordenación por objetos Path usada en la comparación anterior; los hashes agregados de ambos métodos no se comparan entre sí. La igualdad directa con el snapshot verifica el baseline sin depender de ese cambio de ordenación.

Fuentes decisionales: baseline Estrategia/Dossier/E1/feedback y matrices; rerun Estrategia/Dossier/research y `content-rerun/internal/comparacion-baseline-rerun.md`; contratos vigentes de la skill, especialmente feedback, arquitectura, SEO/IA y calidad. Brief, B0/B1/B2, Keyword Map y research de mercado no requieren reescritura ni investigación nueva.

## 2. Matriz de diferencias reales y decisión antes de aplicar

La autoridad humana se distingue del criterio editorial del agente. Salvo instrucciones explícitas, las resoluciones de arquitectura/modelo/recorrido son **PROPUESTA** operativa reconciliada; se revisan en el mismo E1 pendiente. No se usan ACCEPT/ADAPT como aprobación de Gate A/B.

| Tema | Baseline | Rerun | Decisión reconciliada | Motivo | Fuente/autoridad |
|---|---|---|---|---|---|
| D01 Beneficio SEO + IA | Aplicación cliente completa; encabezado genérico | Encabezado identifica SEO e IA | Adoptar encabezado explícito y explicación de recuperación generativa; conservar tabla y ownership baseline | Cumple contrato y hace visible el servicio sin informe técnico | Petición actual §1, norma vigente E1; instrucción humana explícita |
| D02 Control de registros | Campos por tipo y claims C6–C8; identificación/vigencia/permiso, sin esquema compacto de control interno | id estable, fuente, permiso, postulante, estado editorial | Adoptar control mínimo común por entrada, referenciado al Dossier, sin nuevos documentos por dato | Evita duplicación tarjeta/ficha, cambios de URL y confusión autor/remitente/estado de objeto vs editorial | Rerun §5; baseline §5.1/Dossier §9; recomendación inferida autorizada para evaluación |
| D03 Candidatos de fichas | Ya condicionales, sin contraste específico de tres definiciones | N1–N3 de Schema.org observadas 05/10 | Incorporar evidencia al Dossier y precisar S3/S4; ficha editorial y objeto original separados | SoftwareApplication representa aplicación; ResearchProject hereda Organization, no una obra por label; CreativeWork no da autoría al resumen | Fuentes primarias N1–N3, registro rerun; petición actual §3 |
| D04 Acceso directo a colecciones | Recorrido explícito vía Labs; Empresas ya lleva a Productos | Colecciones directamente desde navegación y entrada propia | Adoptar accesos directos propuestos desde navegación, además del recorrido contextual por Labs | Responde a quien busca producto/trabajo, sin convertir Labs en paso obligatorio ni cambiar su función | Tareas K3/K4 y Q17/Q18; permiso condicional del encargo §4, sin conflicto humano |
| D05 Menú específico | No agrupación exacta definida | Agrupar accesos bajo AI Labs | No fijar esa agrupación; definir visibilidad directa de Productos e Investigación junto a acceso propio de Labs | El resultado de acceso puede fijarse sin inventar interfaz, jerarquía visual o prueba de usabilidad | Criterio editorial; alcance ya aprobado, diseño pendiente |
| D06 Formación: orden | Punto de partida, Enfoque, Líneas | Punto de partida, Líneas, Enfoque | Conservar orden baseline | El enfoque explica profundidad desde fundamentos antes de nombres técnicos; no evidencia de que invertir mejore evaluación | H2/H3 del registro rerun; feedback 6–8; inferencia editorial, no orden aprobado por defecto |
| D07 Formación: estado/lista/dudas | Bloques independientes y ownership de datos futuros | Estado/lista unidos, dudas dispersas | Conservar tres bloques, con respuestas breves cuando haya datos | Disponibilidad, compromiso y evaluación de oferta son preguntas distintas; compactar pierde ownership sin catálogo | Baseline Q2/Q4 y C2/C3; necesidades desde brief y decisiones humanas |
| D08 Inicio compacto y Equipo | Identidad/evidencia independientes; Equipo en navegación | Identidad en Hero, evidencia con actividad y nuevo bloque Equipo | Conservar seis secciones baseline y acceso Equipo en navegación | Hero no sustituye explicación; evidencia puede servir a varias tareas. Página Equipo no obliga a un nuevo bloque Home | Feedback 13–15 y Equipo; recomendación actual §6, criterio editorial |
| D09 Empresas: alcance/enfoque | Necesidades y Alcance separados | Combina destinatario/alcance y añade enfoque | Conservar bloques baseline; no nuevo enfoque empresarial por consistencia | Permite evaluar encaje antes de alcance; no hay metodología o adaptación cerrada que justifique otro bloque | H4/H12; baseline §6 y Q5; sin evidencia nueva de oferta |
| D10 Comunidad: dos acciones | Acceso WhatsApp y solicitud de colaboración separados | Ambas acciones en un bloque | Conservar separación | Ingreso general y conversación previa tienen estados distintos | Decisión humana H8, feedback 12; O5/C6 |
| D11 Labs: compactación | Concepto, mapa de iniciativas, explicación de colecciones y conexiones | Colecciones juntas y contribución explícita | Conservar estructura baseline; participación continúa hacia Comunidad | Protege función del espacio y explicación de cada iniciativa sin crear alta Labs separada | Feedback 1/16/17/20; baseline Q15/G7 |
| D12 Colecciones: selección/procedencia | Universo/criterios, Exploración, Fichas y Postulación | Añade bloques de selección/actualización, reúne exploración/tarjetas | Adoptar contenido de transparencia dentro de Universo y criterios/tipos y Postulación y revisión; no nuevo bloque | Aporta límites de curación/fuente/revisión sin duplicar dato o perder decisión antes de clic | Rerun P6/P7, baseline C3/C6/C7/Q10/Q17/Q18/G2/G4/G5 |
| D13 Producto 9→7 | Nueve secciones conservadas por feedback | Clasificación en identificación y recursos con acceso | Rechazar compactación; nueve secciones y mismo orden | Instrucción humana explícita prevalece; controles se añaden sin cambiar arquitectura | Feedback 18 y petición actual §7 |
| D14 Investigación redistribuida | Identificación/pregunta, Autores, Tipo/fecha/estado, Enfoque, Resultados/límites, Recursos, Relaciones | Pregunta movida y Estado separado | Conservar siete secciones baseline sin redistribución | Feedback pidió conservar ficha; no nueva evidencia autoriza alterar esa organización | Feedback 19 y petición actual §7 |
| D15 Equipo: cierre | Continuidad hacia actividad, contribución específica si acreditada | Solo Contribuciones en contexto, condicional | Conservar cierre baseline | Permite continuar aunque no haya obra individual documentada; link no equivale a autoría | Petición Equipo y baseline R4/R9; criterio editorial |
| D16 Equipo: foto | Foto prevista, tratamiento sin foto pendiente | Foto opcional | Adoptar imagen condicional; identidad/rol/bio siguen necesarios; diseño sin foto por resolver | Falta de foto/permiso no debe impedir presentar una persona con datos suficientes | Rerun modelo; ninguna decisión humana exige foto; C8/G6 |
| D17 Uso/resultados desconocidos | Condicionales a evidencia | Condición obligatoria con desconocido explícito | Conservar campos condicionales baseline | No pedir métricas/resultados inexistentes ni convertir silencio en adopción; desconocido se indica solo si altera decisión | H6/H7 y modelos C6/C7; prevención de regresión |
| D18 Slugs y nuevos IDs de entidades | URL estable como handoff, nombres/IDs existentes | Slugs concretos y AI for Science separado como entidad | No importar slugs ni nuevos IDs por presentación | Sin publicación ni corpus que requiera resolver URL concreta; concepto Science ya vive en contexto. id editorial ≠ slug | T3/S3/S4 y alcance existente; proporcionalidad |
| D19 Desagregación de claims | C1–C9 y límites/contexto internos | C1–C13 para familias similares | Conservar C1–C9 y añadir control mínimo por registro | Más filas no aportan evidencia; planes excluidos ya documentados | Baseline Dossier §9 y feedback/contexto |
| D20 Exploración de colecciones | Q17/Q18 explícitas hasta lista/campos | Cobertura explícita menos precisa | Conservar Q17/Q18 y sus respuestas | Son preguntas previas a abrir ficha, distintas de detalle/postulación | Baseline §8.3; petición actual §8 |
| D21 Gobernanza Labs | G7 por cambio de iniciativa/relación y menciones | Sin equivalente completo | Conservar G7 y revisar también nuevos enlaces directos | Relación de iniciativa no es versión de entrada; acceso directo no suprime contexto/gobernanza | Baseline §8.9, feedback 1/16/17 y petición actual §8 |
| D22 Readiness sin oferta y política bots | Candidato pendiente por datos; T5 decisión propietaria explícita | NO APLICA en áreas sin objeto; discovery agrupado resuelto | Conservar pendientes de candidatos y marcar T5 con token APLICA — pendiente en cada fila | La ausencia de base no vuelve irrelevante la capa; handoff no decide política | Contrato vigente readiness, baseline §§8.6/8.10 y petición §9 |
| D23 Medición | Periodos comparables de 30 días, señales/proxies/accesos pendientes | 28 días y eventos más separados | Conservar plan de 30 días y límites baseline | Ninguna evidencia nueva justifica cambiar periodo; fuente operativa ya suficiente | Baseline §8.8; recomendación inferida |
| D24 Muestras de voz | Seis contextos con Formación/Producto/Empresa | Seis contextos con Comunidad/Investigación | Conservar dos opciones y muestras baseline | Cumplen contrato y cubren compromisos principales; sumar variantes alarga E1 sin elección humana | Baseline §9; sin voz aprobada; encargo actual exige dos opciones |

## 3. Autoridad, fuentes y estado único

**APROBADO por instrucción actual:** reconciliar bajo `content/`, preservar snapshot/rerun, mantener fichas cuando feedback vinculante, visibilizar SEO+IA, conservar pendientes y detenerse en E1. Las resoluciones D02–D24 se aplican como selección editorial sustentada dentro de ese encargo; no se inventa aceptación del usuario de un menú, campo, orden nuevo o voz. E1 resultante v10: Versión revisada, pendiente de aprobación consolidada.

Los registros históricos de conversaciones son secundarios donde no hay transcript. Se preservan fuente/fecha/alcance; las citas existentes no se amplían y ninguna propuesta previa gana autoridad por ubicación. No se interpreta el uso de «Investigaciones» en el encargo como orden de renombrar la página: se conserva el nombre canónico **Investigación** y las entidades actuales.

La Estrategia en `content/internal/03-estrategia/estrategia-contenido.md` queda como única fuente operativa. El rerun y el snapshot son históricos, sin edición ni aprobación pendiente paralela activa. Sus pendientes se consideran antecedentes de la revisión del E1 canónico, no otro workflow para continuar.

## 4. Preservación de decisiones humanas

| Decisión / autoridad existente | Destino operativo que debe conservarse |
|---|---|
| Multipágina, Formación central, Empresas una página, español/LATAM e inglés posterior · B1/B2 | Estrategia §1; E1 §§1/4; sin cambio de alcance |
| Aplicación real/rigor y profundidad como destino · Gate A | Estrategia §§1/4/6; E1 Formación, no barrera avanzada |
| Nombres de líneas, no rutas disponibles · Gate B/feedback 6 | Estrategia §§1/6/9 y E1 Formación; nombres exactos |
| Empresa formación/conversación, Productos secundario; PoC/MVP después · B2 | Estrategia Empresas/§7 y E1; no nueva ejecución/captación |
| Comunidad WhatsApp; core formulario/conversación; Eventos temprano · B2/feedback 12 | Estrategia Comunidad y E1; dos acciones diferenciadas |
| Labs incuba; colecciones independientes, conexiones reales · feedback 1/16/17/20 | Estrategia Labs/R2/R8/G7 y E1; acceso directo no altera relación |
| Producto mixto, open source opcional, Creado por, estado/uso separados; conservar ficha · B2/feedback 9–11/18/21 | E1 nueve secciones y modelo §5.1; no identidad Builder |
| Investigación: conservar ficha, resultados/límites, autoría/original · feedback 19/20 | E1 siete secciones y modelo §5.1 |
| Home sin selector ni equivalente; Hero funcional, no en fichas · feedback 13–15 | Arquitectura Inicio y fichas intacta; acceso Equipo no crea selector |
| Equipo solicitado · feedback posterior 05/10 | Octava página, acceso navegación, datos/voz pendientes |
| Economía/ejes/evolución como contexto, no beneficios garantizados · feedback 2–8/22 | Contexto y restricciones §1/§4/§10; sin promesas públicas |
| Evidencia/permiso y no sumar seguidores · brief/B2 | Claims C5/C9 y gobernanza; sin cifras verificadas por reconciliar |
| Revisión E1 no equivale a aprobación · feedback 23 y encargo actual | Gate E1/voz PENDIENTE, E2 no iniciado |

## 5. Aplicación y QA

Aplicación completada: matriz previa → Estrategia/Dossier → registro de feedback → resincronización E1 v10. Cuatro documentos existentes modificados y este registro nuevo en `content/`. Snapshot y README fuera del estado operativo; no merge textual, regeneración de diagnósticos/research ni nuevas consultas.

### Trazabilidad de cambios aplicados

| Decisión | Fuente operativa actualizada | Proyección / comprobación |
|---|---|---|
| D01 SEO+IA visible | Estrategia §8.11, Dossier §13 | E1 §4.3: encabezado con SEO e IA, razón suficiente y tabla aplicada; recuperación generativa distinta de IA temática; cuatro límites |
| D02 Control mínimo | Estrategia §5.1 y §8.9; Dossier §9 | Identificador/fuente/permiso/estado/remitente internos en mismo registro, sin campos o estados técnicos en E1 |
| D03 N1–N3 | Dossier §9; Estrategia §8.6 S3/S4 | Candidatos por objeto pendientes, ficha-original separados; CONFIRMA principio baseline, DESCARTA uniforme fue el Delta del rerun |
| D04/D05 Acceso directo | Estrategia §§5/7/8.4 R4 y §8.11; Dossier/feedback | E1 §§4.1/5/7, recorrido adicional explícito; Labs sigue propio y contextual; interfaz no elegida |
| D12 Transparencia | Estrategia §6 Universo/Postulación de colecciones | E1 mismos bloques con criterios/fuente/revisión; filtros/listado separados y Q17/Q18 completos |
| D16 Foto condicional | Estrategia §§5.1/6/10; C8/feedback | E1 Equipo y pendientes, sin imágenes/personas/credenciales ficticias |
| D20–D22 Preservación | Q17/Q18, G7 y desglose T5 §8.10 | Sin regresiones de exploración/gobernanza/política propietaria; decisión T5 sigue APLICA — pendiente en las diez páginas/tipos |

### Control de completitud y E1 ⊆ internos

Antes de proyectar: **sí**, todas las secciones sustantivas pueden producirse desde internos vigentes como propuesta pendiente de aprobación. Después: comparación del diff completo de E1 con su fuente; ningún cambio cliente se origina solo en E1.

- E1 §§1–3 conserva resultados, públicos y mensajes de Estrategia §§1–4.
- §4.1 deriva de §5, incluyendo accesos directos/Equipo y sin páginas nuevas.
- §4.2 coincide con §6 en nombres, orden y contenido material; transparencia y foto condicional estaban definidos antes en internos.
- §4.3 deriva de §8.11 y las cadenas §§8.1–8.5; no expone control interno, matriz de decisiones, candidatos ni implementación.
- §5 deriva de §7; §6 conserva exactamente las dos opciones/seis muestras de §9; §7 deriva de §10 y deja la aprobación global pendiente.

### Resultados de verificación

| Control | Resultado |
|---|---|
| Snapshot | SHA256 del tar sin cambios; archivos originales conservados, incluidos destinos de siete enlaces simbólicos |
| Rerun | 14 archivos y SHA256 `e4f5a70f394e05618cac4e98a43df7fdca3b4371ac5eb63d5ac59f488c90634f` idénticos antes/después |
| Alcance de edición | Exactamente cuatro archivos existentes cambiaron; ningún archivo baseline eliminado. Brief, B0/B1/B2, research, Keyword Map, CSV y registro de migración sin cambios |
| Decisiones humanas | Tabla completa de Estrategia §1 y contexto interno idénticos al snapshot; feedback histórico preservado íntegro, con adenda actual separada |
| Arquitectura | Nombres/orden de las diez páginas/tipos idénticos al baseline y sincronizados entre Estrategia/E1: 8 bases, 2 fichas, 62 secciones. Producto 9, Investigación 7 |
| Ownership/readiness | 18 preguntas con Q17/Q18; diez filas y doce capas por fila; estados resuelto/pendiente/NO APLICA y dependencias conservados. T5 pendiente separado de T1–T3; G1–G7 completos |
| Evidencia/claims | C1–C9 conservados; control por registro y N1–N3 incorporados con fuente/fecha/alcance/Delta; valores e inventario no inventados |
| Cliente | Encabezado SEO+IA, aplicaciones concretas y límites, sin Keyword Map/readiness/JSON-LD/robots/matrices internas. 26316 → 26295 caracteres: no aumento de longitud |
| Workflow | E1 v10 Versión revisada, pendiente de aprobación; voces sin selección; ningún E2 o feedback E2 creado |
| Diff | `git diff --check` sin errores; revisión de cambios localizada y sin implementación/configuración |

La comprobación documental automatizada verificó snapshot/integridad, alcance de archivos, preservación humana exacta, arquitectura/correspondencia, preguntas/capas/gobernanza y ausencia de filtración técnica/E2. No certifica hechos por verificar, usabilidad o ejecución de SEO.

### Revisión editorial humana específica y natural

Revisados apertura, propuesta, tablas de arquitectura, SEO+IA, recorridos, voz y pendientes en conjunto. Se conserva la explicación de comunidad/rigor y las tareas de cada colección; el encabezado permite identificar el servicio al hojear. Se recortó la explicación de referencia de Equipo y la repetición del cierre SEO+IA para compensar el nuevo recorrido y los matices de fuentes/revisión. No se copia prosa del rerun ni se amplía E1 con burocracia interna. Condiciones junto al compromiso: espera sin cupo, conversación sin contratación, curación sin aval, autoría y resultados con soporte.

### Pendientes reales

Aprobación del E1 canónico y elección de voz; catálogo/certificados/docentes/datos de oferta; canales y gestión de capturas/contactos/participación; reglas/curación/filtros/inventario; personas y permisos; evidencia propia y cifras vigentes. Política de crawlers y verificación técnica/medición posterior conservan responsable propuesto y momento, sin ejecución. El acceso directo y tratamiento visual sin foto aún deben concretarse en diseño cuando haya contenidos publicables.

La reconciliación deja un estado canónico único y coherente. No declara aprobado/publicable el sitio ni utiliza «más reciente» como criterio de autoridad.
