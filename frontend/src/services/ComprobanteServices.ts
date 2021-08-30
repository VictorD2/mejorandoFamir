import axios from "axios";
import { Comprobante } from "../interfaces/Comprobante";
import { API } from "../config/config";
const api = `${API}/api/v0/comprobante`;
const api2 = `${API}/api/v0/usuariocurso`;

export const getComprobantes = async (estado: string, page: number, keyword: string) => {
  if (keyword.trim() !== "") return await axios.get(`${api}/${estado}/${page}?keyword=${keyword}`);
  return await axios.get(`${api}/${estado}/${page}`);
};
export const getCantidad = async (estado: string, keyword: string) => {
  if (keyword.trim() === "") return await axios.get(`${api}/count/${estado}`);
  return await axios.get(`${api}/count/${estado}?keyword=${keyword}`);
};
export const getComprobanteById = async (id?: number) => {
  return await axios.get(`${api}/${id}`);
};
// CREAR
export const crearComprobante = async (form: FormData, idCurso: string, idUsuario?: string) => {
  form.append("fecha_enviado", new Date().toString());
  form.append("id_curso", idCurso);
  form.append("id_usuario", idUsuario + "");
  return await axios.post(`${api}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const eliminarComprobante = async (id: string) => {
  return await axios.delete(`${api}/${id}`);
};
export const actualizarComprobante = async (id: string, comprobante: Comprobante) => {
  comprobante.estado = "Rechazado";
  return await axios.put(`${api}/${id}`, comprobante);
};
export const getUsuarioCursoByIdCurso = async (idCurso: string) => {
  return await axios.get(`${api2}/curso/${idCurso}`);
};
export const getUsuarioCursoByIdEstudiante = async (idEstudiante: string) => {
  return await axios.get(`${api2}/estudiante/${idEstudiante}`);
};
export const getCountUsuarioCursoByCursoId = async (idCurso: string) => {
  return await axios.get(`${api2}/count/estudiante/${idCurso}`);
};
export const setFavorito = async (idCurso: string, idUsuario: string) => {
  return await axios.put(`${api2}/${idCurso}/${idUsuario}`);
};

export const crearInscripcion = async (inscripcion?: Comprobante) => {
  return await axios.post(`${api2}`, inscripcion);
};
