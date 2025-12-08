import { Service } from "@/types/services";
import { api } from "./axios";

export const getServiceDetails = async (slug: string): Promise<Service> => {
  const res = await api.get(`/services`, { params: { identifier: slug } });
  const services = res.data.results.data as Service[];
  const service = services.find(
    (s) => s.identifier === slug || String(s.id) === slug
  );
  if (!service) throw new Error(`Service with identifier "${slug}" not found`);
  return service;
};
