import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.date}><strong>Last Updated:</strong> February 11, 2026</p>
        
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Introduction</h2>
          <p style={styles.text}>
            Welcome to Guntur Madam Pickles ("we," "our," or "us"). We are committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
            visit our website <strong>guntrmadampickles.live</strong>.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Information We Collect</h2>
          
          <h3 style={styles.subTitle}>2.1 Personal Information</h3>
          <p style={styles.text}>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul style={styles.list}>
            <li>Place an order for our products</li>
            <li>Contact us via email or phone</li>
            <li>Subscribe to our newsletter</li>
            <li>Use our website</li>
          </ul>
          <p style={styles.text}>
            This information may include:
          </p>
          <ul style={styles.list}>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Delivery address</li>
            <li>Payment information</li>
          </ul>

          <h3 style={styles.subTitle}>2.2 Automatically Collected Information</h3>
          <p style={styles.text}>
            When you visit our website, we automatically collect certain information about your device, including:
          </p>
          <ul style={styles.list}>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Pages visited</li>
            <li>Time and date of visit</li>
            <li>Referring website addresses</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>3. Cookies and Tracking Technologies</h2>
          
          <h3 style={styles.subTitle}>3.1 Cookies</h3>
          <p style={styles.text}>
            We use cookies and similar tracking technologies to track activity on our website and store certain information. 
            Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
          </p>

          <h3 style={styles.subTitle}>3.2 Google AdSense</h3>
          <p style={styles.text}>
            We use <strong>Google AdSense</strong> to serve advertisements on our website. Google AdSense uses cookies to 
            display ads based on your visits to our site and other sites on the Internet.
          </p>
          <ul style={styles.list}>
            <li>Google uses cookies to serve ads based on a user's prior visits to our website or other websites.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve ads based on your visits to our site and/or other sites on the Internet.</li>
            <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={styles.link}>Google Ads Settings</a>.</li>
            <li>You can also opt out of cookies by visiting the <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={styles.link}>Digital Advertising Alliance opt-out page</a>.</li>
          </ul>

          <h3 style={styles.subTitle}>3.3 Google Analytics</h3>
          <p style={styles.text}>
            We may use Google Analytics to track and analyze website usage. Google Analytics uses cookies to collect 
            information about how visitors use our site. You can opt out of Google Analytics by installing the 
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={styles.link}> Google Analytics Opt-out Browser Add-on</a>.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>4. How We Use Your Information</h2>
          <p style={styles.text}>We use the information we collect to:</p>
          <ul style={styles.list}>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders</li>
            <li>Send you promotional materials (if you've opted in)</li>
            <li>Improve our website and services</li>
            <li>Analyze website usage and trends</li>
            <li>Prevent fraud and enhance security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Third-Party Services</h2>
          
          <h3 style={styles.subTitle}>5.1 Google AdSense</h3>
          <p style={styles.text}>
            Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website. 
            These third parties may collect information about your online activities over time and across different websites.
          </p>
          <p style={styles.text}>
            For more information about Google's privacy practices, please visit the 
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={styles.link}> Google Privacy & Terms page</a>.
          </p>

          <h3 style={styles.subTitle}>5.2 Payment Processors</h3>
          <p style={styles.text}>
            We may use third-party payment processors to process payments. These processors have their own privacy 
            policies, and we encourage you to review them.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>6. How We Share Your Information</h2>
          <p style={styles.text}>
            We do not sell, trade, or rent your personal information to third parties. We may share your information with:
          </p>
          <ul style={styles.list}>
            <li><strong>Service Providers:</strong> Third parties who help us operate our business (e.g., payment processors, delivery services)</li>
            <li><strong>Advertising Partners:</strong> Such as Google AdSense, to display relevant ads</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>7. Data Security</h2>
          <p style={styles.text}>
            We implement appropriate technical and organizational security measures to protect your personal information. 
            However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot 
            guarantee absolute security.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>8. Your Rights and Choices</h2>
          <p style={styles.text}>You have the right to:</p>
          <ul style={styles.list}>
            <li><strong>Access:</strong> Request a copy of your personal information</li>
            <li><strong>Correction:</strong> Correct any inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails</li>
            <li><strong>Disable Cookies:</strong> Adjust your browser settings to refuse cookies</li>
            <li><strong>Opt-Out of Personalized Ads:</strong> Visit <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={styles.link}>Google Ads Settings</a></li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>9. Children's Privacy</h2>
          <p style={styles.text}>
            Our website is not intended for children under the age of 13. We do not knowingly collect personal information 
            from children under 13. If you believe we have collected information from a child under 13, please contact us 
            immediately.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>10. International Users</h2>
          <p style={styles.text}>
            Our website is hosted in India. If you are accessing our website from outside India, please be aware that 
            your information may be transferred to, stored, and processed in India.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>11. Changes to This Privacy Policy</h2>
          <p style={styles.text}>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated 
            "Last Updated" date. We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>12. Contact Us</h2>
          <p style={styles.text}>
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div style={styles.contactInfo}>
            <p><strong>Guntur Madam Pickles</strong></p>
            <p>Website: <a href="https://guntrmadampickles.live" style={styles.link}>guntrmadampickles.live</a></p>
            <p>Email: info@guntrmadampickles.live</p>
            <p>Phone: [Your Phone Number]</p>
            <p>Address: [Your Business Address]</p>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>13. Consent</h2>
          <p style={styles.text}>
            By using our website, you consent to our Privacy Policy and agree to its terms.
          </p>
        </section>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    padding: '20px',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5em',
    color: '#D44C1D',
    marginBottom: '10px',
    borderBottom: '3px solid #D44C1D',
    paddingBottom: '15px',
  },
  date: {
    color: '#666',
    fontSize: '0.95em',
    marginBottom: '30px',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '1.8em',
    color: '#333',
    marginBottom: '15px',
    marginTop: '25px',
  },
  subTitle: {
    fontSize: '1.4em',
    color: '#555',
    marginBottom: '10px',
    marginTop: '20px',
  },
  text: {
    fontSize: '1.1em',
    lineHeight: '1.6',
    color: '#444',
    marginBottom: '15px',
  },
  list: {
    fontSize: '1.1em',
    lineHeight: '1.8',
    color: '#444',
    marginLeft: '20px',
    marginBottom: '15px',
  },
  link: {
    color: '#D44C1D',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  contactInfo: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    borderLeft: '4px solid #D44C1D',
    marginTop: '15px',
  }
};

export default PrivacyPolicy;
