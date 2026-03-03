import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFaqByTopic } from "@/api/faq";
import { FaqTopicResponse, FaqItem } from "@/types/faq";
import SearchBar from "@/components/ui/SearchBar";
import Breadcrumbs from "@/pages/service-details/BreadCrumb";
import { useMemo, useState } from "react";

export default function FAQQuestionsPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const { data } = useQuery<FaqTopicResponse>({
    queryKey: ["faq-by-topic", category],
    queryFn: () => getFaqByTopic(category || ""),
    enabled: !!category,
  });

  const questions = useMemo(
    () =>
      data?.children?.map((f: FaqItem) => ({
        slug: f.slug,
        question: f.question,
      })) ?? [],
    [data],
  );

  const filtered = useMemo(
    () =>
      questions.filter((q) =>
        q.question.toLowerCase().includes(query.toLowerCase()),
      ),
    [questions, query],
  );

  const breadcrumbItems = useMemo(
    () => [
      { label: "FAQs", href: "/faq" },
      ...(data?.title ? [{ label: data.title, href: null }] : []),
    ],
    [data?.title],
  );

  return (
    <section className="w-full py-16">
      <div className="flex flex-col items-center gap-6 px-4 w-full">
        <h1 className="sub-heading text-center text-[#3F403A]">FAQS</h1>
        <p className="text-base text-center text-[#5F6057]">
          Le domande più frequenti dei nostri servizi
        </p>

        <div className="w-[40vw]">
          <SearchBar
            onSearch={setQuery}
            value={query}
            placeholder="Chiedi qualcosa..."
            wrapperClass="w-full"
          />
        </div>

        {data && (
          <div className="w-full max-w-[874px]">
            <Breadcrumbs items={breadcrumbItems} className="mb-4" />
            <h2 className="text-center text-[24px] font-bricolage md:text-left font-extrabold text-[#3F403A]">
              {data.title}
            </h2>
          </div>
        )}

        <div className=" w-[40vw] space-y-4 mt-2">
          {filtered.map((item) => (
            <div
              key={item.slug}
              onClick={() => navigate(`/faq/${category}/${item.slug}`)}
              className="bg-[#F6F6F3] rounded-xl p-5 cursor-pointer text-[18px] text-[#3F403A] transition hover:shadow-md"
            >
              {item.question}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
