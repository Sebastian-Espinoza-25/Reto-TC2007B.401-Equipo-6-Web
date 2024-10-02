import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppOrdenes from './components/Pages/AppOrdenes';
import AppHistorial from './components/Pages/AppHistorial';
import AppProducto from './components/Pages/AppProductos';
import AppComunidad from './components/Pages/AppComunidades';
import AppProductForm from './components/Pages/AppProductForm'; // Importa el nuevo componente

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

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
    element: <AppProducto />,
  },
  {
    path: "/appcomunidades",
    element: <AppComunidad />,
  },
  {
    path: "/productform",
    element: <AppProductForm />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);