import { api } from "./axios";
import { Service } from "../types/services";

export interface ServicesPaginationResult {
  services: Service[];
  current_page: number;
  last_page: number;
  total?: number;
  per_page?: number;
}

const DEFAULT_PER_PAGE = 20;

export const getAllServices = async (
  page: number = 1,
  search?: string,
  category?: string,
  perPage: number = DEFAULT_PER_PAGE,
): Promise<ServicesPaginationResult> => {
  const params: Record<string, string | number> = { page, per_page: perPage };
  if (search?.trim()) params.search = search.trim();
  if (category) {
    params.category = category;
    params.category_id = category;
    params.quotation_category_id = category;
  }

  const response = await api.get("/services", { params });
  const results = response.data?.results;

  if (!results?.data || !Array.isArray(results.data)) {
    throw new Error("Invalid API response structure");
  }

  return {
    services: results.data as Service[],
    current_page: results.current_page ?? page,
    last_page: results.last_page ?? 1,
    total: results.total,
    per_page: results.per_page,
  };
};
