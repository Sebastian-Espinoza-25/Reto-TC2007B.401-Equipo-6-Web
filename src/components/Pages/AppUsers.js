import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import UserTable from "../UserTools/UserTable";
import "./AppComun.css";

function AppUsers() {
  return (
    <div className="AppCss">
      <div className="AppGlass">
        <Sidebar />
        <UserTable />
      </div>
    </div>
  );
}

export default AppUsers;