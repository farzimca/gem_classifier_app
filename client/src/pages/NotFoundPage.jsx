import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl animate-fade-in-up">
        {/* You can re-use the same fade-in animation */}
        <style>
          {`
            @keyframes fade-in-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
              animation: fade-in-up 0.8s ease-out forwards;
            }
          `}
        </style>
        
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
          404
        </h1>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          The gemstone you're looking for seems to have been misplaced. It's not here.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="inline-block bg-purple-600 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-purple-700 transform hover:-translate-y-1 transition-all duration-300"
          >
            Go Home
          </Link>
          <Link 
            to="/contact" 
            className="inline-block bg-white text-gray-800 font-semibold text-lg px-8 py-4 rounded-lg shadow-lg border border-gray-300 hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;