import React from 'react';
import HeroSection from '../components/HeroSection'; // Assuming you put it back in components
import Prediction from '../components/Prediction';   // Assuming you put it back in components

const HomePage = () => {
  return (
    // The inner container for the main content
    <div className="bg-gray-100 border-gray-300">
      <HeroSection />
      <Prediction />
    </div>
  );
};

export default HomePage;