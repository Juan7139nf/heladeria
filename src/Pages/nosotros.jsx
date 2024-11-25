import React from "react";
import Navbar from "../Components/navbar";
import Header from "../Components/header";
import Footer from "../Components/footer";
import BackTop from "../Components/backTop";
import About from "../Components/about";
import Team from "../Components/team"

const Nosotros = () => {
  const title = "Sobre nosotros";
  return (
    <>
      <Navbar />
      <About />
      <Footer />
      <BackTop />
    </>
  );
};

export default Nosotros;
