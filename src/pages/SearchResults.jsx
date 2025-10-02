import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PRODUCTS, getProductPrice } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchAndFilter from '../components/SearchAndFilter';
import './SearchResults.css';

const SearchResults = ({ onProductClick }) => {
  const [searchParams] = useSearchParams();
  const { getText, currentLanguage } = useLanguage();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Get search query from URL
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    setProducts(PRODUCTS); // All products for global search
  }, [searchParams]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name_te.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description_te.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price filter
    if (priceRange !== 'all') {
      const priceRanges = {
        'budget': { min: 0, max: 200 },
        'mid': { min: 200, max: 500 },
        'premium': { min: 500, max: 1000 },
        'luxury': { min: 1000, max: Infinity }
      };

      const range = priceRanges[priceRange];
      if (range) {
        filtered = filtered.filter(product => {
          const price1kg = getProductPrice(product.id, '1kg');
          return price1kg >= range.min && price1kg <= range.max;
        });
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return currentLanguage === 'te' 
            ? a.name_te.localeCompare(b.name_te)
            : a.name_en.localeCompare(b.name_en);
        case 'price-low':
          return getProductPrice(a.id, '1kg') - getProductPrice(b.id, '1kg');
        case 'price-high':
          return getProductPrice(b.id, '1kg') - getProductPrice(a.id, '1kg');
        case 'rating':
          return (b.rating || 4.5) - (a.rating || 4.5);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, currentLanguage, priceRange, sortBy]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // Update URL with new search query
    if (query) {
      window.history.replaceState({}, '', `/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setPriceRange('all');
    setSortBy('name');
    window.history.replaceState({}, '', '/search');
  };

  return (
    <div className="search-results-page">
      <div className="search-header">
        <div className="search-hero">
          <h1 className={currentLanguage === 'te' ? 'font-telugu' : ''}>
            {getText('Search Results', 'శోధన ఫలితాలు')}
          </h1>
          {searchQuery && (
            <p className={currentLanguage === 'te' ? 'font-telugu' : ''}>
              {getText(
                `Found ${filteredProducts.length} results for "${searchQuery}"`, 
                `"${searchQuery}" కోసం ${filteredProducts.length} ఫలితాలు దొరికాయి`
              )}
            </p>
          )}
        </div>
      </div>

      <div className="search-content">
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          priceRange={priceRange}
          onPriceRangeChange={handlePriceRangeChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />

        <div className="results-section">
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewProduct={onProductClick}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-content">
                <div className="no-results-icon">🔍</div>
                <h3 className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                  {getText('No products found', 'ఎటువంటి ప్రొడక్ట్స్ కనుగొనబడలేదు')}
                </h3>
                <p className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                  {getText(
                    'Try adjusting your search terms or filters to find what you\'re looking for.',
                    'మీరు వెతుకుతున్నది కనుగొనడానికి మీ శోధన పదాలను లేదా ఫిల్టర్‌లను సర్దుబాటు చేయండి.'
                  )}
                </p>
                <button 
                  className={`clear-search-btn ${currentLanguage === 'te' ? 'font-telugu' : ''}`}
                  onClick={handleClearFilters}
                >
                  {getText('Clear Search', 'శోధనను క్లియర్ చేయండి')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;