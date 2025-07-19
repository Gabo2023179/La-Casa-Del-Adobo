import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './css/AddHome.css';

function AddHome() {
  const [homePosts, setHomePosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchHomePosts();
  }, []);

  const fetchHomePosts = async () => {
    const snapshot = await getDocs(collection(db, 'homePosts'));
    const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setHomePosts(postsData);
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

  const handleAddPost = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    if (imageFile) {
      const imageRef = ref(storage, `homePosts/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newPost = {
      ...formData,
      imageUrl: imageUrl,
    };

    await addDoc(collection(db, 'homePosts'), newPost);
    fetchHomePosts();
    e.target.reset();
    setImageFile(null);
    setFormData({ title: '', description: '' });
  };

  const handleEditPost = (post) => {
    setFormData({
      title: post.title,
      description: post.description,
      imageUrl: post.imageUrl,
    });
    setEditingPost(post.id);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    let imageUrl = formData.imageUrl;
    if (imageFile) {
      const imageRef = ref(storage, `homePosts/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const updatedPost = {
      ...formData,
      imageUrl: imageUrl || formData.imageUrl,
    };

    await updateDoc(doc(db, 'homePosts', editingPost), updatedPost);
    fetchHomePosts();
    setFormData({ title: '', description: '' });
    setEditingPost(null);
    setImageFile(null);
  };

  const handleDeletePost = async (postId) => {
    await deleteDoc(doc(db, 'homePosts', postId));
    fetchHomePosts();
  };

  return (
    <div>
      <form className="add-home-form" onSubmit={editingPost ? handleUpdatePost : handleAddPost}>
        <input
          type="text"
          name="title"
          placeholder="Título del post"
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
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">{editingPost ? 'Actualizar Post' : 'Agregar Post'}</button>
      </form>

      <div className="home-posts-list">
        {homePosts.map((post) => (
          <div className="home-post-item" key={post.id}>
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: 'auto' }} />}
            <h4>{post.title}</h4>
            <p>{post.description}</p>
            <button onClick={() => handleEditPost(post)}>Editar</button>
            <button onClick={() => handleDeletePost(post.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddHome;
