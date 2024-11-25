import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Team_1 from "../assets/team-1.jpg";
import Team_2 from "../assets/team-2.jpg";
import Team_3 from "../assets/team-3.jpg";
import Team_4 from "../assets/team-4.jpg";

const Team = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
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
              Los heladeros más famosos y con más experiencia
            </h1>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0 pb-5 pb-lg-0 position-relative"></div>
        </div>
        <div className="row">
          <div className="col-12">
            <Slider {...settings} className="team-carousel">
              <div className="team-item">
                <div className="team-img mx-auto">
                  <img
                    className="rounded-circle w-100 h-100"
                    src={Team_1}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  className="position-relative text-center bg-light rounded px-4 py-5"
                  style={{ marginTop: "-100px" }}
                >
                  <h3 className="font-weight-bold mt-5 mb-3 pt-5">Full Name</h3>
                  <h6 className="text-uppercase text-muted mb-4">
                    Designation
                  </h6>
                  <div className="d-flex justify-content-center pt-1">
                    <a
                      className="btn btn-outline-secondary btn-social mr-2"
                      href="#"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      className="btn btn-outline-secondary btn-social mr-2"
                      href="#"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      className="btn btn-outline-secondary btn-social mr-2"
                      href="#"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-item">
                <div className="team-img mx-auto">
                  <img
                    className="rounded-circle w-100 h-100"
                    src={Team_2}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  className="position-relative text-center bg-light rounded px-4 py-5"
                  style={{ marginTop: "-100px" }}
                >
                  <h3 className="font-weight-bold mt-5 mb-3 pt-5">Full Name</h3>
                  <h6 className="text-uppercase text-muted mb-4">
                    Designation
                  </h6>
                  <div className="d-flex justify-content-center pt-1">
                    <a
                      className="btn btn-outline-secondary btn-social mr-2"
                      href="#"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      className="btn btn-outline-secondary btn-social mr-2"
                      href="#"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      className="btn btn-outline-secondary btn-social mr-2"
                      href="#"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-item">
                <div className="team-img mx-auto">
                  <img
                    className="rounded-circle w-100 h-100"
                    src={Team_3}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  className="position-relative text-center bg-light rounded px-4 py-5"
                  style={{ marginTop: "-100px" }}
                >
                  <h3 className="font-weight-bold mt-5 mb-3 pt-5">Full Name</h3>
                  <h6 className="text-uppercase text-muted mb-4">
                    Designation
                  </h6>
                  <div className="d-flex justify-content-center pt-1">
                    <a
                      className="btn btn-outline-secondary btn-social mr-2"
                      href="#"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      className="btn btn-outline-secondary btn-social mr-2"
                      href="#"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      className="btn btn-outline-secondary btn-social mr-2"
                      href="#"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-item">
                <div className="team-img mx-auto">
                  <img
                    className="rounded-circle w-100 h-100"
                    src={Team_4}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  className="position-relative text-center bg-light rounded px-4 py-5"
                  style={{ marginTop: "-100px" }}
                >
                  <h3 className="font-weight-bold mt-5 mb-3 pt-5">Full Name</h3>
                  <h6 className="text-uppercase text-muted mb-4">
                    Designation
                  </h6>
                  <div className="d-flex justify-content-center pt-1">
                    <a
                      className="btn btn-outline-secondary btn-social mr-2"
                      href="#"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      className="btn btn-outline-secondary btn-social mr-2"
                      href="#"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      className="btn btn-outline-secondary btn-social mr-2"
                      href="#"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
