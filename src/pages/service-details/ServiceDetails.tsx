import ClientReviews from "@/components/ui/ClientReview";
import TaxPilotSection from "../../components/ui/TaxPilotSection";
import Details from "./Details";

function ServiceDetails() {
  return (
    <div className="flex flex-col">
      <Details />
      <ClientReviews  />
      <TaxPilotSection />
    </div>
  );
}

export default ServiceDetails;
