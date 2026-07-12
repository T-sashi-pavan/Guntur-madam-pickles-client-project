// Reusable Google Analytics 4 (GA4) Utility

let isInitialized = false;

// Retrieve the Measurement ID from environment variables
export const getMeasurementId = () => {
  if (typeof window !== 'undefined') {
    return (
      process.env.REACT_APP_GA_MEASUREMENT_ID ||
      process.env.VITE_GA_MEASUREMENT_ID ||
      window.GA_MEASUREMENT_ID
    );
  }
  return null;
};

// Initialize Google Analytics 4 tag
export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;

  // Prevent duplicate initialization
  if (isInitialized || window.ga_initialized) {
    return;
  }

  const measurementId = getMeasurementId();

  if (!measurementId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'Google Analytics 4 Measurement ID is missing. Analytics will not track.'
      );
    }
    return;
  }

  try {
    // Inject the Google Tag script element
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Set up dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());

    // Configure the Google Analytics tracker.
    // In a SPA, we disable automatic page view tracking to avoid double page views.
    window.gtag('config', measurementId, {
      send_page_view: false,
    });

    isInitialized = true;
    window.ga_initialized = true;

    if (process.env.NODE_ENV === 'development') {
      console.log(`GA4 successfully initialized with ID: ${measurementId}`);
    }
  } catch (error) {
    console.error('Error during Google Analytics 4 initialization:', error);
  }
};

// General track event wrapper
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const measurementId = getMeasurementId();
    if (!measurementId) return;

    try {
      window.gtag('event', eventName, {
        send_to: measurementId,
        ...parameters,
      });
      if (process.env.NODE_ENV === 'development') {
        console.log(`GA4 Event tracked: ${eventName}`, parameters);
      }
    } catch (error) {
      console.error(`Error tracking event ${eventName}:`, error);
    }
  }
};

// Track Page Views
export const trackPageView = (path) => {
  if (typeof window !== 'undefined') {
    trackEvent('page_view', {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// --- E-Commerce and Custom Event Helpers ---

// View product details
export const trackProductView = (product) => {
  if (!product) return;
  const price = product.price || (product.prices ? (product.prices['250g'] || product.prices['500g'] || product.prices['1kg']) : 0);
  trackEvent('view_item', {
    currency: 'INR',
    value: Number(price),
    items: [
      {
        item_id: String(product.id),
        item_name: product.name_en || product.name,
        item_category: product.category,
        price: Number(price),
        quantity: 1,
      },
    ],
  });
};

// Add item to cart
export const trackAddToCart = (product, size = '500g', quantity = 1) => {
  if (!product) return;
  const price = product.price || (product.prices ? (product.prices[size] || product.prices['250g'] || product.prices['500g'] || product.prices['1kg']) : 0);
  trackEvent('add_to_cart', {
    currency: 'INR',
    value: Number(price * quantity),
    items: [
      {
        item_id: String(product.id),
        item_name: product.name_en || product.name,
        item_category: product.category,
        item_variant: size,
        price: Number(price),
        quantity: Number(quantity),
      },
    ],
  });
};

// Remove item from cart
export const trackRemoveFromCart = (product, size = '500g', quantity = 1) => {
  if (!product) return;
  const price = product.price || (product.prices ? (product.prices[size] || product.prices['250g'] || product.prices['500g'] || product.prices['1kg']) : 0);
  trackEvent('remove_from_cart', {
    currency: 'INR',
    value: Number(price * quantity),
    items: [
      {
        item_id: String(product.id),
        item_name: product.name_en || product.name,
        item_category: product.category,
        item_variant: size,
        price: Number(price),
        quantity: Number(quantity),
      },
    ],
  });
};

// Begin checkout process
export const trackBeginCheckout = (cartItems = [], totalPrice = 0) => {
  const items = cartItems.map((item) => {
    const itemId = item.productId || item.id || item.cartItemId;
    const price = item.price || item.finalPrice || 0;
    return {
      item_id: String(itemId),
      item_name: item.name_en || item.comboLabel || item.name,
      item_category: item.category || (item.type === 'combo' ? 'Combo Special' : ''),
      item_variant: item.size || '',
      price: Number(price),
      quantity: Number(item.quantity || 1),
    };
  });

  trackEvent('begin_checkout', {
    currency: 'INR',
    value: Number(totalPrice),
    items: items,
  });
};

// Purchase / checkout completed via WhatsApp redirect
export const trackPurchase = (order) => {
  if (!order) return;
  const items = (order.items || []).map((item) => {
    const itemId = item.productId || item.id || item.cartItemId;
    const price = item.price || item.finalPrice || 0;
    return {
      item_id: String(itemId),
      item_name: item.name_en || item.comboLabel || item.name,
      item_category: item.category || (item.type === 'combo' ? 'Combo Special' : ''),
      item_variant: item.size || '',
      price: Number(price),
      quantity: Number(item.quantity || 1),
    };
  });

  trackEvent('purchase', {
    transaction_id: order.transactionId || `order_${Date.now()}`,
    value: Number(order.totalPrice || order.value || 0),
    currency: 'INR',
    items: items,
  });
};

// Track search query
export const trackSearch = (query) => {
  trackEvent('search', {
    search_term: query,
  });
};

// Track contact details clicks
export const trackContact = (method = 'general') => {
  trackEvent('contact', {
    method: method,
  });
};

// Track WhatsApp chat/redirect click
export const trackWhatsAppClick = (type = 'general') => {
  trackEvent('whatsapp_click', {
    click_type: type,
  });
};

// Track direct phone call click
export const trackPhoneCall = () => {
  trackEvent('phone_call', {
    event_category: 'engagement',
  });
};

// Track view category list
export const trackCategoryView = (category) => {
  trackEvent('view_item_list', {
    item_list_name: category,
  });
};
