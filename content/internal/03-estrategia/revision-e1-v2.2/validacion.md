# Validación de B2, Estrategia y E1 v2.2

**05/11/2026 · Gate B APROBADO por GB22; E1 v2.2 pendiente de aprobación humana.** Este registro es interno, no tercer entregable ni certificación de publicación/visibilidad. El control local está en `validar.py`; resultados correctos al cierre.

## Fuentes y proyección

- Research R11 y feedback GB22 registran autorización y precisiones; B2 reconsolida N01–N13 sin reabrir B1 o la investigación no SEO.
- Estrategia es la fuente operativa: públicos/mensajes, modelos de campos, roster, arquitectura, CTA, mapa de aplicación de búsqueda/preguntas, claims, relaciones y readiness/handoffs. E1 resume esa fuente sin métricas ni IDs internos.
- Los snapshots en `previous/` conservan íntegros E1 v2.1, B2 y Estrategia anteriores con checksums. No son fuentes activas; sus enlaces relativos se interpretan desde las rutas originales. El archivo v1 no se modifica.

## Organización de secciones

| Página o plantilla | v2.1 | v2.2 | Cambio de función |
|---|---:|---:|---|
| Inicio |7|6|Actividad concentra evidencia/destinos; iniciativas y oportunidades agrupan rutas diferenciadas; cierre institucional nuevo |
| Equipo |4|4|15 personas únicas y relaciones confirmadas; continuidad hacia participación |
| Comunidad |7|5|Apertura/propósito y vías/normas combinados; condiciones junto a acción |
| Formación |6|5|Academy/punto de partida combinados; siguiente paso tras ruta para equipos |
| Empresas |6|6|Nuevo marco de4 campos,capacidades,objetos/oportunidades,Academy y conversación |
| AI Labs |5|5|Iniciativas/estado,no tutoriales; relación con Comunidad y colecciones |
| Productos |4|4|Descubrimiento principal; continuidad institucional/postulación integradas |
| Ficha de producto |9|7|Clasificación/IA y acceso/fuentes combinados; límites explícitos y continuidad institucional |
| Investigación |4|4|Trabajos y procedencia; continuidad institucional/revisión de postulación |
| Ficha de investigación |7|6|Autoría/tipo/estado combinados; originales y límites conservados |
| Total |59|52|Sin cambiar8 páginas ni2 tipos de ficha |

El total describe la dirección propuesta, no exige bloques vacíos al lanzamiento. Secciones condicionales y relaciones opcionales no se rellenan para conservar una cuota.

## Revisión sustantiva

1. **Institución/verticales:** identidad comunitaria antes de oferta; cuatro campos visibles en Inicio y Empresas; Academy y Labs con funciones propias, Comunidad sin pertenencia automática. Voz cercana y participativa conservada.
2. **Búsqueda:** B2 distingue prioridad institucional y oportunidad SEO respaldada. Estrategia§8.1 define por10 páginas/tipos intención,clusters,keywords candidatas principales/secundarias,aplicación y riesgo; §8.3 evalúa las48 preguntas y conecta campos. Métricas y países en Research/Map,sin sumar variantes o transformar ausencia en0.
3. **Pertinencia:** P05 solo contraste competitivo; P09 y P27 excluidas del plan E1/E2; P45 media como apoyo a campos,no sección/FAQ prioritaria. Los datos originales de la matriz se preservan como corte de investigación.
4. **CTA:** principal/secundaria,objetivo,destino,ubicación y condición definidos en Estrategia§7; E1 proyecta10 recorridos. Cierre editorial nuevo solo en Inicio; acciones restantes integradas. Sin canales,formularios,convocatorias,plazas o respuestas garantizadas inventadas.
5. **Equipo:**15 personas únicas; Jhonatan en un registro con Head of AI y liderazgo Foundations; Edhú Nuñez y Kevin Huaman con grafía exacta. Appu PR pendiente; bios/fotos/enlaces/detalles/permisos no se inventan ni se dan por publicables.
6. **Objetos:** propia/de integrante/vinculada/externa son relaciones acreditables, no ownership por proximidad; Labs enlaza objetos sin duplicar fichas. Uso distinto de madurez; licencia distinta de acceso; autores/remitentes/editores distintos; trabajo no equivale a paper revisado.
7. **Readiness:**20 filas para10 páginas/tipos cubren capas editoriales y handoffs. Requisitos definidos no certifican ejecución,datos o eficacia AEO/GEO. HT1–HT4 y medición/gobernanza mantienen responsable,momento y verificación posterior.
8. **Pendientes:** datos requeridos/permisos bloquean unidad/claim/acción afectada; opcionales pueden omitirse; decidir tratamiento de vacíos antes de cerrar E2. URLs,UI y comprobaciones técnicas posteriores no bloquean aprobación de dirección.

