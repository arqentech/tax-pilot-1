import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getAllServices,
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
