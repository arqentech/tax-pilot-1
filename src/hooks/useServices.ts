import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getAllServices,
  getAllServicesAllPages,
  type ServicesPaginationResult,
} from "../api/services.api";

export const useServices = (
  page: number = 1,
  search?: string,
  category?: string | null,
  perPage: number = 20,
) => {
  return useQuery<ServicesPaginationResult>({
    queryKey: ["services", page, search ?? "", category ?? "", perPage],
    queryFn: () =>
      getAllServices(page, search ?? undefined, category ?? undefined, perPage),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};

export interface AllServicesResult {
  services: import("@/types/services").Service[];
  total: number;
}

export const useAllServices = (
  search?: string,
  category?: string | null,
  perPage: number = 20,
) => {
  return useQuery<AllServicesResult>({
    queryKey: ["services", "all", search ?? "", category ?? "", perPage],
    queryFn: () =>
      getAllServicesAllPages(
        search ?? undefined,
        category ?? undefined,
        perPage,
      ),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};
