/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

//components

//Services
import * as cursoServices from "../../../services/CursosServices";
import * as profesoresServices from "../../../services/ProfesoresServices";
import * as comprobanteServices from "../../../services/ComprobanteServices";

//Imagenes
// import fotoSinCurso from '../../images/sinCurso.png';

//Interfaces
import { Curso } from "../../../interfaces/Curso";
import { Usuario } from "../../../interfaces/Usuario";

//Icons
import { GiTeacher } from "react-icons/gi";
import { CgMail } from "react-icons/cg";
import { FaDollarSign, FaCalendarAlt, FaCheck, FaTimes, FaRegImage, FaPhoneAlt } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

const initialState: Curso = {
  nombre_curso: "",
  uri_carpeta_vimeo:"",
  descripcion: "",
  precio: 0,
  duracion: 0,
  horario: "",
  enlace: "",
  id_usuario: 0,
  url_foto_curso: "",
};
const initialStateProfesor: Usuario = {
  nombre: "",
  apellido: "",
  correo: "",
  profesion: "",
  id_pais_nacimiento: "AF",
  id_pais_residencia: "AF",
  rut: "",
  telefono: "",
};
interface Params {
  idCurso: string;
  modalidad: string;
  tipo: string;
}
const VerCurso: React.FC = () => {
  const params = useParams<Params>();

  const history = useHistory();

  const modalidades = ["Sincronicos", "Asincronicos", "Talleres", "Cursos"];

  const [tipo, setTipo] = useState<string>("");
  const [modalidad, setModalidad] = useState<string>("");

  const [curso, setCurso] = useState<Curso>(initialState);
  const [profesor, setProfesor] = useState<Usuario>(initialStateProfesor);
  const [estudiantes, setEstudiantes] = useState<Usuario[]>([]);
  const [inscritos, setInscritos] = useState<number>(0);

  const refDescripcion = useRef<HTMLParagraphElement | null>();

  useEffect(() => {
    if (!modalidades.includes(params.modalidad) || !modalidades.includes(params.tipo)) return history.push("/Dashboard"); //Validando ruta
    params.modalidad === "Asincronicos" ? setModalidad("Asincrónico") : setModalidad("Sincrónico");
    params.tipo === "Talleres" ? setTipo("Taller") : setTipo("Curso");
    cargarCurso();
    return () => {
      setCurso(initialState);
      setProfesor(initialStateProfesor);
      setEstudiantes([]);
    };
  }, []);

  const cargarCurso = async () => {
    const res = await cursoServices.getCursoById(params.idCurso);
    if (res.data.error) return history.push("/Dashboard");

    // if (params.modalidad === "Sincronicos") {
    const resCount = await comprobanteServices.getCountUsuarioCursoByCursoId(params.idCurso);
    setInscritos(resCount.data);
    // }

    const newDescripcion = res.data.curso.descripcion.replace(/\n/g, "<br/>");
    res.data.curso.descripcion = newDescripcion;
    if (refDescripcion.current) refDescripcion.current.innerHTML = res.data.curso.descripcion;

    setCurso(res.data.curso);

    const resProfesor = await profesoresServices.getProfesorById(res.data.curso.id_usuario);
    if (res.data.error) return;
    setProfesor(resProfesor.data.profesor);

    const resEstudiante = await comprobanteServices.getUsuarioCursoByIdCurso(res.data.curso.id_curso);
    if (resEstudiante.data.error) return;
    setEstudiantes(resEstudiante.data.usuariosCursos);
  };

  return (
    <>
      <div className="content-wrapper" style={{ minHeight: 643 }}>
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 efecto_titulo">
                  <i className="nav-icon fas fa-book me-3" />
                  {tipo} {modalidad} {curso.nombre_curso}
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
                  <li className="breadcrumb-item">
                    <Link className="link-normal" to={`/Dashboard/${params.tipo}/${params.modalidad}`}>
                      {params.tipo} {params.modalidad}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active text-truncate">{curso.nombre_curso.length > 15 ? <>{curso.nombre_curso.substring(0, 28) + "..."}</> : <>{curso.nombre_curso}</>}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row mt-4">
              <div className="col-12 col-sm-6 text-center">
                <img src={curso.url_foto_curso} className="img-fluid" alt="" />
              </div>
              <div className="col-12 col-sm-6">
                <div className="d-flex align-items-center mb-3">
                  <p className="m-0 card-text fw-bold">
                    <GiTeacher className="mb-1" /> Docente:
                  </p>
                  <p className="m-0 ps-2 fw-normal">
                    {profesor.nombre} {profesor.apellido}
                  </p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <p className="m-0 card-text fw-bold">
                    <FaDollarSign className="mb-1" /> Precio:
                  </p>
                  <p className="m-0 ps-2 fw-normal">{curso.precio}</p>
                </div>
                {params.modalidad === "Sincronicos" ? (
                  <>
                    <div className="d-flex align-items-center mb-3">
                      <p className="m-0 card-text fw-bold">Enlace: </p>
                      <a href={curso.enlace} className="m-0 ps-3 fw-normal w-50" target="_BLANK" rel="noreferrer">
                        <p className="m-0 text-truncate w-100">{curso.enlace}</p>
                      </a>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <p className="m-0 card-text fw-bold">Capacidad: </p>
                      <p className="m-0 ps-2 fw-normal">{curso.capacidad} estudiantes</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <p className="m-0 card-text fw-bold">Cantidad de estudiantes inscritos: </p>
                      <p className="m-0 ps-2 fw-normal">{inscritos} estudiantes</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <p className="m-0 card-text fw-bold">
                        <FiClock className="mb-1" /> Duración:
                      </p>
                      <p className="m-0 ps-2 fw-normal">{curso.duracion} horas</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <p className="m-0 card-text fw-bold">
                        <FaCalendarAlt className="mb-1" /> Horario:
                      </p>
                      <p className="m-0 ps-2 fw-normal">{new Date(curso.horario).toLocaleString()}</p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <p className="card-text">Habilitado : {curso.habilitado === 1 ? <FaCheck className="text-success mb-1 ms-1" /> : <FaTimes className="text-danger mb-1 ms-1" />}</p>
              </div>
              <div className="col-12 col-sm-12 mt-3">
                <p className="m-0 card-text fw-bold text-uppercase">Descripción: </p>
                <p ref={(node) => (refDescripcion.current = node)} style={{ textAlign: "justify" }}></p>
              </div>

              <div className="col-12 col-sm-12 mt-3">
                <p className="m-0 card-text fw-bold text-uppercase">Lista de Estudiantes Inscritos: </p>
                <div className="table-responsive">
                  <table className="table table-light-gray table-bordered table-hover mt-3">
                    <thead>
                      <tr>
                        <th>
                          <FaRegImage /> Foto
                        </th>
                        <th>Nombre del Estudiante</th>
                        <th>
                          <CgMail /> Correo Electrónico
                        </th>
                        <th>
                          <FaPhoneAlt /> Número de Teléfono
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {estudiantes.length === 0 ? (
                        <>
                          <tr>
                            <td>No hay estudiantes inscritos aún</td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </>
                      ) : (
                        <>
                          {estudiantes.map((estudiante) => {
                            return (
                              <tr key={estudiante.id_usuario}>
                                <td style={{ width: "100px", height: "100%" }}>
                                  <img alt="Foto Perfil" className="img-fluid" src={estudiante.url_foto_usuario} />
                                </td>
                                <td className="py-auto">
                                  {estudiante.nombre} {estudiante.apellido}
                                </td>
                                <td className="py-auto">{estudiante.correo}</td>
                                <td className="py-auto">{estudiante.telefono}</td>
                              </tr>
                            );
                          })}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default VerCurso;
