import { useState } from "react";
import { Link } from "react-router-dom";
import { Handbag, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/svg/Group 27.svg"
            alt="TaxPilot logo"
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop center links */}
        <div className="hidden md:flex items-center justify-center gap-[34px] text-[#34352E] font-medium text-[18px] leading-[25px]">
          <Link to="/how-it-works" className="hover:text-blue-600 transition-colors">
            How it works
          </Link>
          <Link to="/services" className="hover:text-blue-600 transition-colors">
            Services
          </Link>
          <Link to="/faq" className="hover:text-blue-600 transition-colors">
            FAQ
          </Link>
          <Link to="/blogs" className="hover:text-blue-600 transition-colors">
            Blogs
          </Link>
        </div>

        {/* Desktop right links */}
        <div className="hidden md:flex items-center gap-[28px] text-[#34352E] font-medium text-[18px] leading-[25px]">
          <Link to="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
          <Link to="/login" className="hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Link to="/cart" className="hover:text-blue-600 transition-colors flex items-center">
            <Handbag className="h-5 w-5" />
          </Link>
        </div>

        {/* Mobile right section */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Handbag always visible */}
          <Link to="/cart" className="hover:text-blue-600 transition-colors flex items-center">
            <Handbag className="h-5 w-5" />
          </Link>

          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#34352E] hover:text-blue-600 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="flex flex-col items-center gap-4 py-4 md:hidden text-[#34352E] font-medium text-[18px] leading-[25px]">
          <Link to="/how-it-works" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
            How it works
          </Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
            Services
          </Link>
          <Link to="/faq" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
            FAQ
          </Link>
          <Link to="/blogs" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
            Blogs
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
            Contact
          </Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
