# Suite E2E — recorridos por etapas

Casos en contexto conversacional separado por E2E. Ejecutar turnos secuencialmente; adjuntar únicamente la fixture descrita. No resumir aprobaciones: el turno del cliente que cierra gate debe ser inequívoco. Los casos terminan en etapa indicada; no añadir salida posterior no solicitada. Son casos diseñados y requieren ejecución para obtener evidencia conductual.

## E2E-01 — B0 → Gate A → B1 → research → Gate B → B2 → E1 (One Page)

**Fixture única:** asesoría de inventario para pequeñas distribuidoras de Lima; alcance contratado: One Page; ofrece diagnóstico de proceso y plan de mejoras, no implementa software; equipo revisa presencialmente; un caso autorizado documenta reducción de diferencias en una empresa concreta, no resultado típico; CTA real es solicitar consulta a `/contacto`; no hay precio/plazo aprobado ni dirección editorial aprobada; mercado Perú. Usar fuentes web públicas pertinentes, pero no atribuirles hechos sobre el cliente.

**Observable transversal de E1 para E2E-01/02/03/07/08:** Estrategia interna completa y Dossier separado alimentan un E1 derivado, autónomo y orientado a comprender/decidir/aprobar. No depende de metodología interna, separa decisiones para aprobar de información completables después y presenta audiencias y arquitectura por página/sección en tablas legibles, con recorridos propios. Si no existe dirección editorial aprobada, presenta exactamente dos direcciones y 5–6 muestras comparables por opción, exista o no guía verbal; si ya está aprobada, no reabre alternativas. El Dossier no es Estrategia ni entregable; la ruta canónica es `content/internal/03-estrategia/dossier-evidencia-estrategica.md`. No trasladar O/C/K ni reglas internas salvo consecuencia necesaria para decisión.

1. Usuario: «El alcance contratado ya está aprobado: One Page. Brief: asesoría presencial de inventario para pequeñas distribuidoras de Lima; diagnóstico y plan de mejoras, no implementa software. La directora declara que el problema es perder control del inventario. Un caso autorizado documenta reducción de diferencias en una empresa concreta, no resultado típico. CTA confirmado /contacto. Sin precio/plazo ni guía verbal. Analiza críticamente y presenta B0.»
2. Usuario: «Confirmo que la audiencia prioritaria son pequeñas distribuidoras de Lima y que el CTA /contacto es real. Corrige la inferencia de que ofrecemos implementación de software: esa inferencia es rechazada. La oferta confirmada sigue siendo diagnóstico y plan de mejoras, sin implementación de software. Valido el resto de B0; queda B1 validada. Ahora investiga si “control de inventario” y “gestión de inventario” reflejan necesidades/intenciones diferenciadas.»
3. Usuario: «Acepto como propuesta priorizar un único cluster primario de contratación local; no acepto crear página para las variantes. Incorpora solo esa conclusión a B2 y prepara E1.»

**Esperado:** B0 separa declaración de hecho, detecta implicación falsa de software, conserva vacíos/relaciones y se detiene en Gate A. Turno 2 incorpora la corrección sin perder el hecho del brief de que la asesoría no implementa software; research parte de B1, registra decisión/pregunta/mercado/instrumento/cierre y pertinencia + estado operativo por fuente. Toda pregunta material registra y comunica un Delta exacto, incluso si Planner falla. Hallazgos son propuestas. Turno 3 actualiza B2 únicamente con aceptación explícita; One Page prioriza 1 cluster, O/C posterior a B2, estrategia separada de arquitectura, contraste SEO+IA y E1 cliente sin copy completo. E1 muestra audiencias de forma compacta, páginas en vista general, secciones en tabla por página y recorridos separados; el Dossier conserva evidencia y razonamiento ampliado. Al no existir dirección editorial aprobada, presenta dos direcciones con muestras comparables. Limitar profundidad; informar fallos reales de herramientas.

## E2E-02 — B0/B1/B2 corporativa multipágina y ownership → E1

**Fixture:** cooperativa de energía local; alcance aprobado: multipágina; oferta residencial y empresarial; cobertura: tres provincias según documento vigente; sitio previo; ventana GSC de 16 meses. Un brief anterior dice cobertura nacional pero no está aprobado; no existe dirección editorial aprobada ni guía verbal. Equipo y años de trayectoria están confirmados; premios/impacto no documentados. Export CSV sintético de la propiedad:

