import React from "react";
import { CheckCircle, ChevronRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  vatIncluded?: boolean;
  hours?: string;
  link: string;
  category?: string;
  inDepthAnalysis?: string;
  advantages?: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  vatIncluded = true,
  hours,
  link,
  category,
  inDepthAnalysis,
  advantages,
}) => {
  return (
    <div className="w-full max-w-[427px] rounded-2xl shadow-sm border border-[#E6E6E1] hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="bg-[#F9F9F799] pt-4 pr-4 pb-4 pl-4 min-h-[200px]">
        <h3 className="font-bricolage text-[20px] md:text-[24px] md:leading-tight font-extrabold">
          {title}
        </h3>

        <p className="text-[14px] md:text-[16px] mt-2 line-clamp-2 text-[#5F6057]">
          {description}
        </p>

        <div className="mt-4 md:mt-6 flex items-center gap-2 md:gap-3 flex-wrap">
          <span className="text-xl md:text-2xl font-semibold text-gray-900">
            € {price.toFixed(2)}
          </span>

          {vatIncluded && (
            <span className="bg-[#EEFCD7] flex items-center gap-1 text-[#36500C] text-xs font-medium px-2 py-1 rounded-full">
              <CheckCircle className="w-3 h-3" />
              VAT Included
            </span>
          )}

          {hours && (
            <span className="flex items-center gap-1 bg-[#D2BDE9] text-[#3C0D6D] text-xs font-medium px-2 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              {hours}
            </span>
          )}
        </div>
      </div>

      <div className="bg-[#E6E6E1] relative py-3 md:py-4 px-4 md:px-6">
        <Link
          to={link}
          className="text-[#04226B] text-sm font-semibold hover:underline flex items-center gap-1"
        >
          <span className="block md:hidden text-[18px] font-extrabold leading-[25px]">
            Get this service{" "}
          </span>
          <span className="hidden md:block text-[18px] font-extrabold leading-[25px]">
            Go to the service
          </span>
          <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
