import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons from react-icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="border-b-2 border-black">
      <div className="container mx-auto flex justify-between items-center p-3">
        {/* Logo */}
        <div className="text-4xl font-bold font-['Comic_Sans_MS',_cursive]">
          GEMX
        </div>

        {/* Hamburger Menu Button (visible on mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links (hidden on mobile, flexible on desktop) */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="px-5 py-1 border-2 border-green-500 rounded-lg bg-white font-semibold text-gray-700 hover:bg-green-500 hover:text-white transition">
            HOME
          </Link>
          <Link to="/about" className="px-5 py-1 border-2 border-green-500 rounded-lg bg-white font-semibold text-gray-700 hover:bg-green-500 hover:text-white transition">
            ABOUT
          </Link>
          <Link to="/register" className="px-5 py-1 border-2 border-green-500 rounded-lg bg-white font-semibold text-gray-700 hover:bg-green-500 hover:text-white transition">
            REGISTER
          </Link>
          <Link to="/login" className="px-5 py-1 border-2 border-green-500 rounded-lg bg-white font-semibold text-gray-700 hover:bg-green-500 hover:text-white transition">
            LOG IN
          </Link>
          {/* Profile Icon */}
          <Link to="/profile" className="w-10 h-10 bg-white border-2 border-green-500 rounded-full"></Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t-2 border-black">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link to="/" onClick={toggleMenu} className="w-full text-center px-5 py-2 border-b border-gray-200 font-semibold text-gray-700">
              HOME
            </Link>
            <Link to="/about" onClick={toggleMenu} className="w-full text-center px-5 py-2 border-b border-gray-200 font-semibold text-gray-700">
              ABOUT
            </Link>
            <Link to="/register" onClick={toggleMenu} className="w-full text-center px-5 py-2 border-b border-gray-200 font-semibold text-gray-700">
              REGISTER
            </Link>
            <Link to="/profile" onClick={toggleMenu} className="w-full text-center px-5 py-2 font-semibold text-gray-700">
              PROFILE
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;