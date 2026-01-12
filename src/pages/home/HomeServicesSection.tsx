import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../../components/ui/ServiceCard";
import SearchBar from "../../components/ui/SearchBar";
import Badge from "../../components/ui/Badge";
import { ChevronRight } from "lucide-react";
import { useServices } from "../../hooks/useServices";

const ServicesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: services = [], isLoading } = useServices();

  const filteredServices = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return services.filter(
      (service: any) =>
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
    <section className="w-full py-10">
      <div className="flex flex-col items-center text-center mb-12">
        <Badge text="Services" width="115px" />
        <h2 className="heading-base">All Your Tax Needs, in One Place.</h2>
        <p className="text-base max-w-[660px]">
          Access over 150 certified CAF and patronage services, guided step by
          real experts, all from the comfort of your home.
        </p>
      </div>

      <div className="flex justify-center px-4 mb-10">
        <SearchBar
          value={searchQuery}
          onSearch={setSearchQuery}
          wrapperClass="w-full max-w-[720px]"
        />
      </div>

      <div className="block sm:hidden overflow-x-auto max-w-[300px] mx-auto">
        <div className="flex gap-3">
          {displayServices.map((service: any) => (
            <div key={service.id} className="min-w-[300px]">
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

      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {displayServices.map((service: any) => (
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

      <div className="hidden md:flex justify-center">
        <Link
          to="/services"
          className="text-[#0166FF] text-lg font-semibold hover:underline flex items-center gap-2"
        >
          Explore All Services
          <ChevronRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default ServicesSection;
