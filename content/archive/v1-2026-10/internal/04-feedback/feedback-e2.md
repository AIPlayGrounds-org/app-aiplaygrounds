# Registro interno de feedback de E2

**Fecha:** 14/10/2026. **Pieza recibida:** E2 v1, Contenido Web — Borrador.
**Fuente:** conversación posterior a su entrega. El usuario primero solicita conversar sin editar; la petición actual autoriza aplicar lo conversado al Markdown de E2 usando la skill y la voz elegida. No se había editado durante la exploración verbal.
**Estado vigente:** E1 v15 APROBADO por el usuario; E2 v4 resincronizado integralmente, pendiente de aprobación final. No aprobación de publicación integral o datos ausentes. Los registros v15/v3, v14/v3 y v13/v2 siguientes conservan historia; la reapertura E1 queda resuelta.

## Tercera ronda — resincronización estructural integral desde E1 v15

**Fuente humana, 14/10/2026:** «Apruebo E1 v15»; solicita revisar todo E2, conservar bloques simples, explicitar unidades/campos/relaciones y faltantes en el cuerpo principal, sin UI ni datos inventados. Es feedback específico sobre E2 v3; no una petición genérica de continuar.

| Observación / alcance | Tratamiento | Fuente y resolución |
|---|---|---|
| Aprobación de E1 v15 | ACCEPT | Estrategia §1 y feedback-e1; resuelve bloqueo de resincronización. Arquitectura y voz intactas |
| Revisar todo E2, incluidas ambas fichas | ACCEPT | §§5.1–5.2/6; 63 bloques propios, mismos nombres/orden, copy y metadata válidos conservados |
| Guiones y modelos relegados a notas | ACCEPT | Modelos locales de evidencia, actividades, iniciativas, listados, personas, atributos, atribución, recursos y relaciones; esquema sin filas ficticias cuando no hay unidades reales |
| Bloques simples y estructuras comparables | ADAPT | Prosa para identidad/enfoque/modalidad/estado; 4 áreas, 2 líneas y 2 vías con información comparable respaldada. No cursos, planes o pasos de metodología inventados |
| Separar copy, modelos, pendientes, notas y UI | ACCEPT | Labels de trabajo y faltantes fuera del copy; destinos pendientes junto a cada acción; sin tarjetas u otros componentes prescritos |
| Continuar al siguiente gate | ACCEPT | Feedback E2 previo y actual resuelto dentro de E1 v15 aprobado: E2 v4 se entrega como Contenido Web — Versión Final, Estado: pendiente de aprobación final. Solicitar aprobación explícita; no marcar aprobado ni cerrar |

**Secuencia:** decisión humana → Estrategia/feedback/Dossier → snapshot E1 aprobado → E2 v4 derivado → QA/diff. No nuevos hechos C1–C10, research, aprobación anticipada, workspace maestro o tercer entregable. Datos y operación de §10 permanecen pendientes de publicación; no impiden representar fielmente el modelo aprobado. La versión editorial final incluye esos esquemas no publicables, sin fingir que el sitio esté listo para lanzar.

## Observaciones, resolución y dependencias

### QA de E2 v4 — resincronización integral, 14/10/2026

**Resultado:** 12/12 checks documentales correctos con `python -B /tmp/opencode/check-e2-v4.py`, comparando con el estado de trabajo capturado antes de editar. Son controles de este proyecto, no una suite de comportamiento de la skill.

- 63 nombres/órdenes idénticos en Estrategia/E1/E2 y E2 previo; diez páginas/tipos y reparto 7/8/6/7/6/5/9/5/7/3; ambas fichas sin Hero nuevo.
- 37 cuerpos públicos previos conservados literalmente; la consulta añade la condición sustentada sin contratación. Bloques simples sin tablas; cuatro áreas, dos líneas y dos vías conservadas. Metadata/H1 de diez páginas/tipos idénticos al baseline.
- Detalle arquitectónico aprobado de E1 y §§2–4/6–9 de Estrategia sin cambios: audiencias, mensajes, arquitectura, recorridos, SEO/AEO/GEO y voz preservados. Aprobación E1 registrada antes de la producción.
- 25 esquemas incompletos visibles en sus secciones, con campos/condiciones y no publicabilidad. No filas ficticias, celdas-guion, mega-tablas de páginas o tarjetas prescritas. Sin URLs, JSON-LD o código inventados.
- Seis acciones con destino pendiente bloqueadas localmente; condiciones públicas de espera, consulta, colaboración y postulación conservadas. Copy, estructura, pendientes, notas y UI se distinguen. Microcopy/estados operativos previos intactos, sin nuevas interfaces.
- Estado cliente coherente: E1 v15 aprobado; E2 v4 final pendiente, con solicitud explícita y sin bloqueos E1 obsoletos. Solo seis documentos previstos cambiados; skill, research, brief, matrices y registros históricos conservados. Tablas Markdown con columnas consistentes.

