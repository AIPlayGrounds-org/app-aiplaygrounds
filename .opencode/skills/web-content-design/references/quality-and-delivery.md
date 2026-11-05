# Redacción, QA y entrega operativa

## Redacción humana específica y natural

Esta norma gobierna toda prosa de la skill destinada a lectura humana, en cualquier etapa: E1, E2, copy web, headings, CTA, labels, microcopy, formularios, FAQ, SEO titles, meta descriptions, recomendaciones, explicaciones, auditorías y mensajes al usuario. El texto debe reflejar el contexto, hechos y decisiones disponibles, con intención editorial y vocabulario coherente con audiencia y marca. Cuando la tarea sea preparar una plantilla vacía o responder con información insuficiente, ajusta la prosa a ese encargo sin inventar especificidad.

Evita patrones de redacción genérica de IA: tono de manual cuando el contexto ya explica el concepto; oposiciones artificiales como «no X, sino Y»; fórmulas recurrentes como «esto no consiste en», «a diferencia de», «en lugar de» o «no únicamente»; guiones largos habituales como incisos y comillas innecesarias para términos comunes. Revisa también simetrías excesivas, enumeraciones retóricas de plantilla, conclusiones que repiten lo dicho, introducciones o cierres intercambiables, abstracciones ajenas al proyecto, acumulación de aclaraciones/conectores y una misma cadencia sintáctica repetida entre párrafos.

Son señales para revisar en contexto, no expresiones absolutamente prohibidas. Una construcción puede usarse si es la forma más natural, clara y precisa de comunicar esa idea. Prioriza nombres, hechos y decisiones reales; explicaciones directas, síntesis donde ya exista contexto, precisión antes que ornamentación y variación sintáctica razonable. Usa ritmo y longitud naturales, puntuación normal del idioma y vocabulario acorde a la audiencia. Un CTA breve o un label convencional puede ser correcto aunque se use en otros sitios; no fuerces originalidad a costa de claridad.

Aplica el criterio a la prosa explicativa que acompañe estructuras operativas, sin alterar mecánicamente IDs, tokens canónicos, estados, schemas de campos, tablas internas de trazabilidad, logs, nombres técnicos o contratos de estructura. Conserva hechos, condiciones, decisiones y dirección editorial aprobada; respeta texto literal vinculante dentro de su alcance. La naturalidad no autoriza a omitir información material ni a modificar estrategia.

### Revisión editorial final obligatoria

Antes de entregar prosa para lectura humana, revisar el texto y varias secciones juntas:

1. ¿Hay frases que podrían reutilizarse sin cambios en otro proyecto y que aquí aportan solo relleno?
2. ¿Hay párrafos que parecen definiciones de una guía cuando el contexto ya basta?
3. ¿Hay oposiciones, enumeraciones o simetrías utilizadas como muletilla?
4. ¿Hay explicaciones obvias que pueden eliminarse?
5. ¿Puede expresarse alguna idea de forma más directa?
6. ¿El texto refleja realmente el contexto, lenguaje y decisiones de este proyecto?
7. ¿Al leer varias secciones juntas aparece una cadencia artificialmente uniforme?

Si se detecta redacción genérica o artificiosa, reescribir antes de entregar y comprobar que conserva significado, condiciones y voz. Esta revisión forma parte del QA editorial; no crea un gate humano ni una matriz o entregable nuevo.

## Presentación al cliente del Entregable 1

E1 es un único documento cliente, derivado del estado interno y orientado a comprensión → decisión → aprobación. Redáctalo para alguien que conoce el negocio y participó en la reunión inicial, pero no conoce B0/B1/B2, Keyword Map, research, herramientas o metodología. Debe entenderse sin reunión explicativa obligatoria. Evita duplicar decisiones entre secciones. La Estrategia de Contenido es fuente operativa; el Dossier de evidencia es trazabilidad separada, no Estrategia, E1/E2 ni tercer entregable, no se aprueba ni se entrega por defecto.

