import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HowWeWork() {
  return (
    <section className="full-bleed-mobile py-10 ">
      <div>
        <div className="grid md:grid-cols-2 bg-[#037BFF] md:rounded-[32px] justify-center items-center text-white overflow-hidden shadow-xl relative">
          <div className="flex flex-col md:items-start items-center justify-center px-8 lg:px-20 py-12 lg:py-24">
            <span className="w-[156px] h-[34px] inline-flex items-center justify-center rounded-full bg-[#006ADE] font-medium backdrop-blur-md">
              How we work?
            </span>

            <h2 className="mt-6 md:text-left text-center font-bricolage text-[38px] lg:text-[58px] lg:leading-[59px] font-extrabold leading-[38px] tracking-[-0.05em]">
              <span className="block whitespace-nowrap">We Simplify</span>
              <span className="block whitespace-nowrap">Taxes, Together.</span>
            </h2>

            <p className="mt-6 md:text-justify text-center text-[#BFDDFF] text-[18px] lg:text-[20px] leading-[25px]">
              With TaxPilot, you're never alone. Our digital platform keeps
              things simple while real professionals personally guide your
              entire process step by step.
            </p>

            <Link
              to="/services"
              className="hidden lg:inline-flex font-bricolage mt-10 leading-[100%] w-[262px] h-[62px] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#FFDD77] to-[#FFC107] font-extrabold text-[#34352E] text-[24px] shadow-[0_6px_18px_rgba(0,0,0,0.12)] hover:brightness-105 transition duration-200"
            >
              Explore Services
              <ChevronRight size={22} strokeWidth={4} />
            </Link>
          </div>

          <div className="relative bg-[#037BFF] flex flex-col items-start justify-center border-t border-[1px] border-[#51A4FF] overflow-hidden md:border-t-0">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className={`relative w-full overflow-hidden ${
                  idx !== 0 ? "border-t border-[1px] border-[#51A4FF]" : ""
                }`}
              >
                <div className="flex flex-col items-start gap-4 px-5 sm:px-12 py-8 max-w-[450px] w-[70%]">
                  <img
                    src={step.icon}
                    alt={`${step.title} icon`}
                    className="w-10 h-10 flex-shrink-0"
                  />

                  <div className="flex flex-col justify-between text-left">
                    <h3 className="text-[26px] md:text-[28px] font-extrabold font-bricolage mt-2">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[#BFDDFF] font-semibold leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="absolute bottom-[-1.5rem] right-[-2.5rem] md:right-[-1.5rem] lg:bottom-[-2.5rem] lg:right-[-2rem] pointer-events-none select-none">
                    <span className="inline-block text-left w-[2ch] text-[150px] lg:text-[220px] font-bold font-degular text-white/10 leading-[100%]">
                      {step.number}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type Step = {
  icon: string;
  title: string;
  description: string;
  number: string;
};

const steps: Step[] = [
  {
    icon: "/svg/bulb.svg",
    title: "Compare and Choose",
    description:
      "Select your service and upload your documents securely. No paperwork or queues — just a few clicks.",
    number: "01",
  },
  {
    icon: "/svg/analysis.svg",
    title: "Personalized Analysis",
    description:
      "Our certified experts review your data carefully and handle every detail for accurate results.",
    number: "02",
  },
  {
    icon: "/svg/consultation.svg",
    title: "Real-Time Consultation",
    description:
      "Get your completed file right in your dashboard and email or WhatsApp fast, simple, and secure.",
    number: "03",
  },
];
