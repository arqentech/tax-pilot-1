import React, { useState, useMemo } from "react";
import SearchBar from "../../components/ui/SearchBar";
import FilterButton from "../../components/ui/FilterButton";
import BlogCard from "@/components/ui/blogs/BlogCard";
import Categories from "@/components/ui/Categories";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/api/blogs";
import { CategoryOption } from "@/types/blogs";

const Blogs: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    if (isFilterOpen) {
      setSelectedCategory(null);
    }
    setIsFilterOpen((prev) => !prev);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const blogs = data?.results?.data ?? [];
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  function stripHtml(html: string | undefined): string {
    if (!html) return "";
    return html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  const transformedBlogs = useMemo(() => {
    return safeBlogs
      .filter((blog) => blog && (blog.identifier || blog.id))
      .map((blog) => {
        const text = stripHtml(blog.description_short ?? blog.description_long);
        const wordCount = text.split(" ").length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));
        return {
          tag: blog.category?.name ?? "",
          image: blog.image?.url ?? "",
          title: blog.title ?? "",
          description: text, // now cleaned
          readTime: `${readTime} min read`,
          slug: blog.identifier ?? String(blog.id ?? ""),
          categoryId: blog.category?.identifier ?? "",
        };
      });
  }, [safeBlogs]);

  const derivedCategories: CategoryOption[] = useMemo(() => {
    const seen = new Map<string, CategoryOption>();
    safeBlogs.forEach((blog) => {
      const cat = blog.category;
      if (cat?.identifier && !seen.has(cat.identifier)) {
        seen.set(cat.identifier, {
          id: cat.id ?? 0,
          identifier: cat.identifier,
          name: cat.name ?? cat.identifier,
        });
      }
    });
    return Array.from(seen.values());
  }, [safeBlogs]);

  const availableCategories: CategoryOption[] = derivedCategories;

  const filteredBlogs = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim();
    return transformedBlogs.filter((blog) => {
      const matchesCategory =
        !selectedCategory || blog.categoryId === selectedCategory;
      const matchesSearch =
        !lowerQuery || blog.title.toLowerCase().includes(lowerQuery);
      return matchesCategory && matchesSearch;
    });
  }, [transformedBlogs, selectedCategory, query]);

  if (isLoading) return <p className="text-center mt-6">Loading blogs...</p>;
  if (error)
    return (
      <p className="text-center mt-6 text-red-500">Failed to load blogs</p>
    );

  return (
    <div className="py-10 mt-4 sm:mt-5 md:mt-6 flex justify-center min-h-screen ">
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="font-bricolage heading-base">Il blog di TaxPilot</h1>
          <p className="mt-2 text-[#5F6057] text-[18px] md:text-[20px]">
            Cronache fiscali con taxpilot: esplora il nostro blog per scoprire
            novità, consigli e insight sulla gestione fiscale.
          </p>
        </div>

        <div className="flex w-full items-center gap-3 justify-center md:gap-4">
          <div className="w-full md:max-w-[720px]">
            <SearchBar onSearch={setQuery} placeholder="Cerca" value={query} />
          </div>
          <FilterButton onFilterClick={toggleFilter} />
        </div>

        <div className="mt-5 w-full max-w-[980px]">
          <Categories
            categories={availableCategories}
            onSelect={handleCategorySelect}
            searchValue={query}
            isOpen={isFilterOpen}
            selectedCategory={selectedCategory}
            isLoading={isLoading}
          />
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center w-full pt-4">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => <BlogCard key={blog.slug} {...blog} />)
          ) : (
            <div className="col-span-full text-center mt-6">
              <p className="text-base">No blog found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
