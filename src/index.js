import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppOrders from "./components/Pages/AppOrders";
import AppUsers from "./components/Pages/AppUsers";
import AppPartners from "./components/Pages/AppPartners";
import AppProducto from "./components/Pages/AppProducto";
import AppComunity from "./components/Pages/AppComunity";
import AppProfile from "./components/Pages/AppProfile";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PrivateRoute from "./components/Pages/PrivateRoute";
import AppLogin from "./components/Pages/AppLogin";

const userRole = "expert"; //Dummy role

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLogin />,
    //AQUI FALTA EL LOGIN
  },
  {
    path: "/dashboard",
    element: <App />,
  },
  {
    path: "/ordenes",
    element: (
      <PrivateRoute allowedRoles={["admin"]} userRole={userRole}>
        <AppOrders />
      </PrivateRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <PrivateRoute allowedRoles={["admin"]} userRole={userRole}>
        <AppUsers />
      </PrivateRoute>
    ),
  },
  {
    path: "/partners",
    element: (
      <PrivateRoute allowedRoles={["admin"]} userRole={userRole}>
        <AppPartners />
      </PrivateRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <PrivateRoute allowedRoles={["admin"]} userRole={userRole}>
        <AppProducto />
      </PrivateRoute>
    ),
  },
  {
    path: "/comnuity",
    element: (
      <PrivateRoute allowedRoles={["expert", "admin"]} userRole={userRole}>
        <AppComunity />
      </PrivateRoute>
    ),
  },
  {
    path: "/config",
    element: (
      <PrivateRoute allowedRoles={["expert","admin"]} userRole={userRole}>
        <AppProfile />
      </PrivateRoute>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
