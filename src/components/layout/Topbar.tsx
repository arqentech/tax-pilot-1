import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-[#007BFF] text-[#BFDDFF] py-2">
      <div className="flex items-center justify-center gap-2 text-center">
        <span className="font-medium text-sm leading-[20px] md:text-[18px] md:leading-[25px]">
         Nuovi servizi aggiunti di recente •
        </span>

        <Link
          to="/servizi"
          className="group inline-flex items-center gap-1 no-underline hover:text-gray-200 transition-colors font-medium text-sm leading-[20px] md:text-[18px] md:leading-[25px]"
        >
         esplora ora
          <ArrowUpRight className="h-[22px] w-[22px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
