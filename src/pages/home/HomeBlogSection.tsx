import Badge from "@/components/ui/Badge";
import BlogCard from "@/components/ui/blogs/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/api/blogs";
import { useMemo } from "react";
import { stripHtml } from "@/lib/utils";

export default function HomeBlogSection() {
  const visibleBlogs = 3;

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const blogs = useMemo(() => {
    const list = data?.results?.data ?? [];
    if (!Array.isArray(list)) return [];
    return list
      .filter((blog) => blog && (blog.identifier || blog.id))
      .slice(0, visibleBlogs)
      .map((blog) => {
        const rawText = blog.description_short ?? blog.description_long ?? "";
        const cleanText = stripHtml(rawText);
        const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));
        return {
          tag: blog.category?.name ?? "",
          image: blog.image?.url ?? "",
          title: blog.title ?? "",
          description: cleanText,
          readTime: `${readTime} min read`,
          slug: blog.identifier ?? String(blog.id ?? ""),
        };
      });
  }, [data?.results?.data]);

  return (
    <section className="w-full full-bleed bg-[#FBFBFA] flex flex-col items-center py-16">
      <div className="w-full text-center max-w-[1320px] px-4">
        <Badge text="Blog" width="78px" center bgColor="#FFFFFF" />

        <h2 className="font-bricolage heading-base mt-6 md:mt-2">
          <span className="block lg:inline">Il Blog di TaxPilot</span>{" "}
        </h2>

        <p className="text-base max-w-[660px] mx-auto">
          Cronache fiscali con taxpilot: esplora il nostro blog per scoprire
          novità, consigli e insight sulla gestione fiscale.
        </p>

        <div className="block sm:hidden overflow-x-auto mt-14">
          <div className="flex gap-4">
            {blogs.map((blog, index) => (
              <div key={index} className="min-w-[300px]">
                <BlogCard {...blog} />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>

        {isLoading && (
          <p className="text-center text-[#5F6057] mt-4">Loading blogs…</p>
        )}
        {error && (
          <p className="text-center text-[#5F6057] mt-4">
            Unable to load blogs.
          </p>
        )}
      </div>
    </section>
  );
}