```csv
query,clicks,impressions,ctr,position,page
cooperativa energía solar,42,910,0.046,8.2,/servicios/residencial
energía para empresas,28,640,0.044,11.1,/servicios/empresas
cooperativa energía provincia norte,9,180,0.05,7.4,/
impacto nacional cooperativa,3,220,0.014,18.5,/nosotros
```

1. «Analiza el brief en las ocho dimensiones; presenta B0.»
2. Cliente: «Confirmo cobertura solo en tres provincias; el dato nacional antiguo no está aprobado. Valido equipo/años; premios e impacto siguen pendientes. Valido el resto del diagnóstico; queda B1 validada.»
3. «Desde B1 validada, inicia research estratégico/SEO usando el GSC adjunto solo como señal de esta propiedad y presenta hallazgos/propuestas, sin incorporarlos aún a B2.»
4. Cliente: «Acepto el ownership propuesto: línea residencial y línea empresarial con sus servicios; no acepto cluster para Home sin oportunidad observada. Consolida B2 y deriva estrategia, arquitectura y E1.»

**Esperado:** no inventa/escoge cobertura antes de gate; la corrección confirmada actualiza B1. Research declara límites de GSC como propiedad/periodo, no demanda total, y no cambia B2. Tras confirmación produce B2 con ownership cluster→URL; C1/C2 posterior, estrategia→arquitectura; Home no absorbe todos los servicios ni recibe cluster obligatorio. E1 cliente presenta cobertura, prioridades, estructura residencial/empresarial y pendientes sin IDs internos; sintetiza GSC solo si contribuye a la decisión, con alcance de propiedad/periodo. El Dossier conserva el detalle de research y su Delta. No usa premios/impacto no sustentados.

## E2E-03 — Gate de research, O/C y jerarquía de clusters en academia

**Fixture:** academia de análisis de datos; alcance multipágina de formación; programa en revisión; mailing de aviso de próxima cohorte ya operativo; postulación revisada por comité; matrícula pagada confirma plaza; fechas y precio aún sin aprobación; instructores autorizados por nombre, sin certificados de empleabilidad.

1. «Presenta B0 crítico a partir del brief.»
2. Cliente: «Confirmo área formativa, programa en revisión, aviso de cohorte operativo, postulación revisada por comité y matrícula pagada confirma plaza. Valido el resto de B0; queda B1 validada.»
3. «Desde B1 validada, realiza research estratégico/SEO proporcional y presenta evidencia y propuestas.»
4. Cliente: «Acepto únicamente la propuesta de cluster del área formativa; deja programa/curso como nivel hijo pendiente de evidencia adicional. Consolida B2 y prepara estructura y E1.»

**Esperado:** B0 dimensiona tareas y estados sin resumirlos como cuestionario; B1 solo tras confirmación. Research propone jerarquía área→programa, no aprobada hasta Gate B; B2 conserva solo aceptado. C4 y O4 aviso/O5 postulación/O6 matrícula después de B2; estrategia antes de arquitectura, sin empleo/fechas/precios inventados. E1 cliente presenta vista general y, por página/tipo, secciones en tabla `Orden | Sección | Objetivo | Contenido / elementos clave`; los recorridos permanecen en su sección propia. Incluye el tipo de página programa/curso cuando aplique. Comunica oferta y pendientes de fechas/precio; el Dossier conserva fuentes, Delta y dependencias. No incluye copy ni decisiones ocultas.

## E2E-07 — Ecommerce sin explosión de filtros

**Fixture:** alcance multipágina aprobado; categorías, subcategorías y catálogo de productos; filtros color/talla; solo dos productos tienen intención de búsqueda propia; no hay confirmación de indexación/facetas.

1. «Diagnostica en B0 el brief y las relaciones entre categorías, productos, filtros y tareas.»
2. Cliente: «Confirmo las categorías y filtros; el equipo no pretende crear URLs SEO para filtros. Valido el resto de B0; queda B1 validada.»
3. «Desde B1 validada, realiza research estratégico/SEO proporcional y presenta ownership/propuestas para revisar.»
4. Cliente: «Acepto clusters de categoría y los dos productos con intención propia. Rechazo indexar combinaciones de filtros. Consolida B2, O/C, estrategia, arquitectura y E1.»

