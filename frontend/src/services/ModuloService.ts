import axios from "axios";
import { Modulo } from "../interfaces/Modulo";
import { API } from "../config/config";
const api = `${API}/api/v0/modulos`;

export const getTemasByModuloId = async (id: string) => {
  return await axios.get(`${API}/api/v0/tema/${id}`);
};

export const crearModulo = async (modulo: Modulo, id: string) => {
  modulo.id_curso = id;
  return await axios.post(`${api}`, modulo);
};
export const actualizarModulo = async (modulo: Modulo) => {
  return await axios.put(`${api}`, modulo);
};

export const eliminarModulo = async (modulo: Modulo) => {
  return await axios.delete(`${api}/${modulo.id_modulo}`);
};
