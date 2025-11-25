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
    <section className="w-full py-12 md:py-16">
      <div className="flex flex-col items-center gap-6">
        <span className="sub-heading text-center">FAQs</span>
        <p className="text-base text-center text-[#5F6057]">
          Frequently asked questions about our services
        </p>

        <div className="flex w-full items-center gap-3 pt-2 flex-row justify-center md:gap-4">
          <div className="w-full flex-1 md:max-w-[710px]">
            <SearchBar onSearch={handleSearch} placeholder="Search query" />
          </div>

          <div className="w-full md:w-auto">
            <SimpleDropdown items={faqOptions} onSelect={handleSelect} />
          </div>
        </div>

        <div className="w-full max-w-[874px]">
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
