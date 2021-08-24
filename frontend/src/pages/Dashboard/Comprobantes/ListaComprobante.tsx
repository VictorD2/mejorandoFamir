/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { Comprobante } from "../../../interfaces/Comprobante";
import { RiFileForbidLine } from "react-icons/ri";
import * as comprobanteServices from "../../../services/ComprobanteServices";

//Interfaces
interface Props {
  comprobantes: Comprobante[];
  cambiarDatosModal: (id?: number) => void;
  page: number;
  setPage: (page: number) => void;
  estado: string;
}

const ListaComprobante: React.FC<Props> = (props) => {
  const [cantidadPaginas, setcantidadPaginas] = useState<number>(0);
  const [cantidad, setcantidad] = useState<number>(0);

  useEffect(() => {
    getCantidad();
    return () => {
      setcantidadPaginas(0);
      setcantidad(0);
    };
  }, [props.comprobantes]);

  const getCantidad = async () => {
    const res = await comprobanteServices.getCantidad(props.estado);
    setcantidad(res.data);
    setcantidadPaginas(Math.ceil(res.data / 12));
  };

  const paginaSiguiente = () => {
    if (props.page === cantidadPaginas) return;
    props.setPage(props.page + 1);
  };

  const paginaAnterior = () => {
    if (props.page === 1) return;
    props.setPage(props.page - 1);
  };

  return (
    <div className="row">
      {props.comprobantes.length === 0 ? (
        <>
          <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "74vh" }}>
            <RiFileForbidLine className="fs-1 mb-2" />
            <p className="fs-4">No hay comprobantes</p>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex">
            <div className="ms-auto">
              <div>Cantidad de comprobantes: {cantidad}</div>
            </div>
          </div>
          {props.comprobantes.map((comprobante) => {
            return (
              <div key={comprobante.id_comprobante} className="col-12 col-sm-6 col-lg-3 mb-5" style={{ maxHeight: "480px", minHeight: "480px" }}>
                <div className="card" style={{ maxHeight: "480px", minHeight: "480px" }}>
                  {comprobante.estado === "Aceptado" ? (
                    <>
                      <div className="card-header btn__verde bg-gradient">{comprobante.nombre_curso}</div>
                    </>
                  ) : (
                    <>
                      {comprobante.estado === "Rechazado" ? (
                        <>
                          <div className="card-header bg-danger bg-gradient text-white">{comprobante.nombre_curso}</div>
                        </>
                      ) : (
                        <>
                          <div className="card-header bg-gradient">{comprobante.nombre_curso}</div>
                        </>
                      )}
                    </>
                  )}
                  <div className="card-body d-flex justify-content-between flex-column">
                    <img src={comprobante.url_foto_comprobante} className="img-fluid" alt="" />
                    <p className="m-0 mt-auto">
                      <span className="fw-bold">Estudiante:</span>
                      {comprobante.nombre} {comprobante.apellido}
                    </p>
                  </div>
                  <div className="card-footer ms-auto">
                    <button onClick={() => props.cambiarDatosModal(comprobante.id_comprobante)} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn__blue">
                      <FontAwesomeIcon className="fs-6 me-1" icon={faFileAlt} /> Ver Comprobante
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="d-flex justify-content-between">
            {cantidadPaginas === 0 ? (
              <></>
            ) : (
              <>
                {props.page === 1 ? (
                  <></>
                ) : (
                  <>
                    <button onClick={() => { paginaAnterior(); }} className="btn btn__blue" >
                      <span aria-hidden="true">&laquo; Página Anterior</span>
                    </button>
                  </>
                )}
                {props.page === cantidadPaginas ? (
                  <></>
                ) : (
                  <>
                    <button onClick={() => { paginaSiguiente(); }} className="btn btn__blue ms-auto" >
                      <span aria-hidden="true">Página Siguiente &raquo;</span>
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ListaComprobante;
