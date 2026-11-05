# Evaluación de `web-content-design` — protocolo actual

Esta suite evalúa la arquitectura B0/B1/B2 y los contratos cliente/interno E1, Dossier y research. Hay fixtures para los casos descritos abajo; algunos ya tienen evidencia de desarrollo en [`results/runs.jsonl`](results/runs.jsonl) y otros todavía no se han ejecutado. En particular, una campaña focalizada ejecutó casos seleccionados de E1 cliente, Dossier, Research Preflight, triangulación, Decision Delta, saturación, webfetch, feedback y regresiones; hubo intentos parciales/fallidos/no observados y reejecuciones tras correcciones, y los casos seleccionados finalizaron pasando sus observables. No implica que toda la suite esté ejecutada o validada.

### Estado y procedencia de la evidencia

**Campaña histórica.** Su candidate se basó en `af175e9da2ebf1fd966fabd390f7fac960948c74`; los fixes se consolidaron en `bf59acfb547a3187cc3803d4f5ba68db73640fba`. Es evidencia histórica del contrato anterior. Se conservan sus corridas y su valor histórico; no validan automáticamente contratos posteriores.

**Iteración documental actual.** Las corridas focalizadas originales de D1-04, D1-05, DOC-07 y DOC-08 usaron runtime/base `6b392033b1984d3de607cab65f825b88f88a3b2b`. Durante esa iteración se corrigieron fixtures y documentación, consolidadas posteriormente en `5d83abc71649d32cdfa74544e284ecb2ccaa6c2f`; por eso esos registros conservan `skill_commit: 6b392...` y no se reescriben como si hubieran corrido sobre `5d83...`. La reejecución corregida de D1-04 en esta revisión usó la base `5d83...`, registrada separadamente. Ninguna de estas corridas es holdout, suite completa ni comparación A/B; no prueban superioridad general. La existencia de fixtures no equivale a ejecución o validación.

## Suites y tamaños

| Archivo | Suite | Casos |
|---|---|---:|
| [`activation.md`](activation.md) | Activación espontánea | 22 development + 8 holdouts de activación reservados; no validan B0/B1/B2 |
| [`behavior-cases.md`](behavior-cases.md) | Brief, gates, research, ownership O/C, E1 cliente, Dossier, triangulación/Delta/saturación, feedback ledger, arquitectura de secciones, voz/copy/QA | development; ampliada para nueva arquitectura |
| [`e2e-cases.md`](e2e-cases.md) | Recorridos B0→B1→research→B2→E1 y ciclo posterior, requisitos semánticos y handoffs | 13 casos development |
| [`content-structure-cases.md`](content-structure-cases.md) | Estructuras proporcionales, 20 escenarios de variedad + 4 adversariales; variantes E1/E2 independientes | 24 fixtures development (48 observaciones previstas), no ejecutadas |
| [`openseo-cases.md`](openseo-cases.md) | Proveedor opcional, países/idiomas, métricas/intención, presupuesto, errores, aislamiento y gates | OSEO-01–14 ejecutados con fixtures inline; 2 repeticiones tras corrección menor; [campaña y límites](results/openseo-2026-11-04.md) |
| [`holdouts.md`](holdouts.md) | Holdout conductual transversal | Ninguno activo para B0/B1/B2; diseñar/reservar al congelar y no ejecutar durante desarrollo |

Las expectativas de carga pre-registradas están en [`reference-expectations.md`](reference-expectations.md). La rúbrica está en [`rubric.md`](rubric.md). Las corridas reales se registran en [`results/runs.jsonl`](results/runs.jsonl), cuyo esquema se explica en [`results/README.md`](results/README.md).

**Ampliación SEO/AEO/GEO v1 (2026-10-05):** READY-01–17 y E2E-11–13 son fixtures definidos, no ejecutados. Cubren cadena/ownership hasta bloque, entidades, modelos repetibles, claims/relaciones, candidatos Schema, discovery/bots, aplicación E1, límites, copy humano, medición, governance, NO APLICA y legacy. Los registros históricos no validan este contrato. Tests/checker son validación estructural separada, no behavior ni E2E del agente.

### Clases de ejecución

**Regresión local OpenSEO:** `python3 -m unittest discover -s tests -v` verifica contratos con mutaciones, integridad de fixtures e instalación/actualización en proyecto desechable, más hashes, prompts y auditoría local de la campaña preservada. Sin MCP/red/créditos ni dependencias nuevas; no vuelve a ejecutar agentes. Para behavior nuevo seguir [`openseo-cases.md`](openseo-cases.md) con mocks o fixture inline, nunca conectar el proveedor pagado para probar la skill sin autorización expresa. Separar siempre resultado mecánico de conducta observada.

