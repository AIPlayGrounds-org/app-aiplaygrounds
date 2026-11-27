---
name: AI PlayGrounds
description: Sistema visual web actual, observado en Astro y en las referencias locales de Inicio.
colors:
  brand-black: "#000000"
  brand-white: "#ffffff"
  halo: "#8e8eff"
  mint: "#49ff9e"
  lime: "#ceff5f"
  web-background: "#f5f3ec"
  web-surface: "#eceae2"
  web-elevated: "#faf9f4"
  web-text: "#191a18"
  web-border: "#cecec4"
  editorial-background: "#fbf6ec"
  editorial-surface: "#fbf3e6"
  editorial-card: "#fff9f0"
typography:
  display:
    fontFamily: Space Grotesk, Arial, sans-serif
    fontSize: "clamp(2.5rem, 1.5rem + 4vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: Space Grotesk, Arial, sans-serif
    fontSize: "clamp(1.75rem, 1.4rem + 1.6vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  title:
    fontFamily: Space Grotesk, Arial, sans-serif
    fontSize: "clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  body:
    fontFamily: Inter Tight, Arial, sans-serif
    fontSize: "clamp(1rem, 0.97rem + 0.15vw, 1.125rem)"
    lineHeight: 1.5
  mono:
    fontFamily: Geist Mono, monospace
rounded:
  sm: "0.25rem"
  xl: "0.75rem"
  interior: "0.4rem"
spacing:
  section-space: "clamp(3.5rem, 7vw, 7rem)"
  interior-section: "clamp(2rem, 4vw, 4rem)"
components:
  button-primary:
    backgroundColor: "{colors.brand-black}"
    textColor: "{colors.brand-white}"
    rounded: "{rounded.sm}"
    height: "2.75rem"
    padding: "0 1.25rem"
  button-outline:
    backgroundColor: "{colors.web-background}"
    textColor: "{colors.web-text}"
    rounded: "{rounded.sm}"
    height: "2.75rem"
    padding: "0 1.25rem"
  elevated-card:
    backgroundColor: "{colors.web-elevated}"
    textColor: "{colors.web-text}"
    rounded: "{rounded.xl}"
    padding: "1.25rem"
  interior-card:
    backgroundColor: "{colors.editorial-surface}"
    textColor: "{colors.web-text}"
    rounded: "{rounded.interior}"
    padding: "clamp(1.5rem, 3vw, 2.5rem)"
  contact-input:
    backgroundColor: "{colors.editorial-background}"
    textColor: "{colors.web-text}"
    rounded: "{rounded.sm}"
    padding: "0.75rem"
---

# Design System: AI PlayGrounds

## Overview

**Creative North Star: "Paisaje de aprendizaje"**

El sitio se lee como una publicación clara, cálida y modular. En Inicio, el paisaje marca la entrada y el cierre, y las ilustraciones conectan las verticales sin sustituir sus explicaciones. En las interiores, la jerarquía tipográfica y el espacio organizan la lectura sin exigir una escena por sección.

**Key Characteristics:**

- Superficies cálidas con capas discretas.
- Composición editorial; módulos donde el contenido se puede comparar o agrupar.
- Componentes sobrios y legibles; la ilustración expresa el carácter donde ya forma parte del sitio.

El catálogo de desarrollo `/design-system/` documenta los componentes y muestra los tokens efectivos. Los ejemplos usan los mismos componentes Astro que el sitio. Las exploraciones históricas permanecen como referencias de composición.

## Colors

Negro y blanco sostienen las acciones principales. Halo, Menta y Lima conservan sus nombres de marca. Los tokens web definen el papel cálido, superficies, texto y bordes; Inicio y las interiores observadas añaden superficies editoriales locales más cálidas. No son dos paletas intercambiables: comprobar qué capa gobierna la superficie que se está documentando.

[`tokens.css`](src/styles/tokens.css) es la fuente de los valores primitivos (marca, extensión web, escalas), sus roles semánticos y las medidas compartidas de controles y tarjetas. [`theme.css`](src/styles/theme.css) solo asigna estos roles al contrato de daisyUI; `--line` es el color de borde y `--border` es el grosor que espera la librería. Los alcances `data-theme="light|dark"` siguen siendo propios de AI PlayGrounds. Solo el catálogo permite alternarlos.

