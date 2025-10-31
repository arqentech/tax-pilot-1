import React from "react";
import { CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  vatIncluded?: boolean;
  hours?: string;
  link: string;
  ctaType?: "get" | "go";
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  vatIncluded = true,
  hours,
  link,
  ctaType = "get",
}) => {
  return (
    <div className="w-full rounded-2xl shadow-sm border border-[#E6E6E1] hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="bg-[#F9F9F799] pt-4 pr-4 pb-4 pl-4 min-h-[200px]">
        <h3 className="font-bricolage text-[20px] lg:text-[24px] lg:leading-tight font-extrabold">
          {title}
        </h3>

        <p className="text-[14px] lg:text-[16px] mt-2 line-clamp-2 text-[#5F6057]">
          {description}
        </p>

        <div className="mt-4 lg:mt-6 flex items-center gap-2 lg:gap-3 flex-wrap">
          <span className="text-xl lg:text-2xl font-semibold text-gray-900">
            € {price.toFixed(2)}
          </span>

          {vatIncluded && (
            <span className="bg-[#EEFCD7] flex items-center gap-1 text-[#36500C] text-xs font-medium px-2 py-1 rounded-full">
              <CheckCircle className="w-3 h-3" />
              VAT Included
            </span>
          )}

          {hours && (
            <span className="flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              {hours}
            </span>
          )}
        </div>
      </div>

      <div className="bg-[#E6E6E1] py-3 lg:py-4 px-4 lg:px-6">
        <Link
          to={link}
          className="text-[#04226B] text-sm font-semibold hover:underline flex items-center gap-1"
        >
          {ctaType === "go" ? "Go to the service" : "Get this service"}
          <span> &gt;</span>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
