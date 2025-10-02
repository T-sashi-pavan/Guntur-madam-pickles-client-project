import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

// Add toast animation styles to the document head
if (typeof document !== 'undefined' && !document.getElementById('toast-animations')) {
  const style = document.createElement('style');
  style.id = 'toast-animations';
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    @keyframes shimmer {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }
    
    @media (max-width: 480px) {
      .toast-notification {
        bottom: 20px !important;
        right: 20px !important;
        left: 20px !important;
      }
      .toast-content {
        min-width: auto !important;
        max-width: none !important;
      }
    }
    
    @media (max-width: 430px) {
      .combo-product-card {
        height: 100% !important;
        width: 100% !important;
        padding: 10px !important;
        margin: 1% !important;
      }
      .combo-grid {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 10px !important;
      }
      .combo-product-image {
        width: 70px !important;
        height: 70px !important;
      }
      .combo-product-name {
        font-size: 0.9em !important;
      }
      .combo-product-price {
        font-size: 1em !important;
      }
      .combo-option-card {
        height: 100% !important;
        width: 100% !important;
        padding: 15px 15px !important;
      }
      .combo-options-grid {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 10px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// --- Product Data with 21 Veg Pickles and 10 Non-Veg Pickles ---
const vegPickles = [
  { id: 'vp1', name: 'Andhra Avakaya Pickle', price: 600, type: 'veg', image: require('../assets/veg_pickles/Andhra Avakaya Pickle.png') },
  { id: 'vp2', name: 'Allam Pickle', price: 400, type: 'veg', image: require('../assets/veg_pickles/Allam Pickle.png') },
  { id: 'vp3', name: 'Cashew Pickle', price: 800, type: 'veg', image: require('../assets/veg_pickles/Cashew Pickle.png') },
  { id: 'vp4', name: 'Cauliflower Avakaya', price: 500, type: 'veg', image: require('../assets/veg_pickles/Cauliflower Avakaya.png') },
  { id: 'vp5', name: 'Chinthakaya Pachadi (Raw)', price: 450, type: 'veg', image: require('../assets/veg_pickles/Chinthakaya Pachadi (Raw).png') },
  { id: 'vp6', name: 'Garlic Pickle', price: 550, type: 'veg', image: require('../assets/veg_pickles/Garlic Pickle.png') },
  { id: 'vp7', name: 'Gongura Pandumirchi Pickle', price: 600, type: 'veg', image: require('../assets/veg_pickles/Gongura Pandumirchi Pickle.png') },
  { id: 'vp8', name: 'Gongura Pickle with Karam', price: 650, type: 'veg', image: require('../assets/veg_pickles/Gongura pickle with karam.png') },
  { id: 'vp9', name: 'Gongura Pickle', price: 600, type: 'veg', image: require('../assets/veg_pickles/Gongura Pickle.png') },
  { id: 'vp10', name: 'Kakarakai Pachadi', price: 400, type: 'veg', image: require('../assets/veg_pickles/Kakarakai Pachadi.png') },
  { id: 'vp11', name: 'Kottimeera Pachadi', price: 350, type: 'veg', image: require('../assets/veg_pickles/Kottimeera Pachadi.png') },
  { id: 'vp12', name: 'Lemon Pickle', price: 400, type: 'veg', image: require('../assets/veg_pickles/Lemon Pickle.png') },
  { id: 'vp13', name: 'Maagaya Pickle', price: 600, type: 'veg', image: require('../assets/veg_pickles/Maagaya Pickle.png') },
  { id: 'vp14', name: 'Mango Thurumu Pickle', price: 550, type: 'veg', image: require('../assets/veg_pickles/Mango Thurumu pickle.png') },
  { id: 'vp15', name: 'Pandumirchi Pickle', price: 450, type: 'veg', image: require('../assets/veg_pickles/Pandumirchi Pickle.png') },
  { id: 'vp16', name: 'Pudhina Pachadi', price: 350, type: 'veg', image: require('../assets/veg_pickles/Pudhina Pachadi.png') },
  { id: 'vp17', name: 'Sweet Mango Pickle', price: 500, type: 'veg', image: require('../assets/veg_pickles/Sweet Mango Pickle.png') },
  { id: 'vp18', name: 'Tamota Pandumirchi Pickle', price: 450, type: 'veg', image: require('../assets/veg_pickles/Tamota Pandumirchi pickle.png') },
  { id: 'vp19', name: 'Tamota Pickle', price: 400, type: 'veg', image: require('../assets/veg_pickles/Tamota Pickle.png') },
  { id: 'vp20', name: 'Usirikaya Pachadi', price: 350, type: 'veg', image: require('../assets/veg_pickles/Usirikaya Pachadi.png') },
  { id: 'vp21', name: 'Usirikaya Thokudu Pachadi', price: 400, type: 'veg', image: require('../assets/veg_pickles/Usirikaya Thokudu Pachadi.png') },
];

const nonVegPickles = [
  { id: 'nvp1', name: 'Chicken Boneless Pickle', price: 1200, type: 'non-veg', image: require('../assets/Non_veg_pickles/Chicken Boneless Pickle.png') },
  { id: 'nvp2', name: 'Chicken Bones Pickle', price: 1000, type: 'non-veg', image: require('../assets/Non_veg_pickles/Chicken Bones Pickle.png') },
  { id: 'nvp3', name: 'Gongura Chicken Boneless Pickle', price: 1300, type: 'non-veg', image: require('../assets/Non_veg_pickles/Gongura Chicken Boneless Pickle.png') },
  { id: 'nvp4', name: 'Gongura Chicken Bones Pickle', price: 1100, type: 'non-veg', image: require('../assets/Non_veg_pickles/Gongura Chicken Bones Pickle.png') },
  { id: 'nvp5', name: 'Gongura Mutton Boneless Pickle', price: 1500, type: 'non-veg', image: require('../assets/Non_veg_pickles/Gongura Mutton Boneless Pickle.png') },
  { id: 'nvp6', name: 'Gongura Mutton Bones Pickle', price: 1300, type: 'non-veg', image: require('../assets/Non_veg_pickles/Gongura Mutton Bones Pickle.png') },
  { id: 'nvp7', name: 'Gongura Prawns Pickle', price: 1400, type: 'non-veg', image: require('../assets/Non_veg_pickles/Gongura Prawns Pickle.png') },
  { id: 'nvp8', name: 'Mutton Boneless Pickle', price: 1400, type: 'non-veg', image: require('../assets/Non_veg_pickles/Mutton Boneless Pickle.png') },
  { id: 'nvp9', name: 'Mutton Bones Pickle', price: 1200, type: 'non-veg', image: require('../assets/Non_veg_pickles/Mutton Bones Pickle.png') },
  { id: 'nvp10', name: 'Prawns Pickle', price: 1300, type: 'non-veg', image: require('../assets/Non_veg_pickles/Prawns Pickle.png') },
];

// --- Combo Options Configuration ---
const comboOptions = {
  // Veg Combos
  largeVegCombo: { 
    label_en: 'Large Veg Combo (12 items)', 
    label_te: 'లార్జ్ వెజ్ కాంబో (12 ఐటెమ్స్)', 
    type: 'veg', 
    count: 12, 
    discount: 0.30 
  },
  mediumVegCombo: { 
    label_en: 'Medium Veg Combo (8 items)', 
    label_te: 'మీడియం వెజ్ కాంబో (8 ఐటెమ్స్)', 
    type: 'veg', 
    count: 8, 
    discount: 0.25 
  },
  smallVegCombo: { 
    label_en: 'Small Veg Combo (4 items)', 
    label_te: 'స్మాల్ వెజ్ కాంబో (4 ఐటెమ్స్)', 
    type: 'veg', 
    count: 4, 
    discount: 0.20 
  },
  // Mixed Combos
  largeMixedCombo: { 
    label_en: 'Large Mixed Combo (12 items)', 
    label_te: 'లార్జ్ మిక్స్డ్ కాంబో (12 ఐటెమ్స్)', 
    type: 'mixed', 
    count: 12, 
    discount: 0.25 
  },
  mediumMixedCombo: { 
    label_en: 'Medium Mixed Combo (8 items)', 
    label_te: 'మీడియం మిక్స్డ్ కాంబో (8 ఐటెమ్స్)', 
    type: 'mixed', 
    count: 8, 
    discount: 0.20 
  },
};

const ComboSection = () => {
  const { addComboToCart, openCart } = useCart();
  const { currentLanguage, getText } = useLanguage();
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectedComboKey, setSelectedComboKey] = useState('smallVegCombo'); // Default selection
  const [validationError, setValidationError] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const currentCombo = comboOptions[selectedComboKey];

  // Helper function to get combo label in current language
  const getComboLabel = useCallback((combo) => {
    return currentLanguage === 'te' ? combo.label_te : combo.label_en;
  }, [currentLanguage]);

  // Combine all products for easy lookup
  const allProducts = [...vegPickles, ...nonVegPickles];

  // Function to calculate 250g price from 1kg price
  const get250gPrice = (product) => {
    // Assuming the price in product data is for 1kg (1000g)
    // Calculate 250g price: (1kg price / 4) = 250g price
    return Math.round(product.price / 4);
  };

  // Effect to re-validate whenever selected products or combo type changes
  useEffect(() => {
    const validateSelection = () => {
      if (selectedProductIds.length !== currentCombo.count) {
        const comboLabel = getComboLabel(currentCombo);
        const errorMessageEn = `Please select exactly ${currentCombo.count} items for the ${comboLabel}. You have selected ${selectedProductIds.length}.`;
        const errorMessageTe = `దయచేసి ${comboLabel} కోసం సరిగ్గా ${currentCombo.count} ఐటెమ్లను ఎంచుకోండి. మీరు ${selectedProductIds.length} ఎంచుకున్నారు.`;
        setValidationError(getText(errorMessageEn, errorMessageTe));
        return false;
      }
      setValidationError('');
      return true;
    };
    
    validateSelection();
  }, [selectedProductIds, selectedComboKey, currentCombo, getComboLabel, getText]);

  const handleProductSelection = (productId) => {
    let updatedSelection;
    if (selectedProductIds.includes(productId)) {
      updatedSelection = selectedProductIds.filter((id) => id !== productId);
    } else {
      updatedSelection = [...selectedProductIds, productId];
    }

    // Filter selection based on current combo type before setting
    const currentComboType = comboOptions[selectedComboKey].type;
    const newSelectedProductsFull = updatedSelection.map(id => allProducts.find(p => p.id === id));

    if (currentComboType === 'veg') {
        const nonVegInSelection = newSelectedProductsFull.filter(p => p.type === 'non-veg');
        if (nonVegInSelection.length > 0) {
            const alertMessageEn = "You cannot select non-veg pickles for a 'Veg Pickles Combo'. Please switch to a 'Mixed Combo' if you wish to include them.";
            const alertMessageTe = "మీరు 'వెజ్ పిక్లెస్ కాంబో' కోసం నాన్-వెజ్ పిక్లెస్ ఎంచుకోలేరు. వాటిని చేర్చాలనుకుంటే దయచేసి 'మిక్స్డ్ కాంబో'కి మార్చండి.";
            alert(getText(alertMessageEn, alertMessageTe));
            return; // Prevent adding non-veg if in veg combo mode
        }
    }
    
    // Prevent selecting more than the combo allows
    if (updatedSelection.length > currentCombo.count && !selectedProductIds.includes(productId)) {
        const comboLabel = getComboLabel(currentCombo);
        const errorMessageEn = `You can select a maximum of ${currentCombo.count} items for the ${comboLabel}.`;
        const errorMessageTe = `మీరు ${comboLabel} కోసం గరిష్టంగా ${currentCombo.count} ఐటెమ్లను ఎంచుకోవచ్చు.`;
        setValidationError(getText(errorMessageEn, errorMessageTe));
        return; 
    } else {
        setValidationError('');
    }

    setSelectedProductIds(updatedSelection);
  };

  const handleComboTypeChange = (e) => {
    const newComboKey = e.target.value;
    const newCombo = comboOptions[newComboKey];

    // Reset selection if switching from mixed to veg combo and non-veg items are selected
    const currentlySelectedFullProducts = selectedProductIds.map(id => allProducts.find(p => p.id === id));
    if (newCombo.type === 'veg') {
      const vegOnlySelection = currentlySelectedFullProducts
        .filter(p => p.type === 'veg')
        .map(p => p.id);
      setSelectedProductIds(vegOnlySelection);
    } else {
        // If switching to mixed, and current selection is too high for new combo count, trim it.
        if (selectedProductIds.length > newCombo.count) {
            setSelectedProductIds(selectedProductIds.slice(0, newCombo.count));
        }
    }

    setSelectedComboKey(newComboKey);
    setValidationError(''); // Clear validation errors on combo change
  };

  const calculateTotal = () => {
    let subtotal = 0;
    selectedProductIds.forEach((id) => {
      const product = allProducts.find((p) => p.id === id);
      if (product) {
        // Use 250g price instead of 1kg price
        subtotal += get250gPrice(product);
      }
    });

    const discountAmount = subtotal * currentCombo.discount;
    const finalPrice = subtotal - discountAmount;

    return { subtotal, discountAmount, finalPrice };
  };

  const { subtotal, discountAmount, finalPrice } = calculateTotal();
  const isSelectionValid = selectedProductIds.length === currentCombo.count;

  // Show toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    
    // Auto-hide toast after 4 seconds with fade out animation
    setTimeout(() => {
      setToastVisible(false);
    }, 4000);
  };

  // Handle adding combo to cart
  const handleAddToCart = () => {
    if (!isSelectionValid) {
      return;
    }

    // Get selected products with their details
    const selectedProducts = selectedProductIds.map(id => {
      const product = allProducts.find(p => p.id === id);
      return {
        id: product.id,
        name: product.name,
        price: get250gPrice(product), // Use 250g price for cart
        image: product.image,
        type: product.type,
        size: '250g'
      };
    });

    // Create combo data for cart
    const comboData = {
      comboType: selectedComboKey,
      comboLabel: getComboLabel(currentCombo),
      items: selectedProducts,
      originalPrice: subtotal,
      discountPercentage: Math.round(currentCombo.discount * 100),
      discountAmount: discountAmount,
      finalPrice: finalPrice
    };

    // Add to cart
    addComboToCart(comboData);

    // Open cart drawer to show the added combo
    openCart();

    // Reset selection for next combo
    setSelectedProductIds([]);

    // Show success toast notification
    const comboLabel = getComboLabel(currentCombo);
    const toastMessageEn = `🎉 ${comboLabel} added to cart successfully! Saved ₹${discountAmount.toFixed(0)}`;
    const toastMessageTe = `🎉 ${comboLabel} విజయవంతంగా కార్ట్‌కు జోడించబడింది! ₹${discountAmount.toFixed(0)} ఆదా చేశారు`;
    showToast(getText(toastMessageEn, toastMessageTe));
  };

  return (
    <div style={styles.comboSection}>
      <h2 style={styles.heading}>
        {getText('🥒 Customize Your Pickle Combo', '🥒 మీ పచ్చడి కాంబోను అనుకూలీకరించుకోండి')}
      </h2>
      <p style={styles.subHeading}>
        {getText(
          'Choose your favorite pickles and save with our combo offers!',
          'మీకు ఇష్టమైన పచ్చడలను ఎంచుకోండి మరియు మా కాంబో ఆఫర్లతో ఆదా చేసుకోండి!'
        )}
      </p>

      {/* Combo Type Selection */}
      <div style={styles.comboOptionsContainer}>
        <h3 style={styles.sectionTitle}>
          {getText('🎯 Choose Your Combo Type', '🎯 మీ కాంబో రకాన్ని ఎంచుకోండి')}
        </h3>
        <p style={{
          textAlign: 'center',
          color: '#636e72',
          fontSize: '1rem',
          marginBottom: '25px',
          fontStyle: 'italic'
        }}>
          {getText(
            'Select the perfect combo size and enjoy amazing savings!',
            'పర్ఫెక్ట్ కాంబో సైజ్ ని ఎంచుకోండి మరియు అద్భుతమైన ఆదాను ఆస్వాదించండి!'
          )}
        </p>
        <div style={styles.comboGrid} className="combo-options-grid">
          {Object.entries(comboOptions).map(([key, combo]) => {
            const isSelected = selectedComboKey === key;
            return (
              <label 
                key={key} 
                style={{
                  ...styles.comboOption,
                  ...(isSelected ? {
                    borderColor: '#e17055',
                    backgroundColor: '#fff5f3',
                    boxShadow: '0 8px 25px rgba(225, 112, 85, 0.25)',
                    transform: 'translateY(-2px)'
                  } : {})
                }}
                className="combo-option-card"
              >
                <input
                  type="radio"
                  name="comboType"
                  value={key}
                  checked={isSelected}
                  onChange={handleComboTypeChange}
                  style={styles.radioButton}
                />
                <div style={styles.comboLabel}>
                  <span style={{
                    ...styles.comboTitle,
                    ...(isSelected ? { color: '#e17055' } : {})
                  }}>
                    {getComboLabel(combo)}
                  </span>
                  <span style={{
                    ...styles.comboDiscount,
                    ...(isSelected ? {
                      backgroundColor: '#e17055',
                      color: '#ffffff',
                      border: '2px solid #d63031'
                    } : {})
                  }}>
                     {getText(`💰 Save ${Math.round(combo.discount * 100)}%`, `💰 ${Math.round(combo.discount * 100)}% ఆదా`)}
                  </span>
                  {isSelected && (
                    <span style={{
                      fontSize: '0.85rem',
                      color: '#e17055',
                      fontWeight: '500',
                      marginTop: '4px'
                    }}>
                       {getText('✅ Currently Selected', '✅ ప్రస్తుతం ఎంచుకోబడింది')}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '15px',
                    backgroundColor: '#e17055',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </div>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Products Display */}
      <div style={styles.productsContainer}>
        {/* Veg Pickles */}
        <div style={styles.categorySection}>
          <h3 style={styles.productCategoryHeading}>
            {getText('🥒 Vegetarian Pickles (250g each)', '🥒 శాఖాహార పచ్చడలు (ప్రతి ఒక్కటి 250గ్రాముల)')}
          </h3>
          <div style={styles.grid} className="combo-grid">
            {vegPickles.map((pickle) => (
              <div
                key={pickle.id}
                style={{
                  ...styles.productCard,
                  ...(selectedProductIds.includes(pickle.id) ? styles.productCardSelected : {}),
                }}
                className="combo-product-card"
                onClick={() => handleProductSelection(pickle.id)}
              >
                <img src={pickle.image} alt={pickle.name} style={styles.productImage} className="combo-product-image" />
                <div style={styles.productInfo}>
                  <h4 style={styles.productName} className="combo-product-name">{pickle.name}</h4>
                  <p style={styles.productWeight}>250g Pack</p>
                  <p style={styles.productPrice} className="combo-product-price">₹{get250gPrice(pickle)}</p>
                  <div style={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={selectedProductIds.includes(pickle.id)}
                      onChange={() => handleProductSelection(pickle.id)}
                      style={styles.checkbox}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Veg Pickles (only if current combo allows mixed) */}
        {currentCombo.type === 'mixed' && (
          <div style={styles.categorySection}>
            <h3 style={styles.productCategoryHeading}>
              {getText('🍗 Non-Vegetarian Pickles (250g each)', '🍗 మాంసాహార పచ్చడలు (ప్రతి ఒక్కటి 250గ్రాముల)')}
            </h3>
            <div style={styles.grid} className="combo-grid">
              {nonVegPickles.map((pickle) => (
                <div
                  key={pickle.id}
                  style={{
                    ...styles.productCard,
                    ...(selectedProductIds.includes(pickle.id) ? styles.productCardSelected : {}),
                  }}
                  className="combo-product-card"
                  onClick={() => handleProductSelection(pickle.id)}
                >
                  <img src={pickle.image} alt={pickle.name} style={styles.productImage} className="combo-product-image" />
                  <div style={styles.productInfo}>
                    <h4 style={styles.productName} className="combo-product-name">{pickle.name}</h4>
                    <p style={styles.productWeight}>250g Pack</p>
                    <p style={styles.productPrice} className="combo-product-price">₹{get250gPrice(pickle)}</p>
                    <div style={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        checked={selectedProductIds.includes(pickle.id)}
                        onChange={() => handleProductSelection(pickle.id)}
                        style={styles.checkbox}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Validation and Price Summary */}
      <div style={styles.summaryContainer}>
        {validationError && (
          <div style={styles.errorMessage}>
            <span>⚠️ {validationError}</span>
          </div>
        )}
        <div style={styles.selectionInfo}>
          <p style={styles.selectionCount}>
            {getText(
              `📝 Selected Items: ${selectedProductIds.length} / ${currentCombo.count}`,
              `📝 ఎంచుకున్న వస్తువులు: ${selectedProductIds.length} / ${currentCombo.count}`
            )}
          </p>
        </div>
        <div style={styles.priceBreakdown}>
          <div style={styles.priceRow}>
            <span>{getText('💵 Subtotal:', '💵 ఉప మొత్తం:')}</span>
            <span>₹{subtotal.toFixed(0)}</span>
          </div>
          <div style={styles.priceRow}>
            <span style={styles.discountText}>
              {getText(
                `🎉 Discount (${Math.round(currentCombo.discount * 100)}%):`,
                `🎉 డిస్కౌంట్ (${Math.round(currentCombo.discount * 100)}%):`
              )}
            </span>
            <span style={styles.discountAmount}>-₹{discountAmount.toFixed(0)}</span>
          </div>
          <div style={styles.finalPriceRow}>
            <span>{getText('🏷️ Final Price:', '🏷️ చివరి ధర:')}</span>
            <span style={styles.finalPrice}>₹{finalPrice.toFixed(0)}</span>
          </div>
        </div>

        <button
          style={{
            ...styles.addToCartButton,
            ...(isSelectionValid ? {} : styles.addToCartButtonDisabled),
          }}
          disabled={!isSelectionValid}
          onClick={handleAddToCart}
        >
          {getText('🛒 Add Combo to Cart', '🛒 కాంబోను కార్ట్‌కు జోడించండి')}
        </button>
      </div>

      {/* Toast Notification */}
      {toastVisible && (
        <div style={styles.toastNotification} className="toast-notification">
          <div style={styles.toastContent} className="toast-content">
            <span style={styles.toastIcon}>✅</span>
            <span style={styles.toastMessage}>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Inline CSS Styles ---
const styles = {
  comboSection: {
    fontFamily: "'Noto Sans Telugu', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: '#f9f9f9',
    padding: '40px 20px',
    borderRadius: '12px',
    maxWidth: '1200px',
    margin: '40px auto',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
    textAlign: 'center',
    color: '#333',
    '@media (max-width: 768px)': {
      margin: '20px 10px',
      padding: '20px 10px',
          height: '100%',
    width: '50%', 
    },
  },
  heading: {
    fontSize: '2.5em',
    color: '#D44C1D', // A vibrant, pickle-friendly color
    marginBottom: '30px',
    fontWeight: '700',
    letterSpacing: '1px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    '@media (max-width: 480px)': {
      fontSize: '1.8em',
      marginBottom: '20px',
    },
  },
  subHeading: {
    fontSize: '1.2em',
    color: '#666',
    marginBottom: '40px',
    '@media (max-width: 480px)': {
      fontSize: '1em',
      marginBottom: '25px',
    },
  },
  comboOptionsContainer: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    padding: '35px 25px',
    borderRadius: '20px',
    marginBottom: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    border: '2px solid #e9ecef',
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 480px)': {
      padding: '25px 15px',
      marginBottom: '30px',
          height: '100%',
    width: '50%', 
    },
  },
  sectionTitle: {
    fontSize: '1.6rem',
    color: '#2d3436',
    marginBottom: '25px',
    fontWeight: '700',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #e17055, #fdcb6e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    position: 'relative',
    '@media (max-width: 480px)': {
      fontSize: '1.4rem',
      marginBottom: '20px',
      
    },
  },
  comboGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px',
    '@media (max-width: 768px)': { // Tablet layout
      gridTemplateColumns: '1fr', // Stacks combo options vertically
    },
    '@media (max-width: 412px)': { // Tablet layout
      gridTemplateColumns: '1fr', // Stacks combo options vertically
      height: '100%',
    width: '50%', 

    },
  },
  comboOption: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 25px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f1f2f6 100%)',
    border: '3px solid #e9ecef',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    minHeight: '90px',
    '&:hover': {
      transform: 'translateY(-3px) scale(1.02)',
      boxShadow: '0 12px 35px rgba(225, 112, 85, 0.25)',
      borderColor: '#e17055',
      background: 'linear-gradient(135deg, #fff5f3 0%, #ffeaa7 100%)',
    },
    '@media (max-width: 480px)': { // Even more compact on very small screens
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '15px 20px',
      height: '100%',
      width: '50%',
      textAlign: 'left',
    }
  },
  comboLabel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: '1',
    '@media (max-width: 480px)': {
height: '100%',
    width: '50%',       marginBottom: '10px',
    }
  },
  comboTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#2d3436',
    letterSpacing: '0.5px',
    '@media (max-width: 480px)': {
      fontSize: '1rem',
    }
  },
  comboDiscount: {
    fontSize: '0.95rem',
    color: '#00b894',
    fontWeight: '700',
    backgroundColor: '#d1f2eb',
    padding: '8px 16px',
    borderRadius: '25px',
    display: 'inline-block',
    width: 'fit-content',
    boxShadow: '0 3px 12px rgba(0, 184, 148, 0.3)',
    border: '2px solid #81ecec',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    position: 'relative',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
      animation: 'shimmer 2s infinite',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
      padding: '6px 12px',
    }
  },
  radioLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    margin: '0 15px',
    cursor: 'pointer',
    fontSize: '1.1em',
    fontWeight: '500',
    color: '#555',
  },
  radioButton: {
    marginRight: '15px',
    transform: 'scale(1.4)',
    accentColor: '#e17055',
    cursor: 'pointer',
    position: 'relative',
    '@media (max-width: 480px)': {
      position: 'absolute',
      top: '15px',
      right: '15px',
      marginRight: '0',
    }
  },
  productsContainer: {
    marginBottom: '30px',
     '@media (max-width: 480px)': {
      height: '100%',
    width: '50%',
  },
  },
  productCategoryHeading: {
    fontSize: '1.8em',
    color: '#4CAF50', // Green for categories
    margin: '40px 0 25px 0',
    fontWeight: '600',
    borderBottom: '2px solid #D44C1D',
    paddingBottom: '10px',
    display: 'inline-block',
    '@media (max-width: 480px)': {
      fontSize: '1.4em',
      margin: '30px 0 20px 0',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '25px',
    justifyContent: 'center',
    marginBottom: '20px',
    '@media (max-width: 768px)': { // Tablet layout
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '20px',
    },
    '@media (max-width: 480px)': { // Mobile layout for pickle cards - 2 items per row
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px',
          height: '100%',
    width: '50%', 
    },
    '@media (max-width: 380px)': { // Smaller mobile layout
      gridTemplateColumns: '1fr', // Stacks them on very small screens
    }
  },
  productCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative', // For absolute positioning of checkbox
  },
  productCardSelected: {
    borderColor: '#D44C1D',
    boxShadow: '0 0 0 3px #D44C1D, 0 8px 16px rgba(212, 76, 29, 0.2)',
    transform: 'scale(1.02)',
    backgroundColor: '#fff5f3',
  },
  productCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  },
  productImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
    border: '1px solid #eee',
    '@media (max-width: 480px)': {
      width: '80px',
      height: '80px',
    }
  },
  productInfo: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
 
  productName: {
    fontSize: '1.1em',
    fontWeight: '600',
    color: '#333',
    margin: '5px 0',
  },
  productWeight: {
    fontSize: '0.9em',
    color: '#777',
    margin: '3px 0',
  },
  productPrice: {
    fontSize: '1.2em',
    fontWeight: '700',
    color: '#D44C1D',
    margin: '8px 0',
  },
  checkbox: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    transform: 'scale(1.5)',
    accentColor: '#4CAF50',
    cursor: 'pointer',
  },
  summaryContainer: {
    backgroundColor: '#fff3cd', // Light yellow for summary
    border: '1px solid #ffeeba',
    borderRadius: '10px',
    padding: '25px',
    marginTop: '30px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    maxWidth: '500px',
    margin: '30px auto',
  },
  errorMessage: {
    color: '#dc3545',
    fontWeight: 'bold',
    marginBottom: '15px',
    fontSize: '1.1em',
  },
  selectionCount: {
    fontSize: '1.1em',
    color: '#555',
    marginBottom: '10px',
  },
  totalPrice: {
    fontSize: '1.2em',
    color: '#666',
    marginBottom: '5px',
  },
  discount: {
    fontSize: '1.2em',
    color: '#28a745',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  finalPrice: {
    fontSize: '1.8em',
    color: '#D44C1D',
    fontWeight: '800',
    marginTop: '15px',
    borderTop: '1px dashed #ccc',
    paddingTop: '15px',
  },
  addToCartButton: {
    backgroundColor: '#D44C1D',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '15px 30px',
    fontSize: '1.3em',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '25px',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  addToCartButtonHover: {
    backgroundColor: '#A83B18', // Darker shade on hover
  },
  addToCartButtonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  // Toast Notification Styles
  toastNotification: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    zIndex: 10000,
    animation: 'slideInRight 0.5s ease-out',
    pointerEvents: 'auto',
  },
  toastContent: {
    background: 'linear-gradient(135deg, #00b894, #81ecec)',
    color: '#ffffff',
    padding: '18px 28px',
    borderRadius: '16px',
    boxShadow: '0 12px 40px rgba(0, 184, 148, 0.5), 0 4px 20px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    minWidth: '320px',
    maxWidth: '400px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(12px)',
    fontFamily: '"Poppins", Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      animation: 'shimmer 2s infinite',
    }
  },
  toastIcon: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
  },
  toastMessage: {
    fontSize: '1.05rem',
    fontWeight: '600',
    letterSpacing: '0.3px',
    lineHeight: '1.4',
    textShadow: '0 1px 3px rgba(0,0,0,0.2)',
  },
};

export default ComboSection;