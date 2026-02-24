import React from "react";
import SearchBar from "@/components/ui/SearchBar";
import RequestsFilterDropdown from "./RequestsFilterDropdown";

interface SearchAndFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  filterItems: string[];
  selectedFilter: string;
  onFilterChange: (item: string) => void;
  searchBarClassName?: string;
  filterTriggerClass?: string;
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search",
  filterItems,
  onFilterChange,
  searchBarClassName,
  filterTriggerClass = "text-[18px] h-[48px] w-[90px]",
}) => {
  return (
    <div className="flex flex-row gap-2 items-center justify-end overflow-hidden">
      <div className="min-w-0 overflow-hidden max-w-[352px]">
        <SearchBar
          onSearch={onSearchChange}
          value={searchQuery}
          placeholder={searchPlaceholder}
          wrapperClass={`h-[48px] w-full max-w-[352px] placeholder:text-[#A4A59F] bg-[#ffffff] border border-[#E6E6E1] ${searchBarClassName || ""}`}
          className="text-[18px] text-[#A4A59F] placeholder:text-[#A4A59F]"
        />
      </div>

      <div className="flex-shrink-0 relative z-10">
        <RequestsFilterDropdown
          items={filterItems}
          onSelect={onFilterChange}
          triggerClass={filterTriggerClass}
        />
      </div>
    </div>
  );
};
