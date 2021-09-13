import React from "react";

//Iconos
import { faChalkboardTeacher, faHandsHelping, faPeopleArrows, faBookReader, faServer, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

//Componentes
import CursoItem from "./CursoItem";

const ListaCursos:React.FC = () => {
  return (
    <section className="w-100 lista-cursos">
      <div className="container">
        <div className="row mx-auto">
          <CursoItem icon={faChalkboardTeacher} title={"Capacitaciones"} descripcion={"Proceso que posibilita al capacitando la apropiación de ciertos conococimientos."} />
          <CursoItem icon={faHandsHelping} title={"Asesorías"} descripcion={"Brindar recomendaciones, sugerencias y consejos a nuestros clientes."} />
          <CursoItem icon={faPeopleArrows} title={"Psicología"} descripcion={"Analizar los procesos mentales y del comportamiento de los seres humanos."} />
          <CursoItem icon={faGraduationCap} title={"Psicopedagogía"} descripcion={"Estudia a la persona y su entorno en las distintas etapas de aprendizaje que abarca su vida."} />
          <CursoItem icon={faServer} title={"Digital"} descripcion={"Interacción que puede tener el ser humano con las computadoras o cualquier artilugio digital."} />
          <CursoItem icon={faBookReader} title={"Aprendizaje co-constructivo"} descripcion={"Teoría que se basa en la construcción del conocimiento, y no en su reproducción."} />
        </div>
      </div>
    </section>
  );
};

export default ListaCursos;
