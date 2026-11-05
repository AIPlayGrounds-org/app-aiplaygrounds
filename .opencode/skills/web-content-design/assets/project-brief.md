# Especificación canónica para preparar el brief

Este archivo es la especificación canónica para construir el brief adecuado a cada proyecto. **No es una plantilla fija que deba rellenarse completamente en todos los casos; no es un formulario para enviar al cliente.** La salida es un brief estructurado, breve, editable y proporcional; se compone solo de los bloques útiles:

Composición posible, usando solo lo sustentado por los materiales:

- `BASE COMÚN`
- `BASE COMÚN + FORMATO`
- `BASE COMÚN + TIPO`
- `BASE COMÚN + FORMATO + TIPO`
- `BASE COMÚN + FORMATO + TIPO + COMPLEMENTO(S) JUSTIFICADOS`

No crear plantillas alternativas por industria o formato. No usar O1–O7/C1–C7 para preguntar o clasificar durante la preparación: el brief recoge información; el análisis B0 y la clasificación O/C ocurren después en el workflow principal.

## Modo de preparación

Actívalo cuando se pida crear/preparar/generar el brief del proyecto, estructurar notas de discovery o convertir notas, transcript o documentos aportados en brief. Distingue primero solicitud genérica de creación, fuentes de discovery indicadas y consulta de ejemplo:

- **Solicitud genérica de creación:** si el usuario pide crear/preparar/generar el brief y no indica explícitamente que deben usarse notas/documentos, interprétala como **plantilla vacía de discovery**. No explores el repositorio para encontrar material, no hagas Glob/listados de archivos ni uses como fuentes README, LICENSE, código, configuración, documentación técnica u otros archivos solo porque estén en el workspace. Aplica el preflight bloqueante de abajo; no es B0, Gate A ni una etapa formal.
- **Estructurar materiales aportados:** usa solo materiales adjuntos o fuentes que el usuario indique o pida explícitamente revisar para el brief. Lee únicamente esos materiales; amplía a todo el proyecto/repositorio solo si el usuario solicita expresamente usarlo como fuente. No impongas el preflight: conserva evidencia, procedencia, contradicciones e incertidumbres, y no inventes formato ni tipo ausentes.
- **Ejemplo/consulta de campos:** si solo se pide mostrar cómo sería, dar un ejemplo o enumerar campos, responde en conversación; no crees archivo salvo que también se solicite producir el brief del proyecto.

Cuando el encargo sea producir el brief del proyecto, el entregable principal es un archivo Markdown real en el proyecto: `content/internal/01-brief-diagnostico/brief.md` por defecto para proyectos nuevos. Reconoce `content/brief.md` como ruta legacy; si ya existe, inspecciónala y conserva su estado antes de migrar, sin crear una segunda fuente activa. Crea los directorios necesarios. Si el usuario indica otra ruta, úsala. No sobrescribas un archivo existente sin petición explícita de reemplazar/regenerar; informa que existe y pregunta si desea reemplazarlo, actualizarlo o indicar otra ruta.

Compón el Markdown completo en el archivo. Después confirma brevemente la ruta, formato y módulos; no reproduzcas todo el contenido en chat por defecto. Si faltan precondiciones de plantilla vacía, pregunta y detente antes de comprobar/crear el archivo. No inicies diagnóstico B0, estrategia, research, clusters, Keyword Map, clasificación O/C, arquitectura ni Entregable 1.

Para una plantilla vacía, produce en el archivo Markdown limpio con los campos pertinentes y espacio para completarlos, solo después de satisfacer el preflight. Para notas o documentos, sintetiza en el archivo sin ocultar contradicciones, no rellenes vacíos y no conviertas declaraciones en hechos verificados.

### Preflight obligatorio: plantilla vacía

En el flujo comercial de una plantilla vacía, el formato contratado y el tipo o tipos incluidos en el alcance son precondiciones ya definidas antes del brief; no son datos que se descubran durante él. Usa datos explícitos en el mensaje o en fuentes de discovery que el usuario haya indicado para esta tarea. La disponibilidad de archivos en el workspace/repo no equivale a que el usuario los haya aportado, y nunca justifica omitir preguntas de preflight. No vuelvas a preguntar lo que sí esté explícito en fuentes autorizadas.

