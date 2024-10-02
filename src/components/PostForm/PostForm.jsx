import React, { useState } from 'react';
import './PostForm.css';

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    partner_id: '',
    date: '',
    summary: '',
    file_path: null,
    category: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    for (const key in formData) {
      postData.append(key, formData[key]);
    }

    try {
        const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        body: postData,
      });
      if (response.ok) {
        alert('Producto creado exitosamente');
      } else {
          alert('Error al crear el producto');
      }      
    } catch (error) {
        console.error('Error:', error);
        console.error('Error al crear el post:', error);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>Crear Post</h2>
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Contenido"
        value={formData.content}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="partner_id"
        placeholder="ID del Partner"
        value={formData.partner_id}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        placeholder="Fecha"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <textarea
        name="summary"
        placeholder="Resumen"
        value={formData.summary}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="file_path"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Categoría"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <button type="submit">Crear Post</button>
    </form>
  );
};

export default PostForm;