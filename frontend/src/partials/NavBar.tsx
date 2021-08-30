import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { API } from "../config/config";

//Imagenes
import logo from "../images/logoFamirNav.png";
import logoResponsive from "../images/logoFamir.svg";

//Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faBars,
  faTimes,
  faDoorOpen,
  faUser,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AiOutlinePhone } from "react-icons/ai";
import { RiArrowDownSFill, RiArrowRightSFill } from "react-icons/ri";

import { Usuario } from "../interfaces/Usuario";
import { useUsuario } from "../auth/UsuarioProvider";
import auth from "../auth/auth";

const initialState: Usuario = {
  id_usuario: "",
  nombre: "",
  id_pais_nacimiento: "AF",
  id_pais_residencia: "AF",
  apellido: "",
  profesion: "",
  correo: "",
  telefono: "",
  habilitado_u: 1,
  rut: "",
  id_rango: 2,
  url_foto_usuario: "",
  authenticate: false,
};
const NavBar: React.FC = () => {
  const refSubItem = useRef<HTMLUListElement>(null);
  const refNavLateralSubItem = useRef<HTMLUListElement>(null);
  const refCloseButton = useRef<HTMLButtonElement>(null);
  const { usuario, loadUser, setUsuario } = useUsuario();
  const history = useHistory();
  // Para fijar el nav al scrollear la pagina
  window.onscroll = () => {
    if (window.scrollY >= 117) {
      document.querySelector("#navPrincipal")?.classList.add("fijar-nav");
      document
        .querySelector(".navigation-responsive")
        ?.classList.add("fijar-nav");
      return;
    }
    document.querySelector("#navPrincipal")?.classList.remove("fijar-nav");
    document
      .querySelector(".navigation-responsive")
      ?.classList.remove("fijar-nav");
  };

  // Para mostrar o ocultar la barra lateral
  const moverNavLateral = () => {
    const panel = document.querySelector(".navigation-left");
    panel?.classList.toggle("moverDerecha");
    panel?.classList.toggle("moverIzquierda");
  };

  //Desconectar
  const logout = async () => {
    const res = await Axios.get(`${API}/logout`, { withCredentials: true });
    if (res.data.success) {
      setUsuario(initialState);
      auth.setRango(2);
      auth.logOut();
      return history.push("/"); //<- Te regresa a la pagina principal
    }
  };

  // DesplegarMenu
  const disappearItem = (e: any) => {
    const lista = document.getElementById("itemsMenu");
    lista?.classList.toggle("d-none");
  };

  // SubItems Disappear
  const disappearSubItemFirst = (e: any) => {
    const subItem = document.getElementById("subItemsMenuFirst");
    subItem?.classList.toggle("d-none");
  };

  const disappearSubItemSecond = (e: any) => {
    const subItem = document.getElementById("subItemsMenuSecond");
    subItem?.classList.toggle("d-none");
  };

  // DesplegarMenu Responsive
  const disappearItemResponsive = (e: any) => {
    const lista = document.getElementById("itemsMenuResponsive");
    lista?.classList.toggle("d-none");
  };

  // SubItems Disappear Responsive
  const disappearSubItemFirstResponsive = (e: any) => {
    const subItem = document.getElementById("subItemsMenuFirstResponsive");
    subItem?.classList.toggle("d-none");
  };

  const disappearSubItemSecondResponsive = (e: any) => {
    const subItem = document.getElementById("subItemsMenuSecondResponsive");
    subItem?.classList.toggle("d-none");
  };

  const hiddenClick = () => {
    refSubItem.current?.classList.toggle("d-none");
  };

  const navLateralHiddenClick = () => {
    refNavLateralSubItem.current?.classList.toggle("d-none");
    refCloseButton.current?.click();
  };

  const closeLateralNav = () => {
    refCloseButton.current?.click();
  }

  return (
    <React.Fragment>
      <header className="header-area">
        {/* Logo y Boton Registrar   */}
        <div className="top-header">
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-12 h-100">
                <div className="header-content h-100 d-flex align-items-center justify-content-between">
                  <div className="logo-content align-self-cemter justify-content-start">
                    <Link className="logo-link" to="/">
                      <img className="logo" src={logo} alt="Logo FamirCentro" />
                      <img
                        className="logo-responsive"
                        src={logoResponsive}
                        alt="Logo FamirCentro"
                      />
                    </Link>
                  </div>
                  <div className="align-self-center justify-content-end">
                    {loadUser ? (
                      <>
                        {usuario.authenticate ? (
                          <>
                            {/* Admin */}
                            {usuario.id_rango === 1 ? (
                              <>
                                <Link
                                  className="login-button p-3 fs-3"
                                  to="/Dashboard"
                                >
                                  <FontAwesomeIcon icon={faTachometerAlt} />
                                </Link>
                              </>
                            ) : (
                              <></>
                            )}

                            {/* Perfil y logout */}
                            <Link
                              className="login-button p-3 fs-3"
                              to="/Perfil"
                            >
                              <FontAwesomeIcon icon={faUser} />
                            </Link>
                            <div
                              onClick={logout}
                              className="login-button d-inline-block p-3 fs-3"
                            >
                              <FontAwesomeIcon icon={faDoorOpen} />
                            </div>
                          </>
                        ) : (
                          // {/* //Cuando no lo está */}
                          <>
                            <Link className="login-button" to="/Iniciar">
                              Iniciar Sesión /
                            </Link>
                            <Link className="login-button" to="/Registrarse">
                              / Registrarse
                            </Link>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* NavBar */}
      <nav id="navPrincipal" className="navigation justify-content-center">
        <div className="left-side">
          <ul className="lista-enlace">
            <li className="lista-item">
              <Link className="item-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="lista-item">
              <Link className="item-link" to="/Nosotros">
                Nosotros
              </Link>
            </li>
            <li className="lista-item">
              <Link className="item-link" to="/Contactanos">
                Contáctanos
              </Link>
            </li>
            {/* <li className="lista-item"> <Link className="item-link" to="/Programa">Programa</Link> </li> */}
            <li className="lista-item">
              <Link
                className="item-link"
                to="#"
                role="button"
                onClick={disappearItem}
              >
                Programa <RiArrowDownSFill className="fs-5" />
              </Link>
              <ul
                className="content-lista d-none"
                id="itemsMenu"
                ref={refSubItem}
              >
                <li
                  onMouseEnter={disappearSubItemFirst}
                  onMouseLeave={disappearSubItemFirst}
                >
                  <Link
                    to="#"
                    role="button"
                    className="d-flex align-items-center"
                  >
                    Curso <RiArrowRightSFill className="fs-5" />
                  </Link>
                  <ul
                    className="content-lista d-none position-lista-start"
                    id="subItemsMenuFirst"
                  >
                    {/* <li><Link to="/Clases/Cursos/Asincronos">Asincrono</Link></li> */}
                    {/* <li><hr className="dropdown-divider" /></li> */}
                    <li>
                      <Link
                        to="/Clases/Cursos/Sincronicos"
                        onClick={hiddenClick}
                      >
                        Sincrónico
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li
                  onMouseEnter={disappearSubItemSecond}
                  onMouseLeave={disappearSubItemSecond}
                >
                  <Link
                    to="#"
                    role="button"
                    className="d-flex align-items-center"
                  >
                    Taller <RiArrowRightSFill className="fs-5" />
                  </Link>
                  <ul
                    className="content-lista d-none position-lista-end"
                    id="subItemsMenuSecond"
                  >
                    <li>
                      <Link
                        to="/Clases/Talleres/Asincronicos"
                        onClick={hiddenClick}
                      >
                        Asincrónico
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        to="/Clases/Talleres/Sincronicos"
                        onClick={hiddenClick}
                      >
                        Sincrónico
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <a
          href="https://wa.me/56973952562"
          target="_blank"
          rel="noopener noreferrer"
          className="right-side"
        >
          <div className="icon-phone">
            <AiOutlinePhone className="fs-3" />
          </div>
          <p className="phone">(+56) 973-952-562</p>
        </a>
      </nav>

      {/* NavBar Responsive */}
      <div className="navigation-responsive">
        <div className="left-side text-center">
          <button onClick={moverNavLateral} className="btn fs-3">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <a
          href="https://wa.me/56973952562"
          target="_blank"
          rel="noopener noreferrer"
          className="right-side"
        >
          <div className="icon-phone">
            <FontAwesomeIcon icon={faPhone} />
          </div>
        </a>
      </div>
      {/* Nav Lateral */}
      <nav className="navigation-left moverIzquierda" >
        <div className="w-100 d-flex justify-content-end">
          <button
            onClick={moverNavLateral}
            className="btn justify-content-end fs-3"
            ref={refCloseButton}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <ul className="d-flex flex-column pt-5 navigation-list">
          <li className="item-list">
            <Link className="item-link" to="/" onClick={closeLateralNav}>
              Inicio
            </Link>
          </li>
          <li className="item-list">
            <Link className="item-link" to="/Nosotros" onClick={closeLateralNav}>
              ¿Quienes Somos?
            </Link>
          </li>
          <li className="item-list">
            <Link className="item-link" to="/Contactanos" onClick={closeLateralNav}>
              Contáctanos
            </Link>
          </li>
          <li className="item-list">
            <Link
              className="item-link"
              to="#"
              role="button"
              onClick={disappearItemResponsive}
            >
              Programa <RiArrowDownSFill className="fs-5" />
            </Link>
            <ul
              className="content-lista-res d-none"
              id="itemsMenuResponsive"
              ref={refNavLateralSubItem}
            >
              <li onClick={disappearSubItemFirstResponsive}>
                <Link to="#" role="button">
                  Curso <RiArrowDownSFill className="fs-5" />
                </Link>
              </li>
              <ul
                className="d-none subItemMenu-resp"
                id="subItemsMenuFirstResponsive"
              >
                {/* <li><Link to="/curso/asincrono" role="button">Asincrono</Link></li>
                <li><hr className="dropdown-divider" /></li> */}
                <li>
                  <Link
                    to="/Clases/Cursos/Sincronicos"
                    onClick={navLateralHiddenClick}
                    role="button"
                  >
                    Sincrónico
                  </Link>
                </li>
              </ul>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li onClick={disappearSubItemSecondResponsive}>
                <Link to="#" role="button">
                  Taller <RiArrowDownSFill className="fs-5" />
                </Link>
              </li>
              <ul
                className="d-none subItemMenu-resp"
                id="subItemsMenuSecondResponsive"
              >
                <li>
                  <Link
                    to="/Clases/Talleres/Asincronicos"
                    onClick={navLateralHiddenClick}
                    role="button"
                  >
                    Asincrónico
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    to="/Clases/Talleres/Sincronicos"
                    onClick={navLateralHiddenClick}
                    role="button"
                  >
                    Sincrónico
                  </Link>
                </li>
              </ul>
            </ul>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
