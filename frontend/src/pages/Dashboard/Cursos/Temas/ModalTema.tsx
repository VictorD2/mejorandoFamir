/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Vimeo } from "vimeo";
import VimeoKeys from "../../../../interfaces/Vimeo";
//
import * as temaServices from "../../../../services/TemaServices";

// Icons
import { FaEdit, FaPlus } from "react-icons/fa";

// Toastify
import { toast } from "react-toastify";

// Interfaces
import { Modulo } from "../../../../interfaces/Modulo";
import { Tema } from "../../../../interfaces/Tema";
import { Curso } from "../../../../interfaces/Curso";

interface Props {
  curso: Curso;
  count: number;
  setcount: (count: number) => void;
  moduloModal: Modulo;
  temaModal: Tema;
}

const initialState = {
  titulo: "",
  descripcion: "",
  video: [new File([""], "filename")],
  url_video: "",
};

const ModalTema: React.FC<Props> = (props) => {
  const refBtnClose = useRef<HTMLButtonElement | null>();
  const refInput = useRef<HTMLInputElement | null>();
  const refProgresss = useRef<HTMLDivElement | null>();

  const [tema, setTema] = useState<Tema>(initialState);

  useEffect(() => {
    setTema(props.temaModal);
    return () => {};
  }, [props.temaModal]);

  //Submit
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let client = new Vimeo(VimeoKeys.CLIENT_ID, VimeoKeys.CLIENT_SECRET, VimeoKeys.CLIENT_TOKEN);
    let file_name = new File([""], "filename");
    if (tema.video) file_name = tema.video[0];
    if (!props.temaModal.id_tema) {
      client.upload(
        file_name,
        {
          name: tema.titulo,
          description: tema.descripcion,
          // opciones embebidas
          embed: {
            buttons: {
              like: false, //Me gusta
              watchlater: false, //Ver despues
              share: false, //Compartir
              embed: false, //Insertar
              hd: true,
              fullscreen: true,
              scaling: true,
            },
            logos: {
              vimeo: false, //Logo de vimeo
              custom: {
                active: true,
                link: "https://www.facebook.com/famircentro",
                sticky: false,
              },
            },
            title: {
              name: "hide",
              owner: "hide",
              portrait: "hide",
            },
            privacy: {
              download: false,
            },
          },
        },
        // Terminó de subirse
        async (uri) => {
          // Privacidad del video
          client.request({ method: "PATCH", path: uri, query: { privacy: { view: "disable" } } }, (error, body, status_code, headers) => {});

          // Whitelist
          client.request({ method: "PUT", path: uri + "/privacy/domains/famircentro.com" }, (error, body, status_code, headers) => {
            client.request({ method: "PATCH", path: uri, query: { privacy: { embed: "whitelist" } } }, (error, body, status_code, headers) => {});
          });

          // Meter el video en su carpeta correspondiente
          client.request({ method: "PUT", path: props.curso.uri_carpeta_vimeo + "/" + uri }, (error, body, status_code, headers) => {});

          // Own DB
          const res = await temaServices.crearTema(tema, uri, props.moduloModal.id_modulo + "");
          props.setcount(props.count + 1);
          if (res.data.error) return toast.error(res.data.error);

          if (refBtnClose.current) refBtnClose.current.click();
          borrarInputFile(); //Borrando el valor del input file
          if (refProgresss.current) {
            refProgresss.current.innerHTML = "0%";
            refProgresss.current.style.width = "0%";
          }
          setTema(initialState);
          props.setcount(props.count + 1);
          toast.success(res.data.success);
          return;
        },

        // Va cargando
        (bytes_uploaded, bytes_total) => {
          let percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
          if (refProgresss.current) {
            refProgresss.current.style.width = `${percentage}%`;
            refProgresss.current.innerHTML = percentage;
          }
        },
        // Error
        (error) => {
          toast.error(error);
          console.log("Failed because: " + error);
        }
      );
      return;
    }

    //Editar
    if (tema.video) {
      //Si hay un video
      client.replace(
        file_name, //Archivo
        tema.url_video, //Id del video a reemplazar
        { name: tema.titulo, description: tema.descripcion }, //Descripcion
        async (uri) => {
          // Own DB
          const res = await temaServices.editarTema(tema.id_tema + "", tema);
          props.setcount(props.count + 1);
          if (res.data.error) return toast.error(res.data.error);

          client.request({ method: "PATCH", path: uri, query: {} }, (error, body, status_code, headers) => {
            // console.log(uri + " will now require a password to be viewed on Vimeo.");
          });
          if (refBtnClose.current) refBtnClose.current.click();
          borrarInputFile(); //Borrando el valor del input file
          if (refProgresss.current) {
            refProgresss.current.innerHTML = "0%";
            refProgresss.current.style.width = "0%";
          }
          setTema(initialState);
          props.setcount(props.count + 1);
          toast.success(res.data.success);
          return;
        },

        // Va cargando
        (bytes_uploaded, bytes_total) => {
          let percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
          if (refProgresss.current) {
            refProgresss.current.style.width = `${percentage}%`;
            refProgresss.current.innerHTML = percentage;
          }
        },
        // Error
        (error) => {
          toast.error(error);
          console.log("Failed because: " + error);
        }
      );
    } else {
      const res = await temaServices.editarTema(props.temaModal.id_tema + "", tema);
      props.setcount(props.count + 1);
      if (refInput.current) refInput.current.value = "";
      if (res.data.error) return toast.error(res.data.error);
      if (refBtnClose.current) refBtnClose.current.click();
      borrarInputFile(); //Borrando el valor del input file
      if (refProgresss.current) {
        refProgresss.current.innerHTML = "0%";
        refProgresss.current.style.width = "0%";
      }
      toast.success(res.data.success);
    }
  };

  const borrarInputFile = () => {
    if (refInput.current) refInput.current.value = "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTema({ ...tema, [e.target.name]: e.target.value });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setTema({ ...tema, [e.target.name]: e.target.files });
  };

  return (
    <div className="modal fade" id="crearTema" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {props.temaModal.id_tema ? (
            <>
              <div className="modal-header btn-warning">
                <h5 className="modal-title" id="exampleModalLabel">
                  <FaEdit className="mb-1" /> Modificar Tema
                </h5>
                <button type="button" onClick={() => borrarInputFile()} className="btn-close btn-close-dark" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </>
          ) : (
            <>
              <div className="modal-header btn__blue">
                <h5 className="modal-title" id="exampleModalLabel">
                  <FaPlus className="mb-1" /> Crear Tema
                </h5>
                <button type="button" onClick={() => borrarInputFile()} className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </>
          )}
          <form onSubmit={handleFormSubmit}>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input onChange={handleInputChange} id="floatingInputTitulo" className="form-control" type="text" placeholder="Título" name="titulo" required value={tema.titulo} />
                <label htmlFor="floatingInputTitulo">Título del tema</label>
              </div>
              <div className="form-floating mb-3">
                <textarea onChange={handleInputChange} id="floatingInputDescripcion" className="form-control" placeholder="Descripción" name="descripcion" required value={tema.descripcion} />
                <label htmlFor="floatingInputDescripcion">Descripción del tema</label>
              </div>
              <div className="mb-3">
                <label htmlFor="formFileVideo" className="form-label">
                  Video
                </label>
                {props.temaModal.id_tema ? (
                  <>
                    <input onChange={handleFile} ref={(node) => (refInput.current = node)} id="formFileVideo" className="form-control" type="file" placeholder="Video" name="video" />
                  </>
                ) : (
                  <>
                    <input onChange={handleFile} ref={(node) => (refInput.current = node)} id="formFileVideo" className="form-control" type="file" placeholder="Video" name="video" required />
                  </>
                )}
              </div>
              <div className="progress">
                <div className="progress-bar" ref={(node) => (refProgresss.current = node)} role="progressbar" style={{ width: "0%" }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                  0%
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" ref={(node) => (refBtnClose.current = node)} className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              {props.temaModal.id_tema ? (
                <>
                  <button type="submit" className="btn btn__amarillo">
                    <FaEdit className="mb-1" /> Modificar
                  </button>
                </>
              ) : (
                <>
                  <button type="submit" className="btn btn__blue">
                    <FaPlus className="mb-1" /> Crear
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalTema;
