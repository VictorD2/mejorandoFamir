import React, { useEffect, useState } from "react";
import TopCursosItem from "./TopCursosItem";
import * as cursoServices from "../../services/CursosServices";
interface TopCurso {
  id_curso: number;
  nombre_curso: string;
  horario_curso: string;
  url_foto_curso: string;
  descripcion_curso: string;
  nombre_profesor: string;
  apellido_profesor: string;
}

const ListaTopCursos: React.FC = () => {
  const [topCurso, setTopCurso] = useState<TopCurso[]>([]);

  const getTopCursos = async () => {
    const res = await cursoServices.getTopCursos();
    for (let i = 0; i < res.data.length; i++) {
      const newDescripcion = res.data[i].descripcion_curso.replace(/\n/g, "<br/>");
      res.data[i].descripcion_curso = newDescripcion;
    }
    setTopCurso(res.data);
  };

  useEffect(() => {
    getTopCursos();
    return () => setTopCurso([]);
  }, []);

  if (topCurso.length > 0) {
    return (
      <section className="top-cursos">
        <div className="mx-1 px-1 mx-lg-5 px-lg-5">
          <div className="row">
            <div className="col-12">
              <div className="top-cursos-heading">
                <span className="show">Lo mejor</span>
                <h3 className="show">Nuestros Cursos</h3>
              </div>
            </div>
          </div>
          <div className="row">
            {topCurso.map((topCursoItem) => {
              return <TopCursosItem key={topCursoItem.id_curso} img={topCursoItem.url_foto_curso} fecha={topCursoItem.horario_curso ? new Date(topCursoItem.horario_curso).toLocaleString() : ""} url={"Clase/" + topCursoItem.id_curso} title={topCursoItem.nombre_curso} descripcion={topCursoItem.descripcion_curso} nombre_profesor={topCursoItem.nombre_profesor + " " + topCursoItem.apellido_profesor} btnTitle="Ver más" />;
            })}
          </div>
        </div>
      </section>
    );
  }
  return <></>;
};

export default ListaTopCursos;
