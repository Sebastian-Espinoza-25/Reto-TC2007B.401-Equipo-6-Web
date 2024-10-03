import React, { useState, useEffect } from "react";
import "./PostForm.css";

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    date: "",
    category: "",
    partner_id: "",
    file_path: null,
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: today,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    for (const key in formData) {
      postData.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: postData,
      });
      if (response.ok) {
        alert("Post creado exitosamente");
      } else {
        alert("Error al crear el post");
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Error al crear el post:", error);
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
        name="summary"
        placeholder="Resumen"
        value={formData.summary}
        onChange={handleChange}
        required
        style={{ resize: "none" }}
      />
      <input
        type="date"
        name="date"
        placeholder="Fecha"
        value={formData.date}
        onChange={handleChange}
        required
        disabled
      />
      <input
        type="text"
        name="partner_id"
        placeholder="ID del Partner"
        value={formData.partner_id}
        onChange={handleChange}
        required
      />
      <input type="file" name="file_path" onChange={handleChange} required />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona una categoría</option>
        <option value="salud">Salud</option>
        <option value="inspirate">Inspirate</option>
        <option value="bienestar">Bienestar</option>
        <option value="eco">Eco</option>
      </select>
      <button type="submit">Crear Producto</button>
    </form>
  );
};

export default PostForm;
