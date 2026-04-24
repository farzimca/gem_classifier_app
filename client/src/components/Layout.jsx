import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ModeToggle from './ModeToggle';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-200 dark:bg-zinc-950 min-h-screen h-screen">
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <Navbar />
        <main
          className='flex-grow'
        >{children}</main> {/* This is where the page content will go */}
        {/* <div className='pt-0'> */}
        <Footer />
        {/* </div> */}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Layout;