import React from "react";
import Orders from "../OrderTools/Orders";
import Sidebar from "../Sidebar/Sidebar";
import "../styles/AppComun.css";

function AppOrders() {
  return (
    <div className="AppCss">
      <div className="AppGlass">
        <Sidebar />
        <Orders />
      </div>
    </div>
  );
}

export default AppOrders;
