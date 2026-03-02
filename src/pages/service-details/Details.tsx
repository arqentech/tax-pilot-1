import { useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import MinimumRequirementsModal from "@/components/ui/MinimumRequirementsModal";
import AddToCartSuccessDialog from "@/components/ui/AddToCartSuccessDialog";
import { useCart } from "@/hooks/useCart";
import { CircleCheck, Clock } from "lucide-react";
import { stripHtml } from "@/lib/utils";
import Breadcrumbs from "./BreadCrumb";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useServiceDetails } from "@/hooks/useServiceDetails";
import ServicesFAQ from "./ServicesFAQ";
import HowWeWork from "@/components/ui/HowWeWork";
import Badge from "@/components/ui/Badge";
import RelatedServices from "./RelatedServices";

const Loader = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

const Details: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

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
    setShowModal(true);
  };

  const handleModalComplete = async () => {
    setShowModal(false);
    try {
      await addToCart({
        service_id: service.id,
        title: service.title,
        price: service.price,
        description: stripHtml(service.description_short),
        hours: service.hours ?? "",
        link: `/services/${service.identifier}`,
        vatIncluded: !!service.vatIncluded,
      });
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Error adding service to cart:", error);
    }
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    navigate("/cart");
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

      <section className="flex flex-col-reverse md:flex-row justify-center py-3 sm:py-6 md:py-10 gap-3 sm:gap-6 md:gap-10 pb-3 sm:pb-6 mb-4 sm:mb-8 md:mb-10">
        <div className="py-2 sm:py-4 md:py-6 rounded-2xl flex-shrink-0 w-full md:w-auto px-2 sm:px-4 md:px-0">
          <img
            src={
              service.image?.url ||
              "/svg/client-calls-customer-care-for-support.svg"
            }
            alt={service.title}
            className="w-full max-w-full md:w-[493px] md:h-[542px] h-auto object-contain rounded-xl mx-auto md:mx-0"
          />
        </div>

        <div className="flex-1 min-w-0 py-5">
          <h1 className="text-center text-[#34352E] md:text-left font-bricolage font-extrabold heading-base px-2 sm:px-4 md:px-0 break-words">
            {service.title}
          </h1>

          <div
            className="text-[#5F6057] mt-2 sm:mt-3 max-w-[600px] md:text-left text-center text-base px-2 sm:px-4 md:px-0 break-words"
            dangerouslySetInnerHTML={{ __html: service.description_short }}
          />

          <div className="flex flex-wrap items-center py-5 gap-2">
            <span className="text-[30px] text-[#34352E] leading-[30px] font-bricolage font-extrabold whitespace-nowrap">
              € {service.price.toFixed(2)}
            </span>

            {/* {service.vatIncluded && ( */}
            <span className="bg-[#EEFCD7] border border-t border-[1px] border-[#D9E6C0] w-[127px] h-[26px]  flex items-center gap-0.5 sm:gap-1 text-[#36500C] text-[14px] leading-[24px] font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0">
              <CircleCheck className="w-2.5 sm:w-3 h-2.5 sm:h-3 flex-shrink-0" />
              <span className="whitespace-nowrap">VAT Included</span>
            </span>
            {/* )} */}

            {service.hours && (
              <span className="flex items-center gap-0.5 sm:gap-1 bg-[#D2BDE9] text-[#3C0D6D] text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0">
                <Clock className="w-2.5 sm:w-3 h-2.5 sm:h-3 flex-shrink-0" />
                <span className="whitespace-nowrap">{service.hours}</span>
              </span>
            )}
          </div>

          <div className="mt-3 sm:mt-5 px-2 sm:px-4 md:px-0">
            <div className="w-full max-w-full sm:max-w-[257px]">
              <PrimaryButton
                text="Request Service"
                width="100%"
                onClick={handleRequestService}
              />
            </div>
          </div>
        </div>
      </section>

      {service.description_long && (
        <section className="grid grid-cols-1 md:grid-cols-3  sm:mb-8 md:mb-12 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4 md:px-0">
          <h2 className="text-[#34352E] font-bricolage text-[28px] font-extrabold leading-[73px] md:leading-[30px] ">
            In-depth analysis
          </h2>
          <div className="md:col-span-2 leading-[25px] text-[18px] text-[#5F6057] font-normal whitespace-pre-line break-words">
            <div
              dangerouslySetInnerHTML={{ __html: service.description_long }}
            />
          </div>
        </section>
      )}

      {service.advantages && service.advantages.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 mb-4 sm:mb-8 md:mb-12 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4 md:px-0">
          <h2 className="text-[#34352E] font-bricolage text-[28px] font-extrabold leading-[73px] md:leading-[30px]">
            Advantages
          </h2>
          <div className="md:col-span-2 space-y-2 sm:space-y-3">
            {service.advantages.map((adv: string, index: number) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 text-[18px] text-[#5F6057] font-normal rounded-xl p-2 sm:p-3 md:p-4 break-words"
              >
                {adv}
              </div>
            ))}
          </div>
        </section>
      )}
      <RelatedServices />
      <HowWeWork />

      {service.faqs && service.faqs.length > 0 && (
        <section className="grid gap-3 sm:gap-4 md:gap-2 grid-cols-1 md:grid-cols-3 mt-4 sm:mt-8 md:mt-12 md:space-x-7 md:px-0">
          <div>
            <Badge text="FAQ" width="86px" className="md:hidden flex" center />
            <h1 className="sub-heading font-bricolage mt-8">
              <span className="block md:hidden text-center text-[38px] sm:text-[32px] ">
                Your Tax Questions,
              </span>
              <span className="block md:hidden text-center text-[38px] sm:text-[32px] ">
                answered Simply.
              </span>
              <span className="hidden md:block max-w-[457px]">
                Frequently asked questions.
              </span>
            </h1>

            <p className="hidden md:block mt-6 text-base">
              The Equivalent Economic Situation Indicator (ISEE) is a numerical
              value that certifies the economic situation of a household in
              Italy.
            </p>
            <div className="hidden md:flex text-[#04226B] items-center gap-1 text-[18px] mt-4 font-semibold">
              <span>Still have questions?</span>
              <Link to="/contact-us" className="underline italic">
                Chat with an expert
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 space-y-2 sm:space-y-3">
            <ServicesFAQ faqs={service.faqs} />
          </div>
        </section>
      )}

      {showModal && service && (
        <MinimumRequirementsModal
          serviceId={service.id}
          onComplete={handleModalComplete}
          onClose={() => setShowModal(false)}
        />
      )}
      <AddToCartSuccessDialog
        open={showSuccessDialog}
        onClose={handleSuccessDialogClose}
      />
    </div>
  );
};

export default Details;
