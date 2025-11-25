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
        rounded-3xl
        md:rounded-[48px]
        h-[50px] md:h-[64px]
        px-3
        shadow-sm
        min-w-[50px]
        max-w-full
        ${wrapperClass}
      `}
    >
      <Search className="w-6 h-6 text-[#A4A59F] flex-shrink-0" />
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder ?? autoPlaceholder}
        className={`
          flex-1 min-w-0 bg-transparent outline-none text-[#34352E] placeholder-[#A4A59F] md:text-base 
          ${className}
        `}
      />
    </div>
  );
};

export default SearchBar;
