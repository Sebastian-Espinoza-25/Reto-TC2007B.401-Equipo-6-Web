import React from "react";
import Profile from "../ProfileTools/Profile";
import Sidebar from "../Sidebar/Sidebar";
import "../styles/AppComun.css";

function AppProfile() {
  return (
    <div className="AppCss">
      <div className="AppGlass">
        <Sidebar />
        <Profile />
      </div>
    </div>
  );
}

export default AppProfile;
