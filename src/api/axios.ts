import axios from "axios";


const baseURL = import.meta.env.DEV 
  ? "/api" 
  : (import.meta.env.VITE_API_BASE_URL || "https://api.stage.taxpilot.it/v1"); 

export const api = axios.create({
  baseURL,
  timeout: 30000, 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("tokenTimestamp");
      window.dispatchEvent(new Event("auth-changed"));
      
      if (window.location.pathname !== "/login" && window.location.pathname !== "/sign-up") {
        window.location.href = "/login?redirect=" + encodeURIComponent(window.location.pathname);
      }
    }
    return Promise.reject(error);
  }
);
