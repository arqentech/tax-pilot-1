const WhatDefinesUs = () => {
  return (
    <section className="w-full py-10">
      <div className="page-container">
        <div className="flex flex-col items-center md:grid md:grid-cols-2 gap-6 mb-12 text-center md:text-left">
          <h2 className="heading-base">
            What defines us
          </h2>

          <p className="text-[18px] font-medium leading-[25px] lg:text-[20px]:">
            Access over 150 certified CAF and patronage services, guided step by
            step by real experts, all from the comfort of your home.
          </p>
        </div>

        <div className="w-full bg-[#FBFBFA] jutify-center items-center rounded-[24px] border border-[#E6E6E1] py-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-row lg:flex-col items-center lg:items-center text-center gap-4 lg:gap-6 px-6 py-4 ${
                index !== 0 ? "lg:border-l lg:border-[#E5E5E5]" : ""
              }`}
            >
              <div className="w-20 h-20 rounded-full bg-[#34352E] flex items-center justify-center shrink-0">
                <img src={feature.icon} alt={feature.title} />
              </div>

              <div className="flex flex-col items-start text-start lg:items-center lg:text-center">
                <h3 className="font-bricolage tracking-[-0.09em] font-extrabold text-[26px] lg:text-[36px] leading-[34px] lg:leading-[48px]">
                  {feature.title}
                </h3>
                <p className="text-[14px] leading-[18px] lg:text-[18px] lg:leading-[25px]">
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

const features = [
  {
    title: "Effortless",
    description:
      "File your taxes and upload documents in just a few clicks—our experts handle the rest.",
    icon: "/svg/effortless.svg",
  },
  {
    title: "Convenient",
    description:
      "Access over 150 CAF and patronage services anytime, anywhere, directly from your phone or computer.",
    icon: "/svg/convenient.svg",
  },
  {
    title: "Secured",
    description:
      "Your data is encrypted, verified, and processed only by professionals—privacy and accuracy guaranteed.",
    icon: "/svg/secured.svg",
  },
];
