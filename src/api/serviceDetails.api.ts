import { Service, RelatedServiceItem } from "@/types/services";
import { api } from "./axios";

/** API can return single service in results or list in results.data; normalize to one Service. */
function parseServiceResponse(res: { data: { results: unknown } }, slug: string): Service {
  const results = res.data.results as Record<string, unknown> | undefined;
  if (!results) throw new Error(`Service with identifier "${slug}" not found`);

  // Shape 1: single service — results is the service (id, identifier, title, categories, ...)
  const asService = results as unknown as Service;
  if (typeof asService.identifier === "string" && typeof asService.title === "string") {
    const relatedServices: RelatedServiceItem[] | Service[] =
      (asService.related_services as RelatedServiceItem[] | Service[] | undefined) ?? [];
    return { ...asService, related_services: relatedServices };
  }

  // Shape 2: list — results.data is array of services
  const data = results.data as Service[] | undefined;
  if (!Array.isArray(data)) throw new Error(`Service with identifier "${slug}" not found`);
  const service = data.find(
    (s) => s.identifier === slug || String(s.id) === slug
  );
  if (!service) throw new Error(`Service with identifier "${slug}" not found`);
  const relatedServices: RelatedServiceItem[] | Service[] =
    (service.related_services as RelatedServiceItem[] | Service[] | undefined) ?? [];
  return { ...service, related_services: relatedServices };
}

export const getServiceDetails = async (slug: string): Promise<Service> => {
  const res = await api.get(`/services`, { params: { identifier: slug } });
  return parseServiceResponse(res, slug);
};
