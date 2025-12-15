import React from "react";
import "./Footer.css";
import logo from "../../assets/emerek.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Logo" />
          <p>Мебель для вашего дома</p>
        </div>

        <div className="footer-description">
          <h4>О нас</h4>
          <p>
            Мы создаём качественную мебель для вашего комфорта и уюта. 
            Работая с нами, вы получаете только лучшее — стиль, надёжность и внимание к деталям.
          </p>
          <a 
            href="https://www.youtube.com/watch?v=PSxtwLwzKbo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="video-link"
          >
            Смотреть видео о нашей мебели
          </a>
        </div>

        <div className="footer-contact">
          <h4>Связаться с нами</h4>
          <p>Телефон: <a href="tel:+996704122935">+996 704 122 935</a></p>
          <p>Почта: <a href="mailto:info@mebel.kg">info@mebel.ru</a></p>
          <p>WhatsApp: <a href="https://wa.me/+996704122935" target="_blank">Написать</a></p>
          <p>Telegram: <a href="https://t.me/Roma_ejj" target="_blank">Написать</a></p>
          <Link to="/contact">
          <button className="contact-btn">Подробнее</button>
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Мебель. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default Footer
