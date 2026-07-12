import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SEO = ({ title, description, keywords, canonical, image, type = 'website', schemas = [] }) => {
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    // 1. Update Title
    const baseTitle = 'Guntur Madam Pickles';
    const fullTitle = title ? `${title} | ${baseTitle}` : `${baseTitle} - Authentic Andhra Traditional Pickles & Specials`;
    document.title = fullTitle;

    // Helper to manage meta tags
    const setMetaTag = (attr, name, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Helper to manage link tags
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (element) {
        element.setAttribute('href', href);
      } else {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        element.setAttribute('href', href);
        document.head.appendChild(element);
      }
    };

    // 2. Set dynamic HTML attributes and basic SEO tags
    document.documentElement.setAttribute('lang', currentLanguage || 'en');
    setMetaTag('name', 'theme-color', '#f2934b');
    setMetaTag('name', 'description', description || 'Authentic traditional Andhra pickles, spice powders, and sweets made in Guntur. Prepared using pure ingredients and traditional recipes.');
    setMetaTag('name', 'keywords', keywords || 'pickles, Guntur pickles, Andhra traditional pickles, karam podulu, sweets, organic pickles');
    setMetaTag('name', 'robots', 'index, follow');

    // Canonical link
    const currentUrl = canonical || window.location.href;
    setLinkTag('canonical', currentUrl);

    // Open Graph Tags
    setMetaTag('property', 'og:title', title || baseTitle);
    setMetaTag('property', 'og:description', description || 'Authentic traditional Andhra pickles made in Guntur.');
    setMetaTag('property', 'og:image', image || 'https://gunturmadampickles.live/logo512.webp');
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', baseTitle);

    // Twitter Cards Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title || baseTitle);
    setMetaTag('name', 'twitter:description', description || 'Authentic traditional Andhra pickles made in Guntur.');
    setMetaTag('name', 'twitter:image', image || 'https://gunturmadampickles.live/logo512.webp');

    // 3. Inject Schema.org JSON-LD Structured Data
    // Clean up old dynamic schemas
    const oldScripts = document.querySelectorAll('script.seo-json-ld');
    oldScripts.forEach(script => script.remove());

    // Normalize and inject schemas
    const schemaList = Array.isArray(schemas) ? schemas : [schemas].filter(Boolean);
    schemaList.forEach((schema, index) => {
      if (!schema) return;
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.className = 'seo-json-ld';
      script.id = `seo-json-ld-${index}`;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup scripts on route change / component unmount
    return () => {
      const scripts = document.querySelectorAll('script.seo-json-ld');
      scripts.forEach(script => script.remove());
    };
  }, [title, description, keywords, canonical, image, type, schemas, currentLanguage]);

  return null;
};

export default SEO;
