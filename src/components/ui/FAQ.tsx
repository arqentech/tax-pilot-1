import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  data: FAQItem[];
}

export default function FAQ({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-4 text-center">
      <div className="mt-12 space-y-4 max-w-2xl mx-auto">
        {data.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 cursor-pointer text-left"
            onClick={() => toggle(index)}
          >
            <div className="flex justify-between items-center">
              <p className="px-2 font-medium text-[16px] lg:text-[18px] leading-[25px]">
                {item.question}
              </p>
              <span
                className={`transition-transform duration-200 text-3xl ${
                  openIndex === index ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <p className="px-2 font-medium text-[16px] lg:text-[18px] leading-[25px]">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="hidden lg:block mt-8 text-[18px] leading-[25px]">
        Still have questions?{" "}
        <a href="#" className="underline font-medium italic">
          Chat with an expert
        </a>
      </p>
    </section>
  );
}
