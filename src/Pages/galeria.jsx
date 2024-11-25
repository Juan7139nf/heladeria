import React, { useEffect, useState } from "react";
import $ from "jquery";
import Navbar from "../Components/navbar";
import Header from "../Components/header";
import Footer from "../Components/footer";
import BackTop from "../Components/backTop";
import Title from "../Components/title";

const Galeria = () => {
  const title = "Galería";
  return (
    <>
      <Navbar />
      <Header title={title} />
      <Portafolio />
      <Footer />
      <BackTop />
    </>
  );
};

const Galery = () => {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    // Realizar la solicitud AJAX con jQuery
    $.ajax({
      url: "http://localhost/melov/galeria.php",
      method: "GET",
      dataType: "json",
      success: (data) => {
        setImagenes(data); // Guardar las rutas de imágenes en el estado
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error("Error al cargar las imágenes:", textStatus, errorThrown);
      },
    });
  }, []);

  return (
    <div className="row m-0 portfolio-container">
      {imagenes.map((ruta, index) => (
        <div className="col-lg-4 col-md-6 p-0 portfolio-item">
          <div className="position-relative overflow-hidden">
            <img
              className="img-fluid w-100"
              key={index}
              src={`${ruta}`}
              alt={`Imagen ${index + 1}`}
            />
            <a className="portfolio-btn" data-lightbox="portfolio">
              <i
                className="fa fa-plus text-primary"
                style={{ fontSize: "60px" }}
              ></i>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

const Portafolio = () => {
  return (
    <div className="container-fluid py-5 px-0">
      <div className="container py-5">
        <Title title={"Deliciosos Helados Artesanales"} />
        <div className="row">
          <div className="col-12 text-center">
            <ul className="list-inline mb-4 pb-2" id="portfolio-flters">
              <li
                className="btn btn-sm btn-outline-primary m-1 active"
                data-filter="*"
              >
                Todo
              </li>
              <li
                className="btn btn-sm btn-outline-primary m-1"
                data-filter=".first"
              >
                Cono
              </li>
              <li
                className="btn btn-sm btn-outline-primary m-1"
                data-filter=".second"
              >
                Vainilla
              </li>
              <li
                className="btn btn-sm btn-outline-primary m-1"
                data-filter=".third"
              >
                Chocolate
              </li>
            </ul>
          </div>
        </div>
        <Galery />
      </div>
    </div>
  );
};

export default Galeria;
