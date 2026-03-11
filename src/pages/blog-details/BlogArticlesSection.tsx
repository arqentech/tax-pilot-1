import Badge from "@/components/ui/Badge";
import BlogCard from "@/components/ui/blogs/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/api/blogs";
import { useMemo } from "react";
import { stripHtml } from "@/lib/utils";

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
        const rawText =
          blog.description_short ??
          blog.description_long ??
          blog.description ??
          "";

        const cleanText = stripHtml(rawText);

        const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));

        return {
          tag: blog.category?.name ?? "",
          image: blog.image?.url ?? "",
          title: blog.title ?? "",
          description: cleanText,
          readTime: `${readTime} min di lettura`,
          slug:
            blog.identifier ??
            (typeof blog.url === "string"
              ? blog.url.replace(/^\/+|\/+$/g, "")
              : null) ??
            String(blog.id ?? ""),
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
            <p className="text-center text-[#5F6057]">
              Loading related articles…
            </p>
          ) : error ? (
            <p className="text-center text-[#5F6057]">
              Unable to load related articles.
            </p>
          ) : (
            <>
              <div className="block sm:hidden overflow-x-auto mr-4">
                <div className="flex gap-4 px-4">
                  {relatedBlogs.map((blog, index) => (
                    <div key={index} className="min-w-[300px]">
                      <BlogCard {...blog} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {relatedBlogs.map((blog, index) => (
                  <BlogCard key={index} {...blog} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
