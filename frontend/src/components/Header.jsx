import React, { useState } from "react";
import { Scale, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Features", path: "/features" },
    { name: "Legal Insights", path: "/blogs" }, // Added blog link
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-sans">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Scale className="h-9 w-9 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              Justice Buddy
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative text-gray-700 font-medium text-[15px] transition-all duration-200 hover:text-emerald-600 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300"
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/get-legal-help"
              className="text-white bg-emerald-600 px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-emerald-700 shadow-sm transition-colors duration-200"
            >
              Get Legal Help
            </Link>

            <Link
              to="/login"
              className="border border-emerald-600 px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-emerald-50 transition-colors duration-200"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-800" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 px-2 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)} // close menu on click
                className="block text-gray-700 font-medium py-2 px-3 rounded-md hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/get-legal-help"
              onClick={() => setIsOpen(false)}
              className="block text-white bg-emerald-600 px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-emerald-700 shadow-sm transition-colors duration-200"
            >
              Get Legal Help
            </Link>

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block border border-emerald-600 px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-emerald-50 transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
