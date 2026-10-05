# Estrategia de Contenido — documento interno

**Ruta canónica del proyecto:** `content/internal/03-estrategia/estrategia-contenido.md`
**Estado:** interno; fuente operativa para construir E1 y base estratégica de E2.
**Contrato de requisitos:** SEO/AEO/GEO v1; fecha/estado de completado parcial o completo. En proyectos anteriores sin versión, reconocer estructura y registrar solo ampliación material de la etapa activa.

## Propósito y regla de uso

Este documento registra qué estrategia se está construyendo y cómo se traduce a la web. Puede ser extenso y más detallado que E1; no está optimizado para cliente. Debe contener suficiente información sustantiva para producir todas las secciones materiales de E1 sin inventar ni tomar decisiones nuevas durante su generación.

La estrategia es fuente operativa. El Dossier `content/internal/03-estrategia/dossier-evidencia-estrategica.md` explica por qué sostenemos las decisiones, qué evidencia existe y su procedencia; no sustituye ni duplica innecesariamente este documento. No copies aquí queries, URLs, matrices de research o trazabilidad detallada que ya vivan en el Dossier, Research o Keyword Map: enlaza o referencia el registro pertinente.

Antes de generar E1, responde: **¿Puedo producir todas las secciones sustantivas de E1 usando exclusivamente fuentes internas vigentes?** Si no, no generes E1. Completa esta estrategia, actualiza el Dossier cuando cambie trazabilidad, o registra la dependencia/decisión humana pendiente y solicita su resolución.

E1 es un artefacto derivado, no una fuente primaria de edición: `E1 ⊆ estado interno`. Puede omitir, resumir, reformular y reorganizar información interna; no puede estrenar audiencias, páginas, secciones, objetivos, recorridos, CTA, mensajes, dependencias, dirección editorial, campos de fichas ni condiciones materiales.

## 1. Estado y decisiones de partida

- Alcance contratado y estado del proyecto:
- Decisiones humanas vigentes y alcance de cada una:
- Dependencias entre decisiones:
- Límites de alcance, capacidad, evidencia, privacidad y publicación:
- Fuentes internas vigentes y discrepancias que requieren precedencia:

## 2. Resultado que debe conseguir la web

- Resultado de negocio:
- Resultados esperados para visitantes:
- Condiciones relevantes, límites y criterios de éxito observables:

## 3. Audiencias y necesidades

Por audiencia:

| Audiencia | Contexto/conocimiento previo | Necesidades y tareas | Preguntas | Objeciones | Resultado útil esperado | Siguiente acción o comprensión |
|---|---|---|---|---|---|---|

## 4. Estrategia de mensajes

- Mensaje principal:
- Mensajes secundarios:
- Diferenciadores sustentados:
- Claims permitidos y evidencia utilizable:
- Límites, condiciones y claims no utilizables:
- Objeciones que la web debe resolver:

## 5. Modelo de contenido del sitio

| Página/tipo | Responsabilidad | Audiencia/necesidad | Relación con otras páginas | Ownership material | Estado/dependencia |
|---|---|---|---|---|---|

### Modelos de campos para tipos repetibles

Cuando haya fichas/directorios/catálogos/cursos/servicios/publicaciones/casos/eventos, definir una vez por tipo; excepciones materiales se registran por entrada. No presupone CMS ni se exige para páginas estáticas. Vincular campos a secciones de §6 y registros de §8/Dossier, sin copiar valores/claims en varias fuentes.

| Tipo | Campo | Significado / formato editorial | Obligatorio o condición de uso | Sección responsable | Fuente / claim referenciado | Relación / estado / dependencia |
|---|---|---|---|---|---|---|

Ejemplos orientativos, seleccionar solo lo pertinente:
- Producto: nombre, descripción, problema, público, categoría, relación con IA si real, creador, estado, uso, acceso, licencia, recursos y relaciones documentadas.
- Investigación: título, pregunta, autores, afiliación, tipo, fecha y significado de esa fecha, estado, enfoque, resultados, límites, recursos y relaciones documentadas. No todo proyecto tiene resultados ni es artículo académico.

## 6. Arquitectura completa por página

Describir cada página o tipo de página. Hero se incluye como sección independiente solo si tiene una función propia distinta de la primera sección de desarrollo. No duplicar continuidad en esta tabla cuando se expresa mejor en recorridos.

| Orden | Sección | Objetivo | Qué comunica o resuelve | Contenido/elementos esperados | Evidencia o condición | Dependencia material |
|---|---|---|---|---|---|---|

## 7. Recorridos principales

| Intención | Punto de entrada | Recorrido entre páginas/secciones | Resultado | CTA o siguiente paso real |
|---|---|---|---|---|

