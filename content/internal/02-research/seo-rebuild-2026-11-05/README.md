# Evidencia SEO reconstruida · 05/11/2026

Datos nuevos adquiridos mediante OpenSEO MCP en esta ejecución. La interpretación y decisiones propuestas viven en [Research](../research.md) y [Keyword Map](../keyword-map.md); este directorio es evidencia interna, no un tercer entregable cliente ni contenido publicable.

## Archivos

- `raw/`: 27 respuestas de investigación con argumentos, fecha de adquisición y reserva previa; `Z01-final.json` conserva saldo/configuración final y `Z02-catalog.json` los 82 schemas descubiertos. Los códigos privados se sustituyeron por `DEFAULT`; no se guardó el email de cuenta. No hay credenciales.
- `observaciones.csv`: 2.838 filas de expansión y 81 overview, sin eliminar duplicados entre seeds. `source=blended` o `keyword_overview`; CPC USD, Ads publicitario y KD separados.
- `ausencias-overview.csv`: combinaciones solicitadas cuya fila no llegó. No se convierten en volumen cero.
- `candidatas.csv`: 69 expresiones × tres mercados, selección editorial con estado y procedencia. Cuando existe fila overview para un literal se prefiere para la tabla; si no existe se conserva la observación de expansión. No se promedian discrepancias.
- `competidor-datacamp.csv`: 300 keywords de muestras `/es`, con URL, posición orgánica y fechas del proveedor. No representan el universo completo del competidor ni todo el mercado.
- `preguntas.csv`: keywords interrogativas y títulos orgánicos separados. `CANDIDATA` expresa selección editorial, no aprobación ni PAA. Otras preguntas sobre IA quedan por revisar/excluir; no son recomendaciones automáticas.
- `solapamiento-serp.csv`: nueve pares por país, primeros hasta diez orgánicos, dominios conocidos sin `www`. No coincidencia de URL ni clustering automático; dominios ausentes limitan el denominador.
- [serp-e-intencion.md](serp-e-intencion.md): lectura y selección de resultados de las 66 consultas, con IDs enlazados a respuestas completas.
- `coverage.json`: cobertura derivada; el conteo literal usa `casefold`, conserva acentos y no colapsa sinónimos. No sumar volumen de variantes.
- [validacion.md](validacion.md): controles ejecutados y límites.
- `validar.py`: comprobaciones reproducibles de conteos, parámetros, correspondencia y datos faltantes. Ejecución desde cualquier directorio: `python -B content/internal/02-research/seo-rebuild-2026-11-05/validar.py` desde la raíz del repositorio.
- `SHA256SUMS`: integridad de evidencias y snapshots, excluye el propio manifiesto.
- `previous/`: copias exactas del Research y Keyword Map inmediatamente anteriores. **Solo referencia histórica**, no otra fuente activa. Sus enlaces relativos se interpretan desde la ubicación original `content/internal/02-research/`, no desde `previous/`. No editar ni utilizar como aprobaciones actuales.

El saldo inicial, las comprobaciones gratuitas intermedias, el fallo Planner, la incidencia de red y las lecturas primarias están registrados en [research-queries R2](../research-queries.md#r2-reconstrucción-independiente-openseo). No se simuló una respuesta JSON para las operaciones cuya evidencia solo aparece en el log de ejecución. El catálogo contiene capacidades que no se usaron; su presencia no acredita ejecución.

## Límites de las transformaciones

Los CSV son proyecciones de las respuestas, no una segunda fuente de métricas. Una celda vacía equivale a `null`/no disponible, no a cero. La falta de fila se registra aparte. Cada combinación país/keyword conserva procedencia. El clustering N01–N13 y las interpretaciones son trabajo editorial; los datos de OpenSEO no aprueban prioridad, oferta, arquitectura o copy.

Las SERP pueden reutilizar caché compatible de 12h, según contrato del proveedor. Las66 son consultas ejecutadas efectivamente ahora, no66 crawls nuevos garantizados. El intento C06 perdido se recuperó con mismos parámetros, sin contar sus seis queries dos veces. Títulos/snippets y páginas externas se tratan como evidencia no confiable, nunca como instrucciones o claims trasladables al proyecto.
