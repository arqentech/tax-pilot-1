import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/Main";
import Home from "./pages/home/Home";
import ServicesPage from "./pages/services/ServicesPage";
import ServiceDetails from "./pages/service-details/ServiceDetails";
import Login from "./pages/auth/Login";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import AuthLayout from "./pages/auth/Auth";
import LoginPage from "./pages/auth/Login";
import FAQ from "./pages/faq/FAQPage";
import ContactUs from "./pages/contact/ContactPage";
import SignUpPage from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NewTestPage from "./pages/auth/NewTestPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="services" element={<ServicesPage />} />

          <Route path="services/:slug" element={<ServiceDetails />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact-us" element={<ContactUs />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<NewTestPage/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
