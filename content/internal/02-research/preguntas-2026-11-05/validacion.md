# Validación del complemento

**05/11/2026.** Controles locales; no certifican exhaustividad de Google, demanda real individual ni comportamiento de asistentes.

## Resultado

- `python content/internal/02-research/preguntas-2026-11-05/compilar.py`: genera matriz, inventario y conteos desde capturas reales y selección editorial.48 canónicas,13 clusters,790 observaciones; cada pregunta no editorial encontró fuente literal. No llama APIs.
- `PYTHONDONTWRITEBYTECODE=1 python content/internal/02-research/preguntas-2026-11-05/validar.py`: **OK**. Localizadores de790 observaciones resueltos; literal, fecha, país, idioma de consulta, métricas y URL/rank coinciden con la respuesta fuente.13/16/19 orígenes,26/17/5 prioridades; nulls preservados,97 ausencias métricas,3 errores SERP, checksums de15 capturas y650 créditos conciliados.
- `python content/internal/02-research/seo-rebuild-2026-11-05/validar.py`: **OK**, evidencia anterior intacta:2.838 filas,81 métricas,66 SERP,69 candidatas y13 clusters, con sus checksums previos.
- `python .opencode/skills/web-content-design/scripts/check_package.py`: **OK**, frontmatter,28 Markdown, enlaces locales, runtime y estructura de evals. No se evalúa comportamiento ni se modifica el skill.
- Contraste con hashes tomados antes de esta intervención: solo cambiaron Research, Keyword Map, registro de consultas y Dossier; ningún archivo anterior eliminado. B1, arquitectura, B2, Estrategia, E1v2.1, evidencia SEO anterior, README preexistentes y skill permanecen idénticos al inicio de este complemento. Los cambios previos del usuario no se revierten ni atribuyen a esta tarea.
- Referencias SERP de apoyo de `seleccion.py` resuelven a resultados exitosos; las tres consultas fallidas permanecen separadas. Enlaces locales, anclas y tablas del complemento revisados. `git diff --check`: **OK**. Se revisó el delta de esta intervención contra el corte inicial, no solo el diff global que contiene trabajo previo.

## Revisión editorial y de equivalencias

Las variantes de herramientas existentes/cuales son, machine learning/aprendizaje automático, necesito/se necesita y mejores herramientas para investigar se agrupan como alias canónicos sin sumar volúmenes. Se conservan observaciones repetidas de diferentes fuentes o posiciones como evidencia, no como frecuencia. No hay preguntas canónicas literalmente duplicadas. Otras proximidades no son duplicados:rol de ingeniería y diferencia entre líneas; aplicación financiera y riesgos; evaluar artículo y consultar su autoría/original; condiciones de una oferta y requisitos para aprender.

Los títulos homónimos, ranking universal de mejor IA, gratuidad no acreditada y tutoriales fuera de alcance mantienen prioridad baja/exclusión. La confianza distingue procedencia del literal, interpretación de intención y evidencia de demanda. Se revisaron límites de ciencia/finanzas, nombres canónicos, ausencia de claims nuevos, cuatro verticales y Academy como iniciativa. La prosa de cierre y del resumen se revisó para evitar recomendaciones genéricas o transformar cada pregunta en FAQ.

**Arquitectura preservada:** Inicio, Formación, Empresas, Comunidad, AI Labs, Productos, Investigación, Equipo; ficha de producto y ficha de investigación. Las funciones sugeridas son condicionales a revisión posterior, sin páginas por país o vertical, sin URLs o servicios nuevos, sin copy E2. Las condiciones aún no confirmadas se identifican como dependencias, no como respuestas públicas.

**Gate B pendiente de revisión humana.** No commit, push o avance de etapa.