E1 cliente es autosuficiente: ninguna recomendación o aprobación material depende de abrir artefactos internos. La cantidad de research no determina cuánto se muestra: incluye `conclusión → razón suficiente → límite material` solo cuando sea necesario para comprender/aprobar. Mantén fuentes/relaciones completas en el dossier; no vuelques queries, mercados, métricas o fuentes por volumen.

Justifica cada decisión material una vez donde se presenta y aporta el detalle necesario para entenderla. Traduce las abstracciones internas a decisiones sobre páginas, contenido y recorridos; O/C, ownership, B2 y reglas de composición permanecen internos. El término clusters puede aportar contexto sobre el desarrollo de la estrategia: mantenerlo cuando sea pertinente, explicado mediante las necesidades consideradas y su aplicación en el sitio. Cada solicitud de aprobación explica qué se aprueba y su consecuencia. Distingue en una sola zona las decisiones para aprobar ahora y la información que puede completarse después. Si no existe una dirección editorial aprobada, E1 muestra exactamente dos direcciones breves y 5–6 muestras comparables por dirección, con o sin guía verbal; si ya existe una dirección aprobada, la conserva sin alternativas. No repitas ficha técnica ni reduzcas información material o suprimas incertidumbre.

Presenta públicos en una tabla compacta. La vista general usa `Página | Principalmente para | Objetivo`; cada página detalla secciones en tabla `Orden | Sección | Objetivo | Contenido / elementos clave`. Recorridos van en sección propia: no comprimas arquitectura en mega-celda ni uses cadena con flechas como formato principal. La estrategia interna puede ser mucho más detallada. E1 no debe estrenar decisiones: `E1 ⊆ estado interno`.

Antes de generar E1 verifica que todas sus secciones sustantivas pueden producirse usando exclusivamente fuentes internas vigentes. Después comprueba que toda afirmación, estructura y decisión sustantiva es rastreable al estado interno. Si falla cualquiera de las pruebas, no cierres E1: corrige primero internos. Al aprobar E1, registra aprobación humana en estado interno y conserva E1 como snapshot cliente aprobado; no copies E1 hacia internos.

### Proyección cliente del beneficio SEO + IA

En E1 completo, presentar `vista general → criterios SEO + IA → detalle de arquitectura`. El bloque SEO + IA es el puente que explica decisiones antes de desarrollar páginas y secciones. Usar un título de beneficio como «Cómo preparamos la estructura para SEO e IA» o «Cómo la estructura prepara [proyecto] para SEO e IA», con ambas dimensiones reconocibles al hojear el documento, sin wording fijo. Mantener una introducción breve, dos subbloques visibles, tabla compacta y cierre. Un título con SEO e IA seguido de párrafos mezclados no basta: deben distinguirse visual y conceptualmente **SEO y arquitectura de búsqueda** y **Comprensión y recuperación por sistemas de IA**, o subtítulos equivalentes. No exigir reestructuración retroactiva en cambios locales o E1 legacy ya aprobados.

La introducción conecta el trabajo con las búsquedas y la interpretación/recuperación del contenido de ese proyecto. En la primera aparición cliente, usar nombre desarrollado + sigla para cada práctica: **optimización para motores de respuesta (Answer Engine Optimization, AEO)** y **optimización para motores generativos (Generative Engine Optimization, GEO)**, o formulación equivalente clara. Después se permiten las siglas o «SEO, AEO y GEO». No usar «AEO/GEO» como primera explicación ni unirlas en una sola disciplina mediante `/`. Es una explicación de prácticas del servicio, no una taxonomía universal ni definición técnica de todos los sistemas generativos.

Traducir inmediatamente los nombres a su aplicación. El subbloque SEO explica cómo intención, clusters y responsabilidad por página condicionaron distribución, tipos o recorridos. El de IA conecta AEO con preguntas importantes que tienen respuestas claras, contextualizadas y localizables, y GEO con entidades, procedencia, relaciones y condiciones que ayudan a interpretar información con contexto. Seleccionar únicamente consecuencias materiales, sin prometer recuperación o citación. El cliente debe entender trabajo, beneficio y aplicación, sin abrir internos ni recibir un informe técnico o glosario.

