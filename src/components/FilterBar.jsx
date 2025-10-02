import React from 'react';
import { AiOutlineSearch, AiOutlineFilter, AiOutlineSortAscending } from 'react-icons/ai';
import { useLanguage } from '../contexts/LanguageContext';
import { CATEGORIES } from '../data/products';
import './FilterBar.css';

const FilterBar = ({
  sortOption,
  sizeFilter,
  onSortChange,
  onSizeFilterChange,
  selectedCategory,
  onCategoryChange
}) => {
  const { currentLanguage, getText } = useLanguage();

  const sortOptions = [
    { value: 'default', label: { en: 'Default', te: 'డిఫాల్ట్' } },
    { value: 'price-low-high', label: { en: 'Price: Low to High', te: 'ధర: తక్కువ నుండి ఎక్కువ' } },
    { value: 'price-high-low', label: { en: 'Price: High to Low', te: 'ధర: ఎక్కువ నుండి తక్కువ' } },
    { value: 'name-a-z', label: { en: 'Name: A to Z', te: 'పేరు: అ నుండి ౯' } },
    { value: 'name-z-a', label: { en: 'Name: Z to A', te: 'పేరు: ౯ నుండి అ' } }
  ];

  const sizeOptions = [
    { value: 'all', label: { en: 'All Sizes', te: 'అన్ని సైజులు' } },
    { value: '250g', label: { en: '250g', te: '250గ్రా' } },
    { value: '500g', label: { en: '500g', te: '500గ్రా' } },
    { value: '1kg', label: { en: '1 KG', te: '1 కేజీ' } }
  ];

  const categoryOptions = [
    { value: 'all', label: { en: 'All Categories', te: 'అన్ని వర్గాలు' } },
    { value: CATEGORIES.VEG, label: { en: 'Veg Pickles', te: 'కూరగాయల పచ్చడి' } },
    { value: CATEGORIES.NON_VEG, label: { en: 'Non-Veg Pickles', te: 'మాంసం పచ్చడి' } },
    { value: CATEGORIES.SPECIALS, label: { en: 'Our Specials', te: 'మా స్పెషల్స్' } },
    { value: CATEGORIES.KARAM_PODULU, label: { en: 'Spice Powders', te: 'కారం పొడులు' } },
    { value: CATEGORIES.SWEETS, label: { en: 'Sweets', te: 'స్వీట్స్' } },
    { value: CATEGORIES.ANDHRA_SPECIAL, label: { en: 'Andhra Special', te: 'ఆంధ్రా స్పెషల్' } },
    { value: CATEGORIES.HOT, label: { en: 'Hot & Spicy', te: 'కారం' } }
  ];

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <div className="filter-group">
          <label className={`filter-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            <AiOutlineFilter className="filter-icon" />
            {getText('Filter by Category', 'వర్గం ద్వారా ఫిల్టర్')}
          </label>
          <select
            className={`filter-select ${currentLanguage === 'te' ? 'font-telugu' : ''}`}
            value={selectedCategory || 'all'}
            onChange={(e) => onCategoryChange && onCategoryChange(e.target.value === 'all' ? null : e.target.value)}
            aria-label={getText('Filter by category', 'వర్గం ద్వారా ఫిల్టర్')}
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {currentLanguage === 'te' ? option.label.te : option.label.en}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className={`filter-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            <AiOutlineFilter className="filter-icon" />
            {getText('Filter by Size', 'సైజు ద్వారా ఫిల్టర్')}
          </label>
          <select
            className={`filter-select ${currentLanguage === 'te' ? 'font-telugu' : ''}`}
            value={sizeFilter}
            onChange={(e) => onSizeFilterChange(e.target.value)}
            aria-label={getText('Filter by size', 'సైజు ద్వారా ఫిల్టర్')}
          >
            {sizeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {currentLanguage === 'te' ? option.label.te : option.label.en}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className={`filter-label ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
            <AiOutlineSortAscending className="filter-icon" />
            {getText('Sort by', 'క్రమం')}
          </label>
          <select
            className={`filter-select ${currentLanguage === 'te' ? 'font-telugu' : ''}`}
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label={getText('Sort products', 'ప్రొడక్ట్స్ క్రమం')}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {currentLanguage === 'te' ? option.label.te : option.label.en}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Category Chips */}
      <div className="category-chips">
        <div className="chips-container">
          <button
            className={`category-chip ${(!selectedCategory || selectedCategory === 'all') ? 'active' : ''}`}
            onClick={() => onCategoryChange && onCategoryChange(null)}
            aria-label={getText('Show all categories', 'అన్ని వర్గాలు చూపించు')}
          >
            <span className={currentLanguage === 'te' ? 'font-telugu' : ''}>
              {getText('All', 'అన్నీ')}
            </span>
          </button>
          
          {categoryOptions.slice(1).map(option => (
            <button
              key={option.value}
              className={`category-chip ${selectedCategory === option.value ? 'active' : ''}`}
              onClick={() => onCategoryChange && onCategoryChange(option.value)}
              aria-label={`${getText('Filter by', 'ఫిల్టర్')} ${currentLanguage === 'te' ? option.label.te : option.label.en}`}
            >
              <span className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                {currentLanguage === 'te' ? option.label.te : option.label.en}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;