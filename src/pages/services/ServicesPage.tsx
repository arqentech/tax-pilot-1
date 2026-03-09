import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "../../components/ui/SearchBar";
import ServiceCard from "../../components/ui/ServiceCard";
import FilterButton from "../../components/ui/FilterButton";
import Categories from "@/components/ui/Categories";
import type { GenericCategoryItem } from "@/components/ui/Categories";
import { useServices } from "../../hooks/useServices";
import { useQuotationCategories } from "@/hooks/useQuotationCategories";
import { Service } from "../../types/services";

const ServicesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useServices(
    currentPage,
    searchQuery,
    selectedCategory,
  );

  const { data: categoriesData = [], isLoading: categoriesLoading } =
    useQuotationCategories();

  const servicesFromApi = data?.services ?? [];
  const currentPageNum = data?.current_page ?? 1;
  const lastPage = data?.last_page ?? 1;

  const services = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = servicesFromApi;
    if (selectedCategory) {
      list = list.filter((service: Service) =>
        service.categories?.some(
          (sc) =>
            String(sc.category?.id) === selectedCategory ||
            sc.category?.identifier === selectedCategory,
        ),
      );
    }
    if (q) {
      list = list.filter(
        (service: Service) =>
          service.title?.toLowerCase().includes(q) ||
          (typeof service.description_short === "string" &&
            service.description_short.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [servicesFromApi, selectedCategory, searchQuery]);

  const availableCategories: GenericCategoryItem[] = useMemo(() => {
    return categoriesData
      .filter((c) => c.active === 1)
      .map((c) => ({
        id: c.id,
        identifier: String(c.id),
        name: c.name,
        title: c.name,
      }));
  }, [categoriesData]);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => {
      if (prev) setSelectedCategory(null);
      return !prev;
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(() => Math.max(1, Math.min(lastPage, page)));
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="w-full py-16 flex flex-col min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-6rem)]">
      <div className="flex flex-col items-center flex-1">
        <div className="mb-8 text-center">
          <h1 className="font-bricolage heading-base">Tutti i Servizi</h1>
          <p className="mt-2 text-base">
            Scegli tra gli oltre 150 servizi e bonus disponibili.
          </p>
        </div>

        <div className="flex w-full items-center gap-3 justify-center md:gap-4">
          <div className="w-full w-[70vw] md:w-[40vw]">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Cerca un servizio"
              value={searchQuery}
            />
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
            isLoading={categoriesLoading}
          />
        </div>

        <div className="mt-6 w-full flex-1">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 pb-4">
            {services.length > 0 ? (
              services.map((service: Service) => (
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
                  active={service.active}
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

      {lastPage > 1 && (
        <div className="mt-auto pt-8 pb-4 flex flex-wrap items-center justify-center gap-3 border-t border-[#E6E6E1]">
          <button
            type="button"
            onClick={() => goToPage(currentPageNum - 1)}
            disabled={currentPageNum <= 1}
            aria-label="Pagina precedente"
            className="p-2.5  text-[#34352E] disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#5F6057] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="px-4 py-2 text-[18px] text-[#34352E]">
            Pagina {currentPageNum} di {lastPage}
          </span>
          <button
            type="button"
            onClick={() => goToPage(currentPageNum + 1)}
            disabled={currentPageNum >= lastPage}
            aria-label="Pagina successiva"
            className=" text-[#34352E] disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#5F6057] transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
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
