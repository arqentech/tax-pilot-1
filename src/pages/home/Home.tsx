import FAQ from "../../components/ui/FAQ";
import HowWeWork from "../../components/ui/HowWeWork";
import HeroSection from "./HeroSection";
import ServicesSection from "./HomeServicesSection";
import TeamCard from "./TeamSection";
import WhatDefinesUs from "./WhatDefinesUs";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <WhatDefinesUs />
      <HowWeWork />
      <ServicesSection />
      <TeamCard />
      <FAQ/>
    </div>
  );
}
