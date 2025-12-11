import axios from "axios";

// Use /api in both development and production
// Development: Vite proxy forwards /api/* to https://api.stage.taxpilot.it/v1/* (vite.config.ts)
// Production: Vercel rewrites /api/* to https://api.stage.taxpilot.it/v1/* (vercel.json)
// This avoids CORS issues in both environments
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

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