1. El formato solo puede ser **One Page** o **Multipágina**. No ofrezcas estado pendiente, «Otro» ni una tercera opción.
2. Debe conocerse el tipo o tipos contratados, usando la taxonomía canónica vigente de los módulos siguientes. Admite `Otro` cuando una capacidad contratada no encaje correctamente, y varios tipos cuando el alcance realmente los combine.
3. Si faltan ambos, pregunta formato (opciones: One Page / Multipágina) y tipo(s) en una sola intervención breve. Si falta solo formato, pregunta únicamente formato. Si falta solo tipo, pregunta únicamente tipo(s) con la taxonomía disponible. En todos esos casos detente: no crees todavía el archivo ni despliegues una plantilla universal.
4. Con ambas precondiciones explícitas, compón el brief adaptativo, crea `content/internal/01-brief-diagnostico/` si hace falta y guarda el Markdown completo en `content/internal/01-brief-diagnostico/brief.md` (o ruta indicada), sujeto a la protección de archivo existente. Detente: no inicia B0 ni fases posteriores. Confirma ruta, formato y módulos brevemente.

## Composición

Para plantillas vacías, incluye solo el modificador del formato confirmado en el preflight; la falta de formato bloquea su generación. Para briefs de notas/documentos, selecciona el modificador solo cuando esté confirmado por el alcance, petición o materiales. Si falta en estos últimos, no infieras One Page o Multipágina por industria, tamaño del negocio, cantidad de ofertas ni otros indicios; omite el modificador y registra formato **PENDIENTE** si es material.

Para plantillas vacías, selecciona únicamente tipo(s) confirmados como parte real del alcance; si falta el tipo, pregunta antes de generar. Para notas/documentos, no infieras Corporativa/Servicios, Ecommerce, Formación, Directorio, Comunidad o Publicación por sector, nombre de empresa o actividad aislada. Por ejemplo, que una empresa venda productos no demuestra que el sitio tenga ecommerce; que una organización imparta talleres no demuestra que el sitio sea de formación. Si no está claro, omítelo y registra **PENDIENTE** si es material. La taxonomía canónica incluye Corporativa / servicios, Ecommerce, Formación, Directorio, Comunidad / participación y Publicación / conocimiento; admite `Otro` para capacidades contratadas que no encajen. No dividas ni fusiones categorías por esta regla.

Normalmente basta un tipo principal y, cuando aporte información material distinta, un complemento. Añade más módulos solo si existen capacidades claramente distintas incluidas en el alcance que requieren datos específicos; no cargues módulos completos por una relación secundaria ni hiperclasifiques. Omite completamente formatos y tipos no seleccionados y campos irrelevantes. **No reducir el método: reducir la cantidad de campos.** El brief de una One Page sencilla puede ocupar pocas secciones; la complejidad real puede justificar más detalle.

### Base común — seleccionar campos útiles de estas áreas

1. **Encargo:** alcance contratado y límites si ya están aprobados; producto/formato pedido; propósito del brief.
2. **Organización / negocio / oferta:** identidad disponible, líneas y ofertas relevantes.
3. **Público y necesidad:** públicos pertinentes, necesidades/problemas expresados y diferencias relevantes.
4. **Objetivo de la web:** resultado que el negocio espera y resultado útil para la persona, solo cuando consten.
5. **Acciones reales del sitio:** acciones/capacidades conocidas y qué ocurre después; marcar lo no confirmado.
6. **Evidencia / claims:** pruebas, activos, declaraciones y permisos de publicación pertinentes.
7. **Marca, restricciones y pendientes:** guía o materiales aportados, límites aprobados, contradicciones y datos faltantes materiales.
8. **Fuentes:** fuentes de afirmaciones materiales, si se conocen.

No fuerces las ocho áreas como secciones separadas: combina u omite lo que no aporte información al caso.

Preserva, donde sea material y aplicable, los estados **HECHO DOCUMENTADO / INFERENCIA / PROPUESTA / APROBADO / PENDIENTE**. Añade procedencia y visibilidad pública/interna cuando cambien la interpretación o publicación; fecha/vigencia cuando afecte la decisión. No repitas metadatos por campo si no añaden valor. Una declaración del cliente puede registrarse como hecho de que fue declarada, no como verificación independiente de su contenido.

El wording del brief es información fuente y contexto, no copy aprobado. **APROBADO** indica que la información, oferta, condición o decisión está aprobada; no obliga a conservar sus palabras exactas. En estrategia y redacción posterior se puede reorganizar, sintetizar y reescribir para audiencia, intención, arquitectura y dirección editorial aprobadas, preservando significado, hechos, condiciones, restricciones, claims permitidos y decisiones. Solo preserva una frase literalmente cuando el usuario la marque explícitamente como texto literal aprobado o pida inequívocamente conservar ese wording; esta marca restringe la redacción, no crea un estado nuevo. La instrucción literal aplica únicamente a la frase y alcance indicados, no al resto del brief.

