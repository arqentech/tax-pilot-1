import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceDetails } from "../api/serviceDetails.api";
import type { Service } from "@/types/services";


export const useServiceDetails = (slug: string) => {
  const queryClient = useQueryClient();

  return useQuery<Service>({
    queryKey: ["service", slug],
    queryFn: async () => {
     
      return getServiceDetails(slug);
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, 
    gcTime: 30 * 60 * 1000,
  });
};