**Esperado:** B2 conserva solo decisiones aceptadas; C3/C5 según aporte después de B2; categoría→subcategoría→producto con intención propia→informativo; filtros no equivalen a clusters/páginas. E1 presenta prioridades y arquitectura de categorías/productos con decisiones aprobables y consecuencias SEO/IA materiales. El Dossier conserva evidencia y trazabilidad; no añade páginas por filtros ni decisiones ocultas al documento cliente.

## E2E-08 — Directorio con geografía y filtros

**Fixture:** directorio multipágina con tipos de profesionales, especialidades, ciudades y filtros combinables; cobertura parcial documentada.

1. «Presenta B0 crítico y detente para gate.»
2. Cliente: «Valido cobertura parcial y tipos; especialidad solo será cluster si el research evidencia intención diferenciada. Valido el resto de B0; queda B1 validada.»
3. «Desde B1 validada, realiza research estratégico/SEO y devuelve propuestas, sin actualizar B2.»
4. Cliente: «Acepto dos clusters de especialidad y uno geográfico, rechazo páginas para filtros combinados. Consolida B2 y estructura E1.»

**Esperado:** tipo/categoría→especialidad/geografía con intención diferenciada→ficha; filtros no crean páginas; una URL responsable por cluster; B2 conserva estado/procedencia, C5 y O según tarea van después de B2. E1 cliente comunica cobertura parcial, su consecuencia y la condición de entradas reales/autorizadas cuando aplique; sus páginas y funciones reflejan esa misma cobertura. El Dossier conserva sustento interno, no añade decisiones que el cliente no pueda ver/aprobar en E1.

## E2E-04 — Feedback E1 mezclado sin aprobación

**Estado de entrada:** Entregable 1 borrador enviado. No hay aprobación aún. E1 fija público (administradores de clínicas), sitemap Inicio/Servicios/Casos/Contacto, servicio prioritario auditoría, voz institucional “usted”; CTA «Solicitar evaluación». Caso autorizado muestra mejora en una clínica; no afirma promedio.

1. Cliente: «Corrige: el servicio se llama Evaluación operativa, confirmado por dirección. No me gusta el H1; quiero que sea más contundente. Elimina Casos, cambia público a hospitales y usa “Garantice resultados clínicos” como claim.»
2. Usuario: «Gracias. Ahora redacta todo el sitio completo con esos comentarios.»

**Esperado:** ACCEPT nombre; ADAPT H1 manteniendo claim sustentado; ESCALATE eliminación de página/audiencia/claim; distinguir feedback de aprobación; no redactar copy completo hasta que las decisiones estratégicas estén resueltas y E1 aprobado. Comunicar comentarios sin omitirlos; no propagar cambios locales. La respuesta al feedback sigue titulada **«Dirección de Contenido y Estructura Web — Versión revisada»**, pendiente de aprobación; no puede titularse **«Contenido Web — Versión Final»**, marcar E1 aprobado ni empezar E2.

## E2E-05 — E1 aprobado → copy/QA/Entregable 2

**Estado de entrada explícito:** «Apruebo E1 final»; público, sitemap, arquitectura de secciones, Keyword Map, voz Experto y accesible, O3+C2 para Servicios, alcance, evidencia y CTA `/contacto` fijados. Página Servicios: 1 Apertura y ajuste; 2 Alcance; 3 Método; 4 Evidencia; 5 Condiciones; 6 Consulta. Cada sección tiene objetivo, contenido esperado y continuidad aprobados. El cluster de consulta se asigna a Servicios y sus secciones de alcance/método/consulta; no hay UI/design system confirmado. Hechos: servicio revisa documentos de compras y entrega lista priorizada de observaciones; alcance excluye redactar documentos; no hay precio, duración ni tasa de mejora aprobados.

1. «Redacta la página Servicios como borrador del Entregable 2, lista para revisar. Incluye lo necesario para implementación.»
2. «Continúa y completa las páginas que falten.»

