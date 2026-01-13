import ClientReviews from "@/components/ui/ClientReview";
import HowWeWork from "../../components/ui/HowWeWork";
import TaxPilotSection from "../../components/ui/TaxPilotSection";
import HeroSection from "./HeroSection";
import HomePageFAQ from "./HomePageFAQ";
import ServicesSection from "./HomeServicesSection";
import TeamCard from "./TeamSection";
import WhatDefinesUs from "./WhatDefinesUs";
import HomeBlogSection from "./HomeBlogSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <WhatDefinesUs />
      <HowWeWork />
      <ServicesSection />
      <TeamCard />
      <ClientReviews />
      <HomePageFAQ />
      <HomeBlogSection />
      <TaxPilotSection />
    </div>
  );
}
