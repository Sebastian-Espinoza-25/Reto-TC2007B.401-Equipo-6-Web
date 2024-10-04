import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import ProductsView from "../ProductTools/ProductsView";
import "./AppComun.css";

function AppProducto() {
  return (
    <div className="AppCss">
      <div className="AppGlassNew">
        <Sidebar />
        <ProductsView />
      </div>
    </div>
  );
}

export default AppProducto;
