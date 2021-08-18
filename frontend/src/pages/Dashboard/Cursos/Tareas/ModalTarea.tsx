/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { Modulo } from "../../../../interfaces/Modulo";
import { Tarea } from "../../../../interfaces/Tarea";
import * as tareaServices from "../../../../services/TareaServices";

interface Props {
  count: number;
  setcount: (count: number) => void;
  tareaModal: Tarea;
  moduloModal: Modulo;
}

const initialStateTarea: Tarea = {
  titulo_tarea: "",
  descripcion_tarea: "",
  id_modulo: 0,
};

const ModalTarea: React.FC<Props> = (props) => {
  const [tarea, setTarea] = useState(initialStateTarea);

  useEffect(() => {
    setTarea(props.tareaModal);
    return () => {};
  }, [props.tareaModal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!props.tareaModal.id_tarea) {
      const res = await tareaServices.crearTarea(tarea, props.moduloModal.id_modulo + "");
      if (res.data.error) return toast.error(res.data.error);
      props.setcount(props.count + 1);
      toast.success(res.data.success);
      return;
    }
    const res = await tareaServices.actualizarTarea(tarea);
    if (res.data.error) return toast.error(res.data.error);
    props.setcount(props.count + 1);
    toast.success(res.data.success);
  };

  return (
    <div className="modal fade" id="crearTarea" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {props.tareaModal.id_tarea ? (
            <>
              <div className="modal-header btn-warning">
                <h5 className="modal-title" id="exampleModalLabel">
                  <FiFilePlus className="mb-1" /> Modificar Tarea
                </h5>
                <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </>
          ) : (
            <>
              <div className="modal-header btn__blue">
                <h5 className="modal-title" id="exampleModalLabel">
                  <FiFilePlus className="mb-1" /> Crear Tarea
                </h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </>
          )}
          <form onSubmit={handleFormSubmit}>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input onChange={handleInputChange} id="floatingInputTitulo1" className="form-control" type="text" placeholder="Título" name="titulo_tarea" required value={tarea.titulo_tarea} />
                <label htmlFor="floatingInputTitulo1">Título de la tarea</label>
              </div>
              <div className="form-floating mb-3">
                <textarea onChange={handleInputChange} cols={30} rows={10} id="floatingInputTitulo1" className="form-control h-25" placeholder="Descripción" name="descripcion_tarea" required value={tarea.descripcion_tarea} />
                <label htmlFor="floatingInputTitulo1">Descripción de la tarea</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              {props.tareaModal.id_tarea ? (
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

export default ModalTarea;
