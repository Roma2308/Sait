import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Career.css";

function Career() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const handleSend = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) return;

    const encoded = encodeURIComponent(`
Новая заявка:

Имя: ${name}
Email: ${email}
Телефон: ${phone}
Сообщение: ${message}
    `);

    window.open(`https://t.me/Roma_ejj?text=${encoded}`, "_blank");

    setSent(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");

    setTimeout(() => navigate("/thank-you"), 1500);
  };

  return (
    <div className={`career-container ${theme === "dark" ? "dark" : ""}`}>
      <h1 className="career-title">{t.careerTitle}</h1>

      {!sent ? (
        <div className="career-form">
          <input
            type="text"
            placeholder={t.yourName}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder={t.yourEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder={t.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            placeholder={t.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="career-btn" onClick={handleSend}>
            {t.careerSend}
          </button>
        </div>
      ) : (
        <div className="message-sent">{t.careerMessageSent}</div>
      )}
    </div>
  );
}

export default Career