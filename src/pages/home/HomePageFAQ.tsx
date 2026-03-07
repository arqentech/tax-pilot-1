import Badge from "../../components/ui/Badge";
import FAQ from "../../components/ui/FAQ";
import type { FAQItem } from "../../components/ui/FAQ";
import { getHomepageFaqs, getFaqDetail } from "@/api/faq";
import { useQuery, useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { homeFaqData } from "../../data/FAQData";

function HomePageFAQ() {
  const { data: apiFaqs = [], isLoading: isLoadingList } = useQuery({
    queryKey: ["faqs", "homepage"],
    queryFn: getHomepageFaqs,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const detailQueries = useQueries({
    queries: apiFaqs.map((item) => ({
      queryKey: ["faq", "detail", item.slug_topic, item.slug],
      queryFn: () => getFaqDetail(item.slug_topic, item.slug),
      enabled: apiFaqs.length > 0,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const faqData: FAQItem[] = useMemo(() => {
    if (apiFaqs.length === 0) return homeFaqData;
    return apiFaqs.map((item, i) => {
      const detail = detailQueries[i]?.data;
      const question = item.question.replace(/^"|"$/g, "").trim();
      const link = `/faq/${item.slug_topic}/${item.slug}`;
      const answer = detail?.faq?.response;
      return {
        question,
        ...(answer != null && answer !== "" ? { answer, link } : { link }),
      };
    });
  }, [apiFaqs, detailQueries]);

  const isLoading = isLoadingList || (apiFaqs.length > 0 && detailQueries.some((q) => q.isLoading));

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
        {isLoading ? (
          <p className="text-center text-[#5F6057] py-8">Caricamento FAQ...</p>
        ) : (
          <FAQ data={faqData} />
        )}
      </div>
    </div>
  );
}

export default HomePageFAQ;
