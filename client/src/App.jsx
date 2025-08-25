import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Prediction from './components/Prediction';
import Footer from './components/Footer';

function App() {
  return (
    // Sets the light grey background for the whole page
    <div className="bg-gray-200 min-h-screen p-8">
      {/* Main container with white background and black border */}
      <div className="max-w-7xl mx-auto bg-white border-2 border-black rounded-2xl">
        <Navbar />
        {/* Inner container for the main content area */}
        <div className="bg-gray-100 m-8 rounded-2xl border-2 border-gray-300">
          <HeroSection />
          <Prediction />
        </div>
        <div className="p-8 pt-0">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;