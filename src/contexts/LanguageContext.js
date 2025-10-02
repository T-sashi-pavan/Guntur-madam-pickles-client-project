import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

// Language Context
const LanguageContext = createContext();

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'te')) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const changeLanguage = (language) => {
    if (language === 'en' || language === 'te') {
      setCurrentLanguage(language);
      localStorage.setItem('preferred-language', language);
    }
  };

  // Toggle between English and Telugu
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'te' : 'en';
    changeLanguage(newLanguage);
  };

  // Translation function
  const t = (key, params = {}) => {
    const translation = translations[currentLanguage][key] || translations['en'][key] || key;
    
    // Replace parameters in translation string
    if (params && typeof translation === 'string') {
      return Object.keys(params).reduce((str, param) => {
        return str.replace(`{${param}}`, params[param]);
      }, translation);
    }
    
    return translation;
  };

  // Get text based on current language (legacy support)
  const getText = (englishText, teluguText) => {
    return currentLanguage === 'te' ? teluguText : englishText;
  };

  // Get product name based on current language
  const getProductName = (product) => {
    return currentLanguage === 'te' ? product.name_te : product.name_en;
  };

  // Get product description based on current language
  const getProductDescription = (product) => {
    return currentLanguage === 'te' ? product.description_te : product.description_en;
  };

  const value = {
    language: currentLanguage,
    currentLanguage, // For backward compatibility
    changeLanguage,
    toggleLanguage,
    getText,
    getProductName,
    getProductDescription,
    t, // New translation function
    isEnglish: currentLanguage === 'en',
    isTelugu: currentLanguage === 'te'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};