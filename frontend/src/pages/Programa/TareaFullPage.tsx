/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Tarea } from "../../interfaces/Tarea";
import { FiSend } from "react-icons/fi";
import * as tareaServices from "../../services/TareaServices";
import * as cursosServices from "../../services/CursosServices";
import { MaterialTarea } from "../../interfaces/MaterialTarea";
import swal from "sweetalert";
import { API } from "../../config/config";
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
const TareaFullPage:React.FC = () => {
  const refDescripcion = useRef<HTMLParagraphElement | null>();
  const refInput = useRef<HTMLInputElement | null>();
  const params = useParams<Params>();
  const history = useHistory();
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
    const newDescripcion = res.data[0].descripcion_tarea.replace(/\n/g, "<br/>");
    if (refDescripcion.current) refDescripcion.current.innerHTML = newDescripcion;
    setTarea(res.data[0]);
  };
  const authentificar = async () => {
    const datos = await axios.get(`${API}/api/v0/usuarios/whoami`);
    if (datos.data.error) return history.push("/Iniciar");
    if (!datos.data.user.authenticate) return history.push("/Iniciar"); //Poner ! en produccion
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
    form.append("id_tarea", tarea.id_tarea + "");
    const res = await tareaServices.crearMaterialTarea(form);
    if (res.data.success) {
      borrarInputFile(); //Borrando el valor del input file
      swal({ title: "Hecho", text: res.data.success, icon: "success" });
      return;
    }
    if (res.data.error) {
      swal({ title: "Ups!", text: res.data.error, icon: "error" });
      return;
    }
  };

  return (
    <>
      <div className="p-5" style={{ marginTop: "5rem", background: "#eef3f6" }}>
        <div className="row">
          <div className="col-12 ps-5 col-sm-12 col-lg-12 mb-5">
            <div className="column-detail">
              <h3 className="fw-bold">{tarea.titulo_tarea}</h3>
              <p className="m-0 mt-5 fw-bold">Instrucciones:</p>
              <p ref={(node) => (refDescripcion.current = node)} style={{ textAlign: "justify" }} className="m-0"></p>
              <div className="row mt-5">
                <form onSubmit={handleFormSubmit}>
                  <label htmlFor="formFile" className="form-label">
                    Suba su archivo
                  </label>
                  <div className="mb-3 input-group w-50">
                    <input required name="material" onChange={handleFile} ref={(node) => (refInput.current = node)} id="formFile" type="file" className="form-control" />
                    <button type="submit" className="btn btn__blue">
                      <FiSend /> Enviar
                    </button>
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