**QA editorial/semántico manual:** lectura completa de los diez apartados E2 y contraste con §§5.1–5.2/6 y E1 aprobado. Unidades, atributos obligatorios/condicionales y vínculos se muestran en el cuerpo; permisos/procedencia y restricciones fuera del copy. Casos/cifras/testimonios no se confunden; ni docencia por pertenencia, uso por madurez, licencia por gratuidad o resultados por estado de trabajo. No nuevos hechos C1–C10. La densidad de las descripciones conocidas de áreas/líneas se conserva; faltan valores reales para evaluar longitud de las futuras entradas/personas. Longitudes y accesibilidad visual siguen pendientes de materiales/UI.

**QA O/C:** O1/C1 conserva identidad, roles y límites; O2/C5 ofrece campos comparables sin inventario/filtros ficticios; O3/C2 distingue consulta de contratación; O4/C4 mantiene interés sin plaza, requisitos/certificados por definir; O5/C6 separa envío, incorporación y publicación, sin reglas inventadas; C7 conserva original/autoría/fecha y resultados con límites. No FAQ o secuencias por rutina. SEO/AEO/GEO conserva preguntas/bloques responsables y handoffs de descubrimiento, representación, gobernanza y medición; no certifica ejecución o visibilidad.

**Checks de paquete y diff:** `python -B .opencode/skills/web-content-design/scripts/check_package.py` → OK (frontmatter, 25 Markdown, enlaces locales, runtime y estructura de evals; no comportamiento). `git diff --check` sin incidencias. Diff revisado contra baseline de esta intervención, guardado en `/tmp/opencode/e2-v4-final.diff`. La ampliación de E2 responde a 63 bloques propios y modelos locales, no a nueva oferta o arquitectura. No suites de desarrollo de la skill, research, pruebas UI/técnicas, commit o push.

**Estado de salida:** E1 v15 APROBADO → feedback estructural E2 resuelto → E2 v4 Contenido Web — Versión Final, Estado: pendiente de aprobación final. No reapertura ni decisión estratégica pendiente. Próxima acción humana: aprobar explícitamente esta versión final o solicitar ajustes. Datos, permisos, canales y verificaciones documentados siguen bloqueando la publicación afectada, incluso tras eventual aprobación editorial.

### Segunda ronda: corrección de ubicación y revisión integral de copy

**Fuente posterior vinculante:** «No, lo que indique es que se desarrolle como una seccion en el home»; pregunta si debe ir antes o después de Labs; rechaza «con la formación como nuestra oferta principal» y pide seguir trabajando/editando el copy total con la skill y coherencia entre cambios. El agente recomienda antes de Labs; el usuario autoriza continuar, sin emitir todavía aprobación consolidada de E1 v14.

| Observación | Intención / alcance | Tratamiento y dependencias |
|---|---|---|
| Áreas como sección independiente | Corregir interpretación del agente, no una nueva área u oferta | ACCEPT: séptima sección en Inicio; propuesta de orden Hero, Qué es, Formación, Comunidad, Áreas, AI Labs, Evidencia. Total 63 secciones. La ubicación antes de Labs es recomendación del agente proyectada para revisión, no una aprobación humana inventada. Sustituye ADAPT de v13 que las anidaba en bloque 2. |
| Presentación institucional sin jerarquía comercial explícita | Voz cercana y participativa; evitar «nuestra oferta principal» y equivalentes en público | ACCEPT. Prioridad de Formación permanece en estructura/CTA y estrategia interna. Qué es presenta comunidad/intereses/actividad sin enumerar áreas o explicar Labs; cada sección hace su trabajo. No cambiar esa prioridad ni ocultar límites de oferta. |
| Revisar el copy total y su coherencia | Autorización editorial transversal sobre el documento adjunto | ACCEPT/ADAPT: revisar metadata, H1/H2, descripciones, labels, notas y referencias; lenguaje por tareas, sin fórmulas repetitivas, falsa disponibilidad o datos nuevos. Preservar voz B, nombres, pertenencia de áreas, directorios independientes, condiciones y modelos de campos. |

