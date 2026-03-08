import React from "react";

export interface GenericCategoryItem {
  id?: number | string;
  identifier: string;
  name?: string;
  title?: string;
}

interface CategoriesProps {
  categories: GenericCategoryItem[];
  selectedCategory: string | null;
  onSelect: (categoryIdentifier: string) => void;
  isOpen: boolean;
  searchValue?: string;
  isLoading?: boolean;
}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  selectedCategory,
  onSelect,
  isOpen,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="w-full max-w-[874px] border border-[#E6E6E1] rounded-[32px] p-4 flex flex-wrap gap-3 mt-4">
      {isLoading ? (
        <p className="text-gray-500 text-sm">Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500 text-sm">No category found</p>
      ) : (
        categories.map((cat) => (
          <button
            key={cat.id ?? cat.identifier}
            type="button"
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
            {cat.name ?? cat.title ?? cat.identifier}
          </button>
        ))
      )}
    </div>
  );
};

export default Categories;
