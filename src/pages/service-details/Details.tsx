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
        price: Number(service.price ?? 0),
        description: stripHtml(service.description_short),
        hours: service.hours ?? "",
        link: `/servizi/${service.identifier}`,
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
          { label: "Servizi", href: "/servizi" },
          { label: formatLabel(slug) ?? "", href: null },
        ]}
      />

      <section className="w-full  py-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-4">
          <div className="w-full md:w-1/2 flex justify-center md:-translate-y-16">
            <img
              src={
                service.image?.url ||
                "/svg/client-calls-customer-care-for-support.svg"
              }
              alt={service.title}
              className="w-full max-w-[480px] object-contain"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-[#34352E] font-bricolage font-extrabold text-[42px] leading-[1.1]">
              {service.title}
            </h1>

            <div
              className="text-[#5F6057] mt-4 text-base max-w-[520px] mx-auto md:mx-0"
              dangerouslySetInnerHTML={{ __html: service.description_short }}
            />

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
              <span className="text-[28px] font-extrabold text-[#34352E]">
                € {Number(service.price ?? 0).toFixed(2)}
              </span>

              <span className="flex items-center gap-1 bg-[#EEFCD7] border border-[#D9E6C0] text-[#36500C] text-sm px-3 py-1 rounded-full">
                <CircleCheck className="w-4 h-4" />
                IVA inclusa
              </span>

              {service.hours && (
                <span className="flex items-center gap-1 bg-[#D2BDE9] text-[#3C0D6D] text-sm px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  {service.hours}
                </span>
              )}
            </div>

            <div className="mt-8  flex justify-center md:justify-start">
              <PrimaryButton
                text="Request Service"
                width="230px"
                onClick={handleRequestService}
                className="pl-4"
              />
            </div>
          </div>
        </div>
      </section>

      {service.description_long && (
        <section className="grid grid-cols-1 md:grid-cols-3  sm:mb-8 md:mb-12 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4 md:px-0">
          <h2 className="text-[#34352E] font-bricolage text-[28px] font-extrabold leading-[73px] md:leading-[30px] ">
            Analisi approfondita
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
            Vantaggi
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
              <span>Hai ancora domande?</span>
              <Link to="/contatti" className="underline italic">
                Chattare con un esperto
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
