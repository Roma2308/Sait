import React, { useState, useEffect } from 'react';
import './Izbr.css';
import { useLanguage } from '../../contexts/LanguageContext';

function Izbr() {
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFav = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFav);
  }, []);

  const removeFavorite = (id) => {
    const newFav = favorites.filter(item => item.id !== id);
    setFavorites(newFav);
    localStorage.setItem('favorites', JSON.stringify(newFav));
  };

  return (
    <div className="izbr-page">
      <h1>{t.favorites}</h1>
      {favorites.length === 0 && <p>{t.noFavorites}</p>}
      <div className="izbr-products">
        {favorites.map(item => (
          <div className="izbr-card" key={item.id}>
            <div className="izbr-img">
              <img src={item.avatar} alt={item.name} />
            </div>
            <h3>{item.name}</h3>
            <p className="price">{t.price}: {item.price} {t.som}</p>
            <button onClick={() => removeFavorite(item.id)}>{t.remove}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Izbr