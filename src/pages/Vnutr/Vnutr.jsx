import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Vnutr.css";

const PAYPAL_BUSINESS_EMAIL = "ramzanabduladyev23@gmail.com"; // Замените на ваш реальный PayPal email

function Vnutr() {
  const { t, language } = useLanguage();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    axios
      .get(`https://693e572112c964ee6b6d1e01.mockapi.io/mebel/v1/mebel/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <h2>{t.loading}</h2>;

  const handleBookingSend = () => {
    if (!message.trim()) return;

    const baseMessage =
      language === "ru"
        ? `Бронирование товара:\nНазвание: ${product.name}\nЦена: ${product.price} ${t.som}\nСообщение клиента: ${message}`
        : language === "ky"
        ? `Товар брондоо:\nАты: ${product.name}\nБаа: ${product.price} ${t.som}\nКардардын билдирүүсү: ${message}`
        : `Product booking:\nName: ${product.name}\nPrice: ${product.price} ${t.som}\nCustomer message: ${message}`;

    const encoded = encodeURIComponent(baseMessage);

    const whatsappUrl = `https://wa.me/996704122935?text=${encoded}`;
    const telegramUrl = `https://t.me/Roma_ejj?text=${encoded}`;

    window.open(whatsappUrl, "_blank");
    window.open(telegramUrl, "_blank");

    setSent(true);
    setMessage("");
  };

  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(
    PAYPAL_BUSINESS_EMAIL
  )}&item_name=${encodeURIComponent(
    product.name
  )}&amount=${encodeURIComponent(product.price)}&currency_code=USD`;

  return (
    <div className="single-product">
      <div className="img-container">
        <img src={product.avatar} alt={product.name} />
        <Link to="/" className="back-btn">
          {t.back}
        </Link>
      </div>

      <h2>{product.name}</h2>
      <p>{product.desc}</p>
      <p className="price">
        {t.price}: {product.price} {t.som}
      </p>

      <a
        href={paypalUrl}  
        className="paypal-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.payWithPaypal}
      </a>

      {!sent ? (
        <>
          <textarea
            placeholder={t.writeToOwner}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send-btn" onClick={handleBookingSend}>
            {t.bookAndSend}
          </button>
        </>
      ) : (
        <div className="message-sent">{t.messageSent}</div>
      )}
    </div>
  );
}

export default Vnutr;