import React, { useEffect, useState } from "react";
import $ from "jquery";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import CardPedidoD from "./cardPedidoD";
import CardPedidoE from "./cardPedifoE";

const PedidoA = () => {
  const [pedidos, setPedido] = useState([]);
  const [total, setTotal] = useState(0);
  const [producto, setProducto] = useState([]);
  const [detallePedido, setDetallePedido] = useState([]);
  const [pedidoDelete, setPedidoDelete] = useState({
    codigo: "",
    cliente_nombre: "",
    vendedor_nombre: "",
    detalle: "",
    total: 0,
    estado: "",
  });
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
    // Realizar la solicitud AJAX con jQuery
    $.ajax({
      url: "http://127.0.0.1:8000/api/pedido",
      method: "GET",
      dataType: "json",
      success: (data) => {
        setPedido(data.pedidos); // Guardar las rutas de imágenes en el estado
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

  const handleDeleteClick = (pedido) => {
    // Carga los datos del pedido en el estado para mostrarlos en el modal
    $.ajax({
      url: `http://127.0.0.1:8000/api/pedido/${pedido.codigo}`, // Ajusta el endpoint si es necesario
      method: "GET",
      dataType: "json",
      success: (data) => {
        setPedidoDelete(data.pedido); // Guardar la información del pedido seleccionado
        console.log(pedidoDelete);
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
        console.error("Error al cargar el pedido:", textStatus, errorThrown);
      },
    });
  };

  const handleSubmitDelete = () => {
    $.ajax({
      url: `http://127.0.0.1:8000/api/pedido/${pedidoDelete.codigo}`, // Endpoint para eliminar
      method: "DELETE",
      dataType: "json",
      success: (response) => {
        console.log("Pedido eliminado:", response.message);

        // Actualizar la lista de pedidos eliminando el pedido borrado
        setPedido((prevPedidos) =>
          prevPedidos.filter((pedido) => pedido.codigo !== pedidoDelete.codigo)
        );

        // Cerrar el modal manualmente
        document.querySelector("#deleteModal .btn-close").click();
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error("Error al eliminar el pedido:", textStatus, errorThrown);
      },
    });
  };

  const handleSubmit = () => {
    // Obtener el usuario del localStorage para el vendedor
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      console.error("No se encontró el usuario en el localStorage.");
      return;
    }

    // Datos que se obtendrán del estado del pedido cargado
    const datosPedido = {
      vendedor: usuario, // ID del usuario como vendedor
      pago: pedidoEdit.pago, // Campo "pago" del pedido (puede venir del formulario de edición)
      estado: pedidoEdit.estado, // Estado actualizado del pedido
    };

    // Llamar al servidor para actualizar el pedido
    $.ajax({
      url: `http://127.0.0.1:8000/api/pedido/${pedidoEdit.codigo}`,
      method: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(datosPedido),
      success: (response) => {
        console.log("Pedido actualizado exitosamente:", response);
        setPedido((prevPedidos) =>
          prevPedidos.map((p) =>
            p.codigo === pedidoEdit.codigo ? { ...p, ...pedidoEdit } : p
          )
        );
        // Opcional: cierra el modal automáticamente
        document.querySelector("#detalle .btn-close").click();
        $.ajax({
          url: "http://127.0.0.1:8000/api/pedido",
          method: "GET",
          dataType: "json",
          success: (data) => {
            setPedido(data.pedidos); // Guardar las rutas de imágenes en el estado
          },
          error: (jqXHR, textStatus, errorThrown) => {
            console.error(
              "Error al cargar las imágenes:",
              textStatus,
              errorThrown
            );
          },
        });
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error(
          "Error al actualizar el pedido:",
          textStatus,
          errorThrown
        );
        alert("Error al actualizar el pedido.");
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
          Lista de pedidos
        </h1>
      </div>
      <div className="container-fluid px-0 px-lg-5">
        <div className="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr className="bd-plum">
                <th scope="col">Codigo</th>
                <th scope="col">Cliente</th>
                <th scope="col">Vendedor</th>
                <th scope="col">Fecha de Pedido</th>
                <th scope="col">Ultima modificación</th>
                <th scope="col">Total</th>
                <th scope="col">Estado</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((e) => (
                <>
                  <tr
                    className={`${
                      e.estado == "Pendiente" ? "table-danger" : ""
                    }`}
                  >
                    <th scope="row">{e.codigo}</th>
                    <td>{e.cliente_nombre}</td>
                    <td>{e.vendedor_nombre}</td>
                    <td>{formatoFechaManual(e.created_at)}</td>
                    <td>{formatoFechaManual(e.updated_at)}</td>
                    <td>Bs. {e.total}</td>
                    <td>{e.estado}</td>
                    <td>
                      <div className="btn-group w-100">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#detalle"
                          onClick={() => handleEditClick(e)}
                        >
                          <i class="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-morado"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
                          onClick={() => handleDeleteClick(e)}
                        >
                          <i class="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CardPedidoE
        pedidoEdit={pedidoEdit}
        setPedidoEdit={setPedidoEdit}
        handleSubmit={handleSubmit}
        detallePedido={detallePedido}
      />
      <CardPedidoD
        pedidoDelete={pedidoDelete}
        setPedidoDelete={setPedidoDelete}
        handleSubmitDelete={handleSubmitDelete}
        detallePedido={detallePedido}
      />
      <Footer />
    </>
  );
};

export default PedidoA;
