import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Handbag, Menu, X, User, LogOut } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth, logout } from "@/utils/auth";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { isAuthenticated } = useAuth();
  const cartCount = cartItems.length;
  const isHome = pathname === "/";
  const navWrapperClass = isHome
    ? "full-bleed relative bg-[#FBFBFA]"
    : "relative w-full bg-white";
  const mobileMenuBg = isHome ? "bg-[#FBFBFA]" : "bg-white";

  const baseText = "text-[#34352E] font-medium text-base md:text-lg";
  const linkStyle = "hover:text-[#0166FF] transition-colors duration-200";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={`${navWrapperClass} z-50`}>
      <div className="global-container flex items-center justify-between md:py-4">
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="/svg/header-logo.svg"
            alt="TaxPilot logo"
            className="h-[70px] w-[130px] md:h-[42px] md:w-[193.59px]"
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
          <Link to="/contact-us" className={linkStyle}>
            Contact
          </Link>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className={`${linkStyle} flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-[#34352E] hover:bg-gray-300 transition-colors`}
                aria-label="User menu"
              >
                <User className="h-5 w-5" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[180px] rounded-[12px] border border-[#E6E6E1] bg-white p-1 shadow-md z-50"
                sideOffset={8}
                align="end"
              >
                {isAuthenticated ? (
                  <DropdownMenu.Item
                    className={cn(
                      "flex items-center gap-2 cursor-pointer select-none rounded-md px-3 py-2 text-sm text-[#34352E] hover:bg-gray-100 focus:bg-gray-100 outline-none"
                    )}
                    onSelect={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenu.Item>
                ) : (
                  <DropdownMenu.Item
                    className={cn(
                      "flex items-center gap-2 cursor-pointer select-none rounded-md px-3 py-2 text-sm text-[#34352E] hover:bg-gray-100 focus:bg-gray-100 outline-none"
                    )}
                    onSelect={() => navigate("/login")}
                  >
                    <User className="h-4 w-4" />
                    Login
                  </DropdownMenu.Item>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
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
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className={`${linkStyle} flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-[#34352E] hover:bg-gray-300 transition-colors`}
                aria-label="User menu"
              >
                <User className="h-5 w-5" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[180px] rounded-[12px] border border-[#E6E6E1] bg-white p-1 shadow-md z-50"
                sideOffset={8}
                align="end"
              >
                {isAuthenticated ? (
                  <DropdownMenu.Item
                    className={cn(
                      "flex items-center gap-2 cursor-pointer select-none rounded-md px-3 py-2 text-sm text-[#34352E] hover:bg-gray-100 focus:bg-gray-100 outline-none"
                    )}
                    onSelect={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenu.Item>
                ) : (
                  <DropdownMenu.Item
                    className={cn(
                      "flex items-center gap-2 cursor-pointer select-none rounded-md px-3 py-2 text-sm text-[#34352E] hover:bg-gray-100 focus:bg-gray-100 outline-none"
                    )}
                    onSelect={() => navigate("/login")}
                  >
                    <User className="h-4 w-4" />
                    Login
                  </DropdownMenu.Item>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
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
        className={`absolute left-0 w-full ${mobileMenuBg} md:hidden transform transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div
          className={`container-main flex flex-col items-center border border-[#E6E6E1] rounded-xl gap-4 py-6 mx-2 ${baseText}`}
        >
          {navLinks.map(({ to, label }, index) => (
            <div key={to} className="w-full">
              <Link
                to={to}
                onClick={() => setIsOpen(false)}
                className={`${linkStyle} w-full block text-center py-3`}
              >
                {label}
              </Link>

              {index !== navLinks.length - 1 && (
                <div className="mx-3 h-px bg-[#E6E6E1]" />
              )}
            </div>
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
