import React, { useState, useEffect } from "react";
import "./Reviews.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations/translations";
import emailjs from '@emailjs/browser';

function Reviews() {
  const { language } = useLanguage();
  const t = translations[language];
  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem("reviews")) || [
      { id: 1, text: "Очень качественная мебель, всё доставили вовремя.", name: "Айбек", rating: 5, date: "2024-01-15" },
      { id: 2, text: "Отличный сервис и современный дизайн.", name: "Алина", rating: 4, date: "2024-01-20" },
      { id: 3, text: "Качество на высоте, рекомендую.", name: "Руслан", rating: 5, date: "2024-02-01" },
      { id: 4, text: "Быстрая доставка и аккуратная сборка.", name: "Марат", rating: 4, date: "2024-02-10" },
      { id: 5, text: "Мебель прочная и красивая.", name: "Диана", rating: 5, date: "2024-02-15" }
    ];
  });

  const [startIndex, setStartIndex] = useState(0);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  // Формы заказа и бронирования
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [orderData, setOrderData] = useState({ name: "", phone: "", address: "", product: "" });
  const [reservationData, setReservationData] = useState({ name: "", phone: "", product: "", date: "" });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const sendTelegram = (text) => {
    const encoded = encodeURIComponent(text);
    const telegramUrl = `https://t.me/Roma_ejj?text=${encoded}`;
    window.open(telegramUrl, "_blank");
  };

  const prev = () => {
    setStartIndex(startIndex === 0 ? reviews.length - 2 : startIndex - 2);
  };

  const next = () => {
    setStartIndex(startIndex >= reviews.length - 2 ? 0 : startIndex + 2);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) {
      alert(t.fillAllFields || "Заполните все поля и выберите рейтинг");
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
    setStartIndex(0);
  };

  const handleDeleteReview = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  const sendEmail = async (templateParams, templateId) => {
    try {
      // Настройки EmailJS - замените на свои значения после регистрации на emailjs.com
      const serviceId = 'YOUR_SERVICE_ID'; // Замените на ваш Service ID
      const publicKey = 'YOUR_PUBLIC_KEY'; // Замените на ваш Public Key
      
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      return true;
    } catch (error) {
      console.error('Ошибка отправки email:', error);
      return false;
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!orderData.name.trim() || !orderData.phone.trim() || !orderData.address.trim() || !orderData.product.trim()) {
      alert(t.fillAllFields || "Заполните все поля");
      return;
    }

    const telegramText = `Новый заказ с сайта!\n\nИмя: ${orderData.name}\nТелефон: ${orderData.phone}\nАдрес доставки: ${orderData.address}\nТовар: ${orderData.product}\n\nТип: Заказ/Покупка`;
    sendTelegram(telegramText);

    // Подготовка данных для email
    const emailData = {
      to_email: 'ramzanabduladyev23@gmail.com',
      from_name: orderData.name,
      from_phone: orderData.phone,
      address: orderData.address,
      product: orderData.product,
      message: `Новый заказ!\n\nИмя: ${orderData.name}\nТелефон: ${orderData.phone}\nАдрес доставки: ${orderData.address}\nТовар: ${orderData.product}\n\nТип: Заказ/Покупка`,
      subject: 'Новый заказ с сайта',
      reply_to: orderData.phone
    };

    // Отправка email
    const emailSent = await sendEmail(emailData, 'template_order'); // Замените на ваш Template ID для заказов
    
    if (emailSent) {
      alert(t.orderSuccess || `Заказ принят! Мы свяжемся с вами по телефону ${orderData.phone}`);
    } else {
      // Альтернативный способ через mailto
      const mailtoLink = `mailto:ramzanabduladyev23@gmail.com?subject=Новый заказ&body=Имя: ${encodeURIComponent(orderData.name)}%0AТелефон: ${encodeURIComponent(orderData.phone)}%0AАдрес: ${encodeURIComponent(orderData.address)}%0AТовар: ${encodeURIComponent(orderData.product)}`;
      window.location.href = mailtoLink;
      alert(t.orderSuccess || `Заказ принят! Мы свяжемся с вами по телефону ${orderData.phone}`);
    }

    setOrderData({ name: "", phone: "", address: "", product: "" });
    setShowOrderForm(false);
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    if (!reservationData.name.trim() || !reservationData.phone.trim() || !reservationData.product.trim() || !reservationData.date.trim()) {
      alert(t.fillAllFields || "Заполните все поля");
      return;
    }

    const telegramText = `Новая бронь товара с сайта!\n\nИмя: ${reservationData.name}\nТелефон: ${reservationData.phone}\nТовар: ${reservationData.product}\nДата бронирования: ${reservationData.date}\n\nТип: Бронирование товара`;
    sendTelegram(telegramText);

    // Подготовка данных для email
    const emailData = {
      to_email: 'ramzanabduladyev23@gmail.com',
      from_name: reservationData.name,
      from_phone: reservationData.phone,
      product: reservationData.product,
      date: reservationData.date,
      message: `Новая бронь товара!\n\nИмя: ${reservationData.name}\nТелефон: ${reservationData.phone}\nТовар: ${reservationData.product}\nДата бронирования: ${reservationData.date}\n\nТип: Бронирование товара`,
      subject: 'Новая бронь товара с сайта',
      reply_to: reservationData.phone
    };

    // Отправка email
    const emailSent = await sendEmail(emailData, 'template_reservation'); // Замените на ваш Template ID для бронирований
    
    if (emailSent) {
      alert(t.reservationSuccess || `Бронь оформлена! Товар ${reservationData.product} зарезервирован на ${reservationData.date}`);
    } else {
      // Альтернативный способ через mailto
      const mailtoLink = `mailto:ramzanabduladyev23@gmail.com?subject=Новая бронь товара&body=Имя: ${encodeURIComponent(reservationData.name)}%0AТелефон: ${encodeURIComponent(reservationData.phone)}%0AТовар: ${encodeURIComponent(reservationData.product)}%0AДата: ${encodeURIComponent(reservationData.date)}`;
      window.location.href = mailtoLink;
      alert(t.reservationSuccess || `Бронь оформлена! Товар ${reservationData.product} зарезервирован на ${reservationData.date}`);
    }

    setReservationData({ name: "", phone: "", product: "", date: "" });
    setShowReservationForm(false);
  };

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

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="reviews">
      <h2>{t.clientReviews || "Отзывы и рейтинг"}</h2>

      <div className="rating-summary">
        <div className="average-rating">
          <span className="rating-number">{averageRating}</span>
          <StarRating value={Math.round(averageRating)} readOnly={true} />
          <span className="rating-count">({reviews.length} {t.reviews || "отзывов"})</span>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="action-btn order-btn"
          onClick={() => {
            setShowOrderForm(!showOrderForm);
            setShowReservationForm(false);
          }}
        >
          {t.order || "Заказать / Купить"}
        </button>
        <button 
          className="action-btn reservation-btn"
          onClick={() => {
            setShowReservationForm(!showReservationForm);
            setShowOrderForm(false);
          }}
        >
          {t.reserve || "Забронировать товар"}
        </button>
      </div>

      {showOrderForm && (
        <form className="order-form" onSubmit={handleOrder}>
          <h3>{t.order || "Оформить заказ"}</h3>
          <input
            type="text"
            placeholder={t.yourName || "Ваше имя"}
            value={orderData.name}
            onChange={(e) => setOrderData({...orderData, name: e.target.value})}
          />
          <input
            type="tel"
            placeholder={t.phone || "Телефон"}
            value={orderData.phone}
            onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
          />
          <input
            type="text"
            placeholder={t.address || "Адрес доставки"}
            value={orderData.address}
            onChange={(e) => setOrderData({...orderData, address: e.target.value})}
          />
          <input
            type="text"
            placeholder={t.productName || "Название товара"}
            value={orderData.product}
            onChange={(e) => setOrderData({...orderData, product: e.target.value})}
          />
          <div className="form-buttons">
            <button type="submit">{t.send || "Отправить"}</button>
            <button type="button" onClick={() => setShowOrderForm(false)}>
              {t.cancel || "Отмена"}
            </button>
          </div>
        </form>
      )}

      {showReservationForm && (
        <form className="reservation-form" onSubmit={handleReservation}>
          <h3>{t.reserve || "Забронировать товар"}</h3>
          <input
            type="text"
            placeholder={t.yourName || "Ваше имя"}
            value={reservationData.name}
            onChange={(e) => setReservationData({...reservationData, name: e.target.value})}
          />
          <input
            type="tel"
            placeholder={t.phone || "Телефон"}
            value={reservationData.phone}
            onChange={(e) => setReservationData({...reservationData, phone: e.target.value})}
          />
          <input
            type="text"
            placeholder={t.productName || "Название товара"}
            value={reservationData.product}
            onChange={(e) => setReservationData({...reservationData, product: e.target.value})}
          />
          <input
            type="date"
            placeholder={t.date || "Дата бронирования"}
            value={reservationData.date}
            onChange={(e) => setReservationData({...reservationData, date: e.target.value})}
          />
          <div className="form-buttons">
            <button type="submit">{t.send || "Отправить"}</button>
            <button type="button" onClick={() => setShowReservationForm(false)}>
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

      <div className="review-slider">
        <button className="review-btn" onClick={prev}>‹</button>

        <div className="review-cards">
          {reviews.slice(startIndex, startIndex + 2).map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-header">
                <div className="review-info">
                  <span className="review-name">{review.name}</span>
                  {review.date && <span className="review-date">{review.date}</span>}
                </div>
                {review.rating && <StarRating value={review.rating} readOnly={true} />}
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

        <button className="review-btn" onClick={next}>›</button>
      </div>
    </div>
  );
}

export default Reviews