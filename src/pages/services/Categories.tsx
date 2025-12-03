import React from "react";
import { categoriesData } from "../../data/CategoriesData";

interface CategoriesProps {
  onSelect: (category: string) => void;
  searchValue: string;
  isOpen: boolean;
  selectedCategory: string | null;
}

const Categories: React.FC<CategoriesProps> = ({
  onSelect,
  searchValue,
  isOpen,
  selectedCategory,
}) => {
  if (!isOpen) return null;

  const filtered = categoriesData.filter((cat) =>
    cat.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="w-full max-w-[874px] border border-[#E6E6E1] rounded-[32px] p-4 flex flex-wrap gap-3 mt-4">
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">No category found</p>
      ) : (
        filtered.map((cat, i) => (
          <button
            key={i}
            onClick={() => onSelect(cat)}
            className={`
              px-4 py-2 rounded-full text-sm transition
              ${
                selectedCategory === cat
                  ? "bg-[#037BFF] text-white"
                  : "bg-[#F1F1EC] text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {cat}
          </button>
        ))
      )}
    </div>
  );
};

export default Categories;
