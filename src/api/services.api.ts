import { api } from "./axios";
import { Service } from "../types/services";

interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    } | string;
  };
  request?: unknown;
  message?: string;
}

interface FetchServicesParams {
  search?: string;
  category?: string;
}

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
  } catch (error) {
    const apiError = error as ApiError;
    if (apiError.response) {
      const responseData = apiError.response.data;
      if (
        typeof responseData === "string" &&
        responseData.includes("<!DOCTYPE")
      ) {
        throw new Error(
          `API returned HTML error page (Status: ${apiError.response.status}). ` +
            `The proxy may not be working. Check if dev server was restarted and proxy is configured correctly.`
        );
      }

      const errorMessage =
        typeof responseData === "object" && responseData !== null
          ? responseData.message
          : undefined;
      throw new Error(
        errorMessage ||
          `Failed to fetch services: ${apiError.response.status}`
      );
    } else if (apiError.request) {
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
): Promise<Service[]> => {
  const params: FetchServicesParams = {};
  if (search) params.search = search;
  if (category) params.category = category;

  const res = await api.get("/services", { params });
  if (res.status !== 200) throw new Error("Failed to fetch services");

  return res.data.results.data;
};
