import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import './AllProductsSection.css';

const AllProductsSection = () => {
  const { getText, currentLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isSticky, setIsSticky] = useState(false);

  // Category configuration with icons and colors
  const categoryConfig = {
    'ALL': {
      label_en: 'All Products',
      label_te: 'అన్ని ఉత్పత్తులు',
      icon: '🌟',
      color: '#e17055'
    },
    [CATEGORIES.VEG]: {
      label_en: 'Veg Pickles',
      label_te: 'వెజ్ పచ్చడలు',
      icon: '🥒',
      color: '#00b894'
    },
    [CATEGORIES.NON_VEG]: {
      label_en: 'Non-Veg Pickles',
      label_te: 'నాన్-వెజ్ పచ్చడలు',
      icon: '🍗',
      color: '#d63031'
    },
    [CATEGORIES.KARAM_PODULU]: {
      label_en: 'Karam Podulu',
      label_te: 'కారం పొడులు',
      icon: '🌶️',
      color: '#fd79a8'
    },
    [CATEGORIES.SPECIALS]: {
      label_en: 'Our Specials',
      label_te: 'మా స్పెషల్స్',
      icon: '⭐',
      color: '#fdcb6e'
    },
    [CATEGORIES.SWEETS]: {
      label_en: 'Sweets',
      label_te: 'స్వీట్స్',
      icon: '🍬',
      color: '#a29bfe'
    },
    [CATEGORIES.ANDHRA_SPECIAL]: {
      label_en: 'Andhra Special',
      label_te: 'ఆంధ్రా స్పెషల్',
      icon: '🌾',
      color: '#ff7675'
    },
    [CATEGORIES.HOT]: {
      label_en: 'Hot & Spicy',
      label_te: 'హాట్ & స్పైసీ',
      icon: '🔥',
      color: '#e84393'
    }
  };

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'ALL') {
      return PRODUCTS.filter(
        product => product.category !== CATEGORIES.SWEETS && product.category !== CATEGORIES.HOT
      );
    }
    return PRODUCTS.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  // Group products by category for "All Products" view
  const productsByCategory = useMemo(() => {
    if (selectedCategory !== 'ALL') {
      return null;
    }

    const grouped = {};
    Object.keys(CATEGORIES)
      .filter(key => CATEGORIES[key] !== CATEGORIES.SWEETS && CATEGORIES[key] !== CATEGORIES.HOT)
      .forEach(key => {
        const category = CATEGORIES[key];
        grouped[category] = PRODUCTS.filter(p => p.category === category);
      });
    return grouped;
  }, [selectedCategory]);

  // Get category label based on current language
  const getCategoryLabel = (categoryKey) => {
    const config = categoryConfig[categoryKey];
    return currentLanguage === 'te' ? config.label_te : config.label_en;
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Smooth scroll to products section
    setTimeout(() => {
      const element = document.getElementById('products-display');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Handle scroll for sticky category bar
  React.useEffect(() => {
    const handleScroll = () => {
      const categoryBar = document.getElementById('category-filter-bar');
      if (categoryBar) {
        const offset = categoryBar.offsetTop;
        setIsSticky(window.pageYOffset > offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="all-products-section">
      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title">
          {getText('🎉 Explore Our Complete Collection', '🎉 మా పూర్తి సేకరణను అన్వేషించండి')}
        </h2>
        <p className="section-subtitle">
          {getText(
            'Discover authentic Andhra pickles and spices handcrafted with traditional recipes',
            'సాంప్రదాయ వంటకాలతో హస్తకళతో తయారు చేసిన ప్రామాణిక ఆంధ్ర పచ్చడలు మరియు మసాలాలను కనుగొనండి'
          )}
        </p>
      </div>

      {/* Category Filter Bar */}
      <div 
        id="category-filter-bar" 
        className={`category-filter-bar ${isSticky ? 'sticky' : ''}`}
      >
        <div className="category-filter-container">
          <div className="category-tabs">
            {['ALL', ...Object.values(CATEGORIES).filter(category => category !== CATEGORIES.SWEETS && category !== CATEGORIES.HOT)].map((category) => {
              const config = categoryConfig[category];
              const isSelected = selectedCategory === category;
              
              return (
                <button
                  key={category}
                  className={`category-tab ${isSelected ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                  style={{
                    ...(isSelected && { 
                      backgroundColor: `${config.color}15`,
                      borderColor: config.color,
                      color: config.color
                    })
                  }}
                >
                  <span className="category-icon">{config.icon}</span>
                  <span className="category-label">{getCategoryLabel(category)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Display */}
      <div id="products-display" className="products-display-section">
        {selectedCategory === 'ALL' ? (
          // Show all products grouped by category
          <div className="grouped-products">
            {Object.keys(CATEGORIES)
              .filter(key => CATEGORIES[key] !== CATEGORIES.SWEETS && CATEGORIES[key] !== CATEGORIES.HOT)
              .map((key) => {
              const category = CATEGORIES[key];
              const products = productsByCategory[category];
              const config = categoryConfig[category];
              
              if (!products || products.length === 0) return null;

              return (
                <div key={category} className="category-group" id={`category-${category}`}>
                  <div className="category-group-header">
                    <h3 className="category-group-title" style={{ color: config.color }}>
                      <span className="category-group-icon">{config.icon}</span>
                      {getCategoryLabel(category)}
                      <span className="product-count">({products.length})</span>
                    </h3>
                    <button 
                      className="view-all-btn"
                      onClick={() => handleCategoryChange(category)}
                      style={{ borderColor: config.color, color: config.color }}
                    >
                      {getText('View All', 'అన్నీ చూడండి')} →
                    </button>
                  </div>
                  <div className="products-grid">
                    {products.slice(0, 8).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  {products.length > 8 && (
                    <div className="see-more-container">
                      <button 
                        className="see-more-btn"
                        onClick={() => handleCategoryChange(category)}
                        style={{ backgroundColor: config.color }}
                      >
                        {getText(
                          `See All ${products.length} ${getCategoryLabel(category)}`,
                          `అన్ని ${products.length} ${getCategoryLabel(category)} చూడండి`
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Show filtered products for selected category
          <div className="filtered-products">
            <div className="filtered-header">
              <h3 className="filtered-title">
                <span className="filtered-icon">{categoryConfig[selectedCategory].icon}</span>
                {getCategoryLabel(selectedCategory)}
                <span className="filtered-count">({filteredProducts.length} {getText('items', 'వస్తువులు')})</span>
              </h3>
            </div>
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="no-products">
                <p>{getText('No products found in this category', 'ఈ వర్గంలో ఉత్పత్తులు కనుగొనబడలేదు')}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-number">
            {PRODUCTS.filter(p => p.category !== CATEGORIES.SWEETS && p.category !== CATEGORIES.HOT).length}+
          </div>
          <div className="stat-label">{getText('Products', 'ఉత్పత్తులు')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {Object.values(CATEGORIES).filter(c => c !== CATEGORIES.SWEETS && c !== CATEGORIES.HOT).length}
          </div>
          <div className="stat-label">{getText('Categories', 'వర్గాలు')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100%</div>
          <div className="stat-label">{getText('Authentic', 'ప్రామాణికమైనది')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">⭐⭐⭐⭐⭐</div>
          <div className="stat-label">{getText('Quality', 'నాణ్యత')}</div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsSection;
