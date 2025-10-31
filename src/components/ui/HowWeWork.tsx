import { Lightbulb, Link as LinkIcon, MessageSquare } from "lucide-react";
import React from "react";

export default function HowWeWork() {
  return (
    <section className="page-container py-24">
      <div className="grid md:grid-cols-2 rounded-[26px] bg-[#2563EB] text-white overflow-hidden shadow-lg">
        <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
          <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium w-fit">
            How we work
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bricolage font-extrabold leading-tight flex flex-col">
            <span>We Simplify</span>
            <span>Taxes, Together.</span>
          </h2>
          <p className="mt-6 max-w-md text-[#BFDDFF] text-lg leading-relaxed">
            With TaxPilot, you're never alone. Our digital platform keeps things
            simple while real professionals personally guide your entire process
            step by step.
          </p>
          <div className="mt-10">
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#FDE047] to-[#FACC15] px-6 py-3 font-semibold text-[#34352E] shadow-md hover:brightness-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-200"
            >
              Explore Services
              <span aria-hidden className="text-xl">›</span>
            </a>
          </div>
        </div>

        <div className="relative border-t md:border-t-0 md:border-l border-white/20 bg-[#1E40AF]/50">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`relative px-8 sm:px-10 lg:px-14 py-10 ${
                idx !== 0 ? "border-t border-white/20" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 text-[#FCD34D] flex-shrink-0">{step.icon}</div>
                <div className="pr-16 md:pr-24">
                  <h3 className="text-xl font-semibold font-bricolage">{step.title}</h3>
                  <p className="mt-2 text-[#BFDDFF] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-7xl md:text-8xl font-extrabold text-white/10 font-bricolage">
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
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Compare and Choose",
    description:
      "Select your service and upload your documents securely. No paperwork or queues just a few clicks.",
    number: "01",
  },
  {
    icon: <LinkIcon className="h-6 w-6" />,
    title: "Personalized Analysis",
    description:
      "Our certified experts review your data carefully and handle every detail for accurate results.",
    number: "02",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Real-Time Consultation",
    description:
      "Get your completed file right in your dashboard and email or WhatsApp fast, simple, and secure.",
    number: "03",
  },
];
