import { useQuery } from "@tanstack/react-query";
import { getServiceDetails } from "../api/serviceDetails.api";
import type { Service } from "@/types/services";

export const useServiceDetails = (slug: string) => {
  return useQuery<Service>({
    queryKey: ["service", slug],
    queryFn: () => getServiceDetails(slug),
    enabled: !!slug,
  });
};
