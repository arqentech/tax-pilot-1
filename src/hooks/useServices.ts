import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getAllServices,
  type ServicesPaginationResult,
} from "../api/services.api";

export const useServices = (
  page: number = 1,
  search?: string,
  category?: string | null,
) => {
  return useQuery<ServicesPaginationResult>({
    queryKey: ["services", page, search ?? "", category ?? ""],
    queryFn: () => getAllServices(page, search ?? undefined, category ?? undefined),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};
