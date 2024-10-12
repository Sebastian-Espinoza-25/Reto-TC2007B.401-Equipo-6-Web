import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Posts from "../PostsTools/Posts";
import "./AppComun.css";

const AppComunity = () => {
  return (
    <div className="AppCss">
      <div className="AppGlassNew">
        <Sidebar />
        <Posts />
      </div>
    </div>
  );
};

export default AppComunity;
