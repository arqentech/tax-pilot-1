import ClientReviews from "@/components/ui/ClientReview";
import TaxPilotSection from "../../components/ui/TaxPilotSection";
import Details from "./Details";
import RelatedServices from "./RelatedServices";

function ServiceDetails() {
  return (
    <div className="flex flex-col">
      <Details />
      <ClientReviews />
      {/* <RelatedServices /> */}
      <TaxPilotSection />
    </div>
  );
}

export default ServiceDetails;
