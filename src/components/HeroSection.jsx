import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './HeroSection.css';

const HomeHero = () => {
  const { getText, currentLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Trigger animation on component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div id="home" className={`hero-container ${isVisible ? 'visible' : ''}`}>
      {/* Left Side - Brand Promise */}
      <section className="hero-left">
        {!isMobile && (
          <div className="hero-stat">
            <span className="stat-number">100%</span>
            <span className={`stat-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText('Pure & Natural', 'స్వచ్ఛమైన మరియు సహజమైన')}
            </span>
          </div>
        )}
        <div className="hero-tagline">
          <span className={`tagline-text ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            {getText(
              'Traditional recipes passed down through generations',
              'తరతరాలుగా వచ్చిన సాంప్రదాయ వంటకాలు'
            )}
          </span>
        </div>
      </section>

      {/* Center - Orbital Animation */}
      <section className="hero-center">
        <div className="orbital-container">
          {/* Central Logo */}
          <div className="center-brand">
            <div className="brand-logo">
              <div className="logo-glow"></div>
            </div>
            <div className="brand-title">
              <h1 className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                {getText('Guntur Madam Pickles', 'గుంటూరు మేడం పిక్లెస్')}
              </h1>
              <p className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                {getText('Authentic Andhra Taste', 'నిజమైన ఆంధ్రా రుచి')}
              </p>
            </div>
          </div>

          {/* Orbital Rings */}
          <div className="orbit-ring orbit-ring-1">
            <div className="pickle-icon pickle-mango">
              <div className="icon-glow"></div>
            </div>
            <div className="pickle-icon pickle-lemon">
              <div className="icon-glow"></div>
            </div>
            <div className="pickle-icon pickle-chilli">
              <div className="icon-glow"></div>
            </div>
            <div className="pickle-icon pickle-amla">
              <div className="icon-glow"></div>
            </div>
            <div className="pickle-icon pickle-carrot">
              <div className="icon-glow"></div>
            </div>
            <div className="pickle-icon pickle-garlic">
              <div className="icon-glow"></div>
            </div>
            <div className="pickle-icon pickle-ginger">
              <div className="icon-glow"></div>
            </div>
            <div className="pickle-icon pickle-tomato">
              <div className="icon-glow"></div>
            </div>
          </div>

          {/* Floating Particles */}
          <div className="floating-particles">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`particle particle-${i + 1}`}></div>
            ))}
          </div>

          {/* Gradient Overlay */}
          <div className="orbital-overlay"></div>
        </div>
      </section>

      {/* Right Side - Statistics */}
      <section className="hero-right">
        <div className="hero-stat">
          <span className="stat-number">5000+</span>
          <span className={`stat-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            {getText('Happy Customers', 'సంతోషకరమైన కస్టమర్లు')}
          </span>
        </div>
        <div className="hero-stat">
          <span className="stat-number">50+</span>
          <span className={`stat-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            {getText('Varieties Available', 'రకాలు అందుబాటులో')}
          </span>
        </div>
        <div className="hero-tagline">
          <span className={`tagline-text ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            {getText(
              'Made with love in the heart of Guntur',
              'గుంటూరు గుండెలో ప్రేమతో తయారు చేయబడినది'
            )}
          </span>
        </div>
      </section>

      {/* Background Elements */}
      <div className="hero-background">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
    </div>
  );
};

export default HomeHero;
