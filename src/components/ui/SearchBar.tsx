import React from "react";
import { Search } from "lucide-react";
import { useMediaQuery } from "react-responsive";
interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  wrapperClass?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  className = "",
  wrapperClass = "",
}) => {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  const placeholderText = isLargeScreen ? "Search" : "Search for a service";

  return (
    <div
      className={`
        flex items-center
       border border-[#E6E6E1]
        rounded-[48px]
        h-[64px]
        px-4
        shadow-sm w-full
        ${wrapperClass}
      `}
    >
      <Search className="w-5 h-5 text-[#34352E] mr-3 flex-shrink-0" />
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholderText}
        className={`
          flex-1 bg-transparent outline-none text-[#34352E]
          placeholder-[#8A8A8A]
          text-[16px] placeholder:text-[16px]
          ${className}
        `}
      />
    </div>
  );
};

export default SearchBar;
