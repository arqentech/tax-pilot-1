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

  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsFilterOpen(false);
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
    <div className="mt-[84px] lg:mt-[92px] flex justify-center min-h-screen pb-16 px-4">
      <div className="w-full max-w-[1320px] flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="font-bricolage heading-base">All Services</h1>
          <p className="text-base mt-2">Below are our Services and Bonuses</p>
        </div>

        <div className="flex flex-row items-center justify-center gap-4 mb-10 w-full">
          <SearchBar
            onSearch={setQuery}
            wrapperClass="w-[322px] lg:w-[725px] w-full"
          />
          <FilterButton onFilterClick={toggleFilter} />
        </div>

        {isFilterOpen && <Categories onSelect={handleCategorySelect} />}

        <div
          className="
            grid gap-6 
            grid-cols-1 lg:grid-cols-2
            justify-items-center w-full
            overflow-y-auto max-h-[80vh] pt-2
          "
        >
          {filteredData.map((card, index) => (
            <ServiceCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
