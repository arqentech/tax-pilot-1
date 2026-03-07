import Badge from "../../components/ui/Badge";
import FAQ from "../../components/ui/FAQ";
import type { FAQItem } from "../../components/ui/FAQ";
import { getHomepageFaqs } from "@/api/faq";
import { useQuery } from "@tanstack/react-query";
import { homeFaqData } from "../../data/FAQData";

function HomePageFAQ() {
  const { data: apiFaqs = [], isLoading } = useQuery({
    queryKey: ["faqs", "homepage"],
    queryFn: getHomepageFaqs,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const faqData: FAQItem[] =
    apiFaqs.length > 0
      ? apiFaqs.map((item) => ({
          question: item.question.replace(/^"|"$/g, "").trim(),
          link: `/faq/${item.slug_topic}/${item.slug}`,
        }))
      : homeFaqData;

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
        {isLoading && apiFaqs.length === 0 ? (
          <p className="text-center text-[#5F6057] py-8">Caricamento FAQ...</p>
        ) : (
          <FAQ data={faqData} />
        )}
      </div>
    </div>
  );
}

export default HomePageFAQ;
