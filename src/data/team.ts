import type { ImageMetadata } from 'astro';
import appuPhoto from '../assets/team/appu.webp';
import davidPhoto from '../assets/team/david-duran.webp';
import edhuPhoto from '../assets/team/edhu-nunez.webp';
import edithPhoto from '../assets/team/edith-canelo.webp';
import jheslynPhoto from '../assets/team/jheslyn-lagos.webp';
import jhonatanPhoto from '../assets/team/jhonatan-morgan.webp';
import josephPhoto from '../assets/team/joseph-robles.webp';
import julioPhoto from '../assets/team/julio-montreul.webp';
import kevinPhoto from '../assets/team/kevin-huaman.webp';
import keylaPhoto from '../assets/team/keyla-serna.webp';
import maxPhoto from '../assets/team/max-veramendi.webp';
import milagrosPhoto from '../assets/team/milagros-dimas.webp';
import pedroPhoto from '../assets/team/pedro-rojas.webp';
import ricardoPhoto from '../assets/team/ricardo-quispe.webp';
import rocioPhoto from '../assets/team/rocio-laura.webp';
import soledadPhoto from '../assets/team/soledad-nahui.webp';

export const teamVerticals = [
  { id: 'foundations', title: 'AI Foundations' },
  { id: 'software', title: 'AI for Software' },
  { id: 'science', title: 'AI for Science' },
  { id: 'finance', title: 'AI for Finance' },
] as const;

type TeamVertical = (typeof teamVerticals)[number]['id'];

export interface TeamMember {
  id: string;
  name: string;
  organizationRole: {
    direction?: string;
    organization?: string;
    vertical?: 'Líder' | 'Integrante';
  };
  professionalRole?: string;
  photo?: ImageMetadata;
  vertical?: TeamVertical;
  linkedin?: string;
  github?: string;
  website?: string;
}

// Add professional details and portraits only once they are approved for publication.
export const team: readonly TeamMember[] = [
  {
    id: 'soledad-nahui',
    name: 'Soledad Ñahui',
    organizationRole: { direction: 'Head of Strategy' },
    professionalRole: 'Product Manager AI',
    photo: soledadPhoto,
    linkedin: 'https://www.linkedin.com/in/soledad-%C3%B1ahui-sullca/',
    github: 'https://github.com/Giby3xyz',
  },
  {
    id: 'jhonatan-morgan',
    name: 'Jhonatan Morgan',
    organizationRole: { direction: 'Head of AI', vertical: 'Líder' },
    professionalRole: 'Lead Machine Learning Ops Engineer',
    photo: jhonatanPhoto,
    vertical: 'foundations',
    linkedin: 'https://www.linkedin.com/in/jhonatan-morgan/',
    github: 'https://github.com/mrmorgan-ai',
  },
  {
    id: 'edhu-nunez',
    name: 'Edhú Nuñez',
    organizationRole: { direction: 'Head of Product' },
    professionalRole: 'AI Product Builder',
    photo: edhuPhoto,
    linkedin: 'https://www.linkedin.com/in/edhutech/',
    github: 'https://github.com/edhutech',
    website: 'https://edhutech.com/',
  },
  {
    id: 'appu',
    name: 'Appu',
    organizationRole: { organization: 'Public Relations' },
    professionalRole: 'Planner',
    photo: appuPhoto,
    linkedin: 'https://www.linkedin.com/in/appu-d/',
  },
  {
    id: 'milagros-dimas',
    name: 'Milagros Dimas',
    organizationRole: { organization: 'Product Specialist' },
    professionalRole: 'Product Manager',
    photo: milagrosPhoto,
    linkedin: 'https://www.linkedin.com/in/milagros-dimas-beisaga',
  },
  {
    id: 'joseph-robles',
    name: 'Joseph Robles',
    organizationRole: { vertical: 'Líder' },
    professionalRole: 'AI Builder',
    photo: josephPhoto,
    vertical: 'software',
    linkedin: 'https://www.linkedin.com/in/joseph-chuquipiondo-robles/',
    website: 'https://josephrobles.dev',
  },
  {
    id: 'julio-montreul',
    name: 'Julio Montreul',
    organizationRole: { vertical: 'Integrante' },
    professionalRole: 'Data Engineer',
    photo: julioPhoto,
    vertical: 'software',
    linkedin: 'https://www.linkedin.com/in/juan-montreuil/',
  },
  {
    id: 'max-veramendi',
    name: 'Max Veramendi',
    organizationRole: { vertical: 'Integrante' },
    professionalRole: 'AI Engineer',
    photo: maxPhoto,
    vertical: 'software',
    linkedin: 'https://www.linkedin.com/in/dart-max-veramendi-santiba%C3%B1ez/',
  },
  {
    id: 'jheslyn-lagos',
    name: 'Jheslyn Lagos',
    organizationRole: { vertical: 'Integrante' },
    professionalRole: 'Full Stack Developer',
    photo: jheslynPhoto,
    vertical: 'software',
    github: 'https://github.com/jheslyn31',
  },
  {
    id: 'ricardo-quispe',
    name: 'Ricardo Quispe',
    organizationRole: { vertical: 'Líder' },
    professionalRole: 'Researcher in quantum technologies',
    photo: ricardoPhoto,
    vertical: 'science',
    linkedin: 'https://www.linkedin.com/in/quantumrick/',
    github: 'https://github.com/RcrdPhysics',
  },
  {
    id: 'david-duran',
    name: 'David Durán',
    organizationRole: { vertical: 'Integrante' },
    professionalRole: 'developer + physicist + designer',
    photo: davidPhoto,
    vertical: 'science',
    github: 'https://github.com/totallynotdavid',
  },
  {
    id: 'pedro-rojas',
    name: 'Pedro Rojas',
    organizationRole: { vertical: 'Integrante' },
    professionalRole: 'Physicist',
    photo: pedroPhoto,
    vertical: 'science',
    github: 'https://github.com/PedroRojasF',
  },
  {
    id: 'kevin-huaman',
    name: 'Kevin Huaman',
    organizationRole: { vertical: 'Integrante' },
    professionalRole: 'Data Scientist',
    photo: kevinPhoto,
    vertical: 'science',
    linkedin: 'https://www.linkedin.com/in/khuaman/',
    github: 'https://github.com/khuaman',
  },
  {
    id: 'edith-canelo',
    name: 'Edith Canelo',
    organizationRole: { vertical: 'Líder' },
    professionalRole: 'Data Analyst',
    photo: edithPhoto,
    vertical: 'finance',
    linkedin: 'https://www.linkedin.com/in/edith-canelo/',
  },
  {
    id: 'rocio-laura',
    name: 'Rocio Laura',
    organizationRole: { vertical: 'Integrante' },
    professionalRole: 'Business Intern',
    photo: rocioPhoto,
    vertical: 'finance',
    linkedin: 'https://www.linkedin.com/in/rocio-laura-4a0470241/',
  },
  {
    id: 'keyla-serna',
    name: 'Keyla Elyneth Serna Berrocal',
    organizationRole: { vertical: 'Integrante' },
    professionalRole: 'Business Intelligence Analyst',
    photo: keylaPhoto,
    vertical: 'finance',
    linkedin: 'https://www.linkedin.com/in/keyla-elyneth',
  },
];
