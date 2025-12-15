import React, { useMemo } from "react";
import { ChevronRight, CircleCheck, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { ServiceCardProps } from "@/types/services";

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  description_short,
  description_long,
  price,
  vatIncluded = true,
  hours,
  link,
  identifier,
  advantages,
}) => {
  const sanitize = (value?: string) =>
    value
      ? value
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
      : "";

  const descriptionText = useMemo<React.ReactNode>(() => {
    if (description) return description;

    let fallback = description_short ?? description_long ?? "";
    if (Array.isArray(advantages)) fallback += " " + advantages.join(" ");

    const cleaned = sanitize(fallback);
    return cleaned.length > 220 ? `${cleaned.slice(0, 217)}...` : cleaned;
  }, [description, description_short, description_long, advantages]);

  const displayPrice = useMemo(() => {
    if (price === null || price === undefined) return null;
    const numeric = typeof price === "string" ? parseFloat(price) : price;
    return Number.isFinite(numeric) ? `€ ${numeric.toFixed(2)}` : null;
  }, [price]);

  const serviceLink =
    link ?? (identifier ? `/services/${identifier}` : undefined);
  const showLink = Boolean(serviceLink);

  return (
    <div className="w-full md:max-w-[641px] rounded-2xl shadow-sm border border-[#E6E6E1] hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="bg-[#F9F9F799] p-4 min-h-[200px]">
        <h3 className="font-bricolage text-[20px] md:text-[24px] md:leading-tight font-extrabold">
          {title}
        </h3>

        {descriptionText && (
          <p className="text-[14px] md:text-[16px] mt-2 line-clamp-2 text-[#5F6057]">
            {descriptionText}
          </p>
        )}

        <div className="mt-4 md:mt-6 flex items-center gap-2 md:gap-3 flex-wrap">
          {displayPrice && (
            <span className="text-xl md:text-2xl font-semibold text-gray-900">
              {displayPrice}
            </span>
          )}

          {vatIncluded && (
            <span className="bg-[#EEFCD7] flex items-center gap-1 text-[#36500C] text-xs font-medium px-2 py-1 rounded-full">
              <CircleCheck className="w-3 h-3" />
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

      {showLink && (
        <div className="bg-[#E6E6E1] relative py-3 md:py-4 px-4 md:px-6">
          <Link
            to={serviceLink!}
            className="text-[#04226B] text-sm font-semibold hover:underline flex items-center gap-1"
          >
            <span className="block md:hidden text-[18px] font-extrabold leading-[25px]">
              Get this service
            </span>
            <span className="hidden md:block text-[18px] font-extrabold leading-[25px]">
              Go to the service
            </span>
            <ChevronRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
