import PrimaryButton from "@/components/ui/PrimaryButton";
import { useCart } from "@/contexts/CartContext";
import { CircleCheck, Clock } from "lucide-react";
import Breadcrumbs from "./BreadCrumb";
import { useParams } from "react-router-dom";
import { useServiceDetails } from "@/hooks/useServiceDetails";
import ServicesFAQ from "./ServicesFAQ";
import HowWeWork from "@/components/ui/HowWeWork";

const Loader = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

const Details: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  const {
    data: service,
    isLoading,
    isError,
    error,
  } = useServiceDetails(slug ?? "");

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-red-600">
          Invalid service URL. Please select a valid service.
        </p>
      </div>
    );
  }

  if (isLoading) return <Loader />;

  if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to load service. Please try again later.";

    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold mb-2">
            Error loading service
          </p>
          <p className="text-gray-600">{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-600">Service not found.</p>
      </div>
    );
  }

  const formatLabel = (value: string | undefined) =>
    value?.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const handleRequestService = () => {
    const result = addToCart({
      title: service.title,
      price: service.price,
      description: service.description_short,
      hours: service.hours ?? "",
      link: `/services/${service.identifier}`,
      vatIncluded: !!service.vatIncluded,
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

      <section className="flex flex-col-reverse md:flex-row justify-center py-10 gap-10 pb-6 mb-10">
        <div className="py-6 rounded-2xl flex-shrink-0">
          <img
            src={
              service.image?.url ||
              "/svg/client-calls-customer-care-for-support.svg"
            }
            alt={service.title}
            className="w-full lg:w-[493px] lg:h-[542px] object-contain rounded-xl"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-center md:text-left font-bricolage font-extrabold text-[32px] md:text-[44px] lg:text-[58px] leading-tight">
            {service.title}
          </h1>

          <div
            className="text-gray-600 mt-3 max-w-[600px] text-justify"
            dangerouslySetInnerHTML={{ __html: service.description_short }}
          />

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="text-2xl font-bold">
              € {service.price.toFixed(2)}
            </span>

            {service.vatIncluded && (
              <span className="bg-[#EEFCD7] flex items-center gap-1 text-[#36500C] text-xs font-medium px-2 py-1 rounded-full">
                <CircleCheck className="w-3 h-3" /> VAT Included
              </span>
            )}

            {service.hours && (
              <span className="flex items-center gap-1 bg-[#D2BDE9] text-[#3C0D6D] text-xs font-medium px-2 py-1 rounded-full">
                <Clock className="w-3 h-3" /> {service.hours}
              </span>
            )}
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

      {service.description_long && (
        <section className="grid grid-cols-1 md:grid-cols-3 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            In-depth analysis
          </h2>
          <div className="md:col-span-2 text-gray-700 leading-relaxed whitespace-pre-line text-justify">
            <div
              dangerouslySetInnerHTML={{ __html: service.description_long }}
            />
          </div>
        </section>
      )}

      {service.advantages && service.advantages.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 mb-12">
          <h2 className="text-justify text-2xl font-semibold text-gray-900">
            Advantages
          </h2>
          <div className="md:col-span-2 space-y-3">
            {service.advantages.map((adv: string, index: number) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700"
              >
                {adv}
              </div>
            ))}
          </div>
        </section>
      )}
      <HowWeWork />

      {service.faqs && service.faqs.length > 0 && (
        <section className="grid gap-2 grid-cols-1 md:grid-cols-3 mt-12 md:space-x-7">
          <div>
            <h1 className="sub-heading mt-8">
              <span className="block md:hidden text-center">
                Your Tax Questions, answered Simply.
              </span>
              <span className="hidden md:block">
                Frequently asked questions
              </span>
            </h1>

            <p className="hidden md:block mt-6 text-base">
              The Equivalent Economic Situation Indicator (ISEE) is a numerical
              value that certifies the economic situation of a household in
              Italy.
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <ServicesFAQ faqs={service.faqs} />
          </div>
        </section>
      )}
    </div>
  );
};

export default Details;
