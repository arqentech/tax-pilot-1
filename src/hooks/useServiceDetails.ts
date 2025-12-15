import { useMemo } from "react";
import { useServices } from "./useServices";
import type { Service } from "@/types/services";

export const useServiceDetails = (slug: string) => {
  const { data: services = [], isLoading, isError, error } = useServices();

  const service = useMemo(() => {
    if (!slug || !services.length) return undefined;
    
    return services.find(
      (s: Service) => s.identifier === slug || String(s.id) === slug
    );
  }, [services, slug]);

  return {
    data: service,
    isLoading,
    isError: isError || (!isLoading && !service && !!slug),
    error: error || (!service && slug ? new Error(`Service with identifier "${slug}" not found`) : undefined),
  };
};
