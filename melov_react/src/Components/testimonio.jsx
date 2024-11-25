import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Title from "./title";

const Testimonio = ({ cliente = [] }) => {
  const settings = {
    autoplay: true,
    speed: 1500, // Equivalente a smartSpeed en owlCarousel
    dots: true,
    infinite: true, // Equivalente a loop en owlCarousel
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <Title title={"Los clientes opinan sobre nuestro famoso helado"} />
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Slider {...settings} className="testimonial-carousel">
              {cliente.map((e, index) => (
                <div className="text-center">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                  <h4 className="font-weight-light mb-4">{e.descripcion}</h4>
                  <img
                    className="img-fluid mx-auto mb-3 rounded-circle"
                    src={e.foto}
                    alt={`Imagen ${index + 1}`}
                  />
                  <h5 className="font-weight-bold m-0">{e.nombre}</h5>
                  <span>{e.profesion}</span>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonio;
