import { Link } from "react-router-dom";

export default function HowWeWork() {
  return (
    <section className="w-full py-10">
      <div className="grid md:grid-cols-2 bg-[#037BFF] rounded-[32px] justify-center items-center text-white overflow-hidden shadow-xl">
        <div className="flex flex-col justify-center px-8 lg:px-20 py-16 lg:py-24">
          <span className="w-[156px] h-[34px] inline-flex items-center justify-center rounded-full bg-[#006ADE] font-medium backdrop-blur-md">
            How we work
          </span>

          <h2 className="mt-6 font-bricolage text-[38px] lg:text-[58px] lg:leading-[59px] font-extrabold leading-[38px] tracking-[-0.03em]">
            We Simplify Taxes, Together.
          </h2>

          <p className="mt-6 text-[#BFDDFF] text-[18px] lg:text-[20px] leading-[25px]">
            With TaxPilot, you're never alone. Our digital platform keeps things
            simple while real professionals personally guide your entire process
            step by step.
          </p>

          <Link
            to="/services"
            className="hidden lg:inline-flex font-bricolage mt-10 leading-[100%] w-[262px] h-[62px] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#FFDD77] to-[#FFC107] font-extrabold text-[#34352E] text-[24px] shadow-[0_6px_18px_rgba(0,0,0,0.12)] hover:brightness-105 transition duration-200"
          >
            Explore Services
            <span className="text-xl">›</span>
          </Link>
        </div>

        <div className="relative bg-[#037BFF] flex flex-col items-center justify-center">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`relative px-5 sm:px-12 lg:px-20 py-12 w-full flex items-start gap-4 ${
                idx !== 0 ? "border-t border-white/15" : ""
              }`}
            >
              <img
                src={step.icon}
                alt={`${step.title} icon`}
                className="w-10 h-10 flex-shrink-0 mt-[2px]"
              />

              <div className="pr-20 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold font-bricolage">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[#D6E7FF] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className=" absolute right-0 bottom-0 text-[121px] lg:text-[220px] font-bold text-white/10 leading-[100%] select-none pointer-events-none">
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
      "Get your completed file right in your dashboard and email or WhatsApp — fast, simple, and secure.",
    number: "03",
  },
];
