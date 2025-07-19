import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './css/AddPromociones.css';

function AddPromociones() {
  const [promotions, setPromotions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingPromotion, setEditingPromotion] = useState(null);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    const snapshot = await getDocs(collection(db, 'promotions'));
    const promotionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPromotions(promotionsData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddPromotion = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    if (imageFile) {
      const imageRef = ref(storage, `promotions/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newPromotion = {
      ...formData,
      imageUrl: imageUrl,
    };

    await addDoc(collection(db, 'promotions'), newPromotion);
    fetchPromotions();
    e.target.reset();
    setImageFile(null);
    setFormData({ title: '', description: '', price: '' });
  };

  const handleEditPromotion = (promotion) => {
    setFormData({
      title: promotion.title,
      description: promotion.description,
      price: promotion.price,
      imageUrl: promotion.imageUrl,
    });
    setEditingPromotion(promotion.id);
  };

  const handleUpdatePromotion = async (e) => {
    e.preventDefault();

    let imageUrl = formData.imageUrl;
    if (imageFile) {
      const imageRef = ref(storage, `promotions/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const updatedPromotion = {
      ...formData,
      imageUrl: imageUrl || formData.imageUrl, // Make sure imageUrl is always defined
    };

    await updateDoc(doc(db, 'promotions', editingPromotion), updatedPromotion);
    fetchPromotions();
    setFormData({ title: '', description: '', price: '' });
    setEditingPromotion(null);
    setImageFile(null);
  };

  const handleDeletePromotion = async (promotionId) => {
    await deleteDoc(doc(db, 'promotions', promotionId));
    fetchPromotions();
  };

  return (
    <div>
      <form className="add-promotion-form" onSubmit={editingPromotion ? handleUpdatePromotion : handleAddPromotion}>
        <input
          type="text"
          name="title"
          placeholder="Título de la promoción"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">{editingPromotion ? 'Actualizar Promoción' : 'Agregar Promoción'}</button>
      </form>

      <div className="promotions-list">
        {promotions.map((promotion) => (
          <div className="promotion-item" key={promotion.id}>
            {promotion.imageUrl && <img src={promotion.imageUrl} alt={promotion.title} style={{ width: '100%', height: 'auto' }} />}
            <h4>{promotion.title}</h4>
            <p>{promotion.description}</p>
            <p><strong>Precio: Q.{promotion.price}.⁰⁰</strong></p>
            <button onClick={() => handleEditPromotion(promotion)}>Editar</button>
            <button onClick={() => handleDeletePromotion(promotion.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddPromociones;
