import { Card, CardContent } from "@/components/ui/card";
import policyData from "./policyData.json";

export default function PrivacyPolicy() {
  return (
    <div className="w-full flex justify-center py-10">
      <Card className="w-auto h-auto md:h[1913px] rounded-[26px] p-10 shadow-sm bg-white border-[#E6E6E1]">
        <CardContent className="py-5">
          <h1 className="font-bricolage sub-heading text-center py-10">{policyData.title}</h1>

          {policyData.sections.map((section, index) => (
            <div key={index} className="mb-10">
              <h2 className="font-bricolage font-extrabold text-[28px] leading-[30px] py-2 md:py-4 ">
                {section.heading}
              </h2>
              {section.content.map((para, idx) => (
                <p
                  key={idx}
                  className="text-[18px] font-normal leading-[25px] mb-4"
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
