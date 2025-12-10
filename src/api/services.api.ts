import { api } from "./axios";

export const getAllServices = async () => {
  try {
    const fullURL = `${api.defaults.baseURL}/services`;
    console.log("Fetching services from:", fullURL);
    console.log("Base URL:", api.defaults.baseURL);
    
    const response = await api.get("/services");
    console.log("Services API response:", response.status, response.data);
    
    // Check if response is HTML (error page)
    if (typeof response.data === 'string' && response.data.trim().startsWith('<!DOCTYPE')) {
      console.error("API returned HTML instead of JSON. Response:", response.data.substring(0, 200));
      throw new Error("Server returned HTML error page. Check if API endpoint is correct.");
    }
    
    if (!response.data?.results?.data) {
      console.error("Invalid API response structure:", response.data);
      throw new Error("Invalid API response structure");
    }
    
    return response.data.results.data;
  } catch (error: any) {
    console.error("Error fetching services:", error);
    
    // Log full error details
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      baseURL: api.defaults.baseURL,
      url: error.config?.url,
      fullURL: error.config ? `${error.config.baseURL}${error.config.url}` : 'unknown',
      responseType: typeof error.response?.data,
      responsePreview: typeof error.response?.data === 'string' 
        ? error.response.data.substring(0, 200) 
        : error.response?.data
    };
    console.error("Error details:", errorDetails);
    
    if (error.response) {
      // Check if response is HTML
      const responseData = error.response.data;
      if (typeof responseData === 'string' && responseData.includes('<!DOCTYPE')) {
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
      throw new Error("Network error: Could not reach the server. Make sure dev server is running.");
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
