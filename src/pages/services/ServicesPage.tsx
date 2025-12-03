import React, { useState, useEffect } from "react";
import SearchBar from "../../components/ui/SearchBar";
import ServiceCard from "../../components/ui/ServiceCard";
import FilterButton from "../../components/ui/FilterButton";

interface Service {
  id: number;
  title: string;
  description_short: string;
  price: number;
  image: {
    url: string;
  };
  categories: Array<{
    category: {
      title: string;
    };
  }>;
}

const ServicesPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.stage.taxpilot.it/v1/services"
        );
        const data = await response.json();

        if (data.status === "success" && data.results?.data) {
          setServices(data.results.data);
          setError(null);
        } else {
          setError("Failed to fetch services");
        }
      } catch (err) {
        setError("Error fetching services");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => {
      if (prev === true) {
        setSelectedCategory(null);
      }
      return !prev;
    });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  // Extract unique categories from services
  const categories = Array.from(
    new Set(
      services.flatMap((service) =>
        service.categories.map((cat) => cat.category.title)
      )
    )
  );

  const filteredData = services.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesCategory = selectedCategory
      ? service.categories.some((cat) => cat.category.title === selectedCategory)
      : true;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="w-full md:py-16">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <p className="text-base">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full md:py-16">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <p className="text-base text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:py-16">
      <div className="flex min-h-screen flex-col items-center md:pb-16">
        <div className="mb-8 text-center">
          <h1 className="font-bricolage heading-base">All Services</h1>
          <p className="mt-2 text-base">Below are our Services and Bonuses</p>
        </div>

        <div className="flex w-full items-center gap-3 flex-row justify-center md:gap-4">
          <div className="w-full md:max-w-[720px]">
            <SearchBar onSearch={setQuery} />
          </div>
          <FilterButton onFilterClick={toggleFilter} />
        </div>

        {isFilterOpen && (
          <div className="mt-5 w-full max-w-[980px]">
            <div className="w-full max-w-[874px] border border-[#E6E6E1] rounded-[32px] p-4 flex flex-wrap gap-3 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`
                    px-4 py-2 rounded-full text-sm transition
                    ${
                      selectedCategory === cat
                        ? "bg-[#037BFF] text-white"
                        : "bg-[#F1F1EC] text-gray-700 hover:bg-gray-200"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 w-full">
          <div className="grid max-h-[calc(100vh-320px)] grid-cols-1 gap-6 overflow-y-auto pb-4 md:grid-cols-2 lg:grid-cols-2">
            {filteredData.length > 0 ? (
              filteredData.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description_short}
                  price={service.price}
                  link={`/services/${service.id}`}
                  category={
                    service.categories[0]?.category.title || "General"
                  }
                  vatIncluded={true}
                />
              ))
            ) : (
              <div className="col-span-full mt-6 text-center">
                <p className="text-base">No service found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;