import React from 'react'
import './Footer.css'
import Logo from '../assets/logo.png'
import { useLanguage } from '../contexts/LanguageContext'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'

const Footer = () => {
    const { language } = useLanguage();

    const footerContent = {
        en: {
            about: "About Us",
            contact: "Contact",
            products: "Products",
            quickLinks: "Quick Links",
            followUs: "Follow Us",
            location: "Our Location",
            phone: "Phone",
            email: "Email",
            address: "Guntur, Andhra Pradesh, India",
            description: "Authentic traditional pickles made with love and the finest ingredients",
            madeWith: "Made with ❤️ by Tulasi",
            copyright: "© 2025 Guntur Madam Pickles. All rights reserved."
        },
        te: {
            about: "మా గురించి",
            contact: "సంప్రదించండి",
            products: "ఉత్పత్తులు",
            quickLinks: "త్వరిత లింకులు",
            followUs: "మమ్మల్ని ఫాలో చేయండి",
            location: "మా స్థానం",
            phone: "ఫోన్",
            email: "ఈమెయిల్",
            address: "గుంటూరు, ఆంధ్రప్రదేశ్, భారతదేశం",
            description: "ప్రేమతో మరియు అత్యుత్తమ పదార్థాలతో తయారైన సాంప్రదాయ ఊరగాయలు",
            madeWith: "తులసి చేత ప్రేమతో తయారు చేయబడింది ❤️",
            copyright: "© 2025 గుంటూరు మేడం పికిల్స్. అన్ని హక్కులు రక్షించబడ్డాయి."
        }
    };

    const content = footerContent[language];

    return (
        <footer className="footer-section">
            <div className="footer-container">
                {/* Company Info */}
                <div className="footer-column">
                    <div className="footer-brand">
                        <img src={Logo} alt="Guntur Madam Pickles" className="footer-logo" />
                        <h3>Guntur Madam Pickles</h3>
                    </div>
                    <p className="footer-description">
                        {content.description}
                    </p>
                    <div className="social-links">
                        <h4>{content.followUs}</h4>
                        <div className="social-icons">
                            <button className="social-icon facebook" onClick={() => console.log('Facebook coming soon')}>
                                <FaFacebook />
                            </button>
                            <button className="social-icon instagram" onClick={() => console.log('Instagram coming soon')}>
                                <FaInstagram />
                            </button>
                            <a href="https://wa.me/919876543210" className="social-icon whatsapp">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-column">
                    <h4>{content.quickLinks}</h4>
                    <ul className="footer-links">
                        <li><a href="/">{content.about}</a></li>
                        <li><a href="/category/veg">Veg Pickles</a></li>
                        <li><a href="/category/non-veg">Non-Veg Pickles</a></li>
                        <li><a href="/category/sweets">Sweets</a></li>
                        <li><a href="/category/masalas">Masalas</a></li>
                        <li><a href="/category/powders">Powders</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="footer-column">
                    <h4>{content.contact}</h4>
                    <div className="contact-info">
                        <div className="contact-item">
                            <FaMapMarkerAlt className="contact-icon" />
                            <span>{content.address}</span>
                        </div>
                        <div className="contact-item">
                            <FaPhone className="contact-icon" />
                            <span>+91 98765 43210</span>
                        </div>
                        <div className="contact-item">
                            <FaEnvelope className="contact-icon" />
                            <span>info@gunturmadampickles.com</span>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="footer-column map-column">
                    <h4>{content.location}</h4>
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62009.77659267698!2d80.40447484863281!3d16.29872840000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a755cb1787785%3A0x9f7999dd90f1e694!2sGuntur%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1695384000000!5m2!1sen!2sin"
                            width="100%"
                            height="200"
                            style={{ border: 0, borderRadius: '8px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Guntur Location"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p className="made-with-love">{content.madeWith}</p>
                    <p className="copyright">{content.copyright}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
