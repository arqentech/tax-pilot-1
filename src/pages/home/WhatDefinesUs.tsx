import React from "react";

const features = [
  {
    title: "Semplice",
    description:
      "Puoi gestire le tue pratiche in comodità, ovunque tu sia e in pochi click.",
    icon: "/svg/effortless.svg",
  },
  {
    title: "Veloce",
    description:
      "Più veloci di un razzo! Prenderemo in carica la tua pratica in mendo di 24 ore.",
    icon: "/svg/convenient.svg",
  },
  {
    title: "Sicuro",
    description:
      "Ti sarà assegnato un operatore personale a cui potrai scrivere via chat per qualsiasi domanda!",
    icon: "/svg/secured.svg",
  },
];

const WhatDefinesUs: React.FC = () => {
  return (
    <section className="w-full md:py-24">
      <div className="page-container">
        <div className="flex flex-col items-center md:grid md:grid-cols-2 gap-6 mb-12 text-center md:text-left">
          <h2 className="heading-base font-bricolage block whitespace-nowrap">
            Perché farlo con TaxPilot
          </h2>
          <div>
            <p className="text-base text-right">
              Con noi puoi usufruire di oltre 150 servizi forniti da CAF e
            </p>
            <p className="text-base text-right">
              patronato, ricevendoli comodamente in formato digitale
            </p>
            <p className="text-base text-right">senza dover uscire di casa.</p>
          </div>
        </div>

        <div className="hidden lg:flex w-full bg-[#FBFBFA] rounded-[24px] border border-[#E6E6E1] justify-between p-12 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex-1 flex flex-col items-center text-center px-6 ${
                index !== 0 ? "border-l border-[#E5E5E5]" : ""
              }`}
            >
              <div className="w-20 h-20 rounded-full bg-[#34352E] flex items-center justify-center mb-4">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-20 h-20"
                />
              </div>
              <h3 className="font-bricolage text-[#34352E] tracking-[-0.09em] font-extrabold text-[36px] leading-[73px]">
                {feature.title}
              </h3>
              <p className="text-[18px] text-[#5F6057] leading-[25px] mt-2 text-[#555]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:hidden grid grid-cols-1 gap-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-row items-center gap-4 px-6 py-6 bg-[#FBFBFA] border border-[#E6E6E1] rounded-[24px]"
            >
              <div className="w-16 h-16 rounded-full bg-[#34352E] flex items-center justify-center shrink-0">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-20 h-20"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bricolage text-[#34352E] tracking-[-0.09em] font-extrabold text-[26px] leading-[34px]">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-[#5F6057] leading-[20px] text-[#555]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatDefinesUs;
