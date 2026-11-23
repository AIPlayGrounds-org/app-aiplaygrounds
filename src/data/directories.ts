// Solo incorporar registros confirmados y autorizados.
interface DirectoryEntry {
  slug: string;
  demo?: true;
  source?: string;
  organizationRelation?: string;
}

export interface Product extends DirectoryEntry {
  name: string;
  utility: string;
  problem: string;
  audience: string;
  creator?: string;
  aiRelation: string;
  usageNotes?: string;
  status: string;
  access?: string;
}
export interface Research extends DirectoryEntry {
  title: string;
  question: string;
  authors?: string;
  type: string;
  date?: string;
  method: string;
  results?: string;
  limitations: string;
  peerReview?: string;
}
export const products: Product[] = [];
export const research: Research[] = [];

export async function getProducts(): Promise<Product[]> {
  if (import.meta.env.DEV) {
    const { demoProducts } = await import('./directories.demo');
    return [...products, ...demoProducts];
  }
  return products;
}

export async function getResearch(): Promise<Research[]> {
  if (import.meta.env.DEV) {
    const { demoResearch } = await import('./directories.demo');
    return [...research, ...demoResearch];
  }
  return research;
}
