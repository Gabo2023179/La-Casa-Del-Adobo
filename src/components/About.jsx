// src/components/About.jsx
import React from 'react';
import './css/About.css'; // Asegúrate de crear este archivo para estilos
import RestauranteImage1 from '../components/assets/sucursalP.png'; 

function About() {
  // Enlace directo a la ubicación en Google Maps
  const googleMapsLink = "https://www.google.com/maps/place/La+Casa+del+Adobo/@14.5895323,-90.5812621,17z/data=!3m1!4b1!4m6!3m5!1s0x8589a187414b5b6d:0x5c0a39913a3dff81!8m2!3d14.5895271!4d-90.5786872!16s%2Fg%2F11hszlrjrx?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <div className="about-container">
      {/* Sección de Introducción */}
      <section className="about-intro">
        <h2>Nosotros</h2>
        <p>¡Somos el mejor restaurante de comida mexicana de la ciudad! En Lacasadeladobo, nos dedicamos a ofrecer una experiencia culinaria auténtica con un toque moderno. ¿Necesitas organizar tu evento? ¡Cuenta con nosotros para hacerlo inolvidable!</p>
      </section>

      {/* Galería de Fotografías */}
      <section className="about-gallery">
        <h3>Nuestras Instalaciones</h3>
        <div className="gallery">
          <img src={RestauranteImage1} alt="Interior del restaurante" />
          {/* Puedes agregar más imágenes aquí si las tienes */}
        </div>
      </section>

      {/* Detalles del Restaurante */}
      <section className="about-details">
        <h3>Detalles</h3>
        <div className="details-grid">
          <div className="detail-item">
            <h4>Dirección</h4>
            <p>5ta Calle 6-20 Sector C-1 Zona 8 de Mixco, Guatemala</p>
          </div>
          <div className="detail-item">
            <h4>Teléfono</h4>
            <p>2491 9999</p>
          </div>
          <div className="detail-item">
            <h4>Email</h4>
            <p><a href="mailto:lacasadeladobo@gmail.com">lacasadeladobo@gmail.com</a></p>
          </div>
          <div className="detail-item">
            <h4>Horario</h4>
            <p>11 Am. - 11 Pm.</p>
          </div>
          <div className="detail-item">
            <h4>Servicios</h4>
            <p>Consumo en el lugar · Terraza o mesas al aire libre · Retiro desde el coche</p>
          </div>
          <div className="detail-item">
            <h4>Recomendado por</h4>
            <p>70% (31 opiniones)</p>
          </div>
        </div>
      </section>

      {/* Botón para Google Maps y Dirección en Texto */}
      <section className="about-map">
        <h3>Encuéntranos</h3>
        <div className="map-button-container">
          <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="map-button">
            <i className="fas fa-map-marker-alt"></i> Ver en Google Maps
          </a>
        </div>
        <div className="address-text">
          <p>5ta Calle 6-20 Sector C-1 Zona 8 de Mixco, Guatemala</p>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="about-contact">
        <h3>Contacto</h3>
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-phone-alt"></i>
            <span>2491 9999</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span><a href="mailto:lacasadeladobo@gmail.com">lacasadeladobo@gmail.com</a></span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
