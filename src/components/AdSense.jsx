import React, { useEffect } from 'react';
import './AdSense.css';

/**
 * Google AdSense Component
 * 
 * Usage Examples:
 * 
 * 1. Display Ad (Rectangle):
 *    <AdSense adSlot="YOUR_AD_SLOT_ID" adFormat="rectangle" />
 * 
 * 2. Horizontal Banner:
 *    <AdSense adSlot="YOUR_AD_SLOT_ID" adFormat="horizontal" />
 * 
 * 3. Auto-responsive Ad:
 *    <AdSense adSlot="YOUR_AD_SLOT_ID" adFormat="auto" />
 */

const AdSense = ({ 
  adSlot = '', 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = {}
}) => {
  useEffect(() => {
    try {
      // Push the ad to AdSense
      if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Don't show ads in development mode
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div style={{
        ...defaultStyles.adPlaceholder,
        ...style
      }}>
        <p style={defaultStyles.placeholderText}>
          📢 Ad Space ({adFormat})
        </p>
        <p style={defaultStyles.placeholderSubtext}>
          Ads will appear here in production
        </p>
      </div>
    );
  }

  return (
    <div style={{ ...defaultStyles.adContainer, ...style }}>
      <ins
        className="adsbygoogle"
        style={defaultStyles.adIns}
        data-ad-client="ca-pub-5617473918245706"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      ></ins>
    </div>
  );
};

// Default Styles
const defaultStyles = {
  adContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
    padding: '10px',
  },
  adIns: {
    display: 'block',
  },
  adPlaceholder: {
    width: '100%',
    minHeight: '250px',
    backgroundColor: '#f0f0f0',
    border: '2px dashed #ccc',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
    padding: '20px',
  },
  placeholderText: {
    fontSize: '1.2rem',
    color: '#666',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
  },
  placeholderSubtext: {
    fontSize: '0.9rem',
    color: '#999',
    margin: 0,
  }
};

export default AdSense;
