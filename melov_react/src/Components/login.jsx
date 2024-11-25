import React, { useEffect, useState } from "react";
import $ from "jquery";
import Cookies from "js-cookie";
import { actualizarCookieData } from "./navbar";

const Login = ({ setCookieData }) => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Función para verificar la cookie en intervalos regulares
    const checkCookie = () => {
      const userCookie = Cookies.get("usuario");
      setIsDisabled(!!userCookie); // Si la cookie existe, deshabilita los campos
    };

    // Verificar cookie inmediatamente
    checkCookie();

    // Verificar cookie cada 1 segundo
    const interval = setInterval(checkCookie, 1000);

    // Limpiar intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    const data = {
      usuario,
      password,
    };

    $.ajax({
      url: "http://127.0.0.1:8000/api/login",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: (response) => {
        console.log("Inicio de sesión exitoso", response);
        // Redirigir o manejar la respuesta aquí (por ejemplo, guardar un token de sesión)
        setAlerta(response);

        // Guardar el usuario en una cookie
        Cookies.set("usuario", JSON.stringify(response.user), { expires: 365 }); // Cookie válida por 1 año
        setIsDisabled(true); // Bloquear campos y botón al iniciar sesión exitosamente

        // Llamamos a actualizarCookieData para actualizar el estado del Navbar
        actualizarCookieData(setCookieData); // Ahora modificará cookieData en Navbar

        // Cerrar el modal manualmente
        setTimeout(() => {
          document.querySelector("#btnLogin .btn-close").click();
        }, 3000);
      },
      error: (xhr, status, error) => {
        console.error(error);
        console.error(status);
        console.error(xhr.responseJSON);
        setAlerta(xhr.responseJSON);
      },
    });
  };
  return (
    <>
      <div
        className="modal fade"
        id="btnLogin"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="btnLoginLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 fw-pacifico text-plum"
                id="btnLoginLabel"
              >
                Iniciar sesion
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
                placeholder="Usuario o Email"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                disabled={isDisabled} // Deshabilitar si isDisabled es true
              />
              <input
                type="password"
                className="form-control p-3"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isDisabled} // Deshabilitar si isDisabled es true
              />
            </div>
            {alerta.error && (
              <div className="text-danger px-3 mb-3">{alerta.error}</div>
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
                onClick={handleSubmit}
                disabled={isDisabled} // Deshabilitar si isDisabled es true
              >
                <b>Comprobar</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
