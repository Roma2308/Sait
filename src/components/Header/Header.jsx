import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/emerek.png';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Logo" />
        <span>Мебель</span>
      </div>
      <nav className="header-nav">
        <Link to="/">Главная</Link>
        <Link to="/about">О нас</Link>
        <Link to="/contact">Контакты</Link>
        <Link to="/rev">Отзывы</Link>
      </nav>
    </header>
  );
}

export default Header