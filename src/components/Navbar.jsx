// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importar íconos para el menú hamburguesa

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Función para cerrar el menú al hacer clic en un enlace (en dispositivos móviles)
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Ícono de menú hamburguesa */}
        <div className="menu-icon" onClick={toggleMenu} aria-label="Toggle menu" role="button" tabIndex={0}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Enlaces de navegación */}
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="nav-link" onClick={closeMenu}>
              Menú
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/promociones" className="nav-link" onClick={closeMenu}>
              Promociones
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contacto" className="nav-link" onClick={closeMenu}>
              Contacto
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about-us" className="nav-link" onClick={closeMenu}>
              Nosotros
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link" onClick={closeMenu}>
              Servicios
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
