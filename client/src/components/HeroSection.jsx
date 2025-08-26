import React from 'react';
import heroImage from '../assets/gems-hero.png'; // Make sure this path is correct

const HeroSection = () => {
  return (
    <div className="flex justify-between items-center p-8 space-x-8">
      {/* Text Content */}
      <div className="w-1/2">
        <h1 className="text-7xl font-bold text-purple-600 mb-6">GEMX &#128142;</h1>
        <p className="text-2xl font-semibold text-black mb-3">"Where Machine Learning Meets Earth's Rarest Treasures."</p>
        <p className="text-2xl font-semibold text-black mb-3">"Built for Jewelers, Collectors, and Curious Minds."</p>
        <p className="text-2xl font-semibold text-black">"Accurate. Fast. Beautifully Simple."</p>
      </div>

      {/* Image Content */}
      <div className="w-1/2">
        <img src={heroImage} alt="Assorted Gems" className="rounded-2xl pointer-events-none shadow-lg w-full" />
      </div>
    </div>
  );
};

export default HeroSection;