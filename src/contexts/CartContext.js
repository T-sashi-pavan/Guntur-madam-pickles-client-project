import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProductPrice } from '../data/products';

// Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Enhanced localStorage management with error handling
  const CART_STORAGE_KEY = 'guntur-madam-pickles-cart';
  
  // Validate and migrate cart data if needed
  const validateAndMigrateCartData = (cartData) => {
    if (!Array.isArray(cartData)) return [];
    
    return cartData.map(item => {
      // Ensure all required fields exist
      if (!item.cartItemId) {
        console.warn('Item missing cartItemId, generating new one:', item);
        item.cartItemId = `${item.productId || 'unknown'}-${Date.now()}`;
      }
      
      // Ensure item has type field
      if (!item.type) {
        item.type = item.comboType ? 'combo' : 'individual';
      }
      
      // Ensure numeric fields are numbers
      if (item.price) item.price = Number(item.price);
      if (item.quantity) item.quantity = Number(item.quantity);
      if (item.totalPrice) item.totalPrice = Number(item.totalPrice);
      if (item.finalPrice) item.finalPrice = Number(item.finalPrice);
      
      // Add version if missing
      if (!item.version) {
        item.version = '1.0';
      }
      
      return item;
    });
  };
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Validate and migrate cart data
        const validatedCart = validateAndMigrateCartData(parsedCart);
        if (validatedCart.length > 0) {
          setCartItems(validatedCart);
          console.log('Cart loaded from localStorage:', validatedCart.length, 'items');
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      if (cartItems.length > 0) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        console.log('Cart saved to localStorage:', cartItems.length, 'items');
      } else {
        // Remove from localStorage if cart is empty
        localStorage.removeItem(CART_STORAGE_KEY);
        console.log('Empty cart - localStorage cleared');
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
      // If localStorage is full or unavailable, show user feedback
      if (error.name === 'QuotaExceededError') {
        console.error('LocalStorage quota exceeded. Cart may not persist.');
        // Could implement IndexedDB fallback here if needed
      }
    }
  }, [cartItems]);

  // Debug: Log cart statistics when cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      const stats = {
        totalItems: cartItems.length,
        regularItems: cartItems.filter(item => item.type !== 'combo').length,
        combos: cartItems.filter(item => item.type === 'combo').length,
        totalValue: cartItems.reduce((sum, item) => sum + (item.totalPrice || item.finalPrice || 0), 0)
      };
      console.log('Cart Statistics:', stats);
    }
  }, [cartItems]);

  // Add combo to cart with enhanced data structure
  const addComboToCart = (comboData) => {
    const timestamp = Date.now();
    const comboId = `combo-${timestamp}-${Math.random().toString(36).substr(2, 9)}`;
    
    const comboItem = {
      cartItemId: comboId,
      type: 'combo',
      comboType: comboData.comboType,
      comboLabel: comboData.comboLabel,
      items: comboData.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        type: item.type,
        size: item.size || '250g'
      })),
      originalPrice: Number(comboData.originalPrice),
      discountPercentage: Number(comboData.discountPercentage),
      discountAmount: Number(comboData.discountAmount),
      finalPrice: Number(comboData.finalPrice),
      quantity: 1,
      totalPrice: Number(comboData.finalPrice),
      dateAdded: timestamp, // For potential future sorting/filtering
      version: '1.0' // For future compatibility
    };

    setCartItems(prevItems => {
      const updatedItems = [...prevItems, comboItem];
      console.log('Combo added to cart:', comboItem);
      return updatedItems;
    });
  };

  // Add item to cart with enhanced validation
  const addToCart = (product, size = '500g', quantity = 1) => {
    try {
      const price = getProductPrice(product.id, size);
      const cartItemId = `${product.id}-${size}`;
      
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.cartItemId === cartItemId);
        
        if (existingItem) {
          // Update quantity if item already exists
          const updatedItems = prevItems.map(item =>
            item.cartItemId === cartItemId
              ? { 
                  ...item, 
                  quantity: item.quantity + quantity,
                  totalPrice: item.price * (item.quantity + quantity)
                }
              : item
          );
          console.log('Updated existing item quantity:', cartItemId);
          return updatedItems;
        } else {
          // Add new item to cart with enhanced data structure
          const newItem = {
            cartItemId,
            type: 'individual',
            productId: product.id,
            name_en: product.name_en,
            name_te: product.name_te,
            category: product.category,
            size,
            quantity: Number(quantity),
            price: Number(price),
            image: product.image,
            totalPrice: Number(price * quantity),
            dateAdded: Date.now(),
            version: '1.0'
          };
          console.log('Added new item to cart:', newItem);
          return [...prevItems, newItem];
        }
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw new Error('Failed to add item to cart');
    }
  };

  // Remove item from cart (handles both individual items and combos)
  const removeFromCart = (cartItemId) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.cartItemId === cartItemId);
      if (itemToRemove) {
        console.log('Removing item from cart:', itemToRemove.type, cartItemId);
      }
      return prevItems.filter(item => item.cartItemId !== cartItemId);
    });
  };

  // Update item quantity (only for individual items, combos have fixed quantity of 1)
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.cartItemId === cartItemId) {
          // Only allow quantity updates for individual items, not combos
          if (item.type === 'combo') {
            console.warn('Cannot update quantity for combo items');
            return item;
          }
          
          const updatedItem = { 
            ...item, 
            quantity: Number(newQuantity),
            totalPrice: item.price * Number(newQuantity)
          };
          console.log('Updated item quantity:', cartItemId, 'to', newQuantity);
          return updatedItem;
        }
        return item;
      })
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    console.log('Cart cleared');
  };

  // Get total number of items in cart (including combo items)
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => {
      if (item.type === 'combo') {
        // For combos, count the number of individual items in the combo
        return total + (item.items?.length || 1);
      }
      return total + (item.quantity || 1);
    }, 0);
  };

  // Get total price of all items in cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.totalPrice || item.finalPrice || 0);
    }, 0);
  };

  // Check if product with specific size is in cart
  const isInCart = (productId, size = '500g') => {
    const cartItemId = `${productId}-${size}`;
    return cartItems.some(item => item.cartItemId === cartItemId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId, size = '500g') => {
    const cartItemId = `${productId}-${size}`;
    const item = cartItems.find(item => item.cartItemId === cartItemId);
    return item ? item.quantity : 0;
  };

  // Toggle cart drawer visibility
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Open cart drawer
  const openCart = () => {
    setIsCartOpen(true);
  };

  // Close cart drawer
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Generate WhatsApp message for checkout
  const generateWhatsAppMessage = (customerInfo = {}) => {
    const { name = '', phone = '', address = '' } = customerInfo;
    
    let message = "Hello Guntur Madam Pickles,\nI want to order:\n\n";
    
    // Separate regular items and combos
    const regularItems = cartItems.filter(item => item.type !== 'combo');
    const comboItems = cartItems.filter(item => item.type === 'combo');
    
    // Add regular items
    if (regularItems.length > 0) {
      message += "🥒 INDIVIDUAL ITEMS:\n";
      regularItems.forEach(item => {
        message += `• ${item.name_en} - ${item.size} - Qty: ${item.quantity} - ₹${item.totalPrice}\n`;
      });
      message += "\n";
    }
    
    // Add combo items
    if (comboItems.length > 0) {
      message += "🎯 COMBO SPECIALS:\n";
      comboItems.forEach(combo => {
        message += `• ${combo.comboLabel} (${combo.discountPercentage}% OFF) - ₹${combo.finalPrice}\n`;
        message += "  Items included:\n";
        combo.items.forEach(item => {
          message += `    - ${item.name} (250g)\n`;
        });
        message += "\n";
      });
    }
    
    message += `Total items: ${getTotalItems()}\n`;
    message += `Total amount: ₹${getTotalPrice()}\n\n`;
    
    if (name) message += `Name: ${name}\n`;
    if (phone) message += `Phone: ${phone}\n`;
    if (address) message += `Address: ${address}\n`;
    
    return message;
  };

  // Generate WhatsApp checkout URL
  const getWhatsAppCheckoutUrl = (customerInfo = {}) => {
    const phoneNumber = '9177027 21323'; // Remove + and spaces
    const message = generateWhatsAppMessage(customerInfo);
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  // Get cart statistics
  const getCartStatistics = () => {
    const regularItems = cartItems.filter(item => item.type !== 'combo');
    const comboItems = cartItems.filter(item => item.type === 'combo');
    
    return {
      totalItems: cartItems.length,
      regularItemsCount: regularItems.length,
      comboItemsCount: comboItems.length,
      totalProductCount: getTotalItems(),
      totalValue: getTotalPrice(),
      lastUpdated: cartItems.length > 0 ? Math.max(...cartItems.map(item => item.dateAdded || 0)) : null
    };
  };

  // Export cart data for backup/debugging
  const exportCartData = () => {
    const cartData = {
      items: cartItems,
      statistics: getCartStatistics(),
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(cartData, null, 2);
  };

  // Check if localStorage is available and working
  const isStorageAvailable = () => {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  };

  const value = {
    cartItems,
    cart: cartItems, // Alias for backward compatibility
    isCartOpen,
    addToCart,
    addComboToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    getItemQuantity,
    toggleCart,
    openCart,
    closeCart,
    generateWhatsAppMessage,
    getFormattedWhatsAppMessage: generateWhatsAppMessage, // Alias for backward compatibility
    getWhatsAppCheckoutUrl,
    getCartStatistics,
    exportCartData,
    isStorageAvailable
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;