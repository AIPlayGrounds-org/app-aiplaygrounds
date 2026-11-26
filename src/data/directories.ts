// Solo incorporar registros confirmados y autorizados.
interface DirectoryEntry {
  slug: string;
  demo?: true;
  source?: string;
  organizationRelation?: string;
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
export const research: Research[] = [];

export async function getResearch(): Promise<Research[]> {
  if (import.meta.env.DEV) {
    const { demoResearch } = await import('./directories.demo');
    return [...research, ...demoResearch];
  }
  return research;
}
