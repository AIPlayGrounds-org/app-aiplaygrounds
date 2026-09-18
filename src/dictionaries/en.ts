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

    /**
     * Comunidad.
     *
     * El copy sale del documento de contenido cerrado en las sesiones de
     * septiembre de 2026, que es la fuente de verdad de lo que dicen las
     * páginas.
     *
     * La entrada cambió de raíz. Antes abría nombrando al lector ("usas IA
     * todos los días y te manejas, pero sientes que hay un nivel que no
     * tocas"); ahora abre por el porqué —entender vale más que generar— y
     * deja que el "para quién" lo resuelva la enumeración de verticales. Es
     * una página que argumenta antes de filtrar.
     *
     * DOS SECCIONES DESAPARECIERON Y NO POR RECORTE: "quiénes vienen" quedó
     * absorbido dentro del encabezado, y "cómo entrar" se repartió entre los
     * botones. Las dos decisiones son del documento, no de la maqueta.
     *
     * El número de encuentros NO vive aquí: es un dato, no un texto, no se
     * traduce y cambia solo. Está en `src/content/community.ts` —y hoy no se
     * muestra en ninguna parte, porque la cifra está sin confirmar.
     */
    community: {
      eyebrow: "Comunidad",

      /**
       * El título es la palabra sola. Antes era una frase —"Más allá de
       * usarla bien"— que competía con el párrafo grande que ahora va a su
       * derecha. En una retícula de dos columnas el título nombra la página
       * y el argumento lo lleva la otra columna; dos frases compitiendo por
       * ese papel se anulan.
       */
      title: "Comunidad",

      /** El porqué. Es el texto de marca de esta página. */
      lead: "Creemos que entender vale más que generar. La IA volvió fácil producir, mientras el verdadero valor se quedó esperando a quien estuviera dispuesto a ir a fondo. Y eso no se hace solo — se hace con gente que también decidió profundizar.",

      /**
       * El cómo. AI Labs se nombra aquí dentro aunque NO sea un vertical
       * sino un espacio aparte: fue decisión expresa del documento, que deja
       * anotado que si algún día se siente forzado, se le da su propia línea.
       */
      verticalsLabel: "Verticales:",
      verticalsLead: "Software con IA, AI Engineer en producción, MLOps, Finance & Risk. Y abrimos AI Labs, donde un proceso de industria o una pregunta científica llega hasta el final.",

      ctaEvents: "Ver próximos encuentros",
      ctaVertical: "Conversemos sobre un vertical",

      /**
       * La cifra sostiene que hay una brecha real de aplicación en la región.
       * NO prueba que hagan falta comunidades como esta para cerrarla: esa
       * segunda parte es lectura nuestra, no algo que McKinsey haya medido.
       * Por eso el copy enuncia el dato y se detiene ahí.
       */
      whyWeExist: {
        eyebrow: "Por qué existimos",
        stats: [
          {
            value: "23%",
            description:
              "de las organizaciones en LATAM genera valor económico con IA",
          },
          {
            value: "6%",
            description: "reporta un impacto significativo",
          },
        ],
        source: "Foro Económico Mundial + McKinsey, 2026",
      },

      /**
       * Growth y contenido todavía no está abierto como vertical, así que no
       * aparece. Si el deck lo sigue mostrando con dueña asignada, es el deck
       * el que hay que revisar: esta lista dice lo que existe hoy.
       */
      verticals: {
        eyebrow: "Verticales activas",
        items: [
          {
            title: "Software con IA",
            description:
              "Agentes de código, contexto, integración con el repo. Qué acelera de verdad y qué genera deuda que pagas después.",
          },
          {
            title: "AI Engineer en producción",
            description:
              "Sistemas con LLMs que ya tienen usuarios. Evals, latencia, costo por request, fallas silenciosas.",
          },
          {
            title: "AI / MLOps e infraestructura",
            description:
              "Lo que sostiene un modelo corriendo: pipelines, despliegue, monitoreo, drift.",
          },
          {
            title: "AI for Finance & Risk",
            description:
              "Crédito, fraude, riesgo, cobranzas. Modelos con consecuencias regulatorias.",
          },
        ],
        note: "Si alguna te interesa, escríbenos. Se suma gente todo el tiempo.",
      },

      partners: {
        eyebrow: "No lo hacemos solos",
        items: [
          {
            title: "Hack@LATAM",
            description:
              "Sede Lima en UTEC, dentro de una hackathon de impacto social simultánea en cinco países. Mayo 2026, con indies.la.",
          },
          {
            title: "AI Hack Perú",
            description:
              "24 horas, 120 participantes en Lima. Noviembre 2025, con The Hackathon Company.",
          },
          {
            title: "IRF",
            description:
              "Seis semanas de innovación y tecnología para talento de regiones, del Impact Regional Fellowship de SpinOut.",
          },
        ],
        note: "Si tu comunidad quiere armar algo, escríbenos.",
      },

      closing:
        "Si esto también es lo que crees, ya eres uno de los nuestros. Falta que lo hagas con nosotros.",

      /**
       * Las reglas de la casa NO están en el documento de copy. Se conservan
       * por decisión expresa: puede que se cayeran a propósito o puede que
       * fuera un olvido, y al final de la página no le quitan sitio a nada.
       */
      rules: {
        eyebrow: "Reglas de la casa",
        items: [
          {
            title: "Sin promoción suelta",
            description:
              "Comparte lo que construyes cuando aporte a la conversación, no como anuncio.",
          },
          {
            title: "Sin hype",
            description:
              "Si una afirmación no está probada, se dice que no está probada.",
          },
          {
            title: "Enlaza la fuente",
            description: "Un enlace vale más que una opinión repetida.",
          },
          {
            title: "Preguntar no es debilidad",
            description: "Nadie llega sabiendo.",
          },
          {
            title: "En español",
            description:
              "Los términos técnicos en inglés están bien; la conversación es en español.",
          },
        ],
      },
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

    /**
     * Eventos.
     *
     * Recibe dos cosas que vivían en /comunidad: el bloque que describe el
     * formato de la sesión —se llamaba "cómo funciona"— y la retícula de qué
     * pasa cuando nos juntamos. Las dos describen el EVENTO y no la
     * comunidad, y tenerlas allí obligaba a contar lo mismo en dos páginas
     * del mismo desplegable.
     *
     * `weekly.body` y `meetups` se solapan en parte: el primero dice que
     * quien expone abre el trabajo completo, y el segundo lo repite en
     * "charlas técnicas". Se dejan los dos porque el solape es de una línea,
     * pero es el primer sitio donde recortar si la página se siente larga.
     */
    events: {
      eyebrow: "Eventos",
      title: "Eventos",
      lead: "Donde el trabajo se abre completo, no se demuestra pulido.",
      body: "Los encuentros llevan lo que pasa en los verticales y en AI Labs a revisión en vivo: la arquitectura, las decisiones, los números, y la parte que falló.",
      cta: "Ver próximos encuentros",

      weekly: {
        eyebrow: "Encuentros semanales",
        body: [
          "Quien expone abre el trabajo completo: la arquitectura o el método, las decisiones, los números, y la parte que falló. Sin demo pulida.",
          "Después se pregunta. Ahí es donde pasa lo bueno.",
        ],
        /** El único dato accionable de la sección. Va aparte y en mono. */
        schedule: "Online los miércoles, 7 pm · Cada tanto nos vemos en Lima",
      },

      meetups: {
        eyebrow: "Qué pasa cuando nos juntamos",
        items: [
          {
            title: "Charlas técnicas",
            description:
              "De quien construyó lo que está contando. Con las decisiones y los errores incluidos.",
          },
          {
            title: "Talleres",
            description: "Se sale con algo hecho, no con apuntes.",
          },
          {
            title: "Conversación entre pares",
            description:
              "Lo que no cabe en un video: preguntar lo específico de tu caso a quien ya pasó por ahí.",
          },
          {
            title: "Lo que sigue después",
            description:
              "El encuentro termina; el grupo no. Ahí se contesta lo que quedó abierto.",
          },
        ],
      },

      /**
       * El listado todavía no vive aquí: el documento deja la fuente sin
       * decidir —Luma, una base de Notion embebida, u otra—. Mientras tanto
       * el botón manda a donde los encuentros sí están publicados.
       */
      calendar: {
        eyebrow: "Calendario",
        note: "Los encuentros se publican y se registran en Luma. El listado todavía no vive en esta página.",
        cta: "Ver todos los eventos",
      },
    },

    /**
     * AI Labs — descripción general.
     *
     * De las tres páginas que pide el documento (general, Producto y
     * Research) aquí solo está la general. Las otras dos llegan cuando haya
     * piezas que enseñar; mientras tanto esta resume los dos espacios, que es
     * exactamente lo que el documento pide de ella.
     *
     * `paths.eyebrow` es la única etiqueta INVENTADA de todo este bloque: el
     * documento describe los dos caminos y sus botones, pero no les pone
     * título de sección. "Cómo entrar" es lo que hacen.
     */
    aiLabs: {
      eyebrow: "AI Labs",
      title: "AI Labs",
      lead: "Aquí los proyectos llegan hasta el final: proceso real, o pregunta resuelta.",
      body: "Investigamos la frontera de la IA aplicada: procesos reales de industria y preguntas científicas abiertas, en las verticales donde ya trabajamos.",
      spacesLabel: "Espacios:",
      spacesLead: "Proceso real · Pregunta resuelta",

      spaces: {
        eyebrow: "Los dos espacios",
        items: [
          {
            title: "Producto",
            description:
              "Procesos reales de industria impactados por IA, documentando el problema, las decisiones y lo que falló para que el proceso siga funcionando después de la demo.",
          },
          {
            title: "Research / AI for Science",
            description:
              "Preguntas científicas abiertas de la frontera de la IA aplicada, verificando con criterio antes de repetir lo que se viraliza.",
          },
        ],
      },

      paths: {
        eyebrow: "Cómo entrar",
        items: [
          {
            title: "Tienes un proceso en tu industria",
            description:
              "Si tu equipo ya corre algo con IA y quieres que se documente como caso, con el problema, las decisiones y lo que falló incluido.",
            cta: "Quiero que mi proyecto sea un caso",
          },
          {
            title: "Vienes de la academia o la comunidad",
            description:
              "Si quieres publicar research, sumarte a un journal club, o ser parte del equipo detrás de una vertical.",
            cta: "Quiero investigar o publicar con ustedes",
          },
        ],
      },
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
    skipToContent: "Saltar al contenido",
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
