/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, FormEvent, useRef, RefObject } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

//Services
import * as profesorServices from "../../../services/ProfesoresServices";

//Icons
import { FaRegEdit, FaPlus } from "react-icons/fa";

//Toast
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

// CSS
import "react-toastify/dist/ReactToastify.css";
import "animate.css/animate.min.css";

//Interfaces
import { Usuario } from "../../../interfaces/Usuario";
import { API } from "../../../config/config";
import CardTeacher from "../../../components/CardTeacher";

// Regular Expression
import exprRegular from "../../../helpers/encrypt/regularExpr";

interface Params {
  id?: string;
}
interface Pais {
  id_pais: string;
  nombre_pais: string;
  url_foto_pais: string;
}
const FormProfesor: React.FC = () => {
  const initialState: Usuario = {
    nombre: "",
    apellido: "",
    correo: "",
    profesion: "",
    rut: "",
    telefono: "",
    id_pais_nacimiento: "AF",
    id_pais_residencia: "AF",
    url_foto_profesor: [new File([""], "filename")],
  };

  // History
  const history = useHistory();

  // States
  const [profesor, setProfesor] = useState<Usuario>(initialState);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [urlFotoPrevia, setUrlFotoPrevia] = useState<string>("");

  // References
  const refNameTeacher = useRef<HTMLDivElement>(null);
  const refSurnameTeacher = useRef<HTMLDivElement>(null);
  const refEmailTeacher = useRef<HTMLDivElement>(null);
  const refOccupationTeacher = useRef<HTMLDivElement>(null);
  const refPhoneTeacher = useRef<HTMLDivElement>(null);
  const refRutTeacher = useRef<HTMLDivElement>(null);

  // Params
  const params = useParams<Params>();

  useEffect(() => {
    getPaises();
    if (params.id) getProfesor(params.id); //Por si estoy en update
    return () => limpieza();
  }, [params.id]);

  const getPaises = async () => {
    const res = await axios.get(`${API}/api/v0/pais`);
    if (res.data.error) return;
    setPaises(res.data.paises);
  };

  //Traer los datos del profesor si está en update
  const getProfesor = async (id: string) => {
    const res = await profesorServices.getProfesorById(id);
    if (res.data.error) return history.push("/Dashboard/Profesores");
    setProfesor(res.data.profesor);
    setUrlFotoPrevia(res.data.profesor.url_foto_profesor);
  };

  const limpieza = () => setProfesor({});
  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfesor({ ...profesor, [e.target.name]: e.target.files });
      const url = URL.createObjectURL(e.target.files[0]);
      setUrlFotoPrevia(url);
    }
  };

  const validation = (expr: RegExp, event: EventTarget & (HTMLInputElement | HTMLSelectElement), ref: RefObject<HTMLDivElement>) => {
    if (expr.test(event.value)) return ref.current?.classList.add("d-none");
    return ref.current?.classList.remove("d-none");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfesor({ ...profesor, [e.target.name]: e.target.value });
    switch (e.target.name) {
      case "nombre":
        validation(exprRegular.nombre, e.target, refNameTeacher);
        break;
      case "apellido":
        validation(exprRegular.nombre, e.target, refSurnameTeacher);
        break;
      case "correo":
        validation(exprRegular.correo, e.target, refEmailTeacher);
        break;
      case "profesion":
        validation(exprRegular.nombre, e.target, refOccupationTeacher);
        break;
      case "telefono":
        validation(exprRegular.telefono, e.target, refPhoneTeacher);
        break;
      case "rut":
        validation(exprRegular.rut, e.target, refRutTeacher);
        break;
    }
  };

  //Evento submit
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.append("nombre", profesor.nombre + "");
    form.append("apellido", profesor.apellido + "");
    form.append("telefono", profesor.telefono + "");
    form.append("rut", profesor.rut + "");
    form.append("profesion", profesor.profesion + "");
    form.append("correo", profesor.correo + "");
    form.append("id_pais_nacimiento", profesor.id_pais_nacimiento + "");
    form.append("id_pais_residencia", profesor.id_pais_residencia + "");
    if (profesor.url_foto_profesor) form.append("url_foto_profesor", profesor.url_foto_profesor[0]);

    if (!(exprRegular.nombre.test(profesor.nombre + "") && exprRegular.nombre.test(profesor.apellido + "") && exprRegular.correo.test(profesor.correo + "") && exprRegular.nombre.test(profesor.profesion + "") && exprRegular.telefono.test(profesor.telefono + "") && exprRegular.rut.test(profesor.rut + "") && profesor.id_pais_nacimiento && profesor.id_pais_residencia)) return toast.error("Campos invalidos");
    if (!params.id) {
      const res = await profesorServices.crearProfesor(form);
      if (res.data.error) return toast.error(res.data.error);
      return toast.success(res.data.success);
    }
    const res = await profesorServices.updateProfesor(params.id, form);
    if (res.data.error) return toast.error(res.data.error);
    toast.success(res.data.success);
  };

  return (
    <>
      <ToastContainer />
      <div className="content-wrapper" style={{ minHeight: 643 }}>
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                {params.id ? (
                  <h1 className="m-0 efecto_titulo">
                    <i className="nav-icon fas fa-edit" /> Actualizar Profesor
                  </h1>
                ) : (
                  <h1 className="m-0 efecto_titulo">
                    <i className="nav-icon fas fa-plus" /> Crear Profesor
                  </h1>
                )}
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
                    <Link className="link-normal" to="/Dashboard/Profesores">
                      Profesores
                    </Link>
                  </li>
                  {params.id ? <li className="breadcrumb-item active">Actualizar</li> : <li className="breadcrumb-item active">Nuevo</li>}
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
              <div className="col-lg-4 col-md-6"></div>
              <div className="col-lg-3 col-md-3 ms-auto"></div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-floating mb-3 position-relative">
                    <input onChange={handleInputChange} id="floatingInputNombre" className="form-control" type="text" placeholder="Nombre" name="nombre" required value={profesor.nombre} />
                    <label htmlFor="floatingInputNombre">Nombre Profesor</label>
                    <div className="invalidText d-none" ref={refNameTeacher}>
                      Solo letras y espacios
                    </div>
                  </div>
                  <div className="form-floating mb-3 position-relative">
                    <input onChange={handleInputChange} id="floatingInputApellido" className="form-control" type="text" placeholder="Apellidos" name="apellido" required value={profesor.apellido} />
                    <label htmlFor="floatingInputApellido">Apellido Profesor</label>
                    <div className="invalidText d-none" ref={refSurnameTeacher}>
                      Solo letras y espacios
                    </div>
                  </div>
                  <div className="form-floating mb-3 position-relative">
                    <input onChange={handleInputChange} id="floatingInputEmail" className="form-control" type="email" placeholder="Email" name="correo" required value={profesor.correo} />
                    <label htmlFor="floatingInputEmail">Correo Electrónico</label>
                    <div className="invalidText d-none" ref={refEmailTeacher}>
                      Solo formato de correo name@example.com
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                    <select value={profesor.id_pais_nacimiento} id="floatingInputPais1" onChange={handleInputChange} className="form-select" name="id_pais_nacimiento">
                      {paises.map((pais) => {
                        return (
                          <option key={pais.id_pais} value={pais.id_pais}>
                            {pais.nombre_pais}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor="floatingInputPais1">Pais de Nacimiento</label>
                  </div>
                  <div className="form-floating mb-3">
                    <select value={profesor.id_pais_residencia} id="floatingInputPais" onChange={handleInputChange} className="form-select" name="id_pais_residencia">
                      {paises.map((pais) => {
                        return (
                          <option key={pais.id_pais} value={pais.id_pais}>
                            {pais.nombre_pais}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor="floatingInputPais">Pais de Residencia</label>
                  </div>
                  <div className="form-floating mb-3 position-relative">
                    <input onChange={handleInputChange} id="floatingInputProfesion" className="form-control" type="text" placeholder="Profesión" name="profesion" required value={profesor.profesion} />
                    <label htmlFor="floatingInputProfesion">Profesión</label>
                    <div className="invalidText d-none" ref={refOccupationTeacher}>
                      Solo letras y espacios
                    </div>
                  </div>
                  <div className="form-floating mb-3 position-relative">
                    <input onChange={handleInputChange} id="floatingInputTelefono" className="form-control" type="text" placeholder="Telefono" name="telefono" required value={profesor.telefono} />
                    <label htmlFor="floatingInputTelefono">Teléfono</label>
                    <div className="invalidText d-none" ref={refPhoneTeacher}>
                      Solo formato teléfonico
                    </div>
                  </div>
                  <div className="form-floating mb-3 position-relative">
                    <input onChange={handleInputChange} id="floatingInputRUT" className="form-control" type="text" placeholder="RUT" name="rut" required value={profesor.rut} />
                    <label htmlFor="floatingInputRUT">RUT</label>
                    <div className="invalidText d-none" ref={refRutTeacher}>
                      Solo dígitos de mínimo 8 hasta 10
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                    {params.id ? (
                      <>
                        <input onChange={handleInputFileChange} id="floatingInputFoto" className="form-control" type="file" placeholder="Foto" name="url_foto_profesor" />
                      </>
                    ) : (
                      <>
                        <input onChange={handleInputFileChange} id="floatingInputFoto" className="form-control" type="file" placeholder="Foto" name="url_foto_profesor" required />
                      </>
                    )}
                    <label htmlFor="floatingInputFoto">Foto Pública en la Página</label>
                  </div>
                  <div className="mb-3">
                    {params.id ? (
                      <button className="btn btn__blue">
                        <FaRegEdit className="fs-5 mb-1" /> Actualizar
                      </button>
                    ) : (
                      <button className="btn btn__blue">
                        <FaPlus className="fs-5 mb-1" /> Crear
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <div className="col-md-6 text-center" style={{ height: "40.51rem" }}>
                <div className="shadow-lg p-3 rounded h-100 d-flex align-items-center justify-content-center flex-column">
                  <h5 className="mb-5">Vista Previa</h5>
                  <CardTeacher img={urlFotoPrevia} name={profesor.nombre} apellido={profesor.apellido} job={profesor.profesion} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FormProfesor;
