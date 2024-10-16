import React from "react";
import Partners from "../PartnerTools/Partners";
import Sidebar from "../Sidebar/Sidebar";
import "../styles/AppComun.css";

function AppPartners() {
  return (
    <div className="AppCss">
      <div className="AppGlass">
        <Sidebar />
        <Partners />
      </div>
    </div>
  );
}

export default AppPartners;
