import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Support.css";

function Support() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const handleSend = () => {
    if (!name || !email || !message) return;

    const text = `
Обращение в поддержку:

Имя: ${name}
Email: ${email}
Сообщение: ${message}
    `;
    const encoded = encodeURIComponent(text);
    window.open(`https://t.me/Roma_ejj?text=${encoded}`, "_blank");
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="support-container">
      <h2 className="support-title">{t.supportTitle}</h2>

      {!sent ? (
        <div className="support-form">
          <input
            type="text"
            placeholder={t.supportNamePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder={t.supportEmailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder={t.supportMessagePlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send-support-btn" onClick={handleSend}>
            {t.send}
          </button>
        </div>
      ) : (
        <div className="message-sent">{t.messageSent}</div>
      )}
    </div>
  );
}

export default Support