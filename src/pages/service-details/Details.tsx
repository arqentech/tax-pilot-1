import PrimaryButton from "@/components/ui/PrimaryButton";
import { useCart } from "@/contexts/CartContext";
import { CheckCircle, Clock } from "lucide-react";
import Breadcrumbs from "./BreadCrumb";
import { cardData } from "@/data/CardData";
import { Link, useParams } from "react-router-dom";

const Details: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  const formatLabel = (value: string | undefined) =>
    value?.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

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

  const handleRequestService = () => {
    const result = addToCart({
          title: service.title,
          price: service.price,
          description: service.description,
      hours: service.hours,
      link: service.link,
      vatIncluded: service.vatIncluded,
    });

    if (result.added) {
      alert("Service added to cart!");
    } else {
      alert("Service already added to cart.");
    }
  };

  return (
    <div className="grid grid-col-1 justify-center min-h-screen px-4 pb-16">
      <div className="w-full">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: formatLabel(slug) ?? "", href: null },
          ]}
        />

        <div className="flex flex-col md:flex-row items-center gap-10 pb-6 mb-4">
          <div className="p-6 rounded-2xl">
            <img
              src="/svg/client-calls-customer-care-for-support.svg"
              alt={service.title}
              className="w-full lg:w-[493px] lg:h-[542px] object-contain"
            />
          </div>

          <div className="flex-1">
            <h1 className="font-bricolage font-extrabold text-[44px] leading-[38px] lg:text-[58px] lg:leading-[59px]">
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

            
            <PrimaryButton
              text="Request Service"
              width="257px"
              onClick={handleRequestService}
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
              {service.advantages.map((adv, index) => (
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
