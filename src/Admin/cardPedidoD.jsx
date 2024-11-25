import React from "react";

const CardPedidoD = ({
  pedidoDelete,
  setPedidoDelete,
  handleSubmitDelete,
  detallePedido,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedidoDelete((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPedidoDelete((prev) => ({ ...prev, foto: e.target.files[0] }));
  };

  return (
    <div
      className="modal fade"
      id="deleteModal"
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
              Eliminar
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
                {pedidoDelete.codigo}
              </h3>
            </div>
            <div className="form-row mb-3">
              <div className="col-sm-6 control-group">
                <h5>
                  <b>Cliente: </b>
                  {pedidoDelete.cliente_nombre}
                </h5>
              </div>
              <div className="col-sm-6 control-group">
                <h5>
                  <b>Vendedor: </b>
                  {pedidoDelete.vendedor_nombre}
                </h5>
              </div>
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
              onClick={handleSubmitDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardPedidoD;
