import React from "react";
import { Search } from "lucide-react";
import { useMediaQuery } from "react-responsive";

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  wrapperClass?: string;
  placeholder?: string; 
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  className = "",
  wrapperClass = "",
  placeholder,
}) => {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  const autoPlaceholder = isLargeScreen ? "Search" : "Search for a service";

  return (
    <div
      className={`
        flex items-center
        bg-[#F9F9F7]
        border border-[#E6E6E1]
        rounded-[48px]
        h-[64px]
        px-4
        shadow-sm w-full 
        ${wrapperClass}
      `}
    >
      <Search className="w-6 h-6 text-[#A4A59F] mr-3 flex-shrink-0" />
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder ?? autoPlaceholder}
        className={`
          flex-1 bg-transparent outline-none text-[#34352E] placeholder-[#A4A59F] text-base
          ${className}
        `}
      />
    </div>
  );
};

export default SearchBar;