### Modificador de formato — incluir solo si está confirmado

Si no está confirmado, omite esta sección modular; usa la Base común y registra formato como PENDIENTE si es material. No elijas entre One Page y multipágina por inferencia.

#### One Page

Añade solo lo útil para identificar:

- oferta o prioridad principal y público prioritario;
- CTA principal y destino/función, si están definidos;
- ofertas secundarias que deban aparecer;
- elementos ya incluidos obligatoriamente en el alcance;
- restricciones propias de la página única;
- contenido existente que deba conservarse.

No pidas sitemap multipágina, jerarquía de URLs, relaciones entre páginas ni ownership de páginas. La skill resolverá la estructura después.

#### Multipágina

Añade solo lo útil para identificar:

- líneas de negocio, familias, áreas u ofertas incluidas;
- relaciones conocidas entre líneas, servicios, productos o programas;
- públicos diferenciados, cuando existan;
- páginas o áreas obligatorias ya pactadas;
- contenido existente que deba conservarse;
- acciones distintas por línea/página, si ya están definidas.

No diseñes el sitemap ni resuelvas arquitectura dentro del brief.

### Modificador de tipo — incluir solo los módulos sustentados

Un sector, nombre u oferta aislada no basta para inferir el tipo del sitio. Incluye el módulo cuando los materiales confirmen que la oferta/capacidad forma parte real del proyecto. Omite el tipo si no está claro y registra PENDIENTE cuando sea material. Usa normalmente un tipo principal y como máximo los complementos que aporten datos materiales distintos; más de uno puede ser válido si cada capacidad está confirmada y requiere información propia, sin duplicar preguntas ni desplegar cuestionarios completos.

#### Corporativa / servicios

Usa solo los campos pertinentes: servicios reales; alcance, inclusiones y exclusiones; proceso y entregables reales; casos/evidencia; canal comercial; qué ocurre después del contacto si se conoce.

#### Ecommerce

Incluye solo información disponible o campos pendientes relevantes: categorías/productos, variantes, precio/moneda, stock/disponibilidad, envío, pago, cambios/devoluciones, soporte/postventa y capacidades reales de carrito/checkout. No asumir que esas capacidades existen por ser ecommerce.

#### Formación

Incluye solo lo que aplique: áreas formativas, programas/cursos, modalidad, duración, requisitos, docentes, certificación, fechas y precio. Distingue estados reales: aviso/waitlist, postulación/admisión, inscripción y matrícula/pago. No inferir un estado a partir de otro.

#### Directorio

Usa solo lo pertinente: universo incluido y criterios de inclusión, categorías/especialidades, geografía, campos de ficha, filtros realmente disponibles, procedencia/actualización de datos y contacto/destino. No convertir filtros en páginas.

#### Comunidad / participación

Solo si realmente aplica: quién participa y propósito, actividades, normas/moderación, incorporación/acceso, canales y qué ocurre después de solicitar participar.

#### Publicación / conocimiento

Solo si realmente aplica: tipos de contenido, taxonomía existente, autoría, fuentes, vigencia/actualización y relaciones conocidas entre contenidos.

## Ensambles orientativos

- One Page de consultoría: `Base común + One Page + Servicios + Corporativa opcional`.
- Academia multipágina: `Base común + Multipágina + Formación`.
- Ecommerce: `Base común + Multipágina + Ecommerce`.
- Directorio: `Base común + Multipágina + Directorio`.

Son ejemplos de selección de módulos, no plantillas ni cuestionarios que haya que reproducir literalmente. Si falta evidencia de formato o tipo, omite ese modificador en vez de usar el ejemplo para inferirlo.

## Salida del brief preparado

Guarda un documento cómodo de leer y editar en el archivo de destino. Omite secciones irrelevantes, conserva contradicciones y estados, y no rellena vacíos ni resuelve estrategia. Al final, incluye `## Pendientes materiales` solo si falta información que podría cambiar oferta, público, CTA, condición, funcionalidad, evidencia, restricción o arquitectura futura. No añadas listas burocráticas de completitud. En conversación, confirma creación y ruta sin duplicar el brief completo.

Cuando termine la preparación, detente. El análisis crítico y B0 solo comienzan si el usuario solicita después iniciar el workflow Web Content Design.
