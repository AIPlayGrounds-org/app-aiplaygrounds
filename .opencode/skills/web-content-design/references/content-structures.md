# Estructuras semánticas de contenido

Contrato canónico para modelar secciones en Estrategia y proyectarlas a E1/E2. Complementa O/C (resultado y contexto del sitio); no es otro eje de clasificación obligatorio, biblioteca de componentes ni especificación de CMS, HTML o UI.

## Decisión proporcional por sección

Trabaja en este orden: **página → sección → función → estructura de contenido → unidad(es) → campos → copy → acción**. Es una lógica de decisión, no una ficha que deba rellenarse siempre.

1. Identifica la tarea: comprender, escanear, comparar, elegir, explorar, verificar, recorrer, decidir o actuar.
2. Si heading y cuerpo la resuelven, usa bloque editorial con apoyo/CTA opcionales. No descompongas prosa por rutina.
3. Si hay objetos equivalentes, atributos relevantes, diferencias, secuencia o interacción real, conserva esas relaciones como contenido explícito. Elige y combina las primitivas necesarias de abajo; no asignes una categoría exclusiva a cada sección.
4. Para cada unidad material determina qué representa, inventario/cantidad **solo si se conocen**, campos obligatorios/opcionales o condicionales, datos que la distinguen, relación/orden respecto a otras y acción/destino si corresponde. No inventes unidades para llenar una cantidad ni exijas CTA por unidad.
5. Registra el modelo una vez en Estrategia §5/§6; referencia campos, claims, procedencia y pendientes existentes. E1 explica la decisión estructural; E2 desarrolla el contenido. No decidas estructura por las keywords ni por el espacio de un componente imaginado.

## Primitivas componibles

| Primitiva | Relación que preserva | Información que seleccionar según la tarea |
|---|---|---|
| Bloque editorial | Una idea desarrollada | Heading, cuerpo, apoyo y acción opcionales |
| Entidad y colección | Un objeto con atributos; varios objetos equivalentes | Qué es la unidad; identidad, descripción, atributos diferenciadores, relaciones, destino y condición de publicación |
| Comparación | Alternativas sobre criterios equivalentes | Nombre, diferencia real, alcance, destinatario, condiciones y acción; precio solo cuando proceda y esté acreditado |
| Secuencia | Dependencia u orden real | Orden, nombre, acción/explicación, resultado, actor, requisito y condición de avance pertinentes |
| Atributo/valor | Datos factuales de un objeto | Label, valor, unidad, significado, condición y vigencia si material |
| Pregunta/respuesta | Duda real y su resolución | Pregunta, respuesta y condición/alcance; puede vivir dentro de otra estructura |
| Acción y estado | Intención, entrada y resultado real | Acción/destino, información solicitada, labels, condiciones previas, expectativa, confirmación/error, recuperación y siguiente paso solo confirmados |

Una entidad puede tener colecciones anidadas cuando sea necesario (p. ej. oferta → entregables), sin convertir cada frase en una unidad. Comparación, secuencia y atributo/valor pueden organizar unidades de una colección; no dupliques inventario ni valores. Una sección híbrida conserva partes y relaciones: introducción + servicios + criterios para elegir + acción, o explicación + secuencia + dudas. La jerarquía editorial no define su composición visual.

## Perfiles semánticos y restricciones

Estos perfiles seleccionan campos y controles sobre las primitivas, no crean plantillas universales ni componentes. Se pueden combinar o extender por la naturaleza del objeto, tarea, decisiones y datos disponibles; un caso nuevo no necesita una regla por industria.

