import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceDetails } from "../api/serviceDetails.api";
import type { Service } from "@/types/services";


export const useServiceDetails = (slug: string) => {
  const queryClient = useQueryClient();

  return useQuery<Service>({
    queryKey: ["service", slug],
    queryFn: async () => {
      const cachedServices = queryClient.getQueryData<Service[]>(["services"]);
      if (cachedServices) {
        const service = cachedServices.find(
          (s) => s.identifier === slug || String(s.id) === slug
        );
        if (service) {
          return service;
        }
      }

      return getServiceDetails(slug);
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, 
    gcTime: 30 * 60 * 1000,
  });
};
