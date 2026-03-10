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
  if (search?.trim()) {
    params.search = search.trim();
    params.search_fields = "title,description_short";
  }
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

export const getAllServicesAllPages = async (
  search?: string,
  category?: string,
  perPage: number = DEFAULT_PER_PAGE,
): Promise<{ services: Service[]; total: number }> => {
  const first = await getAllServices(1, search, category, perPage);
  const all: Service[] = [...first.services];
  const lastPage = first.last_page ?? 1;

  if (lastPage <= 1) {
    return { services: all, total: first.total ?? all.length };
  }

  const rest = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, i) =>
      getAllServices(i + 2, search, category, perPage),
    ),
  );
  for (const res of rest) {
    all.push(...res.services);
  }
  return {
    services: all,
    total: first.total ?? all.length,
  };
};
