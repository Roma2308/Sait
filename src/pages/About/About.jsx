import React from "react";
import "./About.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

function About() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className={`about ${theme}`}>

      <div className="about-hero">
        <h1>{t.aboutTitle}</h1>
        <p>
          {t.aboutDescription}
        </p>
      </div>

      <div className="about-section">
        <h2>{t.whoWeAre}</h2>
        <p>
          {t.whoWeAreText1}
        </p>
        <p>
          {t.whoWeAreText2}
        </p>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <h3>{t.quality}</h3>
          <p>
            {t.qualityText}
          </p>
        </div>

        <div className="about-card">
          <h3>{t.modernDesign}</h3>
          <p>
            {t.modernDesignText}
          </p>
        </div>

        <div className="about-card">
          <h3>{t.affordablePrices}</h3>
          <p>
            {t.affordablePricesText}
          </p>
        </div>

        <div className="about-card">
          <h3>{t.delivery}</h3>
          <p>
            {t.deliveryText}
          </p>
        </div>
      </div>

      <div className="about-section highlight">
        <h2>{t.ourMission}</h2>
        <p>
          {t.ourMissionText}
        </p>
      </div>

      <div className="about-section highlight">
        <h2>{t.ourVision}</h2>
        <p>
          {t.ourVisionText}
        </p>
      </div>

      <div className="about-section highlight">
        <h2>{t.ourValues}</h2>
        <p>
          {t.ourValuesText}
        </p>
      </div>

    

    </div>
  );
}

export default About