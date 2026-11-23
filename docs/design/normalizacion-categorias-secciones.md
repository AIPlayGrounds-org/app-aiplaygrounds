# AI PlayGrounds · Normalización de categorías de secciones

**Nota E222-EM:** las filas de Empresas pertenecen a la exploración histórica. La [composición implementada](../implementation/empresas.md) reemplaza esas clasificaciones para esta ruta.

**Propuesta para revisión.** La categoría indica **dónde buscar**; la función editorial indica **qué debe resolver** la referencia. El [inventario](inventario-secciones.md) y el [catálogo de 26 variantes](catalogo-familias-secciones.md) siguen siendo las fuentes para el alcance, las condiciones y los patrones previos. Este documento no los sustituye ni altera el sitio.

## A. Matriz de categorías entre bibliotecas

Consulta de catálogos públicos: **20 de noviembre de 2026**. Se revisaron [Landingfolio][lf], [Brixies][bx], [Frameblox][fr] y [Flowbase][fl]. En Frameblox el índice general no mostró todas las categorías en su navegación textual: se localizaron rutas en el [sitemap oficial](https://www.frameblox.com/sitemap.xml) y se comprobaron en las páginas públicas. Para Brixies se enlazan los filtros de la edición AutomaticCSS que ofrece el propio catálogo. En Landingfolio se usó **Library**, no su catálogo separado **Components**. No se accedió a material de pago. Un enlace verificado acredita la categoría pública, no que todos sus ejemplos sean gratis.

**✓** = equivalente útil para la categoría normalizada; **~** = categoría real pero solo relacionada; **NV** = no se verificó una categoría adecuada en el catálogo consultado. Solo **✓** cuenta para A (3–4 bibliotecas), B (2), C (1) o D (0). Una página con título generado pero sin componentes —por ejemplo, [Comparison en Landingfolio](https://www.landingfolio.com/library/comparison)— no se cuenta como colección útil verificada. Los nombres enlazados preservan los rótulos oficiales, omitiendo prefijos descriptivos como «Framer» y el sufijo «Components» de los H1 de Frameblox.

| Categoría normalizada | Landingfolio (LF) | Brixies (BX) | Frameblox (FR) | Flowbase (FL) | Equivalentes | Observación |
|---|---|---|---|---|---:|---|
| Hero | ✓ [Hero][lf-hero] | ✓ [Hero Sections][bx-hero] | ✓ [Hero][fr-hero] | ✓ [Header][fl-header] | 4 · A | Flowbase separa Header de Navigation; su [Arcana Header 05](https://www.flowbase.co/components/arcana-header-05) se describe como *hero header*. |
| Page Header | ✓ [Page Header][lf-page] | ~ [Intro Sections][bx-intro] | ✓ [Header][fr-header] | ~ [Header][fl-header] | 2 · B | Apertura de interior o ficha, no menú global. FR distingue Header de Hero y Navigation; muchos Header son más grandes de lo que necesita una ficha. En FL se usa aquí como referencia, no como categoría separada. |
| Content | ✓ [Content][lf-content] | ✓ [Content Sections][bx-content] | ~ [About][fr-about], [Blog][fr-blog] | ✓ [Content][fl-content] | 3 · A | About se centra en presentación; Blog es contenido de publicación. Ninguno acredita una categoría general Content en FR. |
| Features | ✓ [Feature][lf-feature] | ✓ [Feature Sections][bx-feature] | ✓ [Features][fr-feature] | ✓ [Feature][fl-feature] | 4 · A | En marketing suele presentar beneficios; en AI PlayGrounds solo se toma la composición modular para los campos institucionales. |
| Stats / Metrics | ✓ [Stats][lf-stats] | ~ [Timeline Sections][bx-timeline] | ✓ [Metrics][fr-metrics] | ~ [Timeline][fl-timeline] | 2 · B | Una cronología ordena hitos, no jerarquiza cifras. No se verificó categoría dedicada Stats/Metrics en BX o FL. |
| Events | ~ [Program][lf-program] | ✓ [Event Sections][bx-event], [Single Event Sections][bx-single-event] | ✓ [Event][fr-event] | ~ [Timeline][fl-timeline] | 2 · B | FR incluye listados y CMS para eventos; BX distingue un evento de una colección. LF no mostró entradas en la ruta Events; FL no verificó Event/Events. |
| Call to Action | ✓ [Call To Action][lf-cta] | ✓ [CTA Sections][bx-cta] | ✓ [Call to Action][fr-cta] | ✓ [CTA][fl-cta] | 4 · A | Un CTA de sección no es todo enlace contextual. En FL la categoría también incluye piezas pequeñas. |
| Contact | ✓ [Contact][lf-contact] | ✓ [Contact Sections][bx-contact] | ✓ [Contact][fr-contact] | ✓ [Contact][fl-contact] | 4 · A | Buscar por formulario de consulta, no por mapas o datos de contacto; se conserva un solo formulario para dos vías. |
| Product Listings | ✓ [Products][lf-products] | ✓ [Products Sections][bx-products] | ~ [Shop][fr-shop], [Portfolio][fr-portfolio] | ~ [Ecommerce][fl-ecommerce], [Portfolio][fl-portfolio] | 2 · B | FR/FL ofrecen estructuras afines dentro de categorías de tienda o portafolio más amplias. Las cuadrículas comerciales sirven de referencia, no autorizan precio, compra ni un inventario nuevo. |
| Filters | ✓ [Filters][lf-filters] | ✓ [Category Filters][bx-filters] | ~ [Blog][fr-blog] | NV | 2 · B | BX cubre un subconjunto de filtros por categoría; FR menciona filtrado en Blog, pero no se verificó un catálogo autónomo Filters. No presupone buscador ni facetas para Investigación. |
| Research Listings | ~ [Blog List][lf-blog-list] | ~ [Blog Sections][bx-blog] | ~ [Blog][fr-blog], [CMS][fr-cms] | ~ [Blog][fl-blog] | 0 · D | Afinidad de formato: entradas con resumen y metadatos. Un original de investigación no es necesariamente un post, y CMS no es un tipo de sección específico. |
| Comparison | ~ [Table Stacks][lf-tables], [Pricing][lf-pricing] | ~ [Pricing Sections][bx-pricing] | ~ [Pricing][fr-pricing] | ~ [Table][fl-table] | 0 · D | Table admite comparaciones y Pricing presta criterios alineados, pero no equivalen a una categoría verificada de comparación de enfoques. No usar una matriz de precios como mandato. |
| Team | ✓ [Team][lf-team] | ✓ [Team Sections][bx-team] | ✓ [Team][fr-team] | ✓ [Team][fl-team] | 4 · A | Buscar agrupaciones de personas y roles que funcionen sin retratos; no es un organigrama ni exige páginas de perfil. |
| Navigation | ✓ [Navigation][lf-nav] | ✓ [Headers][bx-nav] | ✓ [Navigation][fr-nav] | ✓ [Navigation][fl-nav] | 4 · A | En BX el encabezado global se busca en Headers. En FR y FL no confundir con Header. |
| Footer | ✓ [Footer][lf-footer] | ✓ [Footers][bx-footer] | ✓ [Footer][fr-footer] | ✓ [Footer][fl-footer] | 4 · A | Los enlaces esenciales y la identidad importan más que newsletter, columnas o ilustración. |

## B. Taxonomía normalizada propuesta

Las bibliotecas equivalentes de cada fila se indican en A y se resumen en D. Se proponen **13 categorías con equivalencia directa en al menos dos bibliotecas** y **2 excepciones** registradas por función. No se necesita ninguna categoría de prioridad C.

| Categoría | Definición operativa y criterio de selección |
|---|---|
| Hero | Apertura protagonista de marca o iniciativa. Usar donde el mensaje de entrada necesita más peso visual que un título de página. |
| Page Header | Título y contexto para entrar a una interior o identificar una entidad. Distinguir apertura editorial y cabecera de ficha con retorno. |
| Content | Explicación, lectura de detalle, relación o datos de apoyo. Un enlace contextual no convierte a la sección en CTA; los metadatos son un subtipo, no otra categoría comercial. |
| Features | Unidades comparables que explican los cuatro campos del sitio. La categoría comercial ayuda a encontrar módulos; no cambia los campos en beneficios, servicios ni ofertas. |
| Stats / Metrics | Cifras que organizan la lectura porque resumen escala. Reservar para el destacado de Inicio con periodo, unidad y atribución visibles. |
| Events | Histórico de encuentros o un antecedente formativo individual. Distinguir listado atribuido y ficha-resumen histórica dentro de la página; ninguno implica inscripción. |
| Call to Action | Sección cuya tarea principal es elegir o ejecutar una acción. Separar cierre institucional, varios destinos explicados y acceso a originales/uso con condiciones. |
| Contact | Captura de una consulta cuando se cumplan sus condiciones operativas. Selección y estados pertenecen a un mismo formulario. |
| Product Listings | Entradas de productos e iniciativas para evaluar utilidad, procedencia, estado y acceso; la cuadrícula es una opción, no un requisito. |
| Filters | Controles para explorar un conjunto real, solo si su tamaño y taxonomía los justifican. El listado sigue siendo otra unidad. |
| Research Listings | Excepción: recorrido por trabajos originales mediante pregunta, autoría, procedencia y acceso a ficha. |
| Comparison | Excepción: contraste simultáneo entre las líneas de Academy con criterios compartidos. |
| Team | Personas y aportes documentados, agrupados por funciones y con permisos; no obliga a usar fotos ni a duplicar a nadie. |
| Navigation | Cabecera global para orientación y acceso estable a las rutas; menú móvil del mismo recorrido. |
| Footer | Pie global que recupera destinos y cierra la página. |

## C. Mapeo de las 50 unidades

Las frases entre comillas son **términos de exploración manual**, no nombres oficiales ni consultas cuyo resultado se garantice. Abre la categoría enlazada de A y usa el término como filtro si existe o como criterio de lectura de ejemplos. **~** marca una alternativa relacionada; **NV** indica que es preferible cambiar de biblioteca. `B2`, `B4` y `E2` de Equipo siguen **en conciliación**, no se restituyen como bloques aprobados.

| ID | Página | Nombre de sección | Categoría / subtipo funcional | Función editorial | Variante previa | Landingfolio | Brixies | Frameblox | Flowbase |
|---|---|---|---|---|---|---|---|---|---|
| I1 | Inicio | Presentación institucional | Hero · marca ilustrada | Reconocer la organización y elegir una primera ruta. | HERO-1 | Hero: «illustrated hero, two CTAs» | Hero Sections: «full-width image» | Hero: «hero with background image» | Header: «illustrated hero, dual actions» |
| I2 | Inicio | Propósito y comunidad | Content · propósito y enlaces | Explicar quién impulsa el trabajo y cómo conocerlo. | EDIT-1 | Content: «mission statement» | Content Sections: «split editorial text» | ~ About: «mission statement, text» | Content: «split text, contextual links» |
| I3 | Inicio | Cuatro verticales | Features · cuadrícula ilustrada de ámbitos | Distinguir cuatro campos institucionales, no ofertas. | ARE-1 | Feature: «four-column feature grid» | Feature Sections: «four illustrated cards» | Features: «feature card grid» | Feature: «illustrated feature grid» |
| I4 | Inicio | Actividad y trabajo | Stats / Metrics · cifra protagonista con hitos | Acreditar trayectoria de un vistazo. | EVID-1 | Stats: «lead statistic with supporting figures» | ~ Timeline Sections: «milestones with numbers» | Metrics: «large figure, supporting metrics» | ~ Timeline: «milestones with metrics» |
| I5 | Inicio | Iniciativas y oportunidades | Call to Action · tres destinos explicados | Elegir recorrido por interés. | RUTA-1 | Call To Action: «multiple pathways» | CTA Sections: «CTA cards, three options» | Call to Action: «multi-card CTA» | CTA: «multiple destinations» |
| I8 | Inicio | Acércate a AI PlayGrounds | Call to Action · cierre institucional | Cerrar con dos próximos pasos de distinta prioridad. | RUTA-2 | Call To Action: «closing CTA, two actions» | CTA Sections: «illustrated closing CTA» | Call to Action: «primary and secondary actions» | CTA: «illustrated closing banner» |
| F1 | Formación | AI Academy y punto de partida | Hero · iniciativa formativa | Situar la iniciativa y a quién le resulta pertinente. | HERO-1 | Hero: «education hero, no enrollment» | Hero Sections: «training hero, text and image» | Hero: «academy, editorial visual» | Header: «education hero, text and image» |
| F3 | Formación | Líneas de aprendizaje | Comparison · dos enfoques, criterios alineados | Distinguir dos enfoques independientes, no niveles ni pasos. | COMP-1 | ~ Table Stacks: «two-option comparison» | ~ Pricing Sections: «side-by-side comparison, no prices» | ~ Pricing: «aligned criteria, two columns» | ~ Table: «responsive comparison matrix» |
| F4 | Formación | Oferta y condiciones actuales | Events · antecedente formativo individual | Mostrar un antecedente y evitar confundirlo con una oferta abierta. | EVID-3 | ~ Program: «past bootcamp, no enrollment» | Single Event Sections: «past workshop, date and details» | Event: «past workshop, date and details» | ~ Timeline: «single historical milestone» |
| F6 | Formación | Formación para equipos | Content · explicación y enlace a Empresas | Derivar la necesidad de un equipo sin prometer una oferta cerrada. | RUTA-3 | Content: «short text with link» | Content Sections: «contextual text link» | ~ About: «short introduction, text link» | Content: «short editorial section» |
| F5 | Formación | Estado y siguiente paso | Call to Action · cierre sin inscripción | Dar continuidad útil sin recurrir a inscripción. | RUTA-2 | Call To Action: «compact next steps» | CTA Sections: «two next steps, no signup» | Call to Action: «compact two-link CTA» | CTA: «compact action banner» |
| EM1 | Empresas | AI PlayGrounds para organizaciones | Page Header · introducción institucional | Situar una posible relación institucional. | HERO-2 | Page Header: «business introduction» | ~ Intro Sections: «organization intro» | Header: «text-led business header» | ~ Header: «minimal business header» |
| EM2 | Empresas | Cuatro verticales y ámbitos de aplicación | Features · ámbitos explicados | Orientar una necesidad sin anunciar cuatro servicios. | ARE-1 | Feature: «four capabilities, text-led» | Feature Sections: «four areas with descriptions» | Features: «feature grid, text-first» | Feature: «four-column capabilities» |
| EM3 | Empresas | Capacidades y experiencia acreditadas | Events · relación de hitos atribuida | Sustentar experiencia comunitaria y formativa, no casos de implementación. | EVID-2 | ~ Program: «activity archive, date and organizer»; [Stats][lf-stats] para cifras | Event Sections: «past events, organizer and date» | Event: «event archive, dates» | ~ Timeline: «dated organizational milestones» |
| EM4 | Empresas | Productos, iniciativas y oportunidades | Content · explicación y enlace a Labs | Llevar al lugar donde se explica ese trabajo. | RUTA-3 | Content: «short overview with link» | Content Sections: «short project introduction» | ~ About: «work overview, text link» | Content: «short editorial, inline link» |
| EM5 | Empresas | AI Academy para equipos | Content · formación potencial y puente a consulta | Explicar el alcance y derivar el interés al canal correcto. | RUTA-3 | Content: «training overview with next step» | Content Sections: «editorial text with optional action» | ~ About: «training introduction, link» | Content: «text with supporting link» |
| EM6 | Empresas | Conversemos sobre tu contexto | Contact · dos motivos y un formulario | Recibir una consulta de alianza o necesidad comercial cuando sea viable. | FORM-1 | Contact: «inquiry form, reason select» | Contact Sections: «split contact form, inquiry type» | Contact: «contact form with topic selector» | Contact: «inquiry form, validation states» |
| C1 | Comunidad | Propósito y participación | Page Header · apertura comunitaria | Explicar de qué trata la comunidad y orientar el ingreso. | HERO-2 | Page Header: «community introduction» | ~ Intro Sections: «community welcome» | Header: «community page introduction» | ~ Header: «community header, optional action» |
| C3 | Comunidad | Actividades y encuentros | Events · archivo con originales | Recorrer experiencias pasadas con fecha, rol y fuente. | EVID-2 | ~ Program: «dated workshop list» | Event Sections: «past event list, original links» | Event: «event archive, date and venue» | ~ Timeline: «event history, dates and links» |
| C4 | Comunidad | Vías y condiciones de participación | Content · condiciones y distinciones | Aclarar qué significa participar. | EDIT-1 | Content: «participation guidelines, short prose» | Content Sections: «heading with short paragraphs» | ~ About: «community explanatory text» | Content: «stacked text sections» |
| C6 | Comunidad | Acceso a comunidad general | Call to Action · acción externa condicionada | Facilitar acceso directo sin formulario ni admisión. | RUTA-4 | Call To Action: «single external action» | CTA Sections: «one-button CTA with helper text» | Call to Action: «single action banner» | CTA: «single CTA, external destination» |
| C7 | Comunidad | Interés en colaborar | Content · puente informativo a Labs | Acercar al trabajo temprano sin anunciar reclutamiento. | RUTA-3 | Content: «short related section, text link» | Content Sections: «contextual link block» | ~ About: «related work, text link» | Content: «short copy, inline link» |
| B1 | AI Labs | AI Labs | Page Header · introducción de directorio | Explicar la colección aun sin registros. | HERO-2 | Page Header: «directory introduction» | ~ Intro Sections: «catalogue intro, text-first» | Header: «directory header, short intro» | ~ Header: «minimal text-led header» |
| B2 | AI Labs | Qué se explora y cómo se relaciona | Content · marco de iniciativas, en conciliación | Delimitar el trabajo temprano y explicar sus vínculos. | EDIT-1 | Content: «project scope, contextual links» | Content Sections: «editorial context, links» | ~ About: «what we explore, scope» | Content: «short explanatory layout» |
| B3 | AI Labs | Iniciativas y productos tempranos | Product Listings · entradas con estado y acceso | Permitir evaluar entradas reales y llegar al recurso o ficha acreditados. | CAT-1 | Products: «product directory, metadata cards» | Products Sections: «product archive, status and link» | ~ Shop / Portfolio: «product grid without cart» | ~ Ecommerce / Portfolio: «project cards, status and access» |
| B4 | AI Labs | Productos e Investigación | Content · distinción de colecciones, en conciliación | Derivar al recurso adecuado sin atribuir propiedad por inclusión. | RUTA-3 | Content: «two related collections» | Content Sections: «two editorial link groups» | ~ About: «related topics, text links» | Content: «two descriptions with links» |
| B5 | AI Labs | Participación y continuidad | Content · puente informativo a Comunidad | Ofrecer continuidad sin prometer acceso a proyectos. | RUTA-3 | Content: «community link, short copy» | Content Sections: «related section with link» | ~ About: «community overview, link» | Content: «contextual text link» |
| DI1 | Investigación | Universo y tipos | Page Header · introducción de colección | Explicar qué califica como trabajo de la colección. | HERO-2 | Page Header: «collection title and description» | ~ Intro Sections: «publication collection intro» | Header: «research archive introduction» | ~ Header: «publication title, minimal header» |
| DI2 | Investigación | Exploración | Filters · criterios condicionados al corpus | Acotar qué originales consultar si existen suficientes entradas. | EXPL-1 | Filters: «topic and type filters» | Category Filters: «filter bar, category tags» | ~ Blog: «publication list with filters» | NV; «topic filter bar» es solo término exploratorio, no categoría verificada |
| DI3 | Investigación | Trabajos de la colección | Research Listings · filas por pregunta y procedencia | Elegir un original con contexto suficiente. | CAT-2 | ~ Blog List: «publication list, author and date» | ~ Blog Sections: «editorial list with metadata» | ~ Blog / CMS: «CMS list, author, date, excerpt» | ~ Blog: «publication list, text-first» |
| DI4 | Investigación | Conoce AI PlayGrounds y propone un trabajo | Content · puente a Inicio, propuesta inactiva | Situar la colección sin ofrecer postulación inexistente. | RUTA-3 | Content: «context and return link» | Content Sections: «short editorial bridge» | ~ About: «institutional context, link» | Content: «short context with text link» |
| E1 | Equipo | Quiénes sostienen AI PlayGrounds | Page Header · presentación colectiva | Presentar al equipo antes de identificar a sus integrantes. | HERO-2 | Page Header: «team page introduction» | ~ Intro Sections: «team introduction» | Header: «minimal team page header» | ~ Header: «team introduction, text-only» |
| E2 | Equipo | Cómo nos organizamos para trabajar | Content · grupos y responsabilidades, en conciliación | Explicar relaciones de trabajo sin duplicar personas ni exponer gobierno interno. | ARE-2 | Content: «grouped responsibilities» | Content Sections: «role groups, text-first» | ~ About: «organization structure, grouped text» | Content: «grouped editorial headings» |
| E3 | Equipo | Personas y aportes | Team · directorio agrupado | Reconocer a las personas y su aportación acreditada. | PERF-1 | Team: «role-based team, no photos» | Team Sections: «grouped team, name and role» | Team: «team directory, group headings» | Team: «compact people list, optional portraits» |
| E4 | Equipo | Participa y conoce nuestro trabajo | Call to Action · cierre institucional | Cerrar con dos formas de conocer el trabajo. | RUTA-2 | Call To Action: «two-action closing section» | CTA Sections: «two-button closing section» | Call to Action: «community CTA with secondary link» | CTA: «two-action closing banner» |
| P1 | Ficha de producto | Identificación | Page Header · ficha con retorno | Reconocer el objeto sin confundirlo con el directorio. | HERO-3 | Page Header: «product title, back link» | ~ Intro Sections: «detail title and summary» | Header: «detail header, back link» | ~ Header: «minimal product detail header» |
| P2 | Ficha de producto | Problema, público y límites | Content · explicación con límites asociados | Decidir si el recurso sirve para una necesidad concreta. | EDIT-3 | Content: «use case and limitations» | Content Sections: «detail copy, constraints callout» | ~ Blog: «detail text with caveat» | Content: «detail prose and callout» |
| P3 | Ficha de producto | Clasificación y relación con IA | Content · atributos explicados | Distinguir qué hace la IA y en qué contexto. | META-1 | Content: «labeled attributes with explanation» | Content Sections: «label and value text» | ~ About: «facts block with labels» | Content: «attribute list with description» |
| P5 | Ficha de producto | Creación y procedencia | Content · atribución separada de relación | Atribuir sin inferir propiedad o aval. | META-2 | Content: «creator and provenance metadata» | Content Sections: «credits and source, labeled groups» | ~ Blog: «author metadata, separate credits» | Content: «credits and relationship labels» |
| P6 | Ficha de producto | Estado y uso | Content · estado y verificación | Distinguir madurez, disponibilidad y uso documentado. | META-1 | Content: «status and verification date» | Content Sections: «status metadata with explanation» | ~ About: «key facts, dates and status» | Content: «label and value, optional note» |
| P7 | Ficha de producto | Acceso, licencia y fuentes | Call to Action · acceso con condiciones | Ir al destino correcto conociendo sus condiciones. | FUENTE-1 | Call To Action: «access link with terms» | CTA Sections: «single action with conditions» | Call to Action: «external product link with notes» | CTA: «compact action with supporting text» |
| P9 | Ficha de producto | Relaciones y continuidad | Call to Action · destinos relacionados y retorno | Seguir explorando sin fabricar relaciones. | RUTA-1 | Call To Action: «related destinations, link group» | CTA Sections: «compact link tiles» | Call to Action: «related links, understated» | CTA: «multiple links, compact» |
| R1 | Ficha de investigación | Identificación y pregunta | Page Header · ficha con pregunta y retorno | Reconocer qué examina el original. | HERO-3 | Page Header: «long title, subtitle and back link» | ~ Intro Sections: «publication title and summary» | Header: «long title, publication detail» | ~ Header: «text-only title and subtitle» |
| R2 | Ficha de investigación | Autoría, procedencia y estado | Content · atribución y versión | Atribuir y situar la naturaleza del trabajo sin sugerir certificación. | META-2 | Content: «author, provenance and version metadata» | Content Sections: «labeled publication metadata» | ~ Blog: «byline and publication date» | Content: «structured credits and version» |
| R4 | Ficha de investigación | Enfoque | Content · lectura metódica | Explicar qué se hizo sin añadir un método no documentado. | EDIT-2 | Content: «long-form text, subheadings»; [Article][lf-article] como apoyo | Content Sections: «long editorial body, subheadings» | ~ Blog: «article body, content hierarchy» | Content: «long-form editorial section» |
| R5 | Ficha de investigación | Resultados y límites | Content · hallazgos y cautelas asociados | Facilitar una interpretación proporcionada de la evidencia. | EDIT-3 | Content: «findings with limitations callout» | Content Sections: «prose and inline caution» | ~ Blog: «article callout, contextual caveat» | Content: «body with inline note» |
| R6 | Ficha de investigación | Recursos originales | Call to Action · original y recursos secundarios | Facilitar consulta del original y sus materiales. | FUENTE-1 | Call To Action: «primary source, supporting links» | CTA Sections: «one main resource, secondary links» | Call to Action: «external source and resources» | CTA: «compact resource CTA» |
| R7 | Ficha de investigación | Relaciones y continuidad | Call to Action · destinos relacionados y retorno | Dar contexto posterior sin desplazar el acceso al original. | RUTA-1 | Call To Action: «related reading, back links» | CTA Sections: «related destinations, minimal» | Call to Action: «compact related links» | CTA: «secondary links group» |
| G-HDR | Sitio | Cabecera y navegación principal | Navigation · menú global adaptable | Orientar y cambiar de página desde cualquier contexto. | GLOBAL-1 | Navigation: «responsive site nav» | Headers: «logo, menu, mobile» | Navigation: «responsive navbar» | Navigation: «site navigation, mobile menu» |
| G-FTR | Sitio | Pie de página | Footer · enlaces agrupados | Recuperar destinos y cerrar la página. | GLOBAL-2 | Footer: «grouped site links» | Footers: «multi-column navigation» | Footer: «brand and link groups» | Footer: «navigation columns, no newsletter» |

## D. Resumen cuantitativo y reutilización

Las variantes siguientes son **bases a explorar**, no componentes ni una recomendación de construirlas ya. Cada ID está asignado a una sola base primaria. Se cuentan 48 secciones editoriales y dos globales, **50 unidades**. Bibliotecas compatibles significa equivalencia directa; entre paréntesis se indican referencias relacionadas cuando no hay equivalente.

| Categoría | Número de secciones | Variantes sugeridas | Bibliotecas compatibles |
|---|---:|---:|---|
| Hero | 2 | 1 | LF, BX, FR, FL |
| Page Header | 7 | 2 | LF, FR |
| Content | 18 | 3 | LF, BX, FL |
| Features | 2 | 1 | LF, BX, FR, FL |
| Stats / Metrics | 1 | 1 | LF, FR |
| Events | 3 | 2 | BX, FR |
| Call to Action | 9 | 3 | LF, BX, FR, FL |
| Contact | 1 | 1 | LF, BX, FR, FL |
| Product Listings | 1 | 1 | LF, BX |
| Filters | 1 | 1 | LF, BX |
| Research Listings | 1 | 1 | Ninguna directa (LF, BX, FR, FL como analogías) |
| Comparison | 1 | 1 | Ninguna directa (LF, BX, FR, FL como analogías) |
| Team | 1 | 1 | LF, BX, FR, FL |
| Navigation | 1 | 1 | LF, BX, FR, FL |
| Footer | 1 | 1 | LF, BX, FR, FL |
| **Total · 15 categorías** | **50** | **21** | **13 con equivalencia directa; 2 excepciones** |

### Qué compartir y qué mantener específico

| Categoría | Diseños base y cobertura |
|---|---|
| Hero | **Apertura con protagonismo visual** (I1, F1). Misma jerarquía; cada apertura conserva su mensaje y su arte. |
| Page Header | **Introducción editorial compacta** (EM1, C1, B1, DI1, E1); **identificación de entidad con retorno** (P1, R1). No convertir ambas en otro hero de campaña. |
| Content | **Bloque editorial breve con enlace opcional** (I2, F6, EM4, EM5, C4, C7, B2, B4, B5, DI4); **lectura extensa con notas o límites cuando proceda** (P2, R4, R5); **datos y grupos con etiquetas claras** (E2, P3, P5, P6, R2). E2 conserva agrupaciones propias si se confirma; no hereda el panel de una ficha como presentación obligatoria. |
| Features | **Módulos de ámbitos equivalentes** (I3, EM2). Compartir estructura sin repetir los textos ni el énfasis visual. |
| Stats / Metrics | **Cifra principal con evidencia contextual** (I4). Reutilizar datos y atributos de eventos con Empresas/Comunidad, no el escaparate de cifras. |
| Events | **Listado histórico atribuido** (EM3, C3); **antecedente único y su estado** (F4). En C3 pesan los enlaces a originales; en EM3, el papel de la organización. |
| Call to Action | **Destinos explicados** (I5, P9, R7), con versión sobria en fichas; **cierre adaptable** (I8, F5, C6, E4), con una o dos acciones y el destino externo explícito en C6; **acceso a fuente o uso con condiciones** (P7, R6). No repetir la escala del cierre de Inicio en el interior de una ficha o página. |
| Contact | **Un formulario con selección revisable** (EM6). Reutilizar el mismo destino desde EM5 sin contarlo como otra sección. |
| Product Listings | **Resumen repetible de entidad** (B3). Puede compartir atributos y enlaces con DI3, sin imponer el mismo diseño. |
| Filters | **Exploración condicionada a datos** (DI2). Mantenerla junto a DI3 si hacen falta controles; sin estados interactivos inventados. |
| Research Listings | **Listado editorial de originales** (DI3). Priorizar pregunta y atribución por encima de la imagen o el formato de tarjeta comercial. |
| Comparison | **Comparación simultánea por criterio** (F3). En pantallas estrechas conservar la asociación entre criterio y enfoque sin convertirlos en pasos. |
| Team | **Directorio por funciones** (E3). Foto opcional, grupos desiguales y una persona con más de una responsabilidad. |
| Navigation | **Cabecera global adaptable** (G-HDR), reutilizada en el sitio. |
| Footer | **Pie agrupado** (G-FTR), reutilizado en el sitio. |

**11 de las 21 bases** cubren más de un ID; las otras 10 tienen un solo ID, incluidas las dos piezas globales que se comparten entre rutas. No es un cálculo de componentes. El inventario anterior mantiene las **26 variantes** como referencia. Cinco dejan de requerir exploración visual independiente:

| Variante previa | Nueva lectura |
|---|---|
| `RUTA-3` · puente contextual | Se absorbe en el bloque editorial breve de Content: tener enlace no obliga a una composición distinta de `EDIT-1`. |
| `EDIT-3` · afirmación con límites | Comparte base de lectura con `EDIT-2`; conservar la asociación afirmación/límite como regla editorial dentro de esa base. |
| `ARE-2` · responsabilidades agrupadas | Si se confirma el ID `E2`, usa la base de grupos y etiquetas con una jerarquía propia. La agrupación no exige otro diseño independiente de entrada. |
| `META-2` · atribución y vínculo | Comparte base de etiquetas con `META-1`; la separación de autoría y vínculo sigue siendo obligatoria para `P5`/`R2`. |
| `RUTA-4` · acceso externo | Comparte la base de cierre de `RUTA-2`; el destino WhatsApp y su disponibilidad son estados y requisitos, no una nueva plantilla visual. |

## E. Casos especiales y límites de verificación

- **Comparison (F3, D).** Las cuatro bibliotecas ofrecen analogías de tabla o precios, pero no se verificó una categoría dedicada y poblada de comparación en los catálogos consultados. La comprobación de rutas dio resultados vacíos en Landingfolio, no encontró ese filtro en el menú de Brixies y las rutas consultadas en Frameblox y Flowbase llevaron a página no encontrada. La ausencia de verificación no prueba ausencia en todos sus productos. Se conserva la etiqueta porque hay una comparación editorial real.
- **Research Listings (DI3, D).** Los catálogos verificados ofrecen Blog, Blog List y CMS, no un listado de trabajos originales con la semántica de Investigación. Conviene tomar densidad, jerarquía y atributos de esos ejemplos sin llamarlo «Blog» ni presuponer artículos académicos o revisión por pares. `DI2` es un filtro condicional aparte; no se verificó un catálogo Filters en Flowbase ni una categoría autónoma Filters en Frameblox.
- **Events, Stats / Metrics, Page Header y Product Listings (B).** Tienen dos fuentes directas cada una. Añadir Timeline como equivalencia de Stats, Hero como sustituto de una ficha o CMS como catálogo de productos inflaría la coincidencia sin facilitar la búsqueda. `F4` sigue siendo histórico aunque sus referencias de Event/Program incluyan inscripciones. `B3` conserva el estado y acceso de cada objeto sin patrones de compra.
- **Fichas y globales.** `P7` y `R6` comparten categoría de CTA, pero los recursos y las condiciones deben quedar junto al acceso. Header de página no sustituye Navigation. No se añaden categorías de FAQ, Pricing o Timeline como destinos principales sin necesidades editoriales que las justifiquen.

## F. Recomendación final

Adoptar **categoría comercial + subtipo funcional**, con el ID editorial siempre visible. Para buscar, empezar con los enlaces **✓** de A y usar los términos de C para acotar. Recurrir a **~** cuando las opciones directas no resuelvan el subtipo o se trate de una excepción; anotar qué se toma prestado de la referencia y qué no aplica. Por ejemplo: `I3 → Features → cuatro campos ilustrados`; `R6 → Call to Action → original comprobado y recursos`.

En una fase posterior, empezar por las bases compartidas de apertura, Content, Features y CTA. Revisar `I4`, `F3` y `EM6` por separado: la evidencia atribuida, la comparación y la consulta única no se validan solo por parecido visual. Mantener B2/B4/E2 en conciliación y aguardar datos y permisos antes de concretar filtros, listados, fichas o perfiles. La propuesta termina aquí; no selecciona diseños finales ni autoriza implementarlos.

[lf]: https://www.landingfolio.com/library
[bx]: https://brixies.co/library/
[fr]: https://www.frameblox.com/components/all
[fl]: https://www.flowbase.co/components
[lf-hero]: https://www.landingfolio.com/library/hero
[lf-page]: https://www.landingfolio.com/library/page-header
[lf-content]: https://www.landingfolio.com/library/content
[lf-feature]: https://www.landingfolio.com/library/feature
[lf-stats]: https://www.landingfolio.com/library/stats
[lf-program]: https://www.landingfolio.com/library/program
[lf-cta]: https://www.landingfolio.com/library/call-to-action
[lf-contact]: https://www.landingfolio.com/library/contact
[lf-products]: https://www.landingfolio.com/library/products
[lf-filters]: https://www.landingfolio.com/library/filters
[lf-blog-list]: https://www.landingfolio.com/library/blog-list
[lf-tables]: https://www.landingfolio.com/library/table-stacks
[lf-pricing]: https://www.landingfolio.com/library/pricing
[lf-team]: https://www.landingfolio.com/library/team
[lf-nav]: https://www.landingfolio.com/library/navigation
[lf-footer]: https://www.landingfolio.com/library/footer
[lf-article]: https://www.landingfolio.com/library/article
[bx-hero]: https://brixies.co/library/?_tax=hero-sections
[bx-intro]: https://brixies.co/library/?_tax=intro-sections
[bx-content]: https://brixies.co/library/?_tax=content-sections
[bx-feature]: https://brixies.co/library/?_tax=feature-sections
[bx-timeline]: https://brixies.co/library/?_tax=timeline-sections
[bx-event]: https://brixies.co/library/?_tax=event-sections
[bx-single-event]: https://brixies.co/library/?_tax=single-event-sections
[bx-cta]: https://brixies.co/library/?_tax=cta-sections
[bx-contact]: https://brixies.co/library/?_tax=contact-sections
[bx-products]: https://brixies.co/library/?_tax=products-sections
[bx-filters]: https://brixies.co/library/?_tax=category-filters
[bx-blog]: https://brixies.co/library/?_tax=blog-sections
[bx-pricing]: https://brixies.co/library/?_tax=pricing-sections
[bx-team]: https://brixies.co/library/?_tax=team-sections
[bx-nav]: https://brixies.co/library/?_tax=headers
[bx-footer]: https://brixies.co/library/?_tax=footers
[fr-hero]: https://www.frameblox.com/components/hero
[fr-header]: https://www.frameblox.com/components/header
[fr-about]: https://www.frameblox.com/components/about
[fr-blog]: https://www.frameblox.com/components/blog
[fr-feature]: https://www.frameblox.com/components/features
[fr-metrics]: https://www.frameblox.com/components/metrics
[fr-event]: https://www.frameblox.com/components/event
[fr-cta]: https://www.frameblox.com/components/cta
[fr-contact]: https://www.frameblox.com/components/contact
[fr-shop]: https://www.frameblox.com/components/shop
[fr-portfolio]: https://www.frameblox.com/components/portfolio
[fr-cms]: https://www.frameblox.com/components/cms
[fr-pricing]: https://www.frameblox.com/components/pricing
[fr-team]: https://www.frameblox.com/components/team
[fr-nav]: https://www.frameblox.com/components/navigation
[fr-footer]: https://www.frameblox.com/components/footer
[fl-header]: https://www.flowbase.co/components/categories/header
[fl-content]: https://www.flowbase.co/components/categories/content
[fl-feature]: https://www.flowbase.co/components/categories/feature
[fl-timeline]: https://www.flowbase.co/components/categories/timeline
[fl-cta]: https://www.flowbase.co/components/categories/cta
[fl-contact]: https://www.flowbase.co/components/categories/contact
[fl-ecommerce]: https://www.flowbase.co/components/categories/ecommerce
[fl-portfolio]: https://www.flowbase.co/components/categories/portfolio
[fl-blog]: https://www.flowbase.co/components/categories/blog
[fl-table]: https://www.flowbase.co/components/categories/table
[fl-team]: https://www.flowbase.co/components/categories/team
[fl-nav]: https://www.flowbase.co/components/categories/navigation
[fl-footer]: https://www.flowbase.co/components/categories/footer
