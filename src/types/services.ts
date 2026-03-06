export interface ServiceImage {
  service_id: number;
  url: string;
}

export interface Category {
  id: number;
  identifier: string;
  title: string;
}

export interface ServiceCategory {
  id: number;
  service_id: number;
  category_service_id: number;
  category: Category;
}

export interface FAQ {
  id: number;
  service_id: number;
  question: string;
  response: string;
  position: number;
}
export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedServiceItem {
  id: number;
  service_id: number;
  related_service_id: number;
  created_at?: string;
  updated_at?: string;
  service: Service;
}

export interface Service {
  id: number;
  identifier: string;
  title: string;
  description_short: string;
  description_long: string;
  price: number;
  vatIncluded?: boolean;
  hours?: string;
  inDepthAnalysis?: string;
  advantages?: string[];
  image?: {
    url: string;
  };
  categories?: {
    category: {
      identifier: string;
      title: string;
    };
  }[];
  faqs?: FAQ[];
  related_services?: RelatedServiceItem[] | Service[];
  /** When true, user must complete minimum-requirements wizard before adding to cart. */
  has_minimum_requirement?: boolean;
}

export interface ServiceCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  description_short?: string;
  description_long?: string;
  price?: number | string | null;
  vatIncluded?: boolean;
  hours?: string;
  link?: string;
  identifier?: string;
  advantages?: string[];
}
