import React from "react";
import Navbar from "../Components/navbar";
import Header from "../Components/header";
import Footer from "../Components/footer";
import BackTop from "../Components/backTop";
import Title from "../Components/title";
import Map from "../assets/img/mapa.jpg";
import Sucre from "../assets/img/sucre.jfif";
import Bolivar from "../assets/img/bolivar.jfif";

const Contacto = () => {
  const title = "Contacto";
  return (
    <>
      <Navbar />
      <Mapa />
      <Footer />
      <BackTop />
    </>
  );
};

const Mapa = () => {
  return (
    <>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="text-center text-morado fw-pacifico">Contáctenos para cualquier consulta</h1>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="contact-form bg-light rounded p-5">
                <div id="success"></div>
                <form
                  name="sentMessage"
                  id="contactForm"
                  novalidate="novalidate"
                >
                  <div className="form-row">
                    <div className="col-sm-6 control-group">
                      <input
                        type="text"
                        className="form-control p-3"
                        placeholder="Tú nombre"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="col-sm-6 control-group">
                      <input
                        type="email"
                        className="form-control p-3"
                        placeholder="Tú Correo"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <input
                      type="text"
                      className="form-control p-3"
                      placeholder="Asunto"
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="control-group">
                    <textarea
                      className="form-control p-3"
                      rows="6"
                      placeholder="Mensaje"
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary w-100 py-3 px-5 rounded-pill fw-bold"
                      type="submit"
                    >
                      Eviar Mensaje
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fondo-opacity">
        <h1 className="fw-pacifico text-morado text-center p-4">
          Horarios y sucursales
        </h1>
        <div className="row container mx-auto">
          <div className="col col-lg-6 text-center">
            <h2 className="fw-quicksand text-plum">Sucursal 1</h2>
            <div className="bd-violet rounded p-5">
              <img src={Bolivar} alt="" width={'100%'}/>
              <div className="d-flex py-3"><i class="bi bi-clock text-morado"></i><div className="text-center w-100"><b>Horario: </b>9 AM - 9 PM</div></div>
              <div className="d-flex py-3"><i class="bi bi-telephone text-morado"></i><div className="text-center w-100"><b>Número telefonico: </b>72954544</div></div>
              <div className="d-flex py-3"><i class="bi bi-geo-alt text-morado"></i><div className="text-center w-100"><b>Dirección: </b>Parque Bolívar, Calle Bolívar al lado de la facultad de odontología</div></div>
              <img src={Map} alt="" width={'100%'}/>
            </div>
          </div>
          <div className="col col-lg-6 text-center">
            <h2 className="fw-quicksand text-plum">Sucursal 1</h2>
            <div className="bd-violet rounded p-5">
              <img src={Sucre} alt="" width={'100%'}/>
              <div className="d-flex py-3"><i class="bi bi-clock text-morado"></i><div className="text-center w-100"><b>Horario: </b>9 AM - 9 PM</div></div>
              <div className="d-flex py-3"><i class="bi bi-telephone text-morado"></i><div className="text-center w-100"><b>Número telefonico: </b>64348866</div></div>
              <div className="d-flex py-3"><i class="bi bi-geo-alt text-morado"></i><div className="text-center w-100"><b>Dirección: </b>Plazuela Sucre, Calle Virginio Lema entre Suipacha y Colón</div></div>
              <img src={Map} alt="" width={'100%'}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacto;