**Fuentes afectadas primero:** Estrategia §§1/4/6/8.12/9/10/11/12, Brief/adenda y Dossier C10/D7; después E1 v14 y E2 v3. Q19 pasa a Inicio/Áreas, mientras Q1 permanece en Qué es. G7 conserva responsables/eventos y revisa ambos bloques cuando cambien áreas/iniciativas. Sin nuevos clusters, herramientas, catálogo, fichas o páginas.

**Gate:** se mantiene la reapertura E1 ya abierta, corrigiendo su propuesta; no se solicita aprobar de nuevo voz, nombres o decisiones ajenas. E1 v14 contiene el Home de siete secciones; E2 v3 desarrolla ese orden como borrador revisado. No se titula E2 como final durante la reapertura. Siguiente acción: revisar y aprobar E1 v14 con el Home corregido y la distinción de Labs, o señalar ajustes. Los estados de versiones anteriores no prevalecen sobre esta ronda.

**QA de la segunda ronda, E1 v14 / E2 v3:** lectura completa del copy y notas; comparación confirma siete secciones en Inicio y 63 en conjunto, mismos nombres/orden en Estrategia/E1/E2 y sin cambios de estructura en las otras páginas. Áreas usa H2 independiente/cuatro H3 en orden; Qué es no desarrolla áreas o Labs ni declara jerarquía comercial. Formación conserva acceso desde Hero y ubicación temprana. Se revisan aperturas, titulares, metadata y descripciones en las ocho páginas, más labels/modelos de ficha; se preservan datos ausentes y condiciones. Campos Área de fichas distinguen taxonomía de uso/tema y pertenencia organizacional, sin relaciones inferidas.

**Revisión editorial final:** se elimina la formulación rechazada del copy público; se varían invitaciones y ritmo, se simplifica Labs y se conserva lenguaje sobrio sobre inscripción, contratación, aceptación y curación. Se mantiene explícito que una entrada no acredita origen en Labs, autoría o aval propio. No se completan mensajes de éxito/error, URLs, personas o evidencias sin soporte. Comprobaciones estructurales y de tablas/whitespace correctas; `git diff --check` sin incidencias. E1 v14 pendiente y E2 v3 Borrador, sin pedir aprobación final E2 durante esta reapertura.

### Primera ronda — antecedente v13/v2

| Ubicación / elemento | Comentario e intención | Tipo / impacto | Fuente interna afectada | Tratamiento / resolución |
|---|---|---|---|---|
| Inicio/Formación/Empresas: «formación técnica» | El usuario cuestiona su repetición y acepta nombrar la oferta como Formación, haciendo visible la profundidad por tareas y decisiones | Cambio editorial con dependencias de metadata, H1 y descripción de la misma oferta; no cambia rigor, audiencia o alcance | Estrategia §4/§9; Dossier; E2 §§1–3 | ACCEPT. Reformular las apariciones repetidas, sin sustituir indiscriminadamente «técnico» ni diluir la precisión. La evidencia existente no impone esa frase como keyword literal. |
| Ejes pendientes → áreas de AI PlayGrounds | Usuario fija orden: AI Foundations, AI for Software, AI for Science, AI for Finance; pueden surgir otras según iniciativas de la comunidad | Aclaración organizacional explícita; afecta identidad y relaciones, no crea cursos o programas | Brief/adenda; Estrategia §§1/4/6/8; C1 y trazabilidad del Dossier | ACCEPT. «Áreas» como término público; pertenecen a AI PlayGrounds, no a Labs. AI Foundations investiga la propia IA/modelos; AI for Science aplica IA a preguntas científicas. No son cuatro líneas formativas ni renombrado de AI Engineering / Software with AI. |
| AI Labs y directorios | Usuario describe un espacio donde nacen iniciativas/productos de aplicación de IA; cada área puede reunir varias iniciativas | Cambio conceptual respecto a E1 v12: directorios no equivalen al trabajo que nace en Labs | Estrategia §§5–8, D5/D7, C1; Inicio y Labs en E1/E2; mención dependiente en Empresas | ACCEPT del concepto. Distinguir iniciativa, resultado y colección; no atribuir a Labs todo producto/trabajo listado. No eliminar directorios, restringir su universo o crear páginas/filtros por área sin decisión humana. |
| Ubicación y presentación web de las áreas | Se pide una sección explicativa, sin ubicación web acordada; la redacción conversada no aprobó arquitectura | Dependencia material localizada respecto a E1 aprobado | Estrategia §6 y registros R2/R10/Q19; E1 v13 | ADAPT: proponer «Áreas que exploramos» como desarrollo dentro de Qué es AI PlayGrounds en Inicio, antes del bloque Formación, con cuatro piezas breves. Mantiene seis secciones en Inicio y 62 en conjunto, sin página/menú nuevo ni áreas bajo Labs. ESCALATE: aprobar esta proyección y la precisión de Labs en el mismo gate E1, sin reabrir resto del sitio. |

