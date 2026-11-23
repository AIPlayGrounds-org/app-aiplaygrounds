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
  starwind-card:
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

Esta es una fotografía de la implementación actual, no una aprobación de las exploraciones previas ni una especificación para la futura galería.

## Colors

Negro y blanco sostienen las acciones principales. Halo, Menta y Lima conservan sus nombres de marca. Los tokens web definen el papel cálido, superficies, texto y bordes; Inicio y las interiores observadas añaden superficies editoriales locales más cálidas. No son dos paletas intercambiables: comprobar qué capa gobierna la superficie que se está documentando.

[`tokens.css`](src/styles/tokens.css) es la fuente de colores de marca y roles semánticos; las superficies editoriales se observan en [`index.astro`](src/pages/index.astro) e [`interior.css`](src/styles/interior.css). El alcance oscuro invierte las acciones principales y adapta borde, texto y estados. No implica un selector de tema del sitio.

**The Contextual Contrast Rule.** Evaluar el contraste sobre el fondo real; no usar Halo, Menta o Lima como texto pequeño sobre superficies claras ni depender solo del color para indicar estados.

## Typography

[`global.css`](src/styles/global.css) usa **Space Grotesk** para títulos, **Inter Tight** para cuerpo y controles y **Geist Mono** para etiquetas puntuales, como las de la trayectoria en Inicio. Los títulos globales tienen escala fluida, peso semibold y líneas compactas; varias superficies ajustan localmente la escala y el ancho del H1. El frontmatter recoge la jerarquía global, no obliga a los directorios a usar la escala del hero.

## Layout

El contenedor compartido llega a **80 rem** con márgenes laterales fluidos. Inicio alterna apertura ilustrada, bloques editoriales, módulos y evidencia. Las interiores combinan una apertura textual, contenido de lectura y rejillas cuando hay unidades comparables. La clase global de medida de lectura limita a **65 ch**; las interiores usan medidas propias según el bloque.

Las rejillas y las secciones partidas de interiores se vuelven una columna a **48 rem**; la navegación global cambia a menú compacto a **67 rem**. Inicio tiene umbrales locales para sus módulos. Son comportamientos observados y no una nueva escala universal.

## Elevation & Depth

La profundidad viene de capas discretas: papel, superficies, fondos de tarjeta y bordes finos. Los componentes representativos no usan una escalera de sombras; el anillo de la tarjeta Starwind es un contorno, no elevación. La perspectiva de las escenas ilustradas añade profundidad sin alterar esa regla de los controles.

## Shapes

Botones y campos tienen esquinas pequeñas; las tarjetas interiores repiten un radio discreto. Las tarjetas Starwind y el cierre ilustrado tienen contornos más suaves. La modularidad no exige encerrar toda la prosa en tarjetas.

## Components

- **Botones.** [`Button`](src/components/starwind/button/variants.ts) ofrece variantes semánticas. La acción primaria es sólida; el contorno sirve como alternativa. El tamaño `md` mide **2.75 rem** de alto, y ajusta relleno con icono. El cambio de estado es cromático, con contorno de foco visible y tratamiento deshabilitado separado.
- **Tarjetas.** [`Card`](src/components/starwind/card/variants.ts) aporta superficie y contorno, con tamaños `sm` y `md`. Las tarjetas interiores tienen estilo propio sobre la superficie local. Úsalas para unidades con información propia, como los campos de trabajo, no para enmarcar cada párrafo.
- **Campos.** En Empresas, etiquetas encima, borde visible, fondo cálido y foco por contorno. El aspecto deshabilitado es un estado visual; esta documentación no habilita captación.
- **Navegación.** [`SiteHeader`](src/components/site/SiteHeader.astro) muestra marca y enlaces, señala la página actual y expone un menú compacto en pantallas estrechas. El patrón observado no aprueba cambios en los destinos ni agrupaciones editoriales.
- **Cierre ilustrado.** [`ClosingCTA`](src/components/site/ClosingCTA.astro) combina texto, una o dos acciones y paisaje de apoyo. Su presencia en varias rutas no lo convierte en el acabado obligatorio para todos los cierres.

## Do's and Don'ts

- **Do** mantener una jerarquía legible también donde no haya ilustración.
- **Do** usar el token semántico correspondiente y comprobar su contraste bajo la superficie efectiva.
- **Do** conservar el foco visible y respetar la preferencia de movimiento reducido, como prevén los estilos compartidos.
- **Don't** extender los paisajes de Inicio a todo el catálogo por defecto ni confundir una ilustración con el logotipo.
- **Don't** convertir ejemplos, capturas históricas o variantes de exploración en reglas del sistema.
