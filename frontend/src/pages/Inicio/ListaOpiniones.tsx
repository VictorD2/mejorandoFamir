import React from "react";

// Imagenes
import fondo2 from "../../images/bg-2.jpg";
import avatar1 from "../../images/c1.jpg";
import avatar2 from "../../images/c2.jpg";
import avatar3 from "../../images/c3.jpg";
import avatar4 from "../../images/c4.jpg";

// Componentes
import OpinionesItem from "./OpinionesItem";

const ListaOpiniones: React.FC = () => {
  return (
    <section className="opinions" style={{ backgroundImage: `url(${fondo2})` }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="opinions-heading">
              <span className="show">Nuestros Testimonios</span>
              <h3 className="show">Vea lo que dicen nuestros clientes satisfechos sobre nosotros</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <OpinionesItem avatar={avatar1} rango={"Estudiante"} persona={"Anonimo"} title={"Agradecimiento"} comentario={"Miles de gracias por todo. Me encant贸 el curso y el carisma de todos ustedes. Que gusto y privilegio recibir conocimiento y capacitaci贸n por la profesora Miriam Rodriguez. Un abrazo y mi gratitud hacia ustedes."} />
          <OpinionesItem avatar={avatar2} rango={"Estudiante"} persona={"Mar铆a Jose Larraguibel"} title={"Increibles Talleres"} comentario={"Recomendadisimo! 馃専 馃憦 participe en el mismo taller y me gust贸 mucho, me entreg贸 muchas herramientas y conocimientos para el desempe帽o profesional, es un taller te贸rico y pr谩ctico!!! 馃憦馃挏 Muchas gracias"} />
          <OpinionesItem avatar={avatar3} rango={"Estudiante"} persona={"Alejandro Neikel S谩nchez"} title={"Contenido agradable"} comentario={"Tuve la oportunidad de participar de un curso de herramientas sociemocionales para abordar con estudiantes en el ingreso a clases o ahora de manera remota, y me pareci贸 muy bueno, bien participativo, pr谩ctico y con muy buen material para abordar esta importante dimensi贸n. Volver茅 a participar de otros cursos.."} />
          <OpinionesItem avatar={avatar4} rango={"Estudiante"} persona={"Vicky Robledo Madariaga"} title={"Muy Comprometidos"} comentario={"FAMIR, como entidad capacitadora, es excelente, responsables, creativos y serios en sus compromisos. Yo he sido alumna de sus talleres. MARAVILLOSO!!!"} />
        </div>
      </div>
    </section>
  );
};

export default ListaOpiniones;
