import React from "react";
import { Link } from "react-router-dom";

// Interfaces
type props = { name: string; className: string };

const BotonPerfil: React.FC<props> = (props) => {
  return (
    <Link className={props.className} to="/Perfil/Editar">
      {props.name}
    </Link>
  );
};

export default BotonPerfil;
