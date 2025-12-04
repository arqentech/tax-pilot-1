import PrimaryButton from "@/components/ui/PrimaryButton";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="full-bleed relative bg-[#FBFBFA] pt-[20px] pb-16  md:pb-24">
      <div className=" global-container flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-16">
        <div className=" w-full flex flex-col items-center text-center md:items-start md:text-left space-y-6 md:space-y-8">
          <h1 className="font-bricolage main-heading ">
            <span className="md:inline-block lg:whitespace-nowrap ">
              Online taxes made {""}
            </span>
            <span className="md:block lg:whitespace-nowrap">
              Simple with Tax Pilot .
            </span>
          </h1>
          <p className="text-base leading-relaxed max-w-lg opacity-90">
            Access over 150 certified CAF and patronage services, guided step by
            step by real experts, all from the comfort of your home.
          </p>
          <Link to="/services">
            <PrimaryButton text="Explore Services" width="262px" />
          </Link>
        </div>

        {/* <div className="mx-auto w-full max-w-[360px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[646px] md:mx-0">
          <img
            src="/svg/hero-illustration.png"
            alt="Hero illustration showing online tax services"
            className="h-auto w-full object-contain"
            loading="lazy"
          />
        </div> */}
        <div className=" w-full max-w-[360px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[646px] md:mx-0">
          <div className="w-full relative items-end  flex w-full max-w-[320px] justify-center sm:max-w-[380px]">
            <img
              src="/svg/home/hero-illustration-1.svg"
              alt="Man using laptop for tax calculation"
              className="h-auto w-full max-w-[310px] object-contain translate-x-[-140px] translate-y-[20px]"
              loading="lazy"
            />

            <img
              src="/svg/home/hero-illustration-2.svg"
              alt="Percentage icon"
              className="absolute right-[90px] h-auto max-w-[100px] object-contain 
                 -top-10 "
              loading="lazy"
            />

            <img
              src="/svg/home/hero-illustration-3.svg"
              alt="Dollar icon"
              className="absolute max-w-[50px] -top-10 right-[52%] h-auto w-[75px] translate-x-[30%] object-contain 
                 sm:-top-18 sm:right-[56%] sm:w-[85px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
