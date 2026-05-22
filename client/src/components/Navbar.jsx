import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/auth';
import ModeToggle from './ModeToggle';

// --- SVG Icons ---
const MenuIcon = () => (
  <svg className={`w-7 h-7 rotate-0`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6 transition-all duration-200 rotate-90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Deconstruct both isLoggedIn and user from useAuth
  const { isLoggedIn, user } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const activeLinkClass = ({ isActive }) =>
    `font-semibold transition-colors ${isActive ? 'text-purple-600 dark:text-purple-500 border-b-2 border-purple-600 dark:border-purple-500' : 'text-gray-600 dark:text-foreground hover:text-purple-600'}`;

  const activeMobileLinkClass = ({ isActive }) =>
    `w-full text-center py-2 font-semibold transition-colors ${isActive ? 'bg-purple-50 dark:bg-purple-300 text-purple-600 dark:text-purple-700' : 'text-gray-700 dark:text-foreground hover:bg-purple-50'}`;

  return (
    <header className="bg-white/80 dark:bg-background dark:border-b dark:border-purple-600 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center md:px-2 md:py-1 px-5 py-2.5">

        {/* Logo */}
        <NavLink to="/" className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 tracking-tight">
          GEMX
        </NavLink>
        <div className='gap-4 flex flex-row-reverse md:hidden'>
          <ModeToggle />
          {/* Hamburger Menu Button (visible on mobile) */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 dark:text-foreground hover:text-purple-600 transition-colors size-5">
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={activeLinkClass}>
            HOME
          </NavLink>
          <NavLink to="/about" className={activeLinkClass}>
            ABOUT
          </NavLink>
          {isLoggedIn ? (
            <div className='flex gap-4 items-center-safe relative pr-2 md:pr-7'>
              {/* Profile Link with Avatar/Icon */}
              <NavLink
                to="/profile"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `px-1 rounded-full transition-colors duration-200 
                  ${isActive ? 'bg-purple-100 ring-2 ring-purple-500' : 'hover:bg-gray-100'}`
                }
              >
                {/* Conditionally render user avatar if available, otherwise show the icon */}
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Profile"
                    className="w-5 h-5 p-1 my-1 rounded-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <UserIcon className="w-5 h-5 p-1 my-1 text-gray-700 dark:border dark:border-purple-600 dark:rounded-full" />
                )}
              </NavLink>
              <NavLink
                to="/logout"
                className="px-4 py-1 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-all transform hover:scale-105"
              >
                LOG OUT
              </NavLink>
              <ModeToggle />
            </div>
          ) : (
            <div className='flex gap-4 items-baseline relative pr-2 md:pr-4'>
              <NavLink to="/register" className={activeLinkClass}>
                REGISTER
              </NavLink>
              <NavLink to="/login" className="px-4 py-1 mr-2.5 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-all transform hover:scale-105">
                LOG IN
              </NavLink>
              {/* <span className={`${activeLinkClass} border-1 border-black size-9 bg-blue-600`}> */}
              <ModeToggle />
              {/* </span> */}
            </div>
          )}
        </nav>
      </div>

      {/* Mobile Menu (conditionally rendered with transition) */}
      <div className={`transition-all duration-300 ease-in-out md:hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="bg-white dark:bg-background border-t border-gray-200">
          <nav className="flex flex-col items-center space-y-2 py-4">
            <NavLink to="/" onClick={toggleMenu} className={activeMobileLinkClass}>
              HOME
            </NavLink>
            <NavLink to="/about" onClick={toggleMenu} className={activeMobileLinkClass}>
              ABOUT
            </NavLink>
            {isLoggedIn ? (
              <>
                <NavLink to="/profile" onClick={toggleMenu} className={activeMobileLinkClass}>
                  PROFILE
                </NavLink>
                <NavLink
                  to="/logout"
                  className="w-full text-center px-5 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-all transform hover:scale-105"
                >
                  LOG OUT
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/register" onClick={toggleMenu} className={activeMobileLinkClass}>
                  REGISTER
                </NavLink>
                <NavLink to="/login" onClick={toggleMenu} className={activeMobileLinkClass}>
                  LOG IN
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;