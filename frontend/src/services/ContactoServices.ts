import axios from "axios";
import { Contacto } from "../interfaces/Contacto";
import { API } from "../config/config";
const api = `${API}/api/v0/contacto`;

//OBTENER
export const getAllContactos = async (page: number, keyword: string) => {
  if (keyword.trim() !== "") return await axios.get(`${api}?keyword=${keyword}&page=${page}`);
  return await axios.get(`${api}?page=${page}`);
};
//OBTENER
export const getCount = async (keyword: string) => {
  if (keyword.trim() === "") return await axios.get(`${api}/count`);
  return await axios.get(`${api}/count?keyword=${keyword}`);
};

//Por ID
export const getContactoById = async (id: string) => {
  return await axios.get(`${api}/${id}`);
};

export const deleteContacto = async (id: string) => {
  return await axios.delete(`${api}/${id}`);
};

//Por ID
export const createContacto = async (contacto: Contacto) => {
  return await axios.post(`${api}`, contacto);
};
