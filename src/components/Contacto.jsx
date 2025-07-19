// src/components/Contacto.jsx
import React, { useState } from 'react';
import './css/Contacto.css'; // Asegúrate de crear este archivo para estilos
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Importar íconos específicos
import { db } from '../firebase'; // Importar la configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';

function Contacto() {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Estado para manejar el envío del formulario
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Enlace directo a la ubicación en Google Maps
  const googleMapsLink = "https://www.google.com/maps/place/5ta+Calle+6-20+Sector+C-1+Zona+8+de+Mixco,+Guatemala"; // Reemplaza con tu enlace real

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Añadir un nuevo documento con los datos del formulario
      const docRef = await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date()
      });
      console.log("Documento escrito con ID: ", docRef.id);
      setSubmitted(true);
      // Limpiar los campos del formulario
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (e) {
      console.error("Error añadiendo documento: ", e);
      setError('Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="contacto-container">
      {/* Sección de Introducción */}
      <section className="contacto-intro">
        <h2>Contacto</h2>
        <p>Estamos aquí para ayudarte. Si tienes preguntas o deseas hacer un pedido, no dudes en contactarnos.</p>
      </section>

      {/* Detalles de Contacto */}
      <section className="contacto-details">
        <div className="contacto-item">
          <FaPhoneAlt className="contacto-icon" />
          <div>
            <h4>Teléfono</h4>
            <p>3245-1619</p>
          </div>
        </div>
        <div className="contacto-item">
          <FaEnvelope className="contacto-icon" />
          <div>
            <h4>Email</h4>
            <p><a href="mailto:lacasadeladobo@gmail.com">lacasadeladobo@gmail.com</a></p>
          </div>
        </div>
        <div className="contacto-item">
          <FaMapMarkerAlt className="contacto-icon" />
          <div>
            <h4>Dirección</h4>
            <p>5ta Calle 6-20 Sector C-1 Zona 8 de Mixco, Guatemala</p>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section className="contacto-form">
        <h3>Envíanos un Mensaje</h3>
        {submitted ? (
          <p className="success-message">¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje:</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tu mensaje"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">Enviar</button>
          </form>
        )}
      </section>
    </div>
  );
}

export default Contacto;
