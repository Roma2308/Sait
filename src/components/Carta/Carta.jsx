import React from "react";
import "./Carta.css";
import { useLanguage } from "../../contexts/LanguageContext";

function Carta() {
  const { t, language } = useLanguage();
  const mapTitle = language === 'en' ? 'Alamedin Bazaar' : language === 'ru' ? 'Аламедин Базар' : 'Аламедин Базар';

  return (
    <div className="carta-container">
      <iframe
        title={mapTitle}
        className="carta-map"
        src="https://www.google.com/maps?q=42.8746,74.6032&z=16&output=embed"
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Carta;
