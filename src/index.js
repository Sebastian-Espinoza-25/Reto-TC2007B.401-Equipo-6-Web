import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppProducto from "./components/Pages/AppProducto";
import AppComunity from "./components/Pages/AppComunity";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ordenes",
    element: <App />,
  },
  {
    path: "/users",
    element: <App />,
  },
  {
    path: "/partners",
    element: <App />,
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
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
