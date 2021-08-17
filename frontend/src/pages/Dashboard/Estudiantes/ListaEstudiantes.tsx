/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

//Services
import * as estudianteServices from "../../../services/EstudianteService";

//Componentes
import EstudianteItem from "./EstudianteItem";

//Interfaces
import { Usuario } from "../../../interfaces/Usuario";

interface Props {
  funcion: (estudiante: Usuario) => void;
  filtro: string;
}

const ListaEstudiantes: React.FC<Props> = (props) => {
  const [estudiantes, setEstudiantes] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);

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

  //Traer datos de la bd
  const loadEstudiantes = async () => {
    const res = await estudianteServices.getAll(page, props.filtro);
    setEstudiantes(res.data);
    setLoading(true);
  };
  const getCantidad = async () => {
    const res = await estudianteServices.getCount(props.filtro);
    setCantidad(res.data);
    setCantidadPaginas(Math.ceil(res.data / 12));
  };
  const limpieza = () => {
    setEstudiantes([]);
    setLoading(false);
  };

  //Cuando cargue
  useEffect(() => {
    loadEstudiantes();
    return () => limpieza();
  }, [page, props.filtro]);

  useEffect(() => {
    setPage(1);
    setCantidadPaginas(0);
    getCantidad();
    return () => {
      setCantidad(0);
      setCantidadPaginas(0);
      setPage(1);
    };
  }, [props.filtro]);

  // Estudiantes
  return (
    <>
      <table className="table table-bordered table-hover">
        <caption>Cantidad de estudiantes: {cantidad}</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>APELLIDOS</th>
            <th>CORREO</th>
            <th>PROFESION</th>
            <th className="text-center" style={{ width: 130 }}>
              VER MÁS
            </th>
            <th className="text-center" style={{ width: 130 }}>
              DESHABILITAR
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
              {estudiantes.length === 0 ? (
                <>
                  <tr>
                    <td>No hay estudiantes registrados aún</td>
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
                  {estudiantes.map((estudiante) => {
                    return <EstudianteItem cargaDatos={loadEstudiantes} funcion={props.funcion} estudiante={estudiante} key={estudiante.id_usuario} />;
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

export default ListaEstudiantes;
