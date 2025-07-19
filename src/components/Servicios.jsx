// src/components/Servicios.jsx
import React, { useState } from 'react';
import './css/Servicios.css'; // Asegúrate de crear este archivo para estilos
import { FaClipboardList, FaBeer, FaUtensils, FaTruck } from 'react-icons/fa'; // Importar íconos específicos
import { db } from '../firebase'; // Asegúrate de que la ruta es correcta
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Importar imágenes
import ConvivioImage from './assets/convivio.jpg';
import ConvivenciaImage from './assets/convivencia.png';
import RentaEspacioImage from './assets/espacio.jpeg';
import OtrosEventosImage from './assets/food.avif';

function Servicios() {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoEvento: '',
    fecha: '',
    asistentes: '',
    serviciosAdicionales: '',
    mensaje: ''
  });

  // Estado para manejar el envío del formulario
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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
      const docRef = await addDoc(collection(db, "cotizaciones"), {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        tipoEvento: formData.tipoEvento,
        fecha: formData.fecha,
        asistentes: formData.asistentes,
        serviciosAdicionales: formData.serviciosAdicionales,
        mensaje: formData.mensaje,
        timestamp: serverTimestamp()
      });
      console.log("Cotización enviada con ID: ", docRef.id);
      setSubmitted(true);
      // Limpiar los campos del formulario
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        tipoEvento: '',
        fecha: '',
        asistentes: '',
        serviciosAdicionales: '',
        mensaje: ''
      });
    } catch (e) {
      console.error("Error al enviar cotización: ", e);
      setError('Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="servicios-container">
      {/* Sección de Introducción */}
      <section className="servicios-intro">
        <h2>Nuestros Servicios</h2>
        <p>
          En nuestro Football Bar, ofrecemos el espacio perfecto para tus eventos, ya sean convivios, convivencias, o cualquier otra celebración. Contamos con pantallas grandes, varias mesas, una isla con una amplia variedad de licores, y un menú extenso que incluye tacos, hamburguesas, y una gran variedad de bebidas.
        </p>
      </section>

      {/* Descripción de Servicios e Instalaciones */}
      <section className="servicios-descripcion">
        {/* Convivio */}
        <div className="servicio-item">
          <img src={ConvivioImage} alt="Convivio" className="servicio-imagen" />
          <div className="servicio-texto">
            <FaClipboardList className="servicio-icon" />
            <h3>Convivios</h3>
            <p>
              Organiza convivios inolvidables en nuestro espacio. Perfecto para reuniones familiares, aniversarios o cualquier celebración especial. Disfruta de un ambiente acogedor, servicio personalizado y nuestro menú exclusivo.
            </p>
          </div>
        </div>

        {/* Convivencia */}
        <div className="servicio-item">
          <img src={ConvivenciaImage} alt="Convivencia" className="servicio-imagen" />
          <div className="servicio-texto">
            <FaBeer className="servicio-icon" />
            <h3>Convivencias</h3>
            <p>
              Ideal para convivencias de grupos grandes, equipos deportivos o eventos corporativos. Nuestro espacio está equipado con múltiples pantallas para disfrutar de eventos deportivos en vivo, además de una amplia selección de bebidas y catering de alta calidad.
            </p>
          </div>
        </div>

        {/* Renta de Espacio */}
        <div className="servicio-item">
          <img src={RentaEspacioImage} alt="Renta de Espacio" className="servicio-imagen" />
          <div className="servicio-texto">
            <FaUtensils className="servicio-icon" />
            <h3>Renta de Espacio</h3>
            <p>
              Rentamos nuestro espacio para eventos privados o corporativos. Ya sea para una fiesta, una presentación, una reunión de negocios o cualquier otro tipo de evento, te ofrecemos todas las facilidades necesarias para que tu evento sea un éxito.
            </p>
          </div>
        </div>

        {/* Otros Eventos */}
        <div className="servicio-item">
          <img src={OtrosEventosImage} alt="Otros Eventos" className="servicio-imagen" />
          <div className="servicio-texto">
            <FaTruck className="servicio-icon" />
            <h3>Otros Eventos</h3>
            <p>
              Además, contamos con un foodtruck para llevar nuestros deliciosos combos a eventos externos. Perfecto para conferencias, ferias, bodas y cualquier otra ocasión que requiera un servicio de catering móvil de alta calidad.
            </p>
          </div>
        </div>
      </section>

      {/* Formulario de Cotización */}
      <section className="servicios-formulario">
        <h3>Solicita una Cotización</h3>
        {submitted ? (
          <p className="success-message">¡Gracias por tu solicitud! Nos pondremos en contacto contigo pronto.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                value={formData.nombre}
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
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                placeholder="Tu teléfono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tipoEvento">Tipo de Evento:</label>
              <select
                id="tipoEvento"
                name="tipoEvento"
                value={formData.tipoEvento}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="Convivio">Convivio</option>
                <option value="Convivencia">Convivencia</option>
                <option value="Renta de Espacio">Renta de Espacio</option>
                <option value="Otros Eventos">Otros Eventos</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fecha">Fecha del Evento:</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="asistentes">Número de Asistentes:</label>
              <input
                type="number"
                id="asistentes"
                name="asistentes"
                placeholder="Cantidad de asistentes"
                value={formData.asistentes}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="serviciosAdicionales">Servicios Adicionales:</label>
              <textarea
                id="serviciosAdicionales"
                name="serviciosAdicionales"
                placeholder="¿Necesitas servicios adicionales? (e.g., foodtruck, decoración, etc.)"
                rows="4"
                value={formData.serviciosAdicionales}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                placeholder="Cuéntanos más sobre tu evento..."
                rows="5"
                value={formData.mensaje}
                onChange={handleChange}
              ></textarea>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">Enviar Cotización</button>
          </form>
        )}
      </section>
    </div>
  );
}

export default Servicios;
