import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Handbag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import UserDropdown from "@/components/ui/UserDropdown";

const navLinks = [
  { to: "/", label: "Chi siamo" },
  { to: "/servizi", label: "Servizi" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "Blogs" },
  { to: "/contatti", label: "Contatti" },
];

const FloatingNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);
  const { cartItemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current && currentScrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="bg-[#007BFF] border-2 border-white/40 rounded-full shadow-lg px-8 py-4 flex items-center gap-8">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="!text-white font-medium text-base hover:!text-[#BFDDFF] transition-colors whitespace-nowrap"
          >
            {label}
          </Link>
        ))}

        <div className="[&_button:hover]:bg-white/20 [&_img]:[filter:brightness(0)_invert(1)]">
          <UserDropdown />
        </div>

        <Link
          to="/cart"
          className="relative flex items-center text-white hover:text-[#BFDDFF] transition-colors"
        >
          <Handbag className="h-6 w-6" />
          {cartItemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-xs font-semibold text-[#007BFF]">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default FloatingNavbar;
