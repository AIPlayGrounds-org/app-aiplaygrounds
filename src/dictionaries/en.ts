/**
 * TODO(i18n): SIN TRADUCIR.
 *
 * Todos los valores de este archivo son todavía el texto en español. La
 * estructura ya es la definitiva: `Dictionary` obliga a que estén todas las
 * claves, así que TypeScript avisa si en `es.ts` aparece una nueva.
 *
 * El copy de marca (tesis, principios, titulares) lo traduce una persona,
 * no una máquina — ver sección 5 del CLAUDE.md.
 */

import type { Dictionary } from "./es";

export const en: Dictionary = {
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
  /**
   * Páginas interiores.
   *
   * Todas comparten la misma forma: etiqueta, titular, entrada y la lista de
   * lo que va a vivir ahí. Mientras el contenido real no exista, la página
   * dice qué falta en vez de fingir que está terminada — "aprender de lo que
   * falla" también se aplica al propio sitio.
   *
   * `underConstruction` y `underConstructionNote` van una sola vez, fuera de
   * cada página: es el mismo texto en todas y repetirlo son siete sitios donde
   * desincronizarlo.
   */
  pages: {
    underConstruction: "En construcción",
    underConstructionNote:
      "Esta página todavía no tiene su contenido definitivo. Esto es lo que va a vivir aquí.",

    community: {
      eyebrow: "Comunidad",
      title: "Aprender con otros que están construyendo.",
      intro:
        "No es un canal de anuncios. Es donde se comparten decisiones técnicas, resultados medidos y lo que no funcionó.",
      upcoming: [
        "Cómo unirse y qué esperar al entrar.",
        "Los canales de la comunidad y para qué sirve cada uno.",
        "Las reglas de la casa.",
        "El calendario de encuentros.",
      ],
    },

    /**
     * Aprendizajes. Sustituye a la antigua página de programas.
     *
     * `levels`, `modes` y `states` traducen las CLAVES del archivo de
     * contenido (`src/content/learnings.ts`). Se escriben una vez, no una por
     * item: "En vivo" repetido en quince fichas son quince sitios donde
     * escribirlo mal.
     *
     * `items` va indexado por slug y su tipo obliga a que estén TODOS los del
     * archivo de contenido. Añadir un aprendizaje sin su texto no compila.
     */
    learnings: {
      eyebrow: "Aprendizajes",
      title: "Formación para entender lo que construyes.",
      intro:
        "Dos formatos con propósitos distintos: programas largos para cambiar cómo trabajas, y sesiones cortas para resolver algo concreto.",

      levels: {
        fundamentos: "Fundamentos",
        intermedio: "Intermedio",
        avanzado: "Avanzado",
      },
      modes: {
        envivo: "En vivo",
        hibrido: "Híbrido",
        virtual: "Virtual",
      },
      states: {
        proximo: "Próximo",
        encurso: "En curso",
        finalizado: "Finalizado",
      },

      types: {
        curso: "Curso",
        taller: "Taller",
        workshop: "Workshop",
        tutorial: "Tutorial",
      },
      /**
       * Plurales de la línea de metadatos. Van en dos formas y no con una
       * "(s)" pegada al final porque el sitio se traduce, y cada idioma parte
       * el plural donde quiere. Quién elige la forma lo decide `Intl.PluralRules`
       * con el idioma de la página, no un `número === 1` escrito a mano.
       */
      lessons: { one: "lección", other: "lecciones" },
      quizzes: { one: "cuestionario", other: "cuestionarios" },

      categories: {
        programa: {
          title: "Programas",
          intro:
            "Formatos largos por cohorte. Se entra con un grupo y se sale con algo construido y en producción.",
          empty:
            "Todavía no hay programas publicados. El primero se anuncia con sus fechas y requisitos.",
        },
        "curso-taller-workshop": {
          title: "Cursos, talleres y workshops",
          intro:
            "Sesiones cortas sobre una herramienta o una técnica concreta. Se entra sabiendo poco y se sale usándola.",
          empty:
            "Todavía no hay sesiones publicadas. Se anuncian con poca antelación, así que conviene estar en la comunidad.",
        },
      },

      items: {
        "think-build-deploy-with-ai": {
          titulo: "Think, Build & Deploy with AI",
          descripcionCorta:
            "Del prototipo a producción: decidir qué construir, construirlo y sostenerlo cuando lo usa gente real.",
          ctaLabel: "Ver programa",
        },
        "ai-technical-product-program": {
          titulo: "AI Technical Product Program",
          descripcionCorta:
            "Para quien decide qué se construye: evaluar sistemas de IA y defender esas decisiones con datos.",
          ctaLabel: "Ver programa",
        },
        "mes-de-asistentes-de-codigo": {
          titulo: "Mes de Asistentes de Código",
          descripcionCorta:
            "Cuatro sesiones sobre asistentes de código: qué hacen bien, dónde fallan y cómo medir si te sirven.",
          ctaLabel: "Ver sesiones",
        },
      },
    },

    learningDetail: {
      intro: "La ficha completa todavía no está publicada.",
      upcoming: [
        "Para quién es y qué conviene saber antes de entrar.",
        "Lo que se aprende, sesión por sesión.",
        "Duración, modalidad y fechas de la próxima edición.",
        "Cómo inscribirse.",
      ],
    },

    events: {
      eyebrow: "Eventos",
      title: "Hackathons, charlas y encuentros.",
      intro:
        "Lo que hacemos en persona y en línea. Abierto a quien quiera venir a construir.",
      upcoming: [
        "Los próximos eventos con fecha, lugar y registro.",
        "El archivo de los que ya pasaron, con sus materiales.",
        "Cómo proponer un evento a la comunidad.",
      ],
    },

    aiLabs: {
      eyebrow: "AI Labs",
      title: "Lo que construye la comunidad.",
      intro:
        "Productos salidos de los programas y de los encuentros. No demos: cosas que resuelven un problema concreto.",
      upcoming: [
        "Cada producto, con el problema que resuelve.",
        "Quién lo construyó y con qué tecnologías.",
        "Enlaces a la demo y al repositorio.",
      ],
    },

    about: {
      eyebrow: "Nosotros",
      title: "Desde dónde miramos la IA.",
      intro:
        "Una comunidad independiente en español. No vendemos herramientas: las evaluamos.",
      teamEyebrow: "Equipo",
      teamNote:
        "Quiénes están detrás de AI PlayGrounds, y desde dónde. Todavía sin publicar.",
    },

    companies: {
      eyebrow: "Para empresas",
      title: "Capacitación en IA para equipos.",
      intro:
        "Programas diseñados sobre el punto de partida real del equipo, no sobre un temario genérico. Para áreas técnicas y de negocio.",
      upcoming: [
        "Los formatos de capacitación y cómo se adaptan a cada equipo.",
        "Las organizaciones con las que hemos trabajado.",
        "El formulario para pedir una propuesta.",
      ],
    },
  },

  nav: {
    home: "Ir al inicio",
    community: "Comunidad",
    communityHome: "Comunidad",
    events: "Eventos",
    learnings: "Aprendizajes",
    allLearnings: "Todos los aprendizajes",
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
    instagram: "Instagram",
    whatsapp: "WhatsApp",
  },
};
