import FooterLogo from "./FooterLogo";
import FooterLinks from "./FotterLinks";
import NewsletterSignup from "./NewsletterSignup";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer className="bg-[#373737] text-white w-full px-8 lg:px-20 py-16">
      <div className="max-w-[1320px] mx-auto">
        {/* GRID LAYOUT */}
        <div className="font-bricolage grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* 1️⃣ Logo */}
          <div className="order-1 lg:order-1">
            <FooterLogo />
          </div>

          {/* 2️⃣ Quick Links */}
          <div className="order-3 sm:order-2 lg:order-2">
            <FooterLinks title="Quick Links" links={quickLinks} />
          </div>

          {/* 3️⃣ Legal Links */}
          <div className="order-4 sm:order-3 lg:order-3">
            <FooterLinks title="Legal" links={legalLinks} />
          </div>

          {/* 4️⃣ Newsletter Signup */}
          <div className="order-2 sm:col-span-2 lg:order-4 lg:col-span-1">
            <NewsletterSignup />
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <SocialLinks />

        {/* COPYRIGHT TEXT */}
        <div className="text-center mt-8 text-[#999999] text-[14px] font-archivo leading-relaxed">
          <p>
            ©2025 - All rights reserved. Taxpilot® is a trademark of Adventure
            Business Consulting Srl
          </p>
          <p>
            | Melegnano (MI) 20077 – Via B. Miracoli, 14 VAT: 08923661212 | PEC
            adventurebc@pec.it
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
const quickLinks = [
  { label: "How it works", path: "/how-it-works" },
  { label: "Services", path: "/services" },
  { label: "Blogs", path: "/blogs" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact us", path: "/contact" },
];

const legalLinks = [
  { label: "Privacy policy", path: "/privacy-policy" },
  { label: "Cookie policy", path: "/cookie-policy" },
  { label: "Terms of use", path: "/terms-of-use" },
  { label: "General use cases", path: "/use-cases" },
];
