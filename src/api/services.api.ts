import { api } from "./axios";

export const getAllServices = async () => {
  const response = await api.get("/services");
  return response.data.results.data;
};

export const fetchServices = async (
  search: string,
  category: string | null
) => {
  const params: any = {};
  if (search) params.search = search;
  if (category) params.category = category;

  const res = await api.get("/services", { params });
  if (res.status !== 200) throw new Error("Failed to fetch services");

  return res.data.results.data;
};
