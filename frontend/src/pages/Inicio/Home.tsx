import React, { useEffect } from "react";

// Componentes
import Carrusel from "./Carrusel";
import ListaCursos from "./ListaCursos";
import ListaOpiniones from "./ListaOpiniones";
import ListaTopCursos from "./ListaTopCursos";

// Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUser, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

// ScrollReveal
import ScrollReveal from "scrollreveal";

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    //Para los efectos de aparicion
    const config = {
      duration: 1000,
      delay: 150,
      easing: "ease",
    };
    ScrollReveal().reveal(".show", config);
    return () => {};
  }, []);
  return (
    <React.Fragment>
      <Carrusel />
      <div className="w-100 h-100 d-flex justify-content-center">
        <div className="caracteristicas">
          <div className="d-flex justify-content-around align-items-center w-100 h-100 fila">
            <div className="w-100 caracteristicas-item">
              <FontAwesomeIcon className="fs-3" icon={faBook} />
              <h5 className="caracteristicas-text">Cursos Virtuales</h5>
            </div>
            <div className="w-100 caracteristicas-item">
              <FontAwesomeIcon className="fs-3" icon={faUser} />
              <h5 className="caracteristicas-text">Increíbles Profesores</h5>
            </div>
            <div className="w-100 caracteristicas-item">
              <FontAwesomeIcon className="fs-3" icon={faPhoneAlt} />
              <h5 className="caracteristicas-text">Amazing Teachers</h5>
            </div>
          </div>
        </div>
      </div>
      <ListaCursos />
      <ListaOpiniones />
      <ListaTopCursos />
    </React.Fragment>
  );
};

export default Home;
