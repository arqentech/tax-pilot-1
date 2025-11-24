import React, { useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import FilterButton from "../../components/ui/FilterButton";
import Categories from "../services/Categories";
import BlogCard from "@/components/ui/blogs/BlogCard";
import { blogData } from "@/data/BlogData";

const Blogs: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => {
      if (prev) setSelectedCategory(null);
      return !prev;
    });
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  const filteredBlogs = blogData.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory = selectedCategory
      ? blog.tag === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-10 mt-4 sm:mt-5 md:mt-6 flex justify-center min-h-screen px-4">
      <div className="w-full max-w-[1320px] flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="font-bricolage heading-base">The TaxPilot Blog</h1>
          <p className="mt-2">
            Tax news with TaxPilot: explore our blog for tips & insights.
          </p>
        </div>

        <div className="flex flex-row items-center justify-center gap-4 w-full">
          <SearchBar
            onSearch={setQuery}
            wrapperClass="w-full md:max-w-[725px] w-full"
          />
          <FilterButton onFilterClick={toggleFilter} />
        </div>
        <div className="mb-5">
          <Categories
            onSelect={handleCategorySelect}
            searchValue={query}
            isOpen={isFilterOpen}
            selectedCategory={selectedCategory}
          />
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center w-full pt-2">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <div
                key={index}
                className="min-w-[400px] lg:min-w-0 mr-6 last:mr-0 snap-center"
              >
                <BlogCard {...blog} />
              </div>
            ))
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
