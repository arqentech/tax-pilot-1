import React, { useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import FilterButton from "../../components/ui/FilterButton";
import BlogCard from "@/components/ui/blogs/BlogCard";
import { blogData } from "@/data/BlogData";
import Categories from "../services/Categories";

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
    <div className="py-10 mt-4 sm:mt-5 md:mt-6 flex justify-center min-h-screen ">
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="font-bricolage heading-base">The TaxPilot Blog .</h1>
          <p className="mt-2">
            Tax news with taxpilot: explore our blog for news, tips, and
            insights on tax management.
          </p>
        </div>

        <div className="flex w-full items-center gap-3 justify-center md:gap-4">
          <div className="w-full md:max-w-[720px]">
            <SearchBar onSearch={setQuery} />
          </div>
          <FilterButton onFilterClick={toggleFilter} />
        </div>
        {/* <div className="mb-5">
          <Categories
            onSelect={handleCategorySelect}
            searchValue={query}
            isOpen={isFilterOpen}
            selectedCategory={selectedCategory}
          />
        </div> */}

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center w-full pt-2">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <div key={index}>
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
