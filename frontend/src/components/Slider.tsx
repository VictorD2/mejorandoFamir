import React from "react";

//Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

//Imagenes
import img1 from "../images/1A.jpg";
import img2 from "../images/1B.jpg";
import img3 from "../images/1C.jpg";

const Slider: React.FC = () => {
  return (
    <div id="carouselExampleInterval" className="carousel slide mt-5 py-5 show" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img src={img1} className="d-block w-100" alt="br-1" />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img src={img2} className="d-block w-100" alt="br-2" />
        </div>
        <div className="carousel-item">
          <img src={img3} className="d-block w-100" alt="br-3" />
        </div>
      </div>
      <button className="btn__carrusel-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <div className="icon__carrusel d-flex align-items-center">
          <FontAwesomeIcon className="mx-auto" icon={faAngleLeft} />
        </div>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="btn__carrusel-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <div className="icon__carrusel d-flex align-items-center">
          <FontAwesomeIcon className="mx-auto" icon={faAngleRight} />
        </div>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
