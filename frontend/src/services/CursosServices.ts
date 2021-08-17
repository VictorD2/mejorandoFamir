import axios from "axios";
import { API } from "../config/config";
const api = `${API}/api/v0/cursos`;

//OBTENER
export const getAllModulesByCursoId = async (id: string) => {
  return await axios.get(`${API}/api/v0/modulos/${id}`);
};
export const verificarSuscribcion = async (idCurso: string | undefined) => {
  return await axios.get(`${api}/sub/${idCurso}`);
};
//OBTENER
export const getAllCursos = async (tipo: string, modalidad: string, page: number, keyword: string) => {
  if (keyword.trim() !== "") return await axios.get(`${api}/${tipo}/${modalidad}?keyword=${keyword}&page=${page}`);
  return await axios.get(`${api}/${tipo}/${modalidad}?page=${page}`);
};
export const getCount = async (tipo: string, modalidad: string, keyword: string) => {
  if (keyword.trim() === "") return await axios.get(`${api}/count/${tipo}/${modalidad}`);
  return await axios.get(`${api}/count/${tipo}/${modalidad}?keyword=${keyword}`);
};
//Por ID
export const getCursoById = async (id: string) => {
  return await axios.get(`${api}/${id}`);
};

// CREAR
export const crearCurso = async (curso: FormData, tipo: string, modalidad: string, progressBar: any) => {
  curso.append("tipo", tipo);
  curso.append("modalidad", modalidad);
  return await axios.post(`${api}`, curso, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress(e) {
      let progress = Math.round((e.loaded * 100.0) / e.total);
      if (progressBar != null) {
        progressBar.innerHTML = `${progress}%`;
        progressBar.style.width = `${progress}%`;
      }
    },
  });
};

export const updateCurso = async (id: string | undefined, curso: FormData, progressBar: any) => {
  return await axios.put(`${api}/${id}`, curso, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress(e) {
      let progress = Math.round((e.loaded * 100.0) / e.total);
      if (progressBar != null) {
        progressBar.innerHTML = `${progress}%`;
        progressBar.style.width = `${progress}%`;
      }
    },
  });
};
export const eliminarCurso = async (id: string | undefined) => {
  return await axios.delete(`${api}/${id}`);
};
