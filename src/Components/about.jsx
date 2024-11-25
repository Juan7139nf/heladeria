import React, { useEffect, useState } from "react";
import $ from "jquery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Title from "./title";
import ImgNosotros from "../assets/muestra_de_helado.jpg";
import Fondo from "../assets/img/fondo.png";
import Personaje from "../assets/img/personaje.png";

const About = () => {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    // Realizar la solicitud AJAX con jQuery
    $.ajax({
      url: "http://localhost/melov/nosotros.php",
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
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 0,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };
  return (
    <div className="container-fluid page-header">
      <div className="row position-relative">
        <div className="col col-lg-4 bg-light pt-5">
          <h1 className="fw-pacifico title-xl text-plum pt-5">
            Sobre nosotros:
          </h1>
          <Slider {...settings} className="team-carousel">
            {imagenes.map((e) => (
              <div className="team-item">
                <div className="card">
                  <img
                    className="w-100 h-100"
                    src={e}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div
          className="col col-lg-8 p-5 fondo-nosotros"
          style={{
            backgroundImage: `url(${Fondo})`,
            backgroundSize: "100%",
          }}
        >
          <div
            className="card fondo-opacity fw-quicksand mx-auto my-5 py-5"
            style={{ maxWidth: "700px" }}
          >
            <h3 className="text-plum">
               ¡Bienvenidos a nuestra heladería en Tarija!
            </h3>
            <h4 className="text-morado py-4">
              Con más de 7 años en la ciudad, esta idea comenzó como un sueño y,
              gracias a su apoyo, se ha convertido en una deliciosa realidad.
              Elaboramos helados irresistibles de forma natural y sin
              conservantes, utilizando las frescas frutas de nuestra región.
              Contamos con dos sucursales, donde podrás disfrutar de sabores
              auténticos que te harán sonreír. <br />
              Cada 25 de noviembre, celebramos nuestro aniversario y queremos
              que tú seas parte de esta fiesta
            </h4>
          </div>
          <h3 className="fw-pacifico text-morado py-5 text-center p-5">
            ¡Te esperamos con los brazos abiertos y un delicioso helado en mano!
          </h3>
        </div>
        <img src={Personaje} className="position-absolute rounded-circle bottom-0 ml-6 d-none d-lg-block" alt="" width={250} />
      </div>
    </div>
  );
};

export default About;
