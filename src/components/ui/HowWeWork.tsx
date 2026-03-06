import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HowWeWork() {
  return (
    <section className="full-bleed-mobile py-10 ">
      <div>
        <div className="grid md:grid-cols-2 bg-[#037BFF] md:rounded-[32px] justify-center items-center text-white overflow-hidden shadow-xl relative">
          <div className="flex flex-col md:items-start items-center justify-center px-8 md:px-20 py-12 md:py-24">
            <span className="w-[156px] h-[34px] inline-flex items-center justify-center rounded-full bg-[#006ADE] font-medium backdrop-blur-md">
              Come funziona
            </span>

            <h2 className="mt-6 md:text-left text-center font-bricolage text-[38px] md:text-[58px] md:leading-[59px] font-extrabold leading-[38px] tracking-[-0.05em]">
              <span className="block whitespace-nowrap">La burocrazia,</span>
              <span className="block whitespace-nowrap"> affrontata </span>
              <span className="block whitespace-nowrap"> insieme.</span>
            </h2>

            <p className="mt-6 md:text-left text-center text-[#BFDDFF] text-[18px] md:text-[20px] leading-[25px]">
              Una piattaforma digitale con il supporto di professionisti
              esperti.Carichi i documenti, noi ci occupiamo del resto, con
              controllo umano e gestione accurata.
            </p>

            <Link
              to="/servizi"
              className="hidden lg:inline-flex font-bricolage mt-10 leading-[100%] w-[262px] h-[62px] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#FFDD77] to-[#FFC107] font-extrabold text-[#34352E] text-[24px] shadow-[0_6px_18px_rgba(0,0,0,0.12)] hover:brightness-105 transition duration-200"
            >
              Inizia ora
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
                    <h3 className="text-[26px] md:text-[28px] font-extrabold font-bricolage mt-2 leading-[30px]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[#BFDDFF] text-[18px] md:text-[20px] leading-[25px]">
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
    title: "Scegli il servizio",
    description:
      "Acquista il servizio di cui hai bisogno e carica i documenti in modo sicuro.",
    number: "01",
  },
  {
    icon: "/svg/analysis.svg",
    title: "Carica i documenti",
    description:
      "Un operatore controlla tutto, ti contatta se serve un’integrazione e verifica che ogni dato sia corretto.",
    number: "02",
  },
  {
    icon: "/svg/consultation.svg",
    title: "Ricevi il risultato",
    description:
      "Ti consegniamo la documentazione completa nella tua area personale e via email. Se hai dubbi, sai sempre a chi scrivere.",
    number: "03",
  },
];
