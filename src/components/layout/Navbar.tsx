import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Handbag, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { cartItems } = useCart();
  const cartCount = cartItems.length;
  const isHome = pathname === "/";
  const navWrapperClass = isHome
    ? "full-bleed relative bg-[#FBFBFA]"
    : "relative w-full bg-white";
  const mobileMenuBg = isHome ? "bg-[#FBFBFA]" : "bg-white";

  const baseText = "text-[#34352E] font-medium text-base md:text-lg";
  const linkStyle = "hover:text-[#0166FF] transition-colors duration-200";

  return (
    <nav className={`${navWrapperClass} z-50`}>
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
          <Link
            to="/cart"
            className={`${linkStyle} relative flex items-center`}
          >
            <Handbag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#007BFF] px-1 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Link
            to="/cart"
            className={`${linkStyle} relative flex items-center`}
          >
            <Handbag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#007BFF]  px-1 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
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
        className={`absolute  left-0 w-full ${mobileMenuBg} md:hidden transform transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div
          className={`container-main flex flex-col items-center gap-4  ${baseText}`}
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
  { to: "/", label: "How it works" },
  { to: "/services", label: "Services" },
  { to: "/faq", label: "FAQ" },
  { to: "/blogs", label: "Blogs" },
];

const actionLinks = [
  { to: "/contact-us", label: "Contact" },
  { to: "/login", label: "Login" },
];
