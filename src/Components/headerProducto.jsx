import React from "react";
import HeaderProduct from "../assets/img/headerProducto.jfif";

const HeaderProducto = () => {
  return (
    <>
      <div
        className="page-header align-content-center"
        style={{
          backgroundImage: `url(${HeaderProduct})`,
          backgroundSize: "100%",
          backgroundPosition: 'center',
          aspectRatio: '16/5'
        }}
      >
        <h1 className="fw-pacifico text-light text-center title-xl">Productos y precios</h1>
      </div>
    </>
  );
};

export default HeaderProducto;
