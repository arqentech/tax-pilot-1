import React from "react";

interface FilterButtonProps {
  onFilterClick?: () => void;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  onFilterClick,
  size = "md",
  showText = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-[48px] px-3 py-1.5 gap-1.5",
    md: "h-[64px] px-4 py-2 gap-2",
    lg: "h-[72px] px-5 py-2.5 gap-2",
  };

  const iconClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5 lg:w-6 lg:h-6",
    lg: "w-6 h-6 lg:w-7 lg:h-7",
  };

  const textClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <button
      onClick={onFilterClick}
      className={`
        flex items-center justify-center 
        bg-[#34352E] 
        rounded-full 
        text-sm font-semibold 
        hover:bg-[#2a2b26] 
        transition-colors
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <img
        src="/svg/filter-funnel.svg"
        alt="Filter"
        className={`${iconClasses[size]}`}
      />
      {showText && (
        <span className={`text-[#F1F1EC] ${textClasses[size]} hidden lg:inline`}>
          Filter
        </span>
      )}
    </button>
  );
};

export default FilterButton;

