import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useUsuario } from "../../auth/UsuarioProvider";
import * as comprobanteServices from "../../services/ComprobanteServices";
import { Curso } from "../../interfaces/Curso";
import ImgCurso from "../../components/ImgCurso";

// Interfaces
interface Props {
  curso: Curso;
  refresh: () => void;
}
const ListFavoritos: React.FC<Props> = (props) => {
  const { usuario } = useUsuario();

  const setFavorito = async () => {
    const res = await comprobanteServices.setFavorito(props.curso.id_curso + "", usuario.id_usuario + "");
    if (res.data.success) {
      swal({ title: "Hecho", text: `${res.data.success}`, icon: "success" });
      props.refresh();
      return;
    }
    if (res.data.error) {
      return swal({ title: "Ups!", text: `${res.data.error}`, icon: "error" });
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <Link to={`/Clase/${props.curso.id_curso}`} className="text-decoration-none text-dark">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <ImgCurso url={props.curso.url_foto_curso} className="BadgesListItem__avatar" />
            </div>
            <div className="col-lg-8 col-md-9 text-start">
              <span className="font-weight-bold fs-3">{props.curso.nombre_curso}</span>
              <p className="mt-2 text-truncate">{props.curso.descripcion}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="card-footer d-flex justify-content-end">
        <button onClick={() => setFavorito()} className="btn btn-danger">
          Quitar
        </button>
      </div>
    </div>
  );
};

export default ListFavoritos;
