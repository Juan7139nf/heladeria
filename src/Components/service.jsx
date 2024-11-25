import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Service = ({ servicio = [] }) => {
  const settings = {
    autoplay: false,
    speed: 1500,
    margin: 30,
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 0,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
    prevArrow: (
      <button className="slick-prev">
        <i className="fa fa-angle-left" aria-hidden="true"></i>
      </button>
    ),
    nextArrow: (
      <button className="slick-next">
        <i className="fa fa-angle-right" aria-hidden="true"></i>
      </button>
    ),
  };
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="section-title position-relative mb-5">
              Los mejores servicios que brindamos a nuestros clientes
            </h1>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0 pb-5 pb-lg-0"></div>
        </div>
        <div className="row">
          <div className="col-12">
            <Slider {...settings} className="service-carousel">
              {servicio.map((e, index) => (
                <div className="service-item">
                  <div className="service-img mx-auto">
                    <img
                      className="rounded-circle w-100 h-100 bg-light p-3"
                      src={e.foto}
                      style={{ objectFit: "cover" }}
                      alt={`Imagen ${index + 1}`}
                    />
                  </div>
                  <div
                    className="position-relative text-center bg-light rounded p-4 pb-5"
                    style={{ marginTop: "-75px" }}
                  >
                    <h5 className="font-weight-semi-bold mt-5 mb-3 pt-5">
                      Individual Approach
                    </h5>
                    <p>
                      Dolor nonumy sed eos sed lorem diam amet eos magna. Dolor
                      kasd lorem duo stet kasd justo
                    </p>
                    <a
                      href=""
                      className="border-bottom border-secondary text-decoration-none text-secondary"
                    >
                      Leer más
                    </a>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
