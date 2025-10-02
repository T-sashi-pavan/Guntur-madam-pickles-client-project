import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineDollar, AiOutlineClear } from 'react-icons/ai';
import { useLanguage } from '../contexts/LanguageContext';
import './SearchAndFilter.css';

const SearchAndFilter = ({
  searchQuery,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
  onClearFilters
}) => {
  const { currentLanguage, getText } = useLanguage();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    // Debounced search - call parent function after user stops typing
    clearTimeout(handleSearchChange.timeoutId);
    handleSearchChange.timeoutId = setTimeout(() => {
      onSearchChange(value);
    }, 300);
  };

  const priceRanges = [
    { value: 'all', label: { en: 'All Prices', te: 'అన్ని ధరలు' }, min: 0, max: Infinity },
    { value: 'budget', label: { en: '₹0 - ₹200', te: '₹0 - ₹200' }, min: 0, max: 200 },
    { value: 'mid', label: { en: '₹200 - ₹500', te: '₹200 - ₹500' }, min: 200, max: 500 },
    { value: 'premium', label: { en: '₹500 - ₹1000', te: '₹500 - ₹1000' }, min: 500, max: 1000 },
    { value: 'luxury', label: { en: '₹1000+', te: '₹1000+' }, min: 1000, max: Infinity }
  ];

  const sortOptions = [
    { value: 'name', label: { en: 'Name A-Z', te: 'పేరు అ-౯' } },
    { value: 'price-low', label: { en: 'Price Low to High', te: 'ధర తక్కువ నుండి ఎక్కువ' } },
    { value: 'price-high', label: { en: 'Price High to Low', te: 'ధర ఎక్కువ నుండి తక్కువ' } },
    { value: 'rating', label: { en: 'Highest Rated', te: 'అత్యధిక రేటింగ్' } }
  ];

  return (
    <div className="search-filter-bar">
      <div className="search-filter-container">
        
        {/* Search Section */}
        <div className="search-section">
          <div className="search-input-wrapper">
            <AiOutlineSearch className="search-icon" />
            <input
              type="text"
              className={`search-input ${currentLanguage === 'te' ? 'font-telugu' : ''}`}
              placeholder={getText('Search products...', 'ప్రొడక్ట్స్ కోసం వెతకండి...')}
              value={localSearchQuery}
              onChange={handleSearchChange}
            />
            {localSearchQuery && (
              <button 
                className="clear-search-btn"
                onClick={() => {
                  setLocalSearchQuery('');
                  onSearchChange('');
                }}
                aria-label={getText('Clear search', 'శోధనను క్లియర్ చేయండి')}
              >
                <AiOutlineClear />
              </button>
            )}
          </div>
        </div>

        {/* Price Filter Section */}
        <div className="filter-section">
          <label className={`filter-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            <AiOutlineDollar className="filter-icon" />
            {getText('Price Range', 'ధర పరిధి')}
          </label>
          <select
            className={`filter-select ${currentLanguage === 'te' ? 'font-telugu' : ''}`}
            value={priceRange}
            onChange={(e) => onPriceRangeChange(e.target.value)}
          >
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>
                {currentLanguage === 'te' ? range.label.te : range.label.en}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Section */}
        <div className="filter-section">
          <label className={`filter-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            <AiOutlineSearch className="filter-icon" />
            {getText('Sort By', 'క్రమబద్ధీకరించు')}
          </label>
          <select
            className={`filter-select ${currentLanguage === 'te' ? 'font-telugu' : ''}`}
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {currentLanguage === 'te' ? option.label.te : option.label.en}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="filter-actions">
          <button
            className={`clear-filters-btn ${currentLanguage === 'te' ? 'font-telugu' : ''}`}
            onClick={onClearFilters}
          >
            {getText('Clear All', 'అన్నీ క్లియర్ చేయండి')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;