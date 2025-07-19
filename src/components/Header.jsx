// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Usa un ícono de carrito
import logo from './assets/logo.png'; // Asegúrate de tener el logo en esta ruta
import './css/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/cart" className="header-cart-button">
          <FaShoppingCart className="header-cart-icon" />
          <span className="header-cart-text">Carrito</span>
        </Link>
        <Link to="/menu" className="header-logo-link">
          <img src={logo} alt="La Casa del Adobo" className="header-logo" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
