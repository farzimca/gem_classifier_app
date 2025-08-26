import React from 'react';

// IMPORTANT: Make sure you have an image at this path in your project,
// or replace the placeholder URL below with your actual image URL.
// import heroImage from '../assets/gems-hero.png'; 

const HeroSection = () => {
  // Using a new, high-quality placeholder image for a more luxurious feel.
  const heroImage = 'https://cdn.hswstatic.com/gif/shutterstock-2248801625-hero.jpg';

  return (
    <>
      {/* Custom CSS for animations. */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          .animate-shimmer {
            background: linear-gradient(to right, #4a5568 25%, #a0aec0 50%, #4a5568 75%);
            background-size: 2000px 100%;
            animation: shimmer 3s infinite;
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
        `}
      </style>

      {/* Main container with a clean, light background */}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Switched to flexbox for responsive ordering. flex-col-reverse puts the image first on mobile. */}
        <div className="container mx-auto flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center">
          
          {/* Text Content Section with staggered animations */}
          <div className="text-center lg:text-left">
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-6 tracking-tight animate-fade-in-up"
              style={{ animationDelay: '0.2s', opacity: 0 }}
            >
              GEMX &#128142;
            </h1>
            <p 
              className="text-lg sm:text-xl font-medium text-gray-700 mb-3 animate-fade-in-up"
              style={{ animationDelay: '0.4s', opacity: 0 }}
            >
              "Where Machine Learning Meets Earth's Rarest Treasures."
            </p>
            <p 
              className="text-lg sm:text-xl font-medium text-gray-700 mb-3 animate-fade-in-up"
              style={{ animationDelay: '0.6s', opacity: 0 }}
            >
              "Built for Jewelers, Collectors, and Curious Minds."
            </p>
            <p 
              className="text-lg sm:text-xl font-medium text-gray-700 mb-8 animate-fade-in-up"
              style={{ animationDelay: '0.8s', opacity: 0 }}
            >
              "Accurate. Fast. Beautifully Simple."
            </p>
            
            {/* Call-to-Action Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: '1.0s', opacity: 0 }}
            >
              <a
                href="/predict"
                className="inline-block bg-purple-600 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-purple-700 transform hover:-translate-y-1 transition-all duration-300"
              >
                Start Predicting
              </a>
               <a
                href="/about"
                className="inline-block bg-white text-gray-800 font-semibold text-lg px-8 py-4 rounded-lg shadow-lg border border-gray-300 hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Image Content Section with a subtle hover effect */}
          <div className="flex justify-center animate-fade-in-up w-full max-w-sm sm:max-w-md" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <div className="relative group">
              <img 
                src={heroImage} 
                alt="Beautifully cut gemstone" 
                className="rounded-2xl shadow-2xl w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                style={{ aspectRatio: '1/1' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default HeroSection;
