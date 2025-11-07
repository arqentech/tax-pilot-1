import BlogSection from "../../components/ui/blogs/BlogSection";
import FAQ from "../../components/ui/FAQ";
import HowWeWork from "../../components/ui/HowWeWork";
import TaxPilotSection from "../../components/ui/TaxPilotSection";
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
      <FAQ />
      <BlogSection />
      <TaxPilotSection/>
    </div>
  );
}
