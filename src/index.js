import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppOrdenes from "./components/Pages/AppOrdenes";
import AppHistorial from "./components/Pages/AppHistorial";
import AppProductos from "./components/Pages/AppProductos";
import AppPostForm from "./components/Pages/AppPostForm";
import AppEditPostForm from "./components/Pages/AppEditPostForm";
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
    path: "/viewproducts",
    element: <AppProductos />,
  },
  {
    path: "/newprodcut",
    element: <AppProductForm />,
  },
  {
    path: "/editproduct",
    element: <AppEditProductForm />,
  },
  {
    path: "/viewposts",
    element: <AppPosts />,
  },
  {
    path: "/newpost",
    element: <AppPostForm />,
  },
  {
    path: "/editposts",
    element: <AppEditPostForm />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