## Decisiones humanas vs propuestas de implementación editorial

**APROBADO por intervención explícita:** orden y pertenencia organizacional de las áreas, posibilidad de nuevas áreas; foco de AI Foundations («cómo funcionan y cómo mejorar los propios modelos»); concepto de AI Labs; voz B conservada. La petición actual autoriza redacción y actualización documental, no aprobación anticipada de un E1 revisado o de E2.

**PROPUESTA pendiente:** ubicación del desarrollo de áreas en Inicio/Qué es AI PlayGrounds; AI Labs/Iniciativas actuales pasa a mostrar iniciativas reales, cuando existan datos, y mantiene accesos a colecciones como recursos de descubrimiento. No se crea una ficha de iniciativa nueva; se reutiliza una ficha de producto/trabajo solo si el objeto y los datos encajan. Inventario de iniciativas, pertenencia a área, autoría, fuentes y permisos siguen PENDIENTES.

**Referencia humana:** https://labs.google/ aportada para conversar sobre un espacio de experimentación; lectura puntual ya realizada en esa conversación. Orienta el énfasis en iniciativas, no prueba capacidades propias, catálogo, filtros, acceso anticipado o madurez de AI PlayGrounds. No se repite fetch ni research/Planner. No hay nueva pregunta de demanda ni Decision Delta de investigación.

## Secuencia y estado de entrega

Feedback → Brief/Estrategia → Dossier → E1 v13 revisado pendiente → E2 v2 Borrador resincronizado, con propuesta afectada marcada. Se conserva aprobación histórica de v12 para todo lo no afectado; no se la transfiere a v13. No se fuerza cierre E2 mientras esté abierta esta reapertura localizada. Los datos operativos previos siguen pendientes, no originan otro gate.

**Siguiente acción humana:** aprobar o ajustar el E1 v13 revisado, específicamente la presentación de áreas en Inicio y la distinción entre Labs, iniciativas y directorios, conservando el resto. Después corresponde continuar la revisión E2 desde esa base; no volver a elegir voz o nombres formativos.

## QA posterior a resincronización

- E1 v13 deriva de Estrategia §§1/4/6/7/8.12 y C10; E2 v2 refleja esa propuesta, sin atribuirle aprobación anticipada. Ocho páginas/dos tipos y los 62 nombres de sección en el mismo orden, comprobados entre E1 y E2. Las cuatro piezas de áreas son desarrollo del bloque 2 de Inicio, no páginas/secciones adicionales.
- «Formación técnica» deja de repetirse en los campos públicos afectados de Inicio/Formación/Empresas; «técnico» se conserva donde precisa público, lenguaje o decisiones. No se hizo reemplazo general sobre evidencia o textos históricos.
- Nombres y orden de áreas comprobados; AI Engineering y Software with AI conservados como líneas. Ni cuatro cursos nuevos ni renombrado del eje formativo. Las áreas no pertenecen a Labs; el bloque de iniciativas queda vacío de datos hasta recibir inventario real, en lugar de rellenarlo con áreas o directorios.
- Revisión editorial final de metadata, copy y descripciones en conjunto: se mantiene voz B; se simplifica el H1 de Empresas, se evita prometer personalización y se elimina una cola genérica en Finance. Descripciones comparables por función, sin exigir igual número de palabras. Límites operativos, atribución y permisos conservados.
- Tablas Markdown y `git diff --check` sin incidencias; sin nueva consulta externa, research, cambios de Keyword Map, implementación o modificación de gates anteriores. No cierre ni aprobación final E2 durante la reapertura localizada.
