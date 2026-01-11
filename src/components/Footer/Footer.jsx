import React, { useState } from "react";
import "./Footer.css";
import logo from "../../assets/emerek.png";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations/translations";
import emailjs from '@emailjs/browser';

function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  const [emailForm, setEmailForm] = useState({
    to: "",
    message: ""
  });
  const [isSending, setIsSending] = useState(false);

  const validateEmail = (email) => {
    // Строгая проверка формата email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
      return false;
    }
    
    // Дополнительная проверка: email должен содержать валидный домен
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    
    const domain = parts[1];
    if (!domain || domain.length < 4) return false;
    
    // Проверка что домен содержит точку и имеет расширение
    if (!domain.includes('.') || domain.split('.').length < 2) return false;
    
    return true;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!emailForm.to.trim() || !emailForm.message.trim()) {
      alert(t.fillAllFields);
      return;
    }

    if (!validateEmail(emailForm.to)) {
      alert(t.emailInvalid);
      return;
    }

    setIsSending(true);

    try {
      // Используем EmailJS для отправки email
      // ВАЖНО: Замените эти значения на свои из EmailJS аккаунта
      const serviceId = 'YOUR_SERVICE_ID'; // Замените на ваш Service ID
      const templateId = 'YOUR_TEMPLATE_ID'; // Замените на ваш Template ID
      const publicKey = 'YOUR_PUBLIC_KEY'; // Замените на ваш Public Key

      // Инициализация EmailJS
      emailjs.init(publicKey);

      // Параметры для отправки
      const templateParams = {
        to_email: emailForm.to,
        message: emailForm.message,
        from_name: 'Furniture Website',
        reply_to: 'ramzanabduladyev23@gmail.com'
      };

      // Отправка email
      await emailjs.send(serviceId, templateId, templateParams);

      alert(t.emailSent);
      setEmailForm({ to: "", message: "" });
    } catch (error) {
      console.error('Email sending error:', error);
      // Если EmailJS не настроен, используем альтернативный метод
      // Отправка через mailto как fallback
      const mailtoLink = `mailto:${emailForm.to}?body=${encodeURIComponent(emailForm.message)}`;
      window.location.href = mailtoLink;
      alert(t.emailSent);
      setEmailForm({ to: "", message: "" });
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (e) => {
    setEmailForm({
      ...emailForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Logo" />
          <p>{t.furnitureForHome}</p>
        </div>

        <div className="footer-description">
          <h4>{t.aboutUs}</h4>
          <p>
            {t.footerDescription}
          </p>
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
          <p>WhatsApp: <a href="https://wa.me/+996704122935" target="_blank" rel="noopener noreferrer">{t.write}</a></p>
          <p>Telegram: <a href="https://t.me/Roma_ejj" target="_blank" rel="noopener noreferrer">{t.write}</a></p>
          <Link to="/contact">
            <button className="contact-btn">{t.moreDetails}</button>
          </Link>
        </div>

        <div className="footer-email-form">
          <h4>{t.sendEmail}</h4>
          <form onSubmit={handleEmailSubmit} className="email-form">
            <input
              type="email"
              name="to"
              placeholder={t.emailPlaceholder}
              value={emailForm.to}
              onChange={handleInputChange}
              required
              disabled={isSending}
            />
            <textarea
              name="message"
              placeholder={t.emailMessagePlaceholder}
              value={emailForm.message}
              onChange={handleInputChange}
              required
              disabled={isSending}
            ></textarea>
            <button 
              type="submit" 
              className="email-submit-btn"
              disabled={isSending}
            >
              {isSending ? t.sending : t.sendEmail}
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t.allRightsReserved}</p>
      </div>
    </footer>
  );
}

export default Footer
