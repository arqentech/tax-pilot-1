import React from "react";

interface FilterButtonProps {
  onFilterClick?: () => void;
  className?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  onFilterClick,
  className = "",
}) => {
  return (
    <button
      onClick={onFilterClick}
      className={`
        flex items-center justify-center 
        bg-[#34352E] 
        rounded-full 
        h-[64px] px-4
        w-[64px]
        lg:w-[129px]
        hover:bg-[#2a2b26] 
        transition-colors
        ${className}
      `}
    >
      <img
        src="/svg/filter-funnel.svg"
        alt="Filter"
        className="w-5 h-5 lg:w-6 lg:h-6"
      />
      <span className="text-[20px] leading-[25px] text-[#F1F1EC] hidden font-medium hidden lg:inline ml-2">
        Filter
      </span>
    </button>
  );
};

export default FilterButton;
