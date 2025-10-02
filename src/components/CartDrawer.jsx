import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalItems, 
    getTotalPrice,
    getFormattedWhatsAppMessage 
  } = useCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleQuantityChange = (cartItemId, newQuantity) => {
    updateQuantity(cartItemId, newQuantity);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Generate WhatsApp message
    const message = getFormattedWhatsAppMessage();
    const whatsappUrl = `https://wa.me/917330775225?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset checkout state after a delay
    setTimeout(() => {
      setIsCheckingOut(false);
    }, 2000);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const safeCart = cart || []; // Safety check for undefined cart

  return (
    <div 
      className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="cart-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17A2 2 0 0119 19A2 2 0 0117 21A2 2 0 0115 19A2 2 0 0117 17H9M9 19A2 2 0 007 21A2 2 0 005 19A2 2 0 007 17A2 2 0 009 19Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <h2>
              {t('your_cart')} ({totalItems} {t('items')})
            </h2>
          </div>
          <button 
            className="cart-close-btn" 
            onClick={onClose}
            aria-label={t('close')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="cart-content">
          {safeCart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17A2 2 0 0119 19A2 2 0 0117 21A2 2 0 0115 19A2 2 0 0117 17H9M9 19A2 2 0 007 21A2 2 0 005 19A2 2 0 007 17A2 2 0 009 19Z" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>{t('cart_empty')}</h3>
              <p>{t('cart_empty_message')}</p>
              <button 
                className="continue-shopping-btn"
                onClick={onClose}
              >
                {t('continue_shopping')}
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {/* Separate regular items and combo items */}
                {(() => {
                  const regularItems = safeCart.filter(item => item.type !== 'combo');
                  const comboItems = safeCart.filter(item => item.type === 'combo');
                  
                  return (
                    <>
                      {/* Regular Items Section */}
                      {regularItems.length > 0 && (
                        <div className="regular-items-section">
                          <h3 className="cart-section-title">🥒 Individual Items</h3>
                          {regularItems.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="cart-item">
                              <div className="item-image">
                                <img 
                                  src={item.image} 
                                  alt={language === 'en' ? item.name_en : item.name_te}
                                />
                              </div>
                              
                              <div className="item-details">
                                <h4 className="item-name">
                                  {language === 'en' ? item.name_en : item.name_te}
                                </h4>
                                <div className="item-meta">
                                  <span className="item-size">{item.size}</span>
                                  <span className="item-category">{item.category}</span>
                                </div>
                                <div className="item-price">
                                  ₹{item.price.toLocaleString()}
                                </div>
                              </div>
                              
                              <div className="item-controls">
                                <div className="quantity-controls">
                                  <button 
                                    className="quantity-btn"
                                    onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                  </button>
                                  <span className="quantity">{item.quantity}</span>
                                  <button 
                                    className="quantity-btn"
                                    onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                  </button>
                                </div>
                                
                                <div className="item-total">
                                  ₹{(item.price * item.quantity).toLocaleString()}
                                </div>
                                
                                <button 
                                  className="remove-btn"
                                  onClick={() => removeFromCart(item.cartItemId)}
                                  aria-label={t('remove_item')}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path 
                                      d="M3 6H5H21M8 6V4A2 2 0 0110 2H14A2 2 0 0116 4V6M19 6V20A2 2 0 0117 22H7A2 2 0 015 20V6H19ZM10 11V17M14 11V17" 
                                      stroke="currentColor" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Combo Items Section */}
                      {comboItems.length > 0 && (
                        <div className="combo-items-section">
                          <h3 className="cart-section-title combo-title"> Combo Specials</h3>
                          {comboItems.map((combo) => (
                            <div key={combo.cartItemId} className="combo-item">
                              <div className="combo-header">
                                <h4 className="combo-name">{combo.comboLabel}</h4>
                                <div className="combo-savings">
                                  <span className="discount-badge">
                                    {combo.discountPercentage}% OFF
                                  </span>
                                </div>
                              </div>
                              
                              <div className="combo-details">
                                <div className="combo-items-grid">
                                  {combo.items.map((item, index) => (
                                    <div key={`${combo.cartItemId}-item-${index}`} className="combo-item-card">
                                      <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="combo-item-image"
                                      />
                                      <div className="combo-item-info">
                                        <span className="combo-item-name">{item.name}</span>
                                        <span className="combo-item-size">250g</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="combo-pricing">
                                  <div className="pricing-row">
                                    <span>Original Price:</span>
                                    <span className="original-price">₹{combo.originalPrice}</span>
                                  </div>
                                  <div className="pricing-row discount-row">
                                    <span>Discount ({combo.discountPercentage}%):</span>
                                    <span className="discount-amount">-₹{combo.discountAmount.toFixed(0)}</span>
                                  </div>
                                  <div className="pricing-row final-row">
                                    <span>Final Price:</span>
                                    <span className="final-price">₹{combo.finalPrice.toFixed(0)}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="combo-controls">
                                <button 
                                  className="remove-combo-btn"
                                  onClick={() => removeFromCart(combo.cartItemId)}
                                  aria-label="Remove combo"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path 
                                      d="M3 6H5H21M8 6V4A2 2 0 0110 2H14A2 2 0 0116 4V6M19 6V20A2 2 0 0117 22H7A2 2 0 015 20V6H19ZM10 11V17M14 11V17" 
                                      stroke="currentColor" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  Remove Combo
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>{t('subtotal')} ({totalItems} {t('items')})</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>{t('delivery')}</span>
                  <span className="free-delivery">{t('free')}</span>
                </div>
                <div className="summary-row total">
                  <span>{t('total')}</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button 
                  className="clear-cart-btn"
                  onClick={clearCart}
                  disabled={safeCart.length === 0}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M3 6H5H21M8 6V4A2 2 0 0110 2H14A2 2 0 0116 4V6M19 6V20A2 2 0 0117 22H7A2 2 0 015 20V6H19Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t('clear_cart')}
                </button>
                
                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                  disabled={safeCart.length === 0 || isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <div className="spinner"></div>
                      {t('processing')}...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M22 12A10 10 0 0012 2A10 10 0 002 12A10 10 0 0012 22C13.03 22 14.05 21.85 15 21.57L18.2 22C18.78 22.11 19.31 21.64 19.2 21.06L18.57 15C21.85 14.05 22 13.03 22 12Z" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                      {t('checkout_whatsapp')}
                    </>
                  )}
                </button>
              </div>

              <div className="cart-info">
                <div className="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  </svg>
                  <span>{t('authentic_homemade')}</span>
                </div>
                <div className="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9L12 2L21 9V20A2 2 0 0119 22H5A2 2 0 013 20V9Z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                  <span>{t('free_home_delivery')}</span>
                </div>
                <div className="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 8V7A3 3 0 0018 4H6A3 3 0 003 7V8M3 12A9 9 0 0021 12"/>
                  </svg>
                  <span>{t('fresh_daily')}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;