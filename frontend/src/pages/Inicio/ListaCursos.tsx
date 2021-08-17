import React from "react";

//Iconos
import { faAddressCard, faGlobe, faMap, faPaperPlane, faServer, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

//Componentes
import CursoItem from "./CursoItem";

const ListaCursos:React.FC = () => {
  return (
    <section className="w-100 lista-cursos">
      <div className="container">
        <div className="row mx-auto">
          <CursoItem icon={faAddressCard} title={"Business School"} descripcion={"Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."} />
          <CursoItem icon={faGlobe} title={"Marketing"} descripcion={"Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."} />
          <CursoItem icon={faMap} title={"Photography"} descripcion={"Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."} />
          <CursoItem icon={faThumbsUp} title={"Social Media"} descripcion={"Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."} />
          <CursoItem icon={faServer} title={"Development"} descripcion={"Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."} />
          <CursoItem icon={faPaperPlane} title={"Design"} descripcion={"Cras vitae turpis lacinia, lacinia la cus non, fermentum nisi."} />
        </div>
      </div>
    </section>
  );
};

export default ListaCursos;
