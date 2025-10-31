import React, { useState } from "react";
import { cardData } from "../../data/CardData";
import SearchBar from "../../components/ui/SearchBar";
import ServiceCard from "../../components/ui/ServiceCard";

const ServicesPage: React.FC = () => {
  const [query, setQuery] = useState("");

  const filteredData = cardData.filter((card) =>
    card.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex justify-center bg-white min-h-screen pt-[100px] lg:pt-[120px] pb-16 px-4">
      <div className="w-full max-w-[1320px] flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="font-bricolage font-extrabold text-[28px] lg:text-[40px] text-[#34352E]">
            All Services
          </h1>
          <p className="text-gray-600 text-sm lg:text-base mt-2">
            Below are our Services and Bonuses
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full">
          <SearchBar onSearch={setQuery} />
        </div>

        <div
          className="
            grid gap-6 
            grid-cols-1 lg:grid-cols-2
            justify-items-center w-full
          "
        >
          {filteredData.map((card, index) => (
            <ServiceCard key={index} {...card} />
          ))}
        </div>

        {/* ===== Show More Button ===== */}
        <div className="mt-10">
          <button className="bg-[#E6E6E1] text-[#34352E] font-semibold rounded-full px-8 py-3 hover:bg-[#dcdcd8] transition">
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
