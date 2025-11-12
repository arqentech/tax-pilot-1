import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className=" bg-[#FBFBFA] w-full py-4 overflow-hidden ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
        <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6 md:space-y-8 max-w-xl mx-auto">
          <h1 className="font-bricolage font-extrabold text-[44px] leading-[38px] lg:text-[86px] lg:leading-[73px] tracking-[-0.09em] ">
            <span className="">Online taxes made</span>
            <span className="block whitespace-nowrap">
              Simple with Tax Pilot.
            </span>
          </h1>
          <p className="text-base lg:text-lg font-normal leading-relaxed max-w-lg opacity-90">
            Access over 150 certified CAF and patronage services, guided step by
            step by real experts, all from the comfort of your home.
          </p>
          <Link
            to="/services"
            className="flex items-center gap-2 bg-[#0166FF] text-white text-[24px] font-extrabold rounded-full px-8 py-4 md:px-10 md:py-5 hover:bg-[#005AE0] transition-all duration-300 shadow-[0_4px_12px_rgba(1,102,255,0.25)] hover:shadow-[0_6px_16px_rgba(1,102,255,0.35)]"
          >
            Explore Services
            <span> &gt;</span>
          </Link>
        </div>

        <div className="flex justify-center w-full ">
          <img
            src="/svg/hero-illustration.png"
            alt="Hero illustration showing online tax services"
            className=" w-[328.36px] lg:w-[646.11px] h-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
