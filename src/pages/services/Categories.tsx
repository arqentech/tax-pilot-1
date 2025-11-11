import React from "react";
import { categoriesData } from "../../data/CategoriesData";

interface CategoriesProps {
  onSelect: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onSelect }) => {
  return (
    <div className="w-[400px] lg:w-[874px] border border-[#E6E6E1] rounded-[32px] p-4 flex flex-wrap gap-3 mt-4">
      {categoriesData.map((cat, i) => (
        <button
          key={i}
          onClick={() => onSelect(cat)}
          className="px-4 py-2 bg-[#F1F1EC] rounded-full text-gray-700 text-sm hover:bg-gray-200 transition"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Categories;
