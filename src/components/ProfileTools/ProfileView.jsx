// web/src/components/Profile/UserProfile.jsx
import React, { useEffect, useState } from "react";
import "./ProfileView.css";

const ProfileView = () => {
  const [userData, setUserData] = useState(null);
  const userEmail = "rucon@example.com"; // Reemplaza esto con el email del usuario logueado

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/partners/email/${userEmail}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userEmail]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>Perfil del Usuario</h1>
      <div className="profile-details">
        <img
          src={`${userData.profile_pic}`}
          alt="Imagen de Perfil"
          className="profile-image"
        />
        <p>
          <strong>Nombre:</strong> {userData.first_name} {userData.last_name}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Birth Date:</strong> {userData.birth_date}
        </p>
        <p>
          <strong>Account Type:</strong> {userData.account_type}
        </p>
        <p>
          <strong>Account Status:</strong>{" "}
          {userData.account_status ? "Habilitado" : "Habilitado"}
        </p>
      </div>
    </div>
  );
};

export default ProfileView;
