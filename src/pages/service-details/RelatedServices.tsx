import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ServiceCard from "../../components/ui/ServiceCard";
import Badge from "../../components/ui/Badge";
import { useServiceDetails } from "../../hooks/useServiceDetails";
import { RelatedServiceItem, Service } from "../../types/services";

const RelatedServices = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: serviceDetails, isLoading } = useServiceDetails(slug ?? "");

  const displayServices = useMemo(() => {
    if (
      serviceDetails?.related_services &&
      serviceDetails.related_services.length > 0
    ) {
      const services = serviceDetails.related_services.map(
        (item: RelatedServiceItem | Service) => {
          if ("service" in item && item.service) {
            return item.service;
          }
          return item as Service;
        }
      );

      return services.slice(0, 3);
    }
    return [];
  }, [serviceDetails?.related_services]);

  if (isLoading) {
    return null;
  }

  if (!serviceDetails?.related_services || displayServices.length === 0) {
    return null;
  }

  return (
    <section className="w-full full-bleed  py-16">
      <div className="w-full max-w-[1320px] px-4 mx-auto flex flex-col items-center">
        <Badge text="Services" width="115px" center />

        <div className="text-center mb-5 mt-5">
          <h2 className="heading-base font-bricolage mt-6 md:mt-2">
            Related Services
          </h2>
        </div>

        <div className="md:hidden w-full overflow-x-auto">
          <div className="flex gap-4 justify-start">
            {displayServices.map((service: Service) => (
              <div key={service.id} className="max-w-[300px] flex-shrink-0">
                <ServiceCard
                  title={service.title || ""}
                  description_short={service.description_short}
                  description_long={service.description_long}
                  price={service.price}
                  vatIncluded={
                    service.vatIncluded !== undefined
                      ? service.vatIncluded
                      : true
                  }
                  hours={service.hours}
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
              title={service.title || ""}
              description_short={service.description_short}
              description_long={service.description_long}
              price={service.price}
              vatIncluded={
                service.vatIncluded !== undefined ? service.vatIncluded : true
              }
              hours={service.hours}
              advantages={service.advantages}
              identifier={service.identifier ?? service.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;
