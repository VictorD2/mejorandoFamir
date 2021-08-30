/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

// Componentes
import ContactoItem from "./ContactoItem";
import Buscador from "../../../components/Buscador";

// Icons
import { FaEye, FaTrashAlt } from "react-icons/fa";

// Toastify
import { ToastContainer } from "react-toastify";

// Services
import * as contactoServices from "../../../services/ContactoServices";
import { Link } from "react-router-dom";

// Interfaces
interface Contacto {
  id_contacto?: string;
  nombre: string;
  correo: string;
  mensaje: string;
}
const initialState: Contacto = {
  correo: "",
  mensaje: "",
  nombre: "",
};
const ContactoDash: React.FC = () => {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [loadContactos, setLoadContactos] = useState<boolean>(false);
  const [contacto, setContacto] = useState<Contacto>(initialState);
  const [filtro, setFiltro] = useState<string>("");

  const refMensaje = useRef<HTMLParagraphElement | null>();
  const [cantidad, setCantidad] = useState<number>(0);
  const [cantidadPaginas, setCantidadPaginas] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const paginaSiguiente = () => {
    if (page === cantidadPaginas) return;
    setPage(page + 1);
  };

  const paginaAnterior = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const getCantidad = async () => {
    const res = await contactoServices.getCount(filtro);
    setCantidad(res.data);
    setCantidadPaginas(Math.ceil(res.data / 12));
  };
  useEffect(() => {
    getAllContactos();
    return () => {
      setContactos([]);
      setContacto(initialState);
    };
  }, [page, filtro]);
  const buscar = (text: string) => setFiltro(text);

  useEffect(() => {
    setPage(1);
    setCantidadPaginas(0);
    getCantidad();
    return () => {
      setCantidad(0);
      setCantidadPaginas(0);
      setPage(1);
    };
  }, [filtro]);

  const getAllContactos = async () => {
    const res = await contactoServices.getAllContactos(page, filtro);
    if (res.data.error) return;
    for (let i = 0; i < res.data.length; i++) {
      const newMensaje = res.data[i].mensaje.replace(/\n/g, "<br/>");
      res.data[i].mensaje = newMensaje;
    }
    setContactos(res.data.contactos);
    setLoadContactos(true);
  };

  const changeModalContent = (contacto: Contacto) => {
    setContacto(contacto);
    if (refMensaje.current) refMensaje.current.innerHTML = contacto.mensaje;
  };

  return (
    <>
      <ToastContainer />
      <div className="content-wrapper" style={{ minHeight: 643 }}>
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 efecto_titulo">
                  <i className="nav-icon fas fa-envelope me-3" />
                  Mensajes de Contacto
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link className="link-normal" to="/">
                      Inicio
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link className="link-normal" to="/Dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Mensajes de Contacto</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* /.content-header */}

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 col-md-6"></div>
              <div className="col-lg-3 col-md-3 ms-auto">
                <Buscador placeholder={`Buscar contacto`} funcion={buscar} />
              </div>
            </div>
            <div className="row mt-5">
              <div className="table-responsive p-4">
                <table className="table table-striped table-light-gray table-bordered table-hover">
                  <caption>Cantidad de mensajes de contacto: {cantidad}</caption>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th style={{ minWidth: "500px" }}>Correo</th>
                      <th style={{ width: 130 }} className="text-center">
                        <FaEye className="mb-1" /> VER MÁS
                      </th>
                      <th style={{ width: 130 }} className="text-center">
                        <FaTrashAlt className="mb-1" /> ELIMINAR
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadContactos ? (
                      <>
                        {contactos.length === 0 ? (
                          <>
                            <tr>
                              <td>No hay mensajes aún</td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </>
                        ) : (
                          <>
                            {contactos.map((contacto) => {
                              return <ContactoItem getCantidad={getCantidad} page={page} getAllContactos={getAllContactos} changeModalContent={changeModalContent} contacto={contacto} key={contacto.id_contacto} />;
                            })}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <tr>
                          <td>Cargando Datos...</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
                <div className="d-flex justify-content-between">
                  {page === 1 ? (
                    <></>
                  ) : (
                    <>
                      <button onClick={() => { paginaAnterior(); }} className="btn btn__blue" >
                        <span aria-hidden="true">&laquo; Página Anterior</span>
                      </button>
                    </>
                  )}
                  {page === cantidadPaginas ? (
                    <></>
                  ) : (
                    <>
                      <button onClick={() => { paginaSiguiente(); }} className="btn btn__blue ms-auto" >
                        <span aria-hidden="true">Página Siguiente &raquo;</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="modalContacto" aria-labelledby="modalContactoLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header btn__blue">
                    <h5 className="modal-title" id="modalContactoLabel">
                      {contacto.nombre}
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="card mb-3">
                      <div className="g-0">
                        <div className="card-body">
                          <div className="d-flex">
                            <p className="m-0 text-uppercase fw-bold">Correo:</p>
                            <p className="ms-4">{contacto.correo}</p>
                          </div>
                          <div className="d-flex flex-column">
                            <p className="m-0 text-uppercase fw-bold">Mensaje:</p>
                            <p className="mt-2 px-5" ref={(node) => (refMensaje.current = node)} style={{ textAlign: "justify" }}></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactoDash;
