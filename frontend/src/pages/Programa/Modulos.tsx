/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Iconoes
import { FaLock, FaPlay } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

//Services
import * as moduloServices from "../../services/ModuloService";
import * as tareaServices from "../../services/TareaServices";

//Interfaces
import { Modulo } from "../../interfaces/Modulo";
import { Tema } from "../../interfaces/Tema";
import { Tarea } from "../../interfaces/Tarea";

interface Props {
  modulo: Modulo;
  verificacion: boolean;
}
const Modulos:React.FC<Props> = (props) => {
  const [temas, setTemas] = useState<Tema[]>([]);
  const [tareas, setTareas] = useState<Tarea[]>([]);

  useEffect(() => {
    getTemas();
    return () => {
      setTareas([]);
      setTemas([]);
    };
  }, [props.modulo]);

  const getTemas = async () => {
    const res = await moduloServices.getTemasByModuloId(props.modulo.id_modulo + "");
    getTareas();
    setTemas(res.data);
  };

  const getTareas = async () => {
    const res = await tareaServices.getTareasByModuloId(props.modulo.id_modulo + "");
    setTareas(res.data);
  };

  if (props.verificacion) {
    //Quitar ! en produccion
    return (
      <div className="mt-lg-5 mt-1">
        <div className="fw-bold text-uppercase fs-5">{props.modulo.titulo}</div>
        {temas.map((tema) => {
          return (
            <Link key={tema.id_tema} className="text-decoration-none" to={`/Clase/${props.modulo.id_curso}/${tema.id_tema}`}>
              <div className="btn__blue p-2 ps-3 mt-2 border rounded-pill" key={tema.id_tema}>
                <FaPlay className="me-2 mb-1" /> {tema.titulo}
              </div>
            </Link>
          );
        })}
        {tareas.map((tarea) => {
          return (
            <Link key={tarea.id_tarea} className="text-decoration-none" to={`/Clase/${props.modulo.id_curso}/Tarea/${tarea.id_tarea}`}>
              <div className="btn__blue p-2 ps-3 mt-2 border rounded-pill" key={tarea.id_tarea}>
                <FiFileText className="me-2 mb-1" /> {tarea.titulo_tarea}
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
  return (
    <div className="mt-5">
      <div className="fw-bold text-uppercase fs-5">{props.modulo.titulo}</div>
      {temas.map((tema) => {
        return (
          <div key={tema.id_tema} className="btn__blue p-2 ps-3 mt-2 border rounded-pill">
            <FaLock className="me-2 mb-1" /> {tema.titulo}
          </div>
        );
      })}
      {tareas.map((tarea) => {
        return (
          <div key={tarea.id_tarea} className="btn__blue p-2 ps-3 mt-2 border rounded-pill">
            <FaLock className="me-2 mb-1" /> {tarea.titulo_tarea}
          </div>
        );
      })}
    </div>
  );
};

export default Modulos;
