import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { stripHtml } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer?: string;
  /** When set, the row links to this path (e.g. /faq/:category/:slug) instead of expanding. */
  link?: string;
}

interface FAQProps {
  data: FAQItem[];
  hideChatOnWeb?: boolean;
}

export default function FAQ({ data, hideChatOnWeb = false }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const navigate = useNavigate();

  const toggle = (index: number, item: FAQItem) => {
    if (item.link) {
      navigate(item.link);
      return;
    }
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-4 text-center">
      <div className="mt-6 space-y-4 mx-auto">
        {data.map((item, index) => {
          const isLink = !!item.link;
          const content = (
            <div
              role={isLink ? "link" : "button"}
              className="border border-gray-200 rounded-xl p-4 cursor-pointer text-left min-h-[72px] w-full"
              onClick={() => toggle(index, item)}
            >
              <div className="flex justify-between items-center gap-3">
                <p className="px-2 font-medium text-[#34352E] text-[16px] lg:text-[18px] leading-[25px] min-h-[28px] flex-1">
                  {item.question}
                </p>

                <span
                  className={`flex-shrink-0 transition-transform duration-200 text-3xl leading-none ${
                    !isLink && openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </div>

              {!isLink && item.answer != null && (
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-2 pt-2 font-normal text-[#5F6057] text-[16px] lg:text-[18px] leading-[25px]">
                      {stripHtml(item.answer)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
          return <div key={index}>{content}</div>;
        })}
      </div>
      <p
        className={`mt-8 text-[18px] leading-[25px]
          ${hideChatOnWeb ? "block md:hidden" : "block"}`}
      >
        Hai ancora domande?{" "}
        <Link to="/contatti" className="underline font-medium italic">
          Chatta con un esperto di TaxPilot
        </Link>
      </p>
    </section>
  );
}
