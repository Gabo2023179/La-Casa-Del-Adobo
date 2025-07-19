// src/components/VerMensajes.jsx
import React, { useEffect, useState } from 'react';
import './css/VerMensajes.css'; // Asegúrate de crear este archivo para estilos
import { db } from '../firebase'; // Asegúrate de que la ruta es correcta
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { 
  FaUser, 
  FaEnvelope, 
  FaCommentDots, 
  FaClock, 
  FaClipboardList, 
  FaPhone, 
  FaUtensils, 
  FaTruck 
} from 'react-icons/fa'; // Importar todos los íconos necesarios

function VerMensajes() {
  const [mensajes, setMensajes] = useState([]);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Función para obtener mensajes desde Firestore
  const obtenerMensajes = async () => {
    try {
      const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const mensajesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMensajes(mensajesData);
    } catch (e) {
      console.error("Error al obtener mensajes: ", e);
      setError('Hubo un error al obtener los mensajes.');
    }
  };

  // Función para obtener cotizaciones desde Firestore
  const obtenerCotizaciones = async () => {
    try {
      const q = query(collection(db, "cotizaciones"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const cotizacionesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCotizaciones(cotizacionesData);
    } catch (e) {
      console.error("Error al obtener cotizaciones: ", e);
      setError('Hubo un error al obtener las cotizaciones.');
    }
  };

  useEffect(() => {
    // Función para obtener ambos tipos de datos
    const fetchData = async () => {
      await obtenerMensajes();
      await obtenerCotizaciones();
      setLoading(false);
    };

    fetchData();

    // Configurar interval para actualizar datos cada 5 segundos (5000 ms)
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    // Limpiar el interval al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <p className="loading">Cargando datos...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="vermensajes-container">
      {/* Sección de Mensajes de Contacto */}
      <section className="seccion-mensajes">
        <h2>Mensajes de Contacto</h2>
        {mensajes.length === 0 ? (
          <p>No hay mensajes para mostrar.</p>
        ) : (
          <div className="mensajes-list">
            {mensajes.map(mensaje => (
              <div key={mensaje.id} className="mensaje-item">
                <div className="mensaje-header">
                  <FaUser className="mensaje-icon" />
                  <h4>{mensaje.name}</h4>
                </div>
                <div className="mensaje-email">
                  <FaEnvelope className="mensaje-icon" />
                  <p>{mensaje.email}</p>
                </div>
                <div className="mensaje-message">
                  <FaCommentDots className="mensaje-icon" />
                  <p>{mensaje.message}</p>
                </div>
                <div className="mensaje-timestamp">
                  <FaClock className="mensaje-icon" />
                  <p>{mensaje.timestamp.toDate().toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sección de Cotizaciones de Servicios */}
      <section className="seccion-cotizaciones">
        <h2>Cotizaciones de Servicios</h2>
        {cotizaciones.length === 0 ? (
          <p>No hay cotizaciones para mostrar.</p>
        ) : (
          <div className="cotizaciones-list">
            {cotizaciones.map(cotizacion => (
              <div key={cotizacion.id} className="cotizacion-item">
                <div className="cotizacion-header">
                  <FaClipboardList className="cotizacion-icon" />
                  <h4>{cotizacion.nombre}</h4>
                </div>
                <div className="cotizacion-email">
                  <FaEnvelope className="cotizacion-icon" />
                  <p>{cotizacion.email}</p>
                </div>
                <div className="cotizacion-telefono">
                  <FaPhone className="cotizacion-icon" />
                  <p>{cotizacion.telefono}</p>
                </div>
                <div className="cotizacion-tipoEvento">
                  <FaUtensils className="cotizacion-icon" />
                  <p>{cotizacion.tipoEvento}</p>
                </div>
                <div className="cotizacion-fecha">
                  <FaClock className="cotizacion-icon" />
                  <p>{cotizacion.fecha}</p>
                </div>
                <div className="cotizacion-asistentes">
                  <FaUser className="cotizacion-icon" />
                  <p>{cotizacion.asistentes} Asistentes</p>
                </div>
                <div className="cotizacion-serviciosAdicionales">
                  <FaTruck className="cotizacion-icon" />
                  <p>{cotizacion.serviciosAdicionales}</p>
                </div>
                <div className="cotizacion-mensaje">
                  <FaCommentDots className="cotizacion-icon" />
                  <p>{cotizacion.mensaje}</p>
                </div>
                <div className="cotizacion-timestamp">
                  <FaClock className="cotizacion-icon" />
                  <p>{cotizacion.timestamp.toDate().toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default VerMensajes;
