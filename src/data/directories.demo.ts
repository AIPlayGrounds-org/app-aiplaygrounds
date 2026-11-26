import type { Research } from './directories';

type Demo<T> = T & { demo: true };

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
