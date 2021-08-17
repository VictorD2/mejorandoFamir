import React, { useEffect } from "react";

// Componentes
import Badge from "../../components/Badge";
import CardTeacher from "../../components/CardTeacher";
import Slider from "../../components/Slider";

//Import de img de ejemplo
import tea1 from "../../images/tea1.jpg";
import tea2 from "../../images/tea2.jpg";
import tea3 from "../../images/tea3.jpg";
import tea4 from "../../images/tea4.jpg";

import ScrollReveal from "scrollreveal";

const AboutUs: React.FC = () => {
  
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
    <>
      <Badge name="Nosotros" />

      <div className="Main__container">
        <div className="container text-center mt-5" style={{ marginBottom: "4.5rem" }}>
          <div className="row show">
            <h3 className="fw-bold fs-1">¿Quiénes somos?</h3>
          </div>

          <div className="row text__container lh-lg show" style={{ textAlign: "justify" }}>
            <div className="col-12">
              <p>FAMIR Centro se conforma por un equipo multidisciplinario que realiza capacitaciones y charlas con el objetivo de potenciar sus aprendizajes y entregar herramientas teóricas y prácticas relacionadas al ámbito educativo desde una mirada Psicológica y Psicopedagógica.</p>
            </div>
          </div>

          <div className="row mt-5 text__container lh-lg" style={{ textAlign: "justify" }}>
            <div className="col-md-6 vision-pRight">
              <div className="row">
                <h3 className="fw-bold fs-1 d-flex justify-content-center text-dark">Misión</h3>
              </div>
              <div className="row show" style={{ marginTop: "1.5rem" }}>
                <p>
                  FAMIR Centro, tiene como misión ofrecer servicios de enseñanza orientados a personas que necesitan perfeccionarse en el desarrollo de sus competencias laborales y de una mejor calidad de vida personal y familiar. El compromiso de FAMIR Centro consiste en brindar un servicio online eficiente y de calidad a las personas del área educativa, con actividades de formación, capacitación, atenciones especializadas, material educativo y consultoría, de forma coconstructiva, de reflexión
                  conjunta, acompañada y al alcance de todos. Para lograr su objetivo que se funda en la satisfacción integral de sus clientes, FAMIR Centro está conformado por un equipo humano de profesionales, multidisciplinario y comprometido con el resultado esperado por sus clientes.
                </p>
              </div>
            </div>
            <div className="col-md-6 vision-pLeft">
              <div className="row">
                <h3 className="fw-bold fs-1 d-flex justify-content-center text-dark">Visión</h3>
              </div>
              <div className="row show" style={{ marginTop: "1.5rem" }}>
                <p>
                  FAMIR Centro, tiene como visión ser una empresa líder en el mercado, capaz de resolver los requerimientos de capacitación y formación que satisfagan integralmente las necesidades de las personas que lo requieran, para elevar su nivel de conocimiento, mejorar su calidad de vida personal, familiar y laboral, y contribuir positivamente a la sociedad.Para lograr su compromiso, que busca siempre la satisfacción real de sus clientes, FAMIR Centro se basa en la vocación profesional,
                  el crecimiento y el desarrollo continuos de su equipo de trabajo, en estándares de calidad e innovación, en recursos tecnológicos para enseñanza – aprendizaje, y en el acompañamiento durante y después del servicio.
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <h3 className="fw-bold fs-1 mt-3">Nuestros Sellos y Valores</h3>
          </div>
          <div className="row mt-5 text__container lh-lg show" style={{ textAlign: "justify" }}>
            <div className="col-md-6 vision-pRight">
              <div className="row">
                <span className="fw-bold fs-3 text-secondary">TRABAJO EN EQUIPO</span>
              </div>
              <div className="row" style={{ marginTop: "1.5rem" }}>
                <p>Es el trabajo realizado por varias personas donde cada uno hace una parte, pero todos, tienen un mismo objetivo en común.</p>
              </div>
            </div>
            <div className="col-md-6 vision-pLeft">
              <div className="row">
                <span className="fw-bold fs-3 text-secondary">RESPETO</span>
              </div>
              <div className="row" style={{ marginTop: "1.5rem" }}>
                <p>Es la consideración y valoración que se le tiene a alguien o a algo, al que se le reconoce valor social o especial deferencia.</p>
              </div>
            </div>
          </div>

          <div className="row mt-5 text__container lh-lg show" style={{ textAlign: "justify" }}>
            <div className="col-md-6 vision-pRight">
              <div className="row">
                <span className="fw-bold fs-3 text-secondary">COMPROMISO</span>
              </div>
              <div className="row" style={{ marginTop: "1.5rem" }}>
                <p>Es la disposición y la pasión que se siente por su trabajo, y que se demuestra en la dedicación y el esfuerzo a la hora de realizar sus tareas.</p>
              </div>
            </div>
            <div className="col-md-6 vision-pLeft">
              <div className="row">
                <span className="fw-bold fs-3 text-secondary">CONOCIMIENTO</span>
              </div>
              <div className="row" style={{ marginTop: "1.5rem" }}>
                <p>Es la acción y efecto de adquirir y entregar información valiosa para comprender la realidad, a través de un aprendizaje continuo y de una enseñanza eficiente y de calidad.</p>
              </div>
            </div>
          </div>

          <div className="row mt-5 text__container lh-lg show" style={{ textAlign: "justify" }}>
            <div className="col-md-6 vision-pRight">
              <div className="row">
                <span className="fw-bold fs-3 text-secondary">INTEGRIDAD</span>
              </div>
              <div className="row" style={{ marginTop: "1.5rem" }}>
                <p>Es hacer lo correcto, es decir, hacer todo aquello que se considera bueno para uno mismo, pero sin afectar los intereses y los valores de otras personas.</p>
              </div>
            </div>
            <div className="col-md-6 vision-pLeft">
              <div className="row">
                <span className="fw-bold fs-3 text-secondary">EMPATÍA</span>
              </div>
              <div className="row" style={{ marginTop: "1.5rem" }}>
                <p>Es la voluntad de comprender los sentimientos y emociones de otros, buscando experimentar de forma objetiva y racional lo que siente otra persona.</p>
              </div>
            </div>
          </div>

          <Slider />
          <div className="row mt-5">
            <h3 className="fw-bold fs-1">Nuestros Docentes</h3>
          </div>
          <div className="row show" style={{ marginTop: "4.5rem" }}>
            <CardTeacher img={tea1} name="Maria teresa" job="Ingeniera" />
            <CardTeacher img={tea2} name="Simon Duval" job="Digital Proffesor" />
            <CardTeacher img={tea3} name="James Hogan" job="HTML Proffesor" />
            <CardTeacher img={tea4} name="Claudia Williams" job="Marketing Proffesor" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