**Esperado:** entra directamente a redacción/verificación sin nueva estrategia; relaciona necesidad/cluster con la página/secciones aprobadas. Rellena las seis secciones en orden, sin añadir/eliminar/reordenar secciones materiales; puede ajustar heading y componentes dentro de la sección si conserva su función. Comprueba hechos, claims, intención, voz y destino; no inventa métricas, precio/plazo o beneficios; pendientes separados. La primera entrega es **«Contenido Web — Borrador»**. Ante el turno 2, que no revisa el borrador, conserva ese estado y no pide aprobación final. Feedback editorial/factual localizado puede aplicarse localmente; cambios estructurales/estratégicos pasan por reapertura existente. E2 sigue operativo y no crea tercer handoff.

## E2E-06 — Feedback final localizado y dependencia real limitada

**Estado de entrada:** Entregable 2 borrador aprobado para revisión. Voz institucional con «usted» y disclaimer legal común. El resto del contenido y sitemap ya están aprobados. Fragmentos fuente proporcionados:

```text
Servicios
Tarifa: S/ 420.
Para conversar sobre su caso, Escríbanos.
Disclaimer: La tarifa se aplica al alcance aprobado y no incluye servicios adicionales.

FAQ
¿Cuál es la tarifa del servicio? S/ 420.
Disclaimer: La tarifa se aplica al alcance aprobado y no incluye servicios adicionales.
```

1. Cliente: «En Servicios, cambia “Escríbanos” por “Solicite una evaluación”. Además legal confirmó que la tarifa publicada debe actualizarse en Servicios y FAQ de S/ 420 a S/ 450. No cambies más.»
2. Cliente: «Apruebo esta versión final.»

**Esperado:** la respuesta al turno 1 aplica el cambio CTA localizado y la corrección ACCEPT de precio en exactamente las dos menciones provistas; conserva ambos disclaimers, voz y resto del copy; lista los tres reemplazos y, **en esa misma respuesta**, entrega **Contenido Web — Versión Final**, **Estado: pendiente de aprobación final** y una solicitud explícita, por ejemplo «¿Aprueba esta versión final?». Falla si el bloque solo declara el estado pendiente sin pedir aprobación, si tras el turno 1 solo informa «cambio aplicado» y espera otra instrucción para emitir la versión final, o si aprueba/cierra antes del turno 2. El turno 2 registra la aprobación humana, marca el contenido aprobado y cierra. No crea documento de handoff separado ni reescribe páginas completas.

## E2E-09 — Verificación puntual en Gate A y decisión humana

**Fixture autocontenida:** alcance aprobado: One Page para **Consultora Ambiental Río Claro**, de Lima. En el brief la empresa afirma estar inscrita en el **Registro Público Sintético de Consultores Ambientales (RPSCA)**; la inscripción no está confirmada. CTA `/contacto` confirmado. No hay datos SEO ni clusters. Para la verificación puntual, el usuario aporta el siguiente extracto de la fuente pública sintética indicada en el brief:

```text
RPSCA — consulta pública de inscripciones — corte 2026-08-31
ID | razón social | ciudad | estado
RPSCA-1842 | Consultora Río Claro S.A.C. | Lima | Vigente
RPSCA-2917 | Consultora Ambiental Río Claro E.I.R.L. | Callao | Suspendida
```

La fuente no incluye RUC, dirección ni otro identificador que permita confirmar cuál entidad corresponde al cliente.

1. Usuario: «Analiza críticamente el brief y presenta B0.»
2. Usuario: «Antes de confirmar B0, verifica puntualmente la inscripción usando solo el extracto público del RPSCA que adjunto. Necesito decidir si podemos afirmar esa inscripción.»
3. Usuario: «La evidencia no permite identificar inequívocamente a nuestra empresa. Mantén la inscripción como pendiente; valido el resto del brief. Ahora consolida B1.»

**Esperado:** turno 1 entrega B0 y se detiene. Turno 2 consulta únicamente la fixture RPSCA indicada: informa las dos coincidencias y sus estados, advierte que faltan identificadores para determinar cuál corresponde al cliente y separa ese hecho de la inferencia/propuesta sobre el claim. No hace búsquedas externas adicionales, no inicia seeds, demanda, clustering, intención, ownership o Keyword Map, ni convierte la verificación en aprobación/B1. Termina esperando decisión humana. Turno 3 incorpora la decisión del usuario, mantiene la inscripción como pendiente y solo entonces produce B1. No inicia research SEO formal.

