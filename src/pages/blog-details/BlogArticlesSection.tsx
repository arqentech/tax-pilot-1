import Badge from "@/components/ui/Badge";
import BlogList from "@/components/ui/blogs/BlogList";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/api/blogs";
import { useMemo } from "react";

export default function BlogArticlesSection() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const relatedBlogs = useMemo(() => {
    const blogs = data?.results?.data ?? [];
    const list = Array.isArray(blogs) ? blogs : [];
    return list
      .filter((blog) => blog && (blog.identifier || blog.id))
      .slice(0, 3)
      .map((blog) => {
        const text = blog.description_short ?? blog.description_long ?? "";
        const wordCount = (text || "").split(/\s+/).filter(Boolean).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));
        return {
          tag: blog.category?.name ?? "",
          image: blog.image?.url ?? "",
          title: blog.title ?? "",
          description: text,
          readTime: `${readTime} min di lettura`,
          slug: blog.identifier ?? String(blog.id ?? ""),
        };
      });
  }, [data?.results?.data]);

  return (
    <div className="w-full full-bleed bg-[#FBFBFA] flex flex-col items-center py-16">
      <div className="w-full text-center max-w-[1320px]">
        <Badge text="Blog" width="78px" center />

        <h2 className="heading-base py-4">Articoli Correlati</h2>

        <div className="w-full mt-14">
          {isLoading ? (
            <p className="text-center text-[#5F6057]">Loading related articles…</p>
          ) : error ? (
            <p className="text-center text-[#5F6057]">Unable to load related articles.</p>
          ) : (
            <BlogList blogs={relatedBlogs} />
          )}
        </div>
      </div>
    </div>
  );
}
