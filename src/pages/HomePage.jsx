import React from 'react';
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import AdSense from '../components/AdSense'; // Google AdSense component
// import ComboSection from '../components/ComboSection'; // Commented out - Replaced with AllProductsSection
import AllProductsSection from '../components/AllProductsSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      
      {/* Top Banner Ad - after hero section */}
      <AdSense 
        adSlot="YOUR_AD_SLOT_ID_HERE" 
        adFormat="horizontal" 
        style={{ marginTop: '20px', marginBottom: '20px' }}
      />
      
      <About />
      
      {/* Mid-page Ad - between sections */}
      <AdSense 
        adSlot="YOUR_AD_SLOT_ID_HERE" 
        adFormat="rectangle" 
        style={{ marginTop: '30px', marginBottom: '30px' }}
      />
      
      {/* <ComboSection /> */}
      <AllProductsSection />
      
      {/* Bottom Ad - after products */}
      <AdSense 
        adSlot="YOUR_AD_SLOT_ID_HERE" 
        adFormat="horizontal" 
        style={{ marginTop: '40px', marginBottom: '20px' }}
      />
    </div>
  );
};

export default HomePage;