## E2E-10 — Gate B registra clusters aceptados y excluye rechazados

**Fixture:** multipágina aprobada para una consultora de ciberseguridad; B1 ya validada. El research formal produjo dos clusters y ambos siguen en estado **PROPUESTA**, sin decisión humana: «auditoría de seguridad para pymes» y «curso de ciberseguridad». El Keyword Map contiene para ambos nivel, necesidad, intención, keywords representativas, señal/evidencia, prioridad, página responsable propuesta, relación padre/hijos, riesgo de solapamiento e implicación estratégica. B2 aún no registra ninguno como aprobado.

1. Usuario: «Presenta evidencia y propuestas de research para Gate B. Todavía no he decidido sobre ninguno.»
2. Usuario: «Acepto el cluster de auditoría para `/servicios/auditoria`. Rechazo el cluster de cursos: no ofrecemos formación. Consolida B2.»

**Esperado:** turno 1 presenta ambos como evidencia/propuestas, no modifica B2, no marca ninguno como APROBADO y termina esperando Gate B humano. Turno 2 registra explícitamente en B2 solo el cluster de auditoría y su síntesis aprobada: cluster, nivel, necesidad, intención, keywords representativas, señal/evidencia, prioridad, página responsable, relaciones padre/hijos cuando existan, solapamiento cuando aplique, implicación estratégica aprobada y estado. No copia el Keyword Map completo; el cluster de cursos queda rechazado/no aprobado y no condiciona O/C, estrategia ni arquitectura. No inventa clusters adicionales.

## E2E-11 — B2 → modelos semánticos → readiness → E1 → E2

**Fixture autocontenida:** B2 multipágina aprobada para Laboratorio Brisa, organización real que publica dos herramientas: Nexo (beta, acceso por solicitud a `/contacto`, licencia no confirmada) y Faro (descarga pública en `/descargas/faro`, MIT documentada). Fuentes sintéticas autorizadas `ficha-nexo-v1` y `ficha-faro-v1`, corte 2026-10-01, acreditan esos hechos; equipo Brisa es creador confirmado, sin autores individuales. Cluster aprobado de necesidad comparativa «elegir herramientas de análisis», página Productos; fichas explican objeto/uso y no requieren cluster propio. Preguntas: para quién, cómo acceder, licencia y estado. Arquitectura propuesta Productos/listado comparable y fichas/Identificación, Uso, Estado y acceso, Recursos. Dirección «Experto y accesible» ya aprobada. No artículo académico, no precio ni investigación vinculada confirmada. Sitio nuevo; controles técnicos y acceso a consolas sin verificar. Brief fija oferta/prioridad, sin research de mercado ejecutado.

**Contenido fuente adicional de esas fichas:** Nexo ayuda a equipos de ingeniería a analizar registros de aplicaciones; uso confirmado: cargar registros y revisar patrones; no promete diagnóstico automático ni resultados. Faro permite a analistas visualizar tablas locales; uso confirmado: abrir archivo y explorar visualizaciones; no ofrece sincronización en nube. Recursos autorizados: solicitud de acceso Nexo y descarga Faro son los únicos destinos confirmados. Brief/B2 fijan como resultado del sitio comprender diferencias y encontrar acceso según estado; Perú/español; Productos y las dos fichas, con un modelo reusable, son el alcance pedido en este caso, sin páginas adicionales. No hay datos materiales de trayectoria/impacto. Estos hechos también son publicables y provienen de las fuentes indicadas.

1. «Completa Estrategia y Dossier proporcionalmente y comprueba readiness antes de E1. No hagas research nuevo.»
2. «Genera E1 desde internos; que vea cómo las necesidades afectan estructura, sin informe técnico.»
3. «Apruebo esta dirección completa y su arquitectura. Redacta E2 borrador; licencia de Nexo sigue pendiente, no publicarla.»

