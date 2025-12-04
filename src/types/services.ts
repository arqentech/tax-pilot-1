export interface Category {
  id: number;
  identifier: string;
  title: string;
}

export interface FAQ {
  id: number;
  question: string;
  response: string;
}

export interface Service {
  id: number;
  identifier: string;
  title: string;
  description_short: string;
  description_long: string;
  price: number;
  image?: { url: string };
  categories: { category: Category }[];
  faqs: FAQ[];
}
