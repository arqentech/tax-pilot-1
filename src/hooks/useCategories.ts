import { fetchBlogCategories } from "@/api/blogs";
import { CategoryOption } from "@/types/blogs";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery<CategoryOption[], Error>({
    queryKey: ["categories", "blog"],
    queryFn: fetchBlogCategories,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
