import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Imagenes
import logo from "../images/logoFamir.jpg";

// Iconos
import { FiFacebook } from "react-icons/fi";
import { CgMail } from "react-icons/cg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlinePhone } from "react-icons/ai";
import * as cursosServices from "../services/CursosServices";
interface CursoFooter {
  id_curso: number;
  url_foto_curso: string;
}
const Footer: React.FC = () => {
  const [cursos, setCursos] = useState<CursoFooter[]>([]);
  const getCursos = async () => {
    const res = await cursosServices.footer();
    if (res.data.error) return setCursos([]);
    setCursos(res.data);
  };
  useEffect(() => {
    getCursos();
    return () => setCursos([]);
  }, []);
  return (
    <>
      <div style={{ background: "#232323" }}>
        <div className="container">
          <footer className="footer py-4 py-md-5 py-lg-5 row">
            {/* Primera Fila */}
            <div className="col-12 col-md-6 col-lg-4 my-4 my-md-2 my-lg-3 footer-section">
              <div className="img-logo mx-auhref mb-4">
                <a href="/" className="text-decoration-none">
                  <img className="img-fluid sombra-blanca" src={logo} alt="Logo Famir Centro" />
                </a>
              </div>
              <p className="footer-text text-white-50 mt-5 mt-md-4 mt-lg-3 lh-lg pe-0 pe-md-4 pe-lg-4" style={{ textAlign: "justify" }}>
                FAMIR Centro se conforma por un equipo multidisciplinario que realiza capacitaciones y charlas con el objetivo de potenciar sus aprendizajes y entregar herramientas teóricas y prácticas relacionadas al ámbito educativo desde una mirada Psicológica y Psicopedagógica.
              </p>
              <ul className="footer-social-list d-flex">
                <li className="footer-social-list-item mx-2 fs-3">
                  <a href="https://www.facebook.com/famircentro" target="_BLANK" rel="noreferrer" className="text-decoration-none">
                    <FiFacebook className="mb-2 fs-4" />
                  </a>
                </li>
                <li className="footer-social-list-item mx-2 fs-3">
                  <a href="https://www.instagram.com/famircentro/" target="_BLANK" rel="noreferrer" className="text-decoration-none">
                    <FontAwesomeIcon icon={faInstagram} className="fs-4" />
                  </a>
                </li>
                <li className="footer-social-list-item mx-2 fs-3">
                  <a href="https://wa.me/56973952562" target="_BLANK" rel="noreferrer" className="text-decoration-none">
                    <FontAwesomeIcon icon={faWhatsapp} className="fs-4" />
                  </a>
                </li>
              </ul>
            </div>
            {/* Segunda Fila */}
            <div className="col-12 col-md-6 col-lg-2 my-4 my-md-2 my-lg-3 footer-section">
              <h6 className="footer-subtitle text-white fs-6 text-uppercase"> ENLACES </h6>
              <ul style={{ fontSize: "14px" }} className="footer-as-list ftr__list">
                <li className="footer-as-list-item my-3 my-md-2 my-lg-4">
                  <Link className="text-white-50 text-decoration-none text-uppercase" to="/">
                    Inicio
                  </Link>
                </li>
                <li className="footer-as-list-item my-3 my-md-2 my-lg-4">
                  <Link className="text-white-50 text-decoration-none text-uppercase" to="/Nosotros">
                    Nosotros
                  </Link>
                </li>
                <li className="footer-as-list-item my-3 my-md-2 my-lg-4">
                  <Link className="text-white-50 text-decoration-none text-uppercase" to="/Contactanos">
                    Contáctanos
                  </Link>
                </li>
                {/* <li className="footer-as-list-item my-3 my-md-2 my-lg-4">
                  <Link className="text-white-50 text-decoration-none text-uppercase" to="/Programa">
                    Programa
                  </Link>
                </li> */}
              </ul>
            </div>
            {/* Tercera Fila */}
            <div className="col-12 col-md-6 col-lg-3 my-4 my-md-2 my-lg-3 footer-section">
              <h6 className="footer-subtitle text-white text-uppercase">Cursos</h6>
              <div className="row px-2">
                {cursos.map((cursoItem) => {
                  return (
                    <div key={cursoItem.id_curso} className="col-6 col-sm-6 col-md-6 col-lg-6 my-3 my-md-2 my-lg-1">
                      <img className="img-fluid" src={cursoItem.url_foto_curso} alt="Logo Famir Centro" />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Cuarta Fila */}
            <div className="col-12 col-md-6 col-lg-3 my-4 my-lg-3 my-md-2 footer-section">
              <h6 className="footer-subtitle text-white text-uppercase">CONTACTO</h6>
              <div className="footer-contact">
                <p className="text-white-50 my-5 d-flex justify-content-start align-items-center">
                  <IoLocationOutline color={"#7ed958"} className="mx-2 fs-4" />
                  Santiago de Chile
                  <br /> Trujillo, Perú
                </p>
              </div>
              <div className="footer-contact d-flex text-white-50 my-5">
                <AiOutlinePhone color={"#7ed958"} className="mx-2 fs-4 my-auto" />
                <div className="d-grid">
                  <p className="m-0">
                    Chile:{" "}
                    <a href="https://wa.me/56973952562" target="_BLANK" rel="noreferrer" className="text-decoration-none text-white-50">
                      +56 973-952-562
                    </a>
                  </p>
                  <p className="m-0">
                    Perú:{" "}
                    <a href="https://wa.me/51991981242" target="_BLANK" rel="noreferrer" className="text-decoration-none text-white-50">
                      +51 991-981-242
                    </a>
                  </p>
                </div>
              </div>
              <div className="footer-contact">
                <p className="text-white-50 d-flex justify-content-start align-items-center">
                  <CgMail color={"#7ed958"} className="mx-2 fs-4" />
                  <a href="mailto:centrofamir@gmail.com" className="text-white-50" target="_blank" rel="noopener noreferrer">
                    centrofamir@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <div style={{ background: "#232323", color: "#FFFFFF80", height: "84px", borderTop: "1px solid #FFFFFF80 " }}>
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <p className="m-0">
            © 2021 <span style={{ color: "#7ed958" }}>NAZ-TEC</span>. All right reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
