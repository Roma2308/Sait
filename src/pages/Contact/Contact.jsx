import React, { useState } from "react";
import "./Contact.css";
import logo from "../../assets/emerek.png";

function Contact() {
  const [data, setData] = useState({ name: "", email: "", message: "" });

  const updateField = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sendForm = (e) => {
    e.preventDefault();
    alert(`Спасибо, ${data.name}! Ваше сообщение отправлено.`);
    setData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <img src={logo} alt="Logo" />
        <h1>Свяжитесь с нами</h1>
        <p>Мы всегда рады ответить на ваши вопросы и помочь с выбором мебели!</p>
      </div>

      <div className="contact-content">
        <form className="contact-form" onSubmit={sendForm}>
          <label>Ваше имя</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={updateField}
            required
          />

          <label>Ваш Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={updateField}
            required
          />

          <label>Сообщение</label>
          <textarea
            name="message"
            value={data.message}
            onChange={updateField}
            required
          ></textarea>

          <button type="submit">Отправить</button>
        </form>

        <div className="contact-info">
          <h2>Наши контакты</h2>
          <p>Телефон: <a href="tel:+996704122935">+996 704 122 935</a></p>
          <p>Почта: <a href="mailto:info@mebel.kg">info@mebel.kg</a></p>
          <p>WhatsApp: <a href="https://wa.me/+996704122935" target="_blank" rel="noopener noreferrer">Написать</a></p>
          <p>Telegram: <a href="https://t.me/Roma_ejj" target="_blank" rel="noopener noreferrer">Написать</a></p>
        </div>
      </div>
    </div>
  );
}

export default Contact