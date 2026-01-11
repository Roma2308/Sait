import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

function Login() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert(t.fillAllFields);
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (!storedUser) {
      alert(t.userNotFound);
      navigate("/register");
      return;
    }

    if (email.trim() === storedUser.email && password.trim() === storedUser.password) {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      alert(t.loginSuccess);
      navigate("/profile");
    } else {
      alert(t.wrongCredentials);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className={`login-container ${theme}`}>
      <div className="login-card">
        <h2>{t.login}</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder={t.email} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder={t.password} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{t.login}</button>
          <p className="register-link">
            {t.dontHaveAccount} <a href="/register">{t.register}</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login