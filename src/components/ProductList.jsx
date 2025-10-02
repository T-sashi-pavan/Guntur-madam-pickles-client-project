import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PRODUCTS, CATEGORIES, getProductsByCategory, searchProducts } from '../data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import FilterBar from './FilterBar';
import './ProductList.css';

const ProductList = ({ 
  selectedCategory = null,
  searchQuery = '',
  onCategoryChange = null 
}) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  const { currentLanguage, getText } = useLanguage();

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('guntur-madam-wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('guntur-madam-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Listen for search events from navbar
  useEffect(() => {
    const handleProductSearch = (event) => {
      const { query, language } = event.detail;
      // This will be handled by the parent component passing searchQuery
    };

    window.addEventListener('productSearch', handleProductSearch);
    return () => {
      window.removeEventListener('productSearch', handleProductSearch);
    };
  }, []);

  // Filter and sort products
  const processedProducts = useMemo(() => {
    let products = [...PRODUCTS];

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      products = getProductsByCategory(selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      products = searchProducts(searchQuery, currentLanguage);
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        products.sort((a, b) => {
          const priceA = sizeFilter !== 'all' ? 
            (sizeFilter === '1kg' ? a.price1kg : sizeFilter === '500g' ? a.price500g : a.price250g) : 
            a.price500g;
          const priceB = sizeFilter !== 'all' ? 
            (sizeFilter === '1kg' ? b.price1kg : sizeFilter === '500g' ? b.price500g : b.price250g) : 
            b.price500g;
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        products.sort((a, b) => {
          const priceA = sizeFilter !== 'all' ? 
            (sizeFilter === '1kg' ? a.price1kg : sizeFilter === '500g' ? a.price500g : a.price250g) : 
            a.price500g;
          const priceB = sizeFilter !== 'all' ? 
            (sizeFilter === '1kg' ? b.price1kg : sizeFilter === '500g' ? b.price500g : b.price250g) : 
            b.price500g;
          return priceB - priceA;
        });
        break;
      case 'name-a-z':
        products.sort((a, b) => {
          const nameA = currentLanguage === 'te' ? a.name_te : a.name_en;
          const nameB = currentLanguage === 'te' ? b.name_te : b.name_en;
          return nameA.localeCompare(nameB);
        });
        break;
      case 'name-z-a':
        products.sort((a, b) => {
          const nameA = currentLanguage === 'te' ? a.name_te : a.name_en;
          const nameB = currentLanguage === 'te' ? b.name_te : b.name_en;
          return nameB.localeCompare(nameA);
        });
        break;
      default:
        // Keep original order
        break;
    }

    return products;
  }, [selectedCategory, searchQuery, currentLanguage, sortOption, sizeFilter]);

  // Update displayed products with loading simulation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setFilteredProducts(processedProducts);
      setDisplayedProducts(processedProducts.slice(0, visibleCount));
      setIsLoading(false);
    }, 300); // Small delay for better UX

    return () => clearTimeout(timer);
  }, [processedProducts, visibleCount]);

  // Category sections for display
  const categoryData = useMemo(() => {
    const categories = Object.values(CATEGORIES);
    return categories.map(category => ({
      name: category,
      products: getProductsByCategory(category),
      id: category.toLowerCase().replace(/\s+/g, '-')
    }));
  }, []);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToWishlist = (product) => {
    setWishlist(prev => {
      const isWishlisted = prev.some(item => item.id === product.id);
      if (isWishlisted) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const loadMoreProducts = () => {
    setVisibleCount(prev => prev + 12);
  };

  const hasMoreProducts = visibleCount < filteredProducts.length;

  // Render category section
  const renderCategorySection = (categoryInfo) => {
    if (categoryInfo.products.length === 0) return null;

    return (
      <section 
        key={categoryInfo.id}
        id={`category-${categoryInfo.id}`}
        className="category-section"
      >
        <div className="category-header">
          <h2 className={`category-title ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            {categoryInfo.name}
          </h2>
          <div className="category-count">
            <span className={currentLanguage === 'te' ? 'font-telugu' : ''}>
              {categoryInfo.products.length} {getText('items', 'వస్తువులు')}
            </span>
          </div>
        </div>
        
        <div className="products-grid">
          {categoryInfo.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={handleViewProduct}
              onAddToWishlist={handleAddToWishlist}
              isWishlisted={isWishlisted(product.id)}
            />
          ))}
        </div>
      </section>
    );
  };

  // If showing all categories (no filter)
  if (!selectedCategory && !searchQuery.trim()) {
    return (
      <div id="products" className="product-list-container">
        <div className="container">
          <div className="section-header">
            <h1 className={`main-title ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText('Our Products', 'మా ప్రొడక్ట్స్')}
            </h1>
            <p className={`main-subtitle ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText(
                'Discover our authentic range of traditional Andhra pickles and specialties',
                'మా నిజమైన సాంప్రదాయ ఆంధ్రా పచ్చళ్ళు మరియు ప్రత్యేకతలను కనుగొనండి'
              )}
            </p>
          </div>

          <FilterBar
            sortOption={sortOption}
            sizeFilter={sizeFilter}
            onSortChange={setSortOption}
            onSizeFilterChange={setSizeFilter}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />

          <div className="categories-container">
            {categoryData.map(categoryInfo => renderCategorySection(categoryInfo))}
          </div>
        </div>

        {/* Product Modal */}
        {isModalOpen && selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    );
  }

  // Filtered or searched products view
  return (
    <div id="products" className="product-list-container">
      <div className="container">
        <div className="section-header">
          <h1 className={`main-title ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            {selectedCategory ? 
              selectedCategory : 
              getText('Search Results', 'వెతుకుడు ఫలితాలు')
            }
          </h1>
          {searchQuery && (
            <p className={`search-info ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
              {getText('Showing results for', 'ఫలితాలు చూపిస్తోంది')}: "{searchQuery}"
            </p>
          )}
          <p className={`results-count ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            {filteredProducts.length} {getText('products found', 'ప్రొడక్ట్స్ దొరికాయి')}
          </p>
        </div>

        <FilterBar
          sortOption={sortOption}
          sizeFilter={sizeFilter}
          onSortChange={setSortOption}
          onSizeFilterChange={setSizeFilter}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-grid">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="product-skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-line skeleton-title"></div>
                    <div className="skeleton-line skeleton-description"></div>
                    <div className="skeleton-line skeleton-price"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {displayedProducts.length > 0 ? (
              <>
                <div className="products-grid">
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewProduct={handleViewProduct}
                      onAddToWishlist={handleAddToWishlist}
                      isWishlisted={isWishlisted(product.id)}
                    />
                  ))}
                </div>

                {hasMoreProducts && (
                  <div className="load-more-container">
                    <button
                      className="load-more-btn"
                      onClick={loadMoreProducts}
                      aria-label={getText('Load more products', 'మరిన్ని ప్రొడక్ట్స్ లోడ్ చేయండి')}
                    >
                      <span className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                        {getText('Load More', 'మరిన్ని లోడ్ చేయండి')}
                      </span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-products">
                <div className="no-products-icon">🔍</div>
                <h3 className={`no-products-title ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
                  {getText('No products found', 'ప్రొడక్ట్స్ కనుగొనబడలేదు')}
                </h3>
                <p className={`no-products-text ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
                  {getText(
                    'Try adjusting your search or filters to find what you\'re looking for.',
                    'మీరు వెతుకుతున్న వాటిని కనుగొనడానికి మీ వెతుకుడు లేదా ఫిల్టర్లను సర్దుబాటు చేయండి.'
                  )}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductList;