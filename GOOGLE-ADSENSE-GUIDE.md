# Google AdSense Integration Guide
## Guntur Madam Pickles Website

---

## ✅ STEP 1: Script Added to Website
The Google AdSense script has been added to your website's `public/index.html` file in the `<head>` section.

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5617473918245706"
     crossorigin="anonymous"></script>
```

**Status:** ✅ **COMPLETED**

---

## 📋 STEP 2: Complete Google AdSense Setup

### 2.1 Wait for Google's Approval
1. **Login** to your Google AdSense account: https://www.google.com/adsense
2. **Site Verification**: Google will verify that the script is on your site (this can take 24-48 hours)
3. **Account Review**: Google will review your site for compliance (can take 1-2 weeks):
   - Original content ✅
   - Good user experience ✅
   - Sufficient content ✅
   - Privacy policy (you should add one)
   - Terms and conditions

### 2.2 Create Ad Units (After Approval)
Once your site is approved, you need to create ad units:

1. Go to **AdSense Dashboard** → **Ads** → **By ad unit**
2. Click **"New ad unit"**
3. Choose ad type:
   - **Display ads** (recommended for your site)
   - **In-feed ads** (for product listings)
   - **In-article ads** (for blog posts if you add them)
4. Customize the ad:
   - **Name**: "Homepage Banner" / "Product Page Sidebar" etc.
   - **Ad size**: Responsive (recommended)
5. Click **"Create"**
6. **Copy the Ad Slot ID** (looks like: `1234567890`)

---

## 🎯 STEP 3: Place Ads on Your Website

### Where to Place Ads (Best Locations)

#### Option 1: HomePage.jsx - Top Banner
Add a banner ad below the hero section:

```jsx
import AdSense from '../components/AdSense';

function HomePage() {
  return (
    <div>
      <HeroSection />
      
      {/* Ad Banner after hero */}
      <AdSense 
        adSlot="YOUR_AD_SLOT_ID_HERE" 
        adFormat="horizontal" 
      />
      
      <ComboSection />
      {/* ... rest of content */}
    </div>
  );
}
```

#### Option 2: ComboSection.jsx - Between Content
Add ads between product sections:

```jsx
import AdSense from './AdSense';

// Inside ComboSection component, add after product listings:
<div style={styles.productsContainer}>
  {/* Veg Pickles */}
  <div style={styles.categorySection}>
    {/* ... veg pickles grid ... */}
  </div>

  {/* Ad between sections */}
  <AdSense 
    adSlot="YOUR_AD_SLOT_ID_HERE" 
    adFormat="rectangle" 
  />

  {/* Non-Veg Pickles */}
  {currentCombo.type === 'mixed' && (
    <div style={styles.categorySection}>
      {/* ... non-veg pickles grid ... */}
    </div>
  )}
</div>
```

#### Option 3: ProductDetailsPage.jsx - Sidebar
Add a sidebar ad on product pages:

```jsx
import AdSense from '../components/AdSense';

// In the product details layout
<div style={{ display: 'flex', gap: '20px' }}>
  <div style={{ flex: 2 }}>
    {/* Product details */}
  </div>
  
  <div style={{ flex: 1 }}>
    {/* Sidebar Ad */}
    <AdSense 
      adSlot="YOUR_AD_SLOT_ID_HERE" 
      adFormat="vertical" 
    />
  </div>
</div>
```

#### Option 4: Footer.jsx - Bottom Banner
Add a banner ad before the footer:

```jsx
import AdSense from './AdSense';

function Footer() {
  return (
    <>
      {/* Ad before footer */}
      <AdSense 
        adSlot="YOUR_AD_SLOT_ID_HERE" 
        adFormat="horizontal" 
      />
      
      <footer style={styles.footer}>
        {/* Footer content */}
      </footer>
    </>
  );
}
```

---

## 🔄 STEP 4: Replace Ad Slot IDs

After creating ad units in AdSense, replace `"YOUR_AD_SLOT_ID_HERE"` with actual slot IDs:

```jsx
// Example with real ad slot ID:
<AdSense 
  adSlot="1234567890"   // ← Your actual ad slot ID from AdSense
  adFormat="auto" 
