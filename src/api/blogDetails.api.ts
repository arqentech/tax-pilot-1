import { api } from "./axios";
import { getBlogs } from "./blogs";

const cleanSlug = (s: string) => s.replace(/^\/+|\/+$/g, "");

export const getBlogBySlug = async (slug: string) => {
  const pathSlug = cleanSlug(slug);
  const normalizedId = pathSlug.startsWith("/") ? pathSlug : `/${pathSlug}`;

  const { results } = await getBlogs();
  const list = results?.data ?? [];
  const blog = list.find(
    (b: { id?: number; identifier?: string }) =>
      b.identifier === normalizedId ||
      b.identifier === pathSlug ||
      (b.identifier && b.identifier.replace(/^\/+/, "") === pathSlug),
  );

  if (!blog?.id) {
    throw new Error(`Blog not found: ${slug}`);
  }

  const response = await api.get(`/blog/${blog.id}`);
  const data = response.data;
  if (data?.results) return data.results;
  if (data?.data) return data.data;
  throw new Error("Invalid blog response");
};
