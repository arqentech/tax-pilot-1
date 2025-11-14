import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-[#007BFF] text-[#BFDDFF] text-center py-2 flex justify-center items-center gap-1">
      <span className="font-medium text-[18px] leading-[25px]">
        New services added recently •
      </span>
      <Link
        to="/services"
        className="group inline-flex items-center gap-1 no-underline hover:text-gray-200 transition-colors font-medium text-[18px] leading-[25px]"
      >
        explore now
        <ArrowUpRight className="h-[22px] w-[22px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
};

export default TopBar;
