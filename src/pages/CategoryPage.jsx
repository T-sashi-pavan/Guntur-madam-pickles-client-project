import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { CATEGORIES, PRODUCTS, getProductPrice } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchAndFilter from '../components/SearchAndFilter';
import './CategoryPage.css';

// Category mappings for display names
const categoryMappings = {
  'veg': {
    key: CATEGORIES.VEG,
    en: 'Vegetable Pickles',
    te: 'కూరగాయల పచ్చడి'
  },
  'non-veg': {
    key: CATEGORIES.NON_VEG,
    en: 'Non-Vegetarian Pickles',
    te: 'మాంసం పచ్చడి'
  },
  'specials': {
    key: CATEGORIES.SPECIALS,
    en: 'Our Special Pickles',
    te: 'మా స్పెషల్ పచ్చడి'
  },
  'karam-podulu': {
    key: CATEGORIES.KARAM_PODULU,
    en: 'Spice Powders',
    te: 'కారం పొడులు'
  },
  'sweets': {
    key: CATEGORIES.SWEETS,
    en: 'Traditional Sweets',
    te: 'స్వీట్స్'
  },
  'andhra-special': {
    key: CATEGORIES.ANDHRA_SPECIAL,
    en: 'Andhra Special',
    te: 'ఆంధ్రా స్పెషల్'
  },
  'hot': {
    key: CATEGORIES.HOT,
    en: 'Hot & Spicy',
    te: 'కారం'
  }
};

const CategoryPage = ({ onProductClick }) => {
  const { category } = useParams();
  const { getText, currentLanguage } = useLanguage();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentSortBy, setCurrentSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    const allProducts = PRODUCTS;
    const categoryMapping = categoryMappings[category];
    
    if (categoryMapping) {
      const categoryProducts = allProducts.filter(product => 
        product.category === categoryMapping.key
      );
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
    }
  }, [category]);

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name_te.toLowerCase().includes(searchQuery.toLowerCase())
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
      switch (currentSortBy) {
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
  }, [products, searchQuery, currentSortBy, currentLanguage, priceRange]);

  const handleSort = (sortBy) => {
    setCurrentSortBy(sortBy);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setPriceRange('all');
    setCurrentSortBy('name');
  };

  const categoryMapping = categoryMappings[category];
  const categoryName = categoryMapping 
    ? (currentLanguage === 'te' ? categoryMapping.te : categoryMapping.en)
    : 'Products';

  if (!categoryMapping) {
    return (
      <div className="category-page">
        <div className="category-header">
          <h1>{getText('Category Not Found', 'వర్గం కనుగొనబడలేదు')}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <div className="category-hero">
          <h1 className={currentLanguage === 'te' ? 'font-telugu' : ''}>
            {categoryName}
          </h1>
          <p className={currentLanguage === 'te' ? 'font-telugu' : ''}>
            {getText(
              `Explore our delicious ${categoryMapping.en.toLowerCase()}`, 
              `మా రుచికరమైన ${categoryMapping.te} చూడండి`
            )}
          </p>
        </div>
      </div>

      <div className="category-content">
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          priceRange={priceRange}
          onPriceRangeChange={handlePriceRangeChange}
          sortBy={currentSortBy}
          onSortChange={handleSort}
          onClearFilters={handleClearFilters}
        />

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={onProductClick}
              />
            ))
          ) : (
            <div className="no-products">
              <p className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                {getText(
                  'No products found in this category.',
                  'ఈ వర్గంలో ఎటువంటి ఉత్పాదనలు కనుగొనబడలేదు.'
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;