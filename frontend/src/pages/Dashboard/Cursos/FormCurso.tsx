/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent, useEffect, useRef, useState, RefObject } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Vimeo } from "vimeo";
import VimeoKeys from "../../../interfaces/Vimeo";

//Icons
import { FaPlus, FaRegEdit } from "react-icons/fa";

//Toastify
import { toast, ToastContainer } from "react-toastify";

//Services
import * as CursosServices from "../../../services/CursosServices";
import * as ProfesoresServices from "../../../services/ProfesoresServices";

//Interfaces
import { Curso } from "../../../interfaces/Curso";
import { Usuario } from "../../../interfaces/Usuario";

// Regular Expression
import exprRegular from "../../../helpers/encrypt/regularExpr";

interface Params {
  id?: string;
  modalidad?: string;
  tipo?: string;
}

const FormCurso: React.FC = () => {
  const initialState = {
    nombre_curso: "",
    uri_carpeta_vimeo: "",
    descripcion: "",
    precio: 0,
    duracion: 0,
    horario: "",
    enlace: "",
    capacidad: 0,
    id_usuario: 0,
    modulos: [],
    foto_curso: [new File([""], "filename")],
    url_foto_curso: "",
  };

  // Params
  const params = useParams<Params>();

  // History
  const history = useHistory();

  // States
  const [profesores, setProfesores] = useState<Usuario[]>([]);
  const [curso, setCurso] = useState<Curso>(initialState);
  const [modalidad, setModalidad] = useState("");
  const [tipo, setTipo] = useState("");

  // References
  const refInput = useRef<HTMLInputElement | null>();
  const refProgresss = useRef<HTMLDivElement | null>();
  const refSubjectName = useRef<HTMLDivElement>(null);
  const refSubjectPrice = useRef<HTMLDivElement>(null);
  const refSubjectDuration = useRef<HTMLDivElement>(null);
  const refSubjectCapacity = useRef<HTMLDivElement>(null);
  const refSubjectURL = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cargaProfesores();
    params.tipo === "Talleres" ? setTipo("Taller") : setTipo("Curso");
    params.modalidad === "Asincronicos" ? setModalidad("Asincrónico") : setModalidad("Sincrónico");
    if (params.id) getCurso(params.id); //Por si estoy en update
    return () => limpieza();
  }, [params.id, params.modalidad, params.tipo]);

  //Funciones
  const cargaProfesores = async () => {
    const res = await ProfesoresServices.getAll(0, "");
    if (res.data.error) return;
    if (!params.id) setCurso({ ...curso, id_usuario: res.data.profesores[0].id_usuario }); //Por si estoy en create
    setProfesores(res.data.profesores);
  };

  //Traer los datos del curso si esta en update
  const getCurso = async (id: string) => {
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const numeros2 = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23];
    const res = await CursosServices.getCursoById(id);
    if (res.data.error) return history.push("/Dashboard");
    if (res.data.curso.horario) {
      // const fecha = res.data.curso.horario.replace(" ", "T");
      const fecha = new Date(res.data.curso.horario);
      let cero = ``;
      let ceroHora = ``;
      let ceroDia = ``;
      if (numeros.includes(fecha.getDate())) ceroDia = "0";
      if (!(fecha.getMonth() + 1 === 10 || fecha.getMonth() + 1 === 11 || fecha.getMonth() + 1 === 12)) cero = `0`;
      if (!numeros2.includes(fecha.getHours())) ceroHora = `0`;
      const horario = `${fecha.getFullYear()}-${cero}${fecha.getMonth() + 1}-${ceroDia}${fecha.getDate()}T${ceroHora}${fecha.getHours()}:${fecha.getMinutes()}`;
      res.data.curso.horario = horario;
    }
    setCurso(res.data.curso);
  };

  const limpieza = () => {
    setCurso(initialState);
    setProfesores([]);
  };

  const borrarInputFile = () => {
    if (refInput.current) refInput.current.value = "";
  };

  const validation = (expr: RegExp, event: EventTarget & (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement), ref: RefObject<HTMLDivElement>) => {
    if (expr.test(event.value)) return ref.current?.classList.add("d-none");
    return ref.current?.classList.remove("d-none");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
    switch (e.target.name) {
      case "nombre_curso":
        validation(exprRegular.nombre, e.target, refSubjectName);
        break;
      case "precio":
        validation(exprRegular.precio, e.target, refSubjectPrice);
        break;
      case "duracion":
        validation(exprRegular.digitos, e.target, refSubjectDuration);
        break;
      case "capacidad":
        validation(exprRegular.digitos, e.target, refSubjectCapacity);
        break;
      case "enlace":
        validation(exprRegular.url, e.target, refSubjectURL);
        break;
    }
  };

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setCurso({ ...curso, [e.target.name]: e.target.files });
  };

  //Evento submit
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(exprRegular.nombre.test(curso.nombre_curso) && exprRegular.precio.test(curso.precio + "") && exprRegular.digitos.test(curso.duracion + "") && exprRegular.digitos.test(curso.capacidad + "") && exprRegular.url.test(curso.enlace) && curso.descripcion && curso.horario && profesores && curso.url_foto_curso)) return toast.error("Campos invalidos");

    let client = new Vimeo(VimeoKeys.CLIENT_ID, VimeoKeys.CLIENT_SECRET, VimeoKeys.CLIENT_TOKEN);
    const form = new FormData();
    form.append("nombre_curso", curso.nombre_curso);
    form.append("descripcion", curso.descripcion);
    form.append("precio", curso.precio + "");
    form.append("duracion", curso.duracion + "");
    form.append("enlace", curso.enlace);
    form.append("horario", new Date(curso.horario).toString());
    form.append("capacidad", curso.capacidad + "");
    form.append("id_usuario", curso.id_usuario + "");
    // Nuevo
    if (!params.id) {
      client.request(
        {
          method: "POST",
          path: "me/projects",
          query: { name: curso.nombre_curso },
        },
        async (error, body, status_code, headers) => {
          if (error) return toast.error(error);
          form.append("uri_carpeta_vimeo", body.uri);
          if (curso.foto_curso) form.append("fotoCurso", curso.foto_curso[0]);
          const res = await CursosServices.crearCurso(form, tipo, modalidad, refProgresss.current);
          if (res.data.error) return toast.error(res.data.error);
          borrarInputFile();
          if (refProgresss.current) {
            refProgresss.current.innerHTML = "0%";
            refProgresss.current.style.width = "0%";
          }
          return history.push(`/Dashboard/${params.tipo}/${params.modalidad}`);
        }
      );
    }

    // Editar
    client.request({ method: "PATCH", path: curso.uri_carpeta_vimeo, query: { name: curso.nombre_curso } }, async (error, body, status_code, headers) => {
      if (error) return toast.error(error);
      form.append("uri_carpeta_vimeo", body.uri);
      if (curso.foto_curso) form.append("fotoCurso", curso.foto_curso[0]);
      const res = await CursosServices.updateCurso(params.id, form, refProgresss.current);
      if (res.data.error) return toast.error(res.data.error);
      toast.success(res.data.success);
      borrarInputFile();
      if (refProgresss.current) {
        refProgresss.current.innerHTML = "0%";
        refProgresss.current.style.width = "0%";
      }
      return history.push(`/Dashboard/${params.tipo}/${params.modalidad}`);
    });
    return;
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
                    <i className="nav-icon fas fa-edit" /> Actualizar {tipo} {modalidad}
                  </h1>
                ) : (
                  <h1 className="m-0 efecto_titulo">
                    <i className="nav-icon fas fa-plus" /> Crear {tipo} {modalidad}
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
                    <Link className="link-normal" to={`/Dashboard/${params.tipo}/${params.modalidad}`}>
                      {params.tipo} {params.modalidad}
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
              <div className="col-md-6 ms-0 ms-lg-3">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-floating mb-3 position-relative">
                    <input onChange={handleInputChange} id="floatingInputNombre" className="form-control" type="text" placeholder="Nombre del Taller" name="nombre_curso" required value={curso.nombre_curso} />
                    <label htmlFor="floatingInputNombre">
                      Nombre del {tipo} {modalidad}
                    </label>
                    <div className="invalidText d-none" ref={refSubjectName}>
                      Solo letras y espacios
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea cols={30} rows={10} onChange={handleInputChange} className="form-control h-50" placeholder="Descripción" name="descripcion" required value={curso.descripcion} />
                    <label htmlFor="floatingInputDescripcion">Descripción</label>
                  </div>
                  <div className="form-floating mb-3 position-relative">
                    <input onChange={handleInputChange} id="floatingInputPrecio" className="form-control" type="text" placeholder="Precio" name="precio" required value={curso.precio} />
                    <label htmlFor="floatingInputPrecio">Precio</label>
                    <div className="invalidText d-none" ref={refSubjectPrice}>
                      Solo dígitos para los precios
                    </div>
                  </div>

                  {/* En caso de que sean sincronos */}
                  {modalidad === "Sincrónico" ? (
                    <>
                      <div className="form-floating mb-3 position-relative">
                        <input onChange={handleInputChange} id="floatingInputDuracion" className="form-control" type="number" placeholder="Duración" name="duracion" required value={curso.duracion} />
                        <label htmlFor="floatingInputDuracion">Duración (Horas)</label>
                        <div className="invalidText d-none" ref={refSubjectDuration}>
                          Solo dígitos para duración
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <input onChange={handleInputChange} id="floatingInputCapacidad" className="form-control" type="number" placeholder="Capacidad" name="capacidad" required value={curso.capacidad} />
                        <label htmlFor="floatingInputCapacidad">Capacidad</label>
                        <div className="invalidText d-none" ref={refSubjectCapacity}>
                          Solo dígitos para capacidad
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <input onChange={handleInputChange} id="floatingInputHorario" className="form-control" type="datetime-local" placeholder="Horario" name="horario" required value={curso.horario} />
                        <label htmlFor="floatingInputHorario">Horario</label>
                      </div>
                      <div className="form-floating mb-3 position-relative">
                        <input onChange={handleInputChange} id="floatingInputEnlace" className="form-control" type="text" placeholder="Enlace de Zoom" name="enlace" required value={curso.enlace} />
                        <label htmlFor="floatingInputEnlace">Enlace de Zoom</label>
                        <div className="invalidText d-none" ref={refSubjectURL}>
                          Solo formato de url
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="form-floating mb-3">
                    <select value={curso.id_usuario} onChange={handleInputChange} id="floatingInputProfesor" className="form-control" name="id_usuario" required>
                      {profesores.map((profesor) => {
                        return (
                          <option key={profesor.id_usuario} value={profesor.id_usuario}>
                            {profesor.nombre} {profesor.apellido} - {profesor.correo}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor="floatingInputProfesor">Profesor</label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlFile" className="form-label">
                      Foto del Curso
                    </label>
                    {curso.id_curso ? (
                      <>
                        <input ref={(node) => (refInput.current = node)} onChange={handleInputFileChange} className="form-control" id="exampleFormControlFile" type="file" placeholder="Foto del curso" name="foto_curso" />
                      </>
                    ) : (
                      <>
                        <input ref={(node) => (refInput.current = node)} onChange={handleInputFileChange} className="form-control" id="exampleFormControlFile" type="file" placeholder="Foto del curso" name="foto_curso" required />
                      </>
                    )}
                    <div className="progress">
                      <div className="progress-bar" ref={(node) => (refProgresss.current = node)} role="progressbar" style={{ width: "0%" }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                        0%
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    {params.id ? ( //Editar o Crear
                      <button className="btn btn__amarillo">
                        <FaRegEdit className="fs-5 mb-1" /> Actualizar{" "}
                      </button>
                    ) : (
                      <button className="btn btn__blue">
                        <FaPlus className="fs-5 mb-1" /> Crear{" "}
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <div className="col-md-6"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FormCurso;
