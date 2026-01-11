import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

function Register() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name.trim() || !surname.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      alert(t.fillAllFields);
      return;
    }

    // Проверка существующего пользователя
    const existingUser = JSON.parse(localStorage.getItem("userData"));
    if (existingUser && existingUser.email === email) {
      alert(t.userAlreadyExists);
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      surname: surname.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: password.trim(),
      photo: photo || "",
    };

    localStorage.setItem("userData", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", JSON.stringify(true));

    alert(t.registerSuccess);
    navigate("/profile");
  };

  return (
    <div className={`register-page ${theme}`}>
      <div className="register-card">
        <h1>{t.register}</h1>

        <div className="photo-upload">
          {photo ? (
            <img src={photo} alt="profile" className="photo-preview" />
          ) : (
            <div className="photo-placeholder">{t.photo}</div>  
          )}

          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="photo" className="photo-label">{t.chooseFile}</label>
        </div>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder={t.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder={t.surname}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder={t.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">{t.register}</button>
          <p className="login-link">
            {t.alreadyHaveAccount} <a href="/login">{t.login}</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register