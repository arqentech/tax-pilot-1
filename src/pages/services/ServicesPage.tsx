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
    <div className=" mt-4 sm:mt-5 md:mt-6 flex justify-center min-h-screen px-4">
      <div className="w-full max-w-[1320px] flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="font-bricolage heading-base">All Services</h1>
          <p className=" mt-2">Below are our Services and Bonuses</p>
        </div>

        <div className="flex flex-row items-center justify-center gap-4 mb-10 w-full">
          <SearchBar
            onSearch={setQuery}
            wrapperClass="w-[322px] md:w-[725px] w-full"
          />
          <FilterButton onFilterClick={toggleFilter} />
        </div>

        {isFilterOpen && <Categories onSelect={handleCategorySelect} />}

        <div
          className="
            grid gap-6 
            grid-cols-1 md:grid-cols-2 lg:grid-cols-2
            justify-items-center w-full
            pt-2
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


