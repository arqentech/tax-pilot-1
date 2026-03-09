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

const AUTH_TOKEN_KEY = "authToken";
const CART_TOKEN_KEY = "cartToken";
const CART_ID_KEY = "cartId";
const AUTH_PARAM = "t4xp1l0t-5346-token";
const TOKEN_PREFIX = "t4xp1l0t-5346-";
const REDIRECT_DELAY_MS = 100;

function clearGuestCart(): void {
  localStorage.removeItem(CART_TOKEN_KEY);
  localStorage.removeItem(CART_ID_KEY);
  localStorage.removeItem("cartData");
  localStorage.removeItem("cartItems");
}

function captureTokensFromUrl(): void {
  if (typeof window === "undefined" || !window.location.search) return;
  const params = new URLSearchParams(window.location.search);
  let didStore = false;

  const authToken =
    params.get(AUTH_PARAM) ??
    params.get("token") ??
    (() => {
      const q = window.location.search.slice(1);
      if (!q.startsWith(TOKEN_PREFIX)) return null;
      const value = q
        .slice(TOKEN_PREFIX.length)
        .split("&")[0]
        .replace(/^token=/, "");
      return value || null;
    })();

  const cartTokenFromUrl = params.get("cart_token");

  if (authToken === "") {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    window.dispatchEvent(new Event("auth-changed"));
    didStore = true;
  } else if (authToken) {
    clearGuestCart();
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    window.dispatchEvent(new Event("auth-changed"));
    didStore = true;
  }

  if (cartTokenFromUrl) {
    localStorage.setItem(CART_TOKEN_KEY, cartTokenFromUrl);
    localStorage.removeItem(CART_ID_KEY);
    didStore = true;
  }

  if (didStore) {
    window.history.replaceState({}, "", window.location.pathname);
  }
}

captureTokensFromUrl();

function buildRedirectUrl(baseUrl: string): string {
  const params = new URLSearchParams();

  const auth = localStorage.getItem(AUTH_TOKEN_KEY);
  const cart = localStorage.getItem(CART_TOKEN_KEY);

  if (auth) {
    params.set(AUTH_PARAM, auth);
  } else {
    params.set(AUTH_PARAM, "");
  }

  if (cart) params.set("cart_token", cart);

  const query = params.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}

function syncCartTokenFromCartData(): void {
  try {
    const raw = localStorage.getItem("cartData");
    if (!raw) return;
    const data = JSON.parse(raw) as { cartToken?: string };
    if (data.cartToken) {
      localStorage.setItem(CART_TOKEN_KEY, data.cartToken);
    }
  } catch {
    // ignore parse errors
  }
}

function RedirectWithTokens({ envUrl }: { envUrl: string | undefined }) {
  useEffect(() => {
    if (!envUrl) return;
    syncCartTokenFromCartData();
    const url = buildRedirectUrl(envUrl);
    const t = setTimeout(() => window.location.replace(url), REDIRECT_DELAY_MS);
    return () => clearTimeout(t);
  }, [envUrl]);
  return <div>Redirecting...</div>;
}

const env = import.meta.env;
const LoginRedirect = () => (
  <RedirectWithTokens envUrl={env.VITE_TAXPILOT_STAGING_LOGIN_URL} />
);
const RegisterRedirect = () => (
  <RedirectWithTokens envUrl={env.VITE_TAXPILOT_STAGING_REGISTER_URL} />
);
const CartRedirect = () => (
  <RedirectWithTokens envUrl={env.VITE_TAXPILOT_STAGING_CART_URL} />
);
const ProfileRedirect = () => (
  <RedirectWithTokens envUrl={env.VITE_TAXPILOT_STAGING_PROFILE_URL} />
);

function App() {
  return (
    <Router>
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
          <Route
            path="termini-e-condizioni-utilizzo"
            element={<TermsOfUse />}
          />
          <Route
            path="termini-e-condizioni-acquisto"
            element={<GeneralTerms />}
          />
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
