// Solo incorporar registros confirmados y autorizados.
export interface Product {
  name: string;
  utility: string;
  audience: string;
  creator: string;
  source: string;
  aiRelation: string;
  organizationRelation: string;
  status: string;
  access: string;
  permission: string;
}
export interface Research {
  title: string;
  question: string;
  authors: string;
  type: string;
  date: string;
  method: string;
  results: string;
  limitations: string;
  source: string;
  organizationRelation: string;
  peerReview?: string;
}
export const products: Product[] = [];
export const research: Research[] = [];
