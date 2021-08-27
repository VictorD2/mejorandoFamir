import React from "react";
import { Vimeo } from "vimeo";
import VimeoKeys from "../../../../interfaces/Vimeo";

//Icons
import { FaEdit, FaEye, FaPlus, FaTimes } from "react-icons/fa";
import { FiPlay } from "react-icons/fi";
import { GoKebabVertical } from "react-icons/go";

//Services
import * as temaServices from "../../../../services/TemaServices";

// Interfaces
import { Modulo } from "../../../../interfaces/Modulo";
import { Tema } from "../../../../interfaces/Tema";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router";

interface Params {
  modalidad: string;
  id: string;
  tipo: string;
}

interface Props {
  setcount: (count: number) => void;
  count: number;
  setCountChange: (count: number) => void;
  countChange: number;
  setModuloModal: (modulo: Modulo) => void;
  setTemaModal: (tema: Tema) => void;
  tema: Tema;
  modulo: Modulo;
}

const TemaItem: React.FC<Props> = (props) => {
  const params = useParams<Params>();

  const history = useHistory();

  //Funciones
  const eliminarTema = async () => {
    if (!window.confirm("¿Está seguro que desea eliminar el tema?")) return;
    let client = new Vimeo(VimeoKeys.CLIENT_ID, VimeoKeys.CLIENT_SECRET, VimeoKeys.CLIENT_TOKEN);
    client.request({ method: "DELETE", path: props.tema.url_video }, async (error, body, status_code, headers) => {
      if (error) return toast.error(error);
      const res = await temaServices.eliminarTema(props.tema.id_tema + "");
      if (res.data.error) return toast.error(res.data.error);
      toast.success(res.data.success);
      props.setcount(props.count + 1);
    });
  };

  const setModales = () => {
    props.setTemaModal(props.tema);
    props.setModuloModal(props.modulo);
  };

  return (
    <li className="list-group-item list-group-item-action d-flex align-items-center justify-content-start">
      <button onClick={() => history.push(`/DashBoard/${params.tipo}/${params.modalidad}/Material/${params.id}/${props.tema.id_tema}`)} className="btn w-100 mx-4 fw-bold d-flex justify-content-start align-content-center text-start" type="button">
        <FiPlay className="me-2 my-auto" /> {props.tema.titulo}
      </button>
      <div className="btn-group ms-auto">
        <button type="button" className="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
          <GoKebabVertical className="mb-1" />
        </button>
        <ul className="dropdown-menu">
          {/* Agregar Material */}
          <li>
            <button
              onClick={() => {
                props.setTemaModal(props.tema);
              }}
              data-bs-toggle="modal"
              data-bs-target="#crearMaterial"
              className="dropdown-item"
            >
              <FaPlus className="mb-1" /> Agregar Material
            </button>
          </li>

          {/* Ver tema */}
          <li>
            <button onClick={() => history.push(`/DashBoard/${params.tipo}/${params.modalidad}/Material/${params.id}/${props.tema.id_tema}`)} className="dropdown-item">
              <FaEye className="mb-1" /> Ver Tema
            </button>
          </li>

          {/* Editar tema */}
          <li>
            <button
              onClick={() => {
                setModales();
              }}
              data-bs-toggle="modal"
              data-bs-target="#crearTema"
              className="dropdown-item"
            >
              <FaEdit className="mb-1" /> Editar Tema
            </button>
          </li>

          {/* Eliminar modulo */}
          <li>
            <button onClick={eliminarTema} className="dropdown-item">
              <FaTimes className="mb-1" /> Eliminar Tema
            </button>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default TemaItem;
