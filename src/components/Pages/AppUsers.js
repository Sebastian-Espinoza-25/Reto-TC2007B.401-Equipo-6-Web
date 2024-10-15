import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Users from "../UserTools/Users";
import "./AppComun.css";

function AppUsers() {
  return (
    <div className="AppCss">
      <div className="AppGlass">
        <Sidebar />
        <Users />
      </div>
    </div>
  );
}

export default AppUsers;