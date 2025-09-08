import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-yellow-500">
      <div className="mx-auto sm:h-24 h-16 flex items-center justify-between bg-blue-500 px-4 sm:px-10">
        {/* Brand - Extreme Left */}
        <div className="lg:text-3xl md:text-xl text-lg font-bold font-montserrat">
          Prozecto
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center lg:gap-10 md:gap-4">
          {/* Menu Tabs */}
          <div className="flex lg:space-x-8 md:space-x-4 font-montserrat lg:text-xl md:text-sm font-medium border-r-2 border-black lg:pr-10 md:pr-4">
            <div className="cursor-pointer hover:text-white">Home</div>
            <div className="cursor-pointer hover:text-white">About Us</div>
            <div className="cursor-pointer hover:text-white">Get a quote</div>
            <div className="cursor-pointer hover:text-white">Terms & Conditions</div>
            <div className="cursor-pointer hover:text-white">Blog</div>
          </div>

          {/* Contact Info */}
          <div className="flex lg:space-x-8 md:space-x-4 font-montserrat lg:text-xl md:text-sm font-medium">
            <div className="cursor-pointer hover:text-white">+91-1234567890</div>
            <div className="cursor-pointer hover:text-white">email@gmail.com</div>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-white focus:outline-none"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Slide Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-red-500 transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'} sm:hidden`}>
        <div className="p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ×
          </button>
          
          <div className="mt-12 space-y-6">
            <div className="text-white font-montserrat text-lg font-light border-b border-white pb-4">
              <div className="py-2 cursor-pointer hover:text-yellow-300">Home</div>
              <div className="py-2 cursor-pointer hover:text-yellow-300">About Us</div>
              <div className="py-2 cursor-pointer hover:text-yellow-300">Get a quote</div>
              <div className="py-2 cursor-pointer hover:text-yellow-300">Terms & Conditions</div>
              <div className="py-2 cursor-pointer hover:text-yellow-300">Blog</div>
            </div>
            
            <div className="text-white font-montserrat text-lg font-thin">
              <div className="py-2 cursor-pointer hover:text-yellow-300">+91-1234567890</div>
              <div className="py-2 cursor-pointer hover:text-yellow-300">email@gmail.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
