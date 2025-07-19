// src/components/AddProduct.jsx
import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './css/AddProduct.css';

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const categories = [
    'entradas',
    'menu infantil',
    'platos de la casa',
    'taquizas',
    'postres',
    'lunch',
    'ceviches',
    'hamburguesas',
    'licores',
    'cocteles',
    'bebidas',
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, 'menu'));
    const productsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(productsData);
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

  const handleAddProduct = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    if (imageFile) {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newProduct = {
      ...formData,
      imageUrl: imageUrl,
    };

    await addDoc(collection(db, 'menu'), newProduct);
    fetchProducts();
    e.target.reset();
    setImageFile(null);
    setFormData({ name: '', description: '', price: '', category: '' });
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
    });
    setEditingProduct(product.id);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    let imageUrl = formData.imageUrl;
    if (imageFile) {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const updatedProduct = {
      ...formData,
      imageUrl: imageUrl || formData.imageUrl,
    };

    await updateDoc(doc(db, 'menu', editingProduct), updatedProduct);
    fetchProducts();
    setFormData({ name: '', description: '', price: '', category: '' });
    setEditingProduct(null);
    setImageFile(null);
  };

  const handleDeleteProduct = async (productId) => {
    await deleteDoc(doc(db, 'menu', productId));
    fetchProducts();
  };

  return (
    <div>
      <form className="add-product-form" onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
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
        <select name="category" value={formData.category} onChange={handleInputChange} required>
          <option value="">Seleccionar categoría</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
          ))}
        </select>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">{editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}</button>
      </form>

      <div className="products-list">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 'auto' }} />}
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p><strong>Precio: Q.{product.price}.⁰⁰</strong></p>
            <p><strong>Categoría: {product.category}</strong></p>
            <button onClick={() => handleEditProduct(product)}>Editar</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddProduct;
