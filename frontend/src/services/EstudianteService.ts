import axios from "axios";
import { API } from "../config/config";
const api = `${API}/api/v0/estudiantes`;

export const getAll = async (page: number, keyword: string) => {
  if (keyword.trim() !== "") return await axios.get(`${api}?keyword=${keyword}&page=${page}`);
  return await axios.get(`${api}?page=${page}`);
};

export const getCount = async (keyword: string) => {
  if (keyword.trim() === "") return await axios.get(`${api}/count`);
  return await axios.get(`${api}/count?keyword=${keyword}`);
};

export const getEstudianteById = async (id: string) => {
  return await axios.get(`${api}/${id}`);
};
export const eliminarEstudiante = async (id: string | undefined) => {
  return await axios.delete(`${api}/${id}`);
};
