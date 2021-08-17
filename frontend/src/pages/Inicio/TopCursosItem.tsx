import React from "react";
import { Link } from "react-router-dom";
import { RiCoinsLine } from "react-icons/ri";
interface Props {
  title: string;
  url: string;
  nombre_profesor: string;
  fecha?: string;
  descripcion: string;
  img: string;
  precio?: number;
  btnTitle: string;
}
const TopCursosItem: React.FC<Props> = (props) => {
  return (
    <div className="col-12 col-lg-6 show">
      <div className="d-flex top-cursos-item">
        <div className="info">
          <h5>{props.title}</h5>
          <p className="autor">
            By {props.nombre_profesor} | {props.fecha}
          </p>
          <p className="curso-description">{props.descripcion}</p>
          <p className="mb-0 fw-bold">
            <RiCoinsLine className="fs-5 me-1" />
            Precio: {props.precio}
          </p>
          <Link to={props.url} className="btn btn__more mt-5">
            {props.btnTitle}
          </Link>
        </div>
        <div className="img" style={{ backgroundImage: `url(${props.img})` }}></div>
      </div>
    </div>
  );
};

export default TopCursosItem;
