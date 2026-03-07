import { useQuery } from "@tanstack/react-query";
import { getQuotationCategories } from "../api/quotationCategories.api";

export const useQuotationCategories = () => {
  return useQuery({
    queryKey: ["quotation-categories"],
    queryFn: getQuotationCategories,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
