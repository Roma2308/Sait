import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { translations } from '../../translations/translations';
import logo from '../../assets/emerek.png';
import './Header.css';

function Header() {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[language];

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    setUserData(storedUser);
    setIsLoggedIn(loggedIn);
    
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };
    
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    const interval = setInterval(updateCartCount, 500);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuOpen && !event.target.closest('.language-switcher')) {
        setLangMenuOpen(false);
      }
    };

    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langMenuOpen]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && search.trim()) {
      navigate(`/?search=${search}`);
      setSearch("");
    }
  };

  const handleProfileClick = () => {
    if (!userData) navigate("/register");
    else if (!isLoggedIn) navigate("/login");
    else navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    setIsLoggedIn(false);
    navigate("/register");
  };

  const toggleMenu = () => setMenuActive(!menuActive);
  const handleLanguageChange = (lang) => { changeLanguage(lang); setLangMenuOpen(false); };
  const getLanguageLabel = (lang) => ({ en: 'EN', ru: 'RU', ky: 'KY' }[lang] || lang.toUpperCase());

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="header-logo">
          <img src={logo} alt="Logo" />
          <span>{t.furniture}</span>
        </Link>
        <input
          className="search-input"
          type="text"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="burger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <nav className={`header-nav ${menuActive ? 'active' : ''}`}>
        <Link to="/">{t.home}</Link>
        <Link to="/about">{t.about}</Link>
        <Link to="/contact">{t.contact}</Link>
        <Link to="/rev">{t.reviews}</Link>

        <div className="fav-icons">
          <Link to="/izbr" className="icon-link">
            <img src="https://cdn-icons-png.flaticon.com/512/9484/9484251.png" alt="Favorites" />
          </Link>
        </div>

        <button className="theme-toggle" onClick={toggleTheme} title={theme === 'light' ? 'Темная тема' : 'Светлая тема'}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <div className="language-switcher">
          <button className="language-btn" onClick={() => setLangMenuOpen(!langMenuOpen)}>
            {getLanguageLabel(language)}
          </button>
          {langMenuOpen && (
            <div className="language-dropdown">
              <button className={language === 'en' ? 'active' : ''} onClick={() => handleLanguageChange('en')}>English</button>
              <button className={language === 'ru' ? 'active' : ''} onClick={() => handleLanguageChange('ru')}>Русский</button>
              <button className={language === 'ky' ? 'active' : ''} onClick={() => handleLanguageChange('ky')}>Кыргызча</button>
            </div>
          )}
        </div>

        <div className="auth-buttons">
          <button onClick={handleProfileClick} className="profile-btn">{t.profile}</button>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">{t.logout}</button>
          ) : (
            <>
              <Link to="/login" className="login-btn">{t.login}</Link>
              <Link to="/register" className="register-btn">{t.register}</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header