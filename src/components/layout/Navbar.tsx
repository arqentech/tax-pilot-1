import { useState } from "react";
import { Link } from "react-router-dom";
import { Handbag, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const baseText = "text-[#34352E] font-medium text-base md:text-lg";
  const linkStyle = "hover:text-[#0166FF] transition-colors duration-200";

  return (
    <nav className="relative z-50 w-full bg-[#FBFBFA]">
      <div className="global-container flex items-center justify-between md:py-4">
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="/svg/header-logo.svg"
            alt="TaxPilot logo"
            className="h-[136px] w-[157px] md:h-[42px] md:w-[193.59px]"
            loading="lazy"
          />
        </Link>

        <div
          className={`hidden md:flex text-base items-center justify-center gap-8 ${baseText}`}
        >
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={linkStyle}>
              {label}
            </Link>
          ))}
        </div>

        <div className={`hidden md:flex items-center gap-8 ${baseText}`}>
          {actionLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={linkStyle}>
              {label}
            </Link>
          ))}
          <Link to="/cart" className={`${linkStyle} flex items-center`}>
            <Handbag className="h-5 w-5" />
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className={`${linkStyle} flex items-center`}>
            <Handbag className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-[#34352E] hover:text-[#0166FF] transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-white md:hidden transform transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div
          className={`container-main flex flex-col items-center gap-4 py-4 ${baseText}`}
        >
          {[...navLinks, ...actionLinks].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={linkStyle}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
const navLinks = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/services", label: "Services" },
  { to: "/faq", label: "FAQ" },
  { to: "/blogs", label: "Blogs" },
];

const actionLinks = [
  { to: "/contact-us", label: "Contact" },
  { to: "/login", label: "Login" },
];
