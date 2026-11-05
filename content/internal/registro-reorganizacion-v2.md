# Registro de reorganización y revisión · v2

**Fecha:** 04/11/2026. **Encargo:** Prompt 1/4; archivo de v1, reconstrucción de brief y B0, detención en Gate A. No commit ni push.

## Inspección y protección previa

Se leyeron la skill instalada y sus referencias aplicables a brief, diagnóstico, gobernanza y revisión editorial: `SKILL.md`, `assets/project-brief.md`, `assets/diagnostic-matrix.md`, `references/intake-and-governance.md` y `references/quality-and-delivery.md`. No se cargó OpenSEO ni se hizo research: no corresponde antes de B1. Se revisaron los 16 documentos editoriales, research/CSV, decisiones y aprobaciones, además de Git, dependencias y rutas. No hay AGENTS.md dentro del repositorio.

El estado inicial tenía 16 archivos rastreados modificados y 5 sin seguimiento, todos bajo `.opencode/skills/web-content-design/`. Incluye el bytecode ya modificado por trabajo previo. No había modificaciones locales de los documentos que se archivaron, ni staging inicial. Se preservaron todos los cambios previos, sin revertirlos, instalarlos de nuevo o asumir su autoría.

Antes de mover se guardaron:

- Respaldo externo: `/tmp/opencode/aiplaygrounds-prompt1-zh05mld6/pre-intervencion.tar.gz`, sin `node_modules`; incluye los documentos y ambos entornos, incluidos los archivos nuevos de la skill.
- SHA-256 del tar: `44c4466df29f7e950921050774bc9b46118c00c5b0f21d0bb8365ac6680a49d2`.
- En ese mismo directorio: estado Git, diff binario de cambios rastreados y manifiesto SHA-256 del estado de trabajo, incluidas las dependencias de ambos `.opencode`. Es evidencia temporal auxiliar; la preservación duradera de documentos está en el archivo del repositorio, no depende de `/tmp`.

## Función de los dos `.opencode`

| Directorio | Observación | Tratamiento |
|---|---|---|
| `.opencode/` de raíz | Skill `web-content-design`, scripts, referencias, evals y entorno local de dependencias; `@opencode-ai/plugin` 1.18.33 en package.json | No se mueve ni edita. Los archivos de skill están rastreados; los paquetes/locks son locales ignorados |
| `content/.opencode/` | `.gitignore`, package.json/lock y node_modules; `@opencode-ai/plugin` 1.18.34. No skills, comandos, configuración o automatización propios observados | Se conserva en su ubicación. La observación no prueba por sí sola cuál es su uso en sesiones externas; no se considera documentación v1 |

No se encontraron comandos de instalación/sincronización específicos del proyecto que dependan de mover los documentos. Las dependencias y sus locks no se actualizaron. El único script propio observado en la skill es el check del paquete; continúa en la misma ruta y se ejecutó con `-B` para evitar modificar bytecode. No se hicieron pruebas de instalación con efectos secundarios.

## Movimientos y fuentes activas

Los directorios `content/internal/` y `content/entregables-cliente/` se trasladaron completos a `content/archive/v1-2026-10/`. Se recrearon los directorios activos en las rutas canónicas de la skill. Los 16 originales conservan sus rutas relativas y bytes; Git puede reconstruir los movimientos por identidad de contenido. No se usó un reset, borrado de historia o reescritura de originales. El índice real de Git se dejó sin staging nuevo.

Se añadieron README de contenido, archivo y entregables; manifiesto de los 16 originales; brief/B0 activos; registro de vigencia y baseline de arquitectura. No hay dos briefs o estrategias **activas**: las copias v1 están bajo `archive/`, identificadas por versión. No se generan E1/E2 ni plantillas vacías de fases no alcanzadas.

## Referencias cruzadas y antecedentes ausentes

