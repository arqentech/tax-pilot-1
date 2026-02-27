import { Blog, CategoryOption } from "@/types/blogs";
import { api } from "./axios";

function isHtmlResponse(data: unknown): boolean {
  return (
    typeof data === "string" &&
    data.trim().toLowerCase().startsWith("<!doctype")
  );
}

export const getBlogs = async (): Promise<{ results: { data: Blog[] } }> => {
  const response = await api.get("/blog/list");
  const data = response.data;

  if (isHtmlResponse(data)) {
    throw new Error(
      "Server returned HTML. Check API base URL and /blog/list endpoint."
    );
  }

  const raw = data as Record<string, unknown>;
  const results = raw?.results as Record<string, unknown> | undefined;
  const list: Blog[] = Array.isArray(results?.data)
    ? (results.data as Blog[])
    : Array.isArray(raw?.data)
      ? (raw.data as Blog[])
      : Array.isArray(raw?.results)
        ? (raw.results as Blog[])
        : [];

  return { results: { data: list } };
};

interface CategoriesApiResponse {
  status?: string;
  code?: number;
  message?: string;
  results?: {
    data?: CategoryOption[];
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
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};
