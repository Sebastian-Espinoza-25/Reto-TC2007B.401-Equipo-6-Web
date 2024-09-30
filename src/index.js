import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppOrdenes from './components/Pages/AppOrdenes';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom'
import AppHistorial from './components/Pages/AppHistorial';
import AppProducto from './components/Pages/AppProductos';
import AppComunidad from './components/Pages/AppComunidades';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/appordenes",
    element: <AppOrdenes/>,
  },
  {
    path: "/appventas",
    element: <AppHistorial/>,
  },
  {
    path: "/appproductos",
    element: <AppProducto/>,
  },
  {
    path: "/appcomunidades",
    element: <AppComunidad/>,
  },


]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
