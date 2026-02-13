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
    <div className="flex flex-row gap-2 items-center w-full">
      <div className="flex-1 min-w-0">
        <SearchBar
          onSearch={onSearchChange}
          value={searchQuery}
          placeholder={searchPlaceholder}
          wrapperClass={`h-[48px] w-full !placeholder:text-[#A4A59F] text-[#A4A59F] ${searchBarClassName || ""}`}
        />
      </div>

      <div className="flex-shrink-0">
        <RequestsFilterDropdown
          items={filterItems}
          onSelect={onFilterChange}
          triggerClass={filterTriggerClass}
        />
      </div>
    </div>
  );
};
