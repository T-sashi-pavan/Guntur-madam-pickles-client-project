import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const { language, t } = useLanguage();
  const { cart, getTotalItems, getFormattedWhatsAppMessage } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Safety check for undefined cart
  const safeCart = cart || [];
  const totalItems = getTotalItems();

  // Show button after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-expand when items are added to cart
  useEffect(() => {
    const safeCart = cart || [];
    if (safeCart.length > 0) {
      setIsExpanded(true);
      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [cart]);

  const handleWhatsAppClick = () => {
    const phoneNumber = '917702721323';
    let message;
    const safeCart = cart || [];

    if (safeCart.length > 0) {
      // If cart has items, send cart details
      message = getFormattedWhatsAppMessage();
    } else {
      // If cart is empty, send general inquiry
      message = language === 'en' 
        ? `Hi Guntur Madam Pickles! 🥒\n\nI'm interested in your authentic Andhra pickles. Could you please share your current menu and prices?\n\nThank you!`
        : `హాయ్ గుంటూరు మేడం పిక్కిల్స్! 🥒\n\nమీ ఆథెంటిక్ ఆంధ్రా పచ్చళ్లు గురించి తెలుసుకోవాలని అనిపిస్తుంది. దయచేసి మీ కరెంట్ మెనూ మరియు ధరలు షేర్ చేయగలరా?\n\nధన్యవాదాలు!`;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Add tracking analytics if needed
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: safeCart.length > 0 ? 'cart_checkout' : 'general_inquiry',
        value: safeCart.length
      });
    }
  };

  return (
    <div className={`whatsapp-button-container ${isVisible ? 'visible' : ''}`}>
      {/* Tooltip */}
      {showTooltip && (
        <div className="whatsapp-tooltip">
          <div className="tooltip-content">
            {safeCart.length > 0 
              ? t('checkout_via_whatsapp') 
              : t('chat_with_us')
            }
          </div>
          <div className="tooltip-arrow"></div>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <button
        className={`whatsapp-button ${isExpanded ? 'expanded' : ''}`}
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={safeCart.length > 0 ? t('checkout_via_whatsapp') : t('contact_whatsapp')}
      >
        {/* WhatsApp Icon */}
        <div className="whatsapp-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.488"/>
          </svg>
        </div>

        {/* Expanded Content */}
        <div className="whatsapp-content">
          {safeCart.length > 0 ? (
            <div className="cart-info">
              <span className="cart-count">{totalItems}</span>
              <span className="cart-text">{t('items_checkout')}</span>
            </div>
          ) : (
            <span className="chat-text">{t('chat_now')}</span>
          )}
        </div>

        {/* Cart Badge */}
        {safeCart.length > 0 && (
          <div className="cart-badge">
            <span>{totalItems}</span>
          </div>
        )}

        {/* Pulse Animation */}
        <div className="pulse-ring"></div>
      </button>

      {/* Quick Actions (when cart has items) */}
      {safeCart.length > 0 && isExpanded && (
        <div className="quick-actions">
          <button
            className="quick-action-btn view-cart"
            onClick={(e) => {
              e.stopPropagation();
              // Trigger cart drawer open - this would be handled by parent component
              document.dispatchEvent(new CustomEvent('openCart'));
            }}
            aria-label={t('view_cart')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path 
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17A2 2 0 0119 19A2 2 0 0117 21A2 2 0 0115 19A2 2 0 0117 17H9M9 19A2 2 0 007 21A2 2 0 005 19A2 2 0 007 17A2 2 0 009 19Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default WhatsAppButton;