// src/components/Promociones.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { addToCart } from '../cartLogic';
import './css/Promociones.css';

function Promociones() {
  const [promotions, setPromotions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'promotions'));
        const promotionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPromotions(promotionsData);
      } catch (error) {
        console.error("Error al obtener las promociones:", error);
      }
    };

    fetchPromotions();
  }, []);

  useEffect(() => {
    if (promotions.length === 0) return; // Evitar dividir por cero

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % promotions.length);
    }, 10000); // Cambia de imagen cada 10 segundos

    return () => clearInterval(interval);
  }, [promotions.length]);

  const handleAddToCart = (promotion) => {
    const promotionWithPrice = {
      ...promotion,
      price: parseFloat(promotion.price)
    };
    addToCart(promotionWithPrice);
    alert('¡Promoción añadida al carrito!');
  };

  return (
    <section id="promociones" className="promociones-container">
      <Helmet>
        <title>Promociones de Pizzería - Pizza Cheese</title>
        <meta name="description" content="Descubre las increíbles promociones de Pizza Cheese en San José Pinula. ¡Ofertas irresistibles, ordena ahora!" />
        <meta property="og:title" content="Promociones de Pizzería - Pizza Cheese" />
        <meta property="og:description" content="Aprovecha las promociones de Pizza Cheese en San José Pinula. Ofertas especiales en pizzas y más." />
        <meta property="og:image" content="%PUBLIC_URL%/logo192.png" />
        <meta property="og:url" content="https://cheesepizza-gt.web.app/promociones" />
      </Helmet>
      <h2 className="promociones-title">Nuestras Promociones</h2>
      <div className="promociones-carousel">
        {/* Botón para retroceder */}
        <button
          className="promociones-arrow promociones-arrow-left"
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + promotions.length) % promotions.length)}
          aria-label="Retroceder promoción"
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter') setCurrentIndex((prevIndex) => (prevIndex - 1 + promotions.length) % promotions.length);
          }}
        >
          ←
        </button>
        {/* Contenedor del carrusel */}
        <div
          className="promociones-carousel-container"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {promotions.map((promo, index) => (
            <div className="promociones-promotion-item" key={promo.id}>
              {promo.imageUrl && <img src={promo.imageUrl} alt={promo.title || 'Promoción'} loading="lazy" />}
              <div className="promociones-promotion-details">
                <h4>{promo.title}</h4>
                <p>{promo.description}</p>
                <p><strong>Precio: Q.{promo.price}.00</strong></p>
                <button className="promociones-button" onClick={() => handleAddToCart(promo)}>
                  <span>Add to cart</span>
                  <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                    <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
                    <g id="SVGRepo_iconCarrier">
                      <defs></defs>
                      <g id="cart">
                        <circle r="1.91" cy="20.59" cx="10.07" className="cls-1"></circle>
                        <circle r="1.91" cy="20.59" cx="18.66" className="cls-1"></circle>
                        <path d="M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10" className="cls-1"></path>
                        <polyline points="7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91" className="cls-1"></polyline>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Botón para avanzar */}
        <button
          className="promociones-arrow promociones-arrow-right"
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % promotions.length)}
          aria-label="Avanzar promoción"
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter') setCurrentIndex((prevIndex) => (prevIndex + 1) % promotions.length);
          }}
        >
          →
        </button>
      </div>
    </section>
  );
}

export default Promociones;
