import React from "react";
import fotoPrevia from "../images/espejo.jpg";
// Interfaces
interface myProps {
  img?: string;
  name?: string;
  apellido?: string;
  job?: string;
}

const CardTeacher: React.FC<myProps> = (props) => {
  return (
    <div className="card__teacher show">
      <img src={props.img === "" ? fotoPrevia : props.img} className="card-img-top shadow" alt="Profesor" />
      <div className="card-body">
        <h5 className="fs-4">
          {props.name ? <>{props.name}</> : <>{"Nombres"}</>} {props.apellido ? <>{props.apellido}</> : <>{"Apellidos"}</>}
        </h5>
        <span style={{ color: "#3dad0e" }}>{props.job ? <>{props.job}</> : <>{"Profesión"}</>}</span>
      </div>
    </div>
  );
};

export default CardTeacher;
