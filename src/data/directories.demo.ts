import type { Product, Research } from './directories';

type Demo<T, Missing extends keyof T> = Omit<T, Missing> & {
  [Key in Missing]?: never;
} & { demo: true };

export const demoProducts: Demo<Product, 'creator' | 'source'>[] = [
  {
    demo: true,
    name: 'Buscador semántico',
    utility: 'Buscar por significado en un conjunto de documentos técnicos.',
    audience: 'Equipos que mantienen documentación.',
    aiRelation: 'Recuperación de documentos por similitud semántica.',
    organizationRelation: 'Ejemplo ficticio para revisar el directorio.',
    status: 'Concepto',
    access: 'Sin acceso',
    permission: 'Solo para revisión local',
  },
  {
    demo: true,
    name: 'Asistente para revisar cambios de código',
    utility:
      'Resumir los cambios de una solicitud de revisión y señalar archivos que convendría leer juntos. Las observaciones sirven para orientar la revisión humana, no para aprobar cambios automáticamente.',
    audience: 'Personas que revisan código en equipo.',
    aiRelation: 'Generación de resúmenes a partir de diferencias de código.',
    organizationRelation: 'Ejemplo ficticio para revisar el directorio.',
    status: 'Concepto',
    access: 'Sin acceso',
    permission: 'Solo para revisión local',
  },
];

export const demoResearch: Demo<
  Research,
  'authors' | 'date' | 'results' | 'source'
>[] = [
  {
    demo: true,
    title: 'Comparar métodos de búsqueda documental',
    question:
      '¿Cuándo recupera documentos más pertinentes la búsqueda por palabras clave y cuándo conviene buscar por significado?',
    type: 'Estudio comparativo propuesto',
    method: 'Comparar ambos métodos con las mismas consultas y documentos.',
    limitations: 'El alcance se limitaría al conjunto documental de la prueba.',
    organizationRelation: 'Ejemplo ficticio para revisar el directorio.',
  },
  {
    demo: true,
    title: 'Evaluación de asistentes de código en tareas de mantenimiento',
    question:
      '¿Cómo cambia la revisión de un parche sugerido por un asistente si la tarea incluye pruebas existentes, documentación incompleta o varios archivos relacionados? La comparación se centraría en qué puede comprobar la persona que revisa el cambio.',
    type: 'Protocolo de evaluación propuesto',
    method:
      'Usar tareas equivalentes y revisar cada parche frente a sus pruebas.',
    limitations:
      'No permitiría generalizar a repositorios fuera de la muestra.',
    organizationRelation: 'Ejemplo ficticio para revisar el directorio.',
  },
];
