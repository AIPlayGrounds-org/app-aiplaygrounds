# AI PlayGrounds · contenido web

**Versión activa: v2, iniciada el 04/11/2026. Estado: Research documentado, Gate B pendiente.** Gate A resuelto y B1 conservada. La investigación SEO actual tiene cobertura parcial: métricas reutilizadas de septiembre, sin SERP nacional nueva, KD o CPC.

El replanteamiento amplía la presentación de AI PlayGrounds: organización enfocada en IA, impulsada por una comunidad que aprende, investiga, experimenta y construye. AI Academy conserva su propósito comercial dentro de una identidad institucional más amplia. La versión anterior concentraba la prioridad comercial en formación.

## Dónde trabajar

```text
content/
  .opencode/                         # Entorno local; no mover
  internal/
    01-brief-diagnostico/
      brief.md
      diagnostico-b0.md
      diagnostico-b1.md
      decisiones-heredadas.md
      arquitectura-base.md
    registro-reorganizacion-v2.md
    02-research/
      research.md
      research-queries.md
      keyword-map.md
      keyword-observations.csv
    03-estrategia/
      dossier-evidencia-estrategica.md # Evidencia, no estrategia completa
  entregables-cliente/
    README.md                       # Sin E1/E2 activos todavía
  archive/
    v1-2026-10/
      internal/                     # 14 archivos históricos
      entregables-cliente/          # E1 v15 y E2 v4 históricos
      README.md
      SHA256SUMS
```

- [Brief activo](internal/01-brief-diagnostico/brief.md): contexto, alcance, fuentes y pendientes.
- [Diagnóstico B0 y Gate A](internal/01-brief-diagnostico/diagnostico-b0.md): snapshot de la lectura crítica presentada.
- [B1 validada](internal/01-brief-diagnostico/diagnostico-b1.md): aprobación, ocho dimensiones, síntesis y pendientes conservados.
- [Research y Gate B](internal/02-research/research.md): hallazgos, reutilización, cobertura y propuestas para revisar.
- [Keyword Map propuesto](internal/02-research/keyword-map.md): necesidades y páginas responsables, sin nuevas páginas por keyword o vertical.
- [Registro de consultas](internal/02-research/research-queries.md) y [Dossier](internal/03-estrategia/dossier-evidencia-estrategica.md): fuentes, intentos, consumo y Decision Delta.
- [Decisiones heredadas](internal/01-brief-diagnostico/decisiones-heredadas.md): qué se conserva, qué cambia y qué necesita evidencia actual.
- [Arquitectura base](internal/01-brief-diagnostico/arquitectura-base.md): ocho páginas, dos tipos, mapa y navegación recuperados.
- [Registro de reorganización](internal/registro-reorganizacion-v2.md): preservación, rutas y checks.
- [Archivo v1](archive/v1-2026-10/README.md): documentación íntegra, sin valor de aprobación automática para v2.

Se mantienen aprobados como línea base el formato multipágina, las ocho páginas y dos tipos de ficha, el mapa/navegación y la voz cercana y participativa. Se conservan los nombres de las cuatro verticales y de las dos líneas formativas, con sus funciones diferenciadas. La jerarquía de mensajes, el peso de las conversiones y el desarrollo institucional deben revisarse bajo el nuevo encargo. **Formación sigue siendo el nombre de la página; AI Academy es la identidad de la iniciativa.** Equipo tampoco se renombra.

## Flujo y límites

Brief → B0 → **Gate A resuelto** → **B1 validada** → **Research → Gate B pendiente** → B2 → Estrategia → E1 → E2. Prompt 2 autorizó esta investigación y un máximo US$2 de OpenSEO. No hubo llamadas pagadas: identidad del proyecto y costo máximo sin acreditar; Planner falló por reautenticación y websearch no devolvió resultados utilizables. Se emplearon fuentes primarias dirigidas y evidencia histórica fechada, sin inventar métricas actuales. Los Gates A/B y E1 aprobados de v1 permanecen como historia de aquella versión.

No hay B2, estrategia completa, E1 o E2 activos nuevos. Se espera decisión humana de Gate B sobre las propuestas y el tratamiento de las limitaciones cuantitativas; no se avanza por el solo encargo de investigar. Los futuros entregables se guardarán en `entregables-cliente/01-direccion-contenido-estructura/` y `entregables-cliente/02-contenido-web/`, desde internos vigentes y cuando correspondan. No se crean documentos vacíos que simulen avance.

La información interna no es copy público ni permiso de publicación. El archivo contiene contexto confidencial; no debe publicarse como parte del website.

## Entorno y rutas

`.opencode/` en la raíz contiene la skill instalada y dependencias del entorno. `content/.opencode/` contiene otro paquete local de dependencias, sin skill o automatización propia observada. Se conservan ambos, sus versiones y sus locks. No se necesitan cambios de instalación o sincronización: la skill mantiene sus rutas canónicas bajo `content/internal/` y `content/entregables-cliente/`.

Las rutas escritas dentro del archivo son citas históricas. Para resolverlas, usa el mapa de su [README](archive/v1-2026-10/README.md#resolución-de-rutas-históricas); nunca las interpretes como enlaces a la nueva versión activa.
