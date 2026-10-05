# Protocolo de ejecución y rúbrica

## Preparación y comparación

1. Congela `case_id`, suite/holdout, literal del prompt, fixture, referencias/herramientas esperadas, skill commit, OpenCode/modelo y fecha antes de correr.
2. Behavior puede ejecutarse como **development spot-check** o como comparación **A/B**. Todo caso Behavior comparativo requiere A skill enabled y B baseline con el mismo modelo, herramientas, fixture y contexto equivalente, desde directorios/sesiones separados y limpios; no reutilizar A si pudo escribir archivos ni correr B desde el repo que incluye runtime. Un development spot-check puede ejecutarse solo con skill enabled, en contexto limpio y sobre un caso concreto para observar/regresar su contrato, sin baseline. `sin baseline → no comparación skill vs baseline`: una corrida sin pareja no sostiene conclusiones comparativas ni atribución de impacto frente al baseline. La observación `cumple/parcial/falla` sigue siendo válida respecto del contrato del caso. La lectura `skill mejor / baseline mejor / empate` aplica únicamente si existe pareja comparable. La activación se mide aparte y espontáneamente. E2E mantiene sesión solo dentro de los turnos del caso.
3. Ejecuta primero un lote development pequeño, corrige solo fallo claro y conserva trace/versiones. No ejecutes holdouts durante iteración inicial.
4. Conserva prompt literal, respuesta completa, eventos/trazas de OpenCode, referencias cargadas, invocaciones/herramientas, aprobación y juicio. Revisor compara salidas en orden aleatorio o ciego si es viable.
5. No uses una corrida con diferente modelo, herramienta, fixture o permiso como pareja baseline. Si el control no se pudo asegurar, marca comparación no comparable.

## Escala por criterio

- **Cumple:** observable satisface intención, alcance y evidencia del caso; citar evidencia de salida.
- **Parcial:** resultado útil con omisión/riesgo menor o estado no resuelto correctamente expuesto.
- **Falla:** observable relevante contradicho/omitido; especificar texto/traza y consecuencia.
- **N/A:** el criterio no aplica a este caso, con motivo.

No sumar promedio global. Registrar además: exactamente dos entregables; Estrategia completa como fuente operativa; Dossier separado; separación interno/cliente; completitud interna previa a E1; proyección unidireccional y ausencia de decisiones nacidas en E1; claridad E1 con públicos compactos y arquitectura legible por página/sección; E1/E2 sin instrucciones, taxonomías o estados metodológicos internos innecesarios para comprensión/implementación; migración legacy segura sin duplicar fuentes; sincronización tras feedback; estado de aprobación. Mantener también criterios de research existentes (preflight, proporcionalidad Planner/Trends/GSC, triangulación, saturación y Decision Delta) sin rediseñarlos.

## Severidad

- **Fallo crítico:** riesgo directo de contenido/flujo no aceptable. Ejemplos: precio/claim/dato inventado o interno publicado; `ads_competition` llamada dificultad SEO; funcionalidad/confirmación no existente; research estratégico/SEO formal iniciado desde B0 o antes de consolidar B1; conclusión de research incorporada a B2 sin confirmación humana; copy completo antes de E1 aprobado; feedback estratégico aceptado como local sin avisar; cambio local propagado sin dependencia; instrucción aprobada contradicha. No es fallo iniciar, desde B0, una verificación pública puntual de una incógnita concreta cuando el usuario la solicita explícitamente, siempre que no se convierta por defecto en seeds, demanda, clustering, intención, ownership o Keyword Map y termine esperando decisión humana.
- **Fallo mayor:** incumplimiento que cambia decisión o reduce sustancialmente utilidad sin llegar a crítico: research omitido aunque era requerido y posible; uso/atribución de herramientas inventado; clusters/objetivos que cambian la arquitectura incorrectamente; E1 sin estructura aprobable de secciones por página, dependiente de metodología o innecesariamente extenso/repetitivo; elegir por cuenta propia entre decisiones contradictorias sin fuente vinculante; fuente única generalizada a mercado; ausencia de Delta material, saturación injustificada o research que no refleja su efecto; E2 modifica secciones materiales sin reapertura; alternativa editorial no comparable; ajuste UI desequilibrado o que elimina información material; feedback ledger pesado para corrección pequeña; decisión humana propagada fuera de su alcance.
- **Fallo menor:** omisión de baja consecuencia (p. ej. fuente/fecha incompleta cuando no altera conclusión, claridad o formato), sin invención ni alteración estratégica.

Una falla crítica hace fallido el caso aun si otras dimensiones cumplen. Registrar evidencia y fuente del fixture. No absolver por buena estética ni penalizar una salida concisa si cubre sus observables.

## Requisitos SEO/AEO/GEO — juicio humano

READY-01–17 y E2E-11–13 requieren revisar cadena material reconstruible entre registros, estados por capa, proporcionalidad, aplicaciones E1, copy E2 y handoffs con ejecución pendiente. NO APLICA justificado cumple; NO APLICA usado para ocultar dato desconocido falla. Definición técnica resuelta con validación posterior explícita no es fallo ni certificación.

- Crítico: entidad/relación/claim inventados publicables, ranking/citación/aparición garantizados, Schema como garantía, implementación técnica o política de entrenamiento aplicada sin decisión, métricas/accesos/resultados simulados.
- Mayor: declara AEO/GEO cubierto sin cadena o con solo encabezado; pregunta material sin página/bloque; modelo repetible ausente; handoff material sin criterio/responsable/momento; FAQ/stuffing/longitud arbitraria impuestos; equivalencia de plataformas o causalidad no sustentadas; migración global destructiva; filtración interna a E1.
- Menor: incompletitud de baja consecuencia que no altera trazabilidad, sentido o decisión; clasificar según evidencia real, no automáticamente.

El checker solo verifica contratos estructurales del paquete. No puntúa readiness de proyectos ni conducta AEO/GEO. Nuevas fixtures no son evidencia de ejecución; registrar corridas reales con versión/dirty, traza y juicio antes de declarar cumplimiento observado.

## Activación

Registrar expected, observed (`yes/no/partial/not_observed`), falso positivo/negativo, si activó antes de responder y si atendió solo la parte web/editorial del prompt mixto. No usar llamadas explícitas a skill para estimar activación. Reportar conteos y casos, no solo tasa agregada.

## Lectura comparativa

Para cada par skill/baseline indicar `skill mejor / baseline mejor / empate / no comparable` por utilidad/factualidad/workflow y explicar con fragmentos. No declarar mejora general por una demostración o un caso. Una serie inicial sirve para descubrir fallas; generalización requiere repeticiones y holdouts luego de congelar versión.
