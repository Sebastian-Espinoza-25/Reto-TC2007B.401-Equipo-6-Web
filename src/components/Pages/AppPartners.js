import React from "react";
import Sidebar from "../Sidebar/Sidebar";

import "./AppComun.css";

function AppPostForm() {
  return (
    <div className="AppCss">
      <div className="AppGlassNew">
        <Sidebar />
        <div className="AppContent">
          <h1>Agregar un Colaborador</h1>
          <p>Contenido del forms</p>
        </div>
      </div>
    </div>
  );
}

export default AppPostForm;
