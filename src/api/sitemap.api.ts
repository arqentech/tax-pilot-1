import { api } from "./axios";

export interface SitemapLinkItem {
  label: string;
  link: string;
}

export const getSitemapLinks = async (): Promise<SitemapLinkItem[]> => {
  try {
    const { data } = await api.get("/link-sitemap-site");

    if (typeof data === "string") return [];

    const list = Array.isArray(data)
      ? data
      : Array.isArray((data as { results?: unknown[] })?.results)
        ? (data as { results: unknown[] }).results
        : ((data as { results?: { data?: unknown[] } })?.results?.data ?? []);

    return list
      .filter(
        (item: unknown): item is SitemapLinkItem =>
          typeof item === "object" &&
          item !== null &&
          typeof (item as SitemapLinkItem).label === "string" &&
          typeof (item as SitemapLinkItem).link === "string",
      )
      .map((item: SitemapLinkItem) => ({ label: item.label, link: item.link }));
  } catch (error: unknown) {
    console.error("Failed to fetch sitemap links", error);
    return [];
  }
};
