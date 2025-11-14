import Badge from "../../components/ui/Badge";
import FAQ from "../../components/ui/FAQ";
import { homeFaqData } from "../../data/HomeFAQData";

function HomePageFAQ() {
  return (
    <div className="w-full py-20">
      <div className="flex flex-col items-center ">
        <Badge text="FAQ" width="77px" center />

        <h2 className="font-bricolage sub-heading mt-4">
          <span className="block">Your Tax Questions,</span>
          <span className="block">answered Simply.</span>
        </h2>
      </div>
      <div>
        <FAQ data={homeFaqData} />
      </div>
    </div>
  );
}

export default HomePageFAQ;
