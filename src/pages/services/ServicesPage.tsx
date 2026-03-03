import React, { useMemo, useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import ServiceCard from "../../components/ui/ServiceCard";
import FilterButton from "../../components/ui/FilterButton";
import Categories from "@/components/ui/Categories";
import type { GenericCategoryItem } from "@/components/ui/Categories";
import { useServices } from "../../hooks/useServices";
import { Service } from "../../types/services";

const ServicesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: services = [], isLoading, isError, error } = useServices();

  const availableCategories = useMemo<GenericCategoryItem[]>(() => {
    const map = new Map<string, string>();
    services.forEach((service: Service) => {
      service.categories?.forEach((entry) => {
        const id = entry.category?.identifier;
        const title = entry.category?.title;
        if (id && title && !map.has(id)) map.set(id, title);
      });
    });
    return Array.from(map.entries()).map(([identifier, title]) => ({
      identifier,
      title,
    }));
  }, [services]);

  const filteredServices = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return services.filter((service: Service) => {
      const matchesCategory =
        !selectedCategory ||
        service.categories?.some(
          (c) => c.category.identifier === selectedCategory,
        );
      const matchesSearch =
        !query || service.title.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [services, searchQuery, selectedCategory]);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => {
      if (prev) setSelectedCategory(null);
      return !prev;
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  if (isLoading)
    return (
      <div className="text-center mt-10 text-gray-600">Loading services…</div>
    );

  if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to load services. Please check the console for details.";

    return (
      <div className="text-center mt-10 px-4">
        <p className="text-red-600 font-semibold mb-2">
          Failed to load services
        </p>
        <p className="text-gray-600 text-sm">{errorMessage}</p>
        <p className="text-gray-500 text-xs mt-2">
          Check browser console (F12) for more details
        </p>
      </div>
    );
  }

  return (
    <div className="w-full py-16">
      <div className="flex flex-col items-center min-h-screen md:pb-16">
        <div className="mb-8 text-center">
          <h1 className="font-bricolage heading-base">Tutti i Servizi</h1>
          <p className="mt-2 text-base">Scegli tra gli oltre 150 servizi e bonus disponibili.</p>
        </div>

        <div className="flex w-full items-center gap-3 justify-center md:gap-4">
          <div className="w-full md:max-w-[720px]">
            <SearchBar onSearch={setSearchQuery} placeholder="Cerca un servizio" value={searchQuery} />
          </div>
          <FilterButton onFilterClick={toggleFilter} />
        </div>

        <div className="mt-5 w-full max-w-[980px]">
          <Categories
            categories={availableCategories}
            onSelect={handleCategorySelect}
            searchValue={searchQuery}
            isOpen={isFilterOpen}
            selectedCategory={selectedCategory}
          />
        </div>

        <div className="mt-6 w-full">
          <div className="grid grid-cols-1 gap-6 overflow-y-auto max-h-[calc(100vh-20px)] md:grid-cols-2 lg:grid-cols-2 pb-4">
            {filteredServices.length > 0 ? (
              filteredServices.map((service: Service) => (
                <ServiceCard
                  key={service.id}
                  title={
                    searchQuery
                      ? highlightText(service.title, searchQuery)
                      : service.title
                  }
                  description_short={service.description_short}
                  description_long={service.description_long}
                  price={service.price}
                  advantages={service.advantages}
                  identifier={service.identifier ?? service.id}
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

function highlightText(text: string, query: string) {
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="bg-yellow-200">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default ServicesPage;
