import React from "react";

// Interfaces
interface Props {
  title: string;
  comentario: string;
  persona: string;
  rango: string;
  avatar: string;
}

const OpinionesItem: React.FC<Props> = (props) => {
  return (
    <div className="col-12 col-lg-6 show">
      <div className="d-flex opinion-item">
        <img className="avatar" src={props.avatar} alt="Foto" />
        <div>
          <h4>{props.title}</h4>
          <p>{props.comentario}</p>
          <h6>
            <span>{props.persona}</span>, {props.rango}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default OpinionesItem;
