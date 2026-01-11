import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Info.css";
import { useLanguage } from "../../contexts/LanguageContext";

function Info() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    avatar: "",
    desc: "",
  });
  const [adding, setAdding] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";

  useEffect(() => {
    axios
      .get("https://693e572112c964ee6b6d1e01.mockapi.io/mebel/v1/mebel")
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const toggleFavorite = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    // Проверка авторизации
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (!storedUser || !loggedIn) {
      if (confirm(t.needLoginForFavorites + "\n\n" + t.pleaseLogin + "?")) {
        navigate("/register");
      }
      return;
    }

    const exists = favorites.find((f) => f.id === product.id);
    const newFav = exists
      ? favorites.filter((f) => f.id !== product.id)
      : [...favorites, product];

    setFavorites(newFav);
    localStorage.setItem("favorites", JSON.stringify(newFav));
  };

  const addToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    const exists = cart.find((c) => c.id === product.id);
    if (!exists) {
      const newCart = [...cart, product];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.dispatchEvent(new Event('storage'));
      if (t.addedToCart) alert(`${product.name} ${t.addedToCart}`);
    } else {
      if (t.alreadyInCart) alert(`${product.name} ${t.alreadyInCart}`);
    }
  };

  const removeFromCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    const newCart = cart.filter((c) => c.id !== product.id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
    if (t.productRemoved) alert(`${product.name} ${t.productRemoved}`);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name.trim() || !newProduct.price.trim() || !newProduct.avatar.trim()) {
      alert(t.fillAllFields);
      return;
    }

    try {
      setAdding(true);
      const response = await axios.post(
        "https://693e572112c964ee6b6d1e01.mockapi.io/mebel/v1/mebel",
        {
          name: newProduct.name,
          price: newProduct.price,
          avatar: newProduct.avatar,
          desc: newProduct.desc,
        }
      );
      setProducts([response.data, ...products]);
      setNewProduct({ name: "", price: "", avatar: "", desc: "" });
      if (t.productAddedSuccess) alert(t.productAddedSuccess);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setAdding(false);
    }
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2>{t.loading}</h2>;

  return (
    <div className="info-page">
      <h1>{t.ourFurniture}</h1>

      {/* <form className="add-product-form" onSubmit={handleAddProduct}>
        <h2>{t.addNewProductTitle}</h2>
        <input
          type="text"
          placeholder={t.productNamePlaceholder}
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder={t.productPricePlaceholder}
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder={t.productPhotoPlaceholder}
          value={newProduct.avatar}
          onChange={(e) =>
            setNewProduct({ ...newProduct, avatar: e.target.value })
          }
        />
        <textarea
          placeholder={t.productDescPlaceholder}
          value={newProduct.desc}
          onChange={(e) =>
            setNewProduct({ ...newProduct, desc: e.target.value })
          }
        />
        <button type="submit" disabled={adding}>
          {adding ? t.sending : t.saveProduct}
        </button>
      </form> */}

      <div className="products">
        {filteredProducts.map((item) => (
          <Link
            to={`/vnutr/${item.id}`}
            className="product-card"
            key={item.id}
          >
            <div className="product-img">
              <img src={item.avatar} alt={item.name} />

              <span
                className={`favorite ${
                  favorites.find((f) => f.id === item.id) ? "active" : ""
                }`}
                onClick={(e) => toggleFavorite(item, e)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9484/9484251.png"
                  alt="heart"
                />
              </span>

            </div>

            <h3>{item.name}</h3>
            <p>{item.desc}</p>
            <p className="price">
              {t.price}: {item.price} {t.som}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Info