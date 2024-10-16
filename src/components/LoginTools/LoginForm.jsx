import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onLogin }) => {
  // Accepting onLogin as a prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar la presentación del formulario
    if (email && password && role) {
      onLogin(role, email, password); // Pasar rol, email y contraseña
    } else {
      alert("Por favor, rellene todos los campos");
    }
  };

  return (
    <div className="FormBack">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Iniciar sesión</h2>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mail@zazil.com"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="input-field"
          />
        </div>
        <div className="user-form">
          <label>Tipo de usuario:</label>
          <select
            className="dropdown"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Rol
            </option>
            <option value="admin">Administrador</option>
            <option value="expert">Experto</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
