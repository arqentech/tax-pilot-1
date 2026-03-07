import { api } from "./axios";

export interface QuotationCategoryItem {
  id: number;
  name: string;
  active: number;
  created_at: string;
  updated_at: string;
}

interface QuotationCategoriesResponse {
  status?: string;
  items?: QuotationCategoryItem[];
  results?: QuotationCategoryItem[] | { data?: QuotationCategoryItem[] };
  data?: QuotationCategoryItem[];
}

function parseCategoriesList(data: unknown): QuotationCategoryItem[] {
  if (!data || typeof data !== "object") return [];
  const d = data as Record<string, unknown>;
  if (Array.isArray(d.items)) return d.items as QuotationCategoryItem[];
  if (Array.isArray(d.data)) return d.data as QuotationCategoryItem[];
  const results = d.results;
  if (Array.isArray(results)) return results as QuotationCategoryItem[];
  if (results && typeof results === "object" && Array.isArray((results as Record<string, unknown>).data))
    return (results as { data: QuotationCategoryItem[] }).data;
  return [];
}

export const getQuotationCategories = async (): Promise<QuotationCategoryItem[]> => {
  try {
    const response = await api.get<QuotationCategoriesResponse>(
      "/quotation-category/list",
    );
    return parseCategoriesList(response.data);
  } catch {
    return [];
  }
};
