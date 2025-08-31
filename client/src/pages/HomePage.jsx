import React, { useRef } from 'react';
import HeroSection from '../components/HeroSection';
import Prediction from '../components/Prediction';

const HomePage = () => {
  // 1. Create a ref for the Prediction component
  const predictionRef = useRef(null);

  // Function to handle the scroll action
  const handleStartPrediction = () => {
    // 2. Scroll to the Prediction component's position
    predictionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-100 border-gray-300">
      <HeroSection onStartPrediction={handleStartPrediction} />
      
      {/* 3. Assign the ref to the Prediction component's wrapper */}
      <div ref={predictionRef}>
        <Prediction />
      </div>
    </div>
  );
};

export default HomePage;