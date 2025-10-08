import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './About.css';

const About = () => {
  const { getText, currentLanguage } = useLanguage();

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Section Header */}
        <div className="about-header">
          <h2 className={`section-title ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            {getText('About Guntur Madam Pickles', 'గుంటూర్ మేడమ్ పికిల్స్ గురించి')}
          </h2>
          <p className={`section-subtitle ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            {getText('Authentic Andhra Flavors Since Generations', 'తరతరాలుగా ఆంధ్ర వైశిష్టమైన రుచులు')}
          </p>
        </div>

        {/* Content Grid */}
        <div className="about-content-grid">
          {/* Customize Your Combo */}
          <div className="about-card">
            <div className="card-icon">✨</div>
            <h3 className={`card-title ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText('Customize Your Combo', 'మీ కాంబో అనుకూలీకరించండి')}
            </h3>
            <p className={`card-description ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText(
                'Create your perfect pickle combo! Mix and match your favorite varieties with our combo packs. Choose from Veg-only or Mixed combos with amazing discounts up to 30% off. Small (4 pickles), Medium (8 pickles), or Large (12 pickles) - you decide!',
                'మీ ఖచ్చితమైన ఊరగాయ కాంబోను సృష్టించండి! మా కాంబో ప్యాక్‌లతో మీ ఇష్టమైన రకాలను మిక్స్ చేయండి మరియు మ్యాచ్ చేయండి. 30% వరకు అద్భుతమైన డిస్కౌంట్‌లతో వెజ్-మాత్రమే లేదా మిక్స్డ్ కాంబోలను ఎంచుకోండి. చిన్న (4 ఊరగాయలు), మధ్యమ (8 ఊరగాయలు), లేదా పెద్ద (12 ఊరగాయలు) - మీరు నిర్ణయించండి!'
              )}
            </p>
          </div>

          {/* Quality Promise */}
          <div className="about-card">
            <div className="card-icon">🌿</div>
            <h3 className={`card-title ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText('100% Organic', '100% సేంద్రియ')}
            </h3>
            <p className={`card-description ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText(
                'We use only the finest organic spices and ingredients sourced directly from local farmers. No artificial preservatives, colors, or flavors - just pure, natural goodness.',
                'మేము స్థానిక రైతుల నుండి నేరుగా సేకరించిన అత్యుత్తమ సేంద్రియ మసాలా దినుసులు మాత్రమే ఉపయోగిస్తాము. కృత్రిమ సంరక్షకాలు, రంగులు లేదా రుచులు లేవు - కేవలం స్వచ్ఛమైన, సహజమైన మంచితనం.'
              )}
            </p>
          </div>

          {/* Traditional Methods */}
          <div className="about-card">
            <div className="card-icon">👩‍🍳</div>
            <h3 className={`card-title ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText('Traditional Methods', 'సంప్రదాయ పద్ధతులు')}
            </h3>
            <p className={`card-description ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText(
                'Every pickle is handcrafted using time-honored techniques. We follow the same methods our grandmothers used, ensuring each jar contains the authentic taste of Andhra cuisine.',
                'ప్రతి ఊరగాయ సమయానుకూల పద్ధతులను ఉపయోగించి చేతితో తయారు చేయబడుతుంది. మా అమ్మమ్మలు ఉపయోగించిన అదే పద్ధతులను మేము అనుసరిస్తాము, ప్రతి కూజాలో ఆంధ్ర వంటకాల సంప్రదాయ రుచి ఉండేలా చూస్తాము.'
              )}
            </p>
          </div>

          {/* Family Business
          <div className="about-card">
            <div className="card-icon">❤️</div>
            <h3 className={`card-title ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText('Made with Love', 'ప్రేమతో తయారు')}
            </h3>
            <p className={`card-description ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText(
                'This is more than a business - it\'s a family dream. Started by a passionate mother entrepreneur who wanted to share the authentic flavors of her homeland with the world.',
                'ఇది వ్యాపారం కంటే ఎక్కువ - ఇది కుటుంబ కల. తన మాతృభూమి యొక్క సంప్రదాయ రుచులను ప్రపంచంతో పంచుకోవాలని అనుకున్న ఉత్సాహభరితమైన తల్లి వ్యవసాయిచే ప్రారంభించబడింది.'
              )}
            </p>
          </div> */}
        </div>

        {/* Statistics Row */}
        {/* <div className="about-stats">
                    <div className="stat-item">
                    <span className="stat-number">100%</span>
          <span className={`stat-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            {getText('Homemade Taste', 'ఇంటివంటి రుచి')}
          </span>
                    </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className={`stat-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText('Unique Varieties', 'ప్రత్యేక రకాలు')}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className={`stat-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText('Organic & Natural', 'సేంద్రియ & సహజమైన')}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className={`stat-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText('Customer Support', 'కస్టమర్ మద్దతు')}
            </span>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default About;
