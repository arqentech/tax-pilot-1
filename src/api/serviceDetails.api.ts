import { Service, RelatedServiceItem } from "@/types/services";
import { api } from "./axios";

export const getServiceDetails = async (slug: string): Promise<Service> => {
  const res = await api.get(`/services`, { params: { identifier: slug } });
  const services = res.data.results.data as Service[];
  const service = services.find(
    (s) => s.identifier === slug || String(s.id) === slug
  );
  if (!service) throw new Error(`Service with identifier "${slug}" not found`);

  let relatedServices: RelatedServiceItem[] | Service[] = [];
  
  if ((service as any).related_services) {
    relatedServices = (service as any).related_services;
  } else if (res.data.results?.related_services) {
    relatedServices = res.data.results.related_services;
  } else if (res.data.related_services) {
    relatedServices = res.data.related_services;
  }
  
  
  service.related_services = relatedServices;
  
  return service;
};
