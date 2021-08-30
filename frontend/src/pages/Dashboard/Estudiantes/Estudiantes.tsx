import React, { useState } from "react";

// Icons
import { FaCheck, FaTimes } from "react-icons/fa";

//Interfaces
import { Usuario } from "../../../interfaces/Usuario";

//Components
import ListaEstudiantes from "./ListaEstudiantes";
import Buscador from "../../../components/Buscador";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Usuarios: React.FC = () => {
  const [estudiante, setEstudiante] = useState<Usuario>({});
  const [filtro, setFiltro] = useState<string>("");

  const buscar = (text: string) => setFiltro(text);
  const handleModalChange = (estudiante: Usuario) => setEstudiante(estudiante);

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
                  <i className="nav-icon fas fa-user me-3" />
                  Estudiantes
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
                  <li className="breadcrumb-item active">Estudiantes</li>
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
              <div className="col-lg-4 col-md-6"></div>
              <div className="col-lg-3 col-md-3 ms-auto">
                <Buscador tooltip="Buscar por nombre, apellido o correo" placeholder={`Buscar estudiante`} funcion={buscar} />
              </div>
            </div>
            <div className="row mt-5">
              <div className="table-responsive">
                <ListaEstudiantes filtro={filtro} funcion={handleModalChange} />
              </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header btn__blue">
                    <h5 className="modal-title" id="exampleModalLabel">
                      {estudiante.nombre} {estudiante.apellido}
                    </h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img src={estudiante.url_foto_usuario} className="w-100" alt="..." />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <p className="card-text">Profesión: {estudiante.profesion}</p>
                            <p className="card-text">Correo : {estudiante.correo}</p>
                            <p className="card-text">
                              Pais nacimiento : 
                              <img src={estudiante.url_foto_nacimiento} className="img__pais register mx-3" alt={estudiante.nombre_pais_nacimiento} />
                              {estudiante.nombre_pais_nacimiento}
                           </p>
                            <p className="card-text">
                              Pais residencia :
                              <img src={estudiante.url_foto_residencia} className="img__pais register mx-3" alt={estudiante.nombre_pais_residencia} />
                              {estudiante.nombre_pais_residencia}
                            </p>
                            <p className="card-text">Telefono : {estudiante.telefono}</p>
                            <p className="card-text">RUT : {estudiante.rut}</p>
                            <p className="card-text">Habilitado : {estudiante.habilitado_u === 1 ? <FaCheck className="text-success mb-1 ms-1" /> : <FaTimes className="text-danger mb-1 ms-1" />}</p>
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

export default Usuarios;
