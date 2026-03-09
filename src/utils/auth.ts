import { useState, useEffect } from "react";
import { clearCartToken, initGuestCart } from "@/api/cart.api";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => 
    !!localStorage.getItem("authToken")
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("authToken"));
    };

    checkAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "authToken") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-changed", checkAuth);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-changed", checkAuth);
    };
  }, []);

  return { isAuthenticated };
};

export const logout = (): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
  localStorage.removeItem("tokenTimestamp");
  // Reset cart token and start a fresh anonymous cart session
  clearCartToken();
  void initGuestCart().catch(() => {
    // If cart initialization fails, we still log the user out.
  });
  window.dispatchEvent(new Event("auth-changed"));
};

