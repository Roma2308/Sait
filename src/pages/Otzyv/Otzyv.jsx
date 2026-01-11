import React, { useState, useEffect } from "react";
import "./Otzyv.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { translations } from "../../translations/translations";

function Otzyv() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];
  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem("otzyvReviews")) || [
      { 
        id: 1,
        name: "Айбек", 
        text: "Очень качественная мебель, всё доставили вовремя.", 
        rating: 5,
        date: "2024-01-15"
      },
      { 
        id: 2,
        name: "Алина", 
        text: "Отличный сервис и современный дизайн.", 
        rating: 4,
        date: "2024-01-20"
      },
      { 
        id: 3,
        name: "Руслан", 
        text: "Качество на высоте, рекомендую.", 
        rating: 5,
        date: "2024-02-01"
      },
      { 
        id: 4,
        name: "Марат", 
        text: "Быстрая доставка и аккуратная сборка.", 
        rating: 4,
        date: "2024-02-10"
      },
      { 
        id: 5,
        name: "Диана", 
        text: "Мебель прочная и красивая.", 
        rating: 5,
        date: "2024-02-15"
      }
    ];
  });

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [orderName, setOrderName] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [orderAddress, setOrderAddress] = useState("");
  const [orderProduct, setOrderProduct] = useState("");
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("otzyvReviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) {
      alert(t.fillAllFields || "Заполните все поля");
      return;
    }

    const newReview = { 
      id: Date.now(),
      name, 
      text, 
      rating,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([newReview, ...reviews]);
    setName("");
    setText("");
    setRating(0);
  };

  const handleDeleteReview = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (!orderName.trim() || !orderPhone.trim() || !orderAddress.trim() || !orderProduct.trim()) {
      alert(t.fillAllFields || "Заполните все поля");
      return;
    }

    alert(t.orderSuccess || `Заказ принят! Мы свяжемся с вами по телефону ${orderPhone}`);
    setOrderName("");
    setOrderPhone("");
    setOrderAddress("");
    setOrderProduct("");
    setShowOrderForm(false);
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const StarRating = ({ value, onRatingChange, onHover, hoverValue, readOnly = false }) => {
    const handleClick = (star) => {
      if (!readOnly && onRatingChange) {
        onRatingChange(star);
      }
    };

    const handleMouseEnter = (star) => {
      if (!readOnly && onHover) {
        onHover(star);
      }
    };

    const handleMouseLeave = () => {
      if (!readOnly && onHover) {
        onHover(0);
      }
    };

    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hoverValue || value) ? 'filled' : ''}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: readOnly ? 'default' : 'pointer' }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={`otzyv-page ${theme}`}>
      <div className="otzyv-container">
        <h1>{t.reviews || "Отзывы и рейтинг"}</h1>

        <div className="rating-summary">
          <div className="average-rating">
            <span className="rating-number">{averageRating}</span>
            <StarRating value={Math.round(averageRating)} readOnly={true} />
            <span className="rating-count">({reviews.length} {t.reviews || "отзывов"})</span>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="order-btn"
            onClick={() => setShowOrderForm(!showOrderForm)}
          >
            {t.order || "Заказать / Купить"}
          </button>
        </div>

        {showOrderForm && (
          <form className="order-form" onSubmit={handleOrder}>
            <h3>{t.order || "Оформить заказ"}</h3>
            <input
              type="text"
              placeholder={t.yourName || "Ваше имя"}
              value={orderName}
              onChange={(e) => setOrderName(e.target.value)}
            />
            <input
              type="tel"
              placeholder={t.phone || "Телефон"}
              value={orderPhone}
              onChange={(e) => setOrderPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder={t.address || "Адрес доставки"}
              value={orderAddress}
              onChange={(e) => setOrderAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder={t.productName || "Название товара"}
              value={orderProduct}
              onChange={(e) => setOrderProduct(e.target.value)}
            />
            <div className="form-buttons">
              <button type="submit">{t.send || "Отправить"}</button>
              <button type="button" onClick={() => setShowOrderForm(false)}>
                {t.cancel || "Отмена"}
              </button>
            </div>
          </form>
        )}

        <form className="add-review-form" onSubmit={handleAddReview}>
          <h3>{t.addReview || "Добавить отзыв"}</h3>
          <input
            type="text"
            placeholder={t.yourName || "Ваше имя"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder={t.yourReview || "Ваш отзыв"}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="rating-input">
            <span>{t.rating || "Оценка"}:</span>
            <StarRating
              value={rating}
              onRatingChange={setRating}
              onHover={setHoverRating}
              hoverValue={hoverRating}
            />
          </div>
          <button type="submit">{t.send || "Отправить"}</button>
        </form>

        <div className="reviews-list">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-header">
                <div className="review-info">
                  <span className="review-name">{review.name}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <StarRating value={review.rating} readOnly={true} />
              </div>
              <p className="review-text">{review.text}</p>
              <button
                className="delete-btn"
                onClick={() => handleDeleteReview(review.id)}
              >
                {t.delete || "Удалить"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Otzyv;

