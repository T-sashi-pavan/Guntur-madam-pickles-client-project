// Schema.org Structured Data Helper Functions
// Validates details according to Google Rich Results specifications.

const SITE_URL = 'https://gunturmadampickles.live';
const BUSINESS_NAME = 'Guntur Madam Pickles';
const LOGO_URL = `${SITE_URL}/logo512.webp`;

// 1. Website Schema
export const getWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": BUSINESS_NAME,
    "url": SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
};

// 2. Organization Schema
export const getOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BUSINESS_NAME,
    "url": SITE_URL,
    "logo": LOGO_URL,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7702721323",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Telugu"]
    },
    "sameAs": [
      "https://wa.me/917702721323"
    ]
  };
};

// 3. LocalBusiness & FoodEstablishment Schema (Combined for optimal local SEO representation)
export const getLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${SITE_URL}/#localbusiness`,
    "name": BUSINESS_NAME,
    "image": LOGO_URL,
    "url": SITE_URL,
    "telephone": "+917702721323",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Guntur",
      "addressLocality": "Guntur",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "522001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "16.3067",
      "longitude": "80.4365"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    }
  };
};

// 4. Product Schema
export const getProductSchema = (product, size = '500g') => {
  if (!product) return null;
  const price = product.price || (product.prices ? (product.prices[size] || product.prices['250g'] || product.prices['500g'] || product.prices['1kg']) : 0);
  const image = product.image ? (product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`) : LOGO_URL;
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name_en || product.name || '',
    "image": image,
    "description": product.description_en || product.description || `Authentic ${product.name_en || 'pickle'} from Guntur, Andhra Pradesh.`,
    "brand": {
      "@type": "Brand",
      "name": BUSINESS_NAME
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}/product/${product.id}`,
      "priceCurrency": "INR",
      "price": Number(price),
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    }
  };
};

// 5. Breadcrumb Schema
export const getBreadcrumbSchema = (crumbs = []) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url ? `${SITE_URL}${crumb.url}` : SITE_URL
    }))
  };
};

// 6. FAQPage Schema
export const getFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are Guntur Madam Pickles genuinely homemade and authentic Andhra style?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Guntur Madam Pickles are 100% homemade in Guntur, Andhra Pradesh, following traditional age-old recipes. We use premium wood-pressed oils, hand-ground spices, and organic produce without any artificial preservatives or colors."
        }
      },
      {
        "@type": "Question",
        "name": "Do you deliver pickles across India and internationally?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we ship our authentic pickles all across India. For international orders, please contact us directly on WhatsApp to coordinate delivery and custom shipping rates."
        }
      },
      {
        "@type": "Question",
        "name": "What varieties of pickles do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a wide range of vegetarian pickles (like Andhra Avakaya, Allam, Cashew, Cauliflower, Gongura, Usirikaya), non-vegetarian pickles (Chicken, Mutton, Prawns), as well as traditional spice powders (Karam Podulu) and Andhra sweets."
        }
      },
      {
        "@type": "Question",
        "name": "How can I place an order?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can easily browse and select your favorite products on our website, select the desired package size, add them to your cart, and proceed to checkout. The checkout will direct you to WhatsApp, where you can finalize payment and share your shipping address with us."
        }
      },
      {
        "@type": "Question",
        "name": "How should I store the pickles to ensure they stay fresh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To maximize shelf life, store the pickles in a cool, dry place inside an airtight glass or ceramic container. Always use a clean, dry spoon to serve. If handled correctly, our pickles can stay fresh for up to 6–12 months."
        }
      }
    ]
  };
};

