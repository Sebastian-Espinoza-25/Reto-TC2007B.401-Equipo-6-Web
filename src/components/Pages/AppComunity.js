import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Posts from "../PostsTools/Posts";
import "../styles/AppComun.css";

const AppComunity = () => {
  return (
    <div className="AppCss">
      <div className="AppGlass">
        <Sidebar />
        <Posts />
      </div>
    </div>
  );
};

export default AppComunity;
