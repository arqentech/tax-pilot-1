import React from "react";
import { Search, X } from "lucide-react";
import { useMediaQuery } from "react-responsive";

interface SearchBarProps {
  onSearch: (query: string) => void;
  value?: string;
  className?: string;
  wrapperClass?: string;
  placeholder?: string;
  showClear?: boolean;
  shortcutHint?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  value = "",
  className = "",
  wrapperClass = "",
  placeholder,
  showClear = false,
  shortcutHint,
}) => {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const autoPlaceholder = isLargeScreen ? "Search" : "Search for a service";
  const hasValue = value.length > 0;

  return (
    <div
      className={`flex items-center gap-3 bg-[#F9F9F7] border border-[#E6E6E1] rounded-full h-[64px] px-4 shadow-sm min-w-[50px] max-w-full w-full ${wrapperClass}`}
    >
      <Search className="w-6 h-6 text-[#A4A59F] flex-shrink-0" />
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        value={value}
        placeholder={placeholder ?? autoPlaceholder}
        className={`flex-1 min-w-0 bg-transparent outline-none text-[#34352E] placeholder:text-[#A4A59F] md:placeholder-[#5F6057] md:text-base ${className}`}
      />
      {showClear && hasValue && (
        <button
          type="button"
          onClick={() => onSearch("")}
          className="p-1 rounded-full hover:bg-[#E6E6E1] text-[#5F6057] flex-shrink-0"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      {shortcutHint && (
        <span className="text-[#A4A59F] text-sm flex-shrink-0 hidden sm:inline">
          {shortcutHint}
        </span>
      )}
    </div>
  );
};

export default SearchBar;
