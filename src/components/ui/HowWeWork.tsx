import { Lightbulb, Link as LinkIcon, MessageSquare } from "lucide-react";
import React from "react";

export default function HowWeWork() {
  return (
    <section className="page-container py-28">
      <div className="grid md:grid-cols-2 bg-[#2563EB] rounded-[32px] text-white overflow-hidden shadow-xl">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-16 lg:py-24">
          <span className="inline-flex items-center rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium backdrop-blur-md">
            How we work
          </span>

          <h2 className="mt-6 font-bricolage font-extrabold text-[42px] sm:text-[52px] lg:text-[64px] leading-[1.1]">
            We Simplify
            <br /> Taxes, Together.
          </h2>

          <p className="mt-6 max-w-md text-[#BFDDFF] text-lg leading-relaxed">
            With TaxPilot, you're never alone. Our digital platform keeps things
            simple while real professionals personally guide your entire process
            step by step.
          </p>

          <a
            href="#services"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#FDE047] to-[#FACC15] px-7 py-3.5 text-lg font-semibold text-[#34352E] shadow-[0_6px_18px_rgba(0,0,0,0.12)] hover:brightness-105 transition duration-200"
          >
            Explore Services
            <span className="text-xl">›</span>
          </a>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative bg-[#1D4ED8]">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`relative px-8 sm:px-12 lg:px-20 py-12 ${
                idx !== 0 ? "border-t border-white/15" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-[#FCD34D] flex-shrink-0 mt-[2px]">
                  {step.icon}
                </div>

                <div className="pr-20">
                  <h3 className="text-xl font-semibold font-bricolage">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[#D6E7FF] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[110px] lg:text-[140px] font-extrabold text-white/10 font-bricolage select-none pointer-events-none">
                {step.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Step = {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
};

const steps: Step[] = [
  {
    icon: <Lightbulb className="h-7 w-7 stroke-[2.3]" />,
    title: "Compare and Choose",
    description:
      "Select your service and upload your documents securely. No paperwork or queues just a few clicks.",
    number: "01",
  },
  {
    icon: <LinkIcon className="h-7 w-7 stroke-[2.3]" />,
    title: "Personalized Analysis",
    description:
      "Our certified experts review your data carefully and handle every detail for accurate results.",
    number: "02",
  },
  {
    icon: <MessageSquare className="h-7 w-7 stroke-[2.3]" />,
    title: "Real-Time Consultation",
    description:
      "Get your completed file right in your dashboard and email or WhatsApp fast, simple, and secure.",
    number: "03",
  },
];
