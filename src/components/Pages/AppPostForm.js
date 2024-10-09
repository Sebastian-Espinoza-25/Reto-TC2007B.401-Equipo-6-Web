import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import PostForm from "../PostsTools/PostForm";
import "./AppComun.css";

function AppPostForm() {
  return (
    <div className="AppCss">
      <div className="AppGlassNew">
        <Sidebar />
        <PostForm />
      </div>
    </div>
  );
}

export default AppPostForm;
