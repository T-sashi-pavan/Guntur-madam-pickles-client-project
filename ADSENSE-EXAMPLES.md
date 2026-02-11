# Quick AdSense Implementation Examples
## Copy-Paste Ready Code for Your Pickle Website

---

## 🎯 STEP 1: Get Your Ad Slot IDs

1. Login to **Google AdSense**: https://www.google.com/adsense
2. Go to **Ads** → **By ad unit**
3. Click **"New ad unit"** and create:
   - **Banner Ad** (horizontal)
   - **Rectangle Ad** (square)
   - **Sidebar Ad** (vertical)
4. Copy each **Ad Slot ID** (example: `1234567890`)
5. Replace `YOUR_AD_SLOT_ID_HERE` in the code below with your actual IDs

---

## 📄 EXAMPLE 1: HomePage with Multiple Ads

```jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import AdSense from '../components/AdSense';
import AllProductsSection from '../components/AllProductsSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      
      {/* Top Banner - Good visibility, high CTR */}
      <AdSense 
        adSlot="1234567890"  // ← Replace with your banner ad slot ID
        adFormat="horizontal" 
      />
      
      <About />
      
      {/* Mid-page Rectangle - Engaging position */}
      <AdSense 
        adSlot="0987654321"  // ← Replace with your rectangle ad slot ID
        adFormat="rectangle" 
      />
      
      <AllProductsSection />
      
      {/* Bottom Banner - Catch users scrolling down */}
      <AdSense 
        adSlot="5555555555"  // ← Replace with another banner ad slot ID
        adFormat="horizontal" 
      />
    </div>
  );
};

export default HomePage;
```

---

## 🛍️ EXAMPLE 2: Product Details Page with Sidebar Ad

```jsx
import React from 'react';
import AdSense from '../components/AdSense';

const ProductDetailsPage = () => {
  return (
    <div style={styles.container}>
      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1>Andhra Avakaya Pickle</h1>
        <img src="product-image.jpg" alt="Product" />
        <p>Product description...</p>
        
        {/* Mobile: Ad between content */}
        <div style={styles.mobileAd}>
          <AdSense 
            adSlot="3333333333" 
            adFormat="rectangle" 
          />
        </div>
        
        <button>Add to Cart</button>
      </div>
      
      {/* Desktop: Sidebar Ad */}
      <aside style={styles.sidebar}>
        <AdSense 
          adSlot="4444444444"  // ← Vertical/sidebar ad slot ID
          adFormat="vertical" 
        />
      </aside>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  mainContent: {
    flex: '2',
  },
  sidebar: {
    flex: '1',
    display: 'none', // Hidden on mobile
    '@media (min-width: 768px)': {
      display: 'block',
    }
  },
  mobileAd: {
    display: 'block',
    margin: '20px 0',
    '@media (min-width: 768px)': {
      display: 'none', // Hidden on desktop
    }
  }
};

export default ProductDetailsPage;
```

---

## 📱 EXAMPLE 3: Search Results with In-Feed Ads

```jsx
import React from 'react';
import AdSense from '../components/AdSense';
import ProductCard from '../components/ProductCard';

const SearchResults = ({ products }) => {
  return (
    <div>
      <h2>Search Results</h2>
      
      <div style={styles.grid}>
        {products.map((product, index) => (
          <React.Fragment key={product.id}>
            {/* Show product */}
            <ProductCard product={product} />
            
            {/* Insert ad after every 6 products */}
            {(index + 1) % 6 === 0 && (
              <div style={styles.gridAd}>
                <AdSense 
                  adSlot="7777777777" 
                  adFormat="rectangle" 
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  gridAd: {
    gridColumn: '1 / -1', // Span all columns
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  }
};

export default SearchResults;
```

---

## 🍽️ EXAMPLE 4: ComboSection with Ads

Add this to your ComboSection.jsx:

