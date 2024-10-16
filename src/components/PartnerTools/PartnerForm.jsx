import React, { useState } from "react";
import "../styles/GeneralStyles.css";

const PartnerForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    account_status: "",
    account_type: "",
    birth_date: "",
    profile_pic: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_pic" && files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({ ...prevData, profile_pic: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        const img = new Image();
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height });
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const partnerData = new FormData();
    for (const key in formData) {
      partnerData.append(key, formData[key]);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/partners`,
        {
          method: "POST",
          body: partnerData,
        }
      );
      if (response.ok) {
        alert("Colaborador creado exitosamente");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          account_status: "",
          account_type: "",
          birth_date: "",
          profile_pic: null,
        });
        setImagePreview(null);
        setImageDimensions({ width: 0, height: 0 });
      } else {
        alert("Error al crear el colaborador");
      }
    } catch (error) {
      console.error("Error al crear el colaborador:", error);
    }
  };

  return (
    <form className="formNEW" onSubmit={handleSubmit}>
      <div className="left-column">
        <label>Nombre</label>
        <input
          type="text"
          name="first_name"
          placeholder="Nombre"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <label>Apellido</label>
        <input
          type="text"
          name="last_name"
          placeholder="Apellido"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <label>Correo Electrónico</label>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Estado de la Cuenta</label>
        <select
          name="account_status"
          value={formData.account_status}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar</option>
          <option value="enabled">Habilitada</option>
          <option value="disabled">Deshabilitada</option>
        </select>
        <label>Tipo de Cuenta</label>
        <select
          name="account_type"
          value={formData.account_type}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar</option>
          <option value="admin">Admin</option>
          <option value="experto">Experto</option>
        </select>
      </div>
      <div className="right-column">
        <label>Imagen de Perfil</label>
        <input
          type="file"
          name="profile_pic"
          onChange={handleChange}
          required
        />
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
        <label>Fecha de Nacimiento</label>
        <input
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        CREAR COLABORADOR
      </button>
    </form>
  );
};

export default PartnerForm;
