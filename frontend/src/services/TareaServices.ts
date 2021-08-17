import axios from "axios";
import { Tarea } from "../interfaces/Tarea";
import { API } from "../config/config";
const api = `${API}/api/v0/tareas`;
const api2 = `${API}/api/v0/tareasMaterial`;

export const getTareasById = async (id: string) => {
  return await axios.get(`${api}/single/${id}`);
};

export const getTareasByModuloId = async (id: string) => {
  return await axios.get(`${api}/${id}`);
};

export const crearTarea = async (tarea: Tarea, id: string) => {
  tarea.id_modulo = parseInt(id);
  return await axios.post(`${api}`, tarea);
};
export const actualizarTarea = async (tarea: Tarea) => {
  return await axios.put(`${api}`, tarea);
};

export const eliminarTarea = async (tarea: Tarea) => {
  return await axios.delete(`${api}/${tarea.id_tarea}`);
};

export const getMaterialTareasById = async (id: string) => {
  return await axios.get(`${api2}/${id}`);
};
export const borrarMaterialTareasById = async (id: string) => {
  return await axios.delete(`${api2}/${id}`);
};
export const crearMaterialTarea = async (form: FormData) => {
  return await axios.post(`${api2}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
