/**
 * Aprendizajes: programas, cursos, talleres y workshops.
 *
 * Este archivo guarda la ESTRUCTURA — lo que no se traduce. El texto visible
 * (título, descripción, etiqueta del botón) vive en los diccionarios, porque
 * el sitio es bilingüe y `Dictionary` obliga a que exista en los dos idiomas.
 *
 * El reparto es el mismo que hará Payload cuando entre en el paso 6: campos
 * localizados por un lado, campos comunes por el otro. Así, el día que estos
 * datos vengan del CMS, los componentes no cambian.
 *
 * Los valores de `nivel`, `modalidad`, `estado` y `tipo` son CLAVES, no
 * textos. Su traducción se escribe una sola vez en el diccionario, no una vez
 * por item: "En vivo" repetido en quince fichas son quince sitios donde
 * escribirlo mal.
 */

export const learningCategories = ["programa", "curso-taller-workshop"] as const;
export type LearningCategory = (typeof learningCategories)[number];

export const learningLevels = ["fundamentos", "intermedio", "avanzado"] as const;
export type LearningLevel = (typeof learningLevels)[number];

export const learningModes = ["envivo", "hibrido", "virtual"] as const;
export type LearningMode = (typeof learningModes)[number];

export const learningStates = ["proximo", "encurso", "finalizado"] as const;
export type LearningState = (typeof learningStates)[number];

export const learningTypes = ["curso", "taller", "workshop", "tutorial"] as const;
export type LearningType = (typeof learningTypes)[number];

/** Tonos del bloque superior de las tarjetas. Definidos en `globals.css`. */
export const coverTones = ["sand", "peri", "ink"] as const;
export type CoverTone = (typeof coverTones)[number];

/** Lo que comparten las dos categorías. */
type LearningBase = {
  slug: string;
  /** Ruta interna SIN prefijo de idioma. Se lo antepone el componente. */
  ctaHref: string;
  /** Tono del bloque superior de la tarjeta. Se ignora si hay `imagen`. */
  colorFondo: CoverTone;
  /** Ruta en /public. Cuando exista ilustración, manda sobre el tono. */
  imagen?: string;
};

/**
 * Un programa: formato largo por cohorte.
 *
 * Sus campos describen un compromiso en el tiempo — cuándo empieza, en qué
 * modalidad, a qué altura se entra.
 */
export type ProgramLearning = LearningBase & {
  categoria: "programa";
  nivel: LearningLevel;
  modalidad: LearningMode;
  estado: LearningState;
  /** ISO (AAAA-MM-DD). Opcional: no todo tiene fecha cerrada. */
  fecha?: string;
};

/**
 * Un curso, taller o workshop: formato corto.
 *
 * Sus campos describen un contenido cerrado — cuánto dura, de cuántas piezas
 * se compone. No tiene estado ni modalidad porque no se "entra" en él: está
 * ahí y se hace.
 */
export type CourseLearning = LearningBase & {
  categoria: "curso-taller-workshop";
  tipo: LearningType;
  /** Tal cual se muestra: "4h", "7 min". */
  duracion: string;
  lecciones?: number;
  cuestionarios?: number;
};

/**
 * UNIÓN DISCRIMINADA por `categoria`.
 *
 * No es un tipo con todos los campos opcionales a propósito: así TypeScript
 * impide preguntarle la modalidad a un taller o las lecciones a un programa,
 * que son preguntas sin sentido.
 *
 * Las dos categorías se pintan con la MISMA tarjeta. Lo que cambia es qué
 * entra en su línea de metadatos, y eso lo decide la página al montarla.
 */
export type Learning = ProgramLearning | CourseLearning;

/**
 * `as const satisfies` hace dos cosas a la vez: comprueba que cada item cumple
 * su variante del tipo, y conserva los slugs como literales para poder derivar
 * de ellos `LearningSlug`. Gracias a eso, si se añade un item aquí y se olvida
 * su texto en los diccionarios, el proyecto no compila.
 *
 * LÍMITE DE ALCANCE: aquí solo van formatos de ENSEÑANZA. Los hackathons,
 * demo days y Build Nights son Eventos y viven en su propia ruta. Si un item
 * es ambiguo, es un evento, no un aprendizaje.
 */
export const learnings = [
  {
    slug: "think-build-deploy-with-ai",
    categoria: "programa",
    nivel: "intermedio",
    modalidad: "envivo",
    estado: "proximo",
    colorFondo: "sand",
    ctaHref: "/aprendizajes/think-build-deploy-with-ai",
  },
  {
    slug: "ai-technical-product-program",
    categoria: "programa",
    nivel: "avanzado",
    modalidad: "hibrido",
    estado: "proximo",
    colorFondo: "ink",
    ctaHref: "/aprendizajes/ai-technical-product-program",
  },
  {
    slug: "mes-de-asistentes-de-codigo",
    categoria: "curso-taller-workshop",
    tipo: "curso",
    // PENDIENTE DE CONFIRMAR: la duración es una estimación. El número de
    // lecciones sí sale del texto, que habla de cuatro sesiones.
    duracion: "6h",
    lecciones: 4,
    colorFondo: "peri",
    ctaHref: "/aprendizajes/mes-de-asistentes-de-codigo",
  },
] as const satisfies readonly Learning[];

export type LearningSlug = (typeof learnings)[number]["slug"];

/**
 * Ancla de cada sección en /aprendizajes. El desplegable del menú enlaza
 * directamente a ellas, así que se declaran aquí y no escritas a mano en los
 * dos sitios.
 */
export const categoryAnchors: Record<LearningCategory, string> = {
  programa: "programas",
  "curso-taller-workshop": "cursos",
};

/**
 * Una consulta por categoría, cada una con su tipo estrecho: quien pinta filas
 * recibe programas y quien pinta tarjetas recibe cursos. Una sola función
 * genérica devolvería la unión y obligaría a comprobar la categoría otra vez
 * dentro de cada componente.
 *
 * El tipo de retorno se anota a mano en lugar de dejarlo inferir: `as const`
 * congela los items a sus valores exactos y los campos opcionales que hoy
 * nadie usa —`fecha`, `cuestionarios`— desaparecerían del tipo, aunque los
 * componentes tengan que saber pintarlos.
 *
 * El slug va estrechado a `LearningSlug` porque con él se busca el texto en
 * el diccionario, y ahí las claves son literales.
 */
type WithSlug<T> = Omit<T, "slug"> & { slug: LearningSlug };

export function programs(): WithSlug<ProgramLearning>[] {
  return learnings.filter((item) => item.categoria === "programa");
}

export function courses(): WithSlug<CourseLearning>[] {
  return learnings.filter((item) => item.categoria === "curso-taller-workshop");
}

export function findLearning(slug: string): WithSlug<Learning> | undefined {
  return learnings.find((item) => item.slug === slug);
}
