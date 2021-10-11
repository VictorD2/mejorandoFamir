import React, { useRef } from "react";
import { Link } from "react-router-dom";
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
  const refDescripcion = useRef<HTMLParagraphElement | null>();

  return (
    <div className="col-12 col-lg-6 show">
      <div className="d-flex flex-column-reverse flex-lg-row top-cursos-item">
        <div className="info">
          <h5>{props.title}</h5>
          <p className="autor">
            Por {props.nombre_profesor} | {props.fecha}
          </p>
          <p ref={(node) => (refDescripcion.current = node)}  className="curso-description overflow-hidden" style={{ minHeight: "140px", maxHeight: "140px" }}>{props.descripcion}  </p>

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
