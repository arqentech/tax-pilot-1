import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./components/layout/Main";
import Home from "./pages/home/Home";
import ServicesPage from "./pages/services/ServicesPage";
import ServiceDetails from "./pages/service-details/ServiceDetails";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import AuthLayout from "./pages/auth/Auth";
import FAQ from "./pages/faq/FAQPage";
import FAQQuestionsPage from "./pages/faq/FAQQuestionsPage";
import FAQDetailPage from "./pages/faq/FAQDetailPage";
import ContactUs from "./pages/contact/ContactPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Blogs from "./pages/blogs/Blogs";
import BlogDetail from "./pages/blog-details/BlogDetails";
import CheckoutPage from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import ScrollToTop from "./components/layout/ScrollToTop";
import Documents from "./pages/profile/Documents";
import PersonalInfo from "./pages/profile/personal-info/PersonalInfo";
import Requests from "./pages/profile/Requests";
import Sitemap from "./pages/site-map/Sitemap";
import CookiePolicy from "./pages/cookies/CookiePolicy";
import TermsOfUse from "./pages/terms of use/TermsOfUse";
import GeneralTerms from "./pages/general terms and conditions/GeneralTerms";

function TokenFromUrl() {
  useEffect(() => {
    const query = window.location.search.slice(1);

    const TOKEN_PREFIX = "t4xp1l0t-5346-token=";
    if (query.includes(TOKEN_PREFIX)) {
      const token = query.split(TOKEN_PREFIX)[1].split("&")[0];
      localStorage.setItem("authToken", token);
    }

    const CART_TOKEN = "cart_token=";
    if (query.includes(CART_TOKEN)) {
      const cartToken = query.split(CART_TOKEN)[1].split("&")[0];
      localStorage.setItem("cartToken", cartToken);
    }

    window.dispatchEvent(new Event("auth-changed"));
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  return null;
}

const buildRedirectUrl = (baseUrl: string) => {
  const authToken = localStorage.getItem("authToken");
  const cartToken = localStorage.getItem("cartToken");

  const params = new URLSearchParams();

  if (authToken) params.append("t4xp1l0t-5346-token", authToken);
  if (cartToken) params.append("cart_token", cartToken);

  const finalUrl = `${baseUrl}?${params.toString()}`;
  console.log("Redirect URL:", finalUrl);
  return finalUrl;
};

const RedirectWithTokens = ({ envUrl }: { envUrl: string | undefined }) => {
  useEffect(() => {
    if (!envUrl) return;

    const cartData = localStorage.getItem("cartData");
    if (cartData) {
      try {
        const parsed = JSON.parse(cartData);
        if (parsed.cartToken) {
          localStorage.setItem("cartToken", parsed.cartToken);
        }
      } catch (error) {
        console.error("Failed to parse cartData for cartToken:", error);
      }
    }

    const redirectUrl = buildRedirectUrl(envUrl);
    setTimeout(() => window.location.replace(redirectUrl), 100);
  }, [envUrl]);

  return <div>Redirecting...</div>;
};

const LoginRedirect = () => (
  <RedirectWithTokens
    envUrl={import.meta.env.VITE_TAXPILOT_STAGING_LOGIN_URL}
  />
);
const RegisterRedirect = () => (
  <RedirectWithTokens
    envUrl={import.meta.env.VITE_TAXPILOT_STAGING_REGISTER_URL}
  />
);
const CartRedirect = () => (
  <RedirectWithTokens envUrl={import.meta.env.VITE_TAXPILOT_STAGING_CART_URL} />
);
const ProfileRedirect = () => (
  <RedirectWithTokens
    envUrl={import.meta.env.VITE_TAXPILOT_STAGING_PROFILE_URL}
  />
);

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