```jsx
import AdSense from './AdSense';

// Inside your ComboSection component, add before the summary:

return (
  <div style={styles.comboSection}>
    <h2>Customize Your Pickle Combo</h2>
    
    {/* Combo options */}
    <div style={styles.comboOptionsContainer}>
      {/* ... combo selection code ... */}
    </div>
    
    {/* Products Display */}
    <div style={styles.productsContainer}>
      {/* Veg Pickles */}
      <div style={styles.categorySection}>
        {/* ... veg pickles ... */}
      </div>
      
      {/* AD PLACEMENT: Between veg and non-veg sections */}
      <AdSense 
        adSlot="8888888888" 
        adFormat="horizontal" 
        style={{ margin: '40px 0' }}
      />
      
      {/* Non-Veg Pickles */}
      {currentCombo.type === 'mixed' && (
        <div style={styles.categorySection}>
          {/* ... non-veg pickles ... */}
        </div>
      )}
    </div>
    
    {/* Price Summary */}
    <div style={styles.summaryContainer}>
      {/* ... summary ... */}
    </div>
  </div>
);
```

---

## 🎨 EXAMPLE 5: Footer with Banner Ad

```jsx
import React from 'react';
import AdSense from './AdSense';

const Footer = () => {
  return (
    <>
      {/* Pre-footer ad banner */}
      <div style={styles.preFooterAd}>
        <AdSense 
          adSlot="9999999999" 
          adFormat="horizontal" 
        />
      </div>
      
      {/* Actual Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <h3>Guntur Madam Pickles</h3>
          <p>© 2026 All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
};

const styles = {
  preFooterAd: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: '20px 0',
    borderTop: '1px solid #ddd',
  },
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '40px 20px',
    textAlign: 'center',
  }
};

export default Footer;
```

---

## 📊 Ad Format Reference

| Format | Best For | Typical Size | adFormat Value |
|--------|----------|--------------|----------------|
| **Horizontal Banner** | Header, between sections | 728x90, 970x90 | `"horizontal"` |
| **Rectangle** | Sidebar, mid-content | 300x250, 336x280 | `"rectangle"` |
| **Vertical** | Sidebar (desktop) | 160x600, 300x600 | `"vertical"` |
| **Auto/Responsive** | Any location | Adapts to space | `"auto"` |

---

## 🚀 Deployment Steps

1. **Replace all ad slot IDs** with your actual IDs from AdSense
2. **Test locally** (you'll see placeholder boxes)
3. **Build for production**:
   ```bash
   npm run build
   ```
4. **Deploy to your live site**
5. **Wait 10-15 minutes** for ads to start showing
6. **Test in incognito mode** (don't click your own ads!)

---

## ⚡ Pro Tips

### Optimal Ad Placement:
- ✅ **Above the fold**: First ad should be visible without scrolling
- ✅ **Between content**: Natural breaks in content
- ✅ **Sidebar**: Desktop users expect ads there
- ✅ **End of content**: Catch users who scroll to bottom

### Avoid:
- ❌ Too many ads (max 3-5 per page)
- ❌ Ads too close together
- ❌ Ads that disrupt user experience
- ❌ Accidental clicks (bad for account health)

### Performance:
- Use **lazy loading** for ads below the fold
- Use **responsive formats** for mobile
- **Monitor CTR** and remove low-performing ads
- **A/B test** different placements

---

## 📈 Expected Results

### Timeline:
- **Week 1-2**: Account approval pending (no ads show yet)
- **Week 3**: First ads appear, low revenue ($1-5/day)
- **Month 2**: Revenue grows as Google learns ($5-20/day)
- **Month 3+**: Optimized revenue based on traffic ($20-100+/day)

### Revenue depends on:
- **Traffic volume**: More visitors = more impressions
- **Traffic quality**: Engaged users = higher CTR
- **Ad placement**: Strategic placement = better performance
- **Content niche**: Food/recipe sites typically earn $2-8 per 1000 visitors

---

## 🔍 Troubleshooting

### "Ads not showing on live site"
- Wait 10-15 minutes after deployment
- Check AdSense account status (must be approved)
- Verify ad slot IDs are correct
- Clear browser cache, try incognito mode
- Check browser console for errors

### "Seeing blank spaces"
- Make sure you're in production mode (`npm run build`)
- Disable ad blockers when testing
- Check if `process.env.NODE_ENV === 'production'`

### "Low earnings"
- Increase website traffic (SEO, social media)
- Optimize ad placements (move poorly performing ads)
- Try different ad formats
- Ensure mobile-friendly design

---

## 📞 Support

- **AdSense Help**: https://support.google.com/adsense
- **Community Forum**: https://support.google.com/adsense/community
- **Policy Center**: https://support.google.com/adsense/answer/48182

---

**Ready to go? Just replace the ad slot IDs and deploy!** 🎉
