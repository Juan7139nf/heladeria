import React, { useState } from "react";
import $ from "jquery";
import Cookies from "js-cookie";
import { actualizarCookieData } from "./navbar";

const Register = ({ setCookieData }) => {
  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmitRegister = () => {
    const data = {
      usuario,
      nombre,
      apellido,
      email,
      password,
    };

    $.ajax({
      url: "http://127.0.0.1:8000/api/register", // La ruta para el registro
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: (response) => {
        console.log("Registro exitoso", response);
        setAlerta(response);

        // Llamamos a alguna acción post-registro si es necesario (por ejemplo, redirigir)
        
        // Guardar el usuario en una cookie
        Cookies.set("usuario", JSON.stringify(response.user), { expires: 365 }); // Cookie válida por 1 año
        setIsDisabled(true); // Bloquear campos y botón al iniciar sesión exitosamente

        // Llamamos a actualizarCookieData para actualizar el estado del Navbar
        actualizarCookieData(setCookieData); // Ahora modificará cookieData en Navbar

        // Cerrar el modal manualmente
        setTimeout(() => {
          document.querySelector("#btnRegister .btn-close").click();
        }, 3000);
      },
      error: (xhr, status, error) => {
        console.log(error);
        console.log(status);
        console.log(xhr.responseJSON);
        setAlerta(xhr.responseJSON);
      },
    });
  };

  return (
    <>
      <div
        className="modal fade"
        id="btnRegister"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="btnRegisterLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 fw-pacifico text-plum"
                id="btnRegisterLabel"
              >
                Registrar Usuario
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control p-3 mb-3"
                name="usuario"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                disabled={isDisabled}
              />
              <input
                type="text"
                className="form-control p-3 mb-3"
                name="nombre"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={isDisabled}
              />
              <input
                type="text"
                className="form-control p-3 mb-3"
                name="apellido"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                disabled={isDisabled}
              />
              <input
                type="email"
                className="form-control p-3 mb-3"
                name="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isDisabled}
              />
              <input
                type="password"
                className="form-control p-3 mb-3"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isDisabled}
              />
            </div>
            {alerta.error && (
              <div className="text-danger px-3 mb-3">Hubo un Error</div>
            )}
            {alerta.message && (
              <div className="text-success px-3 mb-3">{alerta.message}</div>
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary fw-quicksand"
                data-bs-dismiss="modal"
              >
                <b>Cancelar</b>
              </button>
              <button
                type="button"
                className="btn btn-primary fw-quicksand"
                onClick={handleSubmitRegister}
                disabled={isDisabled}
              >
                <b>Registrar</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
