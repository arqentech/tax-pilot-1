import { Card, CardContent } from "@/components/ui/card";
import termsData from "./termsData.json";

export default function TermsOfUse() {
  return (
    <div className="w-full flex justify-center py-10">
      <Card className="w-full h-auto rounded-[26px] md:px-6 shadow-sm bg-white border-[#E6E6E1]">
        <CardContent className="py-5">
          <h1 className="font-bricolage sub-heading text-center py-10">
            {termsData.title}
          </h1>

          {termsData.terms_and_conditions &&
            Object.entries(termsData.terms_and_conditions).map(
              ([heading, content], index) => (
                <div key={index} className="mb-10">
                  <h2 className="font-bricolage text-[#34352E] font-extrabold text-[28px] leading-[30px] py-2 md:py-4">
                    {heading}
                  </h2>
                  {Array.isArray(content) ? (
                    content.map((para: string, idx: number) => (
                      <p
                        key={idx}
                        className="text-[18px] text-[#5F6057] font-normal leading-[25px] mb-4 text-justify"
                      >
                        {para}
                      </p>
                    ))
                  ) : (
                    <p className="text-[18px]  text-[#5F6057] font-normal leading-[25px] mb-4 text-justify">
                      {content}
                    </p>
                  )}
                </div>
              ),
            )}
        </CardContent>
      </Card>
    </div>
  );
}
