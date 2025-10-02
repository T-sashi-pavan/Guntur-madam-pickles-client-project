import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { CATEGORIES } from '../data/products';
import LiveSearch from './LiveSearch';
import "./Header.css";
import Logo from '../assets/logo.png';

const Navbar = ({ onCartToggle }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const { currentLanguage, toggleLanguage, getText } = useLanguage();
    const { getTotalItems } = useCart();

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Category mappings for navigation
    const categoryMappings = {
        [CATEGORIES.VEG]: {
            en: 'Veg Pickles',
            te: 'కూరగాయల పచ్చడి',
            url: '/category/veg'
        },
        [CATEGORIES.NON_VEG]: {
            en: 'Non-Veg',
            te: 'మాంసం',
            url: '/category/non-veg'
        },
        [CATEGORIES.SPECIALS]: {
            en: 'Specials',
            te: 'స్పెషల్స్',
            url: '/category/specials'
        },
        [CATEGORIES.KARAM_PODULU]: {
            en: 'Spice Powders',
            te: 'కారం పొడులు',
            url: '/category/karam-podulu'
        },
        [CATEGORIES.SWEETS]: {
            en: 'Sweets',
            te: 'స్వీట్స్',
            url: '/category/sweets'
        },
        [CATEGORIES.ANDHRA_SPECIAL]: {
            en: 'Andhra Special',
            te: 'ఆంధ్రా స్పెషల్',
            url: '/category/andhra-special'
        },
        [CATEGORIES.HOT]: {
            en: 'Hot & Spicy',
            te: 'కారం',
            url: '/category/hot'
        }
    };

    const handleCategoryClick = (category) => {
        setIsMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchQuery('');
        }
    };

    const handleSearchClose = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    return (
        <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="navbar" role="navigation" aria-label="Main navigation">
                {/* Left Side - Logo and Brand */}
                <div className="navbar-left">
                    <Link to="/" className="brand">
                        <img src={Logo} alt="Guntur Madam Pickles Logo" className="logo" />
                        <div className="brand-text">
                            <span className="brand-name">
                                {getText('Guntur Madam', 'గుంటూరు మేడం')}
                            </span>
                            <span className="brand-tagline">
                                {getText('Pickles', 'పిక్లెస్')}
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Center - Navigation Links (Desktop) */}
                <div className="navbar-center">
                    <ul className="nav-links" role="menubar">
                        <li role="none">
                            <Link 
                                to="/" 
                                role="menuitem"
                            >
                                {getText('Home', 'హోమ్')}
                            </Link>
                        </li>
                        {Object.entries(categoryMappings).map(([category, labels]) => (
                            <li key={category} role="none">
                                <Link 
                                    to={labels.url}
                                    role="menuitem"
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {currentLanguage === 'te' ? labels.te : labels.en}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Side - Actions */}
                <div className="navbar-right">
                    {/* Phone Number */}
                    <div className="phone-number">
                        <FaPhoneAlt className="phone-icon" />
                        <span>+91 77027 21323</span>
                    </div>

                    {/* Search Toggle */}
                    <button 
                        className="icon-button search-toggle"
                        onClick={toggleSearch}
                        aria-label={getText('Search', 'వెతకండి')}
                    >
                        <AiOutlineSearch />
                    </button>

                    {/* Language Toggle */}
                    <button 
                        className="language-toggle"
                        onClick={toggleLanguage}
                        aria-label={getText('Switch Language', 'భాష మార్చండి')}
                    >
                        <MdLanguage />
                        <span>{currentLanguage === 'en' ? 'తె' : 'EN'}</span>
                    </button>

                    {/* Cart */}
                    <button 
                        className="cart-button"
                        onClick={onCartToggle}
                        aria-label={getText('Shopping Cart', 'షాపింగ్ కార్ట్')}
                    >
                        <AiOutlineShoppingCart />
                        {getTotalItems() > 0 && (
                            <span className="cart-badge">{getTotalItems()}</span>
                        )}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="mobile-menu-toggle"
                        onClick={toggleMobileMenu}
                        aria-label={getText('Toggle Menu', 'మెను టోగుల్')}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </button>
                </div>

                {/* Live Search (Expandable) */}
                {isSearchOpen && (
                    <div className="search-bar-container">
                        <LiveSearch 
                            isOpen={isSearchOpen}
                            onClose={handleSearchClose}
                            className="header-search"
                        />
                    </div>
                )}

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="mobile-menu" role="dialog" aria-label="Mobile navigation menu">
                        <div className="mobile-menu-content">
                            <div className="mobile-menu-header">
                                <h3>{getText('Menu', 'మెను')}</h3>
                                <button 
                                    className="mobile-menu-close"
                                    onClick={toggleMobileMenu}
                                    aria-label={getText('Close Menu', 'మెను మూసు')}
                                >
                                    <AiOutlineClose />
                                </button>
                            </div>
                            
                            <ul className="mobile-nav-links">
                                <li>
                                    <Link 
                                        to="/"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {getText('Home', 'హోమ్')}
                                    </Link>
                                </li>
                                <li>
                                    <button 
                                        className="mobile-search-button"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            toggleSearch();
                                        }}
                                    >
                                        <AiOutlineSearch />
                                        <span>{getText('Search Products', 'ఉత్పత్తులను వెతకండి')}</span>
                                    </button>
                                </li>
                                {Object.entries(categoryMappings).map(([category, labels]) => (
                                    <li key={category}>
                                        <Link 
                                            to={labels.url}
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            {currentLanguage === 'te' ? labels.te : labels.en}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="mobile-menu-footer">
                                <div className="mobile-phone">
                                    <FaPhoneAlt />
                                    <span>+91 7330775225</span>
                                </div>
                                <a 
                                    href="https://wa.me/917330775225" 
                                    className="whatsapp-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaWhatsapp />
                                    <span>{getText('WhatsApp', 'వాట్సప్')}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