## 8. SEO editorial y visibilidad en IA — requisitos de descubrimiento y comprensión

Aplicar [`../references/seo-ai-editorial.md`](../references/seo-ai-editorial.md). Registrar consecuencias operativas materiales, no solo menciones de IA. Tablas siguientes son estructuras reusables: combinar o referenciar secciones existentes en proyectos simples, conservando campos pertinentes. NO APLICA requiere motivo en readiness; no desplegar tablas vacías sin función. Los detalles de contraste, queries y fuentes/procedencia permanecen en Dossier/Research/Keyword Map. Toda consecuencia para E1 se incorpora aquí o en su sección operativa antes de proyectarla.

### 8.1 Intención, cluster/topic y responsabilidad

| Necesidad / intención | Referencia a cluster/topic en Keyword Map (o motivo de no aplicar) | Página responsable principal | Consecuencia en sección/campo | Estado |
|---|---|---|---|---|

No copiar métricas ni keywords completas. Topic solo aclara dominio semántico cuando cluster no basta; no nuevo mapa. Sin research ejecutado, atribuir origen a brief/decisión humana, no a señales supuestas.

### 8.2 Modelo mínimo de entidades

| Entidad / identificador interno si útil | Tipo editorial | Nombre canónico / alias sustentado | Qué necesita entenderse | Página responsable | Relaciones materiales (referencia) | Fuente/evidencia referenciada | Estado |
|---|---|---|---|---|---|---|---|

Solo objetos reales confirmados o representación propuesta identificada; no inventar entidades. Nombres consistentes desambiguarán objetos sin repetirlos por cuota. No exige página propia por entidad.

### 8.3 Answer coverage / preguntas con ownership

| Pregunta/necesidad (referencia a audiencia de §3) | Audiencia | Intención / cluster si existe | Entidad si material | Página responsable | Sección/bloque/campo responsable | Claim/evidencia/condición necesaria referenciada | Estado |
|---|---|---|---|---|---|---|---|

Amplía §3 por referencia, no repite su inventario. Ownership definido no significa respuesta publicable si su condición está pendiente. No exige FAQ ni headings interrogativos. Las necesidades principales deben tener respuesta prevista verificable en arquitectura y luego respuesta real en E2.

### 8.4 Relaciones semánticas y aplicación

| Origen | Relación | Destino | Clase (conceptual / documental / entre entidades / link interno) | Base / evidencia referenciada | Estado | Aplicación en arquitectura, navegación, ficha/copy o Schema candidato |
|---|---|---|---|---|---|---|

Solo documentadas, inferibles con base en estructura aprobada o PROPUESTA pendiente. Un link no demuestra relación factual. Reflejar consecuencias materiales en §5/§6 y E1 sin duplicar registro.

### 8.5 Claims y modelos de contenido — consecuencias

Referenciar modelos de campos de §5 y registro de claims materiales del Dossier; indicar qué dato/claim necesita cada respuesta/campo, condiciones publicables y qué se excluye o bloquea. No duplicar fuentes/vigencia completas de claims. Campos inexistentes o pendientes no se inventan para Schema ni para completar ficha.

### 8.6 Structured data candidato — handoff

| Página/tipo | Entidad principal / objeto real | Structured data candidato y motivo | Propiedades sustentadas → campos/claims visibles | Pendientes / propiedades no afirmables | Handoff técnico / responsable / validación |
|---|---|---|---|---|---|

Candidato no es implementación ni elegibilidad validada. Selección debe corresponder a objeto real y documentación vigente; registrar evidencia en Dossier cuando incida. No JSON-LD ni garantías de ranking/citación.

### 8.7 Handoff técnico de discovery

| Requisito / página o tipo afectado | Motivo | Responsable | Momento | Estado de implementación | Criterio de verificación posterior |
|---|---|---|---|---|---|

Considerar proporcionalmente crawl/index, canonicals, sitemap, rendering/JavaScript crítico, URLs estables/redirects, noindex/robots/headers/CDN, structured data y política de AI crawlers según la referencia. Identificar requisito por verificar, sin afirmar auditoría o defecto observado. Política de entrenamiento corresponde al propietario; separar búsqueda/recuperación de entrenamiento cuando documentación oficial lo permita. No configurar controles ni consolas.

### 8.8 Handoff de medición posterior

| Objetivo / página / cluster-topic | Métrica/señal | Fuente posible | Disponibilidad (MÉTRICA DISPONIBLE / PROXY / NO OBSERVABLE / PENDIENTE) | Responsable | Momento / periodo comparable | Limitación de cobertura/atribución |
|---|---|---|---|---|---|---|

