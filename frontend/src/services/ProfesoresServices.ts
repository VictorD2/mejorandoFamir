import axios from "axios";
import { Usuario } from "../interfaces/Usuario";
import { API } from "../config/config";
const api = `${API}/api/v0/profesores`;

export const getAll = async (page: number, keyword: string) => {
  if (page === 0) return await axios.get(`${api}`);
  if (keyword.trim() !== "") return await axios.get(`${api}?keyword=${keyword}&page=${page}`);
  return await axios.get(`${api}?page=${page}`);
};
export const getCount = async (keyword: string) => {
  if (keyword.trim() === "") return await axios.get(`${api}/count`);
  return await axios.get(`${api}/count?keyword=${keyword}`);
};
export const getProfesorById = async (id: string) => {
  return await axios.get(`${api}/${id}`);
};
export const crearProfesor = async (profesor: Usuario) => {
  return await axios.post(`${api}`, profesor);
};
export const updateProfesor = async (id: string, profesor: Usuario) => {
  return await axios.put(`${api}/${id}`, profesor);
};
export const eliminarProfesor = async (id: string | undefined) => {
  return await axios.delete(`${api}/${id}`);
};
