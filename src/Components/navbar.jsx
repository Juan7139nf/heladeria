import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo_color.webp";
import Login from "./login";
import Register from "./register";
import Cookies from "js-cookie";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [cookieData, setCookieData] = useState([]);

  // Función para alternar la visibilidad del menú
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Función para cerrar el menú si se hace clic fuera de él
  const closeMenu = (e) => {
    if (!e.target.closest(".dropdown")) {
      setShowMenu(false);
    }
  };

  // Usamos useEffect para agregar y quitar el listener de clics fuera del menú
  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  const location = useLocation();

  const CerrarSession = () => {
    // Eliminar la cookie "usuario"
    Cookies.remove("usuario");
    console.log("Cookie eliminada");
    // Eliminar la variable "usuario" del local storage
    localStorage.removeItem("usuario");
    actualizarCookieData(setCookieData);
  };

  // Llamar a la función al cargar la página
  useEffect(() => {
    actualizarCookieData(setCookieData);
  }, []); // El arreglo vacío asegura que se ejecute solo una vez, al montar el componente.

  return (
    <>
      <div className="container-fluid position-relative nav-bar p-0">
        <div
          className="container-lg position-relative p-0 px-lg-3"
          style={{ zIndex: 9 }}
        >
          <nav className="navbar navbar-expand-lg bg-white navbar-light shadow p-lg-0">
            <a href="index.html" className="navbar-brand d-block d-lg-none">
              <Link to={`/`} className="navbar-brand d-block d-lg-none">
                <img src={Logo} alt="" className="navbar-logo" />
              </Link>
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav ml-auto py-0">
                <Link
                  to={`/`}
                  className={`nav-item nav-link text-plum rounded rounded-pill py-2 text-center fw-quicksand ${
                    location.pathname === "/" ? "active bd-plum text-white" : ""
                  }`}
                >
                  Inicio
                </Link>
                <Link
                  to={`/nosotros`}
                  className={`nav-item nav-link text-plum rounded rounded-pill py-2 text-center fw-quicksand ${
                    location.pathname === "/nosotros"
                      ? "active bd-plum text-white"
                      : ""
                  }`}
                >
                  Nosotros
                </Link>
              </div>
              <Link to={`/`} className="navbar-brand mx-5 d-none d-lg-block">
                <img src={Logo} alt="" className="navbar-logo" />
              </Link>
              <div className="navbar-nav mr-auto py-0">
                <Link
                  to={`/producto`}
                  className={`nav-item nav-link text-plum rounded rounded-pill py-2 text-center fw-quicksand ${
                    location.pathname === "/producto"
                      ? "active bd-plum text-white"
                      : ""
                  }`}
                >
                  Productos
                </Link>
                <Link
                  to={`/servicio`}
                  className={`nav-item nav-link text-plum rounded rounded-pill py-2 text-center fw-quicksand ${
                    location.pathname === "/servicio"
                      ? "active bd-plum text-white"
                      : ""
                  }`}
                >
                  Servicio
                </Link>
                <Link
                  to={`/carrito`}
                  className={`nav-item nav-link text-plum rounded rounded-pill py-2 text-center fw-quicksand ${
                    location.pathname === "/carrito"
                      ? "active bd-plum text-white"
                      : ""
                  }`}
                >
                  <i class="bi bi-cart-fill"></i>
                </Link>
                <Link
                  to={`/contacto`}
                  className={`nav-item nav-link rounded text-white rounded-pill py-2 text-center fw-quicksand bd-cyan ${
                    location.pathname === "/contacto" ? "active bd-plum" : ""
                  }`}
                >
                  Contacto
                </Link>

                <li class="dropdown">
                  <a
                    class={`nav-item nav-link text-plum rounded rounded-pill py-2 text-center fw-quicksand dropdown-toggle cursor-pointer ${
                      showMenu ? "active bd-plum text-white" : ""
                    }`}
                    onClick={toggleMenu}
                  >
                    <i class="bi bi-person-fill-add"></i>
                  </a>
                  {showMenu && (
                    <div className="dropdown-menu dropdown-menu-right show">
                      {!cookieData.id && (
                        <>
                          <a
                            className="dropdown-item"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#btnLogin"
                          >
                            Iniciar sesion
                          </a>
                          <a
                            className="dropdown-item"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#btnRegister"
                          >
                            Registrarse
                          </a>
                        </>
                      )}
                      {cookieData.rol == "Administrador" && (
                        <>
                          <Link
                            to={`/producto/listar`}
                            className={`dropdown-item ${
                              location.pathname === "/producto/listar"
                                ? "active bd-plum"
                                : ""
                            }`}
                          >
                            Productos
                          </Link>
                          <Link
                            to={`/pedido/listar`}
                            className={`dropdown-item ${
                              location.pathname === "/pedido/listar"
                                ? "active bd-plum"
                                : ""
                            }`}
                          >
                            Pedidos
                          </Link>
                        </>
                      )}
                      {cookieData.rol == "Vendedor" && (
                        <Link
                          to={`/pedido/listar`}
                          className={`dropdown-item ${
                            location.pathname === "/pedido/listar"
                              ? "active bd-plum"
                              : ""
                          }`}
                        >
                          Pedidos
                        </Link>
                      )}
                      {cookieData.id && (
                        <>
                          <Link
                            to={`/mis/pedidos`}
                            className={`dropdown-item ${
                              location.pathname === "/mis/pedidos"
                                ? "active bd-plum"
                                : ""
                            }`}
                          >
                            Mis pedidos
                          </Link>
                          <a
                            className="dropdown-item text-danger"
                            onClick={CerrarSession}
                          >
                            Salir
                          </a>
                        </>
                      )}
                    </div>
                  )}
                </li>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <Login setCookieData={setCookieData} />
      <Register setCookieData={setCookieData} />
    </>
  );
};

export const actualizarCookieData = (setCookieData) => {
  // Leer y actualizar los datos de la cookie
  const userCookie = Cookies.get("usuario");
  if (userCookie) {
    const parsedData = JSON.parse(userCookie); // Parsear los datos si están en formato JSON
    setCookieData(parsedData); // Actualizar el estado con los datos de la cookie
    //console.log(parsedData);
    const usuario = parsedData.id; // Guardar el ID en la variable usuario
    localStorage.setItem("usuario", usuario); // Guardar en local storage
  } else {
    setCookieData([]); // Si no existe la cookie, limpiar el estado
  }
};

export default Navbar;
