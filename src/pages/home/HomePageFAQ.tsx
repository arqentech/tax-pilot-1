import Badge from "../../components/ui/Badge";
import FAQ from "../../components/ui/FAQ";
import { homeFaqData } from "../../data/FAQData";

function HomePageFAQ() {
  return (
    <div className="w-full py-16">
      <div className="flex flex-col items-center ">
        <Badge text="FAQ" width="77px" center />

        <h2 className="font-bricolage sub-heading mt-6 md:mt-2 text-center">
          <span className="block ">Domande frquenti </span>{" "}
          <span className="block ">dai nostri clienti</span>
        </h2>
      </div>
      <div className="max-w-2xl mx-auto ">
        <FAQ data={homeFaqData} />
      </div>
    </div>
  );
}

export default HomePageFAQ;
