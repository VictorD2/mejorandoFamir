/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ScrollReveal from "scrollreveal";

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

  const [filtro, setFiltro] = useState<string>("");

  const buscar = (text: string) => setFiltro(text);

  // const [cantidadPaginas, setCantidadPaginas] = useState<number>(0)
  const [page, setPage] = useState<number>(1);
  const getCursos = async () => {
    const res = await cursosServices.getAllCursos(params.tipo, params.modalidad, page, filtro);
    if (res.data.error) return;

    for (let index = 0; index < res.data.length; index++) res.data[index].descripcion = formatingDescripcion(res.data[index].descripcion);
    setCursos(res.data.cursos);
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
          <Buscador placeholder={`Buscar ${tipo} ${modalidad}`} funcion={buscar} />
        </div>
      </div>
      <div className="my-2 py-5">
        <div className="row m-0 py-5 px-lg-5 px-sm-5 px-2 justify-content-around" style={{ backgroundColor: "#eff3f5" }}>
          {cursos.map((curso) => {
            return <CursoItem key={curso.id_curso} curso={curso} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Programa;
