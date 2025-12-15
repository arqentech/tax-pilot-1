import { api } from "./axios";

export const getAllServices = async () => {
  try {
    const response = await api.get("/services");

    if (
      typeof response.data === "string" &&
      response.data.trim().startsWith("<!DOCTYPE")
    ) {
      throw new Error(
        "Server returned HTML error page. Check if API endpoint is correct."
      );
    }

    if (!response.data?.results?.data) {
      throw new Error("Invalid API response structure");
    }

    return response.data.results.data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data;
      if (
        typeof responseData === "string" &&
        responseData.includes("<!DOCTYPE")
      ) {
        throw new Error(
          `API returned HTML error page (Status: ${error.response.status}). ` +
            `The proxy may not be working. Check if dev server was restarted and proxy is configured correctly.`
        );
      }

      throw new Error(
        error.response.data?.message ||
          `Failed to fetch services: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        "Network error: Could not reach the server. Make sure dev server is running."
      );
    } else {
      throw error;
    }
  }
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
