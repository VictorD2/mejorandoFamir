/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Components
import ListaProfesores from "./ListaProfesores";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Usuario } from "../../../interfaces/Usuario";
import { FaCheck, FaTimes } from "react-icons/fa";

//Components
import Buscador from "../../../components/Buscador";

//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css/animate.min.css";

const Profesores:React.FC = () => {
  const history = useHistory();

  const [profesor, setProfesor] = useState<Usuario>({});
  const [filtro, setFiltro] = useState<string>("");

  //Redireccionamiento del boton crear profesor
  const createUser = () => history.push("/DashBoard/Profesores/nuevo");

  const handleModalChange = (profesor: Usuario) => setProfesor(profesor);

  const buscar = (text: string) => setFiltro(text);

  return (
    <>
      <ToastContainer />
      <div className="content-wrapper" style={{ minHeight: 643 }}>
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 efecto_titulo">
                  <i className="nav-icon fas fa-book-reader me-3" />
                  Profesores
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link className="link-normal" to="/">
                      Inicio
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link className="link-normal" to="/Dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Profesores</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* /.content-header */}

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <button onClick={createUser} className="btn btn__blue mx-4 my-2">
                  <FontAwesomeIcon className="me-2" icon={faPlus} />
                  Agrega un profesor
                </button>
              </div>
              <div className="col-lg-3 col-md-3 ms-auto">
                <Buscador placeholder={`Buscar profesor`} funcion={buscar} />
              </div>
            </div>
            <div className="row mt-5">
              <ListaProfesores filtro={filtro} funcion={handleModalChange} />
            </div>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header btn__blue">
                    <h5 className="modal-title" id="exampleModalLabel">
                      {profesor.nombre} {profesor.apellido}
                    </h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img src={profesor.url_foto_usuario} className="w-100" alt="..." />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <p className="card-text">Profesión :{profesor.profesion}</p>
                            <p className="card-text">Correo : {profesor.correo}</p>
                            <p className="card-text">
                              Pais de nacimiento : {profesor.nombre_pais_nacimiento}
                              <img src={profesor.url_foto_nacimiento} className="img__pais register" alt={profesor.nombre_pais_residencia} />
                            </p>
                            <p className="card-text">
                              Pais de residencia : {profesor.nombre_pais_residencia}
                              <img src={profesor.url_foto_residencia} className="img__pais register" alt={profesor.nombre_pais_residencia} />
                            </p>
                            <p className="card-text">Telefono : {profesor.telefono}</p>
                            <p className="card-text">RUT : {profesor.rut}</p>
                            <p className="card-text">Habilitado : {profesor.habilitado_u === 1 ? <FaCheck className="text-success mb-1 ms-1" /> : <FaTimes className="text-danger mb-1 ms-1" />}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profesores;
