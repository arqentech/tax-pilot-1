import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./components/layout/Main";
import Home from "./pages/home/Home";
import ServicesPage from "./pages/services/ServicesPage";
import ServiceDetails from "./pages/service-details/ServiceDetails";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import AuthLayout from "./pages/auth/Auth";
// import LoginPage from "./pages/auth/Login";
import FAQ from "./pages/faq/FAQPage";
import FAQQuestionsPage from "./pages/faq/FAQQuestionsPage";
import FAQDetailPage from "./pages/faq/FAQDetailPage";
import ContactUs from "./pages/contact/ContactPage";
// import SignUpPage from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Blogs from "./pages/blogs/Blogs";
import BlogDetail from "./pages/blog-details/BlogDetails";
// import CartPage from "./pages/cart/Cart";
import CheckoutPage from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import ScrollToTop from "./components/layout/ScrollToTop";
// import HomePage from "./pages/profile/HomePage";
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
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let didStore = false;

    const prefixedToken = params.get("t4xp1l0t-5346-token");
    const token = prefixedToken ?? params.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      window.dispatchEvent(new Event("auth-changed"));
      didStore = true;
    } else {
      const query = search.slice(1);
      if (query.startsWith(TOKEN_PREFIX)) {
        const value = query
          .slice(TOKEN_PREFIX.length)
          .split("&")[0]
          .replace(/^token=/, "");
        if (value) {
          localStorage.setItem("authToken", value);
          window.dispatchEvent(new Event("auth-changed"));
          didStore = true;
        }
      }
    }

    const cartToken = params.get("cart_token");
    if (cartToken) {
      localStorage.setItem("cartToken", cartToken);
      didStore = true;
    }

    if (didStore) {
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
          <Route path="servizi" element={<ServicesPage />} />
          <Route path="servizi/:slug" element={<ServiceDetails />} />
          <Route path="blog" element={<Blogs />} />
          <Route path="blog/*" element={<BlogDetail />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="terms-of-use" element={<TermsOfUse />} />
          <Route path="general-terms-of-purchase" element={<GeneralTerms />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="faq/:category/:slug" element={<FAQDetailPage />} />
          <Route path="faq/:category" element={<FAQQuestionsPage />} />
          <Route path="contatti" element={<ContactUs />} />
          <Route path="cart" element={<CartRedirect />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/success" element={<CheckoutSuccess />} />
          <Route path="area-clienti" element={<ProfileRedirect />} />
          <Route path="dashboard-documents" element={<Documents />} />
          <Route path="dashboard-personal-info" element={<PersonalInfo />} />
          <Route path="dashboard-requests" element={<Requests />} />
          <Route path="sitemap" element={<Sitemap />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="/sign-up" element={<RegisterRedirect />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

const LoginRedirect = () => {
  useEffect(() => {
    const url = import.meta.env.VITE_TAXPILOT_STAGING_LOGIN_URL;
    if (url) window.location.replace(url);
  }, []);

  return <div>Redirecting to TaxPilot login...</div>;
};

const RegisterRedirect = () => {
  useEffect(() => {
    const url = import.meta.env.VITE_TAXPILOT_STAGING_REGISTER_URL;
    if (url) window.location.replace(url);
  }, []);

  return <div>Redirecting to TaxPilot registration...</div>;
};

const CartRedirect = () => {
  useEffect(() => {
    const url = import.meta.env.VITE_TAXPILOT_STAGING_CART_URL;
    if (url) window.location.replace(url);
  }, []);

  return <div>Redirecting to TaxPilot cart...</div>;
};
const ProfileRedirect = () => {
  useEffect(() => {
    const url = import.meta.env.VITE_TAXPILOT_STAGING_PROFILE_URL;
    if (url) window.location.replace(url);
  }, []);

  return <div>Redirecting to TaxPilot cart...</div>;
};
