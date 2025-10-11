import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {ChevronDown} from "lucide-react"
import RollingText from "./RollingText";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className="w-full bg-yellow-500">
      <div className="mx-auto sm:h-24 h-16 flex items-center justify-between bg-blue-500 px-4 sm:px-10">
        {/* Brand - Extreme Left */}
        <div className="lg:text-3xl md:text-xl sm:text-sm text-lg font-bold font-montserrat">
          Prozecto
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center xl:gap-5 2xl:gap-10 lg:gap-6">
          {/* Menu Tabs */}
          <div className="flex gap-3 2xl:space-x-6 xl:space-x-2 lg:space-x-4 font-montserrat xl:text-md 2xl:text-xl lg:text-base font-medium border-r-2 border-black xl:pr-5 2xl:pr-10 lg:pr-6 relative">
            <div className="cursor-pointer"><RollingText text="Home"/></div>

            {/* About Us Dropdown */}
            <div className="relative">
              <div
                className="cursor-pointer flex gap-2"
                onClick={() => toggleDropdown("about")}
              >
                <RollingText text="About Us"/><div className="mt-1"><ChevronDown /></div>
              </div>
              {openDropdown === "about" && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                  <Link to="/about-us" className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-black">About Us</Link>
                  <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black">Our Team</div>
                  <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black">Mission</div>
                  <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black">Vision</div>
                </div>
              )}
            </div>

            {/* Get a Quote Dropdown */}
            <div className="relative">
              <div
                className="cursor-pointer flex gap-2"
                onClick={() => toggleDropdown("quote")}
              >
                <RollingText text="Get a Quote"/> <div className="mt-1"><ChevronDown /></div>
              </div>
              {openDropdown === "quote" && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                  <Link to="/get-quote" className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-black">Request Form</Link>
                  <Link to="/faq" className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-black">FAQ</Link>
                </div>
              )}
            </div>

            {/* Terms & Conditions Dropdown */}
            <div className="relative">
              <div
                className="cursor-pointer flex gap-2"
                onClick={() => toggleDropdown("terms")}
              >
                <RollingText text="Terms & Conditions"/> <div className="mt-1"><ChevronDown /></div>
              </div>
              {openDropdown === "terms" && (
                <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md z-50">
                  <Link to="/terms-and-conditions" className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-black">Terms & Conditions</Link>
                  <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black">Privacy Policy</div>
                  <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black">User Agreement</div>
                  <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black">Refund Policy</div>
                </div>
              )}
            </div>

            <Link to="/blog" className={`cursor-pointer ${isActive('/blog') ? 'text-blue-600' : ''}`}>
              <RollingText text="Blog"/>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex 2xl:space-x-6 xl:space-x-2 2xl:text-xl lg:space-x-4 font-montserrat xl:text-md lg:text-base font-medium">
            <div className="cursor-pointer hover:text-white">+91-1234567890</div>
            <div className="cursor-pointer hover:text-white">email@gmail.com</div>
          </div>
          <ThemeToggle/>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white focus:outline-none"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-red-500 transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ×
          </button>

          <div className="mt-12 space-y-6 text-white font-montserrat text-lg font-light">
            <div className="py-2 cursor-pointer hover:text-yellow-300">Home</div>

            {/* Mobile Dropdowns */}
            <div>
              <div
                className="py-2 cursor-pointer hover:text-yellow-300"
                onClick={() => toggleDropdown("about")}
              >
                About Us
              </div>
              {openDropdown === "about" && (
                <div className="pl-4 space-y-2 text-sm">
                  <div className="cursor-pointer text-white">Our Team</div>
                  <div className="cursor-pointer text-white">Mission</div>
                  <div className="cursor-pointer text-white">Vision</div>
                </div>
              )}
            </div>

            <div>
              <div
                className="py-2 cursor-pointer hover:text-yellow-300"
                onClick={() => toggleDropdown("quote")}
              >
                Get a Quote
              </div>
              {openDropdown === "quote" && (
                <div className="pl-4 space-y-2 text-sm">
                  <Link to="/get-quote" className="block cursor-pointer text-white" onClick={() => setIsOpen(false)}>Request Form</Link>
                  <Link to="/faq" className="block cursor-pointer text-white" onClick={() => setIsOpen(false)}>FAQ</Link>
                </div>
              )}
            </div>

            <div>
              <div
                className="py-2 cursor-pointer hover:text-yellow-300"
                onClick={() => toggleDropdown("terms")}
              >
                Terms & Conditions
              </div>
              {openDropdown === "terms" && (
                <div className="pl-4 space-y-2 text-sm">
                  <div className="cursor-pointer text-white">Privacy Policy</div>
                  <div className="cursor-pointer text-white">User Agreement</div>
                  <div className="cursor-pointer text-white">Refund Policy</div>
                </div>
              )}
            </div>

            <Link to="/blog" className={`py-2 cursor-pointer hover:text-yellow-300 block ${isActive('/blog') ? 'text-blue-400' : ''}`} onClick={() => setIsOpen(false)}>
              Blog
            </Link>

            <div className="pt-6 font-thin">
              <div className="py-2 cursor-pointer hover:text-yellow-300">
                +91-1234567890
              </div>
              <div className="py-2 cursor-pointer hover:text-yellow-300">
                email@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
