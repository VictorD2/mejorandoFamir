import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { API } from "../config/config";

//Imagenes
import logoLogin from "../images/Logo.svg";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

//Toastify
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useUsuario } from "../auth/UsuarioProvider";
import auth from "../auth/auth";

const Login: React.FC = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const history = useHistory();
  const { setUsuario } = useUsuario();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    return () => {};
  }, []);

  //Set state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //On submit login
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post(`${API}/signin`, state);
    if (res.data.success) {
      setUsuario(res.data.user);
      auth.setRango(res.data.user.id_rango);
      auth.sigIn();
      return history.push("/");
    }
    if (res.data.error) return toast.error(res.data.error);
  };

  return (
    <>
      <ToastContainer />
      <div className="rgt__main">
        <div className="card content__Login animate__animated animate__flipInY">
          <Link to="/" className="card-header rgt__header">
            <img className="rgt__img" src={logoLogin} alt="logo-register" />
            <h5 className="rgt__title">FAMIR CENTRO</h5>
          </Link>
          <div className="card-body px-4">
            <div className="row">
              <div className="col-12">
                <form onSubmit={handleForm}>
                  <div className="form-floating mb-3">
                    <input onChange={handleInputChange} type="email" name="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Correo</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleInputChange} type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Contraseña</label>
                  </div>
                  <div className="rgt__button">
                    <button type="submit" className="btn btn__more" style={{ padding: "0.7rem 2rem" }}>
                      Inicia sesión
                    </button>
                  </div>
                </form>
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <span className="line__login">
                    <span>O</span>
                  </span>
                </div>
              </div>
              <div className="col-12 mt-2">
                <a href="auth/google" className="btn btn-danger w-100 icon__social">
                  <FontAwesomeIcon icon={faGoogle} className="fs-3" />
                  <span className="ms-3">Iniciar sesión con Google</span>
                </a>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <div className="row">
              <div className="col-12 d-flex justify-content-center mb-3">
                <span style={{ color: "#000000" }}>¿Aún no tienes cuenta en FAMIR CENTRO?</span>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center mb-3">
              <Link to="/Registrarse" className="btn btn-outline-success w-75">
                Regístrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
