import React from "react";
import { useParams, Link } from "react-router-dom";
import { cardData } from "../../data/CardData";

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
    <div className="mt-[84px] lg:mt-[92px] flex justify-center min-h-screen px-4 pb-16">
      <div className="max-w-[960px] w-full">
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6 mb-8">
          <div className="p-6 rounded-2xl">
            <img
              src="/svg/client-calls-customer-care-for-support.svg"
              alt={service.title}
              className="w-40 h-40 object-contain"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-900">
              {service.title}
            </h1>
            <p className="text-gray-600 mt-2 max-w-[600px]">
              {service.description}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-2xl font-bold text-blue-600">
                € {service.price.toFixed(2)}
              </span>
              {service.vatIncluded && (
                <span className="text-sm text-green-600">VAT Included</span>
              )}
              <span className="text-sm text-gray-500">⏱ {service.hours}</span>
            </div>

            <button className="mt-6 px-6 py-3">Request Service</button>
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

        {/* Advantages */}
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
