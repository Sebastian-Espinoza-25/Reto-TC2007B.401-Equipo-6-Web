import React, { useState } from "react";
import "./FormStyles.css";

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
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
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
    if (formData.price < 0) {
      alert("El precio no puede ser un valor negativo.");
      return;
    }
    const dimensions = `${formData.dimensions_width} x ${formData.dimensions_height} cm`;
    const dataToSend = new FormData();
    dataToSend.append("sku", formData.sku);
    dataToSend.append("name", formData.name);
    dataToSend.append("price", formData.price);
    dataToSend.append("description", formData.description);
    dataToSend.append("dimensions", dimensions);
    dataToSend.append("image_path", formData.image_path);
    dataToSend.append("category", formData.category);
    dataToSend.append("rating", 0);

    try {
      const response = await fetch(`/api/products/sku/${formData.sku}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Producto editado:", data);
      // Aquí puedes agregar la lógica para manejar la respuesta de la API
    } catch (error) {
      console.error("Error al editar el producto:", error);
      // Aquí puedes agregar la lógica para manejar el error
    }
  };

  return (
    <form
      className="product-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h2>Editar Producto</h2>
      <input
        type="text"
        name="sku"
        placeholder="SKU"
        value={formData.sku}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
        required
        style={{ resize: "none" }}
      />
      <div className="dimensions-category">
        <input
          type="number"
          name="dimensions_width"
          placeholder="Ancho (cm)"
          value={formData.dimensions_width}
          onChange={handleDimensionsChange}
          required
        />
        <input
          type="number"
          name="dimensions_height"
          placeholder="Alto (cm)"
          value={formData.dimensions_height}
          onChange={handleDimensionsChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="toallas-regulares">Toallas Regulares</option>
          <option value="toallas-nocturnas">Toallas Nocturnas</option>
          <option value="toallas-teen">Toallas Teen</option>
          <option value="pantiprotectores-diarios">
            Pantiprotectores Diarios
          </option>
        </select>
      </div>
      <input type="file" name="image_path" onChange={handleChange} required />
      <button type="submit">Editar Producto</button>
    </form>
  );
};

export default EditProductForm;
