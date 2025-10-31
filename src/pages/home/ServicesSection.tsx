import { useState } from "react";
import { Link } from "react-router-dom";
import { cardData } from "../../data/CardData";
import ServiceCard from "../../components/ui/ServiceCard";
import SearchBar from "../../components/ui/SearchBar";
import FilterButton from "../../components/ui/FilterButton";

const ServicesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredServices = cardData.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Display first 6 services
  const displayServices = filteredServices.slice(0, 6);

  return (
    <section className="w-full py-24">
      <div className="container-main">
        <div className="w-full flex flex-col items-center justify-center text-center mb-12">
          <div className="flex justify-center mb-6">
            <span className="inline-block bg-[#E6E6E1] text-[#34352E] text-sm font-medium px-4 py-2 rounded-full">
              Services
            </span>
          </div>

          <h2 className="font-bricolage font-extrabold text-center text-[42px] md:text-[58px] lg:text-[72px] leading-[52px] md:leading-[73px] tracking-[-0.05em] text-[#34352E] max-w-[860px] mx-auto">
            All Your Needs, in One Place.
          </h2>

          <div className="font-bricolage text-center text-[18px] md:text-[20px] lg:text-[22px] leading-[28px] md:leading-[32px] tracking-[-0.01em] text-[#5A5A5A] max-w-[800px] mx-auto mt-4">
            <p>
              Access over 150 certified CAF and patronage services, guided step
              by
            </p>
            <p>real experts, all from the comfort of your home.</p>
          </div>
        </div>

        {/* Search Bar and Filter */}
        <div className="w-full flex items-center justify-center p-4">
          <SearchBar
            onSearch={handleSearch}
            size="lg"
            className="w-full max-w-[600px]"
          />
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 p-4">
          {displayServices.map((service) => (
            <ServiceCard
              key={service.link}
              title={service.title}
              description={service.description}
              price={service.price}
              vatIncluded={service.vatIncluded}
              hours={service.hours}
              link={service.link}
            />
          ))}
        </div>

        {/* Explore All Services Link */}
        <div className="flex justify-center">
          <Link
            to="/services"
            className="text-[#0166FF] text-lg font-semibold hover:underline flex items-center gap-2"
          >
            Explore All Services
            <span> &gt;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
