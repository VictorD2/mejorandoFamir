import axios from "axios";
import { Comentario } from "../interfaces/Comentario";
import { API } from "../config/config";
const api = `${API}/api/v0/comentarios`;

export const getAll = async (page: number, idCurso: string, idTema?: string) => {
  return await axios.get(`${api}/${idCurso}/${idTema}?page=${page}`);
};

export const getCount = async (idCurso: string, idTema?: string) => {
  return await axios.get(`${api}/count/${idCurso}/${idTema}`);
};

export const crearComentario = async (comentario: Comentario, idCurso: string, idTema: string) => {
  comentario.fecha = new Date().toString();
  comentario.id_tema = parseInt(idTema);
  comentario.id_curso = parseInt(idCurso);
  return await axios.post(`${api}/${idCurso}/${idTema}`, comentario);
};
export const eliminarComentario = async (id: string | undefined) => {
  return await axios.delete(`${api}/${id}`);
};
