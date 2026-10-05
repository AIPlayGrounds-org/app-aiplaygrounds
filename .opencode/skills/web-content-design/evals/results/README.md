# Registro de corridas actuales

`runs.jsonl` puede conservar corridas históricas y actuales, incluidas fallidas/interrumpidas si hay evidencia, siempre que cada registro preserve claramente su provenance. Diseñar una fixture no equivale a ejecutarla; el historial puede conservarse y no se eliminan registros por pertenecer a un contrato anterior. Cada entrada debe permitir distinguir `skill_commit`, fecha, suite, modelo, contexto/notes, si el candidate estaba dirty cuando aplique y si corresponde a arquitectura histórica o vigente. El análisis vigente filtra por commit, fecha y contrato correspondientes: una corrida histórica no valida automáticamente el contrato actual. Se admiten suites `activation`, `behavior`, `e2e` y `tool-smoke`; esta última registra una dependencia/herramienta comprobada directamente, no un juicio conductual del agente.

## Campos requeridos

```json
{"case_id":"RES-01","suite":"behavior","holdout":false,"date":"YYYY-MM-DD","opencode_version":"1.x","model":"provider/model","skill_commit":"hash","skill_enabled":true,"prompt":"literal completo o ruta/hash de fixture preservada","references_loaded":["references/search-research.md"],"tools_used":["seo-keywords","websearch"],"result":"observación breve","judgment":"cumple|parcial|falla|not_observed","failures":[{"severity":"critical|major|minor","dimension":"factualidad","evidence":"fragmento/traza"}],"notes":"límites/comparabilidad","duration_seconds":"not_observed","tokens":"not_observed"}
```

`prompt` debe conservarse íntegro o resolverse a un artefacto versionado/hash inmutable. `duration_seconds` y `tokens` aceptan número solo si la herramienta los expuso; nunca estimar. Registrar `not_observed` cuando no está disponible. `tools_used` refleja llamadas vistas en la traza, no herramientas previstas.

Para comparación A/B registrar línea hermana con mismo case_id/fixture y `skill_enabled:false`. Los development spot-checks pueden carecer de baseline y deben dejarlo explícito en notes; no habilitan comparación. Holdout requiere `holdout:true`; proteger acceso/ejecución según protocolo. Transcript y JSON events completos se guardan en artefactos privados de evaluación, no se reemplazan por el resumen JSONL. No incluir credenciales, datos de cliente real ni archivos privados en el repo.
