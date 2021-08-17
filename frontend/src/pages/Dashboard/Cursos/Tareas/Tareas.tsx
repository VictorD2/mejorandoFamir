/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { RiFileForbidLine } from "react-icons/ri";
import { AiOutlineDownload } from "react-icons/ai";
import { Tarea } from "../../../../interfaces/Tarea";
import { Link, useHistory, useParams } from "react-router-dom";
import * as tareaServices from "../../../../services/TareaServices";
import { MaterialTarea } from "../../../../interfaces/MaterialTarea";
interface Params {
  idTarea: string;
  modalidad: string;
  tipo: string;
  id: string;
}

const initialStateTarea: Tarea = {
  titulo_tarea: "",
  descripcion_tarea: "",
  id_modulo: 0,
};

const Tareas: React.FC = () => {
  const modalidades = ["Sincronicos", "Asincronicos", "Talleres", "Cursos"];
  const params = useParams<Params>();
  const history = useHistory();
  const textRef = useRef<HTMLDivElement | null>();
  const [tarea, setTarea] = useState<Tarea>(initialStateTarea);
  const [materialTarea, setMaterialTarea] = useState<MaterialTarea[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!modalidades.includes(params.modalidad) || !modalidades.includes(params.tipo)) return history.push("/");
    getTarea();
    return () => {
      setTarea(initialStateTarea);
      setMaterialTarea([]);
      setCount(0);
    };
  }, [params.tipo, params.modalidad, params.idTarea, count]);

  const getTarea = async () => {
    const res = await tareaServices.getTareasById(params.idTarea);
    if (res.data.error) return history.push(`/DashBoard/${params.tipo}/${params.modalidad}/Material/${params.id}`);
    const resMaterial = await tareaServices.getMaterialTareasById(res.data[0].id_tarea);
    setMaterialTarea(resMaterial.data);
    const newDescripcion = res.data[0].descripcion_tarea.replace(/\n/g, "<br/>");
    if (textRef.current) textRef.current.innerHTML = newDescripcion;
    res.data[0].descripcion_tarea = newDescripcion;
    setTarea(res.data[0]);
  };

  const eliminarMaterial = async (id: string) => {
    if (!window.confirm("¿Está seguro que desea eliminar la tarea?")) return;

    const res = await tareaServices.borrarMaterialTareasById(id);
    if (res.data.success) {
      setCount(count + 1);
      toast.success(res.data.success);
      return;
    }
    if (res.data.error) return toast.error(res.data.error);
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
                  <i className="nav-icon fas fa-file-alt   me-3" />
                  {tarea.titulo_tarea}
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
                  <li className="breadcrumb-item">
                    <Link className="link-normal" to={`/Dashboard/${params.tipo}/${params.modalidad}/Material/${params.id}`}>
                      Material
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Tarea</li>
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
              <div ref={(node) => (textRef.current = node)} className="lh-base" style={{ textAlign: "justify" }}></div>
              {materialTarea.length === 0 ? (
                <>
                  <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "74vh" }}>
                    <RiFileForbidLine className="fs-1 mb-2" />
                    <p className="fs-4">No hay material subido aún</p>
                  </div>
                </>
              ) : (
                <>
                  <ol className="list-group list-group-numbered mt-5">
                    {materialTarea.map((material) => {
                      return (
                        <li className="list-group-item d-flex align-items-center">
                          <div className="">
                            <p className="m-0 ms-5">
                              {material.apellido}, {material.nombre}
                            </p>
                          </div>
                          <div className="ms-auto">Fecha de entrega: {material.fecha_entrega}</div>
                          <div className="ms-auto w-25 d-flex justify-content-around">
                            <a rel="noreferrer" href={material.url_material} target="_blank" download={material.nombre_material_tarea} className="btn btn__blue">
                              <AiOutlineDownload className="mb-1 fs-4" />
                            </a>
                            <button onClick={() => eliminarMaterial(material.id_material_tarea + "")} className="btn btn-danger">
                              <FaTimes className="mb-1 fs-4" />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Tareas;
