import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/Main";
import Home from "./pages/home/Home";
import ServicesPage from "./pages/services/ServicesPage";
import ServiceDetails from "./pages/service-details/ServiceDetails";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import AuthLayout from "./pages/auth/Auth";
import LoginPage from "./pages/auth/Login";
import FAQ from "./pages/faq/FAQPage";
import ContactUs from "./pages/contact/ContactPage";
import SignUpPage from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Blogs from "./pages/blogs/Blogs";
import BlogDetail from "./pages/blog-details/BlogDetails";
import CartPage from "./pages/cart/Cart";
import CheckoutPage from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import ScrollToTop from "./components/layout/ScrollToTop";
import HomePage from "./pages/profile/Dashboard";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetails />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="profile-home" element={<HomePage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/success" element={<CheckoutSuccess />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
