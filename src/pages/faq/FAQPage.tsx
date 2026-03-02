import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFaqTopics } from "@/api/faq";
import { useQuery } from "@tanstack/react-query";
import { FaqTopic } from "@/types/faq";
import SearchBar from "@/components/ui/SearchBar";

export default function FAQPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: topics = [] } = useQuery<FaqTopic[]>({
    queryKey: ["faq-topics"],
    queryFn: getFaqTopics,
  });

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return topics;
    const q = searchQuery.toLowerCase().trim();
    return topics.filter((t) => t.topic.toLowerCase().includes(q));
  }, [topics, searchQuery]);

  return (
    <section className="w-full py-16">
      <div className="flex flex-col items-center gap-6 px-4 w-full">
        <h1 className="sub-heading text-center text-[#3F403A]">FAQS</h1>
        <p className="text-base text-center text-[#5F6057]">
          Le domande più frequenti dei nostri servizi
        </p>

        <div className="w-full max-w-[725px]">
          <SearchBar
            onSearch={setSearchQuery}
            value={searchQuery}
            placeholder="Chiedi qualcosa..."
            wrapperClass="w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[874px] mt-6">
          {filteredTopics.map((topic) => (
            <button
              key={topic.slug_topic}
              type="button"
              onClick={() => navigate(`/faq/${topic.slug_topic}`)}
              className="flex items-center justify-center min-h-[120px] rounded-xl bg-white border border-[#E6E6E1] shadow-sm text-[#3F403A] font-semibold text-center transition hover:shadow-md hover:border-[#D1D1D1]"
            >
              {topic.topic}
            </button>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <p className="text-[#5F6057] text-center mt-8">
            Nessuna categoria trovata.
          </p>
        )}
      </div>
    </section>
  );
}
