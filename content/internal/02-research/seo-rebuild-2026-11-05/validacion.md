# Validación de la reconstrucción SEO

**Fecha:** 05/11/2026. **Estado:** controles locales ejecutados; investigación y mapa PROPUESTOS, no aprobación humana de Gate B. No certificación de rankings, citación o implementación técnica.

## Datos y trazabilidad

- `python -B content/internal/02-research/seo-rebuild-2026-11-05/validar.py`: **OK**. Comprueba 27 respuestas de investigación y el intento perdido documentado; 30 seeds, 10 por país, con idioma/localización explícitos; 66 SERP únicas y exitosas; 81 filas overview de144 solicitadas; 63 ausencias y300 filas competidoras.
- Se verificaron parámetros de expansión150, sin clickstream ni agrupación de variantes, nacional; SERP20/desktop/es, sin ciudades. Catálogo preservado82 herramientas; capacidades ejecutadas separadas de las meramente disponibles.
- CSV normalizados contrastados con datos fuente: 2.919 observaciones (2.838 expansión +81 overview), 207 registros de candidatas (69×3), principales/secundarias en mapa y13 clusters identificables. Cada candidata observada remite a una respuesta; faltantes no se imputan como0. KD, CPC USD y competencia Ads permanecen separados.
- Clustering declarado editorial, con27 pares de SERP y limitación de dominios desconocidos. Ningún umbral o grupo de variantes del proveedor se presenta como aprobación de un cluster.
- 22 módulos PAA/62 Related Searches sin contenido;0 preguntas/búsquedas extraídas de esos módulos. Keywords interrogativas, títulos-pregunta y propuestas editoriales separados. Cero informado CO en pregunta financiera se mantiene distinto de ausencia de fila. No métricas de popularidad/recurrencia, respuestas finales o FAQs inventadas.
- Fechas de adquisición y series históricas diferenciadas. El último mes varía por keyword; no se describe como demanda exclusiva de noviembre. Rankings DataCamp conservan fechas específicas y no sustituyen SERP live.
- Consumo: saldo9.491→7.820, diferencia1.671. Fases suman1.026+54+240+142+119+90=1.671. Se distingue diferencia de saldo de cargo por llamada ausente. El intento C06 se recuperó sin duplicar las seis SERP; ninguna reserva pendiente.

## Preservación

Se compararon SHA-256 de todos los archivos preexistentes de `content/` y `.opencode/` contra baseline tomado antes de editar. Cambios de esta ejecución limitados a:

1. `content/README.md`: estado/vigencia y consumo.
2. `content/entregables-cliente/README.md`: aviso de reapertura, sin tocar E1.
3. `content/internal/02-research/research.md`: reconstrucción vigente y delimitación del registro histórico.
4. `content/internal/02-research/research-queries.md`: operaciones reales nuevas y consumo.
5. `content/internal/02-research/keyword-map.md`: sustitución autorizada del mapa, con snapshot exacto anterior.
6. `content/internal/03-estrategia/dossier-evidencia-estrategica.md`: autoridad, procedencia e implicaciones pendientes.

Se añade este directorio de evidencia. **Sin cambios** a Brief, B0, B1, B2, arquitectura, decisiones heredadas, investigación estratégica no SEO (§§2–5 comparadas literalmente), archivo v1, evidencias antiguas, Estrategia, E1 v2.1, configuraciones o skill. Los dos snapshots `previous/` coinciden byte a byte con los archivos al inicio de esta intervención. Las diferencias contra HEAD incluyen trabajo previo del usuario y no se atribuyen íntegramente a esta ejecución.

## Revisión documental y editorial

- `python -B .opencode/skills/web-content-design/scripts/check_package.py`: **OK**, frontmatter,28 Markdown, enlaces locales, runtime y estructura de evals; no evalúa comportamiento editorial ni modifica el paquete.
- Revisión de referencias locales y anclas de documentos activos y evidencia nueva: **OK**. Los enlaces de los snapshots históricos se interpretan desde su ubicación original y no cuentan como rutas activas. No se reescribe el archivo histórico para adaptarlo a la ubicación de la copia.
- Tablas Markdown de los documentos actualizados y de la evidencia: **OK**, estructura/columnas. Referencias a IDs de adquisición comprobadas con raw y cobertura.
- `git diff --check`: **OK**. También se revisaron whitespace y sintaxis de los archivos nuevos, no incluidos por defecto en `git diff`. Revisión de diff contra HEAD y baseline de ejecución para distinguir cambios previos.
- Revisión editorial conjunta: institución como foco; Academy como parte de la oferta; Empresas no reducida a cursos; verticales no convertidas en servicios/cursos/páginas; señales de demanda no sustituyen datos internos. Preguntas y oportunidades concretas, límites junto a las conclusiones. R-D1–R-D7 usan los mismos tokens en Research y Dossier.
- Ocho páginas y dos fichas preservadas; oportunidades sin destino adecuado quedan como backlog pendiente. CTA contextual, estructura organizacional y correcciones nominales se registran como decisiones humanas para incorporar después, no como descubrimientos SEO.

**No se ejecutaron tests de aplicación/UI:** los cambios son documentación y evidencia, sin implementación. No se modificó staging, no hubo commit o push. Gate B sigue pendiente de revisión de la reconstrucción; B2/Estrategia/E1 no se reconsolidan ni se redacta E2.
