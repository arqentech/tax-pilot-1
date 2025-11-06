import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="w-full bg-blue-600 text-[#BFDDFF] text-center py-2 px-4 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
      <span className="font-medium text-xs sm:text-sm md:text-base lg:text-lg leading-tight sm:leading-normal">
        New services added recently •
      </span>
      <Link
        to="/services"
        className="group inline-flex items-center gap-1 no-underline hover:text-gray-200 transition-colors font-medium text-xs sm:text-sm md:text-base lg:text-lg leading-tight sm:leading-normal"
      >
        explore now
        <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
};

export default TopBar;
