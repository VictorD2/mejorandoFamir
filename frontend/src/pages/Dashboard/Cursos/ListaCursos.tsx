/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

//Services
import * as cursoServices from "../../../services/CursosServices";

//Components
import CursoItem from "./CursoItem";

import { FaCalendarAlt, FaDollarSign, FaEdit, FaEye, FaTimes } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { IoNewspaperSharp } from "react-icons/io5";

//Interfaces
import { Curso } from "../../../interfaces/Curso";

interface Params {
  modalidad: string;
  tipo: string;
}
interface Props {
  filtro: string;
}

const ListaCursos: React.FC<Props> = (props) => {
  const modalidades = ["Sincronicos", "Asincronicos", "Talleres", "Cursos"];

  const params = useParams<Params>();

  const history = useHistory();

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalidad, setModalidad] = useState<string>();
  const [tipo, setTipo] = useState<string>();

  const [cantidad, setCantidad] = useState<number>(0);
  const [cantidadPaginas, setCantidadPaginas] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (!modalidades.includes(params.modalidad) || !modalidades.includes(params.tipo)) return history.push("/Dashboard"); //Validando ruta
    setModalidad(params.modalidad);
    setTipo(params.tipo);
    loadCursos();
    return () => limpieza();
  }, [params.modalidad, params.tipo, page, props.filtro]);

  useEffect(() => {
    setPage(1);
    setCantidadPaginas(0);
    getCantidad();
    return () => {
      setCantidad(0);
      setCantidadPaginas(0);
      setPage(1);
    };
  }, [params.modalidad, params.tipo, props.filtro]);

  //Funciones

  const getCantidad = async () => {
    const res = await cursoServices.getCount(params.tipo, params.modalidad, props.filtro);
    setCantidad(res.data);
    setCantidadPaginas(Math.ceil(res.data / 12));
  };

  const paginaSiguiente = () => {
    if (page === cantidadPaginas) return;
    setPage(page + 1);
  };

  const paginaAnterior = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  //Traer datos de la bd
  const loadCursos = async () => {
    const res = await cursoServices.getAllCursos(params.tipo, params.modalidad, page, props.filtro);
    setCursos(res.data);
    setLoading(true);
  };

  const limpieza = () => {
    setCursos([]);
    setLoading(false);
  };

  // Cursos
  return (
    <>
      <table className="table table-light-gray table-bordered table-hover">
        <caption>
          Cantidad de {params.tipo} {params.modalidad}: {cantidad}
        </caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th style={{ width: 130 }}>
              <FaDollarSign className="mb-1" /> PRECIO
            </th>
            {modalidad === "Sincronicos" ? (
              <>
                <th style={{ width: 130 }}>CAPACIDAD</th>
                <th style={{ width: 130 }}>
                  <FaCalendarAlt className="mb-1" /> HORARIO
                </th>
                <th style={{ width: 130 }}>
                  <FiClock className="mb-1" /> DURACIÓN
                </th>
              </>
            ) : (
              <></>
            )}
            <th className="text-center" style={{ width: 130 }}>
              <FaEdit className="mb-1" /> EDITAR
            </th>
            <th className="text-center" style={{ width: 130 }}>
              <FaEye className="mb-1" /> VER MÁS
            </th>
            <th className="text-center" style={{ width: 130 }}>
              <IoNewspaperSharp className="mb-1" /> MATERIAL
            </th>
            <th className="text-center" style={{ width: 180 }}>
              <FaTimes className="mb-1" /> DESHABILITAR
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            <>
              <tr>
                <td>Cargando datos...</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </>
          ) : (
            <>
              {cursos.length === 0 ? (
                <>
                  <tr>
                    <td>
                      No hay {tipo} {modalidad} registrados aún
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </>
              ) : (
                <>
                  {cursos.map((curso) => {
                    return <CursoItem cargaDatos={loadCursos} curso={curso} key={curso.id_curso} />;
                  })}
                </>
              )}
            </>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        {page === 1 ? (
          <></>
        ) : (
          <>
            <button
              onClick={() => {
                paginaAnterior();
              }}
              className="btn btn__blue"
            >
              <span aria-hidden="true">&laquo; Página Anterior</span>
            </button>
          </>
        )}
        {page === cantidadPaginas ? (
          <></>
        ) : (
          <>
            <button
              onClick={() => {
                paginaSiguiente();
              }}
              className="btn btn__blue ms-auto"
            >
              <span aria-hidden="true">Página Siguiente &raquo;</span>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ListaCursos;
