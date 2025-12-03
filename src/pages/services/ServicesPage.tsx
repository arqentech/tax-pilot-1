import React, { useState, useEffect } from "react";
import SearchBar from "../../components/ui/SearchBar";
import ServiceCard from "../../components/ui/ServiceCard";
import FilterButton from "../../components/ui/FilterButton";

interface Service {
  id: number;
  title: string;
  description_short: string;
  price: number;
  image: {
    url: string;
  };
  categories: Array<{
    category: {
      title: string;
    };
  }>;
}

const ServicesPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => {
      if (prev === true) {
        setSelectedCategory(null);
      }
      return !prev;
    });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const filteredData = services.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesCategory = selectedCategory
      ? service.categories.some((cat) => cat.category.title === selectedCategory)
      : true;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="w-full md:py-16">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <p className="text-base">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full md:py-16">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <p className="text-base text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 t-4 sm:mt-5 md:mt-6 flex justify-center min-h-screen px-4">
      <div className="w-full max-w-[1320px] flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="font-bricolage heading-base">All Services</h1>
          <p className="mt-2">Below are our Services and Bonuses</p>
        </div>

        <div className="flex flex-row items-center justify-center gap-4  w-full">
          <SearchBar
            onSearch={setQuery}
            wrapperClass="w-[322px] md:w-[725px] w-full"
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

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-items-center w-full pt-2">
          {filteredData.length > 0 ? (
            filteredData.map((card, index) => (
              <ServiceCard key={index} {...card} />
            ))
          ) : (
            <div className="col-span-full text-center mt-6">
              <p className="text-base">No service found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;