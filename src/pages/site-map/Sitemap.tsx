import React, { useMemo } from "react";
import { useServices } from "@/hooks/useServices";
import { sitemapServices } from "./sitemap.data";

function chunkIntoColumns<T>(array: T[], maxPerColumn: number): T[][] {
  const columns: T[][] = [];
  for (let i = 0; i < array.length; i += maxPerColumn) {
    columns.push(array.slice(i, i + maxPerColumn));
  }
  return columns;
}

const Sitemap: React.FC = () => {
  const { data: services, isLoading, isError } = useServices();

  const serviceNames = useMemo(() => {
    if (services && Array.isArray(services) && services.length > 0) {
      return services.map((s) => s.title);
    }
    return sitemapServices;
  }, [services]);

  const columns = useMemo(
    () => chunkIntoColumns(serviceNames, 4),
    [serviceNames],
  );

  const maxItemsPerColumn = Math.max(...columns.map((col) => col.length));

  return (
    <section className="w-full min-w-0 ">
      <div className="full-bleed bg-[#FBFBFA] py-14 mb-12">
        <div className="global-container text-center py-6 md:py-12">
          <h1 className="font-bricolage text-[44px] leading-[38px] md:text-[58px] md:leading-[59px] font-extrabold text-[#34352E] tracking-[-3px]">
            Site map
          </h1>
        </div>
      </div>

      {/* Mobile: remove main's left padding so less left space; desktop: keep same (no extra margin/padding) */}
      <div
        className="w-full md:w-[80vw] min-w-0 overflow-x-hidden  md:py-8 mb-10 -ml-6 px-4 md:ml-0 md:px-0"
        style={{ textAlign: "left" }}
      >
        <h2 className="pl-0 ml-0 font-bricolage text-[28px] font-extrabold leading-[30px] text-[#34352E] mb-8">
          Active Services
        </h2>

        {isLoading && (
          <p className="font-normal text-[#5F6057] text-[18px] leading-[25px] text-center py-8">
            Loading services…
          </p>
        )}

        {isError && (
          <p className="text-[#9D9E98] text-center py-8">
            Showing static list. Services will update when the API is available.
          </p>
        )}

        <div
          className="flex flex-col items-start justify-end md:grid md:items-stretch grid-cols-1 md:grid-cols-3 md:gap-10 min-w-0 w-full text-left"
          style={{ textAlign: "left" }}
        >
          {columns.map((column, colIndex) => (
            <ul key={colIndex} className="space-y-3 list-none p-0 m-0 min-w-0 text-left" style={{ textAlign: "left" }}>
              {Array.from({ length: maxItemsPerColumn }).map((_, rowIndex) => (
                <li
                  key={`${colIndex}-${rowIndex}`}
                  className="font-normal text-[#5F6057] text-[18px] leading-[25px] min-w-0 break-words text-left"
                >
                  {column[rowIndex] || ""}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sitemap;
