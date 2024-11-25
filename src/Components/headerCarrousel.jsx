import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Mostrador from "../assets/mostrador.jpg";
import Mostrador1 from "../assets/mostrador_1.jpg";
import ImgInicio from "../assets/inicio.webp";
import Barquillos from "../assets/img/barquillos.png";
import Foto1 from "../assets/img/foto1.jfif"
import Foto2 from "../assets/img/foto2.jfif"
import Qr from "../assets/img/CódigoQRparaProyectoFinal_Diseño.png"

const HeaderCarousel = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000, // Intervalo de tiempo entre cada slide
    dots: false,
    infinite: true,
    speed: 1000, // Velocidad de la transición
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Incluye flechas de navegación
    prevArrow: (
      <button
        className="btn btn-secondary px-0"
        style={{ width: "45px", height: "45px" }}
      >
        <span className="carousel-control-prev-icon mb-n1"></span>
      </button>
    ),
    nextArrow: (
      <button
        className="btn btn-secondary px-0"
        style={{ width: "45px", height: "45px" }}
      >
        <span className="carousel-control-next-icon mb-n1"></span>
      </button>
    ),
  };

  return (
    <>
      <div className="container-fluid p-0 header-carrousel page-header">
        <Slider {...settings} className="header-carousel">
          <div className="carousel-item">
            <img className="w-100" src={Mostrador} alt="Image" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: "500px" }}>
                <h4 className="text-white text-uppercase mb-md-3">
                  Tradicional y delicioso
                </h4>
                <h1 className="display-3 text-white mb-md-4">Tradicional</h1>
                <a href="#" className="btn btn-primary py-md-3 px-md-5 mt-2">
                  Leer más
                </a>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img className="w-100" src={Mostrador1} alt="Image" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: "500px" }}>
                <h4 className="text-white text-uppercase mb-md-3">
                  Tradicional y delicioso
                </h4>
                <h1 className="display-3 text-white mb-md-4">Hecho</h1>
                <a href="#" className="btn btn-primary py-md-3 px-md-5 mt-2">
                  Leer más
                </a>
              </div>
            </div>
          </div>
        </Slider>
        <div className="bd-cyan">
          <img src={ImgInicio} alt="" style={{ width: "100%" }} />
        </div>
      </div>
      <div className="bg-light p-5">
        <h1 className="fw-pacifico text-morado text-center">
          Opiniones de nuestros clientes:
        </h1>
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-4 align-content-center">
              <div className="card p-2">
                <div className="row">
                  <div className="col align-content-center">
                    <img
                      src={Foto1}
                      alt=""
                      className="rounded-circle"
                      width={"100%"}
                      style={{ aspectRatio: "1/1", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col">
                    <h4 className="fw-bold">Nahid Hasan</h4>
                    <p className="">UX/UI Designer</p>
                    <span className="bd-purple p-2 px-3 rounded-pill">4.5</span>
                    <small className="d-block">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 align-content-center">
              <img src={Barquillos} alt="" width={"100%"} />
            </div>

            <div className="col-lg-4 align-content-center">
              <div className="card p-2">
                <div className="row">
                  <div className="col align-content-center">
                    <img
                      src={Foto2}
                      alt=""
                      className="rounded-circle"
                      width={"100%"}
                      style={{ aspectRatio: "1/1", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col">
                    <h4 className="fw-bold">Nahid Hasan</h4>
                    <p className="">UX/UI Designer</p>
                    <span className="bd-purple p-2 px-3 rounded-pill">4.5</span>
                    <small className="d-block">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-lg-4 align-content-center"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 text-center"><img src={Qr} alt="" style={{maxWidth:'500px'}} /></div>
          <div className="col-md-6 text-center px-5 align-content-center"><h1 className="title-xl text-morado fw-pacifico">Código para escanear</h1></div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default HeaderCarousel;
