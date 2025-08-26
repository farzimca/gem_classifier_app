import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#F9E8D9] p-4">
      <p className="text-center font-semibold text-gray-800">
        <p>Made with ❤️ &#9774; </p>
        <p>Gemx &copy; 2025</p>
        <p className="flex items-center justify-center text-sm text-gray-600 mt-4 ">
          Contact with us {' '}
          <a href="mailto:webdevlrn@gmail.com" target='_blank' rel='noopener noreferrer'>
            <FaEnvelope className='text-gray-600 ml-2 align-middle text-lg'/>
          </a>
          </p>
      </p>
    </footer>
  );
};

export default Footer;