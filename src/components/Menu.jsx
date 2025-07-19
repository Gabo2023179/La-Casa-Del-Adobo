// src/components/Menu.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { addToCart, loadCartFromLocalStorage } from '../cartLogic';
import './css/Menu.css';

function Menu() {
  const [products, setProducts] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const observerRef = useRef(null);

  const categories = [
    'Entradas',
    'Menu Infantil',
    'Platos de la Casa',
    'Taquizas',
    'Postres',
    'Lunch',
    'Ceviches',
    'Hamburguesas',
    'Licores',
    'Cocteles',
    'Bebidas',
  ];

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
  
    const callback = (entries) => {
      entries.forEach(entry => {
        const index = Number(entry.target.dataset.index);
        if (entry.isIntersecting) {
          setVisibleItems(prev => {
            const newVisible = [...prev];
            newVisible[index] = true; // Una vez que el elemento es visible, permanece visible
            return newVisible;
          });
          // Una vez que un elemento es visible, dejar de observarlo para que no desaparezca
          observerRef.current.unobserve(entry.target);
        }
      });
    };
  
    observerRef.current = new IntersectionObserver(callback, options);
    const items = document.querySelectorAll('.menu-item');
    items.forEach((item) => observerRef.current.observe(item));
  
    return () => {
      items.forEach((item) => observerRef.current.unobserve(item));
    };
  }, [products]);
  
  useEffect(() => {
    loadCartFromLocalStorage();
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'menu'));
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
      setVisibleItems(productsData.map(() => false));
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    const callback = (entries) => {
      entries.forEach(entry => {
        const index = Number(entry.target.dataset.index);
        if (entry.isIntersecting) {
          setVisibleItems(prev => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        } else {
          setVisibleItems(prev => {
            const newVisible = [...prev];
            newVisible[index] = false;
            return newVisible;
          });
        }
      });
    };
    observerRef.current = new IntersectionObserver(callback, options);
    const items = document.querySelectorAll('.menu-item');
    items.forEach((item) => observerRef.current.observe(item));
    return () => {
      items.forEach((item) => observerRef.current.unobserve(item));
    };
  }, [products]);

  const handleSelectProduct = (product) => {
    addToCart(product);
    alert('¡Producto agregado al carrito!');
  };

  return (
    <div id="menu" className="menu-container">
      <Helmet>
        <title>Menú de La casa del adobo</title>
        <meta name="description" content="Descubre el delicioso menú de TLa casa del adobo." />
        <meta property="og:title" content="Menú de La casa del adobo" />
        <meta property="og:description" content="Disfruta del menú completo de La casa del adobo." />
      </Helmet>
      <h2 className="menu-title">Menú</h2>
      {categories.map(category => (
        <div key={category}>
          <h3 className="menu-category-title">{category}</h3>
          <div className="menu-category">
            {products.filter(product => product.category === category.toLowerCase()).map((product, index) => (
              <div
                className={`menu-item ${visibleItems[index] ? 'fade-in' : 'fade-out'}`}
                key={product.id}
                data-index={index}
              >
                <img src={product.imageUrl} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <p><strong>Precio: Q.{product.price}.⁰⁰</strong></p>
                <button class="btn" onClick={() => handleSelectProduct(product)}>Agregar</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menu;
