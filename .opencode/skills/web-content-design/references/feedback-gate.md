# Feedback Gate — Entregables 1 y 2

Aplica el gate existente a ambos entregables. Todo comentario se atiende explícitamente; no se ignora ni se copia automáticamente sin evaluar contexto. Los entregables son proyecciones, nunca fuentes maestras de edición.

**Secuencia obligatoria:** `feedback E1/E2 → ACCEPT / ADAPT / ESCALATE → identificar fuente interna afectada → actualizar esa fuente primero → actualizar trazabilidad si corresponde → regenerar/sincronizar E1/E2`. No se permite `feedback E1 → parchear E1 directamente` ni `feedback E2 → parchear E2 como fuente y reconstruir internos después`. Si el usuario señala directamente un entregable, interprétalo como feedback sobre la propuesta, no como permiso para invertir el flujo.

## Estados separados por entregable

- **E1 — Dirección de Contenido y Estructura Web:** tras feedback, entrega **«Dirección de Contenido y Estructura Web — Versión revisada»**, estado **pendiente de aprobación**. Sigue siendo E1 y no contiene copy completo. Espera aprobación humana explícita antes de marcar E1 como aprobado y empezar E2. No titules ni describas esta respuesta como **«Contenido Web — Versión Final»**.

E1 es un único documento cliente conciso y derivado del estado interno; feedback y aprobación cubren el mismo E1, sin aprobación por capas. Un cambio sustantivo actualiza primero Estrategia de Contenido y Dossier si cambia trazabilidad. Un cambio de presentación se registra como tal, modifica contrato/presentación cliente cuando corresponda y regenera E1 sin alterar estrategia sustantiva. Sigue `quality-and-delivery.md`.
- **E2 — Contenido Web:** solo empieza después de E1 aprobado, incluso en la misma respuesta que registra la aprobación si el encargo permite continuar; la primera entrega siempre es **«Contenido Web — Borrador»**. Mientras no haya una intervención humana posterior que revise ese borrador, conserva ese estado: pedir continuar, completar, volver a redactar o mostrar contenido no es feedback por sí solo, y no permite titularlo Versión Final, pedir aprobación final ni cerrar. Feedback válido solicita cambios, confirma que no hacen falta o responde inequívocamente a la revisión del borrador. Si el feedback se resuelve sin reabrir E1, estrategia o capacidades aprobadas, aplica la corrección y entrega **en esa misma respuesta** **«Contenido Web — Versión Final»**, **«Estado: pendiente de aprobación final»** y una solicitud explícita dirigida al usuario, por ejemplo **«¿Aprueba esta versión final?»**. El bloque debe contener ambos: declarar el estado pendiente sin pedir aprobación no completa la transición. No respondas solo «cambio aplicado» ni esperes una solicitud adicional para emitir la versión final. En un cambio localizado basta mostrar el fragmento actualizado o resumir exactamente el cambio, junto con el bloque final; no hace falta repetir todo E2. Si el feedback reabre decisiones aprobadas o queda sin resolver, no fuerces la versión final. Después de la versión final pendiente, espera la aprobación humana final antes de marcar aprobado o cerrar.

La frase exacta **«Contenido Web — Versión Final»** pertenece únicamente al estado posterior al feedback de E2. “Versión revisada” o “versión final de E1” nunca significa finalización del contenido web ni del proyecto. E2 es también derivado: ante feedback, actualiza primero estrategia/decisión/fuente interna pertinente, luego sincroniza E2; no crear automáticamente workspace interno adicional.

## Normalizar observaciones

Cuando sea posible, registra cada observación:

`ubicación | elemento | comentario | intención/motivo | tipo | impacto | decisiones afectadas | estado`

Feedback pequeño/local se registra y aplica dentro del flujo existente; no requiere ledger separado. Para feedback amplio o estratégico consolida/actualiza ledger interno en el Dossier, con `observación | intención | tipo | impacto | fuentes/decisiones afectadas | ACCEPT/ADAPT/ESCALATE | resolución`. No es entregable, no requiere aprobación propia y no crea gate.

Tipo: corrección factual/legal/operativa; cambio editorial puntual; preferencia subjetiva; cambio estratégico; o consulta/ambigüedad. Impacto: local, dependencia concreta o reapertura estratégica.

## Decisión operativa

- **ACCEPT:** aplicar directamente corrección factual/legal/operativa verificada o cambio que respeta acuerdos.
- **ADAPT:** preservar intención del comentario con solución compatible con objetivos, necesidad, evidencia y decisiones aprobadas. Usar para preferencia subjetiva o formulación literal que perjudica claridad/fidelidad.
- **ESCALATE:** identificar consecuencia y pedir decisión cuando el cambio altera oferta, audiencia, elegibilidad, compromiso, precio/condición, CTA real, arquitectura, clusters/estrategia o dirección aprobada; también si la evidencia material es contradictoria.

No todo feedback se traslada literalmente. Evalúalo con objetivos, necesidades, evidencia y decisiones aprobadas. Comunica al cliente profesionalmente qué se aplicó, adaptó o requiere decisión y por qué. Si una petición sustentada contradice una decisión, explica el conflicto, propón alternativa que conserve su intención y no la descartes en silencio.

## Alcance local y dependencias

Regla por defecto: `feedback localizado → cambio localizado`. Una preferencia sobre una frase no reabre sitemap, Keyword Map, audiencia, propuesta de valor, voz ni estrategia. No cambies otras páginas por simetría o consistencia estética. Una decisión humana posterior, explícita y vinculante, sustituye solo interpretaciones/decisiones previas en conflicto dentro de su alcance; registra qué queda sustituido. Conserva el resto salvo dependencia material real.

Si un cambio local tiene dependencia real, lista cada elemento que cambia y la relación concreta (p. ej., CTA/destino o misma condición de precio en dos páginas). Extiende la revisión solo a esas dependencias. Si implica reapertura estratégica, no la introduzcas como edición local: explica alcance/impacto y registra aprobación requerida.

## Cierre del gate

Resuelve ACCEPT/ADAPT; registra ESCALATE pendiente y bloqueos publicables. Identifica la fuente interna afectada y actualízala primero; en cambios sustantivos actualiza Estrategia de Contenido, y en cambios de evidencia/procedencia actualiza también el Dossier. Registra feedback/estado humano cuando corresponda y después sincroniza E1 o E2. E1 sigue pendiente hasta aprobación humana explícita. Al aprobar: registra la aprobación en el estado interno, márcalo APROBADO y deja E1 como snapshot sincronizado; no copies E1 a internos. Esa aprobación prevalece como base para E2. Un cambio posterior que contradiga acuerdo aprobado se procesa como reapertura consciente.

## Formato simple para el cliente

Invita a comentar con:

```text
Página/sección:
Elemento:
Cambio solicitado:
Motivo u objetivo:
Información adicional (si aplica):
```

Explica que todos los comentarios serán revisados; algunos pueden adaptarse para conservar intención y objetivos, y los que alteren decisiones estratégicas pueden requerir reevaluación. Mantén tono colaborativo, claro y no defensivo.
