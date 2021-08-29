/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

//Componentes
import Badge from "../../components/Badge";

//Services
import * as cursoServices from "../../services/CursosServices";
import * as comprobanteServices from "../../services/ComprobanteServices";

//Interfaces
import { Curso } from "../../interfaces/Curso";
import { Comprobante } from "../../interfaces/Comprobante";

//fotoPrueba

//Iconos
import { BiPaperPlane } from "react-icons/bi";

import swal from "sweetalert";

import { useUsuario } from "../../auth/UsuarioProvider";

interface Params {
  idCurso: string;
}
const initialState: Curso = {
  uri_carpeta_vimeo:"",
  descripcion: "",
  enlace: "",
  horario: "",
  nombre_curso: "",
  precio: 0,
  url_foto_curso: "",
};
const ComprarCurso: React.FC = () => {
  const initialStateComprobante: Comprobante = {
    id_curso: "0",
    url_foto_comprobante: "",
    comprobateFoto: [new File([""], "filename")],
    id_usuario: "0",
    fecha_enviado: "",
    estado: "",
  };
  const { usuario } = useUsuario();

  const [comprobante, setComprobante] = useState<Comprobante>(initialStateComprobante);
  const [cupos, setCupos] = useState<number>(0);

  const params = useParams<Params>();

  const history = useHistory();

  const refInput = useRef<HTMLInputElement | null>();

  const [curso, setCurso] = useState<Curso>(initialState);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    getCurso();
    return () => setCurso(initialState);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setComprobante({ ...comprobante, [e.target.name]: e.target.files });
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    if (comprobante.comprobateFoto) form.append("fotoComprobante", comprobante.comprobateFoto[0]);
    const res = await comprobanteServices.crearComprobante(form, params.idCurso, usuario.id_usuario);
    if (refInput.current) refInput.current.value = "";
    if (res.data.error) return swal({ title: "Advertencia", text: `${res.data.error}`, icon: "warning" });
    swal({ title: "Enviado", text: `${res.data.success}`, icon: "success" });
  };


  const getCurso = async () => {
    const res = await cursoServices.getCursoById(params.idCurso);
    if (res.data.error) return history.push("/");
    const resIns = await comprobanteServices.getCountUsuarioCursoByCursoId(params.idCurso);
    setCupos(res.data.curso.capacidad - resIns.data);
    setCurso(res.data.curso);
  };

  return (
    <>
      <Badge name={`Comprar`} />

      <div className="container mt-5" style={{ marginBottom: "4.5rem" }}>
        <div className="row">
          <div className="col-12 col-md-12 col-sm-12 col-lg-6 mb-5">
            <img className="img-fluid" src={curso.url_foto_curso} alt={`Foto Curso ${curso.nombre_curso}`} />
            <div className="w-100 mt-4">
              <h6 className="fs-4 fw-bold text-uppercase">DATOS DEL {curso.tipo}</h6>
              {curso.modalidad === "Sincrónico" ? (
                <>
                  <Fila titulo1={"Cupos disponibles: "} titulo2="" subtitulo1={`${cupos}`} subtitulo2={``} />
                </>
              ) : (
                <></>
              )}
              <Fila titulo1={`nombre del ${curso.tipo}`} titulo2="Precio" subtitulo1={`${curso.nombre_curso}`} subtitulo2={`$ ${curso.precio}`} />

              <div className="border border-2 border-warning mt-5 p-4">
                <p className="text-center fw-bold fs-5" style={{ color: "var(--verde-oscuro)" }}>
                  IMPORTANTE
                </p>
                <p className="fw-bold text-uppercase" style={{ color: "var(--azul-oscuro)" }}>
                  Devoluciones
                </p>
                <p style={{ textAlign: "justify" }}>No se realizará la devolución del dinero en caso de que el cliente manifiesta retracción, pues los cupos son limitados.</p>
                <p className="fw-bold text-uppercase" style={{ color: "var(--azul-oscuro)" }}>
                  Pago
                </p>
                <p style={{ textAlign: "justify" }}>El pago es mediante transferencia electrónica y para su confiabilidad le enviaremos un correo de confirmación y un archivo adjunto donde se indica el pago conforme y completo del curso.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-sm-12 col-lg-6">
            <Paso curso={curso} titulo={"PASO 01"} subtitulo={"DATOS DE PAGO"} descripcion={"Estos son los datos correspondientes"} />
            <Paso titulo={"PASO 02"} subtitulo={"ENVÍA TU COMPROBANTE"} descripcion={"Envíanos tu comprobante de pago"} />

            <form onSubmit={handleFormSubmit} className="mt-2 mb-5 w-100 d-flex align-items-center justify-content-center flex-row">
              <input ref={(node) => (refInput.current = node)} required onChange={handleFileChange} className="form-control w-75" type="file" name="comprobateFoto" />
              <button className="btn btn__blue m-0 d-flex" type="submit">
                <BiPaperPlane className="mt-1 me-1" /> Enviar
              </button>
            </form>

            <Paso titulo={"PASO 03"} subtitulo={"ESPERA TU CONFIRMACIÓN"} descripcion={"Una vez enviado tu comprobante de pago te enviaremos un correo de confirmación."} />
          </div>
        </div>
      </div>
    </>
  );
};

