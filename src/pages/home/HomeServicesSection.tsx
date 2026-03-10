import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../../components/ui/ServiceCard";
import SearchBar from "../../components/ui/SearchBar";
import Badge from "../../components/ui/Badge";
import { useAllServices } from "../../hooks/useServices";
import { Service } from "../../types/services";
import PrimaryButton from "@/components/ui/PrimaryButton";

const ServicesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useAllServices();
  const services = data?.services ?? [];

  const filteredServices = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return services.filter((service: Service) => {
      const isActive =
        service.active === undefined
          ? true
          : service.active === true || service.active === 1;
      if (!isActive) return false;
      if (!query) return true;
      const title = service.title?.toLowerCase() ?? "";
      const desc = service.description_short?.toLowerCase() ?? "";
      return title.includes(query) || desc.includes(query);
    });
  }, [services, searchQuery]);

  const displayServices = searchQuery.trim()
    ? filteredServices
    : filteredServices.slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-10 text-center text-gray-600">
        Loading services…
      </section>
    );
  }

  return (
    <section className="w-full full-bleed bg-[#FBFBFA] py-16">
      <div className="w-full max-w-[1320px] px-4 mx-auto flex flex-col items-center">
        <Badge text="Servizi" width="115px" center />

        <div className="text-center mb-10">
          <h2 className="heading-base font-bricolage mt-6 md:mt-2">
            <span className="block lg:inline">I nostri servizi</span>
          </h2>
          <p className="text-base max-w-[660px] mt-4 mx-auto">
            Scopri le agevolazioni a cui hai diritto e completa le tue pratiche
            online. Un operatore dedicato ti segue in ogni fase, dall’ISEE al
            730, fino a NASpI e altri servizi.
          </p>
        </div>

        <div className="flex justify-center w-full mb-10">
          <SearchBar
            value={searchQuery}
            onSearch={setSearchQuery}
            wrapperClass="w-full max-w-[720px]"
            placeholder="cerca un servizio"
          />
        </div>

        <div className="md:hidden w-full overflow-x-auto ">
          <div className="flex gap-4 justify-start">
            {displayServices.map((service: Service) => (
              <div key={service.id} className="max-w-[300px] flex-shrink-0">
                <ServiceCard
                  title={service.title}
                  description_short={service.description_short}
                  description_long={service.description_long}
                  price={service.price}
                  advantages={service.advantages}
                  identifier={service.identifier ?? service.id}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-10 w-full">
          {displayServices.length > 0 ? (
            displayServices.map((service: Service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description_short={service.description_short}
                description_long={service.description_long}
                price={service.price}
                advantages={service.advantages}
                identifier={service.identifier ?? service.id}
                active={service.active}
              />
            ))
          ) : (
            <div className="col-span-full mt-6 text-center">
              <p className="text-base">Nessun servizio trovato.</p>
            </div>
          )}
        </div>

        <div className="hidden md:flex justify-center mt-10">
          <Link to="/servizi">
            <PrimaryButton text="Esplora i servizi" width="262px" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
