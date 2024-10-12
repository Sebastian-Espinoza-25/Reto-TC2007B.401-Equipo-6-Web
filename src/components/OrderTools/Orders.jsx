import React, { useState } from "react";
import OrderTable from "./OrderTable";
import "../styles/GeneralStyles.css";

const Products = () => {
  const [currentView, setCurrentView] = useState("view");

  const renderView = () => {
    switch (currentView) {
      case "view":
        return <OrderTable />;
      case "create":
        return <OrderTable />;
      case "edit":
        return <OrderTable />;
      default:
        return <OrderTable />;
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
            Ver Usuarios
          </button>
          <button
            onClick={() => setCurrentView("create")}
            className={currentView === "create" ? "active" : ""}
          >
            ...
          </button>
          <button
            onClick={() => setCurrentView("edit")}
            className={currentView === "edit" ? "active" : ""}
          >
            ...
          </button>
        </div>
      </div>
      <div>{renderView()}</div>
    </div>
  );
};

export default Products;
