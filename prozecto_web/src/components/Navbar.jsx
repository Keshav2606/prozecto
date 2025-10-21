import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import RollingText from "./RollingText";
import ThemeToggle from "./ThemeToggle";
import api from "../services/api";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '', phoneVisible: false });
  const location = useLocation();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await api.settings.getAll();
      if (data.length > 0) {
        const settings = data[0];
        setContactInfo({
          email: settings.email || 'email@gmail.com',
          phone: settings.phone || '+91-1234567890',
          phoneVisible: settings.phoneVisible || false
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setContactInfo({ email: 'email@gmail.com', phone: '+91-1234567890', phoneVisible: false });
    }
  };

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className="w-full bg-yellow-500">
      <div className="mx-auto sm:h-24 h-16 flex items-center justify-between bg-blue-500 px-4 sm:px-10">
        {/* Brand - Extreme Left */}
        <div className="flex items-center pr-6 sm:pr-3">
          <div className="lg:text-3xl text-lg font-bold font-montserrat">
            Prozecto
          </div>
        </div>

        {/* Desktop Menu - ADD ml-auto HERE */}
        <div className="hidden lg:flex items-center xl:gap-5 2xl:gap-10 lg:gap-2 ml-auto">
          {/* Menu Tabs */}
          <div className="flex gap-2 2xl:space-x-6 xl:space-x-2 font-montserrat xl:text-md 2xl:text-xl lg:text-sm font-medium border-r-2 border-black xl:pr-5 2xl:pr-10 lg:pr-2 relative">
            <Link to="/" className="cursor-pointer">
              <RollingText text="Home" />
            </Link>

            {/* About Us Dropdown */}
            <div className="relative">
              <div
                className="cursor-pointer flex gap-2 lg:gap-1"
                onClick={() => toggleDropdown("about")}
              >
                <RollingText text="About Us" />
                <div className="mt-1">
                  <ChevronDown size={20} />
                </div>
              </div>
              {openDropdown === "about" && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                  <Link
                    to="/about-us"
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/mission"
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
                  >
                    Mission
                  </Link>
                  <Link
                    to="/vision"
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
                  >
                    Vision
                  </Link>
                </div>
              )}
            </div>

            {/* Get a Quote Dropdown */}
            <div className="relative">
              <div
                className="cursor-pointer flex gap-2 lg:gap-1"
                onClick={() => toggleDropdown("quote")}
              >
                <RollingText text="Quote" />{" "}
                <div className="mt-1">
                  <ChevronDown size={20} />
                </div>
              </div>
              {openDropdown === "quote" && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                  <Link
                    to="/get-quote"
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
                  >
                    Request Form
                  </Link>
                  <Link
                    to="/faq"
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
                  >
                    FAQ
                  </Link>
                </div>
              )}
            </div>

            {/* Terms & Conditions Dropdown */}
            <div className="relative">
              <div
                className="cursor-pointer flex gap-2 lg:gap-1"
                onClick={() => toggleDropdown("terms")}
              >
                <RollingText text="Policies" />{" "}
                <div className="mt-1">
                  <ChevronDown size={20} />
                </div>
              </div>
              {openDropdown === "terms" && (
                <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md z-50">
                  <Link
                    to="/terms-and-conditions"
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    to="/privacy-policy"
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/user-agreement"
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
                  >
                    User Agreement
                  </Link>
                  <Link
                    to="/refund-policy"
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
                  >
                    Refund Policy
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/blog"
              className={`cursor-pointer ${
                isActive("/blog") ? "text-blue-600" : ""
              }`}
            >
              <RollingText text="Blog" />
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex 2xl:space-x-6 xl:space-x-2 2xl:text-xl lg:text-sm lg:space-x-2 font-montserrat xl:text-md font-medium">
            {contactInfo.phoneVisible && (
              <div className="cursor-pointer hover:text-white">
                {contactInfo.phone}
              </div>
            )}
            <div className="cursor-pointer hover:text-white">
              {contactInfo.email}
            </div>
          </div>
          <ThemeToggle />
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
        className={`fixed top-0 right-0 h-full w-80 transform transition-transform duration-300 z-50 ${
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
            <Link
              to="/"
              className="py-2 cursor-pointer hover:text-yellow-300 block"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

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
                  <Link
                    to="/mission"
                    className="block cursor-pointer text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Mission
                  </Link>
                  <Link
                    to="/vision"
                    className="block cursor-pointer text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Vision
                  </Link>
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
                  <Link
                    to="/get-quote"
                    className="block cursor-pointer text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Request Form
                  </Link>
                  <Link
                    to="/faq"
                    className="block cursor-pointer text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    FAQ
                  </Link>
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
                  <Link
                    to="/privacy-policy"
                    className="block cursor-pointer text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/user-agreement"
                    className="block cursor-pointer text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    User Agreement
                  </Link>
                  <Link
                    to="/refund-policy"
                    className="block cursor-pointer text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Refund Policy
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/blog"
              className={`py-2 cursor-pointer hover:text-yellow-300 block ${
                isActive("/blog") ? "text-blue-400" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>

            <div className="pt-6 font-thin">
              {contactInfo.phoneVisible && (
                <div className="py-2 cursor-pointer hover:text-yellow-300">
                  {contactInfo.phone}
                </div>
              )}
              <div className="py-2 cursor-pointer hover:text-yellow-300">
                {contactInfo.email}
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
