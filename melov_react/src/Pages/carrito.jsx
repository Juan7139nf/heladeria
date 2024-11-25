import React, { useCallback, useEffect, useState } from "react";
import $ from "jquery";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [carritoDetallado, setCarritoDetallado] = useState([]);
  const [total, setTotal] = useState(0);

  // Función para procesar los detalles del carrito
  const procesarCarritoDetallado = useCallback(() => {
    setCarritoDetallado(
      carrito
        .map((item) => {
          const prod = productos.find((p) => p.id === item.id);
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
  }, [carrito, productos]);

  // Efecto para calcular el total general
  useEffect(() => {
    const nuevoTotal = carritoDetallado.reduce(
      (sum, item) => sum + item.total,
      0
    );
    setTotal(parseFloat(nuevoTotal.toFixed(2))); // Redondear a 2 decimales
  }, [carritoDetallado]);

  // Efecto para cargar los productos desde la API
  useEffect(() => {
    $.ajax({
      url: "http://127.0.0.1:8000/api/producto",
      method: "GET",
      dataType: "json",
      success: (data) => {
        setProductos(data); // Guardar los datos de productos
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error(
          "Error al cargar los productos:",
          textStatus,
          errorThrown
        );
      },
    });
  }, []);

  // Efecto para cargar el carrito desde localStorage
  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoLocal);
  }, []);

  // Efecto para procesar los detalles del carrito cuando los datos cambien
  useEffect(() => {
    procesarCarritoDetallado();
  }, [carrito, productos, procesarCarritoDetallado]);

  // Función para disminuir la cantidad
  const disminuirCantidad = (idProducto) => {
    const carritoActualizado = carrito.map((item) =>
      item.id === idProducto
        ? { ...item, cantidad: Math.max(item.cantidad - 1, 1) }
        : item
    );
    const carritoFiltrado = carritoActualizado.filter(
      (item) => item.cantidad > 0
    );
    setCarrito(carritoFiltrado);
    localStorage.setItem("carrito", JSON.stringify(carritoFiltrado));
  };

  // Función para aumentar la cantidad
  const aumentarCantidad = (idProducto) => {
    const carritoActualizado = carrito.map((item) =>
      item.id === idProducto ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarrito(carritoActualizado);
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
  };

  // Función para eliminar un producto del carrito
  const eliminarProducto = (idProducto) => {
    const carritoActualizado = carrito.filter((item) => item.id !== idProducto);
    setCarrito(carritoActualizado);
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
  };

  const crearPedido = () => {
    // Obtener el cliente desde el localStorage (asumiendo que el usuario está guardado en formato JSON)
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Verificar si el usuario está en el localStorage
    if (!usuario) {
      console.error("No se encontró el usuario en el localStorage.");
      return;
    }

    // Verificar si el carritoDetallado está vacío
    if (carritoDetallado.length === 0) {
      console.error("El carrito está vacío. No se puede crear el pedido.");
      return; // No hacer nada si el carrito está vacío
    }

    // Crear el objeto del pedido
    const pedido = {
      cliente: usuario, // Usamos el id del cliente desde el localStorage
      vendedor: null, // Vendedor es null según lo solicitado
      detalle: JSON.stringify(
        carritoDetallado.map((item) => ({
          id_producto: item.id,
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio_unitario: item.precio,
          total: (item.cantidad * item.precio).toFixed(2),
        }))
      ), // Convertimos el carrito detallado a un string JSON
      pago: null, // Pago es null según lo solicitado
      estado: "Pendiente", // Estado del pedido
      total: total, // Asegurarnos de que el total tenga 2 decimales
    };

    $.ajax({
      url: "http://127.0.0.1:8000/api/pedido",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(pedido), // Convertimos el objeto en JSON
      success: (data) => {
        console.log("Pedido creado exitosamente:", data);
        // Eliminar el carrito del localStorage después de crear el pedido
        localStorage.removeItem("carrito");
        setCarrito([]);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error("Error al crear el pedido:", textStatus, errorThrown);
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid pt-2 pb-5 bg-light rounded px-lg-5">
        <h1 className="text-morado fw-pacifico title-xl pb-3">
          Carrito de la compra
        </h1>
        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive px-md-5">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Detalle del producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {carritoDetallado.map((item) => (
                    <tr>
                      <td className="d-flex">
                        <img
                          src={item.foto}
                          alt={item.nombre}
                          className="rounded"
                          style={{
                            width: "100px",
                            objectFit: "cover",
                            aspectRatio: "1/1",
                            marginRight: "10px",
                          }}
                        />
                        <h5 className="my-auto">{item.nombre}</h5>
                      </td>
                      <td className="text-plum align-content-center">
                        <b>Bs. {item.precio}</b>
                      </td>
                      <td className="align-content-center">
                        <div className="btn-group">
                          <button
                            className="btn btn-outline-secondary p-0 px-1"
                            onClick={() => disminuirCantidad(item.id)}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <span className="border border-secondary px-2">
                            {item.cantidad}
                          </span>
                          <button
                            className="btn btn-outline-secondary p-0 px-1"
                            onClick={() => aumentarCantidad(item.id)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="align-content-center">
                        <b>{item.total}</b>
                      </td>
                      <td className="align-content-center">
                        <button
                          className="btn btn-outline-primary p-0 px-1"
                          onClick={() => eliminarProducto(item.id)}
                        >
                          <i class="bi bi-x-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card rounded-5">
              <h4 className="text-morado text-center fw-quicksand pt-4 mb-0">
                <b>Resumen del pedido</b>
              </h4>
              <hr />
              <div className="fw-quicksand p-3">
                <h4>
                  <b>Detalle del producto</b>
                </h4>
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
                    <button className="btn btn-primary" onClick={crearPedido}>
                      Pasar por caja <i class="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Carrito;
