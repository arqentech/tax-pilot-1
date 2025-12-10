// src/components/services/ServicesFAQ.tsx
import FAQ, { FAQItem } from "@/components/ui/FAQ";
import { FAQ as FAQType } from "@/types/services";
import React from "react";

interface ServicesFAQProps {
  faqs: FAQType[];
}

const ServicesFAQ: React.FC<ServicesFAQProps> = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  const data: FAQItem[] = faqs
    .sort((a, b) => a.position - b.position)
    .map((f) => ({
      question: f.question,
      answer: f.response,
    }));

  return <FAQ data={data} />;
};

export default ServicesFAQ;
