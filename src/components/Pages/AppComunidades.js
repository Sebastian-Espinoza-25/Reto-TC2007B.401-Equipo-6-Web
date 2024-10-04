import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import PostForm from "../PostForm/PostForm";
import "./AppComun.css";

function AppComunidad() {
  return (
    <div className="AppCss">
      <div className="AppGlassNew">
        <Sidebar />
        <PostForm />
      </div>
    </div>
  );
}

export default AppComunidad;
