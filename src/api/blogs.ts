import { Blog, CategoryOption } from "@/types/blogs";
import { api } from "./axios";
import axios from "axios";

export const getBlogs = async (): Promise<{ results: { data: Blog[] } }> => {
  const response = await api.get("/blog/list");
  return response.data;
};

interface CategoriesApiResponse {
  status: string;
  code: number;
  message: string;
  results: {
    data: CategoryOption[];
    current_page: number;
    last_page: number;
    total: number;
  };
}

export const fetchBlogCategories = async (): Promise<CategoryOption[]> => {
  const { data } = await axios.get<CategoriesApiResponse>(
    "http://api.stage.taxpilot.it/v1/blog/categories",
  );
  return data.results.data; 
};
