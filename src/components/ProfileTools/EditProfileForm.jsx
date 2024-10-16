import React, { useState, useEffect } from "react";
import "../styles/FormStyles.css";

const EditPartnerForm = ({ partner }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_pic: "",
    birth_date: "",
    role: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (partner) {
      setFormData({
        first_name: partner.first_name,
        last_name: partner.last_name,
        email: partner.email,
        profile_pic: partner.profile_pic,
        birth_date: partner.birth_date,
        role: partner.role,
      });
      setImagePreview(partner.profile_pic);
    }
  }, [partner]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_pic" && files[0]) {
      const file = files[0];
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
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario al servidor
    console.log(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Editar Colaborador</h2>
      <div className="left-column">
        <label>Nombre</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <label>Apellido</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Rol</label>
        <select
          name="role"
          value={formData.role}
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
        EDITAR COLABORADOR
      </button>
    </form>
  );
};

export default EditPartnerForm;
