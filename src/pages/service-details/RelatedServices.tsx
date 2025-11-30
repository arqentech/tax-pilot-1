import { useState } from "react";
import { cardData } from "../../data/CardData";
import ServiceCard from "../../components/ui/ServiceCard";
import Badge from "../../components/ui/Badge";

const RelatedServices = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = cardData.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayServices = filteredServices.slice(0, 3);

  return (
    <section className="w-full py-10">
      <div className="w-full">
        <div className="w-full flex flex-col items-center justify-center text-center mb-12">
          <Badge text="Services " width="115px" />

          <h2 className="font-bricolage heading-base">Related Services</h2>

          <p className="text-base">
            Access over 150 certified CAF and patronage services, guided step by
            real experts, all from the comfort of your home.
          </p>
        </div>

        <div className="block w-full sm:hidden overflow-x-auto mt-14 max-w-[300px] mx-auto">
          <div className="flex gap-4 ">
            {displayServices.map((service) => (
              <div key={service.link} className="min-w-[300px]">
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

        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
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
      </div>
    </section>
  );
};

export default RelatedServices;