La lectura editorial conjunta de E1 contrasta presentación,puente SEO/IA,arquitectura,recorridos y decisiones. Las tablas son documentales,no componentes UI; el documento propone estructura y condiciones,sin copy completo E2 ni información confidencial.

## Resultado de comprobaciones

- `python -B content/internal/03-estrategia/revision-e1-v2.2/validar.py /tmp/opencode/e1-v22-baseline.json`: **OK**.52 nombres/órdenes de sección idénticos entre Estrategia y E1,59 en snapshot v2.1;8 páginas/2 tipos;15 personas únicas;48 preguntas evaluadas una vez;13 clusters/69 expresiones;10 páginas/tipos con CTA y20 filas readiness.153 enlaces locales/anclas y91 tablas con columnas válidas. El baseline temporal es opcional: sin argumento, el script reproduce los controles duraderos.
- `python -B content/internal/02-research/seo-rebuild-2026-11-05/validar.py`: **OK**, parámetros, países, cobertura, procedencia, faltantes y conteos originales preservados.
- `python -B content/internal/02-research/preguntas-2026-11-05/validar.py`: **OK**,48 preguntas/13 clusters/790 observaciones, métricas por país y nulls,10 capturas pagadas,checksums y650 créditos históricos intactos. No se ejecuta `compilar.py` ni se cambia el corte de investigación.
- `python -B .opencode/skills/web-content-design/scripts/check_package.py`: **OK**,frontmatter,28 Markdown,enlaces locales,runtime y estructura de evals; no evalúa comportamiento ni modifica el skill.
- `sha256sum -c SHA256SUMS` en `content/archive/v1-2026-10`: **16 originales OK**. Los3 snapshots de v2.1/B2/Estrategia coinciden con sus checksums previos a la revisión.
- **Preservación:**139 archivos fuente/documentales inmutables coinciden con `preservacion.json`,incluyendo brief/B0/B1,arquitectura,decisiones heredadas,archivo y evidencia SEO/preguntas. El contraste adicional contra todos los hashes del inicio (incluidos entornos) solo encuentra los9 documentos activos autorizados modificados; ningún original eliminado. Nuevos archivos:feedback,QA/manifiesto y snapshots internos.
- **Git:** revisión del diff global y del delta específico contra snapshots/baseline, sin atribuir cambios previos a esta tarea. `git diff --check`:OK; whitespace de nuevos Markdown comprobado por script. Sin staging,commit,push,código o configuración modificados.
- **Revisión editorial:** lectura íntegra de v2.1 antes de cambios y de v2.2 completa al terminar; comparación con estrategia por función/campos, no solo títulos. La presentación,puente SEO/IA,Empresas,Equipo y cierres conservan propósito,voz y condiciones. No se usa una pregunta externa para justificar una oferta o un resultado propio.
- **Consumo:**ninguna llamada OpenSEO/Planner/web nueva,0 créditos adicionales. Se mantienen las rondas296/1.671/650 y su último saldo histórico7.170,sin afirmar reconsulta.

**Conclusión:** E1 v2.2 completo para revisión y aprobación humana; no contenido publicable ni operación validada. Gate B aprobado no aprueba E1. No E2 generado.