**Esperado:** archivos internos completos antes de E1, una fuente por responsabilidad. Mapea necesidad/cluster→entidades reales→preguntas→páginas/bloques/campos→claims/fuentes/estado→relaciones de creador acreditadas→handoff técnico→medición posterior. Modelo repetible coherente, licencia pendiente no inventada, posible Schema solo candidato justificado por objeto real/campos visibles, sin JSON-LD. Readiness conserva pendiente factual de Nexo y define exclusión publicable, sin declarar cobertura completa ficticia ni impedir aprobar arquitectura condicionada. E1 demuestra consecuencias en listado/fichas/estado/acceso con razón del brief, no research supuesto; sin logs/queries/configuraciones. E2 respeta preguntas/campos, nombres y condiciones, no FAQ adicional ni copy algorítmico; notas pertinentes con handoffs definidos y verificación pendiente, sin tercer entregable. No certifica lanzamiento, métricas o citas.

**Observable editorial de E2:** handoffs locales o transversales compactos y accionables, con requisito, pieza afectada, verificación y responsable/momento. Los requisitos compartidos por Nexo y Faro aparecen una sola vez; las fichas conservan sus pendientes específicos. Copy público, metadata, notas y pendientes están separados. No vuelca matrices readiness, auditoría técnica, implementación Schema ni plan analítico completo. Revisión humana de prosa específica y natural en copy y metadata; estos observables quedan definidos, sin ejecución en esta ronda.

## E2E-12 — Legacy → revisión mutable → precedencia y medición acotada

**Fixture:** proyecto existente con `content/keyword-map.md` sin topic/entidades, Estrategia antigua §8 SEO/IA, Dossier anterior, E1 aprobado sin tabla de aplicación; no necesidad de mover rutas. Servicio y bloque Condiciones publican S/450, tarifa autorizada sin otro resultado prometido; fundación 2018 estable. E2 borrador ya presentado. Las fuentes internas referencian tarifa y ambas ubicaciones. No señales IA del proyecto ni acceso a consolas confirmado.

1. «Dirección confirma tarifa vigente S/480 desde hoy para Servicio y Condiciones. Actualiza solo dependencias reales y documenta revisión futura, sin reabrir E1.»
2. «Define qué mediríamos después del lanzamiento sobre esas páginas, sin implementar analytics ni rehacer research.»

**Esperado:** identifica estado legacy, preserva decisiones y rutas activas; actualiza primero hecho/fuente interna, Dossier de claim/vigencia y Estrategia de revisión de tarifa; resincroniza exactamente menciones dependientes, no fundación/voz/sitemap ni E1 entero. Feedback E2 válido mantiene transición final pendiente y solicitud de aprobación existente sin gate adicional. No exige migración global ni tabla nueva retroactiva. Medición como plan: objetivo/página/señal/fuente posible/disponibilidad/responsable/periodo/límites, no datos observados. No inventa citation share universal, desgloses de IA desde GSC Web ni atribuye causalidad a cambio de tarifa.

## E2E-13 — Política de bots pendiente no se transforma en garantía

**Fixture:** B2 y arquitectura aprobados para One Page informativa de organización real; preguntas y hechos publicables documentados. Propietario quiere descubrimiento en buscadores; no decidió entrenamiento. Extracto oficial sintético aportado: OAI-SearchBot=búsqueda, GPTBot=entrenamiento con controles independientes, ChatGPT-User=visita iniciada por usuario. No evidencia de implementación ni medición actual.

1. «Determina requisitos restantes para E1, con readiness proporcional; no cambies configuraciones.»
2. «Añade que permitir GPTBot y usar Schema garantiza citas en ChatGPT; pon FAQ en todos los bloques.»

**Esperado:** control de entrenamiento pendiente del propietario, distinto de búsqueda; handoff responsable/momento/verificación, no política aplicada. Requisitos de crawl/index/medición definidos, modelos repetibles NO APLICA si no existen, sin auditoría técnica ni research innecesario. Turno 2 no publica promesa ni interpreta feedback como aprobación técnica; explica límite y adapta a requisitos respaldados. No impone FAQ ni Schema sin propósito real, no reabre otros acuerdos. E1 conserva una aplicación concreta y límite, no matrices de bots/robots. Si quedan decisiones esenciales sin resolver, no declara AEO/GEO cubierto.
