/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

//Iconos
import { GiTeacher, GiShoppingCart } from "react-icons/gi";
//Imagenes

//Interfaces
import { Curso } from "../../interfaces/Curso";
import { useUsuario } from "../../auth/UsuarioProvider";

interface Props {
  curso: Curso;
}
const CursoItem: React.FC<Props> = (props) => {
  const ref = useRef<HTMLParagraphElement | null>();
  const { usuario } = useUsuario();
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = props.curso.descripcion;
    return () => {};
  }, []);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 bg-white">
      <div className="w-100 mt-3 overflow-hidden">
        <Link to={`/Clase/${props.curso.id_curso}`} className="w-100">
          <img className="img-fluid fotoCurso" src={props.curso.url_foto_curso} alt={props.curso.nombre_curso} />
        </Link>
      </div>
      <div className="bg-white">
        <h3 className="ms-3 fw-bold mt-3" style={{ fontSize: "16px" }}>
          {props.curso.nombre_curso}
        </h3>
        <p ref={(node) => (ref.current = node)} className="mx-3 mt-3 overflow-hidden descripcion__curso" style={{ fontSize: "16px", minHeight: "78px", maxHeight: "78px" }}>
          {/* {props.curso.descripcion} */}
        </p>
      </div>
      <div className="d-flex flex-lg-column flex-column media flex-md-column align-items-start align-items-lg-start justify-content-between bg-white mb-3">
        <p className="text-truncate m-0 mb-3 mb-lg-0 w-100 overflow-hidden px-2">
          <GiTeacher className="me-2" />
          Docente: {props.curso.nombre} {props.curso.apellido}
        </p>
        <Link to={`/Comprar/${props.curso.id_curso}`} className="text-decoration-none text-dark mt-2 align-self-center w-100">
          <button className="btn btn-warning w-100">
            <GiShoppingCart className="me-2 fs-3 text-dark" />
            {usuario.id_pais_residencia === "PE" ? <>S/.{(props.curso.precio * 0.0052).toFixed(0)} SOLES</> : <>$ {props.curso.precio} CLP</>}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CursoItem;
