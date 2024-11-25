import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.png";

const Footer = () => {
  return (
    <>
      <div
        className="container-fluid footer bd-yellow py-5"
        style={{ marginTop: "90px" }}
      >
        <div className="container text-center py-5">
          <div className="row">
            <div className="col-12 mb-4">
              <Link to={'/'} className="navbar-brand m-0">
                <img src={Logo} alt="" className="w-100 rounded-circle" style={{maxHeight:'200px'}}/>
              </Link>
            </div>
            <div className="col-12 mb-4">
            </div>
            <div className="col-12 mt-2 mb-4">
              <div className="row">
              </div>
            </div>
            <div className="col-12">
              <p className="m-0 text-plum">
                Copyright &copy; Grupo 4
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
