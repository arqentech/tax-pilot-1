import PrimaryButton from "@/components/ui/PrimaryButton";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="w-full py-10">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full flex flex-col items-center text-center md:items-start md:text-left space-y-6 md:space-y-8">
          <h1 className="font-bricolage main-heading ">
            <span className="">Online taxes made</span>
            <span className="block whitespace-nowrap">
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

        <div className="flex justify-center mt-4 w-full">
          <img
            src="/svg/hero-illustration.png"
            alt="Hero illustration showing online tax services"
            className=" h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
