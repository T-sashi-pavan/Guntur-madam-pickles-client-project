import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { getProductPrice } from '../data/products';
import './ProductModal.css';

const ProductModal = ({ product, isOpen, onClose }) => {
  const { getText, currentLanguage } = useLanguage();
  const { addToCart, getItemQuantity } = useCart();
  const [selectedSize, setSelectedSize] = useState('500g');
  const [quantity, setQuantity] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [viewMode, setViewMode] = useState('image');

  // Reset modal state when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize('500g');
      setQuantity(1);
      setIsImageLoaded(false);
    }
  }, [product]);

  // Close modal on escape key
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

  if (!isOpen || !product) return null;

  const currentPrice = getProductPrice(product.id, selectedSize);
  const cartQuantity = getItemQuantity(product.id, selectedSize);
  const totalPrice = currentPrice * quantity;
  const language = currentLanguage;
  const prices = product.prices;
  
  const productName = language === 'en' ? product.name_en : product.name_te;
  const productDescription = language === 'en' ? product.description_en : product.description_te;

  // Helper function to get translation
  const t = (key) => {
    const translations = {
      en: {
        close: 'Close',
        image: 'Image',
        select_size: 'Select Size',
        quantity: 'Quantity',
        total: 'Total',
        add_to_cart: 'Add to Cart',
        buy_now: 'Buy Now',
        authentic_recipe: 'Authentic Recipe',
        fresh_ingredients: 'Fresh Ingredients',
        long_shelf_life: 'Long Shelf Life',
        ingredients: 'Ingredients',
        storage: 'Storage Instructions',
        shelf_life: 'Shelf Life',
        nutritional_info: 'Nutritional Information',
        allergen_info: 'Allergen Information',
        product_details: 'Product Details',
        category: 'Category',
        spice_level: 'Spice Level',
        traditional_method: 'Made using traditional methods',
        no_preservatives: 'No artificial preservatives',
        handmade: 'Handmade with care'
      },
      te: {
        close: 'మూసివేయి',
        image: 'చిత్రం',
        select_size: 'పరిమాణం ఎంచుకోండి',
        quantity: 'పరిమాణం',
        total: 'మొత్తం',
        add_to_cart: 'కార్ట్‌కు జోడించు',
        buy_now: 'ఇప్పుడు కొనుగోలు చేయండి',
        authentic_recipe: 'నిజమైన వంటకం',
        fresh_ingredients: 'తాజా పదార్థాలు',
        long_shelf_life: 'దీర్ఘ కాలం నిల్వ',
        ingredients: 'పదార్థాలు',
        storage: 'నిల్వ సూచనలు',
        shelf_life: 'నిల్వ కాలం',
        nutritional_info: 'పోషక విలువలు',
        allergen_info: 'అలర్జీ సమాచారం',
        product_details: 'ఉత్పత్తి వివరాలు',
        category: 'వర్గం',
        spice_level: 'కారం స్థాయి',
        traditional_method: 'సాంప్రదాయ పద్ధతిలో తయారు చేసిన',
        no_preservatives: 'కృత్రిమ సంరక్షకాలు లేవు',
        handmade: 'జాగ్రత్తగా చేతితో తయారు చేసిన'
      }
    };
    return translations[language]?.[key] || key;
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className="product-modal">
        <button 
          className="modal-close-btn" 
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

        <div className="modal-content">
          {/* Left side - Product Image */}
          <div className="modal-visual">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={productName}
                className={`product-image ${isImageLoaded ? 'loaded' : ''}`}
                onLoad={() => setIsImageLoaded(true)}
              />
              {!isImageLoaded && (
                <div className="image-placeholder">
                  <div className="loading-spinner"></div>
                </div>
              )}
            </div>
            
            {/* Product Badge */}
            <div className="product-badges">
              <span className="badge authentic">{t('authentic_recipe')}</span>
              <span className="badge handmade">{t('handmade')}</span>
            </div>
          </div>

          {/* Right side - Product details */}
          <div className="modal-details">
            <div className="product-header">
              <h2 className="product-title">
                {productName}
              </h2>
              <span className="product-category">{product.category}</span>
            </div>

            <div className="product-description">
              <p>{productDescription}</p>
            </div>

            {/* Product Details Section */}
            <div className="product-info-section">
              <h3>{t('product_details')}</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">{t('category')}:</span>
                  <span className="info-value">{product.category}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('shelf_life')}:</span>
                  <span className="info-value">12-18 months</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('spice_level')}:</span>
                  <span className="info-value">🌶️🌶️🌶️</span>
                </div>
              </div>
            </div>

            <div className="price-section">
              <div className="current-price">
                <span className="currency">₹</span>
                <span className="amount">{currentPrice}</span>
                <span className="size-label">/{selectedSize}</span>
              </div>
              {totalPrice !== currentPrice && (
                <div className="total-price">
                  <span className="total-label">{t('total')}: </span>
                  <span className="total-amount">₹{totalPrice}</span>
                </div>
              )}
            </div>

            <div className="size-selection">
              <label className="selection-label">{t('select_size')}:</label>
              <div className="size-options">
                {Object.entries(prices).map(([size, price]) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    <span className="size-text">{size}</span>
                    <span className="size-price">₹{price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-section">
              <label className="selection-label">{t('quantity')}:</label>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <button 
                className="add-to-cart-btn primary-btn"
                onClick={handleAddToCart}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t('add_to_cart')}
                {cartQuantity > 0 && <span className="cart-count">({cartQuantity})</span>}
              </button>
              
              <button 
                className="buy-now-btn secondary-btn"
                onClick={() => {
                  handleAddToCart();
                  // Trigger WhatsApp checkout
                  window.open(`https://wa.me/917330775225?text=${encodeURIComponent(
                    `Hi! I want to order ${quantity} ${selectedSize} ${productName} for ₹${(currentPrice * quantity).toLocaleString()}`
                  )}`, '_blank');
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.479 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" fill="currentColor"/>
                </svg>
                {t('buy_now')}
              </button>
            </div>

            {/* Additional Product Information */}
            <div className="product-features">
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                </svg>
                <span>{t('traditional_method')}</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L3.09 8.26L4 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                </svg>
                <span>{t('fresh_ingredients')}</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 8V7A3 3 0 0018 4H6A3 3 0 003 7V8M3 12A9 9 0 0021 12"/>
                </svg>
                <span>{t('no_preservatives')}</span>
              </div>
            </div>

            {/* Storage Instructions */}
            <div className="storage-section">
              <h4>{t('storage')}:</h4>
              <p>Store in a cool, dry place. Refrigerate after opening. Use clean, dry spoon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;