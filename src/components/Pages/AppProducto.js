import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Products from "../ProductTools/Products";
import "./AppComun.css";

function AppProducto() {
  return (
    <div className="AppCss">
      <div className="AppGlass">
        <Sidebar />
        <Products />
      </div>
    </div>
  );
}

export default AppProducto;
