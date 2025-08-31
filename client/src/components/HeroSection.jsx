import React, { useState, useEffect } from 'react';

// --- Animated SVG Gemstone Illustration ---
const GemstoneIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center p-8">
    {/* The viewBox has been adjusted to give the glow effect more room */}
    <svg viewBox="-20 -20 240 240" className="w-full max-w-xs sm:max-w-sm drop-shadow-2xl">
      <defs>
        <linearGradient id="gemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#a855f7' }} /> {/* Lighter Purple */}
          <stop offset="100%" style={{ stopColor: '#ec4899' }} /> {/* Pink */}
        </linearGradient>
        <filter id="gemGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g style={{ filter: 'url(#gemGlow)' }}>
        <path d="M 100,10 L 190,75 L 150,190 L 50,190 L 10,75 Z" fill="url(#gemGradient)" />
        <path d="M 100,10 L 100,190 L 50,190 L 10,75 Z" fill="rgba(255, 255, 255, 0.25)" />
        <path d="M 100,10 L 190,75 L 150,190 L 100,190 Z" fill="rgba(255, 255, 255, 0.15)" />
        <path d="M 100,10 L 140,75 L 100,85 Z" fill="white" className="animate-sparkle" style={{ animationDelay: '0s' }} />
        <path d="M 100,10 L 50,190 L 80,190 Z" fill="white" className="animate-sparkle" style={{ animationDelay: '0.8s' }} />
        <path d="M 10,75 L 50,190 L 30,130 Z" fill="white" className="animate-sparkle" style={{ animationDelay: '1.6s' }} />
      </g>
    </svg>
  </div>
);

// --- Floating Orb Component ---
const Orb = ({ className, style }) => (
    <div className={`absolute rounded-full filter blur-3xl ${className}`} style={style}></div>
);


// --- The main Hero Section component ---
const HeroSection = ({ onStartPrediction }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculates the parallax transformation style based on mouse position
  const parallaxStyle = (strength) => {
    const x = (mousePosition.x - window.innerWidth / 2) * strength;
    const y = (mousePosition.y - window.innerHeight / 2) * strength;
    return {
      transform: `translate(${x}px, ${y}px)`,
    };
  };

  const handleClick = (e) => {
    e.preventDefault();
    onStartPrediction();
  };

  return (
    <>
      <style>
        {`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            opacity: 0;
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0; }
            50% { opacity: 0.7; }
          }
          .animate-sparkle {
            animation: sparkle 2.5s ease-in-out infinite;
          }
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animated-gradient {
            background: linear-gradient(-45deg, #f3e8ff, #fce7f3, #e0f2fe, #f3e8ff);
            background-size: 400% 400%;
            animation: gradient-shift 15s ease infinite;
          }
          @keyframes float {
             0% { transform: translateY(0px) translateX(0px); }
             50% { transform: translateY(-20px) translateX(20px); }
             100% { transform: translateY(0px) translateX(0px); }
          }
          .orb-float {
              animation: float 6s ease-in-out infinite;
          }
        `}
      </style>
      <div className="relative min-h-screen w-full animated-gradient flex items-center justify-center p-8 lg:p-12 overflow-hidden">
        {/* Decorative Floating Orbs */}
        <Orb className="w-64 h-64 bg-purple-200 opacity-50 top-1/4 left-1/4 orb-float" style={{ animationDelay: '0s' }} />
        <Orb className="w-48 h-48 bg-pink-200 opacity-50 bottom-1/4 right-1/4 orb-float" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10">
          
          {/* Parallax SVG Illustration Section */}
          <div className="h-[350px] sm:h-[450px] lg:h-[600px] w-full animate-fade-in-up transition-transform duration-500 ease-out" style={{ ...parallaxStyle(-0.02), animationDelay: '0.2s' }}>
            <GemstoneIllustration />
          </div>

          {/* Parallax Text Content Section */}
          <div className="text-center lg:text-left transition-transform duration-500 ease-out" style={parallaxStyle(0.01)}>
            <h1 
              className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-6 tracking-tight animate-fade-in-up transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
              style={{ animationDelay: '0.4s' }}
            >
              GEMX
            </h1>
            <p className="text-2xl sm:text-3xl font-light text-gray-600 mb-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Unlocking the Story in Every Stone.
            </p>
            <p className="text-lg sm:text-xl font-light text-gray-600 mb-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              The essential digital tool for connoisseurs and creators.
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-purple-800 mb-10 animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
              Precision, Speed, and Elegance. Redefined.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <a
                href="#prediction-section"
                onClick={handleClick}
                className="inline-flex items-center justify-center text-lg font-bold px-8 py-4 rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg transform hover:scale-105 hover:shadow-xl hover:from-purple-500 hover:to-pink-400 transition-all duration-300"
              >
                Start Predicting
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center text-lg font-bold px-8 py-4 rounded-full text-gray-800 bg-white shadow-lg border border-gray-200 transform hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default HeroSection;

