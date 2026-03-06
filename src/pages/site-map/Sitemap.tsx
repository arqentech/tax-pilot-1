import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServices } from "@/hooks/useServices";
import { getSitemapLinks, type SitemapLinkItem } from "@/api/sitemap.api";
import { sitemapServices } from "./sitemap.data";
import { Link } from "react-router-dom";

const ITEMS_PER_COLUMN = 4;

function chunkIntoColumns<T>(array: T[], maxPerColumn: number): T[][] {
  const columns: T[][] = [];
  for (let i = 0; i < array.length; i += maxPerColumn) {
    columns.push(array.slice(i, i + maxPerColumn));
  }
  return columns;
}

const Sitemap: React.FC = () => {
  const {
    data: linkItems,
    isLoading: linksLoading,
    isError: linksError,
  } = useQuery({
    queryKey: ["sitemap-links"],
    queryFn: getSitemapLinks,
    staleTime: 10 * 60 * 1000,
  });

  const { data: services } = useServices();

  const items = useMemo((): SitemapLinkItem[] => {
    if (linkItems && linkItems.length > 0) {
      return linkItems;
    }
    if (services && Array.isArray(services) && services.length > 0) {
      return services.map((s) => ({
        label: s.title,
        link: `/servizi/${s.identifier || s.id}`,
      }));
    }
    return sitemapServices.map((label) => ({ label, link: "#" }));
  }, [linkItems, services]);

  const columns = useMemo(
    () => chunkIntoColumns(items, ITEMS_PER_COLUMN),
    [items],
  );

  const maxItemsPerColumn = Math.max(1, ...columns.map((col) => col.length));

  return (
    <section className="w-full min-w-0 ">
      <div className="full-bleed bg-[#FBFBFA] py-14 mb-12">
        <div className="global-container text-center py-6 md:py-12">
          <h1 className="font-bricolage text-[44px] leading-[38px] md:text-[58px] md:leading-[59px] font-extrabold text-[#34352E] tracking-[-3px]">
            Site map
          </h1>
        </div>
      </div>

      <div
        className="w-full md:w-[80vw] min-w-0 overflow-x-hidden  md:py-8 mb-10 -ml-6 px-4 md:ml-0 md:px-0"
        style={{ textAlign: "left" }}
      >
        <h2 className="pl-0 ml-0 font-bricolage text-[28px] font-extrabold leading-[30px] text-[#34352E] mb-8">
          Active Services
        </h2>

        {linksLoading && (
          <p className="font-normal ]text-[#5F6057] text-[18px] leading-[25px] text-center py-8">
            Loading…
          </p>
        )}

        {linksError && !linkItems && items.length > 0 && (
          <p className="text-[#9D9E98] text-center py-4 text-sm">
            Showing fallback list. Sitemap links will update when the API is
            available.
          </p>
        )}

        <div
          className="flex flex-col items-start justify-end md:grid md:items-stretch grid-cols-1 md:grid-cols-3 md:gap-8 min-w-0 w-full text-left"
          style={{ textAlign: "left" }}
        >
          {columns.map((column, colIndex) => (
            <ul
              key={colIndex}
              className="space-y-3 list-none p-0 m-0 min-w-0 text-left"
              style={{ textAlign: "left" }}
            >
              {Array.from({ length: maxItemsPerColumn }).map((_, rowIndex) => {
                const item = column[rowIndex];
                return (
                  <li
                    key={`${colIndex}-${rowIndex}`}
                    className="font-normal text-[#ffffff] text-[#5F6057] text-[18px] leading-[25px] min-w-0 break-words text-left"
                  >
                    {item ? (
                      <Link
                        to={item.link}
                        target={
                          item.link.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.link.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-[#34352E] hover:underline"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      ""
                    )}
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sitemap;
