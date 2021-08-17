import axios from "axios";
import { API } from "../config/config";
const api = `${API}/api/v0/tema`;

export const getVideo = async (id: string) => {
  const res = await axios.get(`${API}/video-lock?key=1v4g8h6vcesm&idTema=${id}`, { responseType: "arraybuffer" });
  let blob = new Blob([res.data]);
  return URL.createObjectURL(blob);
};

export const getTemaById = async (id: string) => {
  return await axios.get(`${api}/idTema/${id}`);
};

// // CREAR
// export const crearTema = async (form: FormData, progressBar: any) => {
//   return await axios.post(`${api}`, form, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     onUploadProgress(e) {
//       let progress = Math.round((e.loaded * 100.0) / e.total);
//       if (progressBar != null) {
//         progressBar.innerHTML = `${progress}%`;
//         progressBar.style.width = `${progress}%`;
//       }
//     },
//   });
// };
// CREAR
export const crearTema = async (form: FormData) => {
  return await axios.post(`${api}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Editar
export const editarTema = async (id: string, form: FormData) => {
  return await axios.put(`${api}/${id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// export const editarTema = async (id: string, form: FormData, progressBar: any) => {
//   return await axios.put(`${api}/${id}`, form, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     onUploadProgress(e) {
//       let progress = Math.round((e.loaded * 100.0) / e.total);
//       if (progressBar != null) {
//         progressBar.innerHTML = `${progress}%`;
//         progressBar.style.width = `${progress}%`;
//       }
//     },
//   });
// };
export const eliminarTema = async (id: string | undefined) => {
  return await axios.delete(`${api}/${id}`);
};
