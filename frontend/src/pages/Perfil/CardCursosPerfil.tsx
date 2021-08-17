/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

//Componentes
import ListFavoritos from "./ListFavoritos";
import ListMisCursos from "./ListMisCursos";

import { useUsuario } from "../../auth/UsuarioProvider";

// Services
import * as cursosServices from "../../services/ComprobanteServices";

// Interfaces
import { Curso } from "../../interfaces/Curso";

const CardCursosPerfil: React.FC = () => {
  const { usuario, loadUser } = useUsuario();
  const [cursos, setCursos] = useState<Curso[]>([]);

  const getCursosByEstudiante = async () => {
    const res = await cursosServices.getUsuarioCursoByIdEstudiante(usuario.id_usuario + "");
    setCursos(res.data);
  };

  useEffect(() => {
    if (loadUser) getCursosByEstudiante();
    return () => {
      if (loadUser) setCursos([]);
    };
  }, [loadUser]);

  const showInfoFirst = () => {
    document.getElementById("body-2")?.classList.add("d-none");
    document.getElementById("body-1")?.classList.remove("d-none");
    document.getElementById("btn-1")?.classList.add("active");
    document.getElementById("btn-2")?.classList.remove("active");
  };

  const showInfoSecond = () => {
    document.getElementById("body-1")?.classList.add("d-none");
    document.getElementById("body-2")?.classList.remove("d-none");
    document.getElementById("btn-2")?.classList.add("active");
    document.getElementById("btn-1")?.classList.remove("active");
  };

  return (
    <div className="card text-center">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <button className="nav-link active" id="btn-1" onClick={showInfoFirst}>
              Mis Cursos
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" id="btn-2" onClick={showInfoSecond}>
              Cursos Favoritos
            </button>
          </li>
        </ul>
      </div>
      <div className="card-body desplegar" id="body-1">
        {cursos.length === 0 ? (
          <></>
        ) : (
          <>
            {cursos.map((curso) => {
              if (curso.favorito === 0) return <ListMisCursos refresh={getCursosByEstudiante} key={curso.id_curso} curso={curso} />;
              return <></>;
            })}
          </>
        )}
      </div>
      <div className="card-body d-none desplegar" id="body-2">
        {cursos.length === 0 ? (
          <></>
        ) : (
          <>
            {cursos.map((curso) => {
              if (curso.favorito === 1) return <ListFavoritos refresh={getCursosByEstudiante} key={curso.id_curso} curso={curso} />;
              return <></>;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default CardCursosPerfil;
