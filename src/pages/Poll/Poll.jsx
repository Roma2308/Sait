import React, { useState } from "react";
import "./Poll.css";
import { useLanguage } from "../../contexts/LanguageContext";

function Poll() {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = () => {
    if (!selectedOption) return;

    // Формируем текст для Telegram
    const telegramText = `
Голосование на сайте:

Выбранная мебель: ${selectedOption}
    `;
    const encoded = encodeURIComponent(telegramText);
    const telegramUrl = `https://t.me/Roma_ejj?text=${encoded}`;

    // Открываем Telegram
    window.open(telegramUrl, "_blank");

    // Показываем сообщение об отправке
    setSubmitted(true);
  };

  return (
    <div className="poll-container">
      <h2 className="poll-title">{t.pollTitle}</h2>

      {!submitted ? (
        <div className="poll-options">
          <label>
            <input
              type="radio"
              name="furniture"
              value={t.pollOptionSofa}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            {t.pollOptionSofa}
          </label>

          <label>
            <input
              type="radio"
              name="furniture"
              value={t.pollOptionBed}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            {t.pollOptionBed}
          </label>

          <label>
            <input
              type="radio"
              name="furniture"
              value={t.pollOptionTable}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            {t.pollOptionTable}
          </label>

          <label>
            <input
              type="radio"
              name="furniture"
              value={t.pollOptionChair}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            {t.pollOptionChair}
          </label>

          <button className="poll-btn" onClick={handleSubmit}>
            {t.vote}
          </button>
        </div>
      ) : (
        <div className="poll-result">
          {t.pollThankYou}<br />
          Вы выбрали: <strong>{selectedOption}</strong>
        </div>
      )}
    </div>
  );
}

export default Poll