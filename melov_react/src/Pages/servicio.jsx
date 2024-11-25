import React, { useEffect, useState } from "react";
import $ from "jquery";
import Navbar from "../Components/navbar";
import Header from "../Components/header";
import Footer from "../Components/footer";
import BackTop from "../Components/backTop";
import Testimonio from "../Components/testimonio";
import Service from "../Components/service";

const Servicio = () => {
  /*
  const [servicio, setServicio] = useState([]);

  useEffect(() => {
    // Realizar la solicitud AJAX con jQuery
    $.ajax({
      url: "http://localhost/melov/servicio.php",
      method: "GET",
      dataType: "json",
      success: (data) => {
        setServicio(data); // Guardar las rutas de imágenes en el estado
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error("Error al cargar las imágenes:", textStatus, errorThrown);
      },
    });
  }, []);*/
  const title = "Servicio";
  return (
    <>
      <Navbar />
      <Header title={title} />
      <Footer />
      <BackTop />
    </>
  );
};

export default Servicio;
