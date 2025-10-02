import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineClear } from 'react-icons/ai';
import { useLanguage } from '../contexts/LanguageContext';
import { PRODUCTS } from '../data/products';
import './LiveSearch.css';

const LiveSearch = ({ isOpen, onClose, className }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();
  const { getText, currentLanguage } = useLanguage();

  // Memoized search function for performance
  const searchProducts = useMemo(() => {
    const searchFn = (searchQuery) => {
      if (!searchQuery || searchQuery.length < 1) {
        return [];
      }

      const normalizedQuery = searchQuery.toLowerCase().trim();
      const results = [];

      PRODUCTS.forEach(product => {
        const nameEn = product.name_en?.toLowerCase() || '';
        const nameTe = product.name_te?.toLowerCase() || '';
        const descriptionEn = product.description_en?.toLowerCase() || '';
        const descriptionTe = product.description_te?.toLowerCase() || '';
        const category = product.category?.toLowerCase() || '';

        // Calculate relevance score
        let score = 0;
        
        // Exact matches get highest priority
        if (nameEn.includes(normalizedQuery) || nameTe.includes(normalizedQuery)) {
          score += 100;
        }
        
        // Starting matches get high priority
        if (nameEn.startsWith(normalizedQuery) || nameTe.startsWith(normalizedQuery)) {
          score += 80;
        }
        
        // Description matches get medium priority
        if (descriptionEn.includes(normalizedQuery) || descriptionTe.includes(normalizedQuery)) {
          score += 50;
        }
        
        // Category matches get lower priority
        if (category.includes(normalizedQuery)) {
          score += 30;
        }

        // Special scoring for common search terms
        const commonTerms = {
          'm': ['mango', 'masala', 'mixed'],
          'p': ['pickle', 'powder'],
          'k': ['karam', 'karela'],
          'a': ['andhra', 'avakaya', 'amla'],
          'g': ['garlic', 'ginger', 'gongura'],
          'l': ['lemon', 'lime'],
          't': ['tomato', 'turmeric']
        };

        if (commonTerms[normalizedQuery]) {
          commonTerms[normalizedQuery].forEach(term => {
            if (nameEn.includes(term) || nameTe.includes(term)) {
              score += 60;
            }
          });
        }

        if (score > 0) {
          results.push({
            ...product,
            relevanceScore: score
          });
        }
      });

      // Sort by relevance score and limit results
      return results
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 8);
    };

    return searchFn;
  }, []);

  // Handle search input changes with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        const results = searchProducts(query);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
        setActiveSuggestion(-1);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 150); // Fast debounce for real-time feel

    return () => clearTimeout(timeoutId);
  }, [query, searchProducts]);

  // Focus input when component opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
          handleSuggestionClick(suggestions[activeSuggestion]);
        } else if (query.trim()) {
          handleSearchSubmit();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        onClose?.();
        break;
      default:
        // No action for other keys
        break;
    }
  };

  const handleSuggestionClick = (product) => {
    // Clear search state first
    setQuery('');
    setShowSuggestions(false);
    onClose?.();
    
    // Navigate to product details page with a slight delay to ensure state updates
    setTimeout(() => {
      navigate(`/product/${product.id}`);
    }, 50);
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
      setShowSuggestions(false);
      onClose?.();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const getProductPrice = (product) => {
    if (product.prices) {
      const sizes = Object.keys(product.prices);
      const minPrice = Math.min(...Object.values(product.prices));
      return `₹${minPrice}${sizes.length > 1 ? '+' : ''}`;
    }
    return '₹0';
  };

  if (!isOpen) return null;

  return (
    <div className={`live-search-container ${className || ''}`}>
      <div className="search-input-wrapper">
        {/* <AiOutlineSearch className="search-icon" /> */}
        <input
          ref={searchInputRef}
          type="text"
          className={`search-input ${currentLanguage === 'te' ? 'font-telugu' : ''}`}
          placeholder={getText('Search pickles, powders, sweets...', 'పచ్చడలు, పొడులు, స్వీట్లు వెతకండి...')}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        {query && (
          <button 
            className="clear-search-btn"
            onClick={clearSearch}
            aria-label={getText('Clear search', 'శోధనను క్లియర్ చేయండి')}
          >
            <AiOutlineClear />
          </button>
        )}
      </div>

      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="search-suggestions"
          role="listbox"
        >
          <div className="suggestions-header">
            <span className={currentLanguage === 'te' ? 'font-telugu' : ''}>
              {getText(`${suggestions.length} products found`, `${suggestions.length} ఉత్పత్తులు దొరికాయి`)}
            </span>
          </div>
          
          {suggestions.map((product, index) => (
            <div
              key={product.id}
              className={`suggestion-item ${index === activeSuggestion ? 'active' : ''}`}
              onClick={() => handleSuggestionClick(product)}
              onMouseEnter={() => setActiveSuggestion(index)}
              role="option"
              aria-selected={index === activeSuggestion}
            >
              <div className="suggestion-image">
                <img 
                  src={product.image} 
                  alt={currentLanguage === 'te' ? product.name_te : product.name_en}
                  loading="lazy"
                />
              </div>
              
              <div className="suggestion-content">
                <div className="suggestion-header">
                  <h4 className={`suggestion-title ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
                    {currentLanguage === 'te' ? product.name_te : product.name_en}
                  </h4>
                  <span className="suggestion-price">
                    {getProductPrice(product)}
                  </span>
                </div>
                
                <div className="suggestion-meta">
                  {product.prices && (
                    <span className="size-info">
                      {Object.keys(product.prices).join(', ')}
                    </span>
                  )}
                </div>
              </div>

              <div className="suggestion-action">
                <span className={`view-details ${currentLanguage === 'te' ? 'font-telugu' : ''}`}>
                  {getText('View', 'చూడు')}
                </span>
              </div>
            </div>
          ))}

          {query.trim() && (
            <div className="search-all-option" onClick={handleSearchSubmit}>
              <AiOutlineSearch className="search-all-icon" />
              <span className={currentLanguage === 'te' ? 'font-telugu' : ''}>
                {getText(`Search all products for "${query}"`, `"${query}" కోసం అన్ని ఉత్పత్తులను వెతకండి`)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Background overlay for mobile */}
      <div className="search-overlay" onClick={onClose} />
    </div>
  );
};

export default LiveSearch;