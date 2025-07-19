// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import './css/Footer.css'; // Importa el CSS

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h5 className="footer-title">Información de Contacto</h5>
            <ul className="footer-list">
              <li>5ta Calle 6-20 Panorama San Cristobal Zona 8 de Mixco, Mixco, Guatemala</li>
              <li>5ta calle 6-20 sector c-1, Cdad. de Guatemala </li>
              <li>Zona 3 me Mixco, 48 avenida, 2-57, colonia El Rosario</li>
              <li>Teléfono: 3245-1619</li>
            </ul>
          </div>
          <div className="footer-col">
            <h5 className="footer-title">Redes Sociales</h5>
            <ul className="footer-social-list">
              <li>
                <a href="https://www.facebook.com/lacasadeladobogt/" target="_blank" rel="noreferrer" className="footer-social-link">
                  <FaFacebook className="social-icon" /> Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/lacasadeladobogt/?hl=es" target="_blank" rel="noreferrer" className="footer-social-link">
                  <FaInstagram className="social-icon" /> Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5 className="footer-title">Enlaces Útiles</h5>
            <ul className="footer-list">
              <li><a href="/about-us" className="footer-link">Sobre Nosotros</a></li>
              <li><a href="/menu" className="footer-link">Menú</a></li>
              <li><a href="/cart" className="footer-link">Pedidos en Línea</a></li>
              <li><a href="/faqs" className="footer-link">Preguntas Frecuentes</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5 className="footer-title">Aviso Legal</h5>
            <ul className="footer-list">
              <li>&copy; 2024 La Casa del Adobo. Todos los derechos reservados.</li>
              <li>Métodos de pago: Visa, Mastercard</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Desarrollado con ♥ por estudiantes de Fundacion Kinal</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