- **Activation:** observar selección espontánea de `web-content-design`; no mencionar el nombre de la skill ni forzar su carga en el prompt.
- **Behavior:** cargar la skill explícitamente para aislar calidad de respuesta; usar un contexto limpio por caso. Puede ser un development spot-check sin baseline o un comportamiento comparativo A/B; solo el segundo exige ambas variantes.
- **E2E:** contexto persistente dentro de un caso, turnos en orden y documentos/decisiones fijados como fixture. No compartir historial entre casos.
- **Baseline:** repetir solo casos behavior/E2E comparables con misma versión de OpenCode, modelo, herramientas, datos, prompt y contexto; skill ausente. No usar baseline como medida de activación.
- **Development spot-check:** skill enabled, sin baseline, contexto limpio y un caso behavior concreto para observar/regresar un contrato específico. Registrar explícitamente `sin baseline → no comparación skill vs baseline`; no permite afirmar superioridad ni impacto comparativo atribuible a la skill.
- **Comparative behavior A/B:** usar solo para afirmar skill mejor / baseline mejor / empate o impacto comparativo en utilidad, factualidad o workflow. Requiere A skill enabled y B baseline, mismo modelo, herramientas, fixture, contexto equivalente y directorios separados.
- **Development:** registrar el commit/base exacto y provenance de cada corrida.
- **Holdout de activación:** ACT-H01–H08 está reservado para medir selección espontánea; no es validación conductual del workflow B0/B1/B2.
- **Holdout conductual:** actualmente no hay casos activos para B0/B1/B2. Se diseñarán/reservarán tras congelar esa arquitectura y no se ejecutarán durante desarrollo; si un resultado se usa para ajustar, retirar el estatus y reservar reemplazo.

## Ejecución en OpenCode

En el repo, fija la ruta de la skill para la ejecución habilitada:

```bash
REPO_ROOT="$PWD"
EVAL_A="$(mktemp -d)"
EVAL_B="$(mktemp -d)"
SKILL_PATH="$REPO_ROOT/web-content-design"
SKILL_CONFIG="$(python3 -c 'import json,sys; print(json.dumps({"$schema":"https://opencode.ai/config.json","skills":{"paths":[sys.argv[1]]}}))' "$SKILL_PATH")"
BASELINE_CONFIG='{"$schema":"https://opencode.ai/config.json","skills":{"paths":[]}}'
(cd "$EVAL_A" && OPENCODE_CONFIG_CONTENT="$SKILL_CONFIG" opencode debug skill)
OPENCODE_CONFIG_CONTENT="$SKILL_CONFIG" opencode run --dir "$EVAL_A" --format json --model PROVIDER/MODEL 'PROMPT DEL CASO'
(cd "$EVAL_B" && OPENCODE_CONFIG_CONTENT="$BASELINE_CONFIG" opencode debug skill)
OPENCODE_CONFIG_CONTENT="$BASELINE_CONFIG" opencode run --dir "$EVAL_B" --format json --model PROVIDER/MODEL 'EL MISMO PROMPT DEL CASO'
```

Usa `opencode run --format json` para conservar eventos/traza y observar llamadas a skill/herramientas. Captura stdout y stderr íntegros; no uses `--auto` como atajo de permisos. Un skill activado por mención explícita permite evaluar comportamiento, no activación espontánea.

En una comparación **A/B**, usa dos directorios temporales distintos pero equivalentes, con copias idénticas de cualquier fixture; si toda la fixture va inline, ambos pueden estar vacíos. No reutilices la carpeta A si puede contaminar B. Correr desde el repo que incluye runtime contamina el baseline aunque `debug skill` no anuncie la skill. Antes de B comprueba que `web-content-design` no aparezca en `debug skill` con `BASELINE_CONFIG`. Mantén iguales modelo, herramientas, permisos, prompt y fixture. Revisa skills externas/globales también. Para cada caso usa un contexto/sesión nueva; E2E conserva sesión solo dentro de la secuencia, en su propio directorio. Un spot-check de desarrollo sin B no requiere directorio baseline ni habilita conclusiones comparativas.

Corridas manuales directas son preferibles a un runner que oculte trazas o permisos. Para correr un conjunto, copia literalmente cada prompt del archivo de caso en una invocación/contexto nuevo; para E2E conserva el contexto únicamente entre turnos de ese E2E:

```bash
opencode run --format json --model PROVIDER/MODEL 'TURNO 1 DEL E2E'
# toma sessionID del evento y continúa la misma sesión:
opencode run --format json --session SESSION_ID --model PROVIDER/MODEL 'TURNO 2 DEL E2E'
```

Guarda salida, traza y juicio humano junto con el registro. No se añade framework/runner: la CLI admite invocaciones directas y el juicio de salida/herramientas sigue requiriendo revisión humana.

## Criterio de lectura

Evaluar con [`rubric.md`](rubric.md), incluyendo evidencia textual y severidad. No sumar todo en una puntuación única que tape fallos críticos. Distinguir ejecución observada, revisión humana y límites del instrumento. Una muestra pequeña o un único modelo no demuestra superioridad general.
