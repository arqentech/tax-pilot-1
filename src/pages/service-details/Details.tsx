import React from "react";
import { useParams, Link } from "react-router-dom";
import { cardData } from "../../data/CardData";
import { CheckCircle, Clock } from "lucide-react";
import PrimaryButton from "../../components/ui/PrimaryButton";

const Details: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = cardData.find(
    (item) => item.link.replace("/services", "") === `/${slug}`
  );

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold">Service Not Found</h2>
        <Link to="/services" className="text-blue-500 mt-4">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen px-4 pb-16">
      <div className="w-full max-w-7xl">
        <div className="flex flex-row flex-wrap md:flex-nowrap items-center gap-10 pb-6">
          <div className="flex-1 order-1 md:order-1">
            <h1 className="font-bricolage font-extrabold text-[44px] leading-[38px] lg:text-[58px] lg:leading-[59px]">
              {service.title}
            </h1>
            <p className="text-gray-600 mt-2 max-w-[600px]">
              {service.description}
            </p>

            <div className="flex items-center gap-4 mt-4 flex-wrap">
              <span className="text-2xl font-bold text-blue-600">
                € {service.price.toFixed(2)}
              </span>
              {service.vatIncluded && (
                <span className="bg-[#EEFCD7] flex items-center gap-1 text-[#36500C] text-xs font-medium px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  VAT Included
                </span>
              )}
              <span className="flex items-center gap-1 bg-[#D2BDE9] text-[#3C0D6D] text-xs font-medium px-2 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                {service.hours}
              </span>
            </div>

            <div className="mt-6">
              <PrimaryButton text="Request Service" width="257px" />
            </div>
          </div>

          <div className="flex-shrink-0 order-2 md:order-2 p-6 rounded-2xl flex justify-center">
            <img
              src="/svg/client-calls-customer-care-for-support.svg"
              alt={service.title}
              className="w-[311px] h-[341px] md:w-[400px] md:h-[450px] lg:w-[493px] lg:h-[542px] object-contain"
            />
          </div>
        </div>

        {service.inDepthAnalysis && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              In-depth analysis
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {service.inDepthAnalysis}
            </p>
          </div>
        )}

        {service.advantages && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Advantages
            </h2>
            <ul className="space-y-3">
              {service.advantages.map((adv: string, index: number) => (
                <li
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700"
                >
                  {adv}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
