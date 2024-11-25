import React from "react";
import Navbar from "../Components/navbar";
import Header from "../Components/header";
import Footer from "../Components/footer";
import BackTop from "../Components/backTop";
import Product from "../Components/product";
import HeaderProducto from "../Components/headerProducto";

const Producto = () => {
  const title = "Productos";
  return (
    <>
      <Navbar />
      <HeaderProducto />
      <Product />
      <Footer />
      <BackTop />
    </>
  );
};

export default Producto;
