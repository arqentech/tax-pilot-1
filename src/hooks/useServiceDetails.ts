import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceDetails } from "../api/serviceDetails.api";
import type { Service } from "@/types/services";

/**
 * Optimized hook that tries to get service from cached services list first
 * before making a separate API call
 */
export const useServiceDetails = (slug: string) => {
  const queryClient = useQueryClient();

  return useQuery<Service>({
    queryKey: ["service", slug],
    queryFn: async () => {
      // Try to get from cached services list first (more efficient)
      const cachedServices = queryClient.getQueryData<Service[]>(["services"]);
      if (cachedServices) {
        const service = cachedServices.find(
          (s) => s.identifier === slug || String(s.id) === slug
        );
        if (service) {
          return service;
        }
      }

      // Fallback to API call if not in cache
      return getServiceDetails(slug);
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes (longer than services list)
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  });
};
