import React from "react";
import PartnerTable from "../PartnerTools/PartnerTable";
import Sidebar from "../Sidebar/Sidebar";

import "./AppComun.css";

function AppPartners() {
  return (
    <div className="AppCss">
      <div className="AppGlass">
        <Sidebar />
        <PartnerTable />
      </div>
    </div>
  );
}

export default AppPartners;