/>
```

---

## 📱 STEP 5: Test Your Ads

### Development Mode
- Ads will show as **placeholder boxes** with text "Ad Space"
- This is normal and prevents invalid clicks during development

### Production Mode
1. **Build your project**:
   ```bash
   npm run build
   ```

2. **Deploy to your live site** (guntrmadampickles.live)

3. **Test on live site**:
   - Open your website in an **incognito/private window**
   - Ads should appear (may take 10-15 minutes after deployment)
   - **Don't click your own ads** (Google prohibits this)

---

## ⚠️ IMPORTANT RULES & BEST PRACTICES

### Do's ✅
- **Wait for approval** before expecting revenue
- **Place ads naturally** in content flow
- **Use 3-5 ad units** per page (maximum)
- **Keep ads above the fold** for better visibility
- **Use responsive ad formats** for mobile compatibility
- **Monitor performance** in AdSense dashboard

### Don'ts ❌
- **DON'T click your own ads** (account ban risk)
- **DON'T ask others to click** (fraud detection)
- **DON'T place too many ads** (bad user experience)
- **DON'T modify ad code** provided by Google
- **DON'T place ads on prohibited content** (check AdSense policies)

---

## 📊 STEP 6: Monitor Performance

After your site is approved and ads are running:

1. **Login to AdSense**: https://www.google.com/adsense
2. **Check Dashboard** daily for:
   - **Earnings**: How much you've earned
   - **Impressions**: How many times ads were shown
   - **Clicks**: How many times ads were clicked
   - **CTR** (Click-Through Rate): Percentage of impressions that resulted in clicks
   - **CPC** (Cost Per Click): Average earning per click

3. **Optimize Based on Data**:
   - Remove low-performing ad placements
   - Test different ad formats
   - Try different ad sizes

---

## 🚀 Quick Start Checklist

- [x] **Step 1**: AdSense script added to HTML ✅
- [ ] **Step 2**: Wait for Google to verify site (24-48 hours)
- [ ] **Step 3**: Wait for Google account approval (1-2 weeks)
- [ ] **Step 4**: Create ad units in AdSense dashboard
- [ ] **Step 5**: Add AdSense component to pages (see examples above)
- [ ] **Step 6**: Replace placeholder ad slot IDs with real ones
- [ ] **Step 7**: Build and deploy to production
- [ ] **Step 8**: Test ads on live site (incognito mode)
- [ ] **Step 9**: Monitor performance and optimize

---

## 🔗 Useful Links

- **AdSense Help Center**: https://support.google.com/adsense
- **AdSense Policies**: https://support.google.com/adsense/answer/48182
- **Account Setup Guide**: https://support.google.com/adsense/answer/10162
- **Payment Settings**: https://www.google.com/adsense → Payments

---

## 💡 Ad Placement Recommendations for Your Pickle Website

### High-Performing Locations:
1. **Below Hero Section** - 728x90 or responsive banner
2. **Between Product Categories** - 300x250 or 336x280 rectangle
3. **Product Detail Pages** - Sidebar 160x600 or 300x600
4. **Before Footer** - 728x90 or responsive banner
5. **Search Results Page** - Between results (in-feed ads)

### Expected Timeline:
- **Week 1-2**: Site verification and account review
- **Week 3**: Create ad units and place ads
- **Week 4+**: Start seeing revenue (if approved)

---

## ❓ Troubleshooting

### Ads Not Showing?
1. Check if site is approved in AdSense dashboard
2. Verify ad slot IDs are correct
3. Ensure site is live (not localhost)
4. Wait 10-15 minutes after deployment
5. Clear browser cache and check in incognito mode

### Blank Spaces Where Ads Should Be?
1. Check browser console for errors
2. Disable ad blockers
3. Verify ad code is properly implemented
4. Make sure you're in production mode (not development)

### Low Earnings?
1. Increase site traffic (SEO, social media marketing)
2. Optimize ad placements
3. Test different ad formats
4. Create more engaging content

---

## 📞 Need Help?

If you encounter issues:
1. Check **AdSense Help Center**: https://support.google.com/adsense
2. Visit **AdSense Community Forum**: https://support.google.com/adsense/community
3. Contact me for implementation help

---

**Last Updated**: February 11, 2026
**Website**: guntrmadampickles.live
**AdSense Publisher ID**: ca-pub-5617473918245706