**The Contextual Contrast Rule.** Evaluar el contraste sobre el fondo real; no usar Halo, Menta o Lima como texto pequeño sobre superficies claras ni depender solo del color para indicar estados.

## Typography

[`global.css`](src/styles/global.css) usa **Space Grotesk** para títulos, **Inter Tight** para cuerpo y controles y **Geist Mono** para etiquetas puntuales, como las de la trayectoria en Inicio. Los títulos globales tienen escala fluida, peso semibold y líneas compactas; varias superficies ajustan localmente la escala y el ancho del H1. El frontmatter recoge la jerarquía global, no obliga a los directorios a usar la escala del hero.

## Layout

El contenedor compartido llega a **80 rem** con márgenes laterales fluidos. Inicio alterna apertura ilustrada, bloques editoriales, módulos y evidencia. Las interiores combinan una apertura textual, contenido de lectura y rejillas cuando hay unidades comparables. La clase global de medida de lectura limita a **65 ch**; las interiores usan medidas propias según el bloque.

Las rejillas y las secciones partidas de interiores se vuelven una columna a **48 rem**; la navegación global cambia a menú compacto a **67 rem**. Inicio tiene umbrales locales para sus módulos. Son comportamientos observados y no una nueva escala universal.

## Elevation & Depth

La profundidad viene de papel, superficies, fondos de tarjeta y bordes finos. `--shadow-overlay` se usa en cajas flotantes, no en las tarjetas editoriales. La perspectiva de las escenas ilustradas añade profundidad sin alterar esa regla.

## Shapes

Botones y campos tienen esquinas pequeñas; las tarjetas interiores repiten un radio discreto. La tarjeta elevada y el cierre ilustrado tienen contornos más suaves. La modularidad no exige encerrar toda la prosa en tarjetas.

## Components

- **Botones.** [`Button`](src/components/ui/Button.astro) ofrece variantes semánticas y tamaños `xs`–`xl`. El tamaño `md` mide **2.75 rem** de alto y ajusta el relleno con icono. Usa `iconOnly` con nombre accesible y los slots `leading`/`trailing` para los demás iconos. Respeta el foco visible, la semántica de botón/enlace y los estados deshabilitado y cargando.
- **Tarjetas.** [`Card`](src/components/ui/Card.astro) separa superficie, densidad, borde e interacción. Las composiciones interiores controlan su layout. Usa `interaction="single-link"` solo cuando exista un único destino real y un `data-card-link`.
- **Etiquetas.** [`Badge`](src/components/ui/Badge.astro) comparte tamaños, contornos y estados entre `VerticalTag` y `ProductTags`; las etiquetas mantienen su texto y significado.
- **Campos.** En Empresas, etiquetas encima, borde visible, fondo cálido y foco por contorno. El aspecto deshabilitado es un estado visual; esta documentación no habilita captación.
- **Navegación.** [`SiteHeader`](src/components/site/SiteHeader.astro) muestra marca y enlaces, señala la página actual y expone un menú compacto en pantallas estrechas. El patrón observado no aprueba cambios en los destinos ni agrupaciones editoriales.
- **Cierre ilustrado.** [`ClosingCTA`](src/components/site/ClosingCTA.astro) combina texto, una o dos acciones y paisaje de apoyo. Su presencia en varias rutas no lo convierte en el acabado obligatorio para todos los cierres.
- **Hero inmersivo.** [`ImmersiveHero`](src/components/site/ImmersiveHero.astro) ocupa todo el ancho, tiene mayor altura y usa una composición visual envolvente. Se usa en Inicio, Empresas y Formación.
- **Hero de acceso.** [`CompactHero`](src/components/site/CompactHero.astro) es un banner editorial de altura reducida, alineado con `site-container` y separado del header interior. Usa un borde fino, `--editorial-radius` y un fondo ligeramente teñido según la variante, sin sombra ni divisor de ancho completo. Presenta un título y un párrafo sin acciones. Equipo (Convergencia), AI Labs (Construcción), Investigación (Exploración) y Comunidad (Conexión) conservan la geometría y las paletas del prototipo vectorial aprobado. El SVG animado se integra en el fondo: se recorta en los bordes derecho e inferior y se difumina hacia el texto. En móvil el arte se concentra en la base. Con movimiento reducido se muestra directamente el estado final.
- **Composición editorial.** `Section` y `SectionHeading` aportan contenedor y escala compartida. `InitiativeCard` y `InitiativeGrid` mantienen la composición I5 en Inicio y Empresas. `CollaborationCard` adopta el principio del cierre ilustrado: fondo, arte transparente y texto con área segura. No usa una foto rectangular.
- **CTA con formulario.** [`FormCTA`](src/components/site/FormCTA.astro) reúne título, descripción, un formulario por slot y arte opcional dentro de un solo borde y radio de CTA. El arte se ancla a su esquina sin invadir controles; en una columna aparece después del formulario. Su posición y el revelado son configurables. La lógica y los estados del formulario son independientes.
  La variante `density="compact"` de Empresas reduce el padding vertical y amplía el arte en dos columnas. El CTA estándar no cambia; el ajuste del textarea y los espacios entre campos pertenece al formulario de Empresas.
