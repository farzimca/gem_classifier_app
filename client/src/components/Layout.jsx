import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="bg-white">
        <Navbar />
        <main>{children}</main> {/* This is where the page content will go */}
        <div className="pt-0">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;