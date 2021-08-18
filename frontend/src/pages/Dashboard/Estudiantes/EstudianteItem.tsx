import React from "react";

//Iconos
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TiCancel } from "react-icons/ti";

//Toastify
import { toast } from "react-toastify";

//Services
import * as estudiantesServices from "../../../services/EstudianteService";

//Interfaces
import { Usuario } from "../../../interfaces/Usuario";

interface Props {
  estudiante: Usuario;
  funcion: (profesor: Usuario) => void;
  cargaDatos: () => void;
}

const EstudianteItem: React.FC<Props> = (props) => {
  const ponerDatos = () => props.funcion(props.estudiante);

  const deshabilitar = async () => {
    if (!window.confirm("¿Está seguro que desea habilitar/deshabilitar el usuario?")) return;

    const res = await estudiantesServices.eliminarEstudiante(props.estudiante.id_usuario?.toString());
    if (res.data.error) return toast.error(res.data.error);
    props.cargaDatos();
    toast.success(res.data.success);
  };

  return (
    <>
      <tr>
        <td>{props.estudiante.id_usuario}</td>
        <td>{props.estudiante.nombre}</td>
        <td>{props.estudiante.apellido}</td>
        <td>{props.estudiante.correo}</td>
        <td>{props.estudiante.profesion}</td>

        <td className="text-center">
          <button onClick={ponerDatos} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn__blue">
            <FontAwesomeIcon className="fs-5" icon={faEye} />
          </button>
        </td>
        <td className="text-center">
          {props.estudiante.habilitado_u ? (
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

export default EstudianteItem;
