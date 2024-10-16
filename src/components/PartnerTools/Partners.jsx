import React, { useState } from "react";
import PartnerTable from "./PartnerTable";
import PartnerForm from "./PartnerForm";
import EditPartnerForm from "./EditPartnerForm";
import "../styles/GeneralStyles.css";

const Products = () => {
  const [currentView, setCurrentView] = useState("view");

  const renderView = () => {
    switch (currentView) {
      case "view":
        return <PartnerTable />;
      case "create":
        return <PartnerForm />;
      case "edit":
        return <EditPartnerForm />;
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
            Ver Colaboradores
          </button>
          <button
            onClick={() => setCurrentView("create")}
            className={currentView === "create" ? "active" : ""}
          >
            Agregar Colaborador
          </button>
          <button
            onClick={() => setCurrentView("edit")}
            className={currentView === "edit" ? "active" : ""}
          >
            Editar Colaborador
          </button>
        </div>
      </div>
      {renderView()}
    </div>
  );
};

export default Products;
