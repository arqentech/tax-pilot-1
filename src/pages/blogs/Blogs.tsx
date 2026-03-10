import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "../../components/ui/SearchBar";
import FilterButton from "../../components/ui/FilterButton";
import BlogCard from "@/components/ui/blogs/BlogCard";
import Categories from "@/components/ui/Categories";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/api/blogs";
import { useCategories } from "@/hooks/useCategories";
import { CategoryOption } from "@/types/blogs";
import { stripHtml } from "@/lib/utils";

const BLOGS_PER_PAGE = 12;

const Blogs: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFilter = () => {
    if (isFilterOpen) {
      setSelectedCategory(null);
    }
    setIsFilterOpen((prev) => !prev);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const blogs = data?.results?.data ?? [];
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  const transformedBlogs = useMemo(() => {
    return safeBlogs
      .filter((blog) => blog && (blog.identifier || blog.id))
      .map((blog) => {
        const text = stripHtml(
          blog.description_short ??
            blog.description_long ??
            blog.description ??
            "",
        );
        const wordCount = text.split(" ").length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));
        return {
          tag: blog.category?.name ?? "",
          image: blog.image?.url ?? "",
          title: blog.title ?? "",
          description: text,
          readTime: `${readTime} min read`,
          slug:
            blog.identifier ??
            blog.url?.replace(/^\/+|\/+$/g, "") ??
            String(blog.id ?? ""),
          categoryId: blog.category?.identifier ?? blog.category?.url ?? "",
        };
      });
  }, [safeBlogs]);

  const { data: apiCategories = [] } = useCategories();

  const derivedCategories: CategoryOption[] = useMemo(() => {
    const seen = new Map<string, CategoryOption>();
    safeBlogs.forEach((blog) => {
      const cat = blog.category;
      const catId = cat?.identifier ?? cat?.url;
      if (cat && catId && !seen.has(catId)) {
        seen.set(catId, {
          id: cat.id ?? 0,
          identifier: catId,
          name: cat.name ?? catId,
        });
      }
    });
    return Array.from(seen.values());
  }, [safeBlogs]);

  const availableCategories: CategoryOption[] = useMemo(() => {
    const byId = new Map<string, CategoryOption>();
    derivedCategories.forEach((c) => byId.set(c.identifier, c));
    apiCategories.forEach((c) => {
      if (c.identifier && !byId.has(c.identifier))
        byId.set(c.identifier, {
          id: c.id,
          identifier: c.identifier,
          name: c.name ?? c.identifier,
        });
    });
    return Array.from(byId.values());
  }, [derivedCategories, apiCategories]);

  const filteredBlogs = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim();
    return transformedBlogs.filter((blog) => {
      const matchesCategory =
        !selectedCategory || blog.categoryId === selectedCategory;
      const matchesSearch =
        !lowerQuery ||
        blog.title.toLowerCase().includes(lowerQuery) ||
        (blog.description &&
          blog.description.toLowerCase().includes(lowerQuery));
      return matchesCategory && matchesSearch;
    });
  }, [transformedBlogs, selectedCategory, query]);

  const lastPage = Math.max(
    1,
    Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE),
  );
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    return filteredBlogs.slice(start, start + BLOGS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage((_prev) => Math.max(1, Math.min(lastPage, page)));
  };

  if (isLoading) return <p className="text-center mt-6">Loading blogs...</p>;
  if (error)
    return (
      <p className="text-center mt-6 text-red-500">Failed to load blogs</p>
    );

  return (
    <div className="w-full py-16 flex flex-col min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-6rem)]">
      <div className="flex flex-col items-center flex-1">
        <div className="text-center mb-8">
          <h1 className="font-bricolage heading-base">Il blog di TaxPilot</h1>
          <p className="mt-2 text-[#5F6057] text-[18px] md:text-[20px]">
            Cronache fiscali con taxpilot: esplora il nostro blog per scoprire
            novità, consigli e insight sulla gestione fiscale.
          </p>
        </div>

        <div className="flex w-full items-center gap-3 justify-center md:gap-4">
          <div className="w-full md:max-w-[720px]">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Cerca"
              value={query}
            />
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

        <div className="mt-6 flex-1">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 justify-items-center max-w-[900px] pt-4">
            {paginatedBlogs.length > 0 ? (
              paginatedBlogs.map((blog) => (
                <BlogCard key={blog.slug} {...blog} />
              ))
            ) : (
              <div className="col-span-full text-center mt-6">
                <p className="text-base">No blog found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 pb-4 flex flex-wrap items-center justify-center gap-3 ">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Pagina precedente"
          className="p-2.5 text-[#34352E] disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#5F6057] transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="px-4 py-2 text-[18px] text-[#34352E]">
          Pagina {currentPage} di {lastPage}
        </span>
        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= lastPage}
          aria-label="Pagina successiva"
          className="text-[#34352E] disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#5F6057] transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Blogs;
