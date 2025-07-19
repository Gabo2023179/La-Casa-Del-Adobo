import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './css/AddBox.css';

function AddBox() {
  const [boxes, setBoxes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'box', // Valor por defecto
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingBox, setEditingBox] = useState(null);

  useEffect(() => {
    fetchBoxes();
  }, []);

  const fetchBoxes = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'menuBox'));
      const boxesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBoxes(boxesData);
    } catch (err) {
      console.error('Error al cargar los Boxes:', err);
    }
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

  const handleAddBox = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    if (imageFile) {
      const imageRef = ref(storage, `boxes/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newBox = {
      ...formData,
      imageUrl: imageUrl,
    };

    await addDoc(collection(db, 'menuBox'), newBox);
    fetchBoxes();
    e.target.reset();
    setImageFile(null);
    setFormData({ name: '', description: '', price: '', category: 'box' });
  };

  const handleEditBox = (box) => {
    setFormData({
      name: box.name,
      description: box.description,
      price: box.price,
      category: box.category,
      imageUrl: box.imageUrl,
    });
    setEditingBox(box.id);
  };

  const handleUpdateBox = async (e) => {
    e.preventDefault();

    let imageUrl = formData.imageUrl;
    if (imageFile) {
      const imageRef = ref(storage, `boxes/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const updatedBox = {
      ...formData,
      imageUrl: imageUrl || formData.imageUrl, // Asegura que imageUrl esté definido
    };

    await updateDoc(doc(db, 'menuBox', editingBox), updatedBox);
    fetchBoxes();
    setFormData({ name: '', description: '', price: '', category: 'box' });
    setEditingBox(null);
    setImageFile(null);
  };

  const handleDeleteBox = async (boxId) => {
    await deleteDoc(doc(db, 'menuBox', boxId));
    fetchBoxes();
  };

  return (
    <div className="manage-boxes-container">
      <h2>Gestionar Boxes</h2>
      <form className="manage-boxes-form" onSubmit={editingBox ? handleUpdateBox : handleAddBox}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del Box"
          value={formData.name}
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
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="box">Box</option>
          <option value="premium box">Premium Box</option>
          <option value="family box">Family Box</option>
          <option value="gift box">Gift Box</option>
        </select>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">{editingBox ? 'Actualizar Box' : 'Agregar Box'}</button>
        {editingBox && (
          <button
            type="button"
            onClick={() => {
              setEditingBox(null);
              setFormData({ name: '', description: '', price: '', category: 'box' });
              setImageFile(null);
            }}
            className="cancel-button"
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="boxes-list">
        {boxes.map((box) => (
          <div className="box-item" key={box.id}>
            {box.imageUrl && <img src={box.imageUrl} alt={box.name} />}
            <h4>{box.name}</h4>
            <p>{box.description}</p>
            <p><strong>Precio: Q.{box.price}.00</strong></p>
            <p><strong>Categoría: {box.category.charAt(0).toUpperCase() + box.category.slice(1)}</strong></p>
            <button onClick={() => handleEditBox(box)}>Editar</button>
            <button onClick={() => handleDeleteBox(box.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddBox;
