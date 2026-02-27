import { Card, CardContent } from "@/components/ui/card";
import generalTermsData from "./generalTermsData.json";

export default function GeneralTerms() {
  return (
    <div className="w-full flex justify-center py-10">
      <Card className="w-full h-auto rounded-[26px] md:px-6 shadow-sm bg-white border-[#E6E6E1]">
        <CardContent className="py-5">
          <h1 className="font-bricolage sub-heading text-center py-10">
            {generalTermsData.title}
          </h1>

          {generalTermsData.sections.map((section, index) => (
            <div key={index} className="mb-10">
              <h2 className="font-bricolage text-[#34352E] font-extrabold text-[28px] leading-[30px] py-2 md:py-4">
                {section.heading}
              </h2>
              {section.content.map((para: string, idx: number) => (
                <p
                  key={idx}
                  className="text-[18px] text-[#5F6057] font-normal leading-[25px] mb-4 text-justify"
                >
                  {para}
                </p>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
