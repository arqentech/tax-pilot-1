import HowWeWork from "../../components/ui/HowWeWork";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import TeamSection from "./TeamSection";
import WhatDefinesUs from "./WhatDefinesUs";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <WhatDefinesUs />
      <HowWeWork />
      <ServicesSection />
      <TeamSection />
    </div>
  );
}
