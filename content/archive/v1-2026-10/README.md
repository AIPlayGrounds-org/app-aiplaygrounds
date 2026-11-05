# v1-2026-10 · archivo histórico

**Archivado: 04/11/2026. No operativo. Versión activa: [v2](../../README.md).**

Contiene los 16 archivos que existían en `content/internal/` y `content/entregables-cliente/` al iniciar la intervención. Se trasladaron sin cambiar un byte: nombres, versiones, fechas, evidencia, feedback, estados y citas de aprobaciones permanecen íntegros. `v1-2026-10` identifica el ciclo editorial de octubre; incluye discovery y research de septiembre.

## Inventario y estados de cierre

| Carpeta | Contenido | Archivos |
|---|---|---:|
| `internal/01-brief-diagnostico/` | Brief y matrices B0, B1 y B2 | 4 |
| `internal/02-research/` | Research, consultas, Keyword Map y CSV de 198 observaciones | 4 |
| `internal/03-estrategia/` | Estrategia y dossier de evidencia | 2 |
| `internal/04-feedback/` | Feedback E1 y E2, con decisiones y contexto interno | 2 |
| `internal/` | Registros de migración y reconciliación | 2 |
| `entregables-cliente/` | E1 v15 y E2 v4 | 2 |

El cierre acreditado es **E1 v15 APROBADO**, 14/10/2026, mediante «Apruebo E1 v15»; **E2 v4 pendiente de aprobación final**, no aprobado ni íntegramente publicable. Los estados pendientes de versiones anteriores dentro de esos mismos archivos son historia. No se han recreado versiones intermedias como archivos independientes: sus registros se conservan aquí y las revisiones disponibles permanecen en Git.

Gates A/B históricos resueltos; voz B elegida el 14/10; ocho páginas base, dos fichas y 63 secciones. Nada de ello aprueba el posicionamiento institucional nuevo. La arquitectura de páginas y la voz se heredan por instrucción expresa del Prompt 1; las secciones son antecedente revisable, no obligación de conservar su jerarquía comercial.

## Por qué se archiva

La nueva versión debe explicar primero organización, propósito, comunidad, verticales, actividad y oportunidades. La prioridad exclusiva de formación y las descripciones antiguas de Labs requieren un tratamiento distinto. La revisión activa de vigencia está en [decisiones heredadas](../../internal/01-brief-diagnostico/decisiones-heredadas.md); el nuevo [brief](../../internal/01-brief-diagnostico/brief.md) y [B0](../../internal/01-brief-diagnostico/diagnostico-b0.md) no sustituyen retrospectivamente estos registros.

## Resolución de rutas históricas

Se eligió conservar los originales íntegros y resolver las referencias por versión, en vez de reescribir sus citas hacia v2.

| Texto encontrado dentro de un documento v1 | Cómo resolverlo hoy |
|---|---|
| `content/internal/<ruta>` | `content/archive/v1-2026-10/internal/<ruta>` |
| `content/entregables-cliente/<ruta>` | `content/archive/v1-2026-10/entregables-cliente/<ruta>` |
| Un nombre local como `diagnostico-b2.md` o `dossier-evidencia-estrategica.md` | Mismo directorio del documento archivado, salvo que su texto indique otro contexto |
| `.opencode/skills/web-content-design/<ruta>` | Desde la raíz del repositorio; la skill no se trasladó. Es la instalación actual, no un snapshot de la skill de octubre |
| `content-rerun/` o `content-snapshots/` | Antecedentes ausentes **antes** de esta intervención; fueron retirados en el commit `f985b49`. Consultar Git anterior a ese commit si se necesitan; no son dependencias activas ni se restauran aquí |
| `/tmp/opencode/...` | Evidencia temporal histórica; no garantía de que siga disponible |
| URLs W/F/U/N u otras externas | Fuentes observadas en las fechas originales; sin comprobación de vigencia actual |

Este mapa evita que una cita histórica a `content/internal/` apunte semánticamente al brief nuevo. Los originales usan sobre todo rutas entre backticks, no enlaces Markdown navegables; no se añaden symlinks o redirecciones que mezclen versiones. Las rutas legacy de los registros de migración siguen siendo mapas de aquella migración, no archivos que deban existir hoy.

## Integridad y privacidad

[`SHA256SUMS`](SHA256SUMS) registra los 16 originales. Desde este directorio: `sha256sum -c SHA256SUMS`. El README y el manifiesto son añadidos de archivo, no documentos históricos alterados. También se verificó igualdad con el estado de trabajo previo y con `HEAD` para esos 16 documentos.

Hay contexto económico, jurídico y de participación de uso interno. Preservarlo no autoriza publicarlo ni reutilizarlo como promesa comercial. Los nuevos entregables estarán en `content/entregables-cliente/`, fuera de este archivo.
