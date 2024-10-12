import React, { useState, useEffect } from "react";
import "../styles/FormStyles.css";

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    date: "",
    category: "",
    partner_email: "",
    file_path: null,
    image_path: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image_path" && files.length > 0) {
      const file = files[0];
      const image = new Image();
      image.onload = () => {
        setImageDimensions({ width: image.width, height: image.height });
      };
      image.src = URL.createObjectURL(file);
      setImagePreview(image.src);
    }
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: today,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    for (const key in formData) {
      postData.append(key, formData[key]);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "POST",
        body: postData,
      });
      if (response.ok) {
        alert("Post creado exitosamente");
        setFormData({
          title: "",
          summary: "",
          date: "",
          category: "",
          partner_email: "",
          file_path: null,
          image_path: null,
        });
        setImagePreview(null);
        setImageDimensions({ width: 0, height: 0 });
      } else {
        alert("Error al crear el post");
      }
    } catch (error) {
      console.error("Error al crear el post:", error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="left-column">
        <label>Título</label>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label>Resumen</label>
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
        <label>Autor</label>
        <input
          type="text"
          name="partner_email"
          placeholder="Email del partner"
          value={formData.partner_email}
          onChange={handleChange}
          required
        />
        <label>Post TXT</label>
        <input type="file" name="file_path" onChange={handleChange} required />
      </div>
      <div className="right-column">
        <label>Imagen</label>
        <input type="file" name="image_path" onChange={handleChange} required />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Vista previa de la imagen" />
          </div>
        )}
        {imagePreview && (
          <div className="image-dimensions">
            Dimensiones: {imageDimensions.width} x {imageDimensions.height}
          </div>
        )}
        <label>Categoría</label>
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
      </div>
      <button type="submit" className="submit-button">
        CREAR POST
      </button>
    </form>
  );
};

export default PostForm;