Cuando los clusters hayan participado en la estrategia, conservar el término si aporta contexto y credibilidad. Explicarlo por las necesidades que agruparon y las decisiones que ayudaron a tomar, sin glosario de keywords/cluster ni lección sobre el método. Atribuir el hallazgo a research únicamente si ocurrió; la falta de research no se rellena con una narración genérica de búsquedas. Si la distribución provino del brief validado o de una decisión humana, expresar esa procedencia.

La IA como tema del negocio, tecnología de un producto u oferta no acredita preparación para comprensión/recuperación por sistemas generativos. Distinguir explícitamente esta segunda dimensión al explicar aplicaciones, también para negocios de IA. No contar «Producto construido con IA» o un nombre de programa con IA como evidencia suficiente de que E1 comunica ese beneficio.

Después de ambos subbloques, usar una tabla compacta de necesidad/criterio → decisión → página/sección/campo → beneficio con ejemplos reales. La tabla demuestra aplicación y no sustituye las explicaciones previas. Elegir casos representativos sin perder consecuencias materiales ni reproducir todo el detalle por página. Mantener fuera Keyword Map, queries, volúmenes, readiness, matrices internas, JSON-LD, controles técnicos y planes extensos. El cierre comunica preparación para descubrimiento, claridad, interpretación/recuperación con contexto y validación técnica posterior cuando corresponda; no garantiza rankings, tráfico, citación, inclusión generativa ni resultados específicos por plataforma. Mantenerlo breve y secundario, sin sugerir un mecanismo demostrado de optimización para LLMs.

Aplicar la norma transversal de redacción humana y su revisión final. En esta explicación, cada frase debe aportar contexto del proyecto o una consecuencia para la arquitectura; los nombres y decisiones concretos permiten prescindir de explicaciones metodológicas genéricas.

### Presentación de voz y tono y su procedencia

Sin dirección editorial aprobada, mostrar las dos alternativas y sus muestras como propuestas pendientes de elección/aprobación. Antes de atribuir una voz o recomendación al usuario/consultor, verificar su intervención explícita y su alcance. Diferenciar propuesta metodológica, recomendación del agente, elección/recomendación humana y aprobación del cliente; ninguna sustituye automáticamente a la siguiente. Una recomendación propia puede justificarse como tal, sin decir «ya definimos» ni atribuirla a una persona que no la emitió. Una preferencia humana aún no aprobada conserva su procedencia y el estado pendiente; una dirección aprobada se conserva según el contrato vigente de [`editorial-directions.md`](editorial-directions.md).

## Redacción

Redacta solo tras aprobación humana del Entregable 1 — **Dirección de Contenido y Estructura Web**. Una versión revisada de E1 sigue siendo E1 hasta esa aprobación. Trabaja por página y sección desde estado interno sincronizado y E1 aprobado; E1 aprobado fija la base vinculante, y E2 no puede modificarla silenciosamente. E2 también es derivado, no fuente maestra aislada. Feedback E2 modifica primero la fuente interna pertinente y después sincroniza E2. No crees workspace interno de producción salvo necesidad real que no pueda resolverse con estrategia, E1 aprobado, dirección, datos y dependencias.

Trata el brief como fuente de información y contexto, no como copy aprobado: conserva su significado, hechos, condiciones, restricciones y decisiones, pero puedes reorganizar, sintetizar y reformular su wording según estrategia, audiencia, intención, arquitectura y dirección editorial aprobadas. **APROBADO** no implica literalidad. Si el usuario marca explícitamente una frase como `Texto literal aprobado`, `Texto literal` o pide inequívocamente conservarla literalmente, reproduce exactamente ese wording dentro del alcance indicado; esta restricción solo aplica a esa frase, no a todo el brief. La flexibilidad editorial nunca autoriza alterar cifras, cobertura, beneficios, servicios, elegibilidad, condiciones, claims permitidos ni decisiones aprobadas, ni convertir opiniones en hechos.

