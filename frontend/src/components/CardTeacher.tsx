import React from "react";

// Interfaces
interface myProps {
  img: string;
  name: string;
  job: string;
}

const CardTeacher:React.FC<myProps> = (props) => {
  return (
    <div className="card__teacher show">
      <img src={props.img} className="card-img-top" alt="Profesor" />
      <div className="card-body">
        <h5 className="fs-4">{props.name}</h5>
        <span style={{ color: "#3dad0e" }}>{props.job}</span>
      </div>
    </div>
  );
}


export default CardTeacher;
