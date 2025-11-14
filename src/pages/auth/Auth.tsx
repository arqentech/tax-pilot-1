// layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";
import LoginNavbar from "./LoginNavbar";
import Footer from "@/components/layout/footer/Footer";

export default function AuthLayout() {
  return (
    <>
      <LoginNavbar />
      <Outlet />
      <Footer/>
    </>
  );
}
