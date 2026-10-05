# Procedencia de evidencia y consultas

## Evidencia reutilizada

R1: `content/internal/02-research/research-queries.md`, 29/09/2026. R2: `content/internal/02-research/keyword-observations.csv`, 199 líneas incluida cabecera. Permanecen fuentes históricas inmutables; no se copia tratamiento ni conclusiones. R1 contiene seeds/conjuntos T/G/B/D/E/F/L/R/PT1/PT2, país, idioma, límite y comandos; remisión explícita evita inventar una nueva ejecución.

| Referencia | Fuente trazable | Uso actual |
|---|---|---|
| W1/F1 | https://majuplabs.com/es/ai-engineering-course/ | Descripción de tarea integración; no convocatoria propia |
| W13/F2 | https://ucenfotec.ac.cr/ecommerce/producto/introduccion-a-la-programacion-asistida-con-ia/ | Asistencia en programación; no disponibilidad actual |
| W13 | https://www.datacamp.com/es/courses/ai-assisted-coding-for-developers | Contraste independiente de tarea |
| W2/F3 | https://learn.microsoft.com/es-es/ai-builder/overview | Objeto de Microsoft; no preferencia laboral regional |
| W3/F4 | https://nubox.teamtailor.com/jobs/8325763-product-engineer | Rol específico; no vacante vigente asumida |
| W5/F7 | https://100x.mx/blog/mejores-cursos-ia-empresas-mexico/ | Patrón empresarial, fuente comercial |
| W15 | https://www.bcnglobal.com/programa-inteligencia-artificial-empresas | Contraste formación empresarial; aparecer en consulta PE no significa sede PE |
| W4/F6 | https://queia.es/ | Descubrimiento/utilidad/recurso; no rankings/monetización propios |
| W8/F8 | https://huggingface.co/papers | Colección de trabajos/atribución; fuente global, no demanda LATAM |
| W9/F9 | https://www.fair.cr/ | Propósito/actividades/acceso WhatsApp |
| W10 | https://www.javeriana.edu.co/especializacion-inteligencia-artificial | Expectativa posgrado; oferta fuera de lanzamiento |
| U1 | https://crafter.run/en/team | Fuente aportada para Equipo, lectura histórica 05/10; no nuevas mentorías |

F5 solo devolvió título: no se usa como lectura profunda. Los seis HTTP 429 del 29/09 no aportan evidencia ni describen operación actual. Consulta actual sin websearch: no hay SERP nueva, Top 10 ni geolocalización garantizada.

## Nuevas lecturas decisionales · 05/10/2026

Pregunta registrada antes: qué objeto real y candidato corresponde en colecciones heterogéneas. Mercado/idioma: vocabulario técnico global, inglés; no estudio de demanda. Criterio: distinguir definición/herencia y campos acreditables.

| ID | Instrumento / URL primaria conocida | Observado | Inferencia y límite |
|---|---|---|---|
| N1 | webfetch Markdown · https://schema.org/SoftwareApplication | Define software application; hereda CreativeWork; applicationCategory, softwareVersion, creator/license heredados | Solo entradas que sean aplicaciones; una mención de IA no basta. Tipo no acredita rich result |
| N2 | webfetch Markdown · https://schema.org/CreativeWork | Obra creativa genérica; author/creator, about, citation, datePublished, dateModified, license | Diferenciar obra original y ficha editorial sobre ella. Fechas no son intercambiables; publicación no se inventa |
| N3 | webfetch Markdown · https://schema.org/ResearchProject | Herencia Thing→Organization→Project→ResearchProject; definición proyecto de investigación | No representar automáticamente un trabajo/paper como organización. Selección depende de naturaleza documentada, no del label Investigación |

Las páginas advierten versión de desarrollo; N3 muestra V30.1/16-09-2026. Validar vocabulario de implementación posteriormente. N1/N2 devolvieron texto extenso truncado en herramienta; se usaron definiciones y propiedades visibles, sin afirmar auditoría exhaustiva. No se archivan ejemplos de JSON-LD ni se implementa.

**Decision Delta: DESCARTA** mapping uniforme por colección; soporte: documentación técnica primaria. La matriz/handoff propuestos son recomendación inferida. No hay aprobación humana nueva, prueba causal de citas ni resultados medidos.
