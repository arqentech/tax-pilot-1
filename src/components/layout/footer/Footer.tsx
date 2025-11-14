import FooterLogo from "./FooterLogo";
import FooterLinks from "./FotterLinks";
import NewsletterSignup from "./NewsletterSignup";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer className="bg-[#373737] text-white w-full px-8 md:px-20 py-16">
      <div className="max-w-[1320px] mx-auto">
        <div className="font-bricolage grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
          <div className="order-1 md:order-1">
            <FooterLogo />
          </div>

          <div className="order-2 grid grid-cols-2 gap-10 md:hidden">
            <FooterLinks title="Quick Links" links={quickLinks} />
            <FooterLinks title="Legal" links={legalLinks} />
          </div>

          <div className="hidden md:block order-2 md:order-2">
            <FooterLinks title="Quick Links" links={quickLinks} />
          </div>

          <div className="hidden md:block order-3 md:order-3">
            <FooterLinks title="Legal" links={legalLinks} />
          </div>

          <div className="order-4 md:order-4 ">
            <NewsletterSignup />
          </div>
        </div>

        <SocialLinks />

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

