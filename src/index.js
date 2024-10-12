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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ordenes",
    element: <AppOrders />,
  },
  {
    path: "/users",
    element: <AppUsers />,
  },
  {
    path: "/partners",
    element: <AppPartners />,
  },
  {
    path: "/products",
    element: <AppProducto />,
  },
  {
    path: "/comnuity",
    element: <AppComunity />,
  },
  {
    path: "/config",
    element: <AppProfile />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
