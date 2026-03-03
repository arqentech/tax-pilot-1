import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFaqDetail } from "@/api/faq";
import SearchBar from "@/components/ui/SearchBar";
import Breadcrumbs from "@/pages/service-details/BreadCrumb";
import { useMemo, useState } from "react";

export default function FAQDetailPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [query, setQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["faq-detail", category, slug],
    queryFn: () => getFaqDetail(category || "", slug || ""),
    enabled: !!category && !!slug,
  });

  const breadcrumbItems = useMemo(
    () =>
      data?.faq
        ? [
            { label: "FAQs", href: "/faq" },
            {
              label: data.faq.topic,
              href: `/faq/${data.faq.slug_topic}`,
            },
            { label: data.faq.question, href: null },
          ]
        : [],
    [data?.faq],
  );

  const relatedQuestions = useMemo(
    () =>
      data?.others?.filter(
        (item) =>
          !query.trim() ||
          item.question.toLowerCase().includes(query.toLowerCase()),
      ) ?? [],
    [data?.others, query],
  );

  if (isLoading) {
    return (
      <section className="w-full py-16">
        <div className="flex flex-col items-center gap-6 px-4 w-full">
          <div className="h-10 w-48 bg-[#E6E6E1] rounded animate-pulse" />
          <div className="h-4 w-full max-w-[725px] bg-[#E6E6E1] rounded animate-pulse" />
          <div className="w-full max-w-[874px] h-[120px] bg-[#E6E6E1] rounded-xl animate-pulse" />
        </div>
      </section>
    );
  }

  if (isError || !data?.faq) {
    return (
      <section className="w-full py-16">
        <div className="flex flex-col items-center gap-6 px-4 w-full text-center text-[#5F6057]">
          <h1 className="sub-heading text-[#3F403A]">FAQS</h1>
          <p>Domanda non trovata.</p>
        </div>
      </section>
    );
  }

  const { faq } = data;

  return (
    <section className="w-full py-16">
      <div className="flex flex-col items-center gap-6 px-4 w-full">
        <h1 className="sub-heading text-center text-[#3F403A]">FAQS</h1>
        <p className="text-base text-center text-[#5F6057]">
          Le domande più frequenti dei nostri servizi
        </p>

        <div className="w-full max-w-[725px]">
          <SearchBar
            onSearch={setQuery}
            value={query}
            placeholder="Chiedi qualcosa..."
            wrapperClass="w-full"
          />
        </div>

        <div className="w-full max-w-[874px]">
          <Breadcrumbs items={breadcrumbItems} className="mb-4" />
        </div>

        <div className="w-full max-w-[874px] bg-white border border-[#E6E6E1] rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#3F403A] mb-4">
            {faq.question}
          </h2>
          {faq.response && (
            <div
              className="text-[#5F6057] text-base leading-relaxed prose prose-p:my-2 [&_br]:block"
              dangerouslySetInnerHTML={{ __html: faq.response }}
            />
          )}
        </div>

        {data.others?.length > 0 && (
          <div className="w-full max-w-[874px] mt-8">
            <h3 className="text-[24px] font-bricolage font-extrabold text-[#3F403A] mb-4">
              Altre domande su {faq.topic}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-[#5F6057]">
              {relatedQuestions.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/faq/${item.slug_topic}/${item.slug}`}
                    className="text-[#2563eb] underline hover:text-[#1d4ed8]"
                  >
                    {item.question}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
