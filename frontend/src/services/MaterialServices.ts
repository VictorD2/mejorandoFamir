import axios from "axios";
import { API } from "../config/config";
const api = `${API}/api/v0/material`;

// CREAR
export const createMaterial = async (form: FormData, progressBar: any) => {
  return await axios.post(`${api}`, form, {
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
export const getMaterialByTemaId = async (id: string | undefined) => {
  return await axios.get(`${api}/${id}`);
};

export const eliminarMaterial = async (id: string | undefined) => {
  return await axios.delete(`${api}/${id}`);
};