Plan, no datos medidos ni implementación analítica. Definir SEO y señales AEO/GEO solo donde existan fuentes responsables; no equiparar plataformas. Mapear señales de plataforma a mapa propio sin sustituir estrategia. Supuestos y documentación decisional permanecen en Dossier; no requerir monitoring contratado.

### 8.9 Gobernanza de datos mutables

| Dato / claim referenciado | Dónde aparece (página/campo y menciones dependientes) | Fuente referenciada | Responsable | Frecuencia/evento de revisión |
|---|---|---|---|---|

Solo información mutable material; lo estable no requiere calendario. Vigencia factual completa vive en Dossier. Cambios revisan contenido y propiedades candidatas dependientes, sin prometer recrawl inmediato.

### 8.10 AEO/GEO readiness

Obligatorio antes de cerrar Estrategia/E1; no gate humano nuevo. Por página material o plantilla (excepciones por registro): necesidad/intención, cluster/topic, entidad, preguntas, bloque/campo, claims/evidencia, relaciones, modelo repetible, structured data candidato, crawl/index/discovery, medición y gobernanza mutable. Mantener separados estado factual/aprobación y estado de esta comprobación.

| Página/tipo | Capa | Resultado (APLICA — resuelto / APLICA — pendiente / NO APLICA — motivo) | Registro / motivo / eslabón de la cadena | Dependencia / responsable / momento |
|---|---|---|---|---|

«Resuelto» significa requisito determinado, no ejecución ni resultado probado; handoff completo puede resolver definición dejando implementación pendiente. Falta de base/decisión no es NO APLICA. Reconstruir cadenas materiales por referencias; si no puede hacerse, no declarar AEO/GEO cubierto. Distinguir pendiente estratégico que bloquea E1 de validación técnica/medición posteriores y de claim que bloquea publicación. Proyectar a E1 necesidad → decisión → aplicación, no esta matriz interna.

## 9. Dirección editorial

- Estado: dirección editorial aprobada / propuesta / pendiente.
- Voz, tono por contexto, tecnicidad, densidad y formalidad:
- Recursos y límites:
- Ejemplos pertinentes:
- Decisiones vigentes y alcance:

La dirección editorial vigente completa vive aquí. Si no existe una dirección editorial aprobada, mantener dos alternativas internas justificadas; E1 muestra exactamente dos direcciones cliente y 5–6 muestras comparables por dirección. Si existe una dirección editorial aprobada, conservarla y no reabrir alternativas aunque también haya una guía de marca.

## 10. Dependencias y pendientes

| Dato, aprobación, inventario, permiso o decisión pendiente | Responsable/fuente | Impacto en estrategia/E1/E2 | Bloquea qué y cuándo | Estado |
|---|---|---|---|---|

## 11. Correspondencia con E1

### Proyección interna → cliente

- Esta estrategia aporta: entendimiento, públicos, propuesta, páginas, secciones, recorridos, mensajes y dirección editorial.
- El Dossier aporta respaldo de claims, límites, procedencia, riesgos y evidencia relevante para justificar decisiones.
- `content/internal/04-feedback/` aporta estado de decisiones humanas, ACCEPT / ADAPT / ESCALATE y pendientes.
- Todo lo anterior se proyecta a `content/entregables-cliente/01-direccion-contenido-estructura/direccion-contenido-estructura-web.md`.

### Qué permanece interno

Mantener fuera de E1 la metodología, detalle de research, queries/URLs, matrices completas, IDs y trazabilidad no necesaria para comprender/aprobar, riesgos internos no pertinentes al cliente y alternativas no seleccionadas. Solo proyectar el sustento mínimo y los límites materiales que permitan una decisión informada.

## 12. Comprobación antes de E1

- [ ] Todas las secciones sustantivas de E1 pueden producirse desde fuentes internas vigentes.
- [ ] Ninguna decisión necesaria se deja para inventar o decidir durante la redacción de E1.
- [ ] Audiencias, páginas, secciones, objetivos, recorridos, CTA, mensajes, dependencias y dirección editorial están definidos o señalados como pendientes.
- [ ] Cada decisión material puede rastrearse a su estado interno y fuente/decisión humana.
- [ ] Los pendientes que bloquean aprobación se distinguen de datos que pueden completarse después.
- [ ] AEO/GEO readiness registrada por página material: cadena reconstruible, pendientes y NO APLICA justificados; handoffs definidos sin afirmar ejecución.
- [ ] Preguntas tienen sección/campo responsable; entidades, relaciones y modelos repetibles materiales están operativos, con claims referenciados y gobernanza proporcional.
- [ ] La proyección E1 prevista permite mostrar consecuencias arquitectónicas materiales con lenguaje cliente y límites, sin matrices/logs internos ni promesas de resultados.