Se preservaron los originales sin sustituir `content/internal/` por rutas activas nuevas. El [mapa del archivo](../archive/v1-2026-10/README.md#resolución-de-rutas-históricas) resuelve por versión sus citas a internos/entregables: desde la raíz, prefijar `content/archive/v1-2026-10/` en lugar de `content/`. Se comprobaron los destinos explícitos de esas dos familias. Los nombres locales mantienen el contexto del documento archivado. No se crean symlinks de compatibilidad que apunten al brief nuevo desde una cita histórica.

Las referencias a `content-rerun/` y `content-snapshots/` ya estaban sin destino en el árbol inicial. Git registra su retirada previa en `f985b49` («Clean up rerun and snapshot artifacts»); no son pérdidas causadas por esta intervención y no se restauran como fuentes activas. Los registros antiguos y sus hashes permanecen intactos. Los paths legacy listados como mapas de migración tampoco son nuevos enlaces rotos. No se verificaron URLs externas o archivos temporales antiguos ni se afirma su disponibilidad.

## Revisión estratégica y alcance de aprobación

- Último estado histórico: E1 v15 aprobado explícitamente el 14/10; E2 v4 pendiente de aprobación final. Se conservaron ambos, sin dar por aprobado E2.
- Arquitectura heredada: Inicio, Formación, Empresas, Comunidad, AI Labs, Productos, Investigación y Equipo; ficha de producto y ficha de investigación. Se recuperaron mapa, accesos directos, funciones y las 63 secciones de v1 como antecedente revisable, no como imposición para v2.
- Se mantienen voz B, español/LATAM, nombres y definiciones más recientes de verticales y líneas, atribución contextual y límites de oferta/publicación. P1 cambia la prioridad global de formación y aporta AI Academy; no renombra Formación o Equipo.
- No se encontró organigrama reciente ni datos nominales del equipo. Leadership Team, líderes/integrantes de verticales y funciones transversales son dimensiones que P1 pide considerar; composición y relaciones quedan pendientes.
- Definiciones confirmadas, decisiones heredadas, evidencia por actualizar, inferencias y propuestas se separan en brief/B0 y registro de vigencia. Los acuerdos económicos, participación interna, planes jurídicos y demás contexto confidencial permanecen fuera del contenido publicable.

## Validaciones de cierre

1. Integridad de los 16 originales mediante SHA-256 contra el estado previo, contra `HEAD` y mediante `sha256sum -c SHA256SUMS` en el archivo. CSV preservado con sus 198 observaciones.
2. Ambos `.opencode` comparados con el manifiesto inicial, incluidos archivos no rastreados y dependencias: sin cambios atribuibles a esta intervención.
3. Referencias Markdown nuevas, destinos y anclas locales comprobados; referencias históricas explícitas a internos/entregables resueltas con el mapa, sin modificar sus bytes. Ausencias anteriores documentadas aparte.
4. Comparación de los 63 nombres/órdenes de sección de la estrategia histórica con la tabla de baseline; ocho páginas y dos tipos conservados. No nombres o páginas adicionales aprobados por inferencia.
5. B0 contrastado con las ocho dimensiones y sus siete campos, síntesis transversal, estados/procedencia y preguntas de Gate A. Sin B1/B2, research, Keyword Map, estrategia o E1/E2 nuevos.
6. `python -B .opencode/skills/web-content-design/scripts/check_package.py`: **OK**, frontmatter, 28 Markdown, enlaces locales, runtime y estructura de evals. Es check mecánico del paquete actualizado que ya estaba en el workspace; no evaluación de comportamiento ni QA de implementación del website.
7. Diff completo de `content/` revisado con detección de renames usando un índice Git temporal externo, sin modificar staging real. Git reconoce 14 movimientos `R100`; los originales de brief y B0 también son idénticos en el archivo, aunque el diff normal los muestra como altas archivadas y modificaciones activas porque se reutilizan sus rutas canónicas. `git diff --check` y el check del diff temporal incluyen los archivos nuevos. Movimientos documentales íntegros y archivos activos nuevos, sin cambios ajenos al alcance.
8. Revisión editorial final de los documentos activos en conjunto: funciones y nombres específicos de AI PlayGrounds, preguntas materiales, sin prosa comercial nueva, inventarios inventados, estructura organizacional asumida o garantías de resultados. No pruebas UI, técnicas de website o suites de desarrollo innecesarias.

**Créditos OpenSEO consumidos: 0.** No se llamaron herramientas OpenSEO ni se consultaron fuentes externas. Sin commit, push o cambio de instalación/configuración.

## Salida

**Actualización posterior:** la salida de Prompt 1 descrita abajo quedó validada por «go». Véase la adenda de Gate A al final; no se mantiene un gate de aprobación abierto para esa misma lectura.

**Gate A pendiente:** [B0 y decisiones solicitadas](01-brief-diagnostico/diagnostico-b0.md#gate-a--decisión-humana). La aprobación humana debe confirmar/corregir la lectura institucional y públicos, delimitar oportunidades/acciones y resolver o mantener explícitamente pendientes las fuentes de Equipo. Puede conservar datos e inventarios pendientes sin convertirlos en hechos. Solo después se consolida B1; aprobar este gate no autoriza consumo ni aprueba por anticipado estrategia o entregables. No se inicia Prompt 2.

## Adenda · Gate A resuelto y B1 consolidada

**Fuente humana:** «go», posterior a la entrega y solicitud explícita de aprobar brief/B0 como base para B1. Se registra como confirmación general, sin correcciones ni datos adicionales. El [B1 activo](01-brief-diagnostico/diagnostico-b1.md) incorpora las ocho dimensiones y síntesis de B0, con su procedencia y límites.

Se actualizan los estados del brief, B0 y los README activos. B0 conserva el diagnóstico provisional presentado; los originales v1, la arquitectura, ambos `.opencode` y los cambios previos permanecen intactos. No se declara vigente ningún canal, oferta, roster o dato por la mera aprobación. Prioridades concretas, oportunidades, organigrama, datos y permisos siguen pendientes.

El registro de checks anterior corresponde al cierre de Prompt 1 antes de la confirmación; su afirmación de ausencia de B1 describe aquel momento. Esta continuación solo registra aprobación y B1: no inicia Prompt 2, research, Keyword Map, B2, estrategia o entregables, ni autoriza gasto OpenSEO. Sin commit ni push.
