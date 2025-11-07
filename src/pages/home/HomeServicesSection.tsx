import { useState } from "react";
import { Link } from "react-router-dom";
import { cardData } from "../../data/CardData";
import ServiceCard from "../../components/ui/ServiceCard";
import SearchBar from "../../components/ui/SearchBar";
import Badge from "../../components/ui/Badge";

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

  const displayServices = filteredServices.slice(0, 6);

  return (
    <section className="w-full py-10">
      <div className="container-main">
        <div className="w-full flex flex-col items-center justify-center text-center mb-12">
         <Badge text="Services " width="115px"/>

          <h2 className="font-bricolage heading-base">
            All Your Needs, in One Place.
          </h2>

          <p className="text-base">
            Access over 150 certified CAF and patronage services, guided step by
            real experts, all from the comfort of your home.
          </p>
        </div>
        <div className="w-full flex items-center justify-center md:px-0 px-4 mb-10">
          <SearchBar
            onSearch={handleSearch}
            wrapperClass="w-[400px] lg:w-[1320px] w-full place"
          />
        </div>

        <div className="block md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-4">
            {displayServices.map((service) => (
              <div key={service.link} className="min-w-[280px]">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  vatIncluded={service.vatIncluded}
                  hours={service.hours}
                  link={service.link}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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

        <div className="hidden lg:flex justify-center">
          <Link
            to="/services"
            className="text-[#0166FF] text-lg font-semibold hover:underline flex items-center gap-2"
          >
            Explore All Services
            <span>&gt;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
