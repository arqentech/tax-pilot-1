export interface Service {
  title: string;
  description: string;
  price: number;
  vatIncluded: boolean;
  hours: string;
  link: string;
  category: string;
  inDepthAnalysis?: string;
  advantages?: string[];
}
