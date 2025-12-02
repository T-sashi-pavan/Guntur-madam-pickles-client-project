import React from 'react';
import HeroSection from '../components/HeroSection';
import About from '../components/About';
// import ComboSection from '../components/ComboSection'; // Commented out - Replaced with AllProductsSection
import AllProductsSection from '../components/AllProductsSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <About />
      {/* <ComboSection /> */}
      <AllProductsSection />
    </div>
  );
};

export default HomePage;