import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="w-full bg-blue-600 text-[#BFDDFF] text-center py-2 px-4 flex justify-center items-center gap-1 flex-wrap">
      <span className="font-medium text-[15px] lg:text-[18px] leading-[25px]">
        New services added recently •
      </span>
      <Link
        to="/services"
        className="group inline-flex items-center gap-1 no-underline hover:text-gray-200 transition-colors font-medium text-[15px] lg:text-[18px] leading-[25px]"
      >
        explore now
        <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-[22px] md:w-[22px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
};

export default TopBar;
