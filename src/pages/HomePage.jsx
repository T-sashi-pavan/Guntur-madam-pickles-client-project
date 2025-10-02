import React from 'react';
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import ComboSection from '../components/ComboSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <About />
      <ComboSection />
    </div>
  );
};

export default HomePage;