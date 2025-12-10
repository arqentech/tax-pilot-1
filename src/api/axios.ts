import axios from "axios";

// Development: Use /api to go through Vite proxy (avoids CORS issues)
// Production: Use VITE_API_BASE_URL environment variable (API must have CORS enabled)
// Note: Vite proxy only works in development mode, not in production builds
const baseURL = import.meta.env.DEV 
  ? "/api"  // Vite proxy forwards /api/* to https://api.stage.taxpilot.it/v1/* (dev only)
  : (import.meta.env.VITE_API_BASE_URL || "https://api.stage.taxpilot.it/v1");  // Production: must have CORS enabled

export const api = axios.create({
  baseURL,
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
