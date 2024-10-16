import React, { useState } from "react";
import "../styles/FormStyles.css";

const EditProductForm = () => {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    description: "",
    dimensions_width: "",
    dimensions_height: "",
    image_path: null,
    category: "",
    disponibility: false,
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

  const handleDimensionsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products`,
        {
          method: "PUT",
          body: dataToSend,
        }
      );
      if (response.ok) {
        alert("Producto modificado exitosamente");
        setFormData({
          sku: "",
          name: "",
          price: "",
          description: "",
          dimensions_width: "",
          dimensions_height: "",
          image_path: null,
          category: "",
          rating: 0,
          disponibility: true,
        });
        setImagePreview(null);
        setImageDimensions({ width: 0, height: 0 });
      } else {
        alert("Error al modificar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al modificar el producto");
    }
  };

  return (
    <form className="formNEW" onSubmit={handleSubmit}>
      <div className="left-column">
        <label>SKU</label>
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
          required
        />
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Descripción</label>
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          className="description"
          required
        />
        <div className="dimensions-category">
          <div>
            <label>Ancho (cm)</label>
            <input
              type="number"
              name="dimensions_width"
              placeholder="Ancho (cm)"
              value={formData.dimensions_width}
              onChange={handleDimensionsChange}
              required
            />
          </div>
          <div>
            <label>Alto (cm)</label>
            <input
              type="number"
              name="dimensions_height"
              placeholder="Alto (cm)"
              value={formData.dimensions_height}
              onChange={handleDimensionsChange}
              required
            />
          </div>
        </div>
        <label>Precio</label>
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          required
        />
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
          <option value="regulares">Toallas Regulares</option>
          <option value="nocturnas">Toallas Nocturnas</option>
          <option value="teen">Toallas Teen</option>
          <option value="pantiprotectores">Pantiprotectores Diarios</option>
        </select>
      </div>
      <button type="submit" className="submit-button">
        EDITAR PRODUCTO
      </button>
    </form>
  );
};

export default EditProductForm;
