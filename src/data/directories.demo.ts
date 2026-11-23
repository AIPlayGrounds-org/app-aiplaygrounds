import type { Product, Research } from './directories';

type Demo<T> = T & { demo: true };

export const demoProducts: Demo<Product>[] = [
  {
    demo: true,
    slug: 'buscador-semantico',
    name: 'Buscador semántico',
    utility: 'Busca por significado en un conjunto de documentos técnicos.',
    problem:
      'Una búsqueda literal puede pasar por alto documentación pertinente cuando la consulta y los documentos usan palabras distintas para el mismo concepto.',
    audience: 'Equipos que mantienen documentación.',
    aiRelation: 'Recuperación de documentos por similitud semántica.',
    status: 'Concepto',
    access: 'Sin acceso',
  },
  {
    demo: true,
    slug: 'asistente-para-revisar-cambios-de-codigo',
    name: 'Asistente para revisar cambios de código',
    utility:
      'Resume los cambios de una solicitud de revisión y señala archivos que conviene leer juntos.',
    problem:
      'Cuando una solicitud toca varios archivos, cuesta hacerse una idea del cambio y decidir por dónde empezar la revisión.',
    audience: 'Personas que revisan código en equipo.',
    aiRelation: 'Generación de resúmenes a partir de diferencias de código.',
    usageNotes:
      'Las observaciones orientan la revisión humana; el asistente no aprueba cambios automáticamente.',
    status: 'Concepto',
    access: 'Sin acceso',
  },
];

export const demoResearch: Demo<Research>[] = [
  {
    demo: true,
    slug: 'comparar-metodos-de-busqueda-documental',
    title: 'Comparar métodos de búsqueda documental',
    question:
      '¿Cuándo recupera documentos más pertinentes la búsqueda por palabras clave y cuándo conviene buscar por significado?',
    type: 'Estudio comparativo propuesto',
    method: 'Comparar ambos métodos con las mismas consultas y documentos.',
    limitations: 'El alcance se limitaría al conjunto documental de la prueba.',
  },
  {
    demo: true,
    slug: 'evaluacion-de-asistentes-de-codigo-en-tareas-de-mantenimiento',
    title: 'Evaluación de asistentes de código en tareas de mantenimiento',
    question:
      '¿Cómo cambia la revisión de un parche sugerido por IA si hay pruebas existentes, documentación incompleta o varios archivos relacionados?',
    type: 'Protocolo de evaluación propuesto',
    method:
      'El protocolo propone usar tareas equivalentes y contrastar cada parche con sus pruebas. La comparación se centraría en qué puede comprobar la persona que revisa el cambio.',
    limitations:
      'No permitiría generalizar a repositorios fuera de la muestra.',
  },
];
