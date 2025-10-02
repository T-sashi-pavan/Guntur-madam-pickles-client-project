import React, { useState, useEffect } from 'react';
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

// Pages
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchResults from './pages/SearchResults';
import ProductDetailsPage from './pages/ProductDetailsPage';

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
          <div className="App">
            {/* Navigation */}
            <Navbar onCartToggle={handleCartToggle} />

            {/* Main Content */}
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:category" element={<CategoryPage onProductClick={handleProductClick} />} />
                <Route path="/search" element={<SearchResults onProductClick={handleProductClick} />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
              </Routes>
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
