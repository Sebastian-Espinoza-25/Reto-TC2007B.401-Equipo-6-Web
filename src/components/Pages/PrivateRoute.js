import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UilExclamationTriangle } from '@iconscout/react-unicons'; // Importar el icono de advertencia
import "./PrivateRoute.css";

const PrivateRoute = ({ children, allowedRoles }) => {
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole'); // Obtener el rol del localStorage directamente aquí

  useEffect(() => {
    // Trigger unauthorized modal if user role is not allowed
    if (!allowedRoles.includes(userRole)) {
      setShowUnauthorizedModal(true);
    }
  }, [allowedRoles, userRole]);

  const handleRetryLogin = () => {
    setShowUnauthorizedModal(false);
    navigate("/"); // Redirigir a la página de inicio de sesión
  };

  const handleCloseModal = () => {
    setShowUnauthorizedModal(false);
    navigate("/dashboard"); // Volver a la página anterior
  };

  return allowedRoles.includes(userRole) ? (
    children
  ) : (
    <>
      {showUnauthorizedModal && (
        <UnauthorizedModal
          onClose={handleCloseModal}
          onRetryLogin={handleRetryLogin}
        />
      )}
    </>
  );
};

// Modal para mostrar el mensaje no autorizado
const UnauthorizedModal = ({ onClose, onRetryLogin }) => {
  return (
    <div className="Background">
      <div className="BackgroundGlass">
        <UilExclamationTriangle className="WarningIcon" size="50" color="#FFA500" />
        <h2>ACCESO NO AUTORIZADO</h2>
        <p>No tienes acceso a esta parte de la web.</p>
        <p>Debes iniciar sesión con una cuenta autorizada.</p>
        <button className="ButtonsAccess" onClick={onRetryLogin}>Log in with another account</button>
        <button className="ButtonsAccess" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PrivateRoute;
