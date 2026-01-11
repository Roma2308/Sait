import React from "react";
import "./partners.css";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

const partnersData = [
  {
    id: 1,
    name: "IKEA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ikea_logo.svg/250px-Ikea_logo.svg.png",
    url: "https://www.ikea.com",
  },
  {
    id: 2,
    name: "Hettich",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuSg60OTY4YwwY0kHfVF48-IZ-73gVIPf1Ig&s",
    url: "https://www.hettich.com",
  },
  {
    id: 3,
    name: "Blum",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXibi4aZ0LjBCgCuiVrPJjMenOv5ZeJGIg0w&s",
    url: "https://www.blum.com",
  },
  {
    id: 4,
    name: "Leroy Merlin",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj9LLVl6vuZyGkFtjf1iaSMaIHWdNILtUyPg&s",
    url: "https://www.leroymerlin.com",
  },
  {
    id: 5,
    name: "DPD",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSRnW6jmgdsFUoKkqv0VIFSMjgqg6Kd1Iaw&s",
    url: "https://www.dpd.com",
  }
];

function Partners() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className={`partners-container ${theme}`}>
      <h2 className="partners-title">{t.partnersTitle}</h2>

      <a href="/sales" className="partners-sale-btn">{t.partnersSaleBtn}</a>

      <div className="partners-slider">
        {partnersData.map(partner => (
          <a
            key={partner.id}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="partner-link"
          >
            <div className="partner-card">
              <img src={partner.logo} alt={partner.name} />
              <p>{partner.name}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Partners