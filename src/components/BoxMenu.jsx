import React, { useEffect, useState, useRef } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { addToCart, loadCartFromLocalStorage } from '../cartLogic';
import './css/BoxMenu.css';

function BoxMenu() {
  const [boxes, setBoxes] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const observerRef = useRef(null);

  const categories = ['box', 'premium box', 'family box', 'gift box'];

  useEffect(() => {
    loadCartFromLocalStorage();
    fetchBoxes();
  }, []);

  const fetchBoxes = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'menuBox'));
      const boxesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log('Datos de Firestore:', boxesData);
      setBoxes(boxesData);
      setVisibleItems(boxesData.map(() => false));
    } catch (err) {
      console.error('Error al cargar los datos de Boxes:', err);
    }
  };

  useEffect(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0.1 };
    const callback = (entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.dataset.index);
        if (entry.isIntersecting) {
          setVisibleItems((prev) => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
          observerRef.current.unobserve(entry.target);
        }
      });
    };

    observerRef.current = new IntersectionObserver(callback, options);
    const items = document.querySelectorAll('.box-item');
    items.forEach((item) => observerRef.current.observe(item));

    return () => {
      items.forEach((item) => observerRef.current.unobserve(item));
    };
  }, [boxes]);

  const handleSelectBox = (box) => {
    addToCart(box);
    alert('¡Box agregado al carrito!');
  };

  return (
    <div id="box-menu" className="box-menu-container">
      <h2 className="box-menu-title">Menú de Boxes</h2>
      {categories.map((category) => (
        <div key={category}>
          <h3 className="box-category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <div className="box-category">
            {boxes
              .filter((box) => box.category === category)
              .map((box, index) => (
                <div
                  className={`box-item ${visibleItems[index] ? 'fade-in' : 'fade-out'}`}
                  key={box.id}
                  data-index={index}
                >
                  {box.imageUrl && <img src={box.imageUrl} alt={box.name} />}
                  <h4>{box.name}</h4>
                  <p>{box.description}</p>
                  <p><strong>Precio: Q.{box.price}.⁰⁰</strong></p>
                  <button onClick={() => handleSelectBox(box)} className="btn">Agregar</button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BoxMenu;
