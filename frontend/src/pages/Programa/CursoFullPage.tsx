/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

//Componentes
import Modulos from "./Modulos";

//Iconos
import { GiTeacher, GiTwoCoins } from "react-icons/gi";
import { FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { GrShop } from "react-icons/gr";

//Imagenes

//Services
import * as cursoServices from "../../services/CursosServices";
import * as profesoresServices from "../../services/ProfesoresServices";

//Interfaces
import { Curso } from "../../interfaces/Curso";
import { Usuario } from "../../interfaces/Usuario";
import { Modulo } from "../../interfaces/Modulo";
import { FiClock } from "react-icons/fi";
import { AiOutlineLink } from "react-icons/ai";
import { useUsuario } from "../../auth/UsuarioProvider";

interface Params {
  idCurso: string;
}
const initialState: Curso = {
  uri_carpeta_vimeo: "",
  descripcion: "",
  enlace: "",
  nombre_curso: "",
  horario: "",
  precio: 0,
  url_foto_curso: "",
};
const CursoFullPage: React.FC = () => {
  const { usuario } = useUsuario();

  const params = useParams<Params>();

  const history = useHistory();

  const [curso, setCurso] = useState<Curso>(initialState);
  const [cargandoCurso, setCargandoCurso] = useState<boolean>(false);
  const [profesor, setProfesor] = useState<Usuario>({});
  const [modulos, setModulos] = useState<Modulo[]>([]);

  const [verificacionSub, setVerificacionSub] = useState<boolean>(false);

  const refDescripcion = useRef<HTMLParagraphElement | null>();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    getCursoById();
    return () => {
      setCurso(initialState);
      setProfesor({});
      setModulos([]);
    };
  }, [params.idCurso]);

  const getCursoById = async () => {
    const res = await cursoServices.getCursoById(params.idCurso);
    if (res.data.error) return history.push("/");

    const newDescripcion = res.data.curso.descripcion.replace(/\n/g, "<br/>");
    res.data.curso.descripcion = newDescripcion;

    const resProfesor = await profesoresServices.getProfesorById(res.data.curso.id_usuario);
    if (resProfesor.data.error) return;
    const resModulos = await cursoServices.getAllModulesByCursoId(params.idCurso);
    if (resModulos.data.error) return;

    
    setModulos(resModulos.data.modulos);
    setProfesor(resProfesor.data.profesor);
    
    const resV = await cursoServices.verificarSuscribcion(params.idCurso);
    setVerificacionSub(resV.data);
    if (!resV.data) delete res.data.curso.enlace;
    
    setCurso(res.data.curso);
    setCargandoCurso(true);
    if (refDescripcion.current) refDescripcion.current.innerHTML = res.data.curso.descripcion;
  };

  return (
    <>
      <div className="p-1 p-lg-5 mb-5" style={{ marginTop: "5rem", background: "#eef3f6" }}>
        <div className="row flex-lg-row">
          <div className="col-12 ps-3 ps-lg-5 col-sm-12 col-lg-5 col-md-12 mb-2 mb-lg-5 mt-sm-5 mt-lg-0">
            {cargandoCurso ? (
              <div className="my-auto d-lg-none d-flex">
                <img src={curso.url_foto_curso} className="img-fluid ancho-img" alt={`Curso`} />
              </div>
            ) : (
              <div className="cargandoDatos d-lg-none mb-2"></div>
            )}
            <div className="column-detail">
              {cargandoCurso ? (
                <>
                  <h3 className="fw-bold">
                    {curso.tipo} {curso.modalidad}
                  </h3>
                  <h3 className="fw-bold">{curso.nombre_curso}</h3>
                </>
              ) : (
                <div className="cargandoDatos mb-2" style={{ height: "100px" }}></div>
              )}
              {cargandoCurso ? (
                <div className="row mt-3 mt-lg-5">
                  <div className="d-flex align-items-center">
                    <GiTeacher className="me-2" />
                    <span>
                      Docente: {profesor.nombre} {profesor.apellido}
                    </span>
                  </div>
                  <div className="d-flex align-items-center mt-2">
                    {usuario.id_pais_residencia === "PE" ? (
                      <>
                        <GiTwoCoins className="me-2" />
                        <span className="me-1">Precio: S/.{(curso.precio * 0.0052).toFixed(0)} SOLES</span>
                      </>
                    ) : (
                      <>
                        <FaDollarSign className="me-2" />
                        <span className="me-1">Precio: {curso.precio} CLP</span>
                      </>
                    )}
                  </div>
                  {curso.modalidad === "Sincrónico" ? (
                    <>
                      <div className="d-flex align-items-center mt-2">
                        <FaCalendarAlt className="me-2" />
                        <span className="me-1">Horario: {new Date(curso.horario).toLocaleString()}</span>
                      </div>
                      <div className="d-flex align-items-center mt-2">
                        <FiClock className="me-2" />
                        <span className="me-1">Duración: {curso.duracion} horas</span>
                      </div>
                      {verificacionSub ? (
                        <>
                          <div className="d-flex align-items-center mt-2">
                            <AiOutlineLink className="me-2" />
                            <span className="me-0"> Enlace: </span>
                            <a className="w-75" href={curso.enlace}>
                              <p className="w-100 text-truncate mb-0">{curso.enlace}</p>
                            </a>
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : null}
                </div>
              ) : (
                <div className="cargandoDatos mb-2"></div>
              )}
              {cargandoCurso ? (
                <>
                  <p className="m-0 mt-2 fw-bold">Descripción:</p>
                  <p ref={(node) => (refDescripcion.current = node)} style={{ textAlign: "justify" }} className="m-0"></p>
                  <div className="row mt-5">
                    {verificacionSub ? (
                      <></>
                    ) : (
                      <Link to={`/Comprar/${params.idCurso}`} className="btn btn-warning btn-width d-flex justify-content-center align-items-center">
                        <GrShop className="me-2 text-danger" />
                        Comprar curso
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <div className="cargandoDatos"></div>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-lg-7">
            {cargandoCurso ? (
              <div className="my-auto d-lg-flex d-none">
                <img src={curso.url_foto_curso} className="img-fluid ancho-img" alt={`Curso`} />
              </div>
            ) : (
              <div className="cargandoDatos mb-5"></div>
            )}
            {cargandoCurso ? (
              <>
                {modulos.map((modulo) => {
                  return <Modulos verificacion={verificacionSub} key={modulo.id_modulo} modulo={modulo} />;
                })}
              </>
            ) : (
              <>
                <div className="cargandoDatos mb-2" style={{ height: "50px" }}></div>
                <div className="cargandoDatos mb-2" style={{ height: "50px" }}></div>
                <div className="cargandoDatos mb-2" style={{ height: "50px" }}></div>
                <div className="cargandoDatos mb-2" style={{ height: "50px" }}></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CursoFullPage;
