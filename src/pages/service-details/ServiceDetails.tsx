import HowWeWork from "../../components/ui/HowWeWork";
import TaxPilotSection from "../../components/ui/TaxPilotSection";
import Breadcrumbs from "./BreadCrumb";
import Details from "./Details";
import RelatedServices from "./RelatedServices";

function ServiceDetails() {
  return (
    <div className="flex flex-col">
      <Breadcrumbs/>
      <Details />
      <HowWeWork />
      <RelatedServices />
      <TaxPilotSection />
    </div>
  );
}

export default ServiceDetails;
