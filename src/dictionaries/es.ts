/**
 * Diccionario en español — fuente de verdad del sitio.
 *
 * De este objeto se deriva el tipo `Dictionary`, así que añadir una clave aquí
 * obliga a añadirla también en `en.ts` o el proyecto no compila.
 *
 * Las claves van en inglés (son nombres de variables); los valores en español.
 */

export const es = {
  home: {
    // El punto separador de la etiqueta no va aquí: es un elemento gráfico
    // (el periwinkle de marca), no texto. Lo pone el componente.
    eyebrowBrand: "AI PlayGrounds",
    eyebrowRegion: "LATAM",
    // El titular va en dos claves, no con un salto de línea dentro del texto:
    // en inglés el corte puede caer en otro sitio.
    titleLine1: "Construye con IA.",
    titleLine2: "Sé parte de cada decisión.",
    ctaCommunity: "Unirme a la comunidad",
    ctaEvents: "Ver eventos",
    // Nota al margen del encabezado. El marcador [1] lo pinta el componente,
    // no va dentro del texto: al traducir, la llamada puede caer en otra
    // palabra del titular.
    note:
      "Una comunidad de IA en español para quienes quieren entender lo que construyen.",
  },
  thesis: {
    eyebrow: "Nuestra tesis",
    // Igual que en la etiqueta del encabezado, el punto separador lo pinta
    // el componente en aipg-accent.
    taglineLeft: "Sin hype",
    taglineRight: "Con criterio",
    titleLine1: "Generar es",
    titleLine2: "solo el principio.",
    body: [
      "La IA hizo más fácil construir.",
      "Entender qué estamos construyendo, por qué funciona y cuándo usarlo sigue siendo difícil.",
      "Ahí empieza AI PlayGrounds.",
      "Queremos entender los sistemas que usamos, evaluar lo que producen y tomar mejores decisiones técnicas y de producto alrededor de ellos.",
      "Porque mientras más puede hacer la IA por nosotros, más importante se vuelve saber qué decisiones seguimos tomando nosotros.",
    ],
    closing:
      "Si puedes explicarlo, evaluarlo y defender tus decisiones, entonces lo construiste.",
  },
  principles: {
    eyebrow: "Principios",
    items: [
      {
        title: "Sin hype",
        description: "Nada de promesas infladas. Lo que no está probado, se dice.",
      },
      {
        title: "Con criterio",
        description: "Afirmaciones sostenibles, y matices donde los hay.",
      },
      {
        title: "Independientes",
        description: "No vendemos ninguna herramienta. Las evaluamos todas.",
      },
      {
        title: "Aprender de lo que falla",
        description: "Los errores y los límites también se nombran.",
      },
      {
        title: "En español",
        description: "Pensado en español, no traducido después.",
      },
    ],
  },
  nav: {
    home: "Ir al inicio",
    community: "Comunidad",
    communityHome: "Comunidad",
    events: "Eventos",
    discord: "Discord",
    programs: "Programas",
    allPrograms: "Todos los programas",
    aiFundamentals: "AI Fundamentals",
    theRealAi: "The Real AI",
    aiLabs: "AI Labs",
    about: "Nosotros",
    team: "Equipo",
    principles: "Principios",
    forCompanies: "Para empresas",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  locale: {
    switch: "Cambiar idioma",
  },
  footer: {
    tagline: "Construido desde Latinoamérica.",
    social: "Redes",
    linkedin: "LinkedIn",
    discord: "Discord",
    whatsapp: "WhatsApp",
    github: "GitHub",
  },
};

export type Dictionary = typeof es;
