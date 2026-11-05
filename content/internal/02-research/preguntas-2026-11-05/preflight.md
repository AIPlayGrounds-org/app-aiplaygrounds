# Complemento de preguntas · preflight

**05/11/2026 · Research, antes de Gate B.** Encargo humano: investigar preguntas para los trece clusters N01–N13 existentes, sin reagruparlos, cambiar arquitectura ni avanzar a B2/Estrategia/E1/E2. Resultado esperado: matriz interna de preguntas, evidencia y propuestas de función editorial, no FAQs redactadas ni un entregable cliente nuevo.

## Decisiones y criterio de cierre

| Decisión que podría cambiar | Pregunta investigada | Instrumento / mercado | Criterio de cierre |
|---|---|---|---|
| Bloques de identidad/participación | ¿Qué dudas se observan sobre organización, comunidad y experimentación? | OpenSEO, evidencia existente y contraste web; PE/MX/CO-es separados | Evaluar N01–N03; distinguir consultas verificadas de preguntas editoriales propias de la entidad |
| Información de evaluación | ¿Qué necesitan comparar quienes exploran productos, líneas técnicas, aplicaciones y trabajos? | Expansión interrogativa y SERP existentes/nuevas selectivas; N04–N10/N13 | Diferenciar objeto, herramienta, resultado, tarea, carrera y formación; justificar campos/bloques sin nuevas páginas |
| Decisión de aprendizaje y relación empresarial | ¿Qué requisitos, límites y dudas importan antes de actuar? | Keywords/preguntas y SERP; N11/N12, sin prioridad por volumen únicamente | Mapear preguntas prioritarias a páginas y etapa de decisión; sin nueva oferta o promesa |
| Alcance real de PAA | ¿Puede recuperarse texto de PAA/Related Searches y atribuirlo correctamente? | Schemas actuales, respuestas MCP y búsqueda web complementaria | Recuperar contenido identificable o documentar límite y alternativa verificable; no contar módulos vacíos como preguntas |

## Fuentes y estado inicial

- OpenSEO **USAR / LISTO**: `whoami` conectado hosted, saldo **7.820 créditos**; Default autorizado anteriormente, mismo proyecto sin dominio y defaults US/en que se sobrescriben por consulta. `get_project_context` vacío. No cambios remotos.
- Evidencia previa **USAR / EJECUTADO**: lectura del mapa y CSV de preguntas; 66 SERP ya adquiridas se reutilizan, no se recompran en bloque. Consultas repetidas solo si un error o necesidad específica lo justifica, con registro.
- Planner **USAR / ERROR OBSERVADO**: se conserva el fallo real de reautenticación de esta misma etapa Research. No hay corrección de credenciales aportada; no se repite ni se repara el intento.
- Websearch/webfetch **USAR / LISTO** para completar preguntas y probar acceso a PAA, sin fabricar URLs de buscadores o atribuir métricas a páginas.
- Trends/GSC/visibilidad IA: **OMITIR — no puede cambiar esta decisión**; no es análisis temporal, de propiedad o de respuestas generativas.

## Capacidades inspeccionadas y consumo autorizado

Se redescubrieron los82 tools y los schemas pertinentes de `research_keywords`, `get_keyword_metrics` y `get_serp_results`. `research_ai_visibility_prompts` describe una base principalmente derivada de PAA, pero **solo US/inglés**; no se traslada a Perú/México/Colombia/es ni se ejecuta para traducirla y fingir geografía. `get_google_business_questions` es Q&A de fichas locales, no PAA orgánica. No existe parámetro de preguntas/expansión PAA en el SERP expuesto; se comprobará el contenido realmente devuelto.

Autorización humana: usar créditos incluidos disponibles sin nuevos cargos, recargas, plan o tracking. **Tope total:7.820 créditos**, condicionado a saldo suficiente; no se intenta agotarlo. Plan acotado inicial: hasta18 seed/país nuevas (6 por mercado), reserva94/seed, más hasta30 consultas SERP selectivas a5/query y métricas limitadas con reserva60 conjunta: **máximo planificado1.902 créditos**, inferior a2.000. Se revisará cobertura antes de ampliar; no se fragmentan consultas para eludir aprobación de lotes mayores.

Base de estimación revisada en código público oficial ya adquirido en esta fecha, commit0749caf15796888dd9034cd52e8d344e2b44e09f: `src/shared/billing.ts` (1.000 créditos/USD, markup1,28), `src/server/lib/dataforseo/pricing.ts` (Labs0,012+0,00012/fila), `research.ts` (auto, dos fuentes limit75 y eventual fallback150). Reserva94/seed; sin clickstream, volumen local o agrupación adicional de variantes. SERPdepth20/desktop/es,5 por query sin operadores. Los metadatos pueden omitir cargos/runId: se conservarán diferencias de saldo por fase, separadas de estimaciones y sin inventar desglose contable. No existe cap server-side por investigación en estos schemas.
