/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import { useState } from "react";

//Iconos

//Toastify
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

//Foto prueba
// import fotoPrueba from '../../images/pc-2.jpg';

//Services
import * as comprobanteServices from "../../../services/ComprobanteServices";
import * as cursoServices from "../../../services/CursosServices";
import * as usuarioServices from "../../../services/EstudianteService";

import ListaComprobante from "./ListaComprobante";

//Interfaces
import { Comprobante } from "../../../interfaces/Comprobante";
import { Curso } from "../../../interfaces/Curso";
import { Usuario } from "../../../interfaces/Usuario";
import { FaEdit, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const initialStateComprobante: Comprobante = {
  fecha_enviado: "",
  estado: "",
  id_curso: "",
  id_usuario: "",
  url_foto_comprobante: "",
};

const initialStateCurso: Curso = {
  descripcion: "",
  enlace: "",
  horario: "",
  nombre_curso: "",
  precio: 0,
  url_foto_curso: "",
};

const Comprobantes: React.FC = () => {
  const [comprobantesNuevos, setComprobantesNuevos] = useState<Comprobante[]>([]);
  const [comprobantesAceptados, setComprobantesAceptados] = useState<Comprobante[]>([]);
  const [comprobantesRechazados, setComprobantesRechazados] = useState<Comprobante[]>([]);

  const [comprobante, setComprobante] = useState<Comprobante>(initialStateComprobante);
  const [estudiante, setEstudiante] = useState<Usuario>({});
  const [curso, setCurso] = useState<Curso>(initialStateCurso);

  const [triggerComprobante, setTriggerComprobante] = useState<number>(0);

  const [pageNuevos, setPageNuevos] = useState<number>(1);
  const [pageAceptados, setPageAceptados] = useState<number>(1);
  const [pageRechazados, setPageRechazados] = useState<number>(1);

  const refBtnClose = useRef<HTMLButtonElement | null>();

  // Nuevos
  useEffect(() => {
    getNuevosComprobantes();
    return () => {
      setComprobantesNuevos([]);
      setEstudiante({});
      setComprobante(initialStateComprobante);
      setCurso(initialStateCurso);
    };
  }, [triggerComprobante, pageNuevos]);

  //Aceptados
  useEffect(() => {
    getAceptadosComprobantes();
    return () => {
      setComprobantesAceptados([]);
      setEstudiante({});
      setComprobante(initialStateComprobante);
      setCurso(initialStateCurso);
    };
  }, [triggerComprobante, pageAceptados]);

  //Rechazados
  useEffect(() => {
    getRechazadosComprobantes();
    return () => {
      setComprobantesRechazados([]);
      setEstudiante({});
      setComprobante(initialStateComprobante);
      setCurso(initialStateCurso);
    };
  }, [triggerComprobante, pageRechazados]);

  const getNuevosComprobantes = async () => {
    const res = await comprobanteServices.getComprobantes("NoVisto", pageNuevos);
    if (res.data.error) return;
    setComprobantesNuevos(res.data.comprobantes);
  };
  const getAceptadosComprobantes = async () => {
    const res = await comprobanteServices.getComprobantes("Aceptado", pageAceptados);
    if (res.data.error) return;
    setComprobantesAceptados(res.data.comprobantes);
  };
  const getRechazadosComprobantes = async () => {
    const res = await comprobanteServices.getComprobantes("Rechazado", pageRechazados);
    if (res.data.error) return;
    setComprobantesRechazados(res.data.comprobantes);
  };

  const cambiarDatosModal = async (id_comprobante?: number) => {
    const res = await comprobanteServices.getComprobanteById(id_comprobante);
    console.log(res);
    if (res.data.error) return;
    setComprobante(res.data.comprobante);

    const resCurso = await cursoServices.getCursoById(res.data.comprobante.id_curso);
    if (resCurso.data.error) return;
    setCurso(resCurso.data.curso);

    const resUsuario = await usuarioServices.getEstudianteById(res.data.comprobante.id_usuario);
    if (resUsuario.data.error) return;
    setEstudiante(resUsuario.data.estudiante);
  };

  const inscribirCurso = async () => {
    if (comprobante.id_curso === "") return toast.warning("No ha seleccionado un comprobante");
    const res = await comprobanteServices.crearInscripcion(comprobante);
    if (res.data.error) return toast.error(res.data.error);

    setComprobante(initialStateComprobante);
    setTriggerComprobante(triggerComprobante + 1);
    if (refBtnClose.current) refBtnClose.current.click();
    return toast.success(res.data.success);
  };

  const rechazarComprobante = async () => {
    const res = await comprobanteServices.actualizarComprobante(comprobante.id_comprobante + "", comprobante);
    if (res.data.error) return toast.error(res.data.error);

    setComprobante(initialStateComprobante);
    setTriggerComprobante(triggerComprobante + 1);
    if (refBtnClose.current) refBtnClose.current.click();
    return toast.success(res.data.success);
  };

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
                  <i className="nav-icon fas fa-file me-3" />
                  Comprobantes
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
                  <li className="breadcrumb-item active">Comprobantes</li>
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
              <div className="col-lg-3 col-md-3 ms-auto"></div>
            </div>
            <div className="row mt-5">
              <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-noVistos" type="button" role="tab" aria-controls="pills-noVistos" aria-selected="true">
                    Nuevos
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-aceptados" type="button" role="tab" aria-controls="pills-aceptados" aria-selected="false">
                    Aceptados
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-rechazados" type="button" role="tab" aria-controls="pills-rechazados" aria-selected="false">
                    Rechazados
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-noVistos" role="tabpanel" aria-labelledby="pills-noVistos-tab">
                  <ListaComprobante estado="NoVisto" setPage={setPageNuevos} page={pageNuevos} comprobantes={comprobantesNuevos} cambiarDatosModal={cambiarDatosModal} />
                </div>
                <div className="tab-pane fade" id="pills-aceptados" role="tabpanel" aria-labelledby="pills-aceptados-tab">
                  <ListaComprobante estado="Aceptado" setPage={setPageAceptados} page={pageAceptados} comprobantes={comprobantesAceptados} cambiarDatosModal={cambiarDatosModal} />
                </div>
                <div className="tab-pane fade" id="pills-rechazados" role="tabpanel" aria-labelledby="pills-rechazados-tab">
                  <ListaComprobante estado="Rechazado" setPage={setPageRechazados} page={pageRechazados} comprobantes={comprobantesRechazados} cambiarDatosModal={cambiarDatosModal} />
                </div>
              </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header btn__blue">
                    <h5 className="modal-title" id="exampleModalLabel">
                      {curso?.tipo} {curso?.modalidad} {curso?.nombre_curso}
                    </h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-6">
                          <img src={comprobante.url_foto_comprobante} className="w-100" alt="..." />
                          <p>
                            <span className="text-uppercase fw-bold">Fecha Enviado: </span>
                            {comprobante?.fecha_enviado}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="w-100">
                              <p className="fw-bold text-uppercase">Datos del Curso:</p>
                              <p>
                                Nombre del {curso.tipo}: <span className="ms-2"> {curso?.nombre_curso}</span>
                              </p>
                              <p>
                                Precio del {curso.tipo}: <span className="ms-2"> $ {curso?.precio}</span>
                              </p>
                              <p className="fw-bold text-uppercase">Datos del Estudiante:</p>
                              <p>
                                Nombre del Estudiante:{" "}
                                <span className="ms-2">
                                  {estudiante?.nombre} {estudiante?.apellido}
                                </span>
                              </p>
                              <p>
                                Correo: <span className="ms-2"> {estudiante?.correo}</span>
                              </p>
                              <p>
                                Pais de Nacimiento: <span className="ms-2"> {estudiante?.nombre_pais_nacimiento}</span>
                              </p>
                              <p>
                                Pais de Residencia: <span className="ms-2"> {estudiante?.nombre_pais_residencia}</span>
                              </p>
                              <p>
                                Telefono: <span className="ms-2"> {estudiante?.telefono}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" ref={(node) => (refBtnClose.current = node)} className="btn btn-secondary" data-bs-dismiss="modal">
                      Cerrar
                    </button>
                    {/* <button onClick={() => eliminarComprobante()} type="button" className="btn btn-danger"><FaTrashAlt className="mb-1" /> Eliminar Comprobante</button> */}
                    {comprobante.estado === "NoVisto" ? (
                      <>
                        <button onClick={() => inscribirCurso()} type="button" className="btn btn__verde">
                          <FaEdit className="mb-1" /> Inscribir al {curso?.tipo}
                        </button>
                        <button onClick={() => rechazarComprobante()} type="button" className="btn btn-danger">
                          <FaTimes className="mb-1" /> Rechazar Comprobante
                        </button>
                      </>
                    ) : (
                      <>
                        {comprobante.estado === "Rechazado" ? (
                          <>
                            <button onClick={() => inscribirCurso()} type="button" className="btn btn__verde">
                              <FaEdit className="mb-1" /> Inscribir al {curso?.tipo}
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => rechazarComprobante()} type="button" className="btn btn-danger">
                              <FaTimes className="mb-1" /> Rechazar Comprobante
                            </button>
                          </>
                        )}
                      </>
                    )}
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

export default Comprobantes;
