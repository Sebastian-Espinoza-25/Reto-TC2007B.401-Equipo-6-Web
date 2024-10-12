import React from "react";
import OrdersTable from "../OrderTools/OrderTable";
import Sidebar from "../Sidebar/Sidebar";

import "./AppComun.css";

function AppOrders() {
  return (
    <div className="AppCss">
      <div className="AppGlass">
        <Sidebar />
        <OrdersTable />
      </div>
    </div>
  );
}

export default AppOrders;
