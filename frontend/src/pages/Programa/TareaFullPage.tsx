/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Tarea } from "../../interfaces/Tarea";
import { FiSend } from "react-icons/fi";
import * as tareaServices from "../../services/TareaServices";
import * as cursosServices from "../../services/CursosServices";
import { MaterialTarea } from "../../interfaces/MaterialTarea";
import swal from "sweetalert";
interface Params {
  idTarea: string;
  idCurso: string;
}
const initialStateTarea: Tarea = {
  titulo_tarea: "",
  descripcion_tarea: "",
  id_modulo: 0,
};
const initialStateTareaMaterial: MaterialTarea = {
  url_material: "",
  nombre: "",
  apellido: "",
  fecha_entrega: "",
  material: [new File([""], "filename")],
};
const TareaFullPage: React.FC = () => {
  const refDescripcion = useRef<HTMLParagraphElement | null>();
  const refInput = useRef<HTMLInputElement | null>();
  const params = useParams<Params>();
  const history = useHistory();
  const [cargandoTarea, setCargandoTarea] = useState<boolean>(false);
  const [tarea, setTarea] = useState<Tarea>(initialStateTarea);
  const [tareaMaterial, setTareaMaterial] = useState<MaterialTarea>(initialStateTareaMaterial);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    authentificar();
    getTarea();
    return () => {};
  }, [params.idTarea]);

  const getTarea = async () => {
    const res = await tareaServices.getTareasById(params.idTarea);
    if (res.data.error) return history.push("/");
    const newDescripcion = res.data.tarea.descripcion_tarea.replace(/\n/g, "<br/>");
    if (refDescripcion.current) refDescripcion.current.innerHTML = newDescripcion;
    setTarea(res.data.tarea);
    setCargandoTarea(true);
  };
  const authentificar = async () => {
    const res = await cursosServices.verificarSuscribcion(params.idCurso);
    if (!res.data) history.push(`/Clase/${params.idCurso}`); //Poner ! en produccion
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setTareaMaterial({ ...tareaMaterial, [e.target.name]: e.target.files });
  };
  const borrarInputFile = () => {
    if (refInput.current) refInput.current.value = "";
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    if (tareaMaterial.material) form.append("material_tarea", tareaMaterial.material[0]);
    form.append("fecha_entrega", new Date().toString());
    form.append("id_tarea", tarea.id_tarea + "");
    const res = await tareaServices.crearMaterialTarea(form);
    if (res.data.error) return swal({ title: "Ups!", text: res.data.error, icon: "error" });
    borrarInputFile(); //Borrando el valor del input file
    swal({ title: "Hecho", text: res.data.success, icon: "success" });
  };

  return (
    <>
      <div className="p-1 p-lg-5 mb-5" style={{ marginTop: "5rem", background: "#eef3f6" }}>
        <div className="row">
          <div className="col-12 ps-3 ps-lg-5 col-sm-12 col-lg-12 mb-5">
            <div className="column-detail">
              {cargandoTarea ? <h3 className="fw-bold">{tarea.titulo_tarea}</h3> : <div className="cargandoDatos" style={{ height: "50px" }}></div>}
              <p className="m-0 mt-5 fw-bold">Instrucciones:</p>
              {cargandoTarea ? <p ref={(node) => (refDescripcion.current = node)} style={{ textAlign: "justify" }} className="m-0"></p> : <div className="cargandoDatos" style={{ height: "200px" }}></div>}
              <div className="row mt-5">
                <form onSubmit={handleFormSubmit}>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label htmlFor="formFile" className="form-label">
                        Suba su archivo
                      </label>
                      <div className="mb-3 d-flex flex-lg-column flex-column align-items-start">
                        <input required name="material" onChange={handleFile} ref={(node) => (refInput.current = node)} id="formFile" type="file" className="form-control" />
                        <button type="submit" className="btn btn__blue mt-lg-3 mt-3">
                          <FiSend /> Enviar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TareaFullPage;
