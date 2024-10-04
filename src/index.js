import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppOrdenes from "./components/Pages/AppOrdenes";
import AppHistorial from "./components/Pages/AppHistorial";
import AppProductos from "./components/Pages/AppProductos";
import AppComunidades from "./components/Pages/AppComunidades";
import AppProductForm from "./components/Pages/AppProductForm";
import AppEditProductForm from "./components/Pages/AppEditProductForm";
import AppPosts from "./components/Pages/AppPosts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/appordenes",
    element: <AppOrdenes />,
  },
  {
    path: "/appventas",
    element: <AppHistorial />,
  },
  {
    path: "/appproductos",
    element: <AppProductos />,
  },
  {
    path: "/productform",
    element: <AppProductForm />,
  },
  {
    path: "/editproductform",
    element: <AppEditProductForm />,
  },
  {
    path: "/appcomunidades",
    element: <AppComunidades />,
  },
  {
    path: "/appposts",
    element: <AppPosts />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
