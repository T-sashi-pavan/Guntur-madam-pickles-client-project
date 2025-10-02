import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { PRODUCTS } from '../data/products';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getText, currentLanguage } = useLanguage();
  const { addToCart, getItemQuantity } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Find product by ID
  useEffect(() => {
    const foundProduct = PRODUCTS.find(p => p.id === parseInt(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Set default size to first available size
      if (foundProduct.prices && Object.keys(foundProduct.prices).length > 0) {
        setSelectedSize(Object.keys(foundProduct.prices)[0]);
      }
    }
  }, [id]);

  // Redirect if product not found after reasonable time
  useEffect(() => {
    const timer = setTimeout(() => {
      if (id && !product && PRODUCTS.length > 0) {
        console.warn('Product not found, redirecting to home');
        navigate('/');
      }
    }, 1000); // Give 1 second for loading

    return () => clearTimeout(timer);
  }, [id, product, navigate]);

  if (!product) {
    return (
      <div className="product-details-loading">
        <div className="loading-spinner"></div>
        <p className={currentLanguage === 'te' ? 'font-telugu' : ''}>
          {getText('Loading product details...', 'ఉత్పత్తి వివరాలు లోడ్ అవుతున్నాయి...')}
        </p>
      </div>
    );
  }

  const currentPrice = selectedSize && product.prices ? product.prices[selectedSize] : 0;
  const totalPrice = currentPrice * quantity;
  const cartQuantity = getItemQuantity(product.id, selectedSize);
  
  const productName = currentLanguage === 'te' ? product.name_te : product.name_en;
  const productDescription = currentLanguage === 'te' ? product.description_te : product.description_en;

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setQuantity(1); // Reset quantity when size changes
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert(getText('Please select a size', 'దయచేసి పరిమాణం ఎంచుకోండి'));
      return;
    }
    addToCart(product, selectedSize, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: productName,
        text: productDescription,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert(getText('Product link copied to clipboard!', 'ఉత్పత్తి లింక్ క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది!'));
    }
  };

  const handleWhatsAppOrder = () => {
    const message = getText(
      `Hi! I would like to order ${productName} (${selectedSize}) - Quantity: ${quantity}. Price: ₹${totalPrice}`,
      `నమస్కారం! నేను ${productName} (${selectedSize}) ఆర్డర్ చేయాలనుకుంటున్నాను - పరిమాణం: ${quantity}. ధర: ₹${totalPrice}`
    );
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="product-details-page">
      {/* Header */}
      <div className="product-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label={getText('Go back', 'వెనుకకు వెళ్ళు')}
        >
          <AiOutlineArrowLeft />
        </button>
        
        <h1 className={`page-title ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
          {getText('Product Details', 'ఉత్పత్తి వివరాలు')}
        </h1>

        <div className="header-actions">
          <button 
            className="action-button"
            onClick={handleShare}
            aria-label={getText('Share product', 'ఉత్పత్తిని పంచుకోండి')}
          >
            <AiOutlineShareAlt />
          </button>
          <button 
            className="action-button"
            aria-label={getText('Add to favorites', 'ఇష్టాంశాలకు జోడించు')}
          >
            <AiOutlineHeart />
          </button>
        </div>
      </div>

      <div className="product-details-container">
        {/* Product Images */}
        <div className="product-images-section">
          <div className="main-image-container">
            <img
              src={product.image}
              alt={productName}
              className={`main-product-image ${isImageLoaded ? 'loaded' : ''}`}
              onLoad={() => setIsImageLoaded(true)}
            />
            <div className="category-badge" style={{
              backgroundColor: getCategoryColor(product.category)
            }}>
              {product.category}
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="product-info-section">
          <div className="product-title-section">
            <h1 className={`product-title ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {productName}
            </h1>
            
            {productDescription && (
              <p className={`product-description ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
                {productDescription}
              </p>
            )}
          </div>

          {/* Price Section */}
          <div className="price-section">
            <div className="current-price">
              <span className="currency">₹</span>
              <span className="amount">{currentPrice}</span>
              {selectedSize && <span className="size-label">/ {selectedSize}</span>}
            </div>
            
            {quantity > 1 && (
              <div className="total-price">
                <span className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                  {getText('Total:', 'మొత్తం:')} ₹{totalPrice}
                </span>
              </div>
            )}
          </div>

          {/* Size Selection */}
          {product.prices && Object.keys(product.prices).length > 0 && (
            <div className="size-selection-section">
              <label className={`section-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
                {getText('Select Size:', 'పరిమాణం ఎంచుకోండి:')}
              </label>
              <div className="size-options">
                {Object.entries(product.prices).map(([size, price]) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => handleSizeChange(size)}
                  >
                    <span className="size-text">{size}</span>
                    <span className="size-price">₹{price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="quantity-section">
            <label className={`section-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText('Quantity:', 'పరిమాణం:')}
            </label>
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                aria-label={getText('Decrease quantity', 'పరిమాణం తగ్గించు')}
              >
                −
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
                aria-label={getText('Increase quantity', 'పరిమాణం పెంచు')}
              >
                +
              </button>
            </div>
            
            {cartQuantity > 0 && (
              <div className="cart-status">
                <span className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                  {getText(`${cartQuantity} items already in cart`, `${cartQuantity} వస్తువులు ఇప్పటికే కార్ట్‌లో ఉన్నాయి`)}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className={`add-to-cart-btn primary-btn ${currentLanguage === 'te' ? 'font-telugu' : ''}`}
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              <span>🛒</span>
              <span>{getText('Add to Cart', 'కార్ట్‌కు జోడించు')}</span>
            </button>
          </div>

          {/* WhatsApp Order */}
          <div className="whatsapp-order">
            <button
              className={`whatsapp-order-btn ${currentLanguage === 'te' ? 'font-telugu' : ''}`}
              onClick={handleWhatsAppOrder}
              disabled={!selectedSize}
            >
              <FaWhatsapp />
              <span>{getText('Order via WhatsApp', 'వాట్సాప్ ద్వారా ఆర్డర్ చేయండి')}</span>
            </button>
          </div>

          {/* Product Features */}
          <div className="product-features">
            <h3 className={`features-title ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText('Product Features', 'ఉత్పత్తి లక్షణాలు')}
            </h3>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">🌿</span>
                <span className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                  {getText('100% Organic', '100% సేంద్రియ')}
                </span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">👩‍🍳</span>
                <span className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                  {getText('Traditional Recipe', 'సాంప్రదాయ వంటకం')}
                </span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚚</span>
                <span className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                  {getText('Free Home Delivery', 'ఉచిత ఇంటికి డెలివరీ')}
                </span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⭐</span>
                <span className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                  {getText('Premium Quality', 'ప్రీమియం నాణ్యత')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get category colors
const getCategoryColor = (category) => {
  const colors = {
    'Veg Pickles': '#22c55e',
    'Non-Veg Pickles': '#ef4444',
    'Karam Podulu': '#f59e0b',
    'Our Specials': '#8b5cf6',
    'Sweets': '#ec4899',
    'Andhra Special': '#f97316',
    'HOT': '#dc2626'
  };
  return colors[category] || '#6b7280';
};

export default ProductDetailsPage;