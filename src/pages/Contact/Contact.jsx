import React, { useState } from "react";
import "./Contact.css";
import logo from "../../assets/emerek.png";
import { useLanguage } from "../../contexts/LanguageContext";

function Contact() {
  const { t } = useLanguage();
  const [data, setData] = useState({ name: "", email: "", message: "" });

  const updateField = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sendForm = (e) => {
    e.preventDefault();
    
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      return;
    }

    const telegramText = `
Обращение с сайта:

Имя: ${data.name}
Email: ${data.email}
Сообщение: ${data.message}
    `;
    
    const encoded = encodeURIComponent(telegramText);
    window.open(`https://t.me/Roma_ejj?text=${encoded}`, "_blank");
    
    setData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <img src={logo} alt="Logo" />
        <h1>{t.contactTitle}</h1>
        <p>{t.contactSubtitle}</p>
      </div>

      <div className="contact-content">
        <form className="contact-form" onSubmit={sendForm}>
          <label>{t.yourName}</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={updateField}
            required
          />

          <label>{t.yourEmail}</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={updateField}
            required
          />

          <label>{t.message}</label>
          <textarea
            name="message"
            value={data.message}
            onChange={updateField}
            required
          ></textarea>

          <button type="submit">{t.send}</button>
        </form>

        <div className="contact-info">
          <h2>{t.ourContacts}</h2>
          <p>{t.phone}: <a href="tel:+996704122935">+996 704 122 935</a></p>
          <p>{t.email}: <a href="mailto:info@mebel.kg">info@mebel.kg</a></p>
          <p>WhatsApp: <a href="https://wa.me/+996704122935" target="_blank" rel="noopener noreferrer">{t.write}</a></p>
          <p>Telegram: <a href="https://t.me/Roma_ejj" target="_blank" rel="noopener noreferrer">{t.write}</a></p>
        </div>
      </div>
    </div>
  );
}

export default Contact