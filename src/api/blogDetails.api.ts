import { api } from "./axios";
import { getBlogs } from "./blogs";

const cleanSlug = (s: string) => s.replace(/^\/+|\/+$/g, "").trim();

function slugMatches(blogIdentifier: string | undefined, pathSlug: string): boolean {
  if (!blogIdentifier) return false;
  const normalized = blogIdentifier.replace(/^\/+|\/+$/g, "").toLowerCase();
  const pathNorm = pathSlug.toLowerCase();
  return normalized === pathNorm || `/${normalized}` === `/${pathNorm}`;
}

export const getBlogBySlug = async (slug: string) => {
  const pathSlug = cleanSlug(slug);
  if (!pathSlug) throw new Error("Blog not found: empty slug");

  const { results } = await getBlogs();
  const list = results?.data ?? [];
  const blog = list.find((b: { id?: number; identifier?: string; url?: string }) => {
    if (!b?.id) return false;
    if (slugMatches(b.identifier, pathSlug) || slugMatches(b.url, pathSlug))
      return true;
    const urlSlug = b.url?.replace(/^\/+|\/+$/g, "").split("/").pop();
    return urlSlug != null && slugMatches(urlSlug, pathSlug);
  });

  if (!blog?.id) {
    throw new Error(`Blog not found: ${slug}`);
  }

  const response = await api.get(`/blog/${blog.id}`);
  const data = response.data as Record<string, unknown>;
  const apiResults = data?.results;
  if (apiResults != null && typeof apiResults === "object" && !Array.isArray(apiResults)) {
    const inner = apiResults as Record<string, unknown>;
    if (inner.data != null) return inner.data;
    return apiResults;
  }
  if (data?.data != null) return data.data;
  throw new Error("Invalid blog response");
};
