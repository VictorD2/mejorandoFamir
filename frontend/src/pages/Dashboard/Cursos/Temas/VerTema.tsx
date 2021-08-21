/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
// import { API } from "../../../config/config";
// import { Vimeo } from "vimeo";
//Iconos

//Componentes
// import VideoReproductor from "../../Helpers/VideoReproductor";
import MaterialClaseItem from "../MaterialClase/MaterialClaseItem";

//Services
import * as temaServices from "../../../../services/TemaServices";
import * as materialServices from "../../../../services/MaterialServices";

//Poster

//Interfaces
import { Tema } from "../../../../interfaces/Tema";
import { MaterialClase } from "../../../../interfaces/MaterialClase";
import { Link, useHistory } from "react-router-dom";

interface Params {
  idTema: string;
  modalidad: string;
  tipo: string;
  id: string;
}

const VerTema: React.FC = () => {
  const history = useHistory();
  const params = useParams<Params>();
  const refDesc = useRef<HTMLParagraphElement | null>();

  const [countMaterial, setCountMaterial] = useState<number>(0);
  const [tema, setTema] = useState<Tema>({ titulo: "", descripcion: "", url_video: "" });
  const [material, setMaterial] = useState<MaterialClase[]>([]);
  const [loadingVideo, setLoadingVideo] = useState<boolean>(false);

  useEffect(() => {
    getTema();
    return () => setTema({ titulo: "", descripcion: "", url_video: "" });
  }, []);

  useEffect(() => {
    getMaterial();
    return () => setMaterial([]);
  }, [countMaterial]);

  //Funciones

  const getTema = async () => {
    const res = await temaServices.getTemaById(params.idTema);
    if (res.data.error) return history.push("/Dashboard");

    res.data.tema.url_video = res.data.tema.url_video.slice(8, res.data.tema.url_video.length);
    res.data.tema.descripcion = res.data.tema.descripcion.replace(/\n/g, "<br/>");
    setTema(res.data.tema);

    if (refDesc.current) refDesc.current.innerHTML = res.data.tema.descripcion;
    setLoadingVideo(true);
  };

  const getMaterial = async () => {
    const res = await materialServices.getMaterialByTemaId(params.idTema);
    if (res.data.error) return;
    setMaterial(res.data.material);
  };

  return (
    <>
      <div className="content-wrapper" style={{ minHeight: 643 }}>
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 efecto_titulo">
                  <i className="nav-icon fas fa-book me-3" />
                  {tema.titulo}
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
                  <li className="breadcrumb-item">
                    <Link className="link-normal" to={`/Dashboard/${params.tipo}/${params.modalidad}`}>
                      {params.tipo} {params.modalidad}
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link className="link-normal" to={`/Dashboard/${params.tipo}/${params.modalidad}/Material/${params.id}`}>
                      Material
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Tema</li>
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
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <div className="row">
                  <div className="col-12">
                    {loadingVideo ? (
                      <>
                        <div className="w-100">
                          <iframe title={tema.titulo} src={`https://player.vimeo.com/video/${tema.url_video}`} width="540" height="310" frameBorder={0} allowFullScreen />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="d-flex justify-content-center align-items-center bg-dark w-100" style={{ height: 430 }}>
                          <div className="loader"></div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col-12 mt-3">
                    <p className="fs-4">Material:</p>
                    {material.map((material) => {
                      return <MaterialClaseItem setCountMaterial={setCountMaterial} countMaterial={countMaterial} key={material.id_material_clase} material_clase={material} />;
                    })}
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <div className="row">
                  <div className="col-12">
                    <p className="fs-4">Descripción:</p>
                    <p ref={(node) => (refDesc.current = node)} style={{ textAlign: "justify" }} className="fs-6"></p>
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

export default VerTema;