- **Movimiento.** [`src/motion/`](src/motion/) usa Anime.js v4 para entradas editoriales y de hero, ilustraciones por capas y dibujo SVG. `EditorialMotion` conserva `data-reveal` y `--editorial-delay`; todo parte visible y cancelable. `TextLink`, bordes, colores, foco y hover simple se mantienen en CSS. Consulta [Motion System](docs/implementation/motion-system.md) y `/design-system/#motion`.
- **Interacción de superficie.** [`card-interactions.css`](src/styles/card-interactions.css) define `data-card-interactive`: tarjetas y filas con una acción real usan `--interaction-accent` para el borde activo al pasar el cursor o enfocar el enlace. En tema claro es el violeta de Exploración (`#79629f`); no sustituye el negro de los CTA ni las paletas de los heroes. Las superficies con un solo destino pueden usar `data-card-hit-area` y `data-card-link`: toda la superficie activa el mismo enlace, refuerza el subrayado y anima la flecha, sin añadir otra parada de teclado. Las superficies con varios CTA pueden usar `data-surface-motion` sin ampliar la zona clicable. Se conserva el contorno individual de foco; con movimiento reducido solo queda el feedback de estado sin desplazamiento.

### Calendario de Comunidad

El índice de encuentros conserva el hero de Conexión y el marco global. «Nuestros encuentros» da paso al destacado sin selector de período. El destacado es el único bloque enmarcado: la portada autorizada va en un cuadrado a la izquierda y pasa arriba en móvil. Las miniaturas también son cuadradas y ambas variantes usan `object-fit: contain`, sin recolorear ni recortar el arte. Si no hay permiso, se omite la imagen y se reajusta la composición; no se usa una portada sustituta.

El historial funciona como índice editorial: fecha lateral, separadores finos, título, metadatos y enlace en cada fila. Los enlaces usan `TextLink`, con el mismo peso, subrayado y flecha animada que Empresas, sin cambio de color. Los controles se reordenan en pantallas estrechas sin desplazar el contenido horizontalmente. Los elementos al entrar reutilizan `EditorialMotion`; las transiciones no son necesarias para entender los estados y se omiten al pedir movimiento reducido. El cierre reutiliza `ClosingCTA`.

## Do's and Don'ts

- **Do** mantener una jerarquía legible también donde no haya ilustración.
- **Do** usar el token semántico correspondiente y comprobar su contraste bajo la superficie efectiva.
- **Do** conservar el foco visible y respetar la preferencia de movimiento reducido, como prevén los estilos compartidos.
- **Do** actualizar la galería al cambiar una variante. Consulta [AGENTS.md](AGENTS.md) y el [registro de migración](docs/implementation/design-system-migration.md).
- **Don't** extender los paisajes de Inicio a todo el catálogo por defecto ni confundir una ilustración con el logotipo.
- **Don't** convertir ejemplos, capturas históricas o variantes de exploración en reglas del sistema.
