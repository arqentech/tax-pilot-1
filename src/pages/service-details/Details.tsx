import PrimaryButton from "@/components/ui/PrimaryButton";
import { useCart } from "@/contexts/CartContext";
import { CircleCheck, Clock } from "lucide-react";
import Breadcrumbs from "./BreadCrumb";
import { cardData } from "@/data/CardData";
import { Link, useParams } from "react-router-dom";

const Details: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  const formatLabel = (value: string | undefined) =>
    value?.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const service =
    cardData.find(
      (item) => item.link.replace("/services", "") === `/${slug}`
    ) || cardData[0];

  const handleRequestService = () => {
    const result = addToCart({
      title: service.title,
      price: service.price,
      description: service.description,
      hours: service.hours,
      link: service.link,
      vatIncluded: service.vatIncluded,
    });

    alert(
      result.added ? "Service added to cart!" : "Service already added to cart."
    );
  };

  return (
    <div className="min-h-screen pb-24">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: formatLabel(slug) ?? "", href: null },
        ]}
      />

      <section className="flex flex-col-reverse md:flex-row justify-center gap-10 pb-6 mb-10">
        <div className="py-6 rounded-2xl">
          <img
            src="/svg/client-calls-customer-care-for-support.svg"
            alt={service.title}
            className="w-full lg:w-[493px] lg:h-[542px] object-contain"
          />
        </div>

        <div className="flex-1 ">
          <h1 className=" text-center md:text-left font-bricolage font-extrabold text-[32px] md:text-[44px] lg:text-[58px] leading-tight">
            {service.title}
          </h1>

          <p className="text-gray-600 mt-3 max-w-[600px] text-justify">
            {service.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="text-2xl font-bold ">
              € {service.price.toFixed(2)}
            </span>

            {service.vatIncluded && (
              <span className="bg-[#EEFCD7] flex items-center gap-1 text-[#36500C] text-xs font-medium px-2 py-1 rounded-full">
                <CircleCheck className="w-3 h-3" /> VAT Included
              </span>
            )}

            <span className="flex items-center gap-1 bg-[#D2BDE9] text-[#3C0D6D] text-xs font-medium px-2 py-1 rounded-full">
              <Clock className="w-3 h-3" /> {service.hours}
            </span>
          </div>

          <div className="hidden md:block mt-5">
            <PrimaryButton
              text="Request Service"
              width="257px"
              onClick={handleRequestService}
            />
          </div>
        </div>
      </section>

      {service.inDepthAnalysis && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <h2 className=" text-2xl font-semibold text-gray-900">
            In-depth analysis
          </h2>

          <div className="md:col-span-2">
            <p className="text-justify text-gray-700 leading-relaxed whitespace-pre-line">
              {service.inDepthAnalysis}
            </p>
          </div>
        </section>
      )}

      {service.advantages && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <h2 className="text-justify text-2xl font-semibold text-gray-900">Advantages</h2>

          <div className="md:col-span-2">
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
        </section>
      )}
    </div>
  );
};

export default Details;
