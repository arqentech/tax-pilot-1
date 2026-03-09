import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import TopBar from "./Topbar";
import Footer from "./footer/Footer";
import { useCart } from "@/hooks/useCart";

const MainLayout = () => {
  const location = useLocation();
  const { cartToken, refreshCartCount } = useCart();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (cartToken) {
      refreshCartCount();
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1 global-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
