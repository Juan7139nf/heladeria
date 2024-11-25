import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "../assets/img/image.png";
import "./header.css";
import Helado from "../assets/img/helado.png";
import Google from "../assets/img/google.png";
import Recordatorio from "../assets/img/recordatorio.png";
import Cumple from "../assets/img/cumple.png";
import Meloc from "../assets/img/melov.png";
import Camino from "../assets/img/camino.png";

const Header = ({ title }) => {
  return (
    <div
      className="jumbotron jumbotron-fluid page-header p-0 m-0 bg-white"
      style={{ marginBottom: "90px" }}
    >
      <div className="w-100 row m-0">
        <img
          className="col col-lg-7 p-0 img-service service-foto"
          src={Helado}
          alt=""
          width={"100%"}
        />
        <img
          className="col col-lg-5 p-0 img-service"
          src={Google}
          alt=""
          width={"100%"}
        />
      </div>
      <div className="w-100 row m-0 container mx-auto">
        <div className="col col-lg-5 text-center">
          <img
            src={Recordatorio}
            alt=""
            className="rounded-5"
            style={{ maxWidth: "400px" }}
          />
        </div>
        <div className="col col-lg-7 text-center">
          <h1 className="fw-pacifico">
            <span className="text-dark">Nuestros</span>{" "}
            <span className="text-morado">Servicios</span>
          </h1>
          <div className="fw-quicksand mx-auto" style={{ maxWidth: "500px" }}>
            <h2 className="text-lilac">Tenemos una tarjeta de fidelidad</h2>
            <h4>
              La Tarjeta Dulce Sorpresa es nuestra forma de agradecerte por ser
              un cliente leal de nuestra heladería. Cada vez que nos visitas,
              ganas puntos que te acercan a un delicioso premio: ¡un helado
              gratis!
            </h4>
          </div>
        </div>
      </div>
      <div className="w-100 row m-0 container mx-auto pb-3">
        <div className="col col-lg-7 text-center pt-5">
          <div className="fw-quicksand mx-auto" style={{ maxWidth: "500px" }}>
            <h1 className="text-plum">Promociones de cumplañero</h1>
            <h4>
              Celebra tu cumpleaños de la manera más deliciosa con nuestra
              promoción especial. En nuestra heladería, te ofrecemos un helado
              gratis para que disfrutes en tu día especial.
            </h4>
          </div>
        </div>
        <div className="col col-lg-5 text-center">
          <img
            src={Cumple}
            alt=""
            className="rounded-5"
            style={{ maxWidth: "400px" }}
          />
        </div>
      </div>
      <img
        src={Image}
        alt=""
        width={"100%"}
        height={250}
        style={{ objectFit: "cover" }}
      />
      <div className="row container mx-auto">
        <div className="col col-lg-5 text-center align-content-center">
          <img src={Meloc} alt="" className="rounded-pill" />
        </div>
        <div className="col col-lg-7 py-5">
          <div className="fw-quicksand mx-auto text-center" style={{ maxWidth: "500px" }}>
            <h1 className="text-morado">Atención al Cliente:</h1>
            <h4>
              Nuestro equipo está siempre listo para ayudarte. Si tienes
              preguntas o necesitas recomendaciones, no dudes en consultarnos.
            </h4>
            <img src={Camino} alt="" className="rounded-circle pt-4" style={{maxWidth:'400px'}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
