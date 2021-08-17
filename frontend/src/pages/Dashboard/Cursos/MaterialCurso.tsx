/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

//Icons
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer } from "react-toastify";

//Components
import ModuloItem from "./Modulos/ModuloItem";

//Services
import * as CursosServices from "../../../services/CursosServices";

//Modales
import ModalModulo from "./Modulos/ModalModulo";
import ModalTema from "./Temas/ModalTema";
import ModalTarea from "./Tareas/ModalTarea";
import ModalMaterial from "./MaterialClase/ModalMaterial";

//Interfaces
import { Curso } from "../../../interfaces/Curso";
import { Modulo } from "../../../interfaces/Modulo";
import { Tema } from "../../../interfaces/Tema";
import { Tarea } from "../../../interfaces/Tarea";
import { Link } from "react-router-dom";

interface Params {
  modalidad: string;
  tipo: string;
  id: string;
}
const initialStateCurso = {
  nombre_curso: "",
  descripcion: "",
  precio: 0,
  duracion: 0,
  horario: "",
  enlace: "",
  id_usuario: 0,
  url_foto_curso: "",
};

const initialStateModulo = {
  titulo: "",
};
const initialStateTema = {
  titulo: "",
  descripcion: "",
  video: [new File([""], "filename")],
  inputName: "",
  url_video: "",
};
const initialStateTarea = {
  id_tarea: 0,
  titulo_tarea: "",
  descripcion_tarea: "",
  id_modulo: 0,
};
const MaterialCurso: React.FC= () => {
  const modalidades = ["Sincronicos", "Asincronicos", "Talleres", "Cursos"];

  const params = useParams<Params>();
  const history = useHistory();

  const [curso, setCurso] = useState<Curso>(initialStateCurso); //Curso en la ventana
  const [modulos, setModulos] = useState<Modulo[]>([]); //Lista de modulos

  const [tipo, setTipo] = useState<string>(""); //Taller o Curso
  const [modalidad, setModalidad] = useState<string>(""); //Sincrono o asincrono

  // Ventanas modales
  const [count, setcount] = useState(0);
  const [countChange, setCountChange] = useState(0);
  const [moduloModal, setModuloModal] = useState<Modulo>(initialStateModulo);
  const [temaModal, setTemaModal] = useState<Tema>(initialStateTema);
  const [tareaModal, setTareaModal] = useState<Tarea>(initialStateTarea);

  useEffect(() => {
    if (!modalidades.includes(params.modalidad) || !modalidades.includes(params.tipo)) return history.push("/");
    params.tipo === "Talleres" ? setTipo("Taller") : setTipo("Curso"); //Definiendo si es taller o curso
    params.modalidad === "Asincronicos" ? setModalidad("Asincrónico") : setModalidad("Sincrónico"); //Definiendo si es sincrono o asincrono
    getCurso(params.id); //Trayendo los datos de la bd
    return () => limpieza();
  }, [params.tipo, params.modalidad]);

  //Funciones

  //Traer los datos deModall curso
  const getCurso = async (idCurso: string) => {
    const res = await CursosServices.getCursoById(idCurso);
    if (res.data.error) history.push(`/Dashboard/${params.tipo}/${params.modalidad}`);
    setCurso(res.data);
    getAllModulos(idCurso);
  };

  // Traer los modulos del curso
  const getAllModulos = async (idCurso: string) => {
    const rows = await CursosServices.getAllModulesByCursoId(idCurso);
    setModulos(rows.data);
  };

  //Cuando se desrenderice
  const limpieza = () => {
    setCurso(initialStateCurso); //Limpiando estado curso
    setModuloModal(initialStateModulo); //Limpiando estado tema
    setTemaModal(initialStateTema); //Limpiando estado modulo
    setModulos([]); //Limpiando estado modulos
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
                  <li className="breadcrumb-item active">Material</li>
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
                <button onClick={() => setModuloModal({ titulo: "" })} className="btn btn__blue mx-4 my-2" data-bs-toggle="modal" data-bs-target="#crearModulo">
                  <FontAwesomeIcon className="me-2" icon={faPlus} />
                  Agrega un modulo
                </button>
              </div>
              <div className="col-lg-3 col-md-3 ms-auto"></div>
            </div>
            <div className="row mt-5">
              <div className="accordion" id="accordionPanelsStayOpenExample">
                {modulos.map((modulo) => {
                  return <ModuloItem tareaModal={tareaModal} setTareaModal={setTareaModal} countChange={countChange} setCountChange={setCountChange} setcount={setcount} count={count} modulo={modulo} temaModal={temaModal} load={getAllModulos} setModuloModal={setModuloModal} setTemaModal={setTemaModal} key={modulo.id_modulo} />;
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
      <ModalModulo load={getAllModulos} moduloModal={moduloModal} />
      <ModalTema count={count} setcount={setcount} moduloModal={moduloModal} temaModal={temaModal} />
      <ModalMaterial count={count} setcount={setcount} temaModal={temaModal} />
      <ModalTarea count={count} setcount={setcount} tareaModal={tareaModal} moduloModal={moduloModal} />
    </>
  );
};

export default MaterialCurso;
