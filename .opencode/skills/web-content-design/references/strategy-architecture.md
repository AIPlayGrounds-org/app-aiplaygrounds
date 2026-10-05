# Estrategia completa → arquitectura interna → proyección cliente

La secuencia obligatoria es `B2 + Keyword Map + O/C → estrategia-contenido.md completa → arquitectura interna completa → proyección E1`. Research y sus métodos permanecen bajo `search-research.md`; esta referencia no los rediseña.

## Estrategia de Contenido: fuente operativa

Usa [`../assets/internal-content-strategy.md`](../assets/internal-content-strategy.md) para crear/actualizar `content/internal/03-estrategia/estrategia-contenido.md`. Registra sustantivamente alcance/estado/decisiones, resultados, audiencias y necesidades, mensajes, modelo de páginas, arquitectura sección por sección, recorridos, consecuencias SEO/IA, dirección editorial y pendientes. El nivel interno puede ser mucho más detallado que E1.

La Estrategia define qué se construye y cómo se traduce a la web. El Dossier `content/internal/03-estrategia/dossier-evidencia-estrategica.md` explica por qué se sostienen decisiones y conserva evidencia, fuentes, preflight/ejecución, triangulación, contradicciones, Delta, procedencia, decisiones humanas, riesgos y trazabilidad. El Dossier no sustituye ni define por sí solo la Estrategia; no es E1 ni tercer entregable.

## Completitud antes de E1

Antes de generar E1 exige responder: **¿Puedo producir todas las secciones sustantivas de E1 usando exclusivamente fuentes internas vigentes?** Si no, no generes E1. Completa la Estrategia, actualiza el Dossier si corresponde o registra la decisión/dependencia humana pendiente. No tomes decisiones nuevas durante la generación del documento cliente.

## Arquitectura interna

La arquitectura debe responder por página/tipo: qué contiene y para qué sirve cada sección. Registra orden, objetivo, qué comunica/resuelve, contenido/elementos esperados, evidencia/condición y dependencias materiales. Define aparte los recorridos: intención, punto de entrada, trayecto y resultado/CTA. No dupliques continuidad en la tabla de arquitectura si se expresa mejor en recorridos.

Hero es una sección independiente solo cuando cumple una función propia distinta de la primera sección de desarrollo; nunca es universal. Para fichas dinámicas o páginas repetibles, especifica el tipo/plantilla, no repitas una fila por registro.

Los tipos repetibles requieren además modelo por campo (significado, condición de uso, fuente/claim, sección, relaciones y estado) en Estrategia §5. No toda página estática es un content type ni toda ficha exige URL SEO propia. La cadena necesidad/cluster → entidad/pregunta → página/bloque/campo → claim/evidencia → relación → requisito técnico → medición se reconstruye mediante registros referenciados y readiness de Estrategia §8, según [`seo-ai-editorial.md`](seo-ai-editorial.md). Preguntas no obligan a FAQ ni entidades a nuevas páginas. Completar readiness antes de cerrar Estrategia/E1, sin gate adicional.

Deriva páginas/secciones de B2, estrategia, necesidades/tareas, O/C, patrones pertinentes, capacidades reales, evidencia, condiciones y decisiones humanas. No crees páginas por keywords. Ownership, cobertura temática, relaciones, entidades/preguntas y conclusiones SEO/IA con impacto material deben incorporarse primero en Estrategia. [`seo-ai-editorial.md`](seo-ai-editorial.md) no autoriza introducir esas decisiones directamente en E1. Los patrones de [`pattern-library.md`](pattern-library.md) alimentan arquitectura interna antes de proyectar.

## Proyección unidireccional Interno → E1

E1 es un artefacto derivado, no una fuente primaria de edición: `E1 ⊆ estado interno`. No puede introducir por primera vez audiencia, página, sección, objetivo, recorrido, CTA, mensaje, dependencia, dirección editorial, campo de ficha ni condición material. Puede omitir, resumir, reformular y reorganizar el estado vigente.

- `estrategia-contenido.md` aporta entendimiento, públicos, propuesta, páginas, secciones, recorridos, mensajes y dirección editorial.
- `dossier-evidencia-estrategica.md` aporta respaldo de claims, límites, procedencia, riesgos y evidencia relevante para justificar decisiones.
- `content/internal/04-feedback/` aporta estado de decisiones humanas, ACCEPT / ADAPT / ESCALATE y pendientes.
- Todo ello se proyecta a `content/entregables-cliente/01-direccion-contenido-estructura/direccion-contenido-estructura-web.md`.

E1 presenta vista general de páginas, públicos/necesidades compactos, arquitectura por página en tabla legible por secciones, recorridos separados, dirección editorial aprobable y decisiones/pendientes. No uses la mega-celda “secciones en orden / qué resuelven” ni una cadena con flechas como representación cliente principal. Aplica la estructura completa de [`../assets/deliverable-1-direction.md`](../assets/deliverable-1-direction.md).

En E1 completo, colocar el puente SEO + IA en §4.2, después de la vista general y antes del detalle de páginas de §4.3. Mantener título de beneficio con SEO e IA o inteligencia artificial reconocibles, introducción breve, dos subbloques visibles (SEO/arquitectura de búsqueda e IA/comprensión y recuperación), tabla compacta de aplicaciones y cierre. No sustituir las explicaciones por una tabla ni mezclar ambas dimensiones en prosa indiferenciada. Desarrollar AEO y GEO por separado en su primera aparición cliente y traducirlos a decisiones reales según [`quality-and-delivery.md`](quality-and-delivery.md). Mostrar necesidad/evidencia → decisión → página/bloque/campo → beneficio sin estrenar decisiones; distinguir IA como tema del negocio de IA como dimensión de descubrimiento/comprensión. No atribuir cambios a research si provienen del brief ni filtrar readiness/queries/configuración. Handoffs técnicos/medición quedan operativos en Estrategia; E1 solo límites y dependencias necesarios para aprobar; E2 lleva notas pertinentes para implementar/verificar sin tercer entregable. Las correcciones locales y proyectos legacy preservan su alcance vigente.

Después de producir/actualizar E1, verifica: **¿Existe alguna afirmación, estructura o decisión sustantiva en E1 que no pueda rastrearse al estado interno?** Si sí, es error; no cierres E1 y corrige primero internos.

## Feedback y precedencia

Está prohibido `feedback → editar E1 → reconstruir internos`. La secuencia es `feedback → ACCEPT / ADAPT / ESCALATE → fuente interna afectada → actualizar fuente primero → actualizar trazabilidad cuando corresponda → resincronizar E1`.

Precedencia: `decisión humana posterior y explícita > estado interno aprobado vigente > B2 / decisiones humanas previas > estrategia propuesta > research / inferencias`. E1 no supera a sus fuentes internas sin aprobación humana posterior.

Al aprobar E1: registrar aprobación humana en estado interno, actualizarlo a APROBADO, verificar sincronización y conservar E1 como snapshot cliente aprobado. No copiar E1 hacia internos.

## E1 aprobado como base de E2

E2 se produce desde estado interno sincronizado, E1 aprobado, dirección editorial, datos verificados y dependencias resueltas. No cambia silenciosamente arquitectura, función de páginas, decisiones, alcance ni voz aprobada. `contenido-web.md` también es derivado, no workspace maestro. Feedback E2 actualiza primero la fuente interna pertinente y después resincroniza E2. No crear workspace interno de producción salvo necesidad real no resoluble con estrategia, E1, dirección, datos y dependencias; evitar duplicar contenido.
