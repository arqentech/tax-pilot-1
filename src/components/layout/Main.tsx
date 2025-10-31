import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import TopBar from "./Topbar";
import Footer from "./footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
