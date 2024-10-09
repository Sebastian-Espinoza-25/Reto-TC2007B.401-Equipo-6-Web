import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import EditPostForm from "../PostsTools/EditPostForm";
import "./AppComun.css";

function AppPostForm() {
  return (
    <div className="AppCss">
      <div className="AppGlassNew">
        <Sidebar />
        <EditPostForm />
      </div>
    </div>
  );
}

export default AppPostForm;
