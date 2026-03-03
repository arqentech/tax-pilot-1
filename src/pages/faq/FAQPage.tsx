import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFaqTopics, searchFaqs } from "@/api/faq";
import { useQuery } from "@tanstack/react-query";
import { FaqTopic, FaqSearchResult } from "@/types/faq";
import SearchBar from "@/components/ui/SearchBar";
import { stripHtml } from "@/lib/utils";

export default function FAQPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: topics = [] } = useQuery<FaqTopic[]>({
    queryKey: ["faq-topics"],
    queryFn: getFaqTopics,
  });

  const { data: searchResults = [], isLoading: isSearching } = useQuery<
    FaqSearchResult[]
  >({
    queryKey: ["faq-search", searchQuery],
    queryFn: () => searchFaqs(searchQuery),
    enabled: !!searchQuery.trim(),
  });

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return topics;
    const q = searchQuery.toLowerCase().trim();
    return topics.filter((t) => t.topic.toLowerCase().includes(q));
  }, [topics, searchQuery]);

  const showSearchResults = searchQuery.trim().length > 0;

  return (
    <section className="w-full py-16">
      <div className="flex flex-col items-center gap-6 px-4 w-full">
        <h1 className="sub-heading font-bricolage text-center text-[#3F403A]">
          FAQs
        </h1>
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

        {!showSearchResults ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[874px] mt-6">
            {filteredTopics.map((topic) => (
              <button
                key={topic.slug_topic}
                type="button"
                onClick={() => navigate(`/faq/${topic.slug_topic}`)}
                className="flex items-center justify-center min-h-[160px] px-6 py-8 rounded-xl bg-white border border-[#E6E6E1] shadow-sm text-[#3F403A] font-semibold text-center text-lg transition hover:shadow-md hover:border-[#D1D1D1]"
              >
                {topic.topic}
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-[874px] mt-6 space-y-4">
            <h2 className="text-xl font-semibold text-[#3F403A] mb-4">
              Risultati della ricerca ({searchResults.length})
            </h2>
            {isSearching ? (
              <div className="text-center py-8">
                <div className="inline-block w-6 h-6 border-2 border-[#3F403A] border-t-transparent rounded-full animate-spin" />
                <p className="mt-2 text-[#5F6057]">Ricerca in corso...</p>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div
                  key={`${result.slug_topic}-${result.slug}`}
                  onClick={() =>
                    navigate(`/faq/${result.slug_topic}/${result.slug}`)
                  }
                  className="bg-white border border-[#E6E6E1] rounded-xl p-6 cursor-pointer transition hover:shadow-md hover:border-[#D1D1D1]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm text-[#037BFF] font-medium bg-[#F0F8FF] px-2 py-1 rounded-full">
                      {result.topic}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#3F403A] mb-2">
                    {result.question}
                  </h3>
                  <p className="text-[#5F6057] text-sm leading-relaxed">
                    {result.highlight ? (
                      <span
                        dangerouslySetInnerHTML={{ __html: result.highlight }}
                      />
                    ) : (
                      stripHtml(result.response).substring(0, 200) + "..."
                    )}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-[#5F6057] text-center py-8">
                Nessun risultato trovato per "{searchQuery}".
              </p>
            )}
          </div>
        )}

        {!showSearchResults && filteredTopics.length === 0 && (
          <p className="text-[#5F6057] text-center mt-8">
            Nessuna categoria trovata.
          </p>
        )}
      </div>
    </section>
  );
}