| Familia / composición habitual | Campos y distinciones materiales | Control |
|---|---|---|
| Colecciones de entidades | Productos, servicios, categorías, ubicaciones, iniciativas, clientes, partners, certificaciones o proyectos: identidad, atributos y relaciones pertinentes | Identifica obligatorios, opcionales, diferencias y condiciones de publicación, también en una sola sección estática |
| Opciones comparables | Planes, modalidades, audiencias o caminos: nombre, descripción, diferencia, alcance, destinatario, condiciones, precio/CTA si aplican | Mismos criterios y significado; desconocido no equivale a no incluido. No crear diferencias artificiales |
| Procesos y secuencias | Contratación, metodología, onboarding o aplicación: orden/acción, explicación, resultado, actor y requisitos necesarios | La secuencia debe existir; no numerar una explicación para fabricar pasos |
| Funcionalidades y capacidades | Nombre, qué permite hacer, contexto de uso, beneficio/resultado, limitación, disponibilidad y relaciones | Feature = función concreta; capability = capacidad de realizar una tarea; beneficio = valor o resultado para la persona; claim = afirmación que exige respaldo. No son intercambiables ni autorizan inventar funciones o resultados |
| Oferta comercial | Público, necesidad, incluye/excluye, modalidad, entregables, condiciones, precio, moneda, periodicidad y acción pertinentes | Servicios/productos/planes/membresías reutilizan entidad + comparación cuando ayude. Precio, disponibilidad y garantías requieren respaldo; no completar por simetría |
| Entidad detallada | Producto, caso, proyecto, curso, empleo, propiedad, investigación, herramienta o ubicación: campos derivados del objeto y tarea | No imponer plantilla universal, URL propia ni resultados obligatorios |
| Personas y organizaciones | Nombre, rol, cargo, relación con la organización, especialidad, bio, afiliación, enlaces, foto y atribución según necesidad | Cargo no equivale a rol, afiliación ni relación comercial; no inferirlos por proximidad ni por un logo. Foto/uso requieren datos o permiso pertinente |
| Evidencia y confianza | Métrica/resultado, unidad, contexto, periodo, fuente, atribución, alcance, permiso y limitaciones pertinentes; testimonios conservan cita y atribución autorizadas | Logos, clientes, estudios, premios y certificaciones no son claims intercambiables. No métricas decorativas, citas inventadas ni resultados extrapolados |
| Casos de uso y problemas | Contexto, problema, usuario/necesidad, respuesta, resultado, evidencia y acción si existen | Problema → solución o audiencia → necesidad no prueba un resultado comercial; distinguir aplicación propuesta de caso probado |
| Recursos y contenido | Título, tipo, descripción, autor, fecha y significado de esa fecha, tema, formato, acción/destino | Artículos, videos, guías, documentación, descargas o repositorios comparten colección/entidad; no inventar autoría, assets ni descarga |
| Eventos | Nombre, fecha, hora/zona cuando importe, ubicación/modalidad, público, descripción, speakers, disponibilidad, precio, acción y estado pertinentes | No anunciar fecha futura, aforo, disponibilidad o inscripción sin confirmar; personas/organizaciones conservan relaciones acreditadas |
| FAQ / preguntas y respuestas | Dudas con respuesta y alcance/condición | Solo si hay tarea real de resolver dudas; no FAQ por SEO o relleno, ni accordion implícito |
| Navegación y exploración | Colección amplia, cobertura, criterios de clasificación, atributos útiles y datos de cada resultado | Definir información para explorar no implica buscador, filtros, sorting, facetas, contadores, paginación ni comportamiento interactivo; requieren necesidad acreditada y definición de producto/UI |
| Conversión e interacción | Contacto, solicitud, compra, reserva, demo, aplicación, suscripción: intención, datos mínimos, label, requisito, expectativa y siguiente paso | No diseñar un formulario si solo existe un correo; distinguir envío de aceptación, pago o reserva. Estados/mensajes solo si el sistema puede ejecutarlos |
| Estados y mensajes | Vacío, éxito, error, sin resultados, pendiente, cerrado, agotado, próximamente o no disponible: situación, significado y acción real posible | No producir estados UI por rutina; no prometer recuperación ni notificaciones inexistentes |
| Información factual estructurada | Especificaciones, requisitos, fechas, datos técnicos, ubicación, condiciones o metadatos relevantes como atributo/valor | Preservar unidades y alcance; tabla documental no prescribe tabla HTML |

## Proyección E1 y E2

### E1: dirección suficiente, no copy completo

En «Contenido / elementos clave» de la arquitectura explica, cuando sea material, función, forma comprensible, unidades/inventario conocido, información necesaria por unidad, relación entre ellas y acción esperada. No añadas seis columnas obligatorias a toda sección. Si no cabe legiblemente, añade debajo un esquema breve por sección. Ejemplo de dirección: «Servicios: cuatro servicios confirmados, cada uno con nombre, necesidad que resuelve, destinatario y enlace al detalle; criterios comunes para distinguirlos. Alcance específico pendiente por servicio». No redactes aún sus cuatro descripciones.

