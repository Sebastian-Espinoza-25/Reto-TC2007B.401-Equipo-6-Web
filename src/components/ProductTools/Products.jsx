import React, { useState } from "react";
import ProductsView from "./ProductsView";
import ProductForm from "./ProductForm";
import EditProductForm from "./EditProductForm";
import "../styles/GeneralStyles.css";

const Products = () => {
  const [currentView, setCurrentView] = useState("view");

  const renderView = () => {
    switch (currentView) {
      case "view":
        return <ProductsView />;
      case "create":
        return <ProductForm />;
      case "edit":
        return <EditProductForm />;
      default:
        return <ProductsView />;
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
            Ver Productos
          </button>
          <button
            onClick={() => setCurrentView("create")}
            className={currentView === "create" ? "active" : ""}
          >
            Crear Producto
          </button>
          <button
            onClick={() => setCurrentView("edit")}
            className={currentView === "edit" ? "active" : ""}
          >
            Editar Producto
          </button>
        </div>
      </div>
      <div>{renderView()}</div>
    </div>
  );
};

export default Products;
