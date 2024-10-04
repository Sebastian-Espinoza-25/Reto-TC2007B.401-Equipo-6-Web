import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import EditProductForm from "../ProductTools/EditProductForm";
import "./AppComun.css";

function AppProductForm() {
  return (
    <div className="AppCss">
      <div className="AppGlassNew">
        <Sidebar />
        <EditProductForm />
      </div>
    </div>
  );
}

export default AppProductForm;
