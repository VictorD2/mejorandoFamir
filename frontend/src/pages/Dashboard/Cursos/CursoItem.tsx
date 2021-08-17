import React from "react";
import { useHistory, useParams } from "react-router-dom";

//Services
import * as CursosServices from "../../../services/CursosServices";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { TiCancel } from "react-icons/ti";
import { IoNewspaperSharp } from "react-icons/io5";

//Toastify
import { toast } from "react-toastify";

// Interfaces
import { Curso } from "../../../interfaces/Curso";
interface Params {
  id?: string;
  modalidad?: string;
  tipo?: string;
}

interface Props {
  curso: Curso;
  cargaDatos: () => void;
}

const CursoItem: React.FC<Props> = (props) => {
  const params = useParams<Params>();
  const history = useHistory();

  const deshabilitar = async () => {
    if (!window.confirm("¿Está seguro que desea habilitar/deshabilitar el curso?")) return;

    const res = await CursosServices.eliminarCurso(props.curso.id_curso?.toString());

    if (res.data.error) return toast.error(res.data.error);

    props.cargaDatos();
    toast.success(res.data.success);
  };

  return (
    <>
      <tr>
        <td>{props.curso.id_curso}</td>
        <td>{props.curso.nombre_curso}</td>
        <td>{props.curso.precio}</td>
        {props.curso.modalidad === "Sincrónico" ? (
          <>
            <td>{props.curso.capacidad}</td>
            <td>{props.curso.horario}</td>
            <td>{props.curso.duracion} horas</td>
          </>
        ) : (
          <></>
        )}
        <td className="text-center">
          <button onClick={() => history.push(`/DashBoard/${params.tipo}/${params.modalidad}/update/${props.curso.id_curso}`)} className="btn btn__amarillo">
            <FontAwesomeIcon className="fs-5" icon={faEdit} />
          </button>
        </td>

        <td className="text-center">
          <button onClick={() => history.push(`/DashBoard/${params.tipo}/${params.modalidad}/${props.curso.id_curso}`)} className="btn btn__blue">
            <FontAwesomeIcon className="fs-5" icon={faEye} />
          </button>
        </td>
        <td className="text-center">
          <button onClick={() => history.push(`/DashBoard/${params.tipo}/${params.modalidad}/Material/${props.curso.id_curso}`)} className="btn btn__verde">
            <IoNewspaperSharp className="fs-5 mb-1" />
          </button>
        </td>
        <td className="text-center">
          {props.curso.habilitado ? (
            <>
              <button onClick={deshabilitar} className="btn btn-secondary">
                <TiCancel className="fs-4" />
              </button>
            </>
          ) : (
            <>
              <button onClick={deshabilitar} className="btn btn-success">
                <FontAwesomeIcon className="fs-4" icon={faCheck} />
              </button>
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default CursoItem;
