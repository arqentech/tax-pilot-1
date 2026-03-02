export interface FaqTopic {
  slug_topic: string;
  topic: string;
  total: number;
}

export interface FaqItem {
  topic: string;
  slug_topic: string;
  slug: string;
  question: string;
  answer?: string;
}

export interface FaqTopicResponse {
  title: string;
  slug_topic: string;
  children: FaqItem[];
}

export interface FaqDetailItem {
  id: number;
  topic: string;
  slug_topic: string;
  slug: string;
  question: string;
  response: string;
  is_published?: number;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface FaqDetailResponse {
  faq: FaqDetailItem;
  others: FaqItem[];
}