Contenido según necesidad: SEO title, meta description, slug recomendado, H1/H2/H3, body copy, unidades y campos estructurados, CTA, labels, formularios, FAQ, microcopy, mensajes de error/éxito, enlaces/destinos y notas de implementación. No rellenes para completar plantilla. Todo dato faltante queda fuera del copy público, identificado en pendientes no publicables; conserva junto a la sección su estructura o esquema necesario según [`content-structures.md`](content-structures.md), sin esconderlo solo en internos. No inventes funcionalidad, URLs, jerarquía visual, CTA/canal de contacto ni confirmación; si falta CTA real, omítelo o deja la propuesta claramente identificada con destino pendiente.

Separa función editorial de jerarquía HTML y diseño visual. Title no es H1; metadescripción no es bajada. Enlaces con destino real y etiqueta que explique función. Instrucciones y errores claros con recuperación disponible. Si no hay diseño o imagen, marca verificación visual/alt como pendiente; no certifiques accesibilidad global.

### Longitud y densidad para UI

E2 es principalmente redacción, verificación factual y ajustes editoriales/operativos dentro de la arquitectura aprobada, no una nueva ronda de estrategia. Puede corregir nombres, cifras, claims, condiciones, términos del negocio, destinos, wording y matices locales. No redecide en silencio sitemap, páginas/secciones materiales, orden/recorridos, distribución de necesidades, clusters o dirección editorial; si el feedback los altera, tramita la reapertura por el Feedback Gate existente.

Cuando se conozca el componente real, ajusta longitud, densidad y jerarquía al diseño sin reabrir E1 mientras se conserven significado, función, prioridad, evidencia/condición, acción y recorrido aprobados, y se mantenga la dirección editorial elegida. En familias de componentes equivalentes (p. ej., cards de servicios/programas, beneficios, productos, pasos, características o comparativas), procura una densidad comparable, no un número idéntico de palabras. Evita diferencias editoriales desproporcionadas, vacíos por brevedad evitable y texto redundante usado como relleno.

Si el diseño o design system define espacio real, se puede fijar un presupuesto aproximado de palabras/caracteres por familia y campo (título, descripción, CTA/label). Es local a esa UI, orientativo y adaptable cuando el significado lo requiera; no es un límite universal ni autoriza a eliminar información material. Si la UI aún no existe, mantén densidad razonablemente consistente y trata la longitud como provisional, con una pasada de ajuste cuando se conozca el diseño.

La simetría visual no justifica eliminar hechos, condiciones, diferenciadores reales, evidencia ni información necesaria. Si un contenido materialmente más extenso no cabe sin degradarlo, señala la incompatibilidad para que diseño resuelva la composición sin mutilar contenido; mantén función y estrategia aprobadas. No prescribas por defecto detalle expandible ni un componente alternativo. La estructura semántica y las tablas documentales no deciden UI.

## QA general previo al Entregable 2

La primera entrega de E2 se titula **«Contenido Web — Borrador»** y se ofrece para revisión. No uses **«Contenido Web — Versión Final»** al entregar E1, feedback E1, E1 revisado/aprobado o el primer borrador E2. Ese título queda reservado al E2 ya corregido después de feedback, con estado **pendiente de aprobación final**; solo una respuesta humana posterior permite marcarlo aprobado y cerrar.

Revisa cada página y el conjunto:

1. Factualidad, claims, evidencia, permisos públicos y condiciones.
2. Correspondencia con alcance y decisiones aprobadas; identifica cualquier reapertura estructural respecto a las secciones E1.
3. Objetivo y categoría realmente aplicados; necesidades y mensajes cubiertos.
4. Arquitectura, orden, recorrido, cluster e intención; headings útiles y sin keyword stuffing.
5. Dirección editorial: voz, tono, estilo, tratamiento, tecnicidad/densidad; consistencia entre páginas.
6. CTA, label, canal, destino, estado tras envío y funcionalidad posible/verificada.
7. Duplicación y solapamiento; enlaces internos reales; metadatos fieles y diferenciados.
8. Pendientes internos separados; ninguno filtrado como copy público.
9. Accesibilidad editorial básica: estructura semántica propuesta, enlaces descriptivos, instrucciones y errores comprensibles, textos alternativos según función cuando se conozca la imagen.
10. Riesgo de inventar capacidad o implicar precio, elegibilidad, compromiso, plazos o resultados.
11. Claridad, contexto, entidades y claims sostenibles para lectura humana y recuperación generativa, sin prometer visibilidad.
12. Criterios QA específicos de cada patrón O/variante y categoría cargada.
13. QA de estructura de [`content-structures.md`](content-structures.md): proporcionalidad, unidades/campos y relaciones visibles, continuidad E1→E2, esquemas incompletos preservados y cinco capas separadas; ninguna UI o capacidad inventada. No aplanar todo a prosa ni convertir todo en tablas.

