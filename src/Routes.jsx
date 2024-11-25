import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Nosotros from "./Pages/nosotros";
import Producto from "./Pages/producto";
import Servicio from "./Pages/servicio";
import Galeria from "./Pages/galeria";
import Contacto from "./Pages/contacto";
import ProductoA from "./Admin/productoA";
import PedidoA from "./Admin/pedidoA";
import Carrito from "./Pages/carrito";
import Pedido from "./Components/pedido";

const MisRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/servicio" element={<Servicio />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/producto/listar" element={<ProductoA />} />
        <Route path="/pedido/listar" element={<PedidoA />} />
        <Route path="/mis/pedidos" element={<Pedido />} />
      </Routes>
    </BrowserRouter>
  );
};

// Componente para rutas protegidas
const RutaProtegida = ({ children, rolesPermitidos }) => {
  const user = JSON.parse(localStorage.getItem("usuario")); // Obtener usuario del localStorage

  // Verificar si el usuario existe y su rol está en los roles permitidos
  if (!user || !rolesPermitidos.includes(user.rol)) {
    return <Navigate to="/" replace />; // Redirigir al inicio si no tiene acceso
  }

  return children; // Renderizar el contenido si tiene acceso
};

export default MisRoutes;
