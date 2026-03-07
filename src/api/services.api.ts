import { api } from "./axios";
import { Service } from "../types/services";

interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    } | string;
  };
  request?: unknown;
  message?: string;
}

interface FetchServicesParams {
  search?: string;
  category?: string;
}

export interface ServicesPaginationResult {
  services: Service[];
  current_page: number;
  last_page: number;
  total?: number;
  per_page?: number;
}

export const getAllServices = async (
  page: number = 1,
  search?: string,
  category?: string,
): Promise<ServicesPaginationResult> => {
  const params: Record<string, string | number> = { page };
  if (search?.trim()) params.search = search.trim();
  if (category) params.category = category;

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

export const fetchServices = async (
  search: string,
  category: string | null
): Promise<Service[]> => {
  const params: FetchServicesParams = {};
  if (search) params.search = search;
  if (category) params.category = category;

  const res = await api.get("/services", { params });
  if (res.status !== 200) throw new Error("Failed to fetch services");

  return res.data.results.data;
};