### Continuidad SEO/AEO/GEO y handoffs

Antes de E1 comprobar readiness de Estrategia según [`seo-ai-editorial.md`](seo-ai-editorial.md), sin nuevo gate: cada cadena material reconstruible y cada capa resuelta, pendiente o NO APLICA con motivo. E1 muestra aplicaciones arquitectónicas materiales sin matrices internas ni garantías. Una sección llamada «visibilidad en IA» no prueba cobertura.

En E2 verificar contra registros vigentes: preguntas/necesidades principales respondidas en sección/campo responsable; nombres canónicos consistentes sin repetición artificial; campos repetibles coherentes y excepciones reales; claims materiales con fuente, permiso, condición y vigencia; relaciones documentadas sin deducirlas de links; condiciones/atribución conservadas en bloques recuperables parcialmente. No crear FAQ para completar cobertura ni forzar respuestas breves; conservar profundidad, fluidez y claridad humanas.

Revisar datos mutables y menciones dependientes si el evento/fecha lo requiere; información estable no se revisa por rutina. Handoffs de discovery, Schema candidato y medición posterior deben especificar responsable/momento/criterio y separar definición de verificación pendiente. Excluir JSON-LD/configuración y analítica ejecutada; no certificar crawl/index ni citación desde copy. Ante feedback revisar solo cadenas afectadas y actualizar primero la fuente interna; si falta claim esencial, no marcar publicable. Notas pertinentes acompañan E2, no nuevo informe.

Clasifica hallazgos: error confirmado, riesgo/hipótesis o preferencia; indica evidencia e impacto. No presentes como listo para publicar texto cuyo claim/condición/destino imprescindible está pendiente.

## Límite de preparación

Entregable 2 está organizado para revisión e implementación y debe ser suficientemente operativo para diseño/desarrollo. Sus notas de implementación pertenecen al mismo Entregable 2; no constituyen un tercer handoff ni certificación de la implementación. Separa claramente copy público, metadata, enlaces, notas y pendientes no publicables.

### Densidad de handoffs en E2

E2 sigue siendo principalmente un documento de contenido para revisión e implementación. Selecciona de Estrategia solo handoffs directamente relacionados con el contenido entregado, necesarios para implementarlo correctamente y accionables por diseño/desarrollo/SEO. Resume el requisito, su alcance y la verificación pendiente; el detalle operativo completo permanece en Estrategia, sin duplicarlo ni exigir al cliente abrir internos para entender qué debe hacerse.

Puede usarse `Requisito | Afecta a | Qué debe verificarse | Responsable/momento`, o formato compacto equivalente. Para medición o Schema candidato, conserva solo la señal/fuente/limitación o los campos/propiedades y validación indispensables para la pieza. Agrupa requisitos transversales una vez en notas transversales del mismo E2 y referencia desde las páginas solo cuando haga falta; no repitas el mismo handoff en cada ficha.

Mantén copy público, metadata, notas de implementación, pendientes no publicables y handoffs pertinentes claramente separados. No trasladar por defecto matrices internas de readiness ni el plan completo de medición. Las notas no convierten E2 en auditoría SEO técnica, documento de implementación Schema o plan analítico extenso. La selección compacta no elimina requisitos de Estrategia ni oculta dependencias materiales de implementación; no crea tercer entregable.
