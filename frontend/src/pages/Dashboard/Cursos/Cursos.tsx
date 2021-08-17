/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

//Icons
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Toastify
import { ToastContainer } from "react-toastify";

//Components
import Buscador from "../../../components/Buscador";
import ListaCursos from "./ListaCursos";

//Interfaces
interface Params {
  modalidad: string;
  tipo: string;
}

const Cursos: React.FC = () => {
  const modalidades = ["Sincronicos", "Asincronicos", "Talleres", "Cursos"];

  const params = useParams<Params>();
  const history = useHistory();

  const [filtro, setFiltro] = useState<string>("");

  const [tipo, setTipo] = useState("");
  const [modalidad, setModalidad] = useState("");

  const buscar = (text: string) => setFiltro(text);

  useEffect(() => {
    if (!modalidades.includes(params.modalidad) || !modalidades.includes(params.tipo)) return history.push("/Dashboard"); //Validando ruta
    params.tipo === "Talleres" ? setTipo("Taller") : setTipo("Curso");
    params.modalidad === "Asincronicos" ? setModalidad("Asincrónico") : setModalidad("Sincrónico");
  }, [params.tipo, params.modalidad]);

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
                  {tipo} {modalidad}
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
                  <li className="breadcrumb-item active">
                    {params.tipo} {params.modalidad}
                  </li>
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
                <button onClick={() => history.push(`/DashBoard/${params.tipo}/${params.modalidad}/nuevo`)} className="btn btn__blue mx-4 my-2">
                  <FontAwesomeIcon className="me-2" icon={faPlus} />
                  Agrega un {tipo} {modalidad}
                </button>
              </div>
              <div className="col-lg-3 col-md-3 ms-auto">
                <Buscador placeholder={`Buscar ${tipo} ${modalidad}`} funcion={buscar} />
              </div>
            </div>
            <div className="row mt-5">
              <div className="table-responsive">
                <div className="table-responsive">
                  <ListaCursos filtro={filtro} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cursos;
