import React from "react";

const CardProductoE = ({ productoEdit, setProductoEdit, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProductoEdit((prev) => ({ ...prev, foto: e.target.files[0] }));
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
            <div className="control-group mb-3">
              <input
                type="text"
                className="form-control p-3"
                placeholder="Nombre"
                name="nombre"
                value={productoEdit.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="form-row mb-3">
              <div className="col-sm-6 control-group">
                <input
                  type="text"
                  className="form-control p-3"
                  placeholder="Precio"
                  name="precio"
                  value={productoEdit.precio}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 control-group">
                <select
                  className="form-control"
                  name="categoria"
                  value={productoEdit.categoria}
                  onChange={handleChange}
                >
                  <option value={""} selected>
                    Categoria
                  </option>
                  <option value={"Helado"}>Helado</option>
                  {/* Agregar más opciones de categorías aquí */}
                </select>
              </div>
            </div>
            <div className="control-group mb-3">
              <textarea
                className="form-control p-3"
                rows="6"
                placeholder="Descripcion"
                name="descripcion"
                value={productoEdit.descripcion}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <input
                type="file"
                className="form-control-file border"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-check">
              <input
                id="defaultCheck1"
                className="form-check-input"
                type="checkbox"
                checked={productoEdit.estado} // Vincula el estado actual
                onChange={() => {
                  setProductoEdit((prev) => {
                    const nuevoEstado = !prev.estado; // Cambia el estado a su opuesto
                    console.log("Nuevo estado del checkbox:", nuevoEstado); // Muestra el estado en consola
                    return {
                      ...prev,
                      estado: nuevoEstado,
                    };
                  });
                }}
              />
              <label className="form-check-label" htmlFor="defaultCheck1">
                Activado
              </label>
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
export default CardProductoE;
