import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/LanguageContext";
import ProductModal from "./ProductModal";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { addToCart, isInCart } = useCart();
  const { currentLanguage } = useLanguage();

  // Get product name based on current language
  const getProductName = () => {
    return currentLanguage === 'te' ? product.name_te : product.name_en;
  };

  // Get product description based on current language
  const getProductDescription = () => {
    return currentLanguage === 'te' ? product.description_te : product.description_en;
  };

  useEffect(() => {
    if (product?.prices && Object.keys(product.prices).length > 0 && !selectedSize) {
      const availableSizes = Object.keys(product.prices);
      setSelectedSize(availableSizes[0]); // Auto-select the first size
    }
  }, [product, selectedSize]);

  const getCurrentPrice = () => {
    if (!selectedSize || !product.prices) return product.price || 0;
    return product.prices[selectedSize] || product.price || 0;
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size"); // User should select a size first
      return;
    }
    
    // Check if item is already in cart
    if (isInCart(product.id, selectedSize)) {
      return; // Don't add if already in cart
    }
    
    // Add 1 quantity to cart, as quantity controls are hidden
    addToCart(product, selectedSize, 1); 
  };

  // Check if current product with selected size is in cart
  const isProductInCart = () => {
    if (!selectedSize) return false;
    return isInCart(product.id, selectedSize);
  };

  const handleCardClick = (e) => {
    // Prevent modal opening when clicking on interactive elements
    if (e.target.closest('.size-option') || 
        e.target.closest('.add-to-cart-btn') ||
        e.target.closest('.wishlist-button')) {
      return;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!product) return null;

  return (
    <>
      <div className="product-card" data-product-id={product.id} onClick={handleCardClick}>
        <div className="card-glow"></div>
        
        <div className="product-image-container">
          {/* Wishlist button in top-right of image */}
          <button 
            className="wishlist-button"
            onClick={(e) => e.stopPropagation()}
            aria-label="Add to wishlist"
          >
            ♡
          </button>
          
          {product.image ? (
            <img
              src={product.image}
              alt={getProductName()}
              className={`product-image ${imageLoaded ? "loaded" : ""}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => { e.target.onerror = null; e.target.src = '/path/to/placeholder.jpg'; }} // Fallback for broken images
            />
          ) : (
            <div className="no-image-placeholder">No Image</div>
          )}
          {!imageLoaded && <div className="image-skeleton"></div>} {/* Show skeleton until image loads */}
        </div>

        <div className="product-content">
          {/* Product Name - Centered */}
          <div className="product-name-display">
            <h4 className="product-title">{getProductName()}</h4>
          </div>

          <div className="product-info">        
            {getProductDescription() && (
              <p className="product-description">{getProductDescription()}</p>
            )}

            {product.prices && Object.keys(product.prices).length > 0 && (
              <div className="size-selection">
                <label className="size-label">Size:</label>
                <div className="size-options">
                  {Object.keys(product.prices).map((size) => (
                      <button
                        key={size}
                        className={`size-option ${selectedSize === size ? "active" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSizeSelect(size);
                        }}
                        aria-pressed={selectedSize === size}
                      >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="price-section">
              <div className="price-display">
                <span className="current-price">₹{getCurrentPrice()}</span>
              </div>
            </div>

            <div className="cart-section">
              {/* Quantity controls are hidden as per request */}
              <div className="quantity-controls" style={{display: 'none'}}>
                {/* ... (existing quantity control JSX, but it won't be visible) */}
              </div>

              <div className="add-to-cart-section">
                <button
                  className={`add-to-cart-btn ${isProductInCart() ? 'in-cart' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  disabled={!selectedSize || isProductInCart()}
                  aria-label={
                    isProductInCart() 
                      ? `${getProductName()} (${selectedSize}) is already in cart`
                      : `Add ${getProductName()} (${selectedSize}) to cart`
                  }
                >
                  {isProductInCart() ? (
                    <>
                      <span>✓</span>
                      <span>Already in Cart</span>
                    </>
                  ) : (
                    <>
                      <span>🛒</span>
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={product}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProductCard;