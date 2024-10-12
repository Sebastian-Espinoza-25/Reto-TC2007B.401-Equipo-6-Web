import React, { useState } from "react";
import PartnerTable from "./PartnerTable";
import "../styles/GeneralStyles.css";

const Products = () => {
  const [currentView, setCurrentView] = useState("view");

  const renderView = () => {
    switch (currentView) {
      case "view":
        return <PartnerTable />;
      case "create":
        return <PartnerTable />;
      case "edit":
        return <PartnerTable />;
      default:
        return <PartnerTable />;
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
