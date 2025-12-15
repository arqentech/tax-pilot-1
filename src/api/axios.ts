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