La decisión estructural debe existir en internos antes de E1. Un inventario o valor pendiente no borra un modelo ya validado: distinguir dato completable después de decisión que bloquea aprobación. No introducir una estructura material nueva en E2 sin el Feedback Gate existente; poblar campos previstos y ajustes editoriales menores no constituyen por sí solos una reapertura.

### E2: estructura visible en el cuerpo principal

Desarrolla cada sección aprobada en un bloque propio. Para contenido simple basta heading, texto y acción opcional. Para contenido compuesto muestra las unidades y campos con tablas documentales, listas etiquetadas, listas ordenadas o subsecciones; elige por legibilidad, longitud y tarea. No encierres toda la sección en una celda «Copy público» ni relegues unidades a notas. No conviertas todas las secciones en tablas.

Ejemplos de encabezados documentales, seleccionar/adaptar; no son componentes del website:

- Servicios: `Servicio | Qué resuelve | Para quién | Acción`.
- Proceso: `Paso | Qué ocurre | Resultado`, o lista ordenada con esos contenidos.
- Equipo: `Persona | Rol confirmado | Aporte | Bio`, o subsección por persona si la bio es extensa.
- Comparación: alternativas con los mismos criterios respaldados y sus condiciones; no rellenar huecos como exclusiones.
- Especificaciones: `Atributo | Valor | Condición`, solo columnas útiles.

Una tabla documental **no especifica UI**: no implica cards, grids, carruseles, tabs, accordions, sliders, columnas, modales ni tablas HTML. Si una UI fue aportada, registrar su procedencia/restricción por separado y ajustar contenido sin eliminar información material; una dependencia de diseño no autoriza a elegir automáticamente un patrón visual.

## Capas, faltantes y condición editorial

Mantén distinguibles:

1. **Copy público:** solo texto y datos potencialmente visibles y publicables, con condiciones/atribución que el visitante necesita.
2. **Estructura editorial:** secciones, unidades, campos, orden y relaciones; labels de trabajo no se confunden con copy final.
3. **Datos pendientes:** qué campo/unidad falta, fuente/responsable si conocido y qué bloquea; nunca texto listo para publicar.
4. **Notas editoriales:** procedencia, factualidad, permisos, riesgos y restricciones de publicación, separadas del copy. No ocultar aquí contenido principal ni quitar del copy condiciones públicas esenciales.
5. **Decisiones de UI:** fuera de alcance salvo restricciones aportadas o dependencia necesaria; no mezclar con la estructura semántica.

Ante datos incompletos conserva el modelo visible junto a su sección. Si hay datos parciales, muestra los disponibles y referencia el faltante de forma inequívoca en una zona **Datos pendientes — no publicable** asociada a la unidad/campo. Si no hay unidades identificadas, muestra un **Esquema por completar — no publicable** con campos y propósito; no fabriques nombres, cantidad ni filas ficticias. Si el bloqueo impide mostrar copy, presenta el esquema y nota de bloqueo en el cuerpo principal, además de la referencia en pendientes globales, sin duplicar un registro maestro.

No usar sistemáticamente `—`: distinguir «pendiente de confirmar», «no aplica» y ausencia opcional; no deducir ninguna de ellas del silencio. Identifica si bloquea un campo, unidad, sección, acción o publicación; no marques listo lo bloqueado. Modelo validado con datos pendientes no equivale a contenido publicable ni a aprobación humana.

## QA de estructura

- ¿La estructura responde a una tarea y es la mínima suficiente, sin aplanar ni sobreestructurar?
- ¿Se conservan unidades, campos necesarios, diferencias y relaciones/orden reales entre internos, E1 y E2? ¿Obligatorios, condicionales y excepciones están claros?
- ¿E1 permite aprobar la dirección sin copy completo y E2 revisar el contenido real en el cuerpo principal, sin abrir notas/internos?
- ¿Faltantes preservan el modelo y señalan bloqueo sin fabricar datos, cantidades, diferencias, resultados o capacidades?
- ¿Copy, estructura, pendientes, notas y restricciones UI se distinguen? ¿Tablas solo documentales, sin componentes ni comportamientos inventados?
- ¿Se mantienen procedencia, permisos, claims, vigencia, CTA/destino, accesibilidad editorial, SEO/IA y los Gates existentes? Aplicar además QA general y O/C pertinente.
