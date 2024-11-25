import React, { useEffect, useState } from "react";
import $ from "jquery";
import Navbar from "./navbar";
import Footer from "./footer";

const Pedido = () => {
  const [pedidos, setPedido] = useState([]);
  const [total, setTotal] = useState(0);
  const [producto, setProducto] = useState([]);
  const [detallePedido, setDetallePedido] = useState([]);
  const [pedidoEdit, setPedidoEdit] = useState({
    codigo: "",
    cliente_nombre: "",
    vendedor_nombre: "",
    detalle: "",
    total: 0,
    estado: "",
  });

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

  useEffect(() => {
    const clienteId = localStorage.getItem("usuario");
    // Realizar la solicitud AJAX con jQuery
    $.ajax({
      url: "http://127.0.0.1:8000/api/pedido",
      method: "GET",
      dataType: "json",
      success: (data) => {
        const pedidosCliente = data.pedidos.filter(
          (pedido) => pedido.cliente === parseInt(clienteId)
        );
        setPedido(pedidosCliente); // Guardar los pedidos filtrados en el estado
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error("Error al cargar las imágenes:", textStatus, errorThrown);
      },
    });
  }, []);

  const handleEditClick = (e) => {
    // Al hacer clic en el botón de editar, cargamos los datos del pedido seleccionado en el formulario del modal
    $.ajax({
      url: `http://127.0.0.1:8000/api/pedido/${e.codigo}`,
      method: "GET",
      dataType: "json",
      success: (data) => {
        setPedidoEdit(data.pedido); // Guardar las rutas de imágenes en el estado

        // Verificamos si existe la propiedad detalle y actualizamos el estado
        if (data.pedido.detalle) {
          // Convertimos el string JSON en un objeto
          const detalleObjeto = JSON.parse(data.pedido.detalle);
          const detallesConProducto = detalleObjeto.map((e) => {
            const productoEncontrado = producto.find(
              (f) => f.id === e.id_producto
            );
            return {
              ...e, // Incluye todos los datos del detalle
              producto: productoEncontrado || {}, // Agrega los datos del producto correspondiente
            };
          });
          setDetallePedido(detallesConProducto); // Cargamos los detalles en el estado detallePedido
        }

        // Calculamos el total de todos los detalles
        const totalDetalles = detallePedido.reduce(
          (sum, item) => sum + parseFloat(item.total),
          0
        );
        setTotal(totalDetalles); // Actualizamos el total en el estado
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error("Error al cargar las imágenes:", textStatus, errorThrown);
      },
    });
  };

  const formatoFechaManual = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const horas = fecha.getHours().toString().padStart(2, "0");
    const minutos = fecha.getMinutes().toString().padStart(2, "0");
    const segundos = fecha.getSeconds().toString().padStart(2, "0");
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = fecha.toLocaleString("es-ES", { month: "long" });
    const anio = fecha.getFullYear();

    return `${horas}:${minutos}:${segundos} ${dia} ${mes} ${anio}`;
  };

  return (
    <>
      <Navbar />
      <div className="mt-5 px-5 mb-3">
        <h1 className="text-morado fw-pacifico text-center w-100">
          Lista de mis pedidos
        </h1>
      </div>
      <div className="container-fluid px-0 px-lg-5">
        <div className="row">
          {pedidos.map((e) => (
            <>
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-3">
                <div className="card rounded-5 pt-3 h-100">
                  <div className="text-center">
                    <h3>
                      <b>Codigo: </b>
                      {e.codigo}
                    </h3>
                    <h5>
                      <b>Fecha: </b>
                      {formatoFechaManual(e.created_at)}
                    </h5>
                    <h5>
                      <b>Cliente: </b>
                      {e.cliente_nombre}
                    </h5>
                    <h5>
                      <b>Vendedor: </b>
                      {e.vendedor_nombre}
                    </h5>
                    <h4
                      className={`${
                        e.estado === "Pendiente" ? "text-danger" : ""
                      }`}
                    >
                      <b>Estado: </b>
                      {e.estado}
                    </h4>
                    <h4>
                      <b>Total: </b>Bs. {e.total}
                    </h4>
                    {e.created_at != e.updated_at && (
                      <h5>
                        <b>Completado: </b>
                        {formatoFechaManual(e.updated_at)}
                      </h5>
                    )}
                  </div>
                  <button
                    className="btn btn-primary mx-3 mb-3"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#detalle"
                    onClick={() => handleEditClick(e)}
                  >
                    <b>Detalle</b>
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div
        className="modal fade"
        id="detalle"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="detalleLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="detalleLabel">
                Detalle
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="control-group mb-3">
                <h3>
                  <b>Codigo: </b>
                  {pedidoEdit.codigo}
                </h3>
              </div>
              <div className="form-row mb-1">
                <div className="col-sm-6 control-group">
                  <h5>
                    <b>Cliente: </b>
                    {pedidoEdit.cliente_nombre}
                  </h5>
                </div>
                <div className="col-sm-6 control-group">
                  <h5>
                    <b>Estado: </b>
                    {pedidoEdit.estado}
                  </h5>
                </div>
                <h5>
                  <b>Total del pedido: </b>
                  Bs. {pedidoEdit.total}
                </h5>
              </div>
              <div className="control-group mb-2">
                <p>
                  <h3>Lista</h3>
                </p>

                <div className="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr className="bd-plum">
                        <th scope="col">Producto</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Precio Unitario</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detallePedido.map((detalle, index) => (
                        <tr key={index}>
                          <td>
                            {detalle.cantidad} x {detalle.nombre}
                          </td>
                          <td className="p-0">
                            <img
                              src={detalle.producto.foto}
                              alt=""
                              className="rounded"
                              height={"80px"}
                            />
                          </td>
                          <td>Bs. {detalle.precio_unitario}</td>
                          <td>Bs. {detalle.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pedido;
