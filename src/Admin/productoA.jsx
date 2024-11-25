import React, { useEffect, useState } from "react";
import $ from "jquery";
import Navbar from "../Components/navbar";
import Header from "../Components/header";
import Footer from "../Components/footer";
import BackTop from "../Components/backTop";
import CardProductoE from "./cardProductoE";
import CardProductoN from "./cardProductoN";
import CardProductoD from "./cardProductoD";

const ProductoA = () => {
  const [producto, setProducto] = useState([]);
  const [productoEdit, setProductoEdit] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    foto: "",
    categoria: "",
    estado: false,
  });
  const [productoNuevo, setProductoNuevo] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    foto: "",
    categoria: "",
    estado: true,
  });
  const [productoDelete, setProductoDelete] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    foto: "",
    categoria: "",
    estado: false,
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

  const handleNuevoClick = () => {
    // Cuando se hace clic en editar, se llena el formulario con los datos del producto
    setProductoNuevo({
      id: "",
      nombre: "",
      descripcion: "",
      precio: "",
      foto: "",
      categoria: "",
      estado: true,
    });
  };

  const handleEditClick = (e) => {
    // Al hacer clic en el botón de editar, cargamos los datos del producto seleccionado en el formulario del modal
    $.ajax({
      url: `http://127.0.0.1:8000/api/producto/${e.id}`,
      method: "GET",
      dataType: "json",
      success: (data) => {
        setProductoEdit(data); // Guardar las rutas de imágenes en el estado
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error("Error al cargar las imágenes:", textStatus, errorThrown);
      },
    });
  };

  const handleDeleteClick = (e) => {
    // Al hacer clic en el botón de editar, cargamos los datos del producto seleccionado en el formulario del modal
    $.ajax({
      url: `http://127.0.0.1:8000/api/producto/${e.id}`,
      method: "GET",
      dataType: "json",
      success: (data) => {
        setProductoDelete(data); // Guardar las rutas de imágenes en el estado
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error("Error al cargar las imágenes:", textStatus, errorThrown);
      },
    });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("nombre", productoEdit.nombre);
    formData.append("descripcion", productoEdit.descripcion);
    formData.append("precio", productoEdit.precio);
    if (
      productoEdit.foto instanceof File ||
      productoEdit.foto instanceof Blob
    ) {
      formData.append("foto", productoEdit.foto);
    }
    formData.append("categoria", productoEdit.categoria);
    formData.append("estado", productoEdit.estado ? 1 : 0);

    fetch(`http://127.0.0.1:8000/api/producto/${productoEdit.id}`, {
      method: "POST", // Cambiar a PUT si estás actualizando un producto
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        productoEdit.foto = data.producto.foto;
        // Actualiza la lista de productos en el estado
        setProducto((prevProductos) =>
          prevProductos.map((p) =>
            p.id === productoEdit.id ? { ...p, ...productoEdit } : p
          )
        );
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  };

  const handleSubmitNuevo = () => {
    const formData = new FormData();
    formData.append("nombre", productoNuevo.nombre);
    formData.append("descripcion", productoNuevo.descripcion);
    formData.append("precio", productoNuevo.precio);
    if (
      productoNuevo.foto instanceof File ||
      productoNuevo.foto instanceof Blob
    ) {
      formData.append("foto", productoNuevo.foto);
    }
    formData.append("categoria", productoNuevo.categoria);

    fetch(`http://127.0.0.1:8000/api/producto`, {
      method: "POST", // Cambiar a PUT si estás actualizando un producto
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        handleNuevoClick();
        const nuevoProducto = data.producto;
        nuevoProducto.estado = 1;
        setProducto((prevProductos) => [
          ...prevProductos,
          nuevoProducto, // Agregar el nuevo producto al final de la lista
        ]);
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  };
  const handleSubmitDelete = () => {
    const formData = new FormData();

    $.ajax({
      url: `http://127.0.0.1:8000/api/producto/${productoDelete.id}`,
      method: "DELETE",
      dataType: "json",
      success: (response) => {
        console.log(response.message);
        // Actualiza la lista de productos en el estado
        setProducto((prevProductos) =>
          prevProductos.filter((p) => p.id !== productoDelete.id)
        );
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error(
          "Error al actualizar el producto:",
          textStatus,
          errorThrown
        );
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-between mt-5 px-5 mb-3">
        <h1 className="text-morado fw-pacifico text-center w-100">
          Lista de productos
        </h1>
        <button
          className="btn btn-info p-0 rounded px-2"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#nuevo"
        >
          <i class="fs-5 bi bi-plus-lg"></i>
        </button>
      </div>
      <div className="container-fluid px-0 px-lg-5">
        <div className="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr className="bd-plum">
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Foto</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoria</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody>
              {producto.map((e) => (
                <>
                  <tr className={`${e.estado ? "" : "table-danger"}`}>
                    <th scope="row">{e.id}</th>
                    <td>{e.nombre}</td>
                    <td className="p-0 py-2">
                      <img
                        src={e.foto}
                        alt=""
                        className="rounded"
                        style={{ height: "100px" }}
                      />
                    </td>
                    <td>{e.descripcion}</td>
                    <td>{e.precio} bs</td>
                    <td>{e.categoria}</td>
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
                          data-bs-target="#delete"
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
      <CardProductoN
        productoNuevo={productoNuevo}
        setProductoNuevo={setProductoNuevo}
        handleSubmitNuevo={handleSubmitNuevo}
      />
      <CardProductoE
        productoEdit={productoEdit}
        setProductoEdit={setProductoEdit}
        handleSubmit={handleSubmit}
      />
      <CardProductoD
        productoDelete={productoDelete}
        setProductoDelete={setProductoDelete}
        handleSubmitDelete={handleSubmitDelete}
      />
      <Footer />
      <BackTop />
    </>
  );
};

export default ProductoA;
