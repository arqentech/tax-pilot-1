import Badge from "../../components/ui/Badge";
import FAQ from "../../components/ui/FAQ";
import { homeFaqData } from "../../data/FAQData";

function HomePageFAQ() {
  return (
    <div className="w-full py-10">
      <div className="flex flex-col items-center ">
        <Badge text="FAQ" width="77px" center />

        <h2 className="font-bricolage sub-heading mt-4  text-center">
          <span className="block lg:inline">Your Tax Questions,</span>{" "}
          <span className="block lg:inline">answered Simply.</span>
        </h2>
      </div>
      <div className="max-w-2xl mx-auto ">
        <FAQ data={homeFaqData} />
      </div>
    </div>
  );
}

export default HomePageFAQ;
