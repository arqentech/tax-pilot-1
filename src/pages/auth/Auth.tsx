import { Outlet } from "react-router-dom";
import LoginNavbar from "./AuthNavbar";
import Footer from "@/components/layout/footer/Footer";
import AuthNavbar from "./AuthNavbar";

export default function AuthLayout() {
  return (
    <>
      <AuthNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