interface PropsPaso {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  curso?: Curso;
}

const Paso = (props: PropsPaso) => {
  return (
    <div className="w-100 mb-5 px-5 pt-0">
      <h6 className="fw-bold border border-2 border-warning text-center w-50 mx-auto p-2 fs-5" style={{ color: "var(--amarillo-oscuro)" }}>
        {props.titulo}
      </h6>
      <p className="m-0 w-100 text-center fw-bold" style={{ color: "var(--azul-oscuro)" }}>
        {props.subtitulo}
      </p>
      <p className="w-100 m-0 mt-4 text-black-50 fs-5">{props.descripcion}</p>
      {props.titulo === "PASO 01" ? (
        <>
          <DatosBanco curso={props.curso} />
        </>
      ) : (
        <></>
      )}
      {props.titulo === "PASO 02" ? <></> : <></>}
    </div>
  );
};
interface PropsBanco {
  curso?: Curso;
}
const DatosBanco = (props: PropsBanco) => {
  return (
    <div className="w-100 mt-3">
      <Fila titulo1={"BANCO"} titulo2={"TIPO DE CUENTA"} subtitulo1={"Banco Santander"} subtitulo2={"Cuenta Corriente"} />
      <Fila titulo1={"NÚMERO DE CUENTA"} titulo2={"RUT"} subtitulo1={"0-000-73-58932-0"} subtitulo2={"14.655.581-0"} />
      <Fila titulo1={"NOMBRE DE TITULAR"} titulo2={"INVERSIÓN"} subtitulo1={"Mirtza Rodriguez R."} subtitulo2={"$ " + props.curso?.precio} />
    </div>
  );
};
interface PropsFila {
  titulo1: string;
  subtitulo1: string;
  titulo2: string;
  subtitulo2: string;
}

const Fila = (props: PropsFila) => {
  const refP = useRef<HTMLParagraphElement | null>();
  if (refP.current) refP.current.innerHTML = props.titulo1;
  return (
    <div className="row mt-4" style={{ borderBottom: "1px solid var(--azul-oscuro)" }}>
      <div className="col-6 col-sm-6">
        <p ref={(node) => (refP.current = node)} className="m-0 fw-bold text-uppercase" style={{ color: "var(--azul-oscuro)" }}>
          {props.titulo1}
        </p>
        <p className="m-0">{props.subtitulo1}</p>
      </div>
      <div className="col-6 col-sm-6 text-end">
        <p className="m-0 fw-bold text-uppercase" style={{ color: "var(--azul-oscuro)" }}>
          {props.titulo2}
        </p>
        <p className="m-0">{props.subtitulo2}</p>
      </div>
    </div>
  );
};
export default ComprarCurso;
