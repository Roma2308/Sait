import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Info.css";

function Info() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://693e572112c964ee6b6d1e01.mockapi.io/mebel/v1/mebel");
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="info-page">
      <h1>Наша мебель</h1>
      <div className="products">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.avatar} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.desc}</p>
            <p className="price">Цена: {item.price} сом</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Info