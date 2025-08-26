import React, { useState } from 'react';
// The <Link> component from react-router-dom requires a <Router> component to be a parent.
// To fix the error in this isolated component, we will use standard <a> tags instead.
// import { Link } from 'react-router-dom';

// --- SVG Icons ---
// Using inline SVGs to avoid external dependencies and ensure consistency.

const MenuIcon = () => (
  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserIcon = () => (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Logo */}
        <a href="/" className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 tracking-tight">
          GEMX
        </a>

        {/* Hamburger Menu Button (visible on mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-purple-600 transition-colors">
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="font-semibold text-gray-600 hover:text-purple-600 transition-colors">
            HOME
          </a>
          <a href="/about" className="font-semibold text-gray-600 hover:text-purple-600 transition-colors">
            ABOUT
          </a>
          <a href="/register" className="font-semibold text-gray-600 hover:text-purple-600 transition-colors">
            REGISTER
          </a>
          <a href="/login" className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-all transform hover:scale-105">
            LOG IN
          </a>
          <a href="/profile" className="text-gray-600 hover:text-purple-600 transition-colors">
            <UserIcon />
          </a>
        </nav>
      </div>

      {/* Mobile Menu (conditionally rendered with transition) */}
      <div className={`transition-all duration-300 ease-in-out md:hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="bg-white border-t border-gray-200">
          <nav className="flex flex-col items-center space-y-2 py-4">
            <a href="/" onClick={toggleMenu} className="w-full text-center py-2 font-semibold text-gray-700 hover:bg-purple-50 transition-colors">
              HOME
            </a>
            <a href="/about" onClick={toggleMenu} className="w-full text-center py-2 font-semibold text-gray-700 hover:bg-purple-50 transition-colors">
              ABOUT
            </a>
            <a href="/register" onClick={toggleMenu} className="w-full text-center py-2 font-semibold text-gray-700 hover:bg-purple-50 transition-colors">
              REGISTER
            </a>
             <a href="/login" onClick={toggleMenu} className="w-full text-center py-2 font-semibold text-gray-700 hover:bg-purple-50 transition-colors">
              LOG IN
            </a>
            <a href="/profile" onClick={toggleMenu} className="w-full text-center py-2 font-semibold text-gray-700 hover:bg-purple-50 transition-colors">
              PROFILE
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
