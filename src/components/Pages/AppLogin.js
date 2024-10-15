import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../LoginTools/LoginForm";
import "./AppLogin.css";

function AppLogin({ onLogin }) { // Accepting onLogin as a prop
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Simulando un almacenamiento de usuarios
  const validCredentials = {
    admin: { email: "admin@zazil.com", password: "admin123" },
    expert: { email: "expert@zazil.com", password: "expert123" },
  };

  const handleLogin = (role, email, password) => {
    // Verificar si el rol es válido y si las credenciales coinciden
    if (validCredentials[role] && 
        validCredentials[role].email === email && 
        validCredentials[role].password === password) {
      
      localStorage.setItem("userRole", role); // Almacena el rol en el almacenamiento local
      onLogin(role); // Actualiza el rol del usuario
      navigate("/dashboard"); // Navega al dashboard o a la ruta correspondiente

    } else {
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="BackgroundLogin">
      <div className="TitleLogin">ZAZIL WEB</div>
      {error && <p className="error-message">{error}</p>}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default AppLogin;
