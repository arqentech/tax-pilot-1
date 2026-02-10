import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../../components/ui/ServiceCard";
import SearchBar from "../../components/ui/SearchBar";
import Badge from "../../components/ui/Badge";
import { ChevronRight } from "lucide-react";
import { useServices } from "../../hooks/useServices";
import { Service } from "../../types/services";

const ServicesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: services = [], isLoading } = useServices();

  const filteredServices = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return services.filter(
      (service: Service) =>
        service.title.toLowerCase().includes(query) ||
        service.description_short?.toLowerCase().includes(query)
    );
  }, [services, searchQuery]);

  const displayServices = filteredServices.slice(0, 6);

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
        <Badge text="Services" width="115px" center />

        <div className="text-center mb-10">
          <h2 className="heading-base font-bricolage mt-6 md:mt-2">
            <span className="block lg:inline">All Your Tax Needs,</span>{" "}
            <span className="block lg:inline">in One Place.</span>
          </h2>
          <p className="text-base max-w-[660px] mt-4 mx-auto">
            Access over 150 certified CAF and patronage services, guided step by
            real experts, all from the comfort of your home.
          </p>
        </div>

        <div className="flex justify-center w-full mb-10">
          <SearchBar
            value={searchQuery}
            onSearch={setSearchQuery}
            wrapperClass="w-full max-w-[720px]"
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
          {displayServices.map((service: Service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description_short={service.description_short}
              description_long={service.description_long}
              price={service.price}
              advantages={service.advantages}
              identifier={service.identifier ?? service.id}
            />
          ))}
        </div>

        <div className="hidden md:flex justify-center mt-10">
          <Link
            to="/services"
            className="text-[24px] text-[#34352E] font-extrabold hover:underline hover:text-[#0166FF]  flex items-center gap-2"
          >
            Explore All Services
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
