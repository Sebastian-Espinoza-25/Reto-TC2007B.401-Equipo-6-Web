import React from "react";
// import Logo from "../../imgs/zazil.png";
import "../styles/Sidebar.css";

import { SidebarData } from "../../Data/Data";
import { UilSignout, UilBars } from "@iconscout/react-unicons";

import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = React.useState(); //ANIMATION
  const [expanded, setExpanded] = React.useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Automatically set the selected item based on the current path
    const currentPath = location.pathname;
    const activeIndex = SidebarData.findIndex(
      (item) => item.path === currentPath
    );
    if (activeIndex !== -1) {
      setSelected(activeIndex); // Keep selected state in sync with the active path
    }
  }, [location.pathname]);

  // Variants for animation
  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  const handleLogout = () => {
    // Eliminar el rol del usuario del almacenamiento local
    localStorage.removeItem("userRole");
    // Redirigir a la página de inicio de sesión
    navigate("/");
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="Sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""} // Keeps sidebar animation
      >
        {/* logo */}
        <div className="logo">
          {/* <img src={Logo} alt="logo" /> */}
          <span>ZAZIL APP</span>
        </div>
        {/* menu */}
        <div className="menu">
          {SidebarData.map((item, index) => {
            const isActive = selected === index; // Use selected for animation

            return (
              <Link
                to={item.path}
                style={{ textDecoration: "none", color: "inherit" }}
                className={isActive ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => setSelected(index)} // Set selected when clicked
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="menuIcon"
                >
                  <item.icon />
                </motion.div>
                <span>{item.heading}</span>
              </Link>
            );
          })}
          {/* Logout */}
          <div className="menuItem" onClick={handleLogout}>
            <UilSignout />
            <span>Cerrar sesión</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
