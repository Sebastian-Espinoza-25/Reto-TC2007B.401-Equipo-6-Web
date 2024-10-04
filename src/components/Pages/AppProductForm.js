import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import ProductForm from "../ProductTools/ProductForm";
import "./AppComun.css";

function AppProductForm() {
  return (
    <div className="AppCss">
      <div className="AppGlassNew">
        <Sidebar />
        <ProductForm />
      </div>
    </div>
  );
}

export default AppProductForm;
