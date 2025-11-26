import React, { useState } from "react";
import { cardData } from "../../data/CardData";
import SearchBar from "../../components/ui/SearchBar";
import ServiceCard from "../../components/ui/ServiceCard";
import FilterButton from "../../components/ui/FilterButton";
import Categories from "./Categories";

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

  const filteredData = cardData.filter((card) => {
    const matchesSearch = card.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesCategory = selectedCategory
      ? card.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="full-bleed bg-[#FBFBFA]">
      <div className="global-container flex min-h-screen flex-col items-center px-4 pb-12 pt-8 md:pb-16 md:pt-12">
        <div className="mb-8 text-center">
          <h1 className="font-bricolage heading-base">All Services</h1>
          <p className="mt-2 text-base">Below are our Services and Bonuses</p>
        </div>

        <div className="flex w-full  items-center gap-3 flex-row justify-center md:gap-4">
          <div className="w-full md:max-w-[720px]">
            <SearchBar onSearch={setQuery} />
          </div>
          <FilterButton onFilterClick={toggleFilter} />
        </div>

        <div className="mt-5 w-full max-w-[980px]">
          <Categories
            onSelect={handleCategorySelect}
            searchValue={query}
            isOpen={isFilterOpen}
            selectedCategory={selectedCategory}
          />
        </div>

        <div className="mt-6 w-full">
          <div className="grid max-h-[calc(100vh-320px)] grid-cols-1 gap-6 overflow-y-auto pb-4 md:grid-cols-2 lg:grid-cols-2">
            {filteredData.length > 0 ? (
              filteredData.map((card, index) => (
                <ServiceCard key={index} {...card} />
              ))
            ) : (
              <div className="col-span-full mt-6 text-center">
                <p className="text-base">No service found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
