/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ScrollReveal from "scrollreveal";

// Icons
import { BsChevronCompactDown } from "react-icons/bs";

// Componentes
import Badge from "../../components/Badge";
import CursoItem from "../../components/Cursos/CursoItem";
import Buscador from "../../components/Buscador";

//Services
import * as cursosServices from "../../services/CursosServices";

//Interfaces
import { Curso } from "../../interfaces/Curso";

interface Params {
  modalidad: string;
  tipo: string;
}

const Programa: React.FC = () => {
  const modalidades = ["Sincronicos", "Asincronicos", "Talleres", "Cursos"];

  const params = useParams<Params>();

  const history = useHistory();

  const [tipo, setTipo] = useState<string>("");
  const [modalidad, setModalidad] = useState<string>("");
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cargandoDatos, setCargandoDatos] = useState<boolean>(false);

  const [cantidadPaginas, setCantidadPaginas] = useState<number>(0);

  const [filtro, setFiltro] = useState<string>("");

  const buscar = (text: string) => setFiltro(text);

  // const [cantidadPaginas, setCantidadPaginas] = useState<number>(0)
  const [page, setPage] = useState<number>(1);
  const getCursos = async () => {
    const res = await cursosServices.getAllCursos(params.tipo, params.modalidad, page, filtro);
    if (res.data.error) return;

    for (let index = 0; index < res.data.length; index++) res.data[index].descripcion = formatingDescripcion(res.data[index].descripcion);
    setCursos(res.data.cursos);
    setCargandoDatos(true)
  };

  const cargarMasCursos = async () => {
    const res = await cursosServices.getAllCursos(params.tipo, params.modalidad, page + 1, filtro);
    if (res.data.error) return;
    for (let index = 0; index < res.data.length; index++) res.data[index].descripcion = formatingDescripcion(res.data[index].descripcion);
    setPage(page + 1);
    const newCursos: Curso[] = res.data.cursos;
    setCursos(cursos.concat(newCursos));
  };

  const getCantidad = async () => {
    const res = await cursosServices.getCount(params.tipo, params.modalidad, filtro);
    setCantidadPaginas(Math.ceil(res.data / 12));
  };

  const formatingDescripcion = (descripcion: string): string => {
    return descripcion.replace(/\n/g, "<br/>");
  };

  const settings = () => {
    params.modalidad === "Sincronicos" ? setModalidad("Sincrónicos") : setModalidad("Asincrónicos");
    params.tipo === "Talleres" ? setTipo("Talleres") : setTipo("Cursos");
  };

  useEffect(() => {
    if (filtro === "") window.scrollTo({ top: 0 });
    if (!modalidades.includes(params.modalidad) || !modalidades.includes(params.tipo) || (params.tipo === "Cursos" && params.modalidad === "Asincrónicos")) return history.push("/");
    getCursos();
    settings();
    return () => {
      setPage(1);
    };
  }, [params.modalidad, params.tipo, filtro]);

  useEffect(() => {
    setPage(1);
    setCantidadPaginas(0);
    getCantidad();
    return () => {
      setCantidadPaginas(0);
      setPage(1);
    };
  }, [params.modalidad, params.tipo, filtro]);
  useEffect(() => {
    const config = {
      duration: 1000,
      delay: 150,
      easing: "ease",
    };
    ScrollReveal().reveal(".show", config);
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <Badge name={`${tipo} ${modalidad}`} />
      <div className="w-100 d-flex justify-content-between">
        <div className="ms-auto buscador px-4 pe-lg-5 col-12 col-lg-3 col-md-5 col-sm-5">
          <Buscador tooltip="Buscar por nombre del curso" placeholder={`Buscar ${tipo} ${modalidad}`} funcion={buscar} />
        </div>
      </div>
      <div className="my-2 py-5">
        <div className="row m-0 py-5 px-lg-5 px-sm-5 px-2 justify-content-around" style={{ backgroundColor: "#eff3f5" }}>
          {cargandoDatos ? (
            <>
              {cursos.map((curso) => {
                return <CursoItem key={curso.id_curso} curso={curso} />;
              })}
            </>
          ) : (
            <>
              <div className="cargandoDatos mt-3 ms-1 col-12 col-sm-6 col-md-4 col-lg-3">

              </div>
              <div className="cargandoDatos mt-3 ms-1 col-12 col-sm-6 col-md-4 col-lg-3">

              </div>
              <div className="cargandoDatos mt-3 ms-1 col-12 col-sm-6 col-md-4 col-lg-3">

              </div>
              <div className="cargandoDatos mt-3 ms-1 col-12 col-sm-6 col-md-4 col-lg-3">

              </div>
              <div className="cargandoDatos mt-3 ms-1 col-12 col-sm-6 col-md-4 col-lg-3">

              </div>
              <div className="cargandoDatos mt-3 ms-1 col-12 col-sm-6 col-md-4 col-lg-3">

              </div>
            </>
          )}
        </div>
        <div className="text-center pt-3">
          {cantidadPaginas === 0 || cantidadPaginas === page ? (
            <></>
          ) : (
            <>
              <button
                onClick={() => {
                  cargarMasCursos();
                }}
                className="btn"
                style={{ color: "var(--azul-oscuro)" }}
              >
                <p className="m-0">Ver más cursos</p>
                <BsChevronCompactDown />
              </button>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Programa;
