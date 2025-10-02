import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { FaFire, FaLeaf, FaClock } from 'react-icons/fa';
import './ProductModal.css';

const ProductModal = ({ product, isOpen, onClose }) => {
  const { currentLanguage } = useLanguage();
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Reset modal state when product changes or modal opens
  useEffect(() => {
    if (product && isOpen) {
      // Set default size if product has prices
      if (product.prices && Object.keys(product.prices).length > 0) {
        const availableSizes = Object.keys(product.prices);
        setSelectedSize(availableSizes[0]);
      } else {
        setSelectedSize('250g'); // Default fallback
      }
      setQuantity(1);
      setIsImageLoaded(false);
      
      // Add slight delay for smooth animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [product, isOpen]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const getCurrentPrice = () => {
    if (product?.prices && product.prices[selectedSize]) {
      return product.prices[selectedSize];
    }
    return product?.price || 0;
  };

  const getSpiceLevel = () => {
    // Default spice levels based on product category or name
    const spicyKeywords = ['gongura', 'pandumirchi', 'chilli', 'hot', 'karam'];
    const productName = (product?.name_en || '').toLowerCase();
    
    if (spicyKeywords.some(keyword => productName.includes(keyword))) {
      return 3; // Hot
    } else if (productName.includes('sweet')) {
      return 0; // No spice
    }
    return 2; // Medium (default)
  };

  const renderSpiceLevel = () => {
    const level = getSpiceLevel();
    const icons = [];
    
    for (let i = 0; i < 3; i++) {
      icons.push(
        <FaFire 
          key={i} 
          className={`spice-icon ${i < level ? 'active' : ''}`}
        />
      );
    }
    return icons;
  };

  const getShelfLife = () => {
    // Default shelf life based on product type
    if (product?.category === 'sweets') return '15 days';
    if (product?.type === 'non-veg') return '6 months';
    return '12 months';
  };

  const getCategoryDisplay = () => {
    const categoryMap = {
      'veg': 'Vegetarian Pickles',
      'non-veg': 'Non-Vegetarian Pickles',
      'karam_podulu': 'Spice Powders',
      'specials': 'Special Pickles',
      'sweets': 'Traditional Sweets',
      'andhra_special': 'Andhra Special',
      'hot': 'Hot & Spicy'
    };
    return categoryMap[product?.category] || 'Pickles';
  };

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;

    const cartItem = {
      ...product,
      selectedSize,
      price: getCurrentPrice()
    };

    addToCart(cartItem, selectedSize, quantity);
    
    // Show success feedback (you can customize this)
    alert(`Added ${quantity} x ${product.name_en} (${selectedSize}) to cart!`);
  };

  if (!isOpen || !product) return null;

  return (
    <div className={`product-modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
      <div 
        className={`product-modal-container ${isVisible ? 'visible' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={handleClose}>
          <AiOutlineClose />
        </button>

        {/* Modal Content */}
        <div className="modal-content">
          {/* Product Image Section */}
          <div className="product-image-section">
            <div className="image-container">
              <img 
                src={product.image} 
                alt={currentLanguage === 'te' ? product.name_te : product.name_en}
                className={`product-image ${isImageLoaded ? 'loaded' : ''}`}
                onLoad={() => setIsImageLoaded(true)}
                onError={(e) => {
                  e.target.src = '/placeholder-image.png'; // Fallback image
                }}
              />
              {!isImageLoaded && (
                <div className="image-placeholder">
                  <div className="loading-spinner"></div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="product-details-section">
            {/* Product Header */}
            <div className="product-header">
              <h5 className="product-title">
                {currentLanguage === 'te' ? product.name_te : product.name_en}
              </h5>
              <div className="product-category">
                <FaLeaf className="category-icon" />
                <span>{getCategoryDisplay()}</span>
              </div>
            </div>

            {/* Product Info Grid */}
            <div className="product-info-grid">
              <div className="info-item">
                <FaClock className="info-icon" />
                <div>
                  <span className="info-label">Shelf Life</span>
                  <span className="info-value">{getShelfLife()}</span>
                </div>
              </div>
              
              <div className="info-item">
                <FaFire className="info-icon" />
                <div>
                  <span className="info-label">Spice Level</span>
                  <div className="spice-level">
                    {renderSpiceLevel()}
                  </div>
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="price-section">
              <div className="price-display">
                <span className="currency">₹</span>
                <span className="price">{getCurrentPrice()}</span>
                <span className="weight">/ {selectedSize}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="size-selector-section">
              <label className="section-label">Select Size</label>
              <div className="size-options">
                {product.prices ? (
                  Object.keys(product.prices).map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => handleSizeChange(size)}
                    >
                      <span className="size-text">{size}</span>
                      <span className="size-price">₹{product.prices[size]}</span>
                    </button>
                  ))
                ) : (
                  ['250g', '500g', '1kg'].map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => handleSizeChange(size)}
                    >
                      <span className="size-text">{size}</span>
                      <span className="size-price">₹{getCurrentPrice()}</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="quantity-selector-section">
              <label className="section-label">Quantity</label>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn minus"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <AiOutlineMinus />
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn plus"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>

            {/* Product Description */}
            {(product.description_en || product.description_te) && (
              <div className="product-description">
                <p>
                  {currentLanguage === 'te' ? product.description_te : product.description_en}
                </p>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="modal-actions">
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                <span>Add to Cart</span>
                <span className="btn-price">₹{(getCurrentPrice() * quantity).toFixed(0)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
