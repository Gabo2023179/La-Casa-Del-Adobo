// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './css/Home.css';
import Menu from './Menu';
import Promociones from './Promociones';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importar los estilos de AOS

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState('auto');

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, 'homePosts'));
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % posts.length);
    }, 10000); // Cambia de imagen cada 10 segundos
    return () => clearInterval(interval);
  }, [posts.length]);

  useEffect(() => {
    AOS.init(); // Inicializa AOS
  }, []);

  // Actualizar la altura del carrusel según la imagen actual
  useEffect(() => {
    if (posts.length > 0) {
      const currentImage = document.getElementById(`carousel-image-${currentIndex}`);
      if (currentImage) {
        // Obtener la altura natural de la imagen
        currentImage.onload = () => {
          setCarouselHeight(`${currentImage.clientHeight}px`);
        };
        // En caso de que la imagen ya esté cargada
        if (currentImage.complete) {
          setCarouselHeight(`${currentImage.clientHeight}px`);
        }
      }
    }
  }, [currentIndex, posts]);

  return (
    <div className="home-container">
      <Helmet>
        <title>Pizza Cheese - San José Pinula</title>
        <meta name="description" content="Pizza Cheese - San José Pinula. Ingredientes de calidad, mucho queso, ¡ordena ahora!" />
        <meta property="og:title" content="Pizza Cheese - San José Pinula" />
        <meta property="og:description" content="Disfruta de la mejor pizza en San José Pinula. ¡Ordena en línea ahora!" />
        <meta property="og:image" content="%PUBLIC_URL%/logo192.png" />
        <meta property="og:url" content="https://cheesepizza-gt.web.app/" />
      </Helmet>
      <div className="carousel" style={{ height: carouselHeight }}>
        <div
          className="carousel-container"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {posts.map((post, index) => (
            <div
              className="post-item"
              key={post.id}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 200}
            >
              {post.imageUrl && (
                <img
                  id={`carousel-image-${index}`}
                  src={post.imageUrl}
                  alt={post.title || `Imagen ${index + 1}`}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
        {/* Eliminados los botones de navegación */}
      </div>
      <Promociones />
      <Menu />
    </div>
  );
}

export default Home;
