// src/components/ParentComponent.jsx
import React, { useState, useEffect } from 'react';
import AddPromociones from './AddPromociones';
import { db } from '../firebase'; // Ajusta la ruta si es necesario
import { collection, getDocs } from 'firebase/firestore'; // Importa Firestore

function ParentComponent() {
  const [promotions, setPromotions] = useState([]);

  const handlePromotionAdded = () => {
    fetchPromotions(); // Actualiza la lista de promociones
  };

  const fetchPromotions = async () => {
    const snapshot = await getDocs(collection(db, 'promotions'));
    const promotionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPromotions(promotionsData);
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  return (
    <div>
      <h1>Agregar Promociones</h1>
      <AddPromociones onPromotionAdded={handlePromotionAdded} />
      <div>
        <h2>Lista de Promociones</h2>
        {promotions.map(promotion => (
          <div key={promotion.id}>
            <h3>{promotion.title}</h3>
            <p>{promotion.description}</p>
            <p>Descuento: {promotion.discount}</p>
            {promotion.imageUrl && <img src={promotion.imageUrl} alt={promotion.title} style={{ width: '100px', height: '100px' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParentComponent;
