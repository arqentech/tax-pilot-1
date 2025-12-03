import PrimaryButton from "@/components/ui/PrimaryButton";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-[#FBFBFA] w-full py-10">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-16 px-6">
        <div className="w-full flex flex-col items-center text-center md:items-start md:text-left space-y-6 md:space-y-8">
          <h1 className="font-bricolage main-heading ">
            <span className="md:inline-block lg:whitespace-nowrap">
              Online taxes made
            </span>
            <span className="md:block lg:whitespace-nowrap">
              Simple with Tax Pilot.
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

        <div className="w-full max-w-[360px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[646px] mx-auto md:mx-0">
          <img
            src="/svg/hero-illustration.png"
            alt="Hero illustration showing online tax services"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
