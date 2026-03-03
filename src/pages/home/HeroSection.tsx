import PrimaryButton from "@/components/ui/PrimaryButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { floatUpDown } from "@/animations/float";

const HeroSection = () => {
  return (
    <section className="full-bleed relative bg-[#FBFBFA] ">
      <div className="global-container grid md:grid-cols-2 gap-2 md:gap-16 items-center py-10">
        <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6 py-10">
          <h1 className="font-bricolage main-heading max-w-full -mt-10">
            <span className="block whitespace-nowrap">
              La burocrazia non deve
            </span>
            <span className="block whitespace-nowrap">
              complicarti la vita.
            </span>
          </h1>
          <div>
            <p className="text-base leading-relaxed w-full">
              Con TaxPilot risolvi le tue pratiche fiscali online, ma con
              persone vere al tuo fianco.
            </p>
            <span className="text-base leading-relaxed w-full">
              Niente linguaggio incomprensibile, niente rimbalzi tra uffici:
              carichi i documenti e un professionista ti segue fino alla
              consegna.
            </span>
          </div>
          <Link to="/services">
            <PrimaryButton text="Esplora i servizi" width="262px" />
          </Link>
        </div>

        <div className="relative w-full max-w-[700px] mx-auto">
          <img
            src="/svg/home/hero-illustration-1.svg"
            alt="Man using laptop for tax calculation"
            className="w-full h-[clamp(300px,60vw,500px)] object-contain mt-10"
            loading="lazy"
          />

          <div className="absolute md:top-[5%] md:right-[3%] sm:top-[5%] sm:right-[15%] top-[5%] right-[7%] flex items-start gap-2">
            <motion.img
              src="/svg/home/hero-illustration-3.svg"
              alt="Dollar icon"
              className="w-[clamp(32px,5vw,60px)] h-auto object-contain"
              loading="lazy"
              variants={floatUpDown(12, 3)}
              animate="animate"
            />

            <motion.img
              src="/svg/home/hero-illustration-2.svg"
              alt="Percentage icon"
              className="w-[clamp(38px,8vw,80px)] h-auto object-contain mt-4"
              loading="lazy"
              variants={floatUpDown(16, 3.5, 0.4)}
              animate="animate"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
