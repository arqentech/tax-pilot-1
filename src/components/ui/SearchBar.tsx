import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  maxWidth?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search for a service",
  size = "md",
  maxWidth,
  className = "",
}) => {
  const heightClasses = {
    sm: "h-[48px]",
    md: "h-[64px]",
    lg: "h-[72px]",
  };

  const paddingClasses = {
    sm: "px-3 lg:px-4",
    md: "px-4 lg:px-6",
    lg: "px-5 lg:px-8",
  };

  const iconClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const textClasses = {
    sm: "text-[14px] placeholder-[#8A8A8A] md:text-[16px]",
    md: "text-[16px] placeholder-[#8A8A8A] md:text-[18px] lg:text-[20px]",
    lg: "text-[18px] placeholder-[#8A8A8A] md:text-[20px] lg:text-[22px]",
  };

  const defaultMaxWidth = {
    sm: "max-w-[250px] lg:max-w-[400px]",
    md: "max-w-[322px] lg:max-w-[725px]",
    lg: "max-w-[400px] lg:max-w-[900px]",
  };

  return (
    <div
      className={`
        flex items-center
        bg-[#F9F9F7] border border-[#E6E6E1]
        rounded-[48px]
        w-full
        ${maxWidth || defaultMaxWidth[size]}
        shadow-sm
        ${heightClasses[size]}
        ${paddingClasses[size]}
        ${className}
      `}
    >
      <Search className={`${iconClasses[size]} text-[#34352E] mr-3 flex-shrink-0`} />
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        className={`
          flex-1 bg-transparent outline-none text-[#34352E]
          ${textClasses[size]}
        `}
      />
    </div>
  );
};

export default SearchBar;
