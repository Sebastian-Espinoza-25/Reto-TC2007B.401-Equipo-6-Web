import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UilExclamationTriangle } from '@iconscout/react-unicons'; // Import the warning icon
import "./PrivateRoute.css";

// This component protects routes based on user role
const PrivateRoute = ({ children, allowedRoles, userRole }) => {
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger unauthorized modal if user role is not allowed
    if (!allowedRoles.includes(userRole)) {
      setShowUnauthorizedModal(true);
    }
  }, [allowedRoles, userRole]);

  const handleRetryLogin = () => {
    // Logic for retry login, redirect to login or another page
    setShowUnauthorizedModal(false);
    navigate("/"); // You can navigate to the login page or home
  };

  const handleCloseModal = () => {
    // When closing modal, redirect to previous page or block navigation
    setShowUnauthorizedModal(false);
    navigate(-1); // Go back to the previous page
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

// Modal component to display unauthorized message
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
