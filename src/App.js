import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Context Providers
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';

// Components
import Navbar from './components/Header';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import AnalyticsTracker from './components/AnalyticsTracker';

// Lazy Loaded Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));



function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Handle product modal
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  // Handle cart drawer
  const handleCartToggle = () => {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  };

  const closeCartDrawer = () => {
    setIsCartDrawerOpen(false);
  };

  // Handle escape key to close modals
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isProductModalOpen) {
          closeProductModal();
        } else if (isCartDrawerOpen) {
          closeCartDrawer();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isProductModalOpen, isCartDrawerOpen]);

  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <AnalyticsTracker />
          <div className="App">
            {/* Navigation */}
            <Navbar onCartToggle={handleCartToggle} />

            {/* Main Content */}
            <main className="main-content">
              <Suspense fallback={
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '50vh',
                  fontSize: '1.2rem',
                  color: '#6e4c38',
                  fontWeight: '500'
                }}>
                  <div className="loading-spinner" style={{ marginRight: '10px' }}></div>
                  Loading Guntur Madam Pickles...
                </div>
              }>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/category/:category" element={<CategoryPage onProductClick={handleProductClick} />} />
                  <Route path="/search" element={<SearchResults onProductClick={handleProductClick} />} />
                  <Route path="/product/:id" element={<ProductDetailsPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Routes>
              </Suspense>
            </main>

            {/* Footer */}
            <Footer />

            {/* Modals and Overlays */}
            <ProductModal 
              product={selectedProduct}
              isOpen={isProductModalOpen}
              onClose={closeProductModal}
            />

            <CartDrawer 
              isOpen={isCartDrawerOpen}
              onClose={closeCartDrawer}
            />
          </div>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
