import React, { useCallback, useEffect, useState } from "react";
import $ from "jquery";
import Title from "./title";
import { Link } from "react-router-dom";

const Product = () => {
  const [producto, setProducto] = useState([]);
  const [maxProductos, setMaxProductos] = useState(9);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [carritoDetallado, setCarritoDetallado] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Realizar la solicitud AJAX con jQuery
    $.ajax({
      url: "http://127.0.0.1:8000/api/producto",
      method: "GET",
      dataType: "json",
      success: (data) => {
        setProducto(data); // Guardar las rutas de imágenes en el estado
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error("Error al cargar las imágenes:", textStatus, errorThrown);
      },
    });
  }, []);

  const cargarMas = () => {
    setMaxProductos((prevMax) => prevMax + 9); // Incrementa el límite según desees
  };

  const manejarCambioBusqueda = (event) => {
    setBusqueda(event.target.value); // Actualiza el estado de búsqueda
  };

  // Filtrar productos según la búsqueda
  const productosFiltrados = producto.filter((e) =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  const procesarCarritoDetallado = useCallback(() => {
    try {
      const carritoLocal = JSON.parse(localStorage.getItem("carrito")) || [];
      setCarrito(carritoLocal);
    } catch (error) {
      console.error("Error al cargar el carrito desde localStorage:", error);
      setCarrito([]);
    }
    setTotal(0);
    setCarritoDetallado(
      carrito
        .map((item) => {
          const prod = producto.find((p) => p.id === item.id);
          if (prod) {
            return {
              id: item.id,
              nombre: prod.nombre,
              foto: prod.foto,
              precio: prod.precio, // Precio con 2 decimales
              cantidad: item.cantidad,
              total: parseFloat((item.cantidad * prod.precio).toFixed(2)), // Total con 2 decimales
            };
          }
          return null;
        })
        .filter(Boolean) // Filtrar valores nulos
    );
  }, [carrito, producto]);

  const eliminarProducto = (idProducto) => {
    const carritoActualizado = carrito.filter((item) => item.id !== idProducto);
    setCarrito(carritoActualizado);
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
  };

  useEffect(() => {
    procesarCarritoDetallado();
  }, [carrito, producto, procesarCarritoDetallado]);

  useEffect(() => {
    const nuevoTotal = carritoDetallado.reduce(
      (sum, item) => sum + item.total,
      0
    );
    setTotal(parseFloat(nuevoTotal.toFixed(2))); // Redondear a 2 decimales
  }, [carritoDetallado]);

  return (
    <>
      <div className="bd-violet d-flex justify-content-between px-4 py-2">
        <h1 className="fw-pacifico text-yellow-o">Categorias:</h1>
        <input
          type="text"
          className="form-control my-auto"
          style={{ maxWidth: "600px" }}
          placeholder="Buscar..."
          value={busqueda} // Vincula el estado al campo de entrada
          onChange={manejarCambioBusqueda} // Maneja cambios en el input
        />
      </div>
      <div className="container-fluid py-5 row">
        <div className="col-xl-4 col-lg-5 col-md-6 py-5 pl-5">
          <div className="card rounded-5 px-4 sticky-top">
            <h4 className="text-morado text-center fw-quicksand pt-4 mb-0">
              <b>Resumen del pedido</b>
            </h4>
            <hr />
            <div className="fw-quicksand p-3">
              <h5>
                <b>Detalle del producto</b>
              </h5>
              <div className="p-2">
                {carritoDetallado.map((e) => (
                  <div className="row pt-3">
                    <div className="col">
                      <h6>
                        {e.cantidad} x {e.nombre}
                      </h6>
                    </div>
                    <div className="col">
                      <h6>
                        <b>Bs. {e.total}</b>
                      </h6>
                    </div>
                    <div className="">
                      <button
                        className="btn btn-outline-primary p-0 px-1"
                        onClick={() => eliminarProducto(e.id)}
                      >
                        <i class="bi bi-x-lg"></i>
                      </button>
                    </div>
                  </div>
                ))}
                <hr />
                <div className="row">
                  <h6 className="col">
                    <b>Total</b>
                  </h6>
                  <h5 className="col text-plum w-100">
                    <b>Bs. {total}</b>
                  </h5>
                </div>
                <hr />
                <div className="text-center">
                  <Link to={`/carrito`} className="btn btn-primary">
                    Detalles <i class="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-lg-7 col-md-6 container py-5">
          <div className="row">
            {productosFiltrados.slice(0, maxProductos).map((e, index) => (
              <div className="col-xl-4 col-lg-6 col-sm-12 mb-4 pb-2">
                <div className="bg-light rounded p-2 h-100">
                  <img
                    src={e.foto}
                    alt=""
                    className="rounded"
                    style={{ width: "100%" }}
                  />
                  <div className="px-2 fw-quicksand">
                    <h4 className="my-3 text-purple">{e.nombre}</h4>
                    <p>
                      <b>{e.descripcion}</b>
                    </p>
                    <div className="d-flex justify-content-between">
                      <h5 className="text-plum align-content-center">
                        <b>{e.precio} bs</b>
                      </h5>
                      <button
                        className="btn btn-morado p-0 px-2"
                        onClick={() => agregarAlCarrito(e.id)}
                      >
                        <i class="fs-5 bi bi-cart2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-12 text-center">
              {maxProductos < productosFiltrados.length && (
                <button
                  onClick={cargarMas}
                  className="btn btn-primary py-3 px-5"
                >
                  Cargar más
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const agregarAlCarrito = (idProducto) => {
  // Leer el carrito actual del local storage
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Verificar si el producto ya existe en el carrito
  const productoExistente = carrito.find((item) => item.id === idProducto);

  if (productoExistente) {
    // Incrementar la cantidad si el producto ya existe
    productoExistente.cantidad += 1;
  } else {
    // Agregar un nuevo producto al carrito
    carrito.push({ id: idProducto, cantidad: 1 });
  }

  // Guardar el carrito actualizado en el local storage
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

export default Product;
