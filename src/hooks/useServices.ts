import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../api/services.api";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
    staleTime: 5 * 60 * 1000,
  });
};
