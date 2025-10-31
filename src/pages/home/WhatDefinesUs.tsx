const WhatDefinesUs = () => {
  return (
    <section className="w-full py-4 overflow-hidden">
      <div className="page-container text-center grid grid-cols-2 ">
        <h2 className="text-[#34352E] font-extrabold text-[28px] sm:text-[36px] md:text-[48px] leading-tight mb-6">
          What Defines Us
        </h2>

        <p className="text-[#555] sm:text-lg md:text-[18px] p-2">
          At TaxPilot, we simplify complex tax and administrative services,
          combining modern technology with expert human guidance. Our goal is to
          make financial processes transparent, efficient, and stress-free for
          individuals and businesses alike.
        </p>

        <div className="bg-[#FBFBFA] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10  py-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center py-4"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-16 h-16 md:w-20 md:h-20"
              />
              <h3 className="text-[#34352E] font-semibold text-[20px] md:text-[24px]">
                {feature.title}
              </h3>
              <p className="text-[#5C5C5C] text-[16px] md:text-[18px] leading-[24px] max-w-[300px]">
                {feature.description}
              </p>
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
      "Simplify your tax journey with an intuitive platform designed for ease.",
    icon: "/svg/effortless.svg",
  },
  {
    title: "Convenient",
    description:
      "Access services anytime, anywhere — from the comfort of your home.",
    icon: "/svg/convenient.svg",
  },
  {
    title: "Secured",
    description:
      "Your data is protected with end-to-end encryption and GDPR compliance.",
    icon: "/svg/secured.svg",
  },
];
