import React from "react";

const CardProductoD = ({
  productoDelete,
  setProductoDelete,
  handleSubmitDelete,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoDelete((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProductoDelete((prev) => ({ ...prev, foto: e.target.files[0] }));
  };

  return (
    <div
      className="modal fade"
      id="delete"
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
                <b>Nombre: </b>
                {productoDelete.nombre}
              </h3>
            </div>
            <div className="form-row mb-3">
              <div className="col-sm-6 control-group">
                <h5>
                  <b>Precio: </b>
                  {productoDelete.precio} bs
                </h5>
              </div>
              <div className="col-sm-6 control-group">
                <h5>
                  <b>Categoria: </b>
                  {productoDelete.categoria}
                </h5>
              </div>
            </div>
            <div className="control-group mb-3">
              <p><b>Descripción: </b>{productoDelete.descripcion}</p>
            </div>
            <div className="form-group">
              <img src={productoDelete.foto} alt="" className="w-100" />
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
export default CardProductoD;
