import axios from "axios";

const baseURL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_BASE_URL || "https://api.taxpilot.it/api";

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
  },
);

const PUBLIC_PATHS = [
  "/",
  "/servizi",
  "/blog",
  "/privacy-policy",
  "/cookie-policy",
  "/termini-e-condizioni-utilizzo",
  "/termini-e-condizioni-acquisto",
  "/faq",
  "/contatti",
  "/cart",
  "/sitemap",
];

const isPublicPath = (pathname: string): boolean => {
  if (pathname === "/login" || pathname === "/sign-up") return true;
  if (PUBLIC_PATHS.includes(pathname)) return true;
  if (
    pathname.startsWith("/servizi/") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/faq/")
  )
    return true;
  return false;
};

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

      const pathname = window.location.pathname;
      const onPublicPage = isPublicPath(pathname);
      if (!onPublicPage) {
        window.location.href =
          "/login?redirect=" + encodeURIComponent(pathname);
      }
    }
    return Promise.reject(error);
  },
);
