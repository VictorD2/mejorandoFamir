/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Icon
import { VscRefresh } from "react-icons/vsc";
import { FaEdit, FaPlus, FaTimes } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";
import { GoKebabVertical } from "react-icons/go";

//Toastify
import { toast } from "react-toastify";

//Services
import * as moduloServices from "../../../../services/ModuloService";
import * as tareaServices from "../../../../services/TareaServices";

// Components
import TemaItem from "../Temas/TemaItem";

// Interfaces
import { Modulo } from "../../../../interfaces/Modulo";
import { Tema } from "../../../../interfaces/Tema";
import { Tarea } from "../../../../interfaces/Tarea";
import TareaItem from "../Tareas/TareaItem";

interface Params {
  id: string;
}

interface Props {
  //tema
  setcount: (count: number) => void;
  count: number;
  //material
  setCountChange: (count: number) => void;
  countChange: number;
  // Modulo
  setModuloModal: (modulo: Modulo) => void;
  modulo: Modulo;
  // Tema
  setTemaModal: (tema: Tema) => void;
  temaModal: Tema;
  // Tarea
  setTareaModal: (tarea: Tarea) => void;
  tareaModal: Tarea;
  load: (id: string) => void;
}

const ModuloItem: React.FC<Props> = (props) => {
  const params = useParams<Params>();

  const [temas, setTemas] = useState<Tema[]>([]); //Temas
  const [tareas, setTareas] = useState<Tarea[]>([]); //Tareas
  const [loadTemas, setLoadTemas] = useState(false); //Están los temas cargados?

  useEffect(() => {
    //Solo se hará cuando el estado loadTemas sea true, el cual solo cambia 1 vez
    if (loadTemas) {
      getTemas();
      getTareas();
    }
    return () => limpieza();
  }, [loadTemas, props.count]);

  //Funciones

  const eliminarModulo = async () => {
    if (!window.confirm("¿Está seguro que desea eliminar el módulo?")) return;

    const res = await moduloServices.eliminarModulo(props.modulo);
    if (res.data.success) {
      toast.success(res.data.success);
      props.load(params.id);
      return;
    }
    if (res.data.error) return toast.error(res.data.error);
  };

  // Cambiando de estado al loadTemas para traer los datos de la bd cuando hacen click al ModuloItem
  const handleLoadChange = () => {
    if (!loadTemas) return setLoadTemas(true);
  };

  // trayendo los temas de la bd
  const getTemas = async () => {
    const rows = await moduloServices.getTemasByModuloId(props.modulo.id_modulo + "");
    setTemas(rows.data);
  };

  //Trayendo las tareas de la bd
  const getTareas = async () => {
    const rows = await tareaServices.getTareasByModuloId(props.modulo.id_modulo + "");
    setTareas(rows.data);
  };

  //Limpieza cuando se desrenderice
  const limpieza = () => {
    setTareas([]);
    setTemas([]);
  };

  const limpiandoEstados = () => {
    props.setTemaModal({ titulo: "", descripcion: "", url_video: "", video: [new File([""], "filename")] });
    props.setModuloModal(props.modulo);
  };

  return (
    <div className="accordion-item my-4">
      {/* Options */}
      <div className="w-100 d-flex justify-content-end bg-light">
        <div className="btn-group">
          <button type="button" className="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
            <GoKebabVertical className="mb-1" />
          </button>
          <ul className="dropdown-menu">
            {/* Actualizar */}
            <li>
              <button onClick={() => getTemas()} className="dropdown-item">
                <VscRefresh /> Actualizar Modulo
              </button>
            </li>

            {/* Creando un tema */}
            <li>
              <button onClick={() => limpiandoEstados()} data-bs-toggle="modal" data-bs-target="#crearTema" className="dropdown-item">
                <FaPlus className="mb-1" /> Agregar Tema
              </button>
            </li>

            {/* Creando una tarea */}
            <li>
              <button
                onClick={() => {
                  props.setTareaModal({ titulo_tarea: "", descripcion_tarea: "", id_modulo: 0 });
                  props.setModuloModal(props.modulo);
                }}
                data-bs-toggle="modal"
                data-bs-target="#crearTarea"
                className="dropdown-item"
              >
                <FiFilePlus className="mb-1" /> Agregar Tarea
              </button>
            </li>

            {/* Editar modulo */}
            <li>
              <button onClick={() => props.setModuloModal(props.modulo)} data-bs-toggle="modal" data-bs-target="#crearModulo" className="dropdown-item">
                <FaEdit className="mb-1" /> Editar Modulo
              </button>
            </li>

            {/* Eliminar modulo */}
            <li>
              <button onClick={eliminarModulo} className="dropdown-item">
                <FaTimes className="mb-1" /> Eliminar Modulo
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Content */}
      <h2 className="accordion-header" id="panelsStayOpen-headingThree">
        <button onClick={handleLoadChange} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#r${props.modulo.id_modulo}`} aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
          {props.modulo.titulo}
        </button>
      </h2>
      <div id={`r${props.modulo.id_modulo}`} className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
        <div className="p-4">
          <ol className="list-group list-group-numbered">
            {temas.map((tema) => {
              return <TemaItem countChange={props.countChange} setCountChange={props.setCountChange} setcount={props.setcount} count={props.count} modulo={props.modulo} setModuloModal={props.setModuloModal} setTemaModal={props.setTemaModal} key={tema.id_tema} tema={tema} />;
            })}
            {tareas.map((tarea) => {
              return <TareaItem setTareaModal={props.setTareaModal} tarea={tarea} countChange={props.countChange} setCountChange={props.setCountChange} setcount={props.setcount} count={props.count} modulo={props.modulo} setModuloModal={props.setModuloModal} key={tarea.id_tarea} />;
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ModuloItem;
