import React, { useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import FAQ, { FAQItem } from "@/components/ui/FAQ";
import { generalFaqData, homeFaqData } from "@/data/FAQData";
import SimpleDropdown from "@/components/ui/dropdown-menu";

const faqOptions = [
  "General",
  "Profile",
  "Bonuses and services",
  "Orders",
  "Required Practices",
  "Documents",
];

const faqMap: Record<string, FAQItem[]> = {
  General: generalFaqData,
  Profile: generalFaqData,
  "Bonuses and services": homeFaqData,
  Orders: generalFaqData,
  "Required practices": generalFaqData,
  Documents: generalFaqData,
};

export default function FAQPage() {
  const firstCategoryKey = Object.keys(faqMap)[0];

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(firstCategoryKey);
  const [selectedFaq, setSelectedFaq] = useState<FAQItem[]>(
    faqMap[firstCategoryKey]
  );

  const handleSelect = (key: string) => {
    setSelectedCategory(key);
    setSelectedFaq(faqMap[key] || []);
  };

  const handleSearch = (value: string) => setQuery(value);

  const filteredFaqs = selectedFaq.filter(
    (faq) =>
      faq.question.toLowerCase().includes(query.toLowerCase()) ||
      faq.answer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="w-full py-10">
      <div className="flex flex-col items-center gap-4 w-full max-w-6xl mx-auto px-4">
        <span className="sub-heading text-center">FAQ</span>
        <p className="text-base text-[#5F6057] text-center">
          Frequently asked questions about our services
        </p>

        <div className="w-full flex md:flex-row gap-4 mt-4 items-center justify-center">
          <div className="w-full md:w-[710px] h-[64px] md:h-[74px]">
            <SearchBar onSearch={handleSearch} placeholder="Search query" />
          </div>

          <div>
            <SimpleDropdown items={faqOptions} onSelect={handleSelect} />
          </div>
        </div>

        {query && (
          <p className="text-sm text-gray-500  w-full text-left">
            Searching for: <b>{query}</b>
          </p>
        )}

        <div className="max-w-[874px] mx-auto w-full">
          {filteredFaqs.length > 0 ? (
            <FAQ data={filteredFaqs} />
          ) : (
            <p className="w-full text-center">
              {query
                ? "No FAQs match your search."
                : "Select a category to see FAQs."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
