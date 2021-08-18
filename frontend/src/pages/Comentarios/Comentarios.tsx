/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useUsuario } from "../../auth/UsuarioProvider";
import malasPalabras from "naughty-words/es.json";

//Iconos
import { FaEnvelope, FaTimes } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

//Toastify
import { toast } from "react-toastify";

//Interfaces
import { Comentario } from "../../interfaces/Comentario";

//Services
import * as comentariosServices from "../../services/ComentariosServices";

//Components
import CajaComentario from "./CajaComentario";

//TimeAgo
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import vi from "timeago.js/lib/lang/es";
import swal from "sweetalert";
timeago.register("vi", vi);

const initialState: Comentario = {
  comentario: "",
  fecha: "",
  id_usuario: 0,
  id_rango: 0,
};
interface Params {
  idCurso: string;
  idTema: string;
}
const Comentarios: React.FC = () => {
  const { usuario } = useUsuario();

  const params = useParams<Params>();

  const [comentario, setComentario] = useState<Comentario>(initialState);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  const [page, setPage] = useState<number>(1);
  const [cantidad, setCantidad] = useState<number>(0);
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    getComentarios();
    return () => {
      setComentario(initialState);
      setComentarios([]);
    };
  }, [page]);

  useEffect(() => {
    getCantidad();
    return () => {
      setCantidad(0);
      setPage(1);
      setTrigger(0);
    };
  }, [trigger]);

  //Funciones
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comentario.comentario === "") return toast.warning("No ha escrito un comentario");
    const vocales = ["a", "e", "i", "o", "u"];
    for (let i = 0; i < malasPalabras.length; i++) {
      const element = malasPalabras[i];
      let elemento = element;
      if (vocales.includes(elemento.charAt(elemento.length - 1))) elemento = element.slice(0, element.length - 1);
      if (comentario.comentario.toLowerCase().includes(element.toLowerCase()) || comentario.comentario.toLowerCase().includes(elemento.toLowerCase())) {
        return swal({ title: "Advertencia", text: `No se permiten este tipo de comentarios: ${element}`, icon: "warning" });
      }
    }

    const res = await comentariosServices.crearComentario(comentario, params.idCurso, params.idTema);
    if (res.data.error) return swal({ title: "Ups!", text: `${res.data.error}`, icon: "error" });

    swal({ title: "Hecho!", text: `${res.data.success}`, icon: "success" });
    toast.success(res.data.success);
    getComentarios();
    setTrigger(trigger + 1);
    setComentario(initialState);
  };

  const getCantidad = async () => {
    const res = await comentariosServices.getCount(params.idCurso, params.idTema);
    setCantidad(res.data);
    setCantidad(Math.ceil(res.data / 4));
  };

  const eliminarComentario = async (id?: number) => {
    if (!window.confirm("¿Está seguro que desea eliminar el comentario?")) return;

    const res = await comentariosServices.eliminarComentario(id + "");
    if (res.data.error) return toast.error(res.data.error);

    getComentarios();
    setTrigger(trigger + 1);
    toast.success(res.data.success);
  };

  const getComentarios = async () => {
    const res = await comentariosServices.getAll(page, params.idCurso, params.idTema);
    if (res.data.error) return;
    
    setComentarios(res.data.comentarios);
  };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComentario({ ...comentario, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-100">
      <form onSubmit={handleFormSubmit} className="d-flex flex-column">
        <div className="form-floating w-100">
          <textarea onChange={handleTextArea} name="comentario" value={comentario.comentario} className="form-control" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
          <label htmlFor="floatingTextarea2">Escribe tu aporte o comentario</label>
        </div>
        <button className="btn btn__blue mt-1 ms-auto">
          <FaEnvelope className="mb-1" /> Enviar
        </button>
      </form>
      <div className="m-2 pe-4" style={{ minHeight: "550px", maxHeight: "550px", overflowX: "hidden" }}>
        {comentarios.map((comentarioItem) => {
          return (
            <div className="card my-3" key={comentarioItem.id_comentario}>
              <div className="px-3 pt-2 pb-3">
                <div className="author-info">
                  <div className="foto-author">
                    <figure className="figure">
                      <img className="img-fluid" src={comentarioItem.url_foto_usuario} alt="Foto Perfil" />
                    </figure>
                  </div>
                  <div className="nombre-author">
                    <p>
                      {comentarioItem.nombre} {comentarioItem.apellido}
                    </p>
                    {comentarioItem.id_rango === 1 ? (
                      <>
                        <p className="mt-1" style={{ color: "var(--verde-oscuro)" }}>
                          Administrador
                        </p>
                      </>
                    ) : (
                      <></>
                    )}
                    <TimeAgo style={{ fontSize: "12px" }} className="text-black-50" datetime={comentarioItem.fecha} live={false} locale="vi" />
                  </div>
                  {usuario.id_rango === 1 ? (
                    <>
                      <div className="ms-auto">
                        <button onClick={() => eliminarComentario(comentarioItem.id_comentario)} className="btn">
                          <FaTimes />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {comentarioItem.id_usuario === parseInt(usuario.id_usuario + "") ? (
                        <>
                          <div className="ms-auto">
                            <button onClick={() => eliminarComentario(comentarioItem.id_comentario)} className="btn">
                              <FaTimes />
                            </button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
                <CajaComentario comentario={comentarioItem.comentario} />
              </div>
            </div>
          );
        })}
      </div>
      {cantidad === page || cantidad === 0 ? (
        <></>
      ) : (
        <>
          <div className="w-100 d-flex justify-content-center p-2">
            <button
              onClick={() => {
                setPage(page + 1);
              }}
              className="btn btn__blue"
            >
              <FaChevronDown /> Ver más comentarios
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Comentarios;
