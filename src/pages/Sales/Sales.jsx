import React, { useEffect, useState } from "react";
import "./sales.css";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

function Sales() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch("https://696396c82d146d9f58d3d464.mockapi.io/akcia")
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(err => console.error(err));
  }, []);

  const handleOrderSend = (item) => {
    const baseMessage = `
Заказ товара:

Название: ${item.name}
Цена: ${item.price} сом
    `;

    const encoded = encodeURIComponent(baseMessage);
    const telegramUrl = `https://t.me/Roma_ejj?text=${encoded}`;
    window.open(telegramUrl, "_blank");
  };

  return (
    <div className={`sales-container ${theme}`}>
      <h2 className="sales-title">{t.salesTitle}</h2>

      <div className="sales-grid">
        {sales.length > 0 ? (
          sales.map(item => (
            <div key={item.id} className="sale-card">
              <img src={item.avatar} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="new-price">{item.price} ₽</p>
              <p className="sale-desc">{item.desc}</p>

              <button
                className="order-btn"
                onClick={() => handleOrderSend(item)}
              >
                {t.order}
              </button>
            </div>
          ))
        ) : (
          <p>{t.noSales}</p>
        )}
      </div>
    </div>
  );
}

export default Sales