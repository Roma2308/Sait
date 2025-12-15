import React, { useState } from "react";
import "./Reviews.css";

function Reviews() {
  const reviews = [
    { text: "Очень качественная мебель, всё доставили вовремя.", name: "Айбек" },
    { text: "Отличный сервис и современный дизайн.", name: "Алина" },
    { text: "Качество на высоте, рекомендую.", name: "Руслан" },
    { text: "Быстрая доставка и аккуратная сборка.", name: "Марат" },
    { text: "Мебель прочная и красивая.", name: "Диана" }
  ];

  const [startIndex, setStartIndex] = useState(0);

  const prev = () => {
    setStartIndex(startIndex === 0 ? reviews.length - 2 : startIndex - 2);
  };

  const next = () => {
    setStartIndex(startIndex >= reviews.length - 2 ? 0 : startIndex + 2);
  };

  return (
    <div className="reviews">
      <h2>Отзывы наших клиентов</h2>

      <div className="review-slider">
        <button className="review-btn" onClick={prev}>‹</button>

        <div className="review-cards">
          {reviews.slice(startIndex, startIndex + 2).map((review, i) => (
            <div className="review-card" key={i}>
              <p className="review-text">{review.text}</p>
              <span className="review-name">{review.name}</span>
            </div>
          ))}
        </div>

        <button className="review-btn" onClick={next}>›</button>
      </div>
    </div>
  );
}

export default Reviews