import React, { useState } from "react";
import ProfileView from "./ProfileView";
import EditProfileForm from "./EditProfileForm";
import "../styles/GeneralStyles.css";

const Posts = () => {
  const [currentView, setCurrentView] = useState("view");

  const renderView = () => {
    switch (currentView) {
      case "view":
        return <ProfileView />;
      case "edit":
        return <EditProfileForm />;
      default:
        return <ProfileView />;
    }
  };

  return (
    <div className="view">
      <div className="header">
        <div className="buttons">
          <button
            onClick={() => setCurrentView("view")}
            className={currentView === "view" ? "active" : ""}
          >
            Ver Posts
          </button>
          <button
            onClick={() => setCurrentView("edit")}
            className={currentView === "edit" ? "active" : ""}
          >
            Editar Post
          </button>
        </div>
      </div>
      <div>{renderView()}</div>
    </div>
  );
};

export default Posts;
