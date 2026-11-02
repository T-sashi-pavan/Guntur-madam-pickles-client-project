import React from 'react';
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import AdSense from '../components/AdSense'; // Google AdSense component
// import ComboSection from '../components/ComboSection'; // Commented out - Replaced with AllProductsSection
import AllProductsSection from '../components/AllProductsSection';
import SEO from '../components/SEO';


const HomePage = () => {
  return (
    <div>
      <SEO 
        title="Authentic Andhra Pickles & Spices"
        description="Guntur Madam Pickles offers authentic traditional pickles and karam podulu made in Guntur, Andhra Pradesh. 100% organic and homemade taste."
        keywords="andhra pickles online, buy pickles online, guntur pickles, homemade pickles, spice powders, organic pickles"
      />
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