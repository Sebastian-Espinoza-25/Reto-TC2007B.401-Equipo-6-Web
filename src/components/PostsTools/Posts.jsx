import React, { useState } from "react";
import PostView from "./PostsView";
import PostForm from "./PostForm";
import EditPostForm from "./EditPostForm";
import "../styles/GeneralStyles.css";

const Posts = () => {
  const [currentView, setCurrentView] = useState("view");

  const renderView = () => {
    switch (currentView) {
      case "view":
        return <PostView />;
      case "create":
        return <PostForm />;
      case "edit":
        return <EditPostForm />;
      default:
        return <PostView />;
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
            onClick={() => setCurrentView("create")}
            className={currentView === "create" ? "active" : ""}
          >
            Crear Post
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
