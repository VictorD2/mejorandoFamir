import React from "react";

// Imagenes
import fondo2 from "../../images/bg-2.jpg";
import avatar1 from "../../images/t1.jpg";
import avatar2 from "../../images/t2.jpg";
import avatar3 from "../../images/t3.jpg";
import avatar4 from "../../images/t4.jpg";

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
          <OpinionesItem avatar={avatar1} rango={"Estudiante"} persona={"Maria Smith"} title={"Great teachers"} comentario={"Etiam nec odio vestibulum est mattis effic iturut magna. Pellentesque sit amet tellus blandit. Etiam nec odio vestibulum est mattis effic iturut magna. Pellentesque sit am et tellus blandit. Etiam nec odio vestibul. Etiam nec odio vestibulum est mat tis effic iturut magna."} />
          <OpinionesItem avatar={avatar2} rango={"Estudiante"} persona={"Maria Smith"} title={"Great teachers"} comentario={"Etiam nec odio vestibulum est mattis effic iturut magna. Pellentesque sit amet tellus blandit. Etiam nec odio vestibulum est mattis effic iturut magna. Pellentesque sit am et tellus blandit. Etiam nec odio vestibul. Etiam nec odio vestibulum est mat tis effic iturut magna."} />
          <OpinionesItem avatar={avatar3} rango={"Estudiante"} persona={"Maria Smith"} title={"Great teachers"} comentario={"Etiam nec odio vestibulum est mattis effic iturut magna. Pellentesque sit amet tellus blandit. Etiam nec odio vestibulum est mattis effic iturut magna. Pellentesque sit am et tellus blandit. Etiam nec odio vestibul. Etiam nec odio vestibulum est mat tis effic iturut magna."} />
          <OpinionesItem avatar={avatar4} rango={"Estudiante"} persona={"Maria Smith"} title={"Great teachers"} comentario={"Etiam nec odio vestbulum est mattis effic iturut magna. Pellentesque sit amet tellus blandit. Etiam nec odio vestibulum est mattis effic iturut magna. Pellentesque sit am et tellus blandit. Etiam nec odio vestibul. Etiam nec odio vestibulum est mat tis effic iturut magna."} />
        </div>
      </div>
    </section>
  );
};

export default ListaOpiniones;
