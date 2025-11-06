import { useState } from "react";
import { faqData } from "../../data/FAQData";
import Badge from "./Badge";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 text-center">
      <Badge text="FAQ" width="77px" center />

      <h2 className="font-bricolage font-extrabold mt-4 text-[38px] leading-[38px] lg:text-[58px] lg:leading-[59px] tracking-[-0.03em]">
        <span className="block">Your Tax Questions,</span>
        <span className="block">answered Simply.</span>
      </h2>

      <div className="mt-12 space-y-4 max-w-2xl mx-auto">
        {faqData.map((item, index) => (
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
                className={`transition-transform duration-200  text-3xl ${
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

      <p className="mt-8 text-sm text-gray-500">
        Still have questions?{" "}
        <a href="#" className="underline font-medium">
          Chat with an expert
        </a>
      </p>
    </section>
  );
}
