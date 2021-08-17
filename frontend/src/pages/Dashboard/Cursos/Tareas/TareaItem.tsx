import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modulo } from "../../../../interfaces/Modulo";
import { Tarea } from "../../../../interfaces/Tarea";
import { FaEdit, FaEye, FaTimes } from "react-icons/fa";
import { GoKebabVertical } from "react-icons/go";
import { FiFileText } from "react-icons/fi";
import * as tareaServices from "../../../../services/TareaServices";
import { toast } from "react-toastify";

interface Params {
  modalidad: string;
  id: string;
  tipo: string;
}

interface Props {
  tarea: Tarea;
  setTareaModal: (tarea: Tarea) => void;
  setcount: (count: number) => void;
  count: number;
  setCountChange: (count: number) => void;
  countChange: number;
  setModuloModal: (modulo: Modulo) => void;
  modulo: Modulo;
}
const TareaItem: React.FC<Props>= (props) => {
  const params = useParams<Params>();

  const history = useHistory();

  const eliminarTarea = async () => {
    if (!window.confirm("¿Está seguro que desea eliminar la tarea?")) return;

    const res = await tareaServices.eliminarTarea(props.tarea);
    if (res.data.success) {
      props.setcount(props.count + 1);
      toast.success(res.data.success);
      return;
    }
    if (res.data.error) return toast.error(res.data.error);
  };

  return (
    <li className="list-group-item list-group-item-action d-flex align-items-center justify-content-start">
      <button onClick={() => history.push(`/DashBoard/${params.tipo}/${params.modalidad}/Material/${params.id}/Tarea/${props.tarea.id_tarea}`)} className="btn w-100 mx-4 fw-bold d-flex justify-content-start align-content-center text-start" type="button">
        <FiFileText className="me-2 my-auto" /> {props.tarea.titulo_tarea}
      </button>
      <div className="btn-group ms-auto">
        <button type="button" className="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
          <GoKebabVertical className="mb-1" />
        </button>
        <ul className="dropdown-menu">
          {/* Ver tarea */}
          <li>
            <button onClick={() => history.push(`/DashBoard/${params.tipo}/${params.modalidad}/Material/${params.id}/Tarea/${props.tarea.id_tarea}`)} className="dropdown-item">
              <FaEye className="mb-1" /> Ver Tarea
            </button>
          </li>

          {/* Editar tarea */}
          <li>
            <button
              onClick={() => {
                props.setTareaModal(props.tarea);
                props.setModuloModal(props.modulo);
              }}
              data-bs-toggle="modal"
              data-bs-target="#crearTarea"
              className="dropdown-item"
            >
              <FaEdit className="mb-1" /> Editar Tarea
            </button>
          </li>

          {/* Eliminar tarea */}
          <li>
            <button onClick={eliminarTarea} className="dropdown-item">
              <FaTimes className="mb-1" /> Eliminar Tarea
            </button>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default TareaItem;
