import React from 'react';
import resultImage from '../assets/sapphire-result.png'; // Make sure this path is correct

const Prediction = () => {
  return (
    <div className="flex justify-around items-center py-8">
      {/* Upload Box */}
      <div className="w-64 h-64 bg-white rounded-2xl border-2 border-dashed border-gray-400 flex flex-col justify-center items-center text-center p-4 cursor-pointer">
        <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center mb-4">
          <span className="text-4xl text-orange-500 font-light">+</span>
        </div>
        <p className="text-gray-500 font-medium">Click here to add images for prediction</p>
      </div>

      {/* Predict Button */}
      <button className="px-10 py-3 bg-yellow-300 border-2 border-black rounded-2xl font-bold text-xl hover:bg-yellow-400 transition">
        PREDICT
      </button>

      {/* Result Display */}
      <div className="w-64 h-64 p-2 bg-white rounded-2xl shadow-md">
        <img src={resultImage} alt="Gem Prediction Result" className="w-full h-full object-cover rounded-2xl" />
      </div>
    </div>
  );
};

export default Prediction;