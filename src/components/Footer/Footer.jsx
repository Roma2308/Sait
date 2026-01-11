import React from "react";
import "./Footer.css";
import logo from "../../assets/emerek.png";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Logo" />
          <p>{t.furnitureForHome}</p>
          <Link to="/poll">
            <button className="poll-btn">{t.vote}</button>
          </Link>
        </div>

        <div className="footer-description">
          <h4>{t.aboutUs}</h4>
          <p>{t.aboutUsText}</p>
          <a
            href="https://www.youtube.com/watch?v=PSxtwLwzKbo"
            target="_blank"
            rel="noopener noreferrer"
            className="video-link"
          >
            {t.watchVideo}
          </a>
        </div>

        <div className="footer-contact">
          <h4>{t.contactUs}</h4>
          <p>{t.phone}: <a href="tel:+996704122935">+996 704 122 935</a></p>
          <p>{t.email}: <a href="mailto:ramzanabduladyev23@gmail.com">ramzanabduladyev23@gmail.com</a></p>
          <p>
            WhatsApp: <a href="https://wa.me/996704122935" target="_blank" rel="noopener noreferrer">{t.write}</a>
          </p>

          <Link to="/support">
            <button className="support-btn">{t.supportTitle}</button>
          </Link>
          <Link to="/contact">
            <button className="contact-btn">{t.contact}</button>
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t.allRightsReserved}</p>
      </div>
    </footer>
  );
}

export default Footer