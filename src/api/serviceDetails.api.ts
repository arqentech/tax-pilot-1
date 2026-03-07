import { Service, RelatedServiceItem } from "@/types/services";
import { api } from "./axios";

const normalizeSlug = (s: string) =>
  s
    .replace(/^\/+|\/+$/g, "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-");

function slugMatches(serviceIdentifier: string | undefined, slug: string): boolean {
  if (!serviceIdentifier) return false;
  return normalizeSlug(serviceIdentifier) === normalizeSlug(slug);
}

function toService(raw: Record<string, unknown>): Service {
  const relatedServices: RelatedServiceItem[] | Service[] =
    (raw.related_services as RelatedServiceItem[] | Service[] | undefined) ?? [];
  return { ...raw, related_services: relatedServices } as Service;
}

function parseServiceResponse(res: { data: { results: unknown } }, slug: string): Service {
  const results = res.data.results as Record<string, unknown> | undefined;
  if (!results) throw new Error(`Service with identifier "${slug}" not found`);

  const slugNorm = normalizeSlug(slug);

  const asService = results as unknown as Service;
  if (typeof asService.identifier === "string" && typeof asService.title === "string") {
    if (slugMatches(asService.identifier, slug)) return toService(results as Record<string, unknown>);
  }

  const data = results.data;
  if (Array.isArray(data)) {
    const service = (data as Service[]).find(
      (s) => slugMatches(s.identifier, slug) || String(s.id) === slugNorm,
    );
    if (service) return toService(service as unknown as Record<string, unknown>);
    throw new Error(`Service with identifier "${slug}" not found`);
  }

  if (data && typeof data === "object" && !Array.isArray(data)) {
    const single = data as Record<string, unknown>;
    const id = single.identifier as string | undefined;
    if (id && slugMatches(id, slug)) return toService(single);
  }

  throw new Error(`Service with identifier "${slug}" not found`);
}

const MAX_PAGES_TO_SEARCH = 10;

async function findServiceInList(slugNorm: string): Promise<Service> {
  for (let page = 1; page <= MAX_PAGES_TO_SEARCH; page++) {
    const res = await api.get<{ results?: { data?: Service[]; last_page?: number } }>("/services", {
      params: { page, per_page: 20 },
    });
    const data = res.data?.results?.data;
    if (!Array.isArray(data)) break;
    const found = data.find((s) => slugMatches(s.identifier, slugNorm));
    if (found) return toService(found as unknown as Record<string, unknown>);
    const lastPage = res.data?.results?.last_page ?? 1;
    if (page >= lastPage) break;
  }
  throw new Error(`Service with identifier "${slugNorm}" not found`);
}

export const getServiceDetails = async (slug: string): Promise<Service> => {
  const slugNorm = slug.replace(/^\/+|\/+$/g, "").trim();
  if (!slugNorm) throw new Error("Service identifier is required");

  const tryByQuery = async (param: "identifier" | "slug"): Promise<Service> => {
    const res = await api.get(`/services`, { params: { [param]: slugNorm } });
    return parseServiceResponse(res, slugNorm);
  };

  const tryByPath = async (): Promise<Service> => {
    const res = await api.get(`/services/${encodeURIComponent(slugNorm)}`);
    return parseServiceResponse(res, slugNorm);
  };

  const notFound = (e: unknown) =>
    (e instanceof Error && e.message.includes("not found")) ||
    (e && typeof e === "object" && "response" in e && (e as { response?: { status?: number } }).response?.status === 404);

  try {
    return await tryByQuery("identifier");
  } catch (e1) {
    if (!notFound(e1)) throw e1;
    try {
      return await tryByQuery("slug");
    } catch (e2) {
      if (!notFound(e2)) throw e2;
      try {
        return await tryByPath();
      } catch (e3) {
        if (!notFound(e3)) throw e3;
        try {
          return await findServiceInList(slugNorm);
        } catch {
          throw e1;
        }
      }
    }
  }
};
