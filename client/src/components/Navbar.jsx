import React from 'react';

const Navbar = () => {
  return (
    <header className="border-b-2 border-black">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-4xl font-bold font-['Comic_Sans_MS',_cursive]">
          GEMX
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-4">
          <a href="#home" className="px-5 py-1 border-2 border-green-500 rounded-full bg-white font-semibold text-gray-700 hover:bg-green-500 hover:text-white transition">
            HOME
          </a>
          <a href="#about" className="px-5 py-1 border-2 border-green-500 rounded-full bg-white font-semibold text-gray-700 hover:bg-green-500 hover:text-white transition">
            ABOUT
          </a>
          <a href="#register" className="px-5 py-1 border-2 border-green-500 rounded-full bg-white font-semibold text-gray-700 hover:bg-green-500 hover:text-white transition">
            REGISTER
          </a>
        </nav>

        {/* Profile Icon */}
        <div className="w-10 h-10 bg-white border-2 border-green-500 rounded-full"></div>
      </div>
    </header>
  );
};

export default Navbar;