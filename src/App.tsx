import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./components/layout/Main";
import Home from "./pages/home/Home";
import ServicesPage from "./pages/services/ServicesPage";
import ServiceDetails from "./pages/service-details/ServiceDetails";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import AuthLayout from "./pages/auth/Auth";
import LoginPage from "./pages/auth/Login";
import FAQ from "./pages/faq/FAQPage";
import FAQQuestionsPage from "./pages/faq/FAQQuestionsPage";
import FAQDetailPage from "./pages/faq/FAQDetailPage";
import ContactUs from "./pages/contact/ContactPage";
import SignUpPage from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Blogs from "./pages/blogs/Blogs";
import BlogDetail from "./pages/blog-details/BlogDetails";
import CartPage from "./pages/cart/Cart";
import CheckoutPage from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import ScrollToTop from "./components/layout/ScrollToTop";
import HomePage from "./pages/profile/HomePage";
import Documents from "./pages/profile/Documents";
import PersonalInfo from "./pages/profile/personal-info/PersonalInfo";
import Requests from "./pages/profile/Requests";
import Sitemap from "./pages/site-map/Sitemap";
import CookiePolicy from "./pages/cookies/CookiePolicy";
import TermsOfUse from "./pages/terms of use/TermsOfUse";
import GeneralTerms from "./pages/general terms and conditions/GeneralTerms";

const TOKEN_PREFIX = "t4xp1l0t-5346-";

function TokenFromUrl() {
  useEffect(() => {
    const query = window.location.search.slice(1); // strip leading "?"
    if (query.startsWith(TOKEN_PREFIX)) {
      const token = query.slice(TOKEN_PREFIX.length);
      localStorage.setItem("authToken", token);
      window.dispatchEvent(new Event("auth-changed"));
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);
  return null;
}

function App() {
  return (
    <Router>
      <TokenFromUrl />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetails />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/*" element={<BlogDetail />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="terms-of-use" element={<TermsOfUse />} />
          <Route path="general-terms-of-purchase" element={<GeneralTerms />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="faq/:category/:slug" element={<FAQDetailPage />} />
          <Route path="faq/:category" element={<FAQQuestionsPage />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/success" element={<CheckoutSuccess />} />
          <Route path="dashboard-home" element={<HomePage />} />
          <Route path="dashboard-documents" element={<Documents />} />
          <Route path="dashboard-personal-info" element={<PersonalInfo />} />
          <Route path="dashboard-requests" element={<Requests />} />
          <Route path="sitemap" element={<Sitemap />} />
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
