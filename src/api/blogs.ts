import { Blog, CategoryOption } from "@/types/blogs";
import { api } from "./axios";

function isHtmlResponse(data: unknown): boolean {
  return (
    typeof data === "string" &&
    data.trim().toLowerCase().startsWith("<!doctype")
  );
}

function parseBlogList(data: unknown): Blog[] {
  if (isHtmlResponse(data)) {
    throw new Error(
      "Server returned HTML. Check API base URL and /blog/list endpoint.",
    );
  }
  const raw = data as Record<string, unknown>;
  const results = raw?.results as Record<string, unknown> | undefined;
  if (Array.isArray(results?.data)) return results.data as Blog[];
  if (Array.isArray(raw?.data)) return raw.data as Blog[];
  if (Array.isArray(raw?.results)) return raw.results as Blog[];
  if (results && Array.isArray(results)) return results as Blog[];
  return [];
}

export const getBlogs = async (): Promise<{ results: { data: Blog[] } }> => {
  const response = await api.get("/blog/list");
  const list = parseBlogList(response.data);
  return { results: { data: list } };
};

interface RawCategoryItem {
  id: number;
  name: string;
  url?: string;
  identifier?: string;
  [key: string]: unknown;
}

interface CategoriesApiResponse {
  status?: string;
  code?: number;
  message?: string;
  results?: {
    data?: RawCategoryItem[];
    current_page?: number;
    last_page?: number;
    total?: number;
  };
}

export const fetchBlogCategories = async (): Promise<CategoryOption[]> => {
  try {
    const response = await api.get<CategoriesApiResponse>("/blog/categories");
    const data = response.data;
    if (isHtmlResponse(data)) return [];
    const results = (data as CategoriesApiResponse).results;
    const list = results?.data;
    if (!Array.isArray(list)) return [];
    return list
      .filter((item) => item && (item.url != null || item.identifier != null))
      .map((item) => ({
        id: item.id,
        identifier: (item.identifier ?? item.url ?? "").toString(),
        name: item.name ?? (item.url ?? item.identifier ?? "").toString(),
      }));
  } catch {
    return [];
  }
};
