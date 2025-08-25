import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Prediction from '../components/Prediction';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Prediction />
      <Footer />
    </div>
  );
};

export default HomePage;