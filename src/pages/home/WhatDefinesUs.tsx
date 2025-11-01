const WhatDefinesUs = () => {
  return (
    <section className="w-full py-16">
      <div className="page-container">
        {/* Title + Paragraph */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 mb-12 text-center md:text-left">
          <h2 className="text-[#34352E] font-extrabold text-[38px] lg:text-[58px] tracking-[-0.08em]">
            What defines us
          </h2>

          <p className="text-[#555] text-base md:text-lg max-w-[480px] md:ml-auto mx-auto md:mx-0">
            Access over 150 certified CAF and patronage services, guided step by
            step by real experts, all from the comfort of your home.
          </p>
        </div>

        {/* Features Container */}
        {/* Features Container */}
        <div className="w-full bg-[#FBFBFA] rounded-[24px] border border-[#E5E5E5] px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-row sm:flex-col items-start sm:items-center gap-4 sm:gap-6 py-4 sm:py-0 sm:px-6 ${
                index !== 0 ? "sm:border-l sm:border-[#E5E5E5]" : ""
              }`}
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-full bg-[#34352E] flex items-center justify-center shrink-0">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-10 h-10"
                />
              </div>

              {/* Text Section */}
              <div className="flex flex-col sm:items-center">
                <h3 className="text-[#34352E] font-semibold text-[20px] md:text-[22px] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#5C5C5C] text-[15px] md:text-[16px] leading-[24px] max-w-[260px] sm:text-center">
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
