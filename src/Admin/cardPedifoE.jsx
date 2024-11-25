import React from "react";

const CardPedidoE = ({
  pedidoEdit,
  setPedidoEdit,
  handleSubmit,
  detallePedido,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedidoEdit((prev) => ({ ...prev, [name]: value }));
  };

  return (
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
              Editar
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-row mb-3">
              <div className="col-sm-6 control-group">
                <select
                  className="form-control"
                  name="pago"
                  value={pedidoEdit.pago}
                  onChange={handleChange}
                >
                  <option value={""} selected>
                    No ingresado
                  </option>
                  <option value={"Qr"}>Qr</option>
                  <option value={"Efectivo"}>Efectivo</option>
                  {/* Agregar más opciones de categorías aquí */}
                </select>
              </div>
              <div className="col-sm-6 control-group">
                <select
                  className="form-control"
                  name="estado"
                  value={pedidoEdit.estado}
                  onChange={handleChange}
                >
                  <option value={"Pendiente"} selected>
                    Pendiente
                  </option>
                  <option value={"Completado"}>Completado</option>
                  {/* Agregar más opciones de categorías aquí */}
                </select>
              </div>
              <div className="control-group mb-2 w-100">
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
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardPedidoE;
