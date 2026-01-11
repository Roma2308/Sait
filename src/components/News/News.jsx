import React, { useState, useEffect } from "react";
import "./news.css";
import { useLanguage } from "../../contexts/LanguageContext";

function News() {
  const [news, setNews] = useState([]);
  const [selected, setSelected] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    fetch("https://6963542f2d146d9f58d32ff2.mockapi.io/news")
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="news-container">
      <h1 className="news-title">{t.newsTitle}</h1>

      <div className="news-grid">
        {news.map(item => (
          <div
            key={item.id}
            className="news-card"
            onClick={() => setSelected(item)}
          >
            <h3>{item.title}</h3>
            <p className="news-date">{t.newsDate}: {item.date}</p>
            <p>{item.short}</p>
            <span className="news-read-more">{t.newsReadMore}</span>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>
              {t.newsModalClose}
            </button>
            <h2>{selected.title}</h2>
            <p className="news-date">{t.newsDate}: {selected.date}</p>
            <p>{selected.full}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default News