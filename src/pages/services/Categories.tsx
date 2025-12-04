import React from "react";

export interface CategoryOption {
  identifier: string;
  title: string;
}

interface CategoriesProps {
  categories: CategoryOption[];
  onSelect: (categoryIdentifier: string) => void;
  searchValue: string;
  isOpen: boolean;
  selectedCategory: string | null;
}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  onSelect,
  searchValue,
  isOpen,
  selectedCategory,
}) => {
  if (!isOpen) return null;

  const normalizedSearch = searchValue.trim().toLowerCase();
  const filtered = categories.filter((cat) =>
    cat.title.toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="w-full max-w-[874px] border border-[#E6E6E1] rounded-[32px] p-4 flex flex-wrap gap-3 mt-4">
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">No category found</p>
      ) : (
        filtered.map((cat) => (
          <button
            key={cat.identifier}
            onClick={() => onSelect(cat.identifier)}
            className={`
              px-4 py-2 rounded-full text-sm transition
              ${
                selectedCategory === cat.identifier
                  ? "bg-[#037BFF] text-white"
                  : "bg-[#F1F1EC] text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {cat.title}
          </button>
        ))
      )}
    </div>
  );
};

export default Categories;
