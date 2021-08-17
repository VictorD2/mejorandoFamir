import React from "react";
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

const Footer: React.FC = () => {
  return (
    <footer className="footer p-4 p-md-5 p-lg-5 row">
      {/* Primera Fila */}
      <div className="col-12 col-md-6 col-lg-3 my-4 my-md-2 my-lg-3 footer-section">
        <div className="img-logo mx-auhref mb-5">
          <a href="/" className="text-decoration-none">
            <img className="img-fluid sombra-blanca" src={logo} alt="Logo Famir Centro" />
          </a>
        </div>
        <p className="footer-text text-white-50 mt-5 mt-md-4 mt-lg-3 lh-lg pe-0 pe-lg-5" style={{ textAlign: "justify" }}>
          FAMIR Centro se conforma por un equipo multidisciplinario que realiza capacitaciones y charlas con el objetivo de potenciar sus aprendizajes y entregar herramientas teóricas y prácticas relacionadas al ámbito educativo desde una mirada Psicológica y Psicopedagógica.
        </p>
        <ul className="footer-social-list d-flex">
          <li className="footer-social-list-item mx-2 fs-3">
            <a href="https://www.facebook.com/famircentro" target="_BLANK" rel="noreferrer" className="text-decoration-none">
              <FiFacebook className="mb-2" />
            </a>
          </li>
          <li className="footer-social-list-item mx-2 fs-3">
            <a href="https://www.instagram.com/famircentro/" target="_BLANK" rel="noreferrer" className="text-decoration-none">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li className="footer-social-list-item mx-2 fs-3">
            <a href="https://whatsapp.com" target="_BLANK" rel="noreferrer" className="text-decoration-none">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </li>
        </ul>
      </div>
      {/* Segunda Fila */}
      <div className="col-12 col-md-6 col-lg-3 my-4 my-md-2 my-lg-3 footer-section">
        <h6 className="footer-subtitle text-white fs-6 text-uppercase"> ENLACES </h6>
        <ul className="footer-as-list ftr__list">
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
          <li className="footer-as-list-item my-3 my-md-2 my-lg-4">
            <Link className="text-white-50 text-decoration-none text-uppercase" to="/Programa">
              Programa
            </Link>
          </li>
        </ul>
      </div>
      {/* Tercera Fila */}
      <div className="col-12 col-md-6 col-lg-3 my-4 my-md-2 my-lg-3 footer-section">
        <h6 className="footer-subtitle text-white text-uppercase">Cursos</h6>
        <div className="row px-2">
          <div className="col-4 col-sm-3 col-md-3 col-lg-3 my-3 my-md-2 my-lg-1">
            <img className="img-fluid img-thumbnail" src={logo} alt="Logo Famir Centro" />
          </div>
          <div className="col-4 col-sm-3 col-md-3 col-lg-3 my-3 my-md-2 my-lg-1">
            <img className="img-fluid img-thumbnail" src={logo} alt="Logo Famir Centro" />
          </div>
          <div className="col-4 col-sm-3 col-md-3 col-lg-3 my-3 my-md-2 my-lg-1">
            <img className="img-fluid img-thumbnail" src={logo} alt="Logo Famir Centro" />
          </div>
          <div className="col-4 col-sm-3 col-md-3 col-lg-3 my-3 my-md-2 my-lg-1">
            <img className="img-fluid img-thumbnail" src={logo} alt="Logo Famir Centro" />
          </div>
        </div>
      </div>
      {/* Cuarta Fila */}
      <div className="col-12 col-md-6 col-lg-3 my-4 my-lg-3 my-md-2 footer-section">
        <h6 className="footer-subtitle text-white text-uppercase">CONTACTO</h6>
        <div className="footer-contact">
          <p className="text-white-50 d-flex justify-content-start align-items-center">
            <IoLocationOutline className="mx-2 fs-4" />
            4127/ 5B-C Mislane Road, Gibraltar, UK
          </p>
        </div>
        <div className="footer-contact">
          <p className="text-white-50 d-flex justify-content-start align-items-center">
            <AiOutlinePhone className="mx-2 fs-4" />
            Main: 203-808-8613
            <br />
            Office: 203-808-8648
          </p>
        </div>
        <div className="footer-contact">
          <p className="text-white-50 d-flex justify-content-start align-items-center">
            <CgMail className="mx-2 fs-4" />
            centrofamir@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
