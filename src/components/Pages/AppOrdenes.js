import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import OrdersTable from "../OrdersTable/OrdersTable";
import "./AppComun.css";

function AppOrdenes() {
  return (
    <div className="AppCss">
      <div className="AppGlassNew">
        <Sidebar />
        <OrdersTable />
      </div>
    </div>
  );
}

export default AppOrdenes;
