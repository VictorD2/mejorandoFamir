/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { API } from "../../config/config";

//Iconos
import { FaDownload } from "react-icons/fa";

//Componentes
import Comentarios from "../Comentarios/Comentarios";

//Poster video
import poster from "./logoFamir.jpg";

//Toastify
import { ToastContainer } from "react-toastify";

//Services
import * as temaServices from "../../services/TemaServices";
import * as materialServices from "../../services/MaterialServices";
import * as cursosServices from "../../services/CursosServices";
// import axios from "axios";

//Interfaces
import { VideoJsPlayerOptions } from "video.js";
import { Tema } from "../../interfaces/Tema";
import { MaterialClase } from "../../interfaces/MaterialClase";

interface Params {
  idCurso: string;
}
interface Params {
  idTema: string;
}

const initialVideoState = {
  autoplay: false,
  preload: "none",
  controls: true,
  poster: poster,
  playbackRates: [0.5, 1, 1.25, 1.5, 2],
  sources: [
    {
      src: "",
      type: "video/mp4",
    },
  ],
};

const TemaFullPage: React.FC = () => {
  const params = useParams<Params>();

  const history = useHistory();

  const [tema, setTema] = useState<Tema>({ titulo: "", descripcion: "", url_video: "" });

  const refDesc = useRef<HTMLParagraphElement | null>();

  const [loadingVideo, setLoadingVideo] = useState<boolean>(false);
  const [material, setMaterial] = useState<MaterialClase[]>([]);
  const [settings, setSettings] = useState<VideoJsPlayerOptions>(initialVideoState);

  const getTema = async () => {
    const res = await temaServices.getTemaById(params.idTema);
    if (res.data.error) return history.push("/");
    res.data.tema.url_video = res.data.tema.url_video.slice(8, res.data.tema.url_video.length);

    res.data.tema.descripcion = res.data.tema.descripcion.replace(/\n/g, "<br/>");
    if (refDesc.current) refDesc.current.innerHTML = res.data.tema.descripcion;
    setTema(res.data.tema);

    setSettings({ ...settings, sources: [{ src: `${API}/video-lock?key=1v4g8h6vcesm&Tema=${res.data.tema.url_video}`, type: "video/mp4" }] });
    setLoadingVideo(true);

    const resMaterial = await materialServices.getMaterialByTemaId(params.idTema);
    if (res.data.error) return;
    setMaterial(resMaterial.data.material);
  };
  const authentificar = async () => {
    // const datos = await axios.get(`${API}/api/v0/usuarios/whoami`);
    // if (datos.data.error) return history.push("/Iniciar");
    // if (!datos.data.user.authenticate) return history.push("/Iniciar"); //Poner ! en produccion
    const res = await cursosServices.verificarSuscribcion(params.idCurso);
    if (!res.data) history.push(`/Clase/${params.idCurso}`); //Poner ! en produccion
  };
  useEffect(() => {
    window.scrollTo({ top: 0 });
    authentificar();
    getTema();
    return () => {
      setTema({ titulo: "", descripcion: "", url_video: "" });
      setLoadingVideo(false);
      setMaterial([]);
      setSettings(initialVideoState);
    };
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="p-2 p-lg-5" style={{ marginTop: "3rem", background: "#eef3f6" }}>
        <div className="row">
          <div className="col-12 col-sm-7 col-lg-7 mb-5">
            {loadingVideo ? (
              // width="550" height="470"
              <>
                <div className="w-100">
                  <iframe className="w-100 bg-white d-flex align-items-center video__reproductor" title={tema.titulo} src={`https://player.vimeo.com/video/${tema.url_video}`} frameBorder={0} allowFullScreen />
                </div>
              </>
            ) : (
              <>
                <div className="d-flex justify-content-center align-items-center bg-dark w-100" style={{ height: 430 }}>
                  <div className="loader"></div>
                </div>
              </>
            )}
            <div className="fw-bold fs-4 mt-2 text-capitalize">{tema?.titulo}</div>
            <ul className="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-info" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                  Información
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-material" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                  Material
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div style={{ textAlign: "justify" }} ref={(node) => (refDesc.current = node)} className="tab-pane fade show active" id="pills-info" role="tabpanel" aria-labelledby="pills-home-tab"></div>
              <div className="tab-pane fade" id="pills-material" role="tabpanel" aria-labelledby="pills-profile-tab">
                {material.map((material) => {
                  return (
                    <div key={material.id_material_clase} className="d-flex my-1">
                      <div className="list-group-item list-group-item-action btn__blue">
                        <a className="text-decoration-none d-flex justify-content-between" rel="noreferrer" href={material.url_material} target="_blank" download={material.nombre_material}>
                          <p className="text-nowrap text-truncate text-white m-0">{material.nombre_material}</p>
                          <FaDownload className="mt-1 text-white" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-5 col-lg-5">
            <Comentarios />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TemaFullPage;
