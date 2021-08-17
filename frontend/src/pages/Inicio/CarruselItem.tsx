import React from "react";

// Interfaces
interface Props {
  img: string;
  subtitle: string;
  title: string;
}

const CarruselItem: React.FC<Props> = (props) => {
  return (
    <div className="carousel-item carrousel-item" style={{ backgroundImage: `url(${props.img})`, height: 600 }}>
      <div className="carrousel-text row h-100 align-items-center">
        <div className="col-12">
          <h5 className="carrousel-title">{props.title}</h5>
          <p className="carrousel-subtitle">{props.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default CarruselItem;
