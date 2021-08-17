/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

//Componentes
import Modulos from "./Modulos";

//Iconos
import { GiTeacher } from "react-icons/gi";
import { FaDollarSign } from "react-icons/fa";
import { GrShop } from "react-icons/gr";

//Imagenes

//Services
import * as cursoServices from "../../services/CursosServices";
import * as profesoresServices from "../../services/ProfesoresServices";

//Interfaces
import { Curso } from "../../interfaces/Curso";
import { Usuario } from "../../interfaces/Usuario";
import { Modulo } from "../../interfaces/Modulo";

interface Params {
  idCurso: string;
}
const initialState: Curso = {
  descripcion: "",
  enlace: "",
  nombre_curso: "",
  horario: "",
  precio: 0,
  url_foto_curso: "",
};
const CursoFullPage:React.FC = () => {
  const params = useParams<Params>();

  const [curso, setCurso] = useState<Curso>(initialState);
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
    const newDescripcion = res.data.descripcion.replace(/\n/g, "<br/>");
    res.data.descripcion = newDescripcion;
    const resProfesor = await profesoresServices.getProfesorById(res.data.id_usuario);
    const resModulos = await cursoServices.getAllModulesByCursoId(params.idCurso);

    if (refDescripcion.current) refDescripcion.current.innerHTML = res.data.descripcion;

    setModulos(resModulos.data);
    setProfesor(resProfesor.data);
    verificarSub();
    setCurso(res.data);
  };
  const verificarSub = async () => {
    const res = await cursoServices.verificarSuscribcion(params.idCurso);
    setVerificacionSub(res.data);
  };

  return (
    <>
      <div className="p-5" style={{ marginTop: "5rem", background: "#eef3f6" }}>
        <div className="row flex-lg-row">
          <div className="col-12 ps-5 col-sm-12 col-lg-5 col-md-12 mb-2 mb-lg-5 mt-sm-5 mt-lg-0">
            <div className="my-auto d-lg-none d-flex">
              <img src={curso.url_foto_curso} className="img-fluid ancho-img" alt={`Curso`} />
            </div>
            <div className="column-detail">
              <h3 className="fw-bold">{curso.nombre_curso}</h3>
              <div className="row mt-3 mt-lg-5">
                <div className="d-flex align-items-center">
                  <GiTeacher className="me-2" />
                  <span>
                    Docente: {profesor.nombre} {profesor.apellido}
                  </span>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <FaDollarSign className="me-2" />
                  <span className="me-1">Precio: {curso.precio}</span>
                </div>
              </div>
              <p className="m-0 mt-2 fw-bold">Descripción:</p>
              <p ref={(node) => (refDescripcion.current = node)} style={{ textAlign: "justify" }} className="m-0"></p>
              <div className="row mt-5">
                <Link to={`/Comprar/${params.idCurso}`} className="btn btn-warning btn-width d-flex justify-content-center align-items-center">
                  <GrShop className="me-2 text-danger" />
                  Comprar curso
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-lg-7">
            <div className="my-auto d-lg-flex d-none">
              <img src={curso.url_foto_curso} className="img-fluid ancho-img" alt={`Curso`} />
            </div>
            {modulos.map((modulo) => {
              return <Modulos verificacion={verificacionSub} key={modulo.id_modulo} modulo={modulo} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CursoFullPage;